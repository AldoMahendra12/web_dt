"use client";

import Image from "next/image";
import Button from "@/components/ui/button";
import { useEffect, useState } from "react";

/* =========================================
   HeroSection — Section Component
   Auto-sliding hero with 3 background images.
   Pauses on hover. Cross-fade transition.
   Dot indicators for manual navigation.
   ========================================= */

const TAGLINES = [
  "Langkah kecil menuju kebaikan",
  "Inspirasi untuk Ummat",
  "Dakwah dengan Hikmah",
  "Menyebar Manfaat Sesama",
  "Langkah kecil menuju kebaikan",
];

const HERO_IMAGES = [
  { src: "/assets/hero-bg.jpg",   alt: "Dakwah Tulungagung" },
  { src: "/assets/hero-bg2.jpeg", alt: "Kegiatan Dakwah" },
  { src: "/assets/hero-bg3.jpeg", alt: "Program Sosial" },
];

export default function HeroSection() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused]     = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="pt-5 pb-10 sm:pb-16">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Card wrapper — hover pauses the slider */}
        <div
          className="relative h-[400px] sm:h-[550px] rounded-2xl overflow-hidden flex items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* ── Sliding Background Images (cross-fade) ── */}
          {HERO_IMAGES.map((img, idx) => (
            <Image
              key={img.src}
              src={img.src}
              alt={img.alt}
              fill
              className={`object-cover transition-opacity duration-1000 ${
                idx === currentIdx ? "opacity-100" : "opacity-0"
              }`}
              priority={idx === 0}
            />
          ))}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/40 to-primary/10 z-[1]" />

          {/* ── Text Content ── */}
          <div className="relative z-[2] p-[30px] sm:p-[60px] max-w-[650px] text-white">
            {/* Ticker Tagline */}
            <div className="flex items-center gap-2.5 text-lg font-medium mb-0 opacity-95 tracking-[-0.5px]">
              <span className="w-2.5 h-2.5 bg-white rounded-full shadow-glow shrink-0" />
              <div className="h-6 overflow-hidden">
                <div className="flex flex-col animate-ticker">
                  {TAGLINES.map((tagline, i) => (
                    <span key={i} className="h-6 flex items-center text-sm sm:text-lg">
                      {tagline}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <h1 className="font-sans text-[32px] sm:text-[48px] xl:text-[68px] font-extrabold leading-none mb-[15px] tracking-[-1px] sm:tracking-[-2px]">
              Dakwah Tulungagung Official
            </h1>

            <p className="text-lg sm:text-2xl font-medium mb-[30px] opacity-95 tracking-[-0.5px]">
              Inspirasi, Informasi &amp; Solusi Islami
            </p>

            <Button href="#" variant="secondary">
              Pelajari Lebih Lanjut
            </Button>
          </div>

          {/* ── Dot Indicators ── */}
          <div className="absolute bottom-6 right-6 z-[3] flex items-center gap-2">
            {HERO_IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIdx(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  idx === currentIdx
                    ? "w-6 h-2.5 bg-white"
                    : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>

          {/* ── Pause indicator (shown when paused) ── */}
          {isPaused && (
            <div className="absolute top-4 right-4 z-[3] flex items-center gap-1.5 bg-black/30 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-3 bg-white rounded-[2px] inline-block" />
              <span className="w-1.5 h-3 bg-white rounded-[2px] inline-block" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
