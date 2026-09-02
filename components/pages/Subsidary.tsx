import Image from "next/image";
import ConsultationButton from "@/components/consultation/ConsultationButton";
import {
  CalendarCheck,
  ClipboardCheck,
  FileText,
  FileSearch,
  Send,
  CheckCircle2,
  Home,
  IndianRupee,
  Compass,
  ThumbsUp,
} from "lucide-react";

const processSteps = [
  {
    number: "01",
    Icon: FileSearch,
    title: "Eligibility Analysis",
    desc: "We assess your profile and solar project to identify all eligible incentives.",
  },
  {
    number: "02",
    Icon: FileText,
    title: "Application Support",
    desc: "We assist in preparing and submitting your subsidy applications accurately.",
  },
  {
    number: "03",
    Icon: ClipboardCheck,
    title: "Documentation Review",
    desc: "Our team reviews all documents to ensure accuracy and compliance.",
  },
  {
    number: "04",
    Icon: Send,
    title: "Final Submission",
    desc: "We handle the final submission and follow-up until you receive your approved incentives.",
  },
];

const subsidyTable = [
  { size: "Up to 1 kW", amount: "₹30,000" },
  { size: "2 kW", amount: "₹60,000" },
  { size: "3 kW", amount: "₹78,000" },
];

const benefits = [
  {
    Icon: CheckCircle2,
    title: "Hassle-Free Process",
    sub: "We handle the paperwork, you enjoy the benefits.",
  },
  {
    Icon: IndianRupee,
    title: "Maximum Benefits",
    sub: "We ensure you get every incentive you deserve.",
  },
  {
    Icon: Compass,
    title: "Expert Guidance",
    sub: "Our experts simplify the process from start to finish.",
  },
  {
    Icon: ThumbsUp,
    title: "Trusted by Customers",
    sub: "Happy customers benefiting every day.",
  },
];

