import Image from "next/image";
import ConsultationButton from "@/components/consultation/ConsultationButton";
import {
  CalendarCheck,
  Mail,
  Phone,
  MapPin,
  Clock,
  Calendar,
} from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="relative isolate w-full flex flex-col overflow-hidden lg:min-h-[calc(100svh_-_5.75rem)]">
      {/* Background image */}
      <Image
        src="/contact/background2.png"
        alt="Khors Renewables customer support representative"
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[center_35%]"
        priority
      />

      {/* Wash for readability on phones and tablets */}
      <div className="absolute inset-0 -z-10 bg-white/75 backdrop-blur-[0.1875rem] lg:hidden" />
      {/* Desktop gradient overlay */}
      <div className="absolute inset-0 -z-10 hidden bg-[linear-gradient(to_right,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.85)_30%,rgba(255,255,255,0.3)_55%,rgba(255,255,255,0)_68%)] lg:block" />

      {/* Main content */}
      <div className="relative flex w-full flex-1 flex-col justify-center px-5 py-[2rem] sm:px-8 lg:px-[5rem] lg:py-[3rem]">
        {/* Heading row — the tagline sits on the same line as the heading */}
        <div className="flex w-full items-start gap-[2.25rem] lg:gap-[4.375rem]">
          <h2 className="w-full font-display text-[1.875rem] font-bold leading-[1.08] text-navy sm:text-[2.75rem] md:max-w-[28.75rem] lg:max-w-[31.25rem] lg:text-[3.375rem]">
            Connect with us
          </h2>

          {/* Tagline — aligned with the heading, hidden on phones */}
          <div className="hidden min-w-0 flex-1 text-left [text-shadow:0_0_0.75rem_rgba(255,255,255,0.9),0_0_1.5rem_rgba(255,255,255,0.7)] md:block">
            <p className="font-display text-[1.25rem] font-bold uppercase leading-[1.3] text-navy lg:text-[1.625rem]">
              Clean Energy.
            </p>
            <p className="font-display text-[1.25rem] font-bold uppercase leading-[1.3] text-navy lg:text-[1.625rem]">
              Lower Bills.
            </p>
            <p className="font-display text-[1.25rem] font-bold uppercase leading-[1.3] text-brand lg:text-[1.625rem]">
              Better Tomorrow.
            </p>
          </div>
        </div>

        {/* Remaining content, constrained to the left column width */}
        <div className="flex w-full flex-col md:max-w-[28.75rem] lg:max-w-[31.25rem]">
          {/* Tagline — shown inline on phones where the image version is cropped out */}
          <div className="mt-[0.75rem] md:hidden">
            <p className="font-display text-[0.9375rem] font-bold uppercase leading-[1.35] text-navy">
              Clean Energy. Lower Bills.
            </p>
            <p className="font-display text-[0.9375rem] font-bold uppercase leading-[1.35] text-brand">
              Better Tomorrow.
            </p>
          </div>

          {/* CTA */}
          <ConsultationButton
            className="mt-[1.125rem] inline-flex h-[3rem] w-full items-center justify-center gap-[0.625rem] rounded-[0.5rem] bg-brand-btn px-[1.125rem] text-[0.875rem] font-bold text-white shadow-[0_0.5rem_1.25rem_rgba(15,26,51,0.2)] transition-colors hover:bg-brand-btn-hover sm:w-fit sm:text-[0.9375rem] lg:mt-[1.375rem] lg:h-[3.25rem] lg:gap-[0.75rem] lg:px-[1.375rem] lg:text-[1.0625rem]"
          >
            <CalendarCheck className="h-[1.125rem] w-[1.125rem] lg:h-[1.25rem] lg:w-[1.25rem]" />
            Schedule a free consultation
          </ConsultationButton>

          {/* Contact Information card */}
          <div className="mt-[1.75rem] rounded-[0.875rem] border border-navy/10 bg-white/80 px-[1.25rem] py-[1.125rem] backdrop-blur-sm lg:mt-[2.125rem] lg:px-[1.5rem] lg:py-[1.375rem]">
            <div className="flex items-center gap-[0.75rem]">
              <span className="flex h-[2.75rem] w-[2.75rem] items-center justify-center rounded-full bg-brand/10 lg:h-[3.125rem] lg:w-[3.125rem]">
                <Mail className="h-[1.375rem] w-[1.375rem] text-brand lg:h-[1.625rem] lg:w-[1.625rem]" />
              </span>
              <h3 className="text-[1.0625rem] font-bold text-navy lg:text-[1.25rem]">Contact Information</h3>
            </div>

            <div className="mt-[0.875rem] space-y-[0.625rem] lg:mt-[1rem] lg:space-y-[0.75rem]">
              <div className="flex min-w-0 items-center gap-[0.625rem]">
                <Mail className="h-[1rem] w-[1rem] shrink-0 text-navy/60 lg:h-[1.125rem] lg:w-[1.125rem]" />
                <a
                  href="mailto:info@khorsrenewables.com"
                  className="min-w-0 break-all text-[0.8438rem] font-semibold text-navy transition-colors hover:text-brand sm:text-[0.875rem] lg:text-[1rem]"
                >
                  contact@khorsrenewables.com
                </a>
              </div>
              <div className="flex min-w-0 items-center gap-[0.625rem]">
                <Phone className="h-[1rem] w-[1rem] shrink-0 text-navy/60 lg:h-[1.125rem] lg:w-[1.125rem]" />
                <a
                  href="tel:+917200830719"
                  className="text-[0.8438rem] font-semibold text-navy transition-colors hover:text-brand sm:text-[0.875rem] lg:text-[1rem]"
                >
                  +91 72008 30719
                </a>
              </div>
              <div className="flex min-w-0 items-center gap-[0.625rem]">
                <Phone className="h-[1rem] w-[1rem] shrink-0 text-navy/60 lg:h-[1.125rem] lg:w-[1.125rem]" />
                <a
                  href="tel:+917200539720"
                  className="text-[0.8438rem] font-semibold text-navy transition-colors hover:text-brand sm:text-[0.875rem] lg:text-[1rem]"
                >
                  +91 72005 39720
                </a>
              </div>
              <div className="flex items-start gap-[0.625rem]">
                <MapPin className="mt-[0.125rem] h-[1rem] w-[1rem] shrink-0 text-navy/60 lg:h-[1.125rem] lg:w-[1.125rem]" />
                <span className="text-[0.8438rem] font-semibold leading-[1.4] text-navy sm:text-[0.875rem] lg:text-[1rem]">
                  #5A, Taramani Link Road, Baby Nagar,
                  <br className="hidden sm:block" /> Velachery, Chennai, Tamil
                  Nadu – 600042
                </span>
              </div>
            </div>
          </div>

          {/* Business Hours card */}
          <div className="mt-[1rem] rounded-[0.875rem] border border-navy/10 bg-white/80 px-[1.25rem] py-[1.125rem] backdrop-blur-sm lg:mt-[1.125rem] lg:px-[1.5rem] lg:py-[1.375rem]">
            <div className="flex items-center gap-[0.75rem]">
              <span className="flex h-[2.75rem] w-[2.75rem] items-center justify-center rounded-full bg-brand/10 lg:h-[3.125rem] lg:w-[3.125rem]">
                <Clock className="h-[1.375rem] w-[1.375rem] text-brand lg:h-[1.625rem] lg:w-[1.625rem]" />
              </span>
              <h3 className="text-[1.0625rem] font-bold text-navy lg:text-[1.25rem]">Business Hours</h3>
            </div>

            <div className="mt-[0.875rem] flex items-center gap-[0.625rem] lg:mt-[1rem]">
              <Calendar className="h-[1rem] w-[1rem] shrink-0 text-navy/60 lg:h-[1.125rem] lg:w-[1.125rem]" />
              <span className="text-[0.875rem] font-semibold text-navy lg:text-[1rem]">MON–SAT: 10:30 AM – 7:30 PM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
