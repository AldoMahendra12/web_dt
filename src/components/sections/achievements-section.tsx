"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useDonasiDialog } from "@/components/ui/donasi-provider";

/* =========================================
   AchievementsSection — Section Component
   Matches homepage .achievements-v2
   Big animated counter with floating images
   ========================================= */

const FLOATING_IMAGES = [
  { src: "/activities/berbagi.jpg", alt: "Dakwah Tulungagung", position: "top-0 left-0 -rotate-[10deg]" },
  { src: "/activities/pipanisasi.jpg", alt: "Pipanisasi", position: "bottom-0 left-[10%] rotate-[5deg]" },
  { src: "/activities/safari.jpg", alt: "Safari Dakwah", position: "top-[10%] right-0 rotate-[15deg]" },
  { src: "/hero-bg.jpg", alt: "Hero", position: "bottom-[10%] right-[5%] -rotate-[5deg]" },
];

function useCountUp(target: number, duration = 2500, trigger = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, duration, trigger]);

  return count;
}

/** Format angka Rupiah singkat: 12500000 → "12,5 Jt" */
function formatRupiah(n: number): string {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1).replace(".", ",") + " M";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(".", ",") + " Jt";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + " Rb";
  return n.toLocaleString("id-ID");
}

export default function AchievementsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const { openDonasi } = useDonasiDialog();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const countYoutube  = useCountUp(2500000, 2500, visible);
  const countDonasi   = useCountUp(12500000, 2200, visible); // Rp 12.500.000
  const countPenerima = useCountUp(340, 2000, visible);      // 340 penerima

  return (
    <section ref={sectionRef} className="py-[80px] xl:py-[140px] bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto relative px-5 min-h-[300px] xl:h-[500px] flex items-center justify-center">
        {/* Floating Images — hidden on mobile/tablet */}
        {FLOATING_IMAGES.map((img, i) => (
          <div
            key={i}
            className={[
              "hidden xl:block absolute w-[180px] h-[180px] rounded-2xl overflow-hidden shadow-floating z-[5] transition-transform duration-500 hover:scale-110",
              img.position,
            ].join(" ")}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover grayscale hover:grayscale-0 transition-[filter] duration-500"
            />
          </div>
        ))}

        {/* Center Content */}
        <div className="text-center z-10 w-full">
          {/* Main Counter — YouTube */}
          <p className="text-lg sm:text-2xl font-semibold text-text-heading my-[15px]">
            Menjangkau lebih banyak umat dengan lebih dari
          </p>
          <h2 className="font-serif text-[80px] sm:text-[120px] xl:text-[160px] font-normal leading-none m-0 text-text-heading tracking-[-5px]">
            {countYoutube.toLocaleString("id-ID")}+
          </h2>
          <p className="text-lg sm:text-2xl font-semibold text-text-heading my-[15px]">
            Pemirsa YouTube Setiap Tahunnya
          </p>

          {/* Sub Stats Row */}
          <div className="mt-10 mb-2 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12">
            {/* Stat: Donasi Dana Riba */}
            <div className="flex flex-col items-center gap-1 px-8 py-5 rounded-2xl border border-border-default bg-bg-light/60 backdrop-blur-sm">
              <span className="text-xs font-semibold uppercase tracking-widest text-text-light mb-1">
                Dana Riba Tersalurkan
              </span>
              <span className="font-serif text-[42px] sm:text-[52px] font-normal leading-none text-text-heading tracking-tight">
                Rp {formatRupiah(countDonasi)}+
              </span>
              <span className="text-xs text-text-light mt-1">
                Disalurkan untuk kebutuhan umat
              </span>
            </div>

            {/* Divider — desktop only */}
            <div className="hidden sm:block w-px h-20 bg-border-default" />

            {/* Stat: Penerima Donasi */}
            <div className="flex flex-col items-center gap-1 px-8 py-5 rounded-2xl border border-border-default bg-bg-light/60 backdrop-blur-sm">
              <span className="text-xs font-semibold uppercase tracking-widest text-text-light mb-1">
                Penerima Donasi
              </span>
              <span className="font-serif text-[42px] sm:text-[52px] font-normal leading-none text-text-heading tracking-tight">
                {countPenerima.toLocaleString("id-ID")}+
              </span>
              <span className="text-xs text-text-light mt-1">
                Individu & keluarga terbantu
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={openDonasi}
            className="mt-[30px] inline-flex items-center justify-center px-10 py-4 rounded-xl text-white font-bold text-lg relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl active:scale-95 group"
            style={{
              background: "linear-gradient(135deg, rgba(0, 113, 106, 0.85) 0%, rgba(0, 40, 38, 0.95) 100%)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 15px 35px rgba(0, 113, 106, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
            }}
          >
            <span className="relative z-10 flex items-center gap-3">
              Dukung Dakwah Kami
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            {/* Glass reflection effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-transform duration-1000 group-hover:translate-x-full" />
          </button>
        </div>
      </div>
    </section>
  );
}
