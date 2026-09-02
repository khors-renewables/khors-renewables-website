"use client";

import { useEffect, useState } from "react";
import { X, Info } from "lucide-react";
import { useConsultation } from "./ConsultationContext";

const billOptions = [
  "Less than \u20B91500",
  "\u20B91500 \u2013 \u20B92500",
  "\u20B92500 \u2013 \u20B94000",
  "\u20B94000 \u2013 \u20B98000",
  "More than \u20B98000",
];

export default function ConsultationModal() {
  const { isOpen, close } = useConsultation();

  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bill, setBill] = useState<string | null>(null);
  const [pincode, setPincode] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  // Lock body scroll while open and allow Escape to close.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          whatsapp,
          bill,
          pincode,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    close();
    // Reset after the modal is dismissed so it opens fresh next time.
    setTimeout(() => {
      setSubmitted(false);
      setError(false);
      setFullName("");
      setWhatsapp("");
      setBill(null);
      setPincode("");
    }, 200);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-[1rem]"
      role="dialog"
      aria-modal="true"
      aria-label="Get a free consultation"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy/50 backdrop-blur-[0.125rem]"
        onClick={handleClose}
      />

      {/* Panel */}
      <div className="relative z-10 max-h-[92vh] w-full max-w-[34rem] overflow-y-auto rounded-[1.5rem] bg-[#eef1fb] p-[1.75rem] shadow-[0_20px_60px_rgba(15,26,51,0.35)] sm:p-[2.25rem]">
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute right-[1.25rem] top-[1.25rem] text-navy/50 transition-colors hover:text-navy"
        >
          <X className="h-[1.5rem] w-[1.5rem]" />
        </button>

        {submitted ? (
          <div className="py-[2rem] text-center">
            <h2 className="font-display text-[1.75rem] font-bold text-navy">
              Thank you!
            </h2>
            <p className="mt-[0.75rem] text-[1rem] text-navy/70">
              We&apos;ve received your details. Our team will reach out to you on
              WhatsApp shortly.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-[1.5rem] inline-flex h-[3rem] items-center justify-center rounded-[0.75rem] bg-gradient-to-r from-[#12308a] to-[#0b1638] px-[2rem] text-[1rem] font-bold text-white"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="font-display text-[1.75rem] font-bold leading-tight text-navy sm:text-[2rem]">
              Get a FREE Consultation
            </h2>

            {/* Full name */}
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              className="mt-[1.5rem] w-full rounded-[1rem] bg-white px-[1.25rem] py-[1rem] text-[1rem] font-medium text-navy placeholder:text-navy/40 focus:outline-2 focus:outline-brand"
            />

            {/* WhatsApp */}
            <input
              type="tel"
              required
              inputMode="numeric"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="Whatsapp Number"
              className="mt-[1rem] w-full rounded-[1rem] bg-white px-[1.25rem] py-[1rem] text-[1rem] font-medium text-navy placeholder:text-navy/40 focus:outline-2 focus:outline-brand"
            />

            {/* Monthly bill */}
            <div className="mt-[1.5rem] flex items-center gap-[0.375rem]">
              <span className="text-[1rem] font-semibold text-navy/80">
                Monthly Electricity Bill
              </span>
              <Info className="h-[1rem] w-[1rem] text-navy/40" />
            </div>

            <div className="mt-[0.75rem] flex flex-wrap gap-[0.75rem]">
              {billOptions.map((option) => {
                const selected = bill === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setBill(option)}
                    className={`rounded-[0.875rem] px-[1.125rem] py-[0.875rem] text-[1rem] font-bold transition-colors ${
                      selected
                        ? "bg-brand-btn text-white"
                        : "bg-white text-navy hover:bg-white/70"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Pin code */}
            <input
              type="text"
              required
              inputMode="numeric"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="PIN Code"
              className="mt-[1.5rem] w-full rounded-[1rem] bg-white px-[1.25rem] py-[1rem] text-[1rem] font-medium text-navy placeholder:text-navy/40 focus:outline-2 focus:outline-brand"
            />

            {/* Error message */}
            {error && (
              <p className="mt-[1rem] text-[0.875rem] font-semibold text-red-600">
                Something went wrong. Please try again.
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="mt-[1.5rem] flex h-[3.5rem] w-full items-center justify-center rounded-[0.875rem] bg-gradient-to-r from-[#12308a] to-[#0b1638] text-[1.125rem] font-bold text-white transition-opacity hover:opacity-95 disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Details"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
