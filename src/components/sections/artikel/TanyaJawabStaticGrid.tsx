"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  User,
  BookOpen,
  ChevronDown,
  MessageCircleQuestion,
  Maximize2,
  X,
  } from "lucide-react";
import {
  TANYA_JAWAB_DATA,
  type TanyaJawabEntry,
  getTanyaJawabImage,
} from "@/data/tanya-jawab";

/* =========================================
   TanyaJawabStaticGrid
   - Tampilan Tanya Jawab berbentuk kartu (kotak-kotak)
   - Setiap pertanyaan memiliki kotak sendiri dan gambar yang relevan
   - Animasi buka/tutup inline & pop-up modal pembaca
   - CTA konsultasi asatidz via WhatsApp
   ========================================= */

/** Helper untuk format teks paragraf dan mendeteksi teks Arab */
export function renderQALines(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    const trimmed = line.trim();
    if (!trimmed) return <div key={i} className="h-3" />;

    const hasArabic = /[\u0600-\u06FF]/.test(trimmed);
    if (hasArabic) {
      return (
        <div
          key={i}
          dir="rtl"
          className="font-arabic text-xl sm:text-2xl text-text-heading leading-loose text-center my-4 font-normal py-2 bg-amber-50/70 rounded-xl border border-amber-100"
        >
          {trimmed}
        </div>
      );
    }

    const isTranslation =
      trimmed.startsWith('"') ||
      trimmed.startsWith("“") ||
      trimmed.startsWith("(") ||
      trimmed.startsWith("&quot;");
    if (isTranslation) {
      return (
        <p
          key={i}
          className="text-xs sm:text-sm italic text-text-muted text-center max-w-[620px] mx-auto my-3 leading-relaxed"
        >
          {trimmed}
        </p>
      );
    }

    if (/^(Yang (pertama|ke\s*\w+|ketiga|keempat)|\d+\.|•)/.test(trimmed)) {
      return (
        <p key={i} className="font-semibold text-text-heading mt-4 mb-1.5">
          {trimmed}
        </p>
      );
    }

    return (
      <p key={i} className="text-justify mb-2 leading-relaxed text-text-light text-xs sm:text-sm">
        {trimmed}
      </p>
    );
  });
}

/** Ambil ringkasan jawaban untuk pratinjau kartu */
function getQAExcerpt(jawaban: string, maxLen = 120): string {
  const lines = jawaban
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !/[\u0600-\u06FF]/.test(l));
  const joined = lines.join(" ");
  return joined.length > maxLen ? joined.slice(0, maxLen) + "…" : joined;
}

