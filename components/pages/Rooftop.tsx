import Image from "next/image";
import ConsultationButton from "@/components/consultation/ConsultationButton";
import {
  CalendarCheck,
  SearchCheck,
  PencilRuler,
  FileCheck2,
  HardHat,
  BarChart3,
  HeadsetIcon,
  IndianRupee,
  TrendingUp,
  ShieldCheck,
  Leaf,
} from "lucide-react";

const steps = [
  {
    Icon: SearchCheck,
    number: 1,
    title: "Site Assessment & Consultation",
    desc: "We evaluate your rooftop suitability, energy needs and savings potential.",
  },
  {
    Icon: PencilRuler,
    number: 2,
    title: "Custom System Design",
    desc: "Our experts design a custom solar system maximizing efficiency and savings.",
  },
  {
    Icon: FileCheck2,
    number: 3,
    title: "Approvals & Documentation",
    desc: "We handle all approvals, net metering and documentation for a hassle-free process.",
  },
  {
    Icon: HardHat,
    number: 4,
    title: "Professional Installation",
    desc: "Our certified team ensures safe, high-quality installation using premium components.",
  },
  {
    Icon: BarChart3,
    number: 5,
    title: "System Testing & Commissioning",
    desc: "We test and commission your system to ensure optimal performance and safety.",
  },
  {
    Icon: HeadsetIcon,
    number: 6,
    title: "Monitoring & After-Sales Support",
    desc: "Real-time monitoring and dedicated support for continuous performance and peace of mind.",
  },
];

const benefits = [
  {
    Icon: IndianRupee,
    title: "Reduce Electricity Bills",
    sub: "Save up to 95% on your electricity bills.",
  },
  {
    Icon: TrendingUp,
    title: "High ROI",
    sub: "Enjoy attractive returns on your investment.",
  },
  {
    Icon: ShieldCheck,
    title: "25+ Years Performance",
    sub: "Long-lasting systems with strong warranties.",
  },
  {
    Icon: Leaf,
    title: "Clean & Green Energy",
    sub: "Contribute to a sustainable and greener tomorrow.",
  },
];

