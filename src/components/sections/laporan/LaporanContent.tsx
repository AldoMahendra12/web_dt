"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { laporanData, LaporanItem } from "@/data/laporan";
import {
  ExternalLink,
  FileText,
  Sparkles,
  Download,
  Maximize2,
  Calendar,
  FolderOpen,
  CheckCircle2,
} from "lucide-react";

/* =========================================
   LaporanContent — Monthly Reports Section
   with Document Viewer (matches Image 1)
   Default zoom set to 100% & optimized
   scroll chaining (no lag at bottom)
   ========================================= */

export default function LaporanContent() {
  const years = Array.from(new Set(laporanData.map((item) => item.year))).sort((a, b) => b - a);

  // Default to newest year (2026)
  const [selectedYear, setSelectedYear] = useState<number>(years[0]);

  // Reports for the selected year
  const reportsInYear = laporanData.filter((item) => item.year === selectedYear);

  // Active report in viewer (default to latest month of selected year)
  const [activeItem, setActiveItem] = useState<LaporanItem>(reportsInYear[0] || laporanData[0]);

  const viewerRef = useRef<HTMLDivElement>(null);

  // When selected year changes, default to latest month in that year
  useEffect(() => {
    const list = laporanData.filter((item) => item.year === selectedYear);
    if (list.length > 0) {
      setActiveItem(list[0]);
    }
  }, [selectedYear]);

  const handleSelectReport = (item: LaporanItem) => {
    setActiveItem(item);
    if (item.year !== selectedYear) {
      setSelectedYear(item.year);
    }

    // Smooth scroll to viewer
    if (viewerRef.current) {
      const yOffset = -90;
      const element = viewerRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-5">

        {/* ── Top Header & Year Selector ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border-default">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Transparansi Publik
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-heading tracking-tight">
              Laporan Keuangan & Kegiatan
            </h2>
            <p className="text-text-light text-base sm:text-lg mt-2 max-w-2xl leading-relaxed">
              Laporan pertanggungjawaban donasi umat, kas operasional, dan realisasi program dakwah per bulan.
            </p>
          </div>

          {/* Year Switcher Pills */}
          <div className="flex items-center gap-2 bg-bg-light p-1.5 rounded-2xl border border-border-default self-start md:self-auto shadow-sm">
            <span className="text-xs font-semibold text-text-muted px-2 hidden sm:inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Tahun:
            </span>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={[
                  "relative px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap",
                  selectedYear === year
                    ? "bg-white text-primary shadow-sm ring-1 ring-black/5"
                    : "text-text-muted hover:text-text-heading",
                ].join(" ")}
              >
                {year}
                {year === 2026 && (
                  <span className="absolute -top-1.5 -right-1 flex items-center gap-0.5 bg-primary text-white text-[8px] font-bold px-1.5 py-0.2 rounded-full leading-tight">
                    <Sparkles className="w-2 h-2" />
                    Baru
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Month Selector Carousel / Tabs ── */}
        <div className="mt-8 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              Pilih Bulan Laporan (Tahun {selectedYear}):
            </span>
            <span className="text-xs text-text-light">
              Tersedia <strong>{reportsInYear.length} bulan</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {reportsInYear.map((item) => {
              const isActive = activeItem.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectReport(item)}
                  className={[
                    "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap flex items-center gap-2",
                    isActive
                      ? "bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]"
                      : "bg-bg-light text-text-light hover:bg-neutral-100 hover:text-text-heading border border-border-default",
                  ].join(" ")}
                >
                  <FileText className="w-3.5 h-3.5" />
                  {item.month}
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Document Viewer (Matches Image 1) ── */}
        <div ref={viewerRef} className="scroll-mt-24">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl border border-border-default shadow-card overflow-hidden"
          >
            {/* Viewer Header Bar */}
            <div className="p-5 sm:p-7 bg-gradient-to-r from-bg-light to-white border-b border-border-default flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-md">
                    Laporan Resmi DT
                  </span>
                  <span className="text-xs font-semibold text-text-muted">
                    Bulan {activeItem.month} {activeItem.year}
                  </span>
                </div>
                {/* Title styled boldly as in Image 1 */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-heading tracking-tight leading-tight">
                  {activeItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-light mt-1.5">
                  {activeItem.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto shrink-0">
                {activeItem.pdfUrl && (
                  <a
                    href={activeItem.pdfUrl}
                    download
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-border-default text-xs font-bold text-text-heading hover:bg-neutral-50 hover:text-primary transition-all shadow-sm"
                    title="Unduh berkas PDF"
                  >
                    <Download className="w-4 h-4 text-primary" />
                    Unduh PDF
                  </a>
                )}

                {activeItem.pdfUrl && (
                  <a
                    href={activeItem.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-border-default text-xs font-bold text-text-heading hover:bg-neutral-50 hover:text-primary transition-all shadow-sm"
                    title="Buka PDF di tab baru peramban"
                  >
                    <Maximize2 className="w-4 h-4 text-primary" />
                    Buka Tab Baru
                  </a>
                )}

                {activeItem.fileUrl && (
                  <a
                    href={activeItem.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-all shadow-sm"
                    title="Buka arsip lengkap di Google Drive"
                  >
                    <FolderOpen className="w-4 h-4" />
                    Google Drive
                    <ExternalLink className="w-3 h-3 opacity-75" />
                  </a>
                )}
              </div>
            </div>

            {/* Embedded Native Chromium PDF Viewer with default 100% zoom */}
            <div
              data-lenis-prevent
              className="relative w-full bg-[#525659] min-h-[600px] sm:min-h-[800px] lg:min-h-[920px] flex flex-col"
              style={{ overscrollBehavior: "auto" }}
            >
              <iframe
                src={`${activeItem.pdfUrl}#toolbar=1&navpanes=0&zoom=100`}
                className="w-full flex-1 h-[600px] sm:h-[800px] lg:h-[920px] border-none"
                style={{ overscrollBehavior: "auto" }}
                title={activeItem.title}
              />

              {/* Mobile bottom banner */}
              <div className="sm:hidden bg-neutral-900 text-white/80 p-3 text-xs text-center flex items-center justify-center gap-2 border-t border-neutral-800">
                <span>Ingin tampilan lebih lega?</span>
                <a
                  href={activeItem.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-bold underline"
                >
                  Buka Layar Penuh
                </a>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
