"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircleQuestion, User, BookOpen } from "lucide-react";
import { TANYA_JAWAB_DATA, type TanyaJawabEntry } from "@/data/tanya-jawab";

/* =========================================
   TanyaJawabSection — Full Page Component
   Premium accordion design for Q&A
   ========================================= */

function ArabicText({ text }: { text: string }) {
  // Extract Arabic segments (Unicode Arabic block) and render them distinctly
  const parts = text.split(/([\u0600-\u06FF\s،؟!]+)/g);
  return (
    <>
      {parts.map((part, i) => {
        const isArabic = /[\u0600-\u06FF]/.test(part);
        if (isArabic) {
          return (
            <span
              key={i}
              dir="rtl"
              className="block font-arabic text-xl sm:text-2xl text-text-heading leading-loose text-right my-3 px-4 py-3 bg-primary/5 border-r-4 border-primary rounded-md"
            >
              {part.trim()}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function JawabanContent({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-2 text-sm sm:text-base text-text-light leading-relaxed">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} className="h-1" />;

        // Detect Arabic text
        const hasArabic = /[\u0600-\u06FF]/.test(trimmed);
        if (hasArabic) {
          return (
            <div
              key={i}
              dir="rtl"
              className="font-arabic text-lg sm:text-xl text-text-heading leading-loose text-right px-4 py-3 bg-primary/5 border-r-4 border-primary rounded-md my-2"
            >
              {trimmed}
            </div>
          );
        }

        // Detect bold markers (Yang pertama, Yang ke dua, etc.)
        if (/^(Yang (pertama|ke\s*\w+|ketiga|keempat)|Pertama-tama|Sumber|\d+\.|\•)/.test(trimmed)) {
          return (
            <p key={i} className="font-semibold text-text-heading">
              {trimmed}
            </p>
          );
        }

        return <p key={i}>{trimmed}</p>;
      })}
    </div>
  );
}

function QACard({ item, index, isOpen, onToggle }: {
  item: TanyaJawabEntry;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.5 }}
      className={[
        "rounded-2xl border transition-all duration-300 overflow-hidden",
        isOpen
          ? "border-primary/40 shadow-[0_8px_32px_rgba(0,113,106,0.12)] bg-white"
          : "border-border-default bg-white hover:border-primary/20 hover:shadow-card-hover",
      ].join(" ")}
    >
      {/* Header / Trigger */}
      <button
        onClick={onToggle}
        className="w-full text-left px-5 sm:px-7 py-5 sm:py-6 flex items-start gap-4 group"
        aria-expanded={isOpen}
      >
        {/* Number Badge */}
        <div
          className={[
            "flex-none w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 mt-0.5",
            isOpen
              ? "bg-primary text-white shadow-cta"
              : "bg-primary/10 text-primary group-hover:bg-primary/20",
          ].join(" ")}
        >
          {String(item.id).padStart(2, "0")}
        </div>

        {/* Question Text */}
        <div className="flex-1 min-w-0">
          {item.penanya && (
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-text-faint uppercase tracking-wider mb-1.5">
              <User className="w-3 h-3" />
              {item.penanya}
            </div>
          )}
          <p
            className={[
              "font-semibold leading-snug transition-colors duration-300 text-sm sm:text-base",
              isOpen ? "text-primary" : "text-text-heading group-hover:text-primary",
            ].join(" ")}
          >
            {item.pertanyaan}
          </p>
        </div>

        {/* Chevron */}
        <ChevronDown
          className={[
            "flex-none w-5 h-5 text-text-light transition-transform duration-300 mt-1",
            isOpen ? "rotate-180 text-primary" : "",
          ].join(" ")}
        />
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
            ref={contentRef}
          >
            <div className="px-5 sm:px-7 pb-6 sm:pb-8 pt-0">
              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-primary/20 via-primary/10 to-transparent mb-5" />

              {/* Jawaban Content */}
              <JawabanContent text={item.jawaban} />

              {/* Ustadz Tag */}
              <div className="mt-5 pt-4 border-t border-border-default flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-none">
                  <BookOpen className="w-3 h-3 text-primary" />
                </div>
                <p className="text-[11px] sm:text-xs text-text-faint">
                  Dijawab oleh{" "}
                  <span className="font-semibold text-text-light">{item.ustadz}</span>{" "}
                  Hafidzahullahu Ta&apos;ala
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function TanyaJawabSection() {
  const [openId, setOpenId] = useState<number | null>(1);

  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 sm:py-24 bg-bg-light min-h-screen">
      <div className="max-w-[860px] mx-auto px-5">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          {/* Label */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-wider mb-5">
            <MessageCircleQuestion className="w-3.5 h-3.5" />
            Tanya Jawab Asatidz
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-text-heading leading-tight tracking-tight mb-4">
            Pertanyaan{" "}
            <span className="text-primary italic font-medium">Seputar</span>{" "}
            Kehidupan
          </h1>
          <p className="text-text-light text-base sm:text-lg leading-relaxed max-w-[600px]">
            Kumpulan tanya jawab dari Ustadz Moh. Shohibul Umam, Lc., M.Pd. seputar permasalahan sehari-hari bagi para tenaga kesehatan dan masyarakat umum.
          </p>

          {/* Stats */}
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 border border-border-default shadow-sm">
              <span className="text-2xl font-extrabold text-primary">{TANYA_JAWAB_DATA.length}</span>
              <span className="text-xs text-text-light leading-tight">Pertanyaan<br />Terjawab</span>
            </div>
            <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 border border-border-default shadow-sm">
              <span className="text-2xl font-extrabold text-primary">1</span>
              <span className="text-xs text-text-light leading-tight">Sesi<br />Tanya Jawab</span>
            </div>
          </div>
        </motion.div>

        {/* Decorative divider */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-px bg-border-default" />
          <span className="text-xs text-text-faint font-medium uppercase tracking-widest whitespace-nowrap">
            ❁ Daftar Pertanyaan ❁
          </span>
          <div className="flex-1 h-px bg-border-default" />
        </div>

        {/* Q&A Accordion List */}
        <div className="space-y-3">
          {TANYA_JAWAB_DATA.map((item, index) => (
            <QACard
              key={item.id}
              item={item}
              index={index}
              isOpen={openId === item.id}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 p-6 rounded-2xl bg-primary/5 border border-primary/15 text-center"
        >
          <p className="font-arabic text-2xl text-text-heading mb-2" dir="rtl">
            وَاللَّهُ أَعْلَمُ
          </p>
          <p className="text-sm text-text-light">
            Semua jawaban di atas merupakan ijtihad dan pendapat Ustadz berdasarkan dalil-dalil yang ada.
            Untuk permasalahan yang lebih kompleks, silakan berkonsultasi langsung.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
