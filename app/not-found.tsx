import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Phone } from "lucide-react";

/**
 * Branded 404, replacing the framework default ("This page could not be
 * found."). Also shown for unknown campaign slugs under /lp/, so it stays
 * generic and reveals nothing about the hidden landing pages.
 *
 * Height divides by --body-zoom because body is scaled with `zoom`, which also
 * scales viewport units — a plain 100dvh would stop short of the screen.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100dvh_/_var(--body-zoom))] flex-col items-center justify-center bg-white px-[1.25rem] py-[3rem] text-center sm:px-[2rem]">
      <Image
        src="/navbar/logo.png"
        alt="Khors Renewables — powered by nature, designed for the future"
        width={300}
        height={300}
        priority
        unoptimized
        className="h-[3rem] w-auto lg:h-[3.75rem]"
      />

      <p className="mt-[2rem] font-display text-[4.5rem] font-bold leading-[0.9] tracking-[-0.02em] text-brand sm:text-[6rem] lg:text-[7rem]">
        404
      </p>

      <div className="mt-[1rem] h-[0.25rem] w-[4rem] rounded-full bg-[#f07d19]" />

      <h1 className="mt-[1.5rem] font-display text-[1.5rem] font-bold leading-[1.15] text-navy sm:text-[1.875rem] lg:text-[2.25rem]">
        This page could not be found
      </h1>

      <p className="mt-[0.875rem] max-w-[32rem] text-[0.9375rem] font-medium leading-[1.6] text-navy/70 sm:text-[1rem]">
        The link may be broken or the page may have moved. Let&apos;s get you
        back to cutting your electricity bills.
      </p>

      <div className="mt-[2rem] flex w-full max-w-[26rem] flex-col items-center gap-[0.75rem] sm:w-auto sm:flex-row sm:justify-center">
        <Link
          href="/"
          className="inline-flex h-[3.25rem] w-full items-center justify-center gap-[0.5rem] rounded-[0.5rem] bg-brand-btn px-[1.75rem] text-[1rem] font-bold text-white transition-colors hover:bg-brand-btn-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-btn sm:w-auto"
        >
          <ArrowLeft className="h-[1.125rem] w-[1.125rem]" />
          Back to home
        </Link>

        <a
          href="tel:+917200830719"
          className="inline-flex h-[3.25rem] w-full items-center justify-center gap-[0.5rem] rounded-[0.5rem] border border-navy/15 px-[1.75rem] text-[1rem] font-bold text-navy transition-colors hover:border-navy/30 hover:bg-navy/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy sm:w-auto"
        >
          <Phone className="h-[1.125rem] w-[1.125rem]" />
          +91 72008 30719
        </a>
      </div>
    </main>
  );
}
