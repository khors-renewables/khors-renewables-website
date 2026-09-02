import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ConsultationPayload = {
  fullName?: string;
  whatsapp?: string;
  bill?: string;
  pincode?: string;
};

type EmailDetails = {
  fullName: string;
  whatsapp: string;
  bill: string;
  pincode: string;
};

function buildEmailHtml({ fullName, whatsapp, bill, pincode }: EmailDetails) {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid #e8ecf4">
        <span style="color:#8a94a8;font-size:13px;letter-spacing:.5px;text-transform:uppercase;font-weight:600">${label}</span>
      </td>
      <td style="padding:14px 16px;border-bottom:1px solid #e8ecf4;text-align:right;color:#1a2b5e;font-size:15px;font-weight:700">${value}</td>
    </tr>`;

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
                  <div style="font-size:14px;letter-spacing:4px;text-transform:uppercase;color:#43a63c;font-weight:700;margin-bottom:8px">New Lead Received</div>
                  <div style="font-size:26px;font-weight:800;color:#ffffff;line-height:1.2">Free Consultation Request</div>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding:32px 36px">
                  <p style="margin:0 0 8px;font-size:15px;color:#1a2b5e;font-weight:700">
                    Hi, a potential customer just requested a consultation. Here are their details:
                  </p>

                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;border-collapse:collapse">
                    ${row("Full Name", fullName)}
                    ${row("WhatsApp Number", whatsapp)}
                    ${row("Monthly Bill", bill)}
                    ${row("PIN Code", pincode)}
                  </table>

                  <p style="margin:24px 0 0;font-size:13px;color:#8a94a8;line-height:1.6">
                    Please reach out to this customer on WhatsApp to schedule their free consultation.
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background:#f7f9ff;padding:20px 36px;text-align:center;border-top:1px solid #e8ecf4">
                  <span style="font-size:12px;color:#8a94a8">This email was sent from your website's consultation form.</span>
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

  const { fullName, whatsapp, bill, pincode } = body;

  if (!fullName || !whatsapp || !pincode) {
    return Response.json(
      { success: false, message: "Missing required fields" },
      { status: 400 }
    );
  }

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

  const text = [
    "New FREE consultation request",
    "",
    `Full Name: ${fullName}`,
    `WhatsApp Number: ${whatsapp}`,
    `Monthly Electricity Bill: ${bill ?? "Not specified"}`,
    `PIN Code: ${pincode}`,
  ].join("\n");

  const html = buildEmailHtml({
    fullName: fullName ?? "",
    whatsapp: whatsapp ?? "",
    bill: bill ?? "Not specified",
    pincode: pincode ?? "",
  });

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
      subject: `New Free Consultation Request — ${fullName}`,
      text,
      html,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to send consultation email:", error);
    return Response.json(
      { success: false, message: "Failed to send email" },
      { status: 500 }
    );
  }
}