/** Modal dialog membaca Tanya Jawab secara penuh */
function TanyaJawabModal({
  item,
  onClose,
}: {
  item: TanyaJawabEntry | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (item) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [item]);

  useEffect(() => {
    if (!item) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/65 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
        >
          {/* Header Image */}
          <div className="relative w-full h-56 sm:h-72 flex-shrink-0 overflow-hidden bg-gray-900">
            <Image
              src={getTanyaJawabImage(item)}
              alt={item.pertanyaan}
              fill
              className="object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white hover:bg-black/80 flex items-center justify-center transition-colors backdrop-blur-md z-10"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Badges on Image */}
            <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center gap-2">
              <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider shadow">
                {item.kategori || "Tanya Jawab"}
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 text-xs font-bold px-2.5 py-1 rounded-md">
                #{String(item.id).padStart(2, "0")}
              </span>
              {item.penanya && (
                <span className="bg-black/50 backdrop-blur-md text-white/90 text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5 ml-auto">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  {item.penanya}
                </span>
              )}
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-text-heading leading-snug">
                {item.pertanyaan}
              </h2>
              <div className="mt-3 pt-3 border-t border-border-default flex items-center gap-2 text-xs text-text-faint">
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span>
                  Dijawab oleh <strong className="text-text-heading">{item.ustadz}</strong> Hafidzahullahu Ta&apos;ala
                </span>
              </div>
            </div>

            {/* Answer Content */}
            <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-100 text-text-light text-sm sm:text-base leading-relaxed space-y-2">
              {renderQALines(item.jawaban)}
            </div>

            {/* Footer Consultation */}
            <div className="pt-4 border-t border-border-default flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-text-faint text-center sm:text-left">
                واللهُ أعلَم — Berdasarkan dalil Al-Qur&apos;an dan As-Sunnah
              </div>
              <a
                href={`https://wa.me/6285731110003?text=${encodeURIComponent(
                  `Assalamu'alaikum, saya ingin bertanya seputar Tanya Jawab #${item.id}: "${item.pertanyaan.slice(0, 80)}..."`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-semibold text-xs hover:bg-primary-dark transition-colors"
              >
                Tanya Lebih Lanjut via WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/** Kotak kartu individual Tanya Jawab dengan gambar */
function TanyaJawabBoxCard({
  item,
  index,
  isOpen,
  onToggle,
  onOpenModal,
}: {
  item: TanyaJawabEntry;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  onOpenModal: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 6) * 0.05, duration: 0.4 }}
      className={[
        "group relative flex flex-col rounded-2xl border transition-all duration-300 overflow-hidden bg-white shadow-sm hover:shadow-card-hover",
        isOpen
          ? "border-amber-400 ring-2 ring-amber-400/20 shadow-md"
          : "border-border-default hover:border-amber-300",
      ].join(" ")}
    >
      {/* ── Gambar Kartu (Bisa Diberi Gambar Sesuai Pertanyaan) ── */}
      <div
        className="relative w-full h-48 sm:h-52 overflow-hidden bg-gray-100 cursor-pointer"
        onClick={onOpenModal}
      >
        <Image
          src={getTanyaJawabImage(item)}
          alt={item.pertanyaan}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="bg-amber-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow">
            {item.kategori || "Tanya Jawab"}
          </span>
          <span className="bg-black/50 backdrop-blur-md text-white text-[11px] font-bold px-2 py-0.5 rounded-md border border-white/20">
            #{String(item.id).padStart(2, "0")}
          </span>
        </div>

        {/* Bottom on Image: Penanya */}
        {item.penanya && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[11px] text-white/90 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10">
            <User className="w-3 h-3 text-amber-400" />
            <span>{item.penanya}</span>
          </div>
        )}

        {/* Hover Hint to Expand / View Modal */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal();
          }}
          className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/20 hover:bg-white text-white hover:text-amber-600 backdrop-blur-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
          title="Lihat Tampilan Penuh"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* ── Konten Kartu ── */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
        <div>
          {/* Ustadz Info */}
          <div className="flex items-center gap-1.5 text-xs text-text-faint mb-2">
            <BookOpen className="w-3.5 h-3.5 text-amber-500 flex-none" />
            <span className="truncate">{item.ustadz}</span>
          </div>

          {/* Pertanyaan */}
          <h3
            onClick={onToggle}
            className={[
              "font-bold text-base sm:text-lg leading-snug mb-2.5 transition-colors cursor-pointer",
              isOpen ? "text-amber-700" : "text-text-heading group-hover:text-amber-700",
              !isOpen && "line-clamp-3",
            ].join(" ")}
          >
            {item.pertanyaan}
          </h3>

          {/* Excerpt jawaban (hanya tampil saat kartu tertutup) */}
          {!isOpen && (
            <p className="text-xs sm:text-sm text-text-light leading-relaxed line-clamp-2 mb-4">
              {getQAExcerpt(item.jawaban, 110)}
            </p>
          )}
        </div>

        {/* Tombol Aksi */}
        <div className="mt-4 pt-4 border-t border-border-default flex items-center justify-between gap-2">
          <button
            onClick={onToggle}
            className={[
              "flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-lg transition-all",
              isOpen
                ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                : "bg-amber-50 text-amber-700 hover:bg-amber-500 hover:text-white",
            ].join(" ")}
          >
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
            {isOpen ? "Tutup Jawaban" : "Baca Jawaban"}
          </button>

          <button
            onClick={onOpenModal}
            className="flex items-center gap-1 text-[11px] font-semibold text-text-faint hover:text-amber-600 transition-colors px-2 py-1.5 rounded"
            title="Baca di jendela terpisah"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mode Baca</span>
          </button>
        </div>

        {/* Jawaban Expandable di dalam kartu */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="card-answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-amber-100 bg-amber-50/40 -mx-5 sm:-mx-6 -mb-5 sm:-mb-6 p-5 sm:p-6 rounded-b-2xl">
                <div className="space-y-2 text-xs sm:text-sm text-text-light leading-relaxed">
                  {renderQALines(item.jawaban)}
                </div>
                <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-text-faint">
                    <BookOpen className="w-3 h-3 text-amber-500" />
                    <span>Dijawab oleh <strong className="text-text-heading">{item.ustadz}</strong></span>
                  </div>
                  <button
                    onClick={onOpenModal}
                    className="text-[11px] font-bold text-amber-700 hover:underline"
                  >
                    Buka Pop-up &rarr;
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/** Featured Hero Question Card */
function FeaturedHeroQACard({
  item,
  isOpen,
  onToggle,
  onOpenModal,
}: {
  item: TanyaJawabEntry;
  isOpen: boolean;
  onToggle: () => void;
  onOpenModal: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-10 rounded-2xl border-2 border-amber-300 bg-white overflow-hidden shadow-md hover:shadow-lg transition-all"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
        {/* Gambar Hero Besar */}
        <div
          className="relative md:col-span-5 min-h-[260px] md:min-h-[380px] overflow-hidden bg-gray-100 cursor-pointer group"
          onClick={onOpenModal}
        >
          <Image
            src={getTanyaJawabImage(item)}
            alt={item.pertanyaan}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute top-4 left-4">
            <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wider shadow">
              ⭐ Tanya Jawab Pilihan
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
            <span className="bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20 font-bold">
              #{String(item.id).padStart(2, "0")}
            </span>
            {item.penanya && (
              <span className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20">
                <User className="w-3.5 h-3.5 text-amber-400" />
                {item.penanya}
              </span>
            )}
          </div>
        </div>

        {/* Info Konten Hero */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200/60 px-2.5 py-1 rounded-md uppercase tracking-wider">
                {item.kategori || "Tanya Jawab"}
              </span>
              <span className="text-xs text-text-faint flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                {item.ustadz}
              </span>
            </div>

            <h2
              onClick={onToggle}
              className="text-xl sm:text-2xl font-extrabold text-text-heading leading-snug mb-3 cursor-pointer hover:text-amber-700 transition-colors"
            >
              {item.pertanyaan}
            </h2>

            {!isOpen && (
              <p className="text-sm text-text-light leading-relaxed line-clamp-3 mb-6">
                {getQAExcerpt(item.jawaban, 180)}
              </p>
            )}
          </div>

          <div className="pt-4 border-t border-border-default flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={onToggle}
                className={[
                  "flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm",
                  isOpen
                    ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                    : "bg-amber-500 text-white hover:bg-amber-600",
                ].join(" ")}
              >
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
                {isOpen ? "Tutup Jawaban" : "Baca Jawaban Lengkap"}
              </button>

              <button
                onClick={onOpenModal}
                className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-border-default hover:border-amber-400 hover:bg-amber-50/50 text-text-heading transition-colors"
              >
                <Maximize2 className="w-3.5 h-3.5 text-amber-600" />
                Mode Baca Penuh
              </button>
            </div>

            <span className="text-xs text-text-faint">
              Dijawab oleh asatidz bersanad
            </span>
          </div>

          {/* Jawaban Expandable Hero */}
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                key="hero-answer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-6 pt-5 border-t border-amber-200/80 bg-amber-50/50 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-6 sm:p-8 rounded-b-2xl">
                  <div className="space-y-2 text-sm text-text-light leading-relaxed">
                    {renderQALines(item.jawaban)}
                  </div>
                  <div className="mt-5 pt-3 border-t border-amber-200 flex items-center justify-between">
                    <p className="text-xs text-text-faint">
                      Dijawab oleh <strong className="text-text-heading">{item.ustadz}</strong> Hafidzahullahu Ta&apos;ala
                    </p>
                    <button
                      onClick={onOpenModal}
                      className="text-xs font-bold text-amber-700 hover:underline"
                    >
                      Buka Pop-up &rarr;
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function TanyaJawabStaticGrid({
  searchQuery,
}: {
  searchQuery: string;
}) {
  const [openId, setOpenId] = useState<number | null>(null);
  const [modalItem, setModalItem] = useState<TanyaJawabEntry | null>(null);

  const filtered = TANYA_JAWAB_DATA.filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.pertanyaan.toLowerCase().includes(q) ||
      item.jawaban.toLowerCase().includes(q) ||
      (item.kategori && item.kategori.toLowerCase().includes(q))
    );
  });

  const handleToggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  if (filtered.length === 0) {
    return (
      <section className="pb-24">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="py-20 text-center text-text-faint bg-white rounded-2xl border border-border-default">
            <MessageCircleQuestion className="w-12 h-12 mx-auto mb-3 opacity-30 text-amber-500" />
            <h3 className="text-lg font-bold text-text-heading mb-1">
              Tidak Ditemukan Pertanyaan
            </h3>
            <p className="text-sm">
              Tidak ada pertanyaan yang cocok dengan &quot;{searchQuery}&quot;.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const [featured] = filtered;

  return (
    <section className="pb-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* ── SECTION HEADER ── */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
            <MessageCircleQuestion className="w-3.5 h-3.5 text-amber-600" />
            Tanya Jawab &amp; Konsultasi Agama
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-heading tracking-tight mb-2">
            Jawaban Asatidzah Seputar Problematika Kehidupan
          </h2>
          <p className="text-sm text-text-light max-w-2xl leading-relaxed">
            Kumpulan tanya jawab fiqih, muamalah, kesehatan, dan keluarga dari Ustadz Moh. Shohibul Umam, Lc., M.Pd. Hafidzahullahu Ta&apos;ala.
          </p>
        </div>

        {/* ── FEATURED HERO QUESTION ── */}
        {featured && (
          <FeaturedHeroQACard
            item={featured}
            isOpen={openId === featured.id}
            onToggle={() => handleToggle(featured.id)}
            onOpenModal={() => setModalItem(featured)}
          />
        )}

        {/* ── SECTION DIVIDER DAFTAR PERTANYAAN (KOTAK-KOTAK) ── */}
        <div className="flex items-center gap-3 mb-6 pt-2">
          <div className="w-1.5 h-6 bg-amber-500 rounded-full" />
          <h3 className="text-base font-bold text-text-heading tracking-wide uppercase">
            Semua Pertanyaan
          </h3>
          <div className="flex-1 h-px bg-border-default" />
          <span className="text-xs text-text-faint font-medium bg-bg-light px-2.5 py-1 rounded-full border border-border-default">
            {filtered.length} Pertanyaan
          </span>
        </div>

        {/* ── GRID KOTAK-KOTAK PERTANYAAN (DENGAN GAMBAR) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 items-start">
          {filtered.map((item, index) => (
            <TanyaJawabBoxCard
              key={item.id}
              item={item}
              index={index}
              isOpen={openId === item.id}
              onToggle={() => handleToggle(item.id)}
              onOpenModal={() => setModalItem(item)}
            />
          ))}
        </div>

        {/* ── FOOTER NOTE ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-6 rounded-2xl bg-amber-50 border border-amber-200/70 text-center"
        >
          <p className="font-arabic text-2xl text-text-heading mb-2" dir="rtl">
            وَاللَّهُ أَعْلَمُ
          </p>
          <p className="text-xs text-text-faint max-w-lg mx-auto leading-relaxed">
            Semua jawaban merupakan ijtihad dan pendapat asatidz berdasarkan Al-Qur&apos;an dan As-Sunnah. Untuk permasalahan yang lebih kompleks dan spesifik, disarankan untuk berkonsultasi langsung.
          </p>
        </motion.div>

        {/* ✦ Tanya via WhatsApp CTA ✦ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #00716a 0%, #004d47 100%)",
          }}
        >
          <div className="px-8 py-8 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            {/* WhatsApp Icon bubble */}
            <div className="shrink-0 w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
            </div>

            <div className="flex-1">
              <p className="text-white text-lg font-bold mb-1">Ada Pertanyaan Lain?</p>
              <p className="text-white/75 text-sm leading-relaxed">
                Tanyakan langsung kepada asatidz kami via WhatsApp. Insya Allah kami bantu jawab sesuai ilmu yang ada.
              </p>
            </div>

            <a
              href="https://wa.me/6285731110003?text=Assalamu%27alaikum%2C%20saya%20ingin%20bertanya%20seputar%20agama%20Islam"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white text-primary font-bold text-sm hover:bg-bg-light hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              Tanya via WhatsApp
            </a>
          </div>
        </motion.div>
      </div>

      {/* ── Modal Pop-up Pembaca Lengkap ── */}
      <TanyaJawabModal item={modalItem} onClose={() => setModalItem(null)} />
    </section>
  );
}
