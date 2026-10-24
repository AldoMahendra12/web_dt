"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, CalendarDays, MapPin, Clock, ArrowRight } from "lucide-react";
import { EVENTS_DATA } from "@/data/events";

/* ===================================================================
   EVENT POPUP — DESAIN RESMI TERKUNCI (LOCKED)
   
   PERHATIAN:
   Desain card landscape, rasio poster, margin inset, dan tata letak
   komponen ini SUDAH RESMI DAN FINAL. JANGAN DIUBAH-UBAH.
   
   Untuk mengganti event/poster/deskripsi di masa mendatang, cukup
   ubah file data di `src/data/events.ts`. Komponen ini akan otomatis
   mengambil event berstatus `isUpcoming: true` dan menampilkannya
   dengan format yang sudah sempurna ini.
   =================================================================== */

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
    return () => {
      document.body.style.overflow = "";
    };
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
        "fixed inset-0 z-[9998] flex items-center justify-center p-3 sm:p-5",
        "transition-all duration-300",
        visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
      ].join(" ")}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/65 backdrop-blur-[3px]"
        onClick={() => setVisible(false)}
      />

      {/* Modal Card */}
      <div
        className={[
          "relative z-10 w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden",
          "transition-all duration-500",
          visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-95 opacity-0",
        ].join(" ")}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="Tutup"
          className="absolute top-3.5 right-3.5 z-30 p-2 rounded-full bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200 transition-colors shadow-sm"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content Layout */}
        <div className="flex flex-col sm:flex-row">
          {/* Left Column: Full Uncropped Poster with inset padding */}
          <div className="relative sm:w-[48%] bg-stone-100/80 p-3.5 sm:p-4 flex items-center justify-center flex-shrink-0">
            <div className="relative w-full flex items-center justify-center">
              <Image
                src={featured.poster}
                alt={`Poster ${featured.title}`}
                width={1440}
                height={1800}
                className="w-full h-auto max-h-[460px] object-contain block rounded-2xl shadow-sm"
                priority
              />
            </div>
          </div>

          {/* Right Column: Information & Actions */}
          <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between gap-4">
            <div className="space-y-3 pt-1 sm:pt-0 sm:pr-8">
              {/* Badges Row */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
                  </span>
                  Event Mendatang
                </span>
                <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {featured.category}
                </span>
                {featured.isFree ? (
                  <span className="text-[10px] sm:text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                    Gratis
                  </span>
                ) : (
                  <span className="text-[10px] sm:text-[11px] font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
                    Berbayar
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 className="font-extrabold text-text-heading leading-snug text-base sm:text-lg">
                {featured.title}
              </h2>

              {/* Event Details */}
              <ul className="space-y-2 text-xs sm:text-sm text-text-light pt-1">
                <li className="flex items-center gap-2.5">
                  <CalendarDays className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{featured.date}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{featured.time}</span>
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

            {/* CTA Buttons */}
            <div className="flex flex-col gap-2 pt-2">
              <a
                href={featured.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setVisible(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-dark active:scale-95 transition-all shadow-md shadow-primary/20"
              >
                Daftar Sekarang
                <ArrowRight className="w-4 h-4" />
              </a>
              <div className="flex gap-2">
                <Link
                  href="/events"
                  onClick={() => setVisible(false)}
                  className="flex-1 text-center px-3 py-2.5 rounded-xl border border-border-default text-text text-xs sm:text-sm font-semibold hover:bg-bg-light transition-colors"
                >
                  Lihat Semua Event
                </Link>
                <button
                  type="button"
                  onClick={() => setVisible(false)}
                  className="flex-1 text-center px-3 py-2.5 rounded-xl text-text-faint text-xs sm:text-sm hover:text-text-muted hover:bg-bg-light transition-colors"
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
