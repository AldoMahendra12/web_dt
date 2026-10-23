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
    /* Overlay */
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

      {/* Card — landscape on sm+, stacked on xs */}
      <div
        className={[
          "relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden",
          "transition-all duration-500",
          visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-95 opacity-0",
        ].join(" ")}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="Tutup"
          className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* "Upcoming" floating badge */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-primary px-2.5 py-1 rounded-full shadow">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-80" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
          </span>
          <span className="text-[10px] font-extrabold text-white uppercase tracking-wider">Upcoming</span>
        </div>

        <div className="flex flex-col sm:flex-row">
          {/* ── Left: Poster ── */}
          <div className="relative sm:w-[42%] bg-bg-light flex-shrink-0">
            <Image
              src={featured.poster}
              alt={`Poster ${featured.title}`}
              width={400}
              height={500}
              className="w-full h-52 sm:h-full object-cover"
              style={{ minHeight: "180px" }}
              priority
            />
            {/* HTM badge */}
            {!featured.isFree && (
              <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow">
                Berbayar
              </span>
            )}
            {featured.isFree && (
              <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white shadow">
                Gratis
              </span>
            )}
          </div>

          {/* ── Right: Info ── */}
          <div className="flex flex-col flex-1 p-4 sm:p-5 gap-3">
            {/* Eyebrow */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                {featured.category}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-extrabold text-text-heading leading-snug text-[15px] line-clamp-3">
              {featured.title}
            </h2>

            {/* Meta */}
            <ul className="space-y-1.5 text-xs text-text-light">
              <li className="flex items-center gap-2">
                <CalendarDays className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                {featured.date}
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                {featured.time}
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  {featured.location}
                  {featured.locationDetail && (
                    <span className="text-text-faint"> &mdash; {featured.locationDetail}</span>
                  )}
                </span>
              </li>
            </ul>

            {/* CTAs */}
            <div className="flex flex-col gap-2 mt-auto pt-1">
              <a
                href={featured.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setVisible(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 active:scale-95 transition-all shadow-md shadow-primary/20"
              >
                Daftar Sekarang
                <ArrowRight className="w-4 h-4" />
              </a>
              <div className="flex items-center gap-2">
                <Link
                  href="/events"
                  onClick={() => setVisible(false)}
                  className="flex-1 text-center px-3 py-2 rounded-xl border border-border-default text-text text-xs font-semibold hover:bg-bg-light transition-colors"
                >
                  Lihat Semua Event
                </Link>
                <button
                  type="button"
                  onClick={() => setVisible(false)}
                  className="flex-1 text-center px-3 py-2 rounded-xl text-text-faint text-xs hover:text-text-muted transition-colors"
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
