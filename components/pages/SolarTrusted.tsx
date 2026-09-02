import Image from "next/image";
import ConsultationButton from "@/components/consultation/ConsultationButton";
import {
  CalendarCheck,
} from "lucide-react";

const cards = [
  {
    logo: "/solar-trusted/logo1.png",
    title: "MNRE COMPLIANT INSTALLATIONS",
    desc: "All our installations are fully compliant with MNRE guidelines and industry standards.",
  },
  {
    logo: "/solar-trusted/logo2.png",
    title: "GOVERNMENT SUBSIDY ASSISTANCE",
    desc: "End-to-end support for subsidy applications, documentation and claim processing.",
  },
  {
    logo: "/solar-trusted/logo3.png",
    title: "PREMIUM QUALITY COMPONENTS",
    desc: "We use Tier-1 solar panels, reliable inverters and durable mounting structures for maximum performance.",
  },
  {
    logo: "/solar-trusted/logo4.png",
    title: "CERTIFIED INSTALLATION TEAM",
    desc: "Our trained and certified professionals ensure safe, efficient and high-quality installations.",
  },
];

const products = [
  {
    image: "/solar-trusted/solar-panels.png",
    title: "SOLAR PANELS",
    tags: ["High Efficiency", "Tier-1 Quality", "Long Lasting"],
  },
  {
    image: "/solar-trusted/inverters.png",
    title: "INVERTERS",
    tags: ["Reliable", "Efficient", "Smart"],
  },
  {
    image: "/solar-trusted/mounting-structures.png",
    title: "MOUNTING STRUCTURES",
    tags: ["Corrosion Resistant", "Durable", "Safe"],
  },
];

