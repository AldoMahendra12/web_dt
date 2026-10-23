"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  CalendarDays,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { EVENTS_DATA } from "@/data/events";

/* =========================================
   EventPopup — Auto-show on page load/refresh
   Tampil ketika ada event upcoming.
   Tidak memakai localStorage sehingga
   akan muncul setiap kali halaman di-refresh.
   ========================================= */

export default function EventPopup() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  const upcomingEvents = EVENTS_DATA.filter((e) => e.isUpcoming);
  const featured = upcomingEvents[0]; // Tampilkan event upcoming pertama

  // Delay sedikit supaya tidak langsung muncul begitu halaman load
  useEffect(() => {
    if (!featured) return;
    setMounted(true);
    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, [featured]);

  // Lock body scroll saat popup terbuka
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  // Escape key
  useEffect(() => {
    if (!visible) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVisible(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [visible]);

  if (!mounted || !featured) return null;

  return (
    <div
      className={[
        "fixed inset-0 z-[9998] flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300",
        visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
      ].join(" ")}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => setVisible(false)}
      />

      {/* Modal Card */}
      <div
        className={[
          "relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10 transition-all duration-500",
          visible ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0",
        ].join(" ")}
      >
        {/* Top ribbon */}
        <div className="relative bg-gradient-to-r from-primary to-emerald-600 px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span className="text-white text-xs font-extrabold uppercase tracking-widest">
              Event Mendatang
            </span>
            {/* Ping dot */}
            <span className="relative flex h-2 w-2 ml-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
            </span>
          </div>
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/15 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Poster */}
        <div className="relative w-full bg-bg-light overflow-hidden">
          <Image
            src={featured.poster}
            alt={`Poster ${featured.title}`}
            width={600}
            height={600}
            className="w-full object-contain block"
            style={{ maxHeight: "260px", objectFit: "contain" }}
            priority
          />
          {/* Gratis badge */}
          {featured.isFree && (
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-500 text-white shadow-md uppercase tracking-wide">
              Gratis
            </span>
          )}
        </div>

        {/* Info */}
        <div className="px-5 pt-4 pb-5 space-y-3">
          {/* Category pill */}
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full">
            {featured.category}
          </span>

          {/* Title */}
          <h2 className="text-base font-extrabold text-text-heading leading-snug">
            {featured.title}
          </h2>

          {/* Details row */}
          <div className="flex flex-col gap-1.5 text-xs text-text-light">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span>{featured.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span>{featured.time}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
              <span>
                {featured.location}
                {featured.locationDetail && (
                  <span className="text-text-faint"> — {featured.locationDetail}</span>
                )}
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-2.5 pt-1">
            <a
              href={featured.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setVisible(false)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-br from-primary to-emerald-700 text-white font-bold text-sm hover:opacity-90 active:scale-95 transition-all shadow-md shadow-primary/20"
            >
              Daftar Sekarang
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/events"
              onClick={() => setVisible(false)}
              className="px-4 py-3 rounded-xl border border-primary/25 text-primary font-semibold text-sm hover:bg-primary/5 transition-colors text-center whitespace-nowrap"
            >
              Lihat Semua
            </Link>
          </div>

          {/* Dismiss */}
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="w-full text-center text-xs text-text-faint hover:text-text-muted transition-colors pt-0.5"
          >
            Tutup pengumuman ini
          </button>
        </div>
      </div>
    </div>
  );
}
