"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Building2,
  CheckCircle2,
  Home,
  MapPin,
  Phone,
  ReceiptIndianRupee,
  User,
} from "lucide-react";
import type { Campaign, Tracking } from "@/lib/campaigns";
import { trackLead } from "@/lib/tracking";

const propertyTypes = [
  { value: "Residential", Icon: Home },
  { value: "Commercial", Icon: Building2 },
] as const;

const fieldClass =
  "h-[2.875rem] w-full rounded-[0.5rem] border border-navy/15 bg-white pl-[2.75rem] pr-[1rem] text-[0.9375rem] font-medium text-navy placeholder:font-normal placeholder:text-navy/40 focus:border-[#f07d19] focus:outline-2 focus:outline-offset-0 focus:outline-[#f07d19]/40";

const labelClass = "block text-[0.9375rem] font-bold text-navy";

const iconClass =
  "pointer-events-none absolute left-[0.9375rem] top-1/2 h-[1.125rem] w-[1.125rem] -translate-y-1/2 text-navy/45";

export default function CampaignLeadForm({
  campaign,
  tracking,
}: {
  campaign: Campaign;
  tracking: Tracking | null;
}) {
  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [propertyType, setPropertyType] =
    useState<(typeof propertyTypes)[number]["value"]>("Residential");
  const [bill, setBill] = useState("");
  const [pincode, setPincode] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          whatsapp,
          propertyType,
          bill,
          pincode,
          // Attribution: the slug tells the API which platform this page serves,
          // and the full URL carries any utm_* / gclid / fbclid parameters.
          source: campaign.slug,
          pageUrl: window.location.href,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.reason ?? data?.message ?? "Failed to submit");
      }

      trackLead(tracking, campaign.code);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Brand lock-up — logo only, no navigation links on this page */}
      <div className="flex justify-center">
        <Image
          src="/navbar/logo.png"
          alt="Khors Renewables — powered by nature, designed for the future"
          width={300}
          height={300}
          priority
          unoptimized
          className="h-[3rem] w-auto lg:h-[3.5rem]"
        />
      </div>

      <h1 className="mt-[0.875rem] text-center font-display text-[1.625rem] font-bold leading-[1.1] text-navy sm:text-[1.875rem] lg:text-[2.125rem]">
        Schedule a Free
        <span className="block text-brand">Consultation</span>
      </h1>

      <div className="mx-auto mt-[0.625rem] h-[0.25rem] w-[4rem] rounded-full bg-[#f07d19]" />

      {submitted ? (
        <div className="py-[2.25rem] text-center">
          <CheckCircle2 className="mx-auto h-[3rem] w-[3rem] text-brand" />
          <p className="mt-[1rem] font-display text-[1.375rem] font-bold text-navy">
            Thank you!
          </p>
          <p className="mt-[0.5rem] text-[1rem] font-medium leading-[1.5] text-navy/70">
            We&apos;ve received your details. Our team will call you on{" "}
            {whatsapp || "your number"} shortly to schedule your free site
            assessment.
          </p>
          <a
            href="tel:+917200830719"
            className="mt-[1.5rem] inline-flex h-[3rem] items-center justify-center gap-[0.5rem] rounded-[0.5rem] bg-brand-btn px-[1.5rem] text-[1rem] font-bold text-white transition-colors hover:bg-brand-btn-hover"
          >
            <Phone className="h-[1.125rem] w-[1.125rem]" />
            Or call us now
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-[1.25rem]" noValidate={false}>
          {/* Name */}
          <label className={labelClass} htmlFor="lead-name">
            Name
          </label>
          <div className="relative mt-[0.5rem]">
            <User className={iconClass} aria-hidden="true" />
            <input
              id="lead-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              maxLength={80}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Name"
              className={fieldClass}
            />
          </div>

          {/* Phone */}
          <label className={`${labelClass} mt-[1rem]`} htmlFor="lead-phone">
            Phone Number
          </label>
          <div className="relative mt-[0.5rem]">
            <Phone className={iconClass} aria-hidden="true" />
            <input
              id="lead-phone"
              name="phone"
              type="tel"
              required
              inputMode="numeric"
              autoComplete="tel"
              pattern="[0-9+ ]{10,15}"
              title="Enter a 10-digit mobile number"
              maxLength={15}
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="Phone Number"
              className={fieldClass}
            />
          </div>

          {/* Property type */}
          <fieldset className="mt-[1rem]">
            <legend className={labelClass}>Property Type</legend>
            {/* Stacked on phones: side by side there isn't room for the radio,
                icon and a full "Residential" label without truncating it. */}
            <div className="mt-[0.5rem] grid grid-cols-1 gap-[0.75rem] sm:grid-cols-2">
              {propertyTypes.map(({ value, Icon }) => {
                const selected = propertyType === value;
                return (
                  <label
                    key={value}
                    className={`flex h-[2.875rem] cursor-pointer items-center gap-[0.625rem] rounded-[0.5rem] border px-[0.875rem] transition-colors ${
                      selected
                        ? "border-brand bg-brand/5"
                        : "border-navy/15 bg-white hover:border-navy/30"
                    }`}
                  >
                    {/* Native radio kept for accessibility/form semantics but
                        visually hidden; a custom circle is drawn below so the
                        selected state renders crisply and on-brand. */}
                    <input
                      type="radio"
                      name="propertyType"
                      value={value}
                      checked={selected}
                      onChange={() => setPropertyType(value)}
                      className="sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={`flex h-[1.125rem] w-[1.125rem] shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                        selected ? "border-brand" : "border-navy/30"
                      }`}
                    >
                      {selected && (
                        <span className="h-[0.5rem] w-[0.5rem] rounded-full bg-brand" />
                      )}
                    </span>
                    <Icon
                      className={`h-[1.125rem] w-[1.125rem] shrink-0 ${
                        selected ? "text-brand" : "text-navy/55"
                      }`}
                      aria-hidden="true"
                    />
                    <span className="truncate text-[0.9375rem] font-bold text-navy">
                      {value}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Monthly bill */}
          <label className={`${labelClass} mt-[1rem]`} htmlFor="lead-bill">
            Monthly Electricity Bill Amount
          </label>
          <div className="relative mt-[0.5rem]">
            <ReceiptIndianRupee className={iconClass} aria-hidden="true" />
            <input
              id="lead-bill"
              name="bill"
              type="text"
              inputMode="numeric"
              maxLength={10}
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              placeholder="Monthly Electricity Bill Amount"
              className={fieldClass}
            />
          </div>

          {/* PIN code */}
          <label className={`${labelClass} mt-[1rem]`} htmlFor="lead-pin">
            PIN Code
          </label>
          <div className="relative mt-[0.5rem]">
            <MapPin className={iconClass} aria-hidden="true" />
            <input
              id="lead-pin"
              name="pincode"
              type="text"
              required
              inputMode="numeric"
              autoComplete="postal-code"
              pattern="[0-9]{6}"
              title="Enter your 6-digit PIN code"
              maxLength={6}
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="PIN Code"
              className={fieldClass}
            />
          </div>

          {error && (
            <p
              role="alert"
              className="mt-[1rem] text-[0.875rem] font-semibold text-red-600"
            >
              Something went wrong. Please try again or call +91 72008 30719.
              {process.env.NODE_ENV !== "production" && (
                <span className="mt-[0.375rem] block break-words text-[0.75rem] font-normal text-red-500">
                  {error}
                </span>
              )}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-[1.25rem] flex h-[3.25rem] w-full items-center justify-center rounded-[0.5rem] bg-[#f07d19] text-[1.0625rem] font-bold uppercase tracking-[0.03em] text-white transition-colors hover:bg-[#d96c0c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f07d19] disabled:opacity-60"
          >
            {submitting ? "Submitting…" : "Submit"}
          </button>

          <p className="mt-[0.75rem] text-center text-[0.75rem] font-medium leading-[1.5] text-navy/55">
            No obligation. We only use your details to contact you about your
            solar consultation.
          </p>
        </form>
      )}
    </div>
  );
}
