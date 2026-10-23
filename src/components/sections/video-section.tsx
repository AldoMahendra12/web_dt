"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

/* =========================================
   VideoSection — Section Component
   - YouTube embed with lazy-load facade poster
   - Mencegah lag / scroll stutter saat mouse berada di atas video
   - Memastikan scroll tetap 100% mulus (smooth scroll)
   ========================================= */

const VIDEO_ID = "m0ePqo5EbCQ";
const THUMBNAIL_URL = `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`;
const FALLBACK_THUMBNAIL = `https://img.youtube.com/vi/${VIDEO_ID}/hqdefault.jpg`;

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgSrc, setImgSrc] = useState(THUMBNAIL_URL);
  const [isScrolling, setIsScrolling] = useState(false);

  // Nonaktifkan pointer-events pada iframe saat halaman sedang di-scroll
  // sehingga mouse wheel tidak tertelan/tersangkut oleh iframe YouTube
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <section className="py-[60px] sm:py-[100px] bg-white">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-[-2px] text-text-heading mx-auto max-w-[900px]">
            Simak video kajian terbaru di kanal{" "}
            <span className="text-primary italic font-medium">YouTube</span> kami
          </h2>
        </div>

        {/* Video Wrapper */}
        <div className="max-w-[760px] mx-auto">
          <div className="relative pb-[56.25%] h-0 rounded-2xl overflow-hidden shadow-video bg-black group select-none">
            {!isPlaying ? (
              /* ── PREVIEW POSTER (Zero Lag saat mouse hover & scroll) ── */
              <div
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 w-full h-full cursor-pointer overflow-hidden"
                role="button"
                tabIndex={0}
                aria-label="Putar Video Kajian Dakwah Tulungagung"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setIsPlaying(true);
                  }
                }}
              >
                {/* Thumbnail Gambar */}
                <Image
                  src={imgSrc}
                  alt="Video Kajian Dakwah Tulungagung"
                  fill
                  sizes="(max-width: 768px) 100vw, 760px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                  onError={() => setImgSrc(FALLBACK_THUMBNAIL)}
                  priority={false}
                />

                {/* Gradient Cinema Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30 transition-opacity duration-300 group-hover:opacity-75" />

                {/* Badge YouTube */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                  <span>Dakwah Tulungagung Official</span>
                </div>

                {/* Tombol Play di Tengah */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                  <div className="relative flex items-center justify-center">
                    {/* Ripple Glow Effect */}
                    <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary/40 animate-ping opacity-60" />
                    
                    {/* Play Button Circle */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-primary-dark">
                      <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current translate-x-0.5" />
                    </div>
                  </div>

                  <p className="mt-4 text-white text-sm sm:text-base font-semibold drop-shadow-md tracking-wide group-hover:text-primary-light transition-colors">
                    Klik untuk Memutar Video
                  </p>
                </div>
              </div>
            ) : (
              /* ── ACTIVE YOUTUBE IFRAME (Dengan Scroll-Guard) ── */
              <iframe
                src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                title="Video Dakwah Tulungagung"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className={`absolute top-0 left-0 w-full h-full border-none ${
                  isScrolling ? "pointer-events-none" : "pointer-events-auto"
                }`}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
