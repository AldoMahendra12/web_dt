"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import Button from "@/components/ui/button";
import type { NavItem } from "@/types";
import { useDonasiDialog } from "@/components/ui/donasi-provider";
import { hasUpcomingEvents } from "@/data/events";

/* =========================================
   NavBar — Section Component
   Sticky, desktop nav with dot separators,
   mobile hamburger menu
   ========================================= */

const NAV_ITEMS: NavItem[] = [
  { label: "Tentang Kami", href: "/tentang" },
  { label: "Program", href: "/program" },
  { label: "Jadwal Kajian", href: "/jadwal" },
  { label: "Artikel", href: "/artikel" },
  { label: "Laporan", href: "/laporan" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openDonasi } = useDonasiDialog();
  const hasUpcoming = hasUpcomingEvents();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-[1000] transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-header"
          : "bg-white",
      ].join(" ")}
      style={{ paddingBlock: "20px" }}
    >
      <div className="max-w-[1200px] mx-auto px-5 flex justify-between items-center">
        {/* Left: Logo + Separator + Nav */}
        <div className="flex items-center gap-6">
          <Link href="/" className="block">
            <Image
              src="/logo.png"
              alt="Dakwah Tulungagung Logo"
              width={120}
              height={45}
              className="h-[30px] sm:h-[45px] w-auto"
              priority
            />
          </Link>

          {/* Separator */}
          <div className="hidden lg:block w-px h-10 bg-border-separator" />

          {/* Desktop Nav */}
          <nav className="hidden lg:block" aria-label="Navigasi utama">
            <ul className="flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="relative text-text text-sm font-medium transition-all duration-300 hover:text-primary group py-1 hover:-translate-y-0.5 whitespace-nowrap"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-400 ease-out group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Right: CTA + Mobile Hamburger */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-3">
            {hasUpcoming ? (
              <Link
                href="/events"
                className="relative group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold bg-primary/5 text-primary border border-primary/25 hover:border-primary hover:bg-primary/10 transition-all duration-300 shadow-sm hover:shadow"
              >
                {/* Animated ping dot indicator */}
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
                </span>
                <CalendarDays className="w-4 h-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                <span>Events</span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-amber-500 to-amber-600 text-white leading-none shadow-sm animate-pulse tracking-wide uppercase">
                  New
                </span>
              </Link>
            ) : (
              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-primary border border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <CalendarDays className="w-4 h-4 text-primary" />
                <span>Events</span>
              </Link>
            )}

            <Button onClick={openDonasi} variant="primary">
              Donasi Sekarang
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={[
                "block w-6 h-0.5 bg-text-heading transition-all duration-300",
                mobileOpen ? "rotate-45 translate-y-2" : "",
              ].join(" ")}
            />
            <span
              className={[
                "block w-6 h-0.5 bg-text-heading transition-all duration-300",
                mobileOpen ? "opacity-0" : "",
              ].join(" ")}
            />
            <span
              className={[
                "block w-6 h-0.5 bg-text-heading transition-all duration-300",
                mobileOpen ? "-rotate-45 -translate-y-2" : "",
              ].join(" ")}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={[
          "lg:hidden overflow-hidden transition-all duration-300",
          mobileOpen ? "max-h-[460px] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <nav className="max-w-[1200px] mx-auto px-5 py-4">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-3 px-4 text-text font-medium rounded-md transition-colors hover:bg-bg-light hover:text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-4 mt-2 border-t border-border-default flex flex-col gap-2">
              {hasUpcoming ? (
                <Link
                  href="/events"
                  onClick={() => setMobileOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold bg-primary/5 text-primary border border-primary/30 hover:bg-primary/10 transition-all duration-300"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
                  </span>
                  <CalendarDays className="w-4 h-4 text-primary" />
                  <span>Events</span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-amber-500 to-amber-600 text-white leading-none shadow-sm animate-pulse tracking-wide uppercase">
                    New
                  </span>
                </Link>
              ) : (
                <Link
                  href="/events"
                  onClick={() => setMobileOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-primary border border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                >
                  <CalendarDays className="w-4 h-4 text-primary" />
                  <span>Events</span>
                </Link>
              )}
              <Button
                onClick={() => { setMobileOpen(false); openDonasi(); }}
                variant="primary"
                className="w-full"
              >
                Donasi Sekarang
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
