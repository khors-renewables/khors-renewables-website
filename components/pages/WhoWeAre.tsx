import Image from "next/image";
import ConsultationButton from "@/components/consultation/ConsultationButton";
import {
  Zap,
  Leaf,
  ShieldCheck,
  Clock,
  CalendarCheck,
} from "lucide-react";

const points = [
  {
    logo: "/who-we-are/logo1.png",
    text: "At Khors Renewables, we are committed to making solar energy simple, affordable, and accessible for homeowners and businesses across India.",
  },
  {
    logo: "/who-we-are/logo2.png",
    text: "Our mission is to help customers reduce their electricity costs, achieve energy independence, and contribute to a cleaner, greener future.",
  },
  {
    logo: "/who-we-are/logo3.png",
    text: "With a team of qualified engineers, certified installation professionals, and customer support specialists, we provide end-to-end solar solutions\u2014from consultation and design to installation, commissioning, and after-sales support.",
  },
  {
    logo: "/who-we-are/logo4.png",
    text: "Whether you are looking to power your home, commercial building, or industrial facility, we deliver reliable, high-performance solar systems designed for maximum savings and long-term value.",
  },
];

const benefits = [
  {
    Icon: Zap,
    title: "Lower Electricity Bills",
    sub: "Save up to 95% on your electricity costs.",
  },
  {
    Icon: Leaf,
    title: "Clean & Green Energy",
    sub: "Reduce your carbon footprint and protect the environment.",
  },
  {
    Icon: ShieldCheck,
    title: "Reliable Performance",
    sub: "High-efficiency systems built for Indian conditions.",
  },
  {
    Icon: Clock,
    title: "Long-Term Value",
    sub: "Durable solutions with long life and excellent returns.",
  },
];

export default function WhoWeAre() {
  return (
    <section id="who-we-are" className="relative isolate flex min-h-[35rem] w-full flex-col overflow-hidden lg:min-h-[calc(100svh_-_5.75rem)]">
      {/* Background photo — fits the section (no zoom) */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/who-we-are/final-bg2.png"
          alt="Khors Renewables team working on solar panel installation"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* White wash for text legibility */}
      <div className="absolute inset-0 -z-10 bg-white/65 backdrop-blur-[0.1875rem] lg:hidden" />
      <div className="absolute inset-0 -z-10 hidden bg-[linear-gradient(to_right,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.7)_28%,rgba(255,255,255,0.2)_52%,rgba(255,255,255,0)_66%)] lg:block" />

      <div className="relative flex w-full flex-1 flex-col justify-between px-5 pb-6 pt-8 sm:px-8 sm:pt-10 lg:px-[6.25rem] lg:pb-[1.375rem] lg:pt-[2.5rem]">
        {/* Left column content */}
        <div className="w-full max-w-[32.5rem] md:max-w-[28.75rem] lg:max-w-[30rem]">
          <h2 className="font-display text-[1.875rem] font-bold leading-[1.1] text-navy sm:text-[2.75rem] lg:text-[3.25rem]">
            Who we are
          </h2>

          <p className="mt-[0.625rem] font-display text-[1rem] font-bold leading-[1.3] text-brand sm:text-[1.25rem] lg:mt-[0.875rem] lg:text-[1.4375rem]">
            Powering Homes and Businesses
            <br className="hidden sm:block" /> with Clean Energy
          </p>

          {/* Divider */}
          <div className="mt-[0.875rem] h-[0.1875rem] w-[2.5rem] rounded-full bg-navy lg:mt-[1.125rem] lg:h-[0.25rem] lg:w-[3.125rem]" />

          {/* Points */}
          <div className="mt-[1.125rem] -ml-[0.625rem] space-y-[0rem] lg:mt-[2.375rem] lg:-ml-[1.375rem] lg:space-y-[0rem] [text-shadow:0_0_0.5rem_rgba(255,255,255,0.9),0_0_1rem_rgba(255,255,255,0.7)]">
            {points.map(({ logo, text }, i) => (
              <div key={text.slice(0, 30)}>
                {i > 0 && (
                  <div className="ml-[3.625rem] h-px bg-navy/15 sm:ml-[4.25rem] lg:ml-[5rem]" />
                )}
                <div className="flex items-start gap-[0.875rem] py-[0.625rem] lg:gap-[1.125rem] lg:py-[0.875rem]">
                  <span className="relative flex h-[2.75rem] w-[2.75rem] shrink-0 items-center justify-center overflow-hidden rounded-full bg-navy sm:h-[3.375rem] sm:w-[3.375rem] lg:h-[3.875rem] lg:w-[3.875rem] [text-shadow:none]">
                    <Image
                      src={logo}
                      alt=""
                      width={62}
                      height={62}
                      className="h-full w-full object-cover"
                      unoptimized
                    />
                  </span>
                  <p className="min-w-0 text-[0.8125rem] leading-[1.45] text-navy/90 sm:text-[0.875rem] lg:text-[0.9375rem]">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA button — full width on phones, bottom right on desktop */}
        <div className="mt-[1.5rem] flex w-full justify-start sm:justify-end lg:mt-auto">
          <ConsultationButton
            className="inline-flex h-[3.125rem] w-full items-center justify-center gap-[0.6875rem] rounded-[0.625rem] bg-brand-btn px-[1.25rem] text-[0.9375rem] font-medium text-white shadow-[0_0.5rem_1.25rem_rgba(15,26,51,0.2)] transition-colors hover:bg-brand-btn-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-btn sm:w-auto sm:text-[1rem] lg:h-[3.5rem] lg:gap-[0.8125rem] lg:px-[1.5rem] lg:text-[1.125rem]"
          >
            <CalendarCheck className="h-[1.1875rem] w-[1.1875rem] lg:h-[1.375rem] lg:w-[1.375rem]" />
            Schedule a free consultation
          </ConsultationButton>
        </div>
      </div>

      {/* ---------- Benefits bar — full width ---------- */}
      <div className="relative z-10 w-full bg-navy">
        <div className="grid grid-cols-1 divide-y divide-white/15 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0">
          {benefits.map(({ Icon, title, sub }) => (
            <div
              key={title}
              className="relative flex items-center gap-[0.875rem] px-[1.25rem] py-[0.8125rem] lg:gap-[1.125rem] lg:px-[1.375rem] lg:py-[1.125rem] lg:before:absolute lg:before:inset-y-[0.875rem] lg:before:left-0 lg:before:w-px lg:before:bg-white/20 lg:first:before:hidden"
            >
              <Icon className="h-[1.875rem] w-[1.875rem] shrink-0 text-brand-leaf sm:h-[2.25rem] sm:w-[2.25rem] lg:h-[2.625rem] lg:w-[2.625rem]" />
              <span className="block min-w-0">
                <span className="block text-[0.875rem] font-semibold leading-[1.3] text-white lg:text-[1rem]">
                  {title}
                </span>
                <span className="block text-[0.75rem] leading-[1.3] text-white/70 lg:text-[0.8125rem]">
                  {sub}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