export default function Rooftop() {
  return (
    <section id="rooftop" className="w-full">
      {/* Hero area — content left, image right */}
      <div className="relative w-full overflow-hidden bg-white lg:min-h-[27.5rem]">
        <div className="flex w-full flex-col lg:flex-row">
          {/* Left content */}
          <div className="flex flex-1 flex-col justify-center px-5 py-8 sm:px-8 lg:max-w-[50%] lg:px-[6.25rem] lg:py-[2.5rem]">
            <div className="max-w-[30rem]">
              <h2 className="font-display text-[1.875rem] font-bold leading-[1.1] text-navy sm:text-[2.75rem] lg:text-[3.25rem]">
                Rooftop Solar
                <br />
                <span className="text-brand">Solutions</span>
              </h2>

              {/* Divider */}
              <div className="mt-[0.875rem] h-[0.1875rem] w-[2.5rem] rounded-full bg-navy lg:mt-[1.125rem] lg:h-[0.25rem] lg:w-[3.125rem]" />

              <p className="mt-[1rem] text-[0.875rem] leading-[1.5] text-navy/80 sm:text-[0.9375rem] lg:mt-[1.25rem] lg:text-[1.0625rem]">
                Smart, Sustainable, Savings for a lifetime.
                <br className="hidden sm:block" /> Power your home or business
                with clean solar energy.
              </p>

              <ConsultationButton
                className="mt-[1.375rem] inline-flex h-[3.125rem] w-full items-center justify-center gap-[0.6875rem] rounded-[0.625rem] bg-brand-btn px-[1.25rem] text-[0.9375rem] font-medium text-white shadow-[0_0.5rem_1.25rem_rgba(15,26,51,0.2)] transition-colors hover:bg-brand-btn-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-btn sm:w-auto sm:justify-start sm:text-[1rem] lg:mt-[1.75rem] lg:h-[3.5rem] lg:gap-[0.8125rem] lg:px-[1.5rem] lg:text-[1.125rem]"
              >
                <CalendarCheck className="h-[1.1875rem] w-[1.1875rem] lg:h-[1.375rem] lg:w-[1.375rem]" />
                Schedule a free consultation
              </ConsultationButton>
            </div>
          </div>

          {/* Right image */}
          <div className="relative min-h-[16.25rem] w-full lg:min-h-[27.5rem] lg:w-[50%]">
            <Image
              src="/rooftop/house.png"
              alt="House with rooftop solar panels"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
            {/* Fade edges — the horizontal fade only makes sense side-by-side */}
            <div className="absolute inset-0 hidden bg-[linear-gradient(to_right,white_0%,transparent_20%)] lg:block" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,white_0%,transparent_15%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,white_0%,transparent_15%)]" />
          </div>
        </div>
      </div>

      {/* Services grid */}
      <div className="w-full bg-white px-5 py-[1.5rem] sm:px-8 lg:px-[2.5rem] lg:py-[2.25rem]">
        <div className="w-full text-center">
          <h3 className="font-display text-[1.625rem] font-bold text-navy sm:text-[1.875rem] lg:text-[2.25rem]">
            Our Rooftop Solar Services
          </h3>
          <p className="mt-[0.375rem] text-[0.875rem] text-navy/70 lg:text-[1rem]">
            Complete solutions tailored to your energy needs.
          </p>

          <div className="mt-[1.25rem] grid grid-cols-2 gap-x-[0.875rem] gap-y-[1.375rem] sm:gap-[1rem] lg:mt-[1.75rem] lg:grid-cols-3 xl:grid-cols-6 xl:gap-[0.625rem]">
            {steps.map(({ Icon, number, title, desc }) => (
              <div
                key={title}
                className="flex flex-col items-center text-center"
              >
                <span className="flex h-[3rem] w-[3rem] items-center justify-center rounded-[0.75rem] border-2 border-navy/20 text-navy sm:h-[3.5rem] sm:w-[3.5rem] lg:h-[4rem] lg:w-[4rem]">
                  <Icon className="h-[1.5rem] w-[1.5rem] sm:h-[1.75rem] sm:w-[1.75rem] lg:h-[2rem] lg:w-[2rem]" />
                </span>
                <h4 className="mt-[0.625rem] text-[0.8125rem] font-bold leading-[1.3] text-navy sm:mt-[0.75rem] sm:text-[0.875rem] lg:mt-[1rem] lg:text-[0.9375rem]">
                  {number}. {title}
                </h4>
                <p className="mt-[0.375rem] text-[0.7188rem] leading-[1.4] text-navy/70 sm:text-[0.75rem] lg:text-[0.8125rem]">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- Benefits bar ---------- */}
      <div className="w-full bg-white shadow-[0_0.25rem_1.5rem_rgba(15,26,51,0.1)]">
        <div className="grid grid-cols-1 divide-y divide-navy/10 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0">
          {benefits.map(({ Icon, title, sub }) => (
            <div
              key={title}
              className="relative flex items-center gap-[0.875rem] px-[1.25rem] py-[0.9375rem] sm:py-[1.25rem] lg:gap-[1.125rem] lg:px-[1.75rem] lg:py-[1.625rem] lg:before:absolute lg:before:inset-y-[1rem] lg:before:left-0 lg:before:w-px lg:before:bg-navy/10 lg:first:before:hidden"
            >
              <Icon className="h-[1.875rem] w-[1.875rem] shrink-0 text-brand sm:h-[2.25rem] sm:w-[2.25rem] lg:h-[2.625rem] lg:w-[2.625rem]" />
              <span className="block min-w-0">
                <span className="block text-[0.875rem] font-semibold leading-[1.3] text-navy lg:text-[1rem]">
                  {title}
                </span>
                <span className="block text-[0.75rem] leading-[1.3] text-navy/60 lg:text-[0.8125rem]">
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
