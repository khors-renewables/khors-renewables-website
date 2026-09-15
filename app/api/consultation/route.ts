import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { getCampaign } from "@/lib/campaigns";

export const runtime = "nodejs";

type ConsultationPayload = {
  fullName?: string;
  whatsapp?: string;
  bill?: string;
  pincode?: string;
  /** Landing page only: Residential | Commercial. */
  propertyType?: string;
  /** Landing page only: campaign slug, e.g. "google". */
  source?: string;
  /** Landing page only: full URL, carries utm_* / gclid / fbclid. */
  pageUrl?: string;
};

type EmailRow = { label: string; value: string };

const MAX_FIELD_LENGTH = 300;

/** Trims, caps length and neutralises HTML so values are safe in the email. */
function sanitize(value: string | undefined): string {
  return (value ?? "")
    .trim()
    .slice(0, MAX_FIELD_LENGTH)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** A bare number is an amount in rupees; anything else passes through as-is. */
function formatBill(value: string): string {
  if (!value) return "Not specified";
  const digits = value.replace(/[,\s₹]/g, "");
  if (/^\d+$/.test(digits)) {
    return `\u20B9${Number(digits).toLocaleString("en-IN")} / month`;
  }
  return value;
}

type EmailBadge = { label: string; color: string };

function buildEmailHtml(
  rows: EmailRow[],
  heading: string,
  badge: EmailBadge | null,
  footerNote: string
) {
  const row = ({ label, value }: EmailRow) => `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid #e8ecf4">
        <span style="color:#8a94a8;font-size:13px;letter-spacing:.5px;text-transform:uppercase;font-weight:600">${label}</span>
      </td>
      <td style="padding:14px 16px;border-bottom:1px solid #e8ecf4;text-align:right;color:#1a2b5e;font-size:15px;font-weight:700;word-break:break-word">${value}</td>
    </tr>`;

  // A coloured pill naming the platform the lead came from, so the source is
  // obvious at a glance without reading the detail rows.
  const badgeHtml = badge
    ? `<div style="margin-bottom:14px">
         <span style="display:inline-block;background:${badge.color};color:#ffffff;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:7px 16px;border-radius:999px">${badge.label}</span>
       </div>`
    : "";

  return `
  <!DOCTYPE html>
  <html lang="en">
    <body style="margin:0;padding:0;background-color:#eef1fb;font-family:Arial,Helvetica,sans-serif">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eef1fb;padding:32px 16px">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 10px 30px rgba(26,43,94,0.12)">
              <!-- Header -->
              <tr>
                <td style="background:linear-gradient(135deg,#12308a 0%,#0b1638 100%);padding:32px 36px;text-align:center">
                  ${badgeHtml}
                  <div style="font-size:14px;letter-spacing:4px;text-transform:uppercase;color:#43a63c;font-weight:700;margin-bottom:8px">New Lead Received</div>
                  <div style="font-size:26px;font-weight:800;color:#ffffff;line-height:1.2">${heading}</div>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding:32px 36px">
                  <p style="margin:0 0 8px;font-size:15px;color:#1a2b5e;font-weight:700">
                    Hi, a potential customer just requested a consultation. Here are their details:
                  </p>

                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;border-collapse:collapse">
                    ${rows.map(row).join("")}
                  </table>

                  <p style="margin:24px 0 0;font-size:13px;color:#8a94a8;line-height:1.6">
                    Please reach out to this customer on WhatsApp to schedule their free consultation.
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background:#f7f9ff;padding:20px 36px;text-align:center;border-top:1px solid #e8ecf4">
                  <span style="font-size:12px;color:#8a94a8">${footerNote}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}

export async function POST(request: NextRequest) {
  let body: ConsultationPayload;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, message: "Invalid request body" },
      { status: 400 }
    );
  }

  const { fullName, whatsapp, bill, pincode, propertyType, source, pageUrl } =
    body;

  if (!fullName || !whatsapp || !pincode) {
    return Response.json(
      { success: false, message: "Missing required fields" },
      { status: 400 }
    );
  }

  // The campaign is resolved from the trusted registry, never from client text,
  // so a forged payload can't invent a platform.
  const campaign = getCampaign(source);

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpHost = process.env.SMTP_HOST ?? "smtp.gmail.com";
  const smtpPort = Number(process.env.SMTP_PORT ?? 465);
  const recipientEmail = process.env.CONSULTATION_RECIPIENT_EMAIL;

  if (!smtpUser || !smtpPass || !recipientEmail) {
    return Response.json(
      { success: false, message: "Email is not configured" },
      { status: 500 }
    );
  }

  // Subjects are a mail header: keep it on one line.
  const subjectName =
    fullName.replace(/[\r\n]+/g, " ").trim().slice(0, 80) || "New lead";

  const rows: EmailRow[] = [
    { label: "Full Name", value: sanitize(fullName) },
    { label: "WhatsApp Number", value: sanitize(whatsapp) },
  ];

  if (propertyType) {
    rows.push({ label: "Property Type", value: sanitize(propertyType) });
  }

  rows.push(
    { label: "Monthly Bill", value: formatBill(sanitize(bill)) },
    { label: "PIN Code", value: sanitize(pincode) }
  );

  if (campaign) {
    rows.push(
      { label: "Lead Source", value: campaign.platform },
      { label: "Tracking Code", value: campaign.code }
    );
    if (pageUrl) {
      rows.push({ label: "Landing Page", value: sanitize(pageUrl) });
    }
  } else {
    rows.push({ label: "Lead Source", value: "Website (main site form)" });
  }

  const text = [
    campaign
      ? `New consultation request from ${campaign.platform} (${campaign.code})`
      : "New FREE consultation request",
    "",
    // Strip the HTML escaping back out for the plain-text part.
    ...rows.map(
      ({ label, value }) =>
        `${label}: ${value
          .replace(/&#39;/g, "'")
          .replace(/&quot;/g, '"')
          .replace(/&gt;/g, ">")
          .replace(/&lt;/g, "<")
          .replace(/&amp;/g, "&")}`
    ),
  ].join("\n");

  const html = buildEmailHtml(
    rows,
    campaign
      ? `${campaign.platform} — Consultation Request`
      : "Free Consultation Request",
    campaign ? { label: campaign.platform, color: campaign.color } : null,
    campaign
      ? `This lead came from your ${campaign.platform} campaign link (${campaign.code}).`
      : "This email was sent from your website's consultation form."
  );

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  try {
    await transporter.sendMail({
      from: `Consultation <${smtpUser}>`,
      to: recipientEmail,
      subject: campaign
        ? `New Lead (${campaign.platform}) — ${subjectName}`
        : `New Free Consultation Request — ${subjectName}`,
      text,
      html,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to send consultation email:", error);

    // Surface the SMTP reason while developing; keep it generic in production.
    const reason =
      process.env.NODE_ENV === "production"
        ? undefined
        : error instanceof Error
          ? error.message
          : String(error);

    return Response.json(
      { success: false, message: "Failed to send email", reason },
      { status: 500 }
    );
  }
}
