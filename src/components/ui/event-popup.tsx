"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowRight, CalendarDays } from "lucide-react";

/* =========================================
   EventPopup — Popup Event Homepage

   Cara mengganti event:
   1. Upload poster ke /public/assets/
   2. Ubah EVENT_CONFIG di bawah:
      - image   : path poster dari /public/
      - link    : link pendaftaran
      - alt     : deskripsi gambar
      - enabled : false = popup mati
   ========================================= */

const EVENT_CONFIG = {
  enabled: true,
  image: "/assets/kajianmuslimah-dt.jpeg",
  /** Deskripsi alt text gambar */
  alt: "Poster Event Kajian Muslimah - Dakwah Tulungagung",
  /** Link pendaftaran / info event */
  link: "https://s.id/kajianmuslimah-dt",
  buttonText: "Daftar Sekarang",
};

export default function EventPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!EVENT_CONFIG.enabled) return;
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setVisible(false);

  useEffect(() => {
    if (!visible) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [visible]);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [visible]);

  if (!EVENT_CONFIG.enabled || !visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Panel — no background, just poster + floating buttons */}
      <div
        className="relative z-10 w-full max-w-[360px] flex flex-col items-center"
        style={{ animation: "fadeInScale 0.35s cubic-bezier(0.34,1.56,0.64,1) both" }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 z-20 w-9 h-9 rounded-full bg-white/90 text-gray-700 flex items-center justify-center shadow-xl hover:bg-white hover:scale-110 transition-all"
          aria-label="Tutup popup"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Poster — height constrained so it never overflows screen */}
        <div
          className="w-full rounded-2xl overflow-hidden shadow-2xl"
          style={{ maxHeight: "calc(100svh - 140px)" }}
        >
          <img
            src={EVENT_CONFIG.image}
            alt={EVENT_CONFIG.alt}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "calc(100svh - 140px)",
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>

        {/* CTA Buttons — floating below poster, no card/bg */}
        <div className="flex items-center gap-3 mt-4 w-full">
          <a
            href={EVENT_CONFIG.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-bold text-sm shadow-lg hover:bg-primary/90 active:scale-95 transition-all"
          >
            {EVENT_CONFIG.buttonText}
            <ArrowRight className="w-4 h-4" />
          </a>

          <Link
            href="/events"
            onClick={handleClose}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/15 text-white font-bold text-sm border border-white/30 hover:bg-white/25 active:scale-95 transition-all backdrop-blur-sm whitespace-nowrap"
          >
            <CalendarDays className="w-4 h-4" />
            Events
          </Link>
        </div>

        {/* Skip */}
        <button
          onClick={handleClose}
          className="mt-3 text-white/60 text-xs hover:text-white/90 transition-colors"
        >
          Lewati
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}} />
    </div>
  );
}
