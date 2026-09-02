"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

// Single source of truth for nav links. `id` is the section the link points to
// and drives which item shows the active underline.
const navLinks = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Services", href: "#rooftop", id: "rooftop" },
  { label: "Contact Us", href: "#contact", id: "contact" },
];

// Sections tracked for the scroll-spy, in document order.
const sectionIds = ["home", "rooftop", "contact"];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  // Start on "home" so the server and first client render match (no hydration
  // mismatch). The observer refines this after mount.
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry most in view near the top of the viewport.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      {
        // Trigger when a section crosses the band just below the sticky navbar.
        rootMargin: "-45% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_0.0625rem_0_rgba(15,26,51,0.08)]">
      <div className="relative flex h-[4.75rem] items-center justify-between px-5 lg:h-[5.75rem] lg:px-10">
        <Link href="/" aria-label="Khors Renewables home" className="shrink-0">
          <Image
            src="/navbar/logo.png"
            alt="Khors Renewables"
            width={300}
            height={300}
            className="h-[3.75rem] w-auto lg:h-[4.75rem]"
            priority
            unoptimized
          />
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Main"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-[2.75rem] lg:flex xl:gap-[3.5rem]"
        >
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <Link
                key={link.id}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setActive(link.id)}
                className="group relative flex items-center pb-[0.5625rem] pt-[0.5625rem] text-[1.0625rem] font-medium text-navy transition-colors hover:text-brand"
              >
                {link.label}
                <span
                  className={`absolute inset-x-0 bottom-0 h-[0.1562rem] rounded-full bg-brand transition-opacity group-hover:opacity-100 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 items-center justify-center rounded-lg text-navy transition-colors hover:bg-navy/5 lg:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
            {mobileOpen ? (
              <path
                d="m5 5 14 14M19 5 5 19"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3.5 7h17M3.5 12h17M3.5 17h17"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-navy/10 bg-white px-5 pb-4 pt-2 lg:hidden"
        >
          {navLinks.map((link, i) => {
            const isActive = active === link.id;
            return (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => {
                  setActive(link.id);
                  setMobileOpen(false);
                }}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center py-3 text-[1rem] font-medium transition-colors ${
                  i < navLinks.length - 1 ? "border-b border-navy/5" : ""
                } ${isActive ? "text-brand" : "text-navy"}`}
              >
                <span className="relative">
                  {link.label}
                  <span
                    className={`absolute inset-x-0 -bottom-[0.25rem] h-[0.125rem] rounded-full bg-brand transition-opacity ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </span>
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
