"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { laporanData } from "@/data/laporan";
import { ExternalLink, DollarSign, FileText, Sparkles } from "lucide-react";

/* =========================================
   LaporanContent — Reports Section
   Menampilkan laporan per tahun dengan
   link ke Google Drive
   ========================================= */

const currentYear = new Date().getFullYear();

export default function LaporanContent() {
  const years = Array.from(new Set(laporanData.map((item) => item.year))).sort((a, b) => b - a);
  const [selectedYear, setSelectedYear] = useState(years[0]);

  const filteredLaporan = laporanData.filter((item) => item.year === selectedYear);

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* ── Left Side: Title & Year Picker ── */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl sm:text-5xl font-extrabold text-text-heading leading-tight mb-6 tracking-tight">
                Laporan Tahunan <br />
                <span className="text-primary">Dakwah Tulungagung</span>
              </h2>

              <p className="text-text-light text-lg mb-10 leading-relaxed max-w-[400px]">
                Transparansi adalah amanah. Lihat laporan pertanggungjawaban
                kegiatan dan keuangan kami melalui Google Drive.
              </p>

              {/* Year Picker */}
              <div className="inline-flex p-1.5 bg-bg-light rounded-xl border border-border-default shadow-sm">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={[
                      "relative px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 whitespace-nowrap",
                      selectedYear === year
                        ? "bg-white text-primary shadow-md ring-1 ring-black/5"
                        : "text-text-muted hover:text-text-heading",
                    ].join(" ")}
                  >
                    {year}
                    {/* Badge "Terkini" untuk tahun sekarang */}
                    {year === currentYear && (
                      <span className="absolute -top-2 -right-1 flex items-center gap-0.5 bg-primary text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                        <Sparkles className="w-2 h-2" />
                        Baru
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Info note */}
              <p className="text-xs text-text-faint mt-5 max-w-[320px] leading-relaxed">
                Semua laporan dapat diakses melalui Google Drive. Klik tombol{" "}
                <span className="font-semibold text-primary">Lihat Laporan</span>{" "}
                untuk membuka folder dokumen.
              </p>
            </motion.div>
          </div>

          {/* ── Right Side: Report Cards ── */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedYear}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                {filteredLaporan.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="group bg-white rounded-2xl p-8 border border-border-default shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
                  >
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-primary/8 flex items-center justify-center mb-6 group-hover:bg-primary/15 transition-colors duration-300">
                      {item.type === "keuangan" ? (
                        <DollarSign className="w-7 h-7 text-primary" />
                      ) : (
                        <FileText className="w-7 h-7 text-primary" />
                      )}
                    </div>

                    {/* Badge tahun aktif */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-bold text-primary/70 uppercase tracking-wider bg-primary/8 px-2.5 py-1 rounded-md">
                        {item.year}
                      </span>
                      {item.year === currentYear && (
                        <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md">
                          ✦ Terkini
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-text-heading mb-3 group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm text-text-light leading-relaxed mb-8 flex-1">
                      {item.description}
                    </p>

                    {/* Button — buka Google Drive di tab baru */}
                    <a
                      href={item.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto w-full py-3 px-5 rounded-xl bg-primary text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary-dark hover:shadow-cta hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Lihat Laporan
                    </a>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
