import Image from "next/image";
import ConsultationButton from "@/components/consultation/ConsultationButton";
import {
  Zap,
  Sprout,
  Factory,
  ShieldCheck,
  Settings,
  TrendingUp,
  Globe,
  CalendarCheck,
} from "lucide-react";

const bullets = [
  {
    Icon: Zap,
    title: "Save more on bills.",
    sub: "Use that money for what matters.",
  },
  {
    Icon: Sprout,
    title: "Save the planet",
    sub: "for generations to come.",
  },
  {
    Icon: Factory,
    title: "Reduce carbon emissions today.",
    sub: "Build a cleaner tomorrow.",
  },
];

const trust = [
  { Icon: ShieldCheck, title: "High Quality", sub: "Solar Solutions" },
  { Icon: Settings, title: "Expert Installation", sub: "& Support" },
  { Icon: TrendingUp, title: "Maximum Savings", sub: "Guaranteed" },
  { Icon: Globe, title: "A Greener Planet", sub: "for Our Future" },
];

export default function Hero() {
  return (
    <section id="home" className="relative isolate flex min-h-[38.75rem] w-full flex-col overflow-hidden sm:min-h-[47.5rem] lg:min-h-[calc(100svh_-_5.75rem)]">
      {/* Background photo */}
      <Image
        src="/hero/bg3.png"
        alt="Solar technician standing above a city neighbourhood of rooftop solar homes"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[68%_60%] lg:object-[center_60%]"
      />

      {/* White wash so the copy stays legible over the photo */}
      <div className="absolute inset-0 -z-10 bg-white/60 backdrop-blur-[0.1875rem] lg:hidden" />
      <div className="absolute inset-0 -z-10 hidden bg-[linear-gradient(to_right,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.66)_24%,rgba(255,255,255,0.18)_50%,rgba(255,255,255,0)_66%)] lg:block" />

      <div className="relative flex w-full max-w-[90rem] flex-1 flex-col justify-between px-5 pb-6 pt-6 sm:px-8 sm:pt-8 lg:px-[6.25rem] lg:pb-[1.375rem] lg:pt-[2rem]">


        {/* ---------- Left column ---------- */}
        <div className="max-w-[43.75rem] md:max-w-[48.75rem] lg:max-w-[56.25rem] [text-shadow:0_0_0.625rem_rgba(255,255,255,0.8),0_0_1.25rem_rgba(255,255,255,0.6)]">
          <h1 className="font-display font-bold tracking-[-0.015em] text-navy">
            <span className="block text-[2rem] leading-[1.14] sm:text-[3.0625rem] lg:whitespace-nowrap lg:text-[3.8125rem]">
              Cut your electricity bills
            </span>
            <span className="block text-[2rem] leading-[1.14] sm:text-[3.0625rem] lg:text-[3.8125rem]">
              by up to{" "}
              <span className="text-[2.375rem] leading-none text-brand sm:text-[3.5rem] lg:text-[4.625rem]">
                95%.
              </span>
            </span>
          </h1>

          {/* Benefit rows */}
          <div className="mt-[1.25rem] max-w-[28.75rem] lg:mt-[1.4375rem]">
            {bullets.map(({ Icon, title, sub }, i) => (
              <div key={title}>
                {i > 0 && (
                  <div className="my-[0.5rem] ml-[3.625rem] h-px bg-navy/20 lg:ml-[5.375rem] lg:my-[0.625rem]" />
                )}
                <div className="flex min-h-[2.625rem] items-center gap-[0.875rem] lg:min-h-[3.6875rem] lg:gap-[1.5625rem]">
                  <span className="flex h-[2.75rem] w-[2.75rem] shrink-0 items-center justify-center rounded-full bg-navy text-white lg:h-[3.6875rem] lg:w-[3.6875rem]">
                    <Icon className="h-[1.375rem] w-[1.375rem] lg:h-[1.75rem] lg:w-[1.75rem]" />
                  </span>
                  <span className="block min-w-0">
                    <span className="block text-[0.9375rem] font-semibold leading-[1.35] text-navy sm:text-[1.125rem] lg:text-[1.4375rem]">
                      {title}
                    </span>
                    <span className="block text-[0.9375rem] leading-[1.35] text-navy/90 sm:text-[1.125rem] lg:text-[1.4375rem]">
                      {sub}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Short rule */}
          <div className="mt-[1.375rem] h-[0.1875rem] w-[2.25rem] rounded-full bg-navy lg:mt-[1.6875rem] lg:h-[0.25rem] lg:w-[2.8125rem]" />

          <p className="mt-[0.75rem] font-display text-[1.0625rem] font-bold leading-[1.38] text-navy sm:text-[1.375rem] lg:mt-[0.875rem] lg:text-[1.875rem]">
            Your choice today powers a better
            <br className="hidden sm:block" /> tomorrow for{" "}
            <span className="text-brand">you and the planet.</span>
          </p>

          <ConsultationButton
            className="mt-[1rem] inline-flex h-[3.125rem] w-full items-center justify-center gap-[0.6875rem] rounded-[0.625rem] bg-brand-btn px-[1.25rem] text-[0.9375rem] font-medium text-white shadow-[0_0.5rem_1.25rem_rgba(15,26,51,0.2)] transition-colors hover:bg-brand-btn-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-btn sm:w-auto sm:justify-start sm:text-[1rem] lg:mt-[1.125rem] lg:h-[3.6875rem] lg:gap-[0.8125rem] lg:px-[1.6875rem] lg:text-[1.25rem] [text-shadow:none]"
          >
            <CalendarCheck className="h-[1.1875rem] w-[1.1875rem] lg:h-[1.375rem] lg:w-[1.375rem]" />
            Schedule a free consultation
          </ConsultationButton>
        </div>
      </div>

      {/* ---------- Trust bar — full width ---------- */}
      <div className="relative z-10 mx-[0.625rem] mb-[0.625rem] rounded-[0.875rem] bg-white shadow-[0_-0.25rem_2.125rem_rgba(15,26,51,0.12)] sm:mx-8 lg:ml-[6.25rem] lg:mr-[0.625rem]">
        <div className="grid grid-cols-1 divide-y divide-navy/10 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0">
          {trust.map(({ Icon, title, sub }) => (
            <div
              key={title}
              className="relative flex items-center gap-[0.875rem] px-[1.125rem] py-[0.875rem] sm:gap-[1.125rem] sm:px-[1.375rem] sm:py-[1rem] lg:justify-center lg:gap-[1.5rem] lg:px-[1.625rem] lg:py-[1.3125rem] lg:before:absolute lg:before:inset-y-[1rem] lg:before:left-0 lg:before:w-px lg:before:bg-navy/15 lg:first:before:hidden"
            >
              <Icon className="h-[2rem] w-[2rem] shrink-0 text-navy sm:h-[2.375rem] sm:w-[2.375rem] lg:h-[2.9375rem] lg:w-[2.9375rem]" />
              <span className="block min-w-0">
                <span className="block text-[0.875rem] font-semibold leading-[1.3] text-navy sm:text-[0.9375rem] lg:text-[1.25rem]">
                  {title}
                </span>
                <span className="block text-[0.875rem] leading-[1.3] text-navy sm:text-[0.9375rem] lg:text-[1.25rem]">
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
