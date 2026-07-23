"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Construction, X, Sparkles } from "lucide-react";
import ArtikelHero from "@/components/sections/artikel/ArtikelHero";
import ArtikelGrid from "@/components/sections/artikel/ArtikelGrid";

/* =========================================
   ArtikelPageClient — Client Wrapper
   Mengelola shared state antara Hero
   (filter chips + search) dan Grid (render).
   ========================================= */

export default function ArtikelPageClient() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // Tampilkan popup setelah 600ms (beri waktu halaman render dulu)
  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryChange = useCallback((cat: string) => {
    setSelectedCategory(cat);
  }, []);

  const handleSearchChange = useCallback((q: string) => {
    setSearchQuery(q);
  }, []);

  return (
    <main className="min-h-screen bg-bg-light">
      {/* ── Popup "Dalam Proses" ── */}
      <AnimatePresence>
        {showPopup && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[2000] bg-black/40 backdrop-blur-sm"
              onClick={() => setShowPopup(false)}
            />

            {/* Modal */}
            <motion.div
              key="popup"
              initial={{ opacity: 0, scale: 0.88, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="fixed inset-0 z-[2001] flex items-center justify-center p-5 pointer-events-none"
            >
              <div className="relative pointer-events-auto w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">

                {/* Top decorative bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-primary via-primary-dark to-accent-teal" />

                {/* Close button */}
                <button
                  onClick={() => setShowPopup(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-bg-light hover:bg-gray-200 flex items-center justify-center text-text-faint hover:text-text-heading transition-all"
                  aria-label="Tutup popup"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Content */}
                <div className="px-8 pt-10 pb-8 text-center">
                  {/* Icon */}
                  <div className="relative inline-flex mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Construction className="w-10 h-10 text-primary" />
                    </div>
                    {/* Sparkle badge */}
                    <motion.div
                      animate={{ rotate: [0, 15, -10, 15, 0], scale: [1, 1.15, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center shadow-md"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </motion.div>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-text-heading mb-2 tracking-tight">
                    Halaman Dalam Proses
                  </h2>

                  {/* Subtitle */}
                  <p className="text-text-light text-sm leading-relaxed mb-6 max-w-xs mx-auto">
                    Halaman <span className="font-semibold text-primary">Artikel</span> sedang dalam tahap pengembangan. Konten akan segera hadir dan terus diperbarui oleh tim Dakwah Tulungagung.
                  </p>

                  {/* Progress bar animasi */}
                  <div className="w-full h-1.5 bg-bg-light rounded-full overflow-hidden mb-6">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "70%" }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                      className="h-full bg-gradient-to-r from-primary to-accent-teal rounded-full"
                    />
                  </div>
                  <p className="text-xs text-text-faint mb-6">Progres pengembangan ~70%</p>

                  {/* CTA Button */}
                  <button
                    onClick={() => setShowPopup(false)}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-sm hover:shadow-cta hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Mengerti, Lanjutkan
                  </button>

                  {/* Small note */}
                  <p className="text-[11px] text-text-faint mt-4">
                    Klik di luar atau tombol ✕ untuk menutup
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ArtikelHero
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
      />
      <ArtikelGrid
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
      />
    </main>
  );
}
