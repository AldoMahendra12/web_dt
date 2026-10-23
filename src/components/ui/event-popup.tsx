"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, CalendarDays, MapPin, Clock, ArrowRight } from "lucide-react";
import { EVENTS_DATA } from "@/data/events";

/* =========================================
   EventPopup — Auto-show on page load/refresh
   Compact landscape card design.
   Muncul setiap refresh, otomatis hilang
   jika tidak ada event isUpcoming: true.
   ========================================= */

export default function EventPopup() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  const featured = EVENTS_DATA.find((e) => e.isUpcoming) ?? null;

  useEffect(() => {
    if (!featured) return;
    setMounted(true);
    const timer = setTimeout(() => setVisible(true), 700);
    return () => clearTimeout(timer);
  }, [featured]);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setVisible(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible]);

  if (!mounted || !featured) return null;

  return (
    <div
      aria-modal="true"
      role="dialog"
      className={[
        "fixed inset-0 z-[9998] flex items-center justify-center px-4",
        "transition-all duration-300",
        visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
      ].join(" ")}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[3px]"
        onClick={() => setVisible(false)}
      />

      {/* Card — outer: shadow + scale animation, NO overflow-hidden */}
      <div
        className={[
          "relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-2xl",
          "transition-all duration-500",
          visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-95 opacity-0",
        ].join(" ")}
      >
        {/* Close button (outside flex, absolutely positioned) */}
        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="Tutup"
          className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-black/35 text-white hover:bg-black/55 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* "Upcoming" badge (absolutely positioned) */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-primary px-3 py-1 rounded-full shadow-md">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-80" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
          </span>
          <span className="text-[10px] font-extrabold text-white uppercase tracking-wider">
            Event Mendatang
          </span>
        </div>

        {/* Inner flex wrapper — overflow-hidden lives HERE, with rounded-2xl */}
        <div className="flex flex-col sm:flex-row rounded-2xl overflow-hidden">

          {/* ── Left: Poster — full image, no crop ── */}
          <div className="relative sm:w-[48%] flex-shrink-0 bg-bg-light flex items-center justify-center">
            <Image
              src={featured.poster}
              alt={`Poster ${featured.title}`}
              width={600}
              height={800}
              className="w-full h-full object-contain block"
              style={{ maxHeight: "420px", minHeight: "240px" }}
              priority
            />
            {/* Gratis / Berbayar badge */}
            {featured.isFree ? (
              <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500 text-white shadow">
                Gratis
              </span>
            ) : (
              <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow">
                Berbayar
              </span>
            )}
          </div>

          {/* ── Right: Info ── */}
          <div className="flex flex-col flex-1 p-5 sm:p-6 gap-4 justify-between">
            <div className="space-y-3">
              {/* Category pill */}
              <span className="inline-flex text-[10px] font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                {featured.category}
              </span>

              {/* Title */}
              <h2 className="font-extrabold text-text-heading leading-snug text-base sm:text-lg">
                {featured.title}
              </h2>

              {/* Meta */}
              <ul className="space-y-2 text-sm text-text-light">
                <li className="flex items-center gap-2.5">
                  <CalendarDays className="w-4 h-4 text-primary flex-shrink-0" />
                  {featured.date}
                </li>
                <li className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                  {featured.time}
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>
                    {featured.location}
                    {featured.locationDetail && (
                      <span className="text-text-faint"> &mdash; {featured.locationDetail}</span>
                    )}
                  </span>
                </li>
              </ul>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-2 pt-2">
              <a
                href={featured.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setVisible(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 active:scale-95 transition-all shadow-md shadow-primary/20"
              >
                Daftar Sekarang
                <ArrowRight className="w-4 h-4" />
              </a>
              <div className="flex gap-2">
                <Link
                  href="/events"
                  onClick={() => setVisible(false)}
                  className="flex-1 text-center px-3 py-2.5 rounded-xl border border-border-default text-text text-sm font-semibold hover:bg-bg-light transition-colors"
                >
                  Lihat Semua Event
                </Link>
                <button
                  type="button"
                  onClick={() => setVisible(false)}
                  className="flex-1 text-center px-3 py-2.5 rounded-xl text-text-faint text-sm hover:text-text-muted hover:bg-bg-light transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