export default function Subsidary() {
  return (
    <section id="subsidary" className="relative isolate w-full flex flex-col overflow-hidden lg:min-h-[calc(100svh_-_5.75rem)]">
      {/* Background image */}
      <Image
        src="/subsidary/back3.png"
        alt="Government subsidy benefits for solar installations"
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[center_20%]"
        priority
      />

      {/* Wash for readability on phones and tablets */}
      <div className="absolute inset-0 -z-10 bg-white/70 backdrop-blur-[0.1875rem] lg:hidden" />
      {/* Desktop gradient overlay — left side readable */}
      <div className="absolute inset-0 -z-10 hidden bg-[linear-gradient(to_right,rgba(255,255,255,0.93)_0%,rgba(255,255,255,0.78)_28%,rgba(255,255,255,0.25)_52%,rgba(255,255,255,0)_65%)] lg:block" />

      {/* Main content */}
      <div className="relative flex flex-1 w-full flex-col px-5 py-[1.75rem] sm:px-8 md:flex-row md:items-center md:gap-[1.875rem] lg:gap-[3.125rem] lg:px-[5rem] lg:py-[2.5rem]">
        {/* Left column */}
        <div className="flex w-full flex-col justify-center md:max-w-[25rem] md:shrink-0 lg:max-w-[27.5rem]">
          <h2 className="font-display text-[2.125rem] font-bold leading-[1.08] text-navy sm:text-[2.625rem] lg:text-[3.25rem]">
            Government
            <br />
            subsidy benefits
          </h2>

          {/* Badge */}
          <div className="mt-[0.875rem] inline-flex w-fit items-center gap-[0.5rem] rounded-[0.375rem] bg-navy px-[0.75rem] py-[0.4375rem] lg:mt-[1rem] lg:px-[0.875rem] lg:py-[0.5rem]">
            <CheckCircle2 className="h-[1rem] w-[1rem] text-brand-leaf lg:h-[1.125rem] lg:w-[1.125rem]" />
            <span className="text-[0.8125rem] font-semibold text-white lg:text-[0.9375rem]">Residential Solar Subsidy</span>
          </div>

          {/* Subheading */}
          <div className="mt-[0.875rem] flex items-center gap-[0.375rem] lg:mt-[1rem]">
            <CheckCircle2 className="h-[1rem] w-[1rem] text-navy lg:h-[1.125rem] lg:w-[1.125rem]" />
            <p className="text-[0.875rem] font-bold text-navy lg:text-[1rem]">
              Maximum Savings. <span className="italic">Stronger Future.</span>
            </p>
          </div>

          <p className="mt-[0.625rem] text-[0.8125rem] font-bold leading-[1.5] text-navy/80 lg:mt-[0.75rem] lg:text-[0.9375rem]">
            We navigate the complex landscape of government incentives to ensure you receive <strong>every rupee</strong> you are entitled to.
          </p>

          {/* Process steps */}
          <div className="mt-[1.125rem] space-y-[0.75rem] lg:mt-[1.375rem] lg:space-y-[0.875rem]">
            {processSteps.map(({ number, Icon, title, desc }) => (
              <div key={number} className="flex items-start gap-[0.625rem] lg:gap-[0.75rem]">
                <span className="flex h-[1.875rem] w-[1.875rem] shrink-0 items-center justify-center rounded-full bg-navy text-[0.6875rem] font-bold text-white lg:h-[2.125rem] lg:w-[2.125rem] lg:text-[0.8125rem]">
                  {number}
                </span>
                <div className="flex min-w-0 items-start gap-[0.5rem]">
                  <span className="mt-[0.125rem] flex h-[1.625rem] w-[1.625rem] shrink-0 items-center justify-center rounded-[0.375rem] bg-brand/10 lg:h-[1.875rem] lg:w-[1.875rem]">
                    <Icon className="h-[0.875rem] w-[0.875rem] text-brand lg:h-[1rem] lg:w-[1rem]" />
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-[0.8125rem] font-bold text-navy lg:text-[0.9375rem]">{title}</h4>
                    <p className="text-[0.6875rem] font-bold leading-[1.4] text-navy/70 lg:text-[0.8125rem]">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — subsidy table card */}
        <div className="mt-[1.5rem] flex w-full min-w-0 flex-1 items-end justify-center md:mt-0 md:justify-start md:pb-[0.375rem] md:pl-[3rem] lg:pb-[0.625rem] lg:pl-[5rem]">
          <div className="w-full max-w-[25rem] rounded-[0.75rem] bg-white/95 px-[1rem] py-[1rem] shadow-[0_0.5rem_1.875rem_rgba(15,26,51,0.14)] backdrop-blur-sm md:max-w-[18.75rem] lg:max-w-[20.625rem] lg:px-[1.25rem] lg:py-[1.25rem]">
            <div className="flex items-center gap-[0.5rem]">
              <Home className="h-[1.125rem] w-[1.125rem] text-navy lg:h-[1.25rem] lg:w-[1.25rem]" />
              <h3 className="text-[0.875rem] font-bold uppercase tracking-[0.04em] text-navy lg:text-[1rem]">
                Residential Solar Subsidy
              </h3>
            </div>

            {/* Table */}
            <div className="mt-[0.875rem] overflow-hidden rounded-[0.625rem] border border-navy/10">
              <div className="grid grid-cols-2 gap-[0.5rem] bg-navy/5 px-[0.875rem] py-[0.625rem]">
                <span className="text-[0.75rem] font-semibold text-navy lg:text-[0.8125rem]">System Size</span>
                <span className="text-[0.75rem] font-semibold text-navy lg:text-[0.8125rem]">Subsidy Available</span>
              </div>
              {subsidyTable.map(({ size, amount }) => (
                <div key={size} className="grid grid-cols-2 items-center gap-[0.5rem] border-t border-navy/10 px-[0.875rem] py-[0.75rem] lg:py-[0.875rem]">
                  <div className="flex min-w-0 items-center gap-[0.375rem]">
                    <Home className="h-[1rem] w-[1rem] shrink-0 text-brand lg:h-[1.125rem] lg:w-[1.125rem]" />
                    <span className="truncate text-[0.8125rem] font-bold text-navy lg:text-[0.9375rem]">{size}</span>
                  </div>
                  <div className="flex min-w-0 flex-wrap items-baseline gap-x-[0.25rem]">
                    <span className="text-[0.75rem] font-bold text-navy/70 lg:text-[0.8125rem]">Up to</span>
                    <span className="text-[1.125rem] font-bold text-navy lg:text-[1.375rem]">{amount}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom note */}
            <div className="mt-[0.875rem] flex items-center gap-[0.375rem]">
              <CheckCircle2 className="h-[0.875rem] w-[0.875rem] text-brand lg:h-[1rem] lg:w-[1rem]" />
              <p className="text-[0.75rem] font-bold text-navy/80 lg:text-[0.8125rem]">
                We make the subsidy process simple, fast &amp; hassle-free.
              </p>
            </div>

            <ConsultationButton
              className="mt-[0.875rem] inline-flex h-[2.75rem] w-full items-center justify-center gap-[0.5625rem] rounded-[0.5rem] bg-brand-btn px-[1rem] text-[0.875rem] font-medium text-white shadow-[0_0.375rem_1rem_rgba(15,26,51,0.15)] transition-colors hover:bg-brand-btn-hover md:w-auto md:justify-start lg:mt-[1rem] lg:h-[3rem] lg:gap-[0.625rem] lg:px-[1.25rem] lg:text-[1rem]"
            >
              <CalendarCheck className="h-[1rem] w-[1rem] lg:h-[1.125rem] lg:w-[1.125rem]" />
              Schedule a free consultation
            </ConsultationButton>
          </div>
        </div>
      </div>

      {/* Benefits bar — bottom */}
      <div className="relative z-10 w-full bg-navy shadow-[0_-0.25rem_2.125rem_rgba(15,26,51,0.12)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ Icon, title, sub }) => (
            <div
              key={title}
              className="relative flex items-center gap-[0.875rem] px-[1.125rem] py-[0.875rem] lg:gap-[1rem] lg:px-[1.375rem] lg:py-[1.125rem] lg:before:absolute lg:before:inset-y-[0.875rem] lg:before:left-0 lg:before:w-px lg:before:bg-white/20 lg:first:before:hidden"
            >
              <Icon className="h-[2rem] w-[2rem] shrink-0 text-brand-leaf lg:h-[2.375rem] lg:w-[2.375rem]" />
              <span className="block">
                <span className="block text-[0.8125rem] font-semibold leading-[1.3] text-white lg:text-[0.9375rem]">
                  {title}
                </span>
                <span className="block text-[0.6875rem] font-bold leading-[1.3] text-white/70 lg:text-[0.8125rem]">
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
