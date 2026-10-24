"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  BookOpen,
  Search,
  ExternalLink,
  X,
  Maximize2,
  Download,
  Filter,
  CheckCircle2,
  CalendarDays,
} from "lucide-react";
import { JADWAL_KAJIAN_DATA } from "@/data/jadwal";
import { HariKajian, PekanKajian, JadwalKajianItem } from "@/types/jadwal";
import Button from "@/components/ui/button";

const DAFTAR_HARI: HariKajian[] = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
  "Ahad",
];

const DAFTAR_PEKAN: { label: string; value: "Semua" | PekanKajian }[] = [
  { label: "Semua Pekan", value: "Semua" },
  { label: "Pekan 1", value: 1 },
  { label: "Pekan 2", value: 2 },
  { label: "Pekan 3", value: 3 },
  { label: "Pekan 4", value: 4 },
  { label: "Pekan 5", value: 5 },
  { label: "Rutin Mingguan", value: "Rutin" },
];

/** Ambil hari ini dalam nama hari Indonesia */
function getHariIni(): HariKajian {
  const index = new Date().getDay(); // 0 = Ahad, 1 = Senin, ...
  const mapping: HariKajian[] = [
    "Ahad",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];
  return mapping[index];
}

export default function JadwalKajianClient() {
  const [selectedHari, setSelectedHari] = useState<HariKajian>("Senin");
  const [selectedPekan, setSelectedPekan] = useState<"Semua" | PekanKajian>("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePoster, setActivePoster] = useState<{
    url: string;
    title: string;
    ustadz: string;
  } | null>(null);

  // Auto-set ke hari ini jika ada di DAFTAR_HARI saat mount
  useEffect(() => {
    const today = getHariIni();
    setSelectedHari(today);
  }, []);

  // Lock body scroll saat modal poster terbuka
  useEffect(() => {
    if (activePoster) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activePoster]);

  // Filter data berdasarkan Hari, Pekan, dan Query Search
  const filteredJadwal = useMemo(() => {
    return JADWAL_KAJIAN_DATA.filter((item) => {
      // 1. Filter Hari
      if (item.hari !== selectedHari) return false;

      // 2. Filter Pekan
      if (selectedPekan !== "Semua") {
        const matchesPekan = item.pekan.some((p) => {
          if (selectedPekan === "Rutin") return p === "Rutin";
          return p === selectedPekan || p === "Rutin";
        });
        if (!matchesPekan) return false;
      }

      // 3. Filter Search (Ustadz, Masjid, Alamat, Kitab)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchUstadz = item.ustadz.toLowerCase().includes(q);
        const matchMasjid = item.masjid.toLowerCase().includes(q);
        const matchAlamat = item.alamat.toLowerCase().includes(q);
        const matchKitab = item.kitab.toLowerCase().includes(q);
        return matchUstadz || matchMasjid || matchAlamat || matchKitab;
      }

      return true;
    });
  }, [selectedHari, selectedPekan, searchQuery]);

  return (
    <section className="py-12 sm:py-16 bg-bg-light min-h-screen">
      <div className="max-w-[1200px] mx-auto px-5">

        {/* ── 1. HARI TAB SELECTOR ── */}
        <div className="mb-8 overflow-x-auto scrollbar-hide py-2 -mx-5 px-5 flex justify-start sm:justify-center">
          <div className="inline-flex bg-white p-1.5 rounded-2xl border border-border-default shadow-sm gap-1.5 flex-nowrap">
            {DAFTAR_HARI.map((hari) => {
              const isToday = getHariIni() === hari;
              const isSelected = selectedHari === hari;
              return (
                <button
                  key={hari}
                  onClick={() => {
                    setSelectedHari(hari);
                    setSelectedPekan("Semua");
                  }}
                  className={[
                    "relative px-4 sm:px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap flex items-center gap-2",
                    isSelected
                      ? "bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]"
                      : "text-text-muted hover:text-primary hover:bg-bg-light",
                  ].join(" ")}
                >
                  <span>{hari}</span>
                  {isToday && (
                    <span
                      className={[
                        "text-[10px] px-1.5 py-0.5 rounded-full font-semibold uppercase tracking-wider",
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-primary/10 text-primary border border-primary/20",
                      ].join(" ")}
                    >
                      Hari Ini
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 2. SUB-FILTER PEKAN & SEARCH BAR ── */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-border-default shadow-sm mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Sub-Filter Pekan */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-text-muted uppercase tracking-wider mr-1 flex-shrink-0">
              <Filter className="w-3.5 h-3.5 text-primary" />
              <span>Filter Pekan:</span>
            </div>
            <div className="flex items-center gap-1.5 flex-nowrap">
              {DAFTAR_PEKAN.map((p) => {
                const isActive = selectedPekan === p.value;
                return (
                  <button
                    key={String(p.value)}
                    onClick={() => setSelectedPekan(p.value)}
                    className={[
                      "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap",
                      isActive
                        ? "bg-primary/10 text-primary border border-primary/30 font-bold"
                        : "bg-bg-light text-text-muted hover:bg-gray-100 border border-transparent",
                    ].join(" ")}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 flex-shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faint pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari Ustadz, Masjid, Kitab..."
              className="w-full pl-10 pr-4 py-2 rounded-xl text-sm bg-bg-light border border-border-default text-text-heading placeholder:text-text-faint focus:outline-none focus:border-primary transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-faint hover:text-text-heading"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* ── 3. INFO HEADER ── */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-text-heading flex items-center gap-3">
            <span>Jadwal Kajian Hari {selectedHari}</span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
              {filteredJadwal.length} Jadwal
            </span>
          </h2>
        </div>

        {/* ── 4. JADWAL CARDS GRID ── */}
        {filteredJadwal.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredJadwal.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="group bg-white rounded-2xl border border-border-default hover:border-primary/40 shadow-sm hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Card Top: Poster Preview + Badges */}
                <div className="relative w-full h-48 bg-bg-light overflow-hidden">
                  <Image
                    src={item.posterUrl}
                    alt={item.kitab}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-white/90 backdrop-blur-md text-text-heading shadow-sm border border-white/40">
                      {item.jenis === "Rutin"
                        ? "Rutin Mingguan"
                        : `Pekan Ke-${item.pekan.join(", ")}`}
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-primary text-white shadow-sm">
                      {item.hari}
                    </span>
                  </div>

                  {/* Overlay Button View Poster */}
                  <button
                    onClick={() =>
                      setActivePoster({
                        url: item.posterUrl,
                        title: item.kitab,
                        ustadz: item.ustadz,
                      })
                    }
                    className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white font-bold text-sm gap-2 z-20"
                  >
                    <Maximize2 className="w-4 h-4" />
                    <span>Lihat Poster Full</span>
                  </button>
                </div>

                {/* Card Body Info */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Kitab / Tema */}
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Pembahasan / Kitab</span>
                      </div>
                      <h3 className="text-lg font-bold text-text-heading group-hover:text-primary transition-colors leading-snug">
                        {item.kitab}
                      </h3>
                    </div>

                    {/* Ustadz / Pemateri */}
                    <div className="flex items-start gap-2.5 pt-3 border-t border-border-default/60">
                      <User className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[11px] font-semibold text-text-faint uppercase">
                          Pemateri
                        </span>
                        <p className="text-sm font-semibold text-text-heading">
                          {item.ustadz}
                        </p>
                      </div>
                    </div>

                    {/* Waktu */}
                    <div className="flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[11px] font-semibold text-text-faint uppercase">
                          Waktu
                        </span>
                        <p className="text-sm text-text-light">{item.waktu}</p>
                      </div>
                    </div>

                    {/* Masjid & Alamat */}
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[11px] font-semibold text-text-faint uppercase">
                          Lokasi / Tempat
                        </span>
                        <p className="text-sm font-semibold text-text-heading">
                          {item.masjid}
                        </p>
                        <p className="text-xs text-text-muted mt-0.5">
                          {item.alamat}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="mt-6 pt-4 border-t border-border-default flex items-center gap-2">
                    <button
                      onClick={() =>
                        setActivePoster({
                          url: item.posterUrl,
                          title: item.kitab,
                          ustadz: item.ustadz,
                        })
                      }
                      className="flex-1 py-2 px-3 rounded-xl bg-bg-light border border-border-default hover:border-primary/40 hover:bg-primary/5 text-text-heading hover:text-primary text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-primary" />
                      <span>Poster</span>
                    </button>

                    {item.mapsUrl && (
                      <a
                        href={item.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                        title="Buka Petunjuk Lokasi Google Maps"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Maps</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* ── EMPTY STATE ── */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-10 sm:p-16 border border-border-default text-center max-w-xl mx-auto my-8 shadow-sm"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-5">
              <CalendarDays className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-text-heading mb-3 font-sans">
              Belum Ada Jadwal Hari {selectedHari}
            </h3>
            <p className="text-sm text-text-light leading-relaxed mb-6">
              Jadwal kajian untuk hari {selectedHari}{" "}
              {selectedPekan !== "Semua" ? `pekan ke-${selectedPekan}` : ""} sedang
              dalam proses pengumpulan & pembaruan oleh panitia Dakwah Tulungagung.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                onClick={() => {
                  setSelectedHari("Senin");
                  setSelectedPekan("Semua");
                  setSearchQuery("");
                }}
                variant="primary"
                className="px-5 py-2.5 text-xs font-bold"
              >
                Lihat Jadwal Hari Senin
              </Button>
            </div>
          </motion.div>
        )}

      </div>

      {/* ── 5. LIGHTBOX MODAL POSTER ── */}
      <AnimatePresence>
        {activePoster && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 dialog-backdrop"
            onClick={() => setActivePoster(null)}
          >
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-fit max-w-[94vw] sm:max-w-xl max-h-[94vh] bg-gray-900 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-white/20"
            >
              {/* Header Modal */}
              <div className="px-4 py-3 sm:px-5 sm:py-3.5 bg-gray-900/95 border-b border-white/10 flex items-center justify-between gap-3 shrink-0">
                <div className="min-w-0 pr-2">
                  <h4 className="text-white text-sm font-bold truncate">
                    {activePoster.title}
                  </h4>
                  <p className="text-white/60 text-xs truncate">{activePoster.ustadz}</p>
                </div>
                <button
                  onClick={() => setActivePoster(null)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0"
                  aria-label="Tutup poster"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Poster Image Container - Full poster without cutoff */}
              <div className="relative flex-1 min-h-0 p-2 sm:p-3.5 flex items-center justify-center bg-black/70 overflow-hidden">
                <Image
                  src={activePoster.url}
                  alt={activePoster.title}
                  width={1024}
                  height={1280}
                  className="max-h-[68vh] sm:max-h-[74vh] w-auto max-w-full rounded-lg sm:rounded-xl object-contain shadow-2xl block"
                  priority
                />
              </div>

              {/* Footer Modal Actions */}
              <div className="px-4 py-3 sm:px-5 sm:py-3.5 bg-gray-900/95 border-t border-white/10 flex items-center justify-between gap-3 shrink-0">
                <a
                  href={activePoster.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 sm:px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Buka Tab Baru</span>
                </a>
                <a
                  href={activePoster.url}
                  download
                  className="flex-1 py-2 px-3 sm:px-4 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh Poster</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
