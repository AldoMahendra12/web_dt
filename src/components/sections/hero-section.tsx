"use client";

import Image from "next/image";
import Button from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

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
  { src: "/assets/hero-bg0.jpeg", alt: "Dakwah Tulungagung" },
  { src: "/assets/hero-bg.jpg",   alt: "Kegiatan Dakwah Tulungagung" },
  { src: "/assets/hero-bg2.jpeg", alt: "Kajian & Syiar Islam" },
  { src: "/assets/hero-bg3.jpeg", alt: "Program Sosial & Pembangunan" },
];

const SITE_ROUTES: { keywords: string[]; target: string }[] = [
  // Top-level pages & sub-sections
  { keywords: ["laporan", "keuangan", "transparansi", "rekap", "lapora"], target: "/laporan" },
  { keywords: ["jadwal", "kajian rutin", "ustadz", "masjid", "khutbah", "jadwal kajian"], target: "/jadwal" },
  { keywords: ["anggota", "pengurus", "struktur", "tim", "organisasi", "susunan", "staf", "divisi"], target: "/tentang?section=struktur" },
  { keywords: ["lokasi", "alamat", "kantor", "email", "peta", "kontak"], target: "/tentang?section=lokasi" },
  { keywords: ["visi", "misi", "tujuan"], target: "/tentang?section=visi-misi" },
  { keywords: ["tentang", "profil", "sejarah", "latar belakang"], target: "/tentang" },

  // Specific Program pages
  { keywords: ["jumat berkah", "nasi gratis", "makanan", "jumat"], target: "/program/jumat-berkah" },
  { keywords: ["pemeriksaan", "kesehatan", "cek kesehatan", "medis"], target: "/program/pemeriksaan-gratis" },
  { keywords: ["pipanisasi", "air bersih", "pipa", "air"], target: "/program/pipanisasi" },
  { keywords: ["kumplung", "sedekah mandiri", "celengan"], target: "/program/kumplung-pahala" },
  { keywords: ["donasi", "infaq", "sedekah"], target: "/program/donasi" },
  { keywords: ["riba", "dana riba", "pembersihan harta"], target: "/program/penyaluran-dana-riba" },
  { keywords: ["tahsin", "baca quran", "baca al-quran", "tajwid"], target: "/program/tahsin-alquran" },
  { keywords: ["bahasa arab", "nahwu", "sharaf"], target: "/program/bahasa-arab" },
  { keywords: ["pelatihan", "juleha", "qurban"], target: "/program/pelatihan" },
  { keywords: ["kita peduli", "bencana"], target: "/program/kita-peduli" },
  { keywords: ["sekolah islam"], target: "/program/sekolah-islam" },

  // General program or artikel
  { keywords: ["program"], target: "/program" },
  { keywords: ["artikel", "berita", "opini", "bacaan"], target: "/artikel" },
];

function resolveSearchDestination(query: string): string {
  const q = query.trim().toLowerCase();
  if (!q) return "/artikel";

  for (const route of SITE_ROUTES) {
    if (route.keywords.some((k) => q.includes(k) || k.includes(q))) {
      return route.target;
    }
  }

  // Fallback: search artikel for general topics (e.g. fiqih, hukum)
  return `/artikel?search=${encodeURIComponent(query.trim())}`;
}

const PLACEHOLDER_TEXTS = [
  "Cari 'Jumat Berkah'...",
  "Cari 'Jadwal Kajian'...",
  "Cari 'Laporan Keuangan'...",
  "Cari 'Struktur Pengurus'...",
  "Cari 'Tahsin Al-Qur'an'...",
  "Cari 'Artikel & Fiqih'...",
];

export default function HeroSection() {
  const router = useRouter();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused]     = useState(false);
  const [searchVal, setSearchVal]   = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  /* Typewriter effect for animated placeholder */
  const [placeholderText, setPlaceholderText] = useState("");
  const [textIdx, setTextIdx]                 = useState(0);
  const [charIdx, setCharIdx]                 = useState(0);
  const [isDeleting, setIsDeleting]           = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    const currentFullText = PLACEHOLDER_TEXTS[textIdx];

    let typingSpeed = isDeleting ? 35 : 75;

    if (!isDeleting && charIdx === currentFullText.length) {
      typingSpeed = 2200; // Pause when word is complete
    } else if (isDeleting && charIdx === 0) {
      setIsDeleting(false);
      setTextIdx((prev) => (prev + 1) % PLACEHOLDER_TEXTS.length);
      typingSpeed = 400; // Pause before typing next word
    }

    const timer = setTimeout(() => {
      if (!isDeleting && charIdx < currentFullText.length) {
        setCharIdx((prev) => prev + 1);
      } else if (isDeleting && charIdx > 0) {
        setCharIdx((prev) => prev - 1);
      } else if (!isDeleting && charIdx === currentFullText.length) {
        setIsDeleting(true);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, textIdx]);

  useEffect(() => {
    setPlaceholderText(PLACEHOLDER_TEXTS[textIdx].substring(0, charIdx));
  }, [charIdx, textIdx]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      const destination = resolveSearchDestination(searchVal);
      router.push(destination);
    }
  };

  const handleTagClick = (tag: string) => {
    const destination = resolveSearchDestination(tag);
    router.push(destination);
  };

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

            <p className="text-lg sm:text-2xl font-medium mb-[20px] opacity-95 tracking-[-0.5px]">
              Inspirasi, Informasi &amp; Solusi Islami
            </p>

            {/* Search Input Box */}
            <div className="relative max-w-md">
              <form 
                onSubmit={handleSearchSubmit} 
                className={`relative flex items-center border rounded-xl overflow-hidden p-1.5 transition-all duration-300 ${
                  isInputFocused 
                    ? "bg-white border-white shadow-glow" 
                    : "bg-white/10 backdrop-blur-md border-white/20"
                }`}
              >
                <Search className={`w-5 h-5 ml-3 shrink-0 transition-colors ${
                  isInputFocused ? "text-primary" : "text-white/70"
                }`} />
                <input
                  type="text"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  placeholder={placeholderText}
                  className={`w-full bg-transparent border-none outline-none py-2 px-3 text-sm font-medium transition-colors ${
                    isInputFocused ? "text-text-heading placeholder:text-text-faint animate-fade-in" : "text-white placeholder:text-white/60"
                  }`}
                />
                <button
                  type="submit"
                  className={`font-bold text-xs px-5 py-2.5 rounded-lg transition-all shadow-sm ${
                    isInputFocused 
                      ? "bg-primary text-white hover:bg-primary-dark" 
                      : "bg-white text-primary hover:bg-bg-light"
                  }`}
                >
                  Cari
                </button>
              </form>

              {/* Recommendation Tags */}
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="text-xs text-white/70 font-semibold">Rekomendasi:</span>
                {["Laporan", "Jadwal Kajian", "Jumat Berkah", "Donasi", "Tahsin"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className="text-[11px] bg-white/10 hover:bg-white/25 border border-white/15 px-3 py-1 rounded-full text-white font-medium transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
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