export default function SolarTrusted() {
  return (
    <section id="solar-trusted" className="relative w-full overflow-hidden">
      {/* Background image — cover full screen */}
      <Image
        src="/solar-trusted/background2.png"
        alt="Khors Renewables trusted solar solutions"
        fill
        sizes="100vw"
        className="object-cover object-[center_25%]"
        priority
      />

      <div className="relative flex flex-col lg:min-h-[calc(100svh_-_5.75rem)]">
        {/* Wash for readability on phones and tablets */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[0.125rem] lg:hidden" />

        <div className="relative flex flex-1 flex-col px-5 py-[1.875rem] sm:px-8 lg:px-[5rem] lg:py-[2.5rem] [@media(min-width:1024px)_and_(max-height:820px)]:py-[1.375rem]">
          {/* Heading — centered */}
          <div className="text-center">
            <h2 className="font-display text-[1.75rem] font-bold leading-[1.1] text-navy sm:text-[2.25rem] lg:text-[3rem] [@media(min-width:1024px)_and_(max-height:820px)]:text-[2.375rem] [@media(min-width:1024px)_and_(max-height:700px)]:text-[1.9375rem]">
              Trusted <span className="italic">solar</span>
              <br />
              <span className="italic">solutions</span>
            </h2>
            <p className="mt-[0.5rem] text-[0.8125rem] leading-[1.5] text-navy/80 sm:text-[0.875rem] lg:mt-[0.75rem] lg:text-[1.0625rem] [@media(min-width:1024px)_and_(max-height:820px)]:mt-[0.375rem] [@media(min-width:1024px)_and_(max-height:820px)]:text-[0.875rem]">
              Certified. Compliant. Reliable.
              <br />
              Powering a sustainable tomorrow.
            </p>
          </div>

          {/* Cards — stacked on phones, 2-up on tablets, 4-up on desktop */}
          <div className="relative mx-auto mt-[1.25rem] grid w-full max-w-[62.5rem] grid-cols-1 gap-[0.75rem] sm:grid-cols-2 sm:gap-[0.875rem] lg:mt-[1.875rem] lg:grid-cols-4 lg:gap-[1.125rem] [@media(min-width:1024px)_and_(max-height:820px)]:mt-[1rem]" style={{ zIndex: 3 }}>
            {cards.map(({ logo, title, desc }) => (
              <div
                key={title}
                className="relative flex items-center gap-[0.875rem] overflow-hidden rounded-[0.875rem] bg-white/95 p-[0.75rem] shadow-[0_0.25rem_1rem_rgba(15,26,51,0.1)] backdrop-blur-sm sm:block sm:p-0 lg:rounded-[1rem]"
              >
                {/* Green check badge — top left */}
                <span className="absolute left-[0.625rem] top-[0.625rem] z-10 flex h-[1.5rem] w-[1.5rem] items-center justify-center rounded-full bg-brand text-white sm:h-[1.625rem] sm:w-[1.625rem] lg:left-[0.75rem] lg:top-[0.75rem] lg:h-[1.75rem] lg:w-[1.75rem]">
                  <svg viewBox="0 0 24 24" className="h-[0.875rem] w-[0.875rem] lg:h-[1rem] lg:w-[1rem]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                </span>

                {/* Logo image area — big, fills space */}
                <div className="relative h-[5.375rem] w-[5.375rem] shrink-0 sm:h-[8.125rem] sm:w-full lg:h-[10rem] [@media(min-width:1024px)_and_(max-height:820px)]:h-[7rem] [@media(min-width:1024px)_and_(max-height:700px)]:h-[5.625rem]">
                  <Image
                    src={logo}
                    alt={title}
                    fill
                    sizes="(min-width: 640px) 250px, 86px"
                    className="object-contain object-center p-[0.375rem] sm:p-[0.5rem] lg:p-[0.625rem]"
                    unoptimized
                  />
                </div>

                {/* Text content */}
                <div className="flex min-w-0 flex-col items-start text-left sm:items-center sm:px-[1.125rem] sm:pb-[1.375rem] sm:pt-[1rem] sm:text-center lg:px-[1.5rem] lg:pb-[1.75rem] lg:pt-[1.125rem] [@media(min-width:1024px)_and_(max-height:820px)]:px-[1rem] [@media(min-width:1024px)_and_(max-height:820px)]:pb-[0.875rem] [@media(min-width:1024px)_and_(max-height:820px)]:pt-[0.625rem]">
                  <h4 className="text-[0.8125rem] font-bold uppercase tracking-[0.04em] text-navy sm:text-[0.8125rem] lg:text-[0.9375rem] [@media(min-width:1024px)_and_(max-height:820px)]:text-[0.8125rem]">
                    {title}
                  </h4>
                  <p className="mt-[0.375rem] text-[0.75rem] leading-[1.5] text-navy/70 sm:mt-[0.5rem] sm:text-[0.75rem] lg:mt-[0.625rem] lg:text-[0.875rem] [@media(min-width:1024px)_and_(max-height:820px)]:mt-[0.375rem] [@media(min-width:1024px)_and_(max-height:820px)]:text-[0.75rem] [@media(min-width:1024px)_and_(max-height:700px)]:leading-[1.4]">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Humans image — right side, behind cards, visible above/below them */}
          <div className="pointer-events-none absolute bottom-[0.625rem] right-[3.75rem] hidden h-[22.5rem] w-[25rem] min-[1815px]:block lg:bottom-[-5.625rem] lg:right-[-5rem] lg:h-[27.5rem] lg:w-[31.25rem]" style={{ zIndex: 2 }}>
            <Image
              src="/solar-trusted/team5.png"
              alt="Khors Renewables team members"
              fill
              sizes="440px"
              className="object-contain object-bottom"
              unoptimized
            />
          </div>

        </div>

        {/* ---------- Bottom band: products + CTA ---------- */}
        {/* Kept in normal document flow at every size, so it can never overlap
            the cards above it — the products always sit below them. */}
        <div className="relative z-10 mt-[1.5rem] flex shrink-0 flex-col lg:mt-0 lg:flex-row lg:items-end">
          {/* Strip column — product visuals stacked directly above their labels */}
          <div className="flex min-w-0 flex-1 flex-col">
            {/* Product visuals */}
            <div className="grid grid-cols-3 items-end gap-[0.5rem] px-[0.625rem] pt-[0.75rem] sm:gap-[1rem] sm:px-[1.25rem] lg:gap-[1.5rem] lg:px-[1.875rem] lg:pb-[0.375rem] lg:pt-0">
              {products.map(({ image, title }) => (
                <div
                  key={title}
                  className="relative h-[3.875rem] sm:h-[5.25rem] lg:h-[9vh] lg:max-h-[6.5rem] [@media(min-width:1024px)_and_(max-height:700px)]:h-[3.875rem]"
                >
                  <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(min-width: 1024px) 280px, 33vw"
                    className="object-contain object-bottom"
                    unoptimized
                  />
                </div>
              ))}
            </div>

            {/* White strip holding the labels */}
            <div className="bg-white/85 backdrop-blur-[0.125rem] lg:rounded-tr-[5.625rem]">
              <div className="grid grid-cols-3 items-start gap-[0.5rem] px-[0.625rem] pb-[0.875rem] pt-[0.5rem] sm:gap-[1rem] sm:px-[1.25rem] lg:gap-[1.5rem] lg:px-[1.875rem] lg:pb-[1rem] lg:pt-[0.75rem] [@media(min-width:1024px)_and_(max-height:820px)]:pb-[0.625rem] [@media(min-width:1024px)_and_(max-height:820px)]:pt-[0.5rem]">
                {products.map(({ title, tags }) => (
                  <div key={title} className="text-center">
                    <h5 className="text-[0.625rem] font-bold uppercase leading-[1.25] tracking-[0.03em] text-navy sm:text-[0.8125rem] lg:text-[0.9375rem]">
                      {title}
                    </h5>
                    <p className="mt-[0.1875rem] hidden text-[0.5625rem] leading-[1.3] text-navy/60 sm:block sm:text-[0.6875rem] lg:text-[0.75rem]">
                      {tags.join("  |  ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA — full width bar on mobile, flush corner block on desktop */}
          <ConsultationButton
            className="inline-flex w-full shrink-0 items-center justify-center gap-[0.625rem] rounded-none bg-brand-btn px-[1rem] py-[0.9375rem] text-[0.875rem] font-medium text-white transition-colors hover:bg-brand-btn-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-btn sm:text-[0.9375rem] lg:w-auto lg:justify-start lg:gap-[0.875rem] lg:rounded-tl-[3.75rem] lg:py-[1.375rem] lg:pl-[3.25rem] lg:pr-[2.25rem] lg:text-[1.125rem] [@media(min-width:1024px)_and_(max-height:820px)]:py-[1.125rem]"
          >
            <CalendarCheck className="h-[1.125rem] w-[1.125rem] lg:h-[1.5rem] lg:w-[1.5rem]" />
            Schedule a free consultation
          </ConsultationButton>
        </div>
      </div>
    </section>
  );
}
