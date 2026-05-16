"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState, useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";
import Button from "@/components/ui/button";

/* =========================================
   ArtikelHero — Search + Category Chips
   State diangkat ke atas via callback props
   agar ArtikelGrid bisa ikut ter-filter.
   ========================================= */

export const ARTIKEL_CATEGORIES = [
  "Semua",
  "Berita",
  "Opini",
  "Kegiatan",
  "Inspirasi",
  "Fiqih",
  "Sejarah",
  "Tanya Jawab",
] as const;

export type ArtikelCategory = (typeof ARTIKEL_CATEGORIES)[number];

interface ArtikelHeroProps {
  onCategoryChange: (cat: string) => void;
  onSearchChange: (q: string) => void;
}

export default function ArtikelHero({
  onCategoryChange,
  onSearchChange,
}: ArtikelHeroProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<ArtikelCategory>("Semua");
  const [searchValue, setSearchValue] = useState("");

  const debouncedSearch = useDebouncedCallback((value: string) => {
    onSearchChange(value);
  }, 500);

  const handleCategoryClick = useCallback(
    (cat: ArtikelCategory) => {
      setSelectedCategory(cat);
      onCategoryChange(cat);
    },
    [onCategoryChange]
  );

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchValue(val);
    debouncedSearch(val);
  };

  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
        <div className="absolute top-[-10%] left-[10%] w-[40%] h-[60%] bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[10%] w-[40%] h-[60%] bg-accent-teal/20 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-text-heading mb-8 tracking-tight">
            Cari &amp; Temukan <br />
            <span className="text-primary">Inspirasi Kebaikan.</span>
          </h1>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative max-w-2xl mx-auto mb-12"
        >
          <div
            className={`relative flex items-center transition-all duration-500 rounded-md border ${
              isFocused
                ? "border-primary shadow-glow bg-white"
                : "border-border-default bg-white/50 backdrop-blur-md"
            }`}
          >
            <div className="pl-6 text-text-light">
              <Search
                className={`w-5 h-5 transition-colors ${
                  isFocused ? "text-primary" : "text-text-faint"
                }`}
              />
            </div>
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchInput}
              placeholder="Apa yang ingin Anda pelajari hari ini?"
              className="w-full py-5 px-4 bg-transparent outline-none text-text-heading placeholder:text-text-faint font-medium"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <div className="pr-4">
              <Button
                variant={isFocused ? "primary" : "secondary"}
                className="py-2.5 min-w-[80px]"
                onClick={() => onSearchChange(searchValue)}
              >
                Cari
              </Button>
            </div>
          </div>

          {/* Glow beneath search */}
          {isFocused && (
            <motion.div
              layoutId="search-glow"
              className="absolute -inset-1 bg-primary/20 blur-xl rounded-md -z-10"
            />
          )}
        </motion.div>

        {/* Category Chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {ARTIKEL_CATEGORIES.map((cat) => {
            const isTanyaJawab = cat === "Tanya Jawab";
            const isActive = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={[
                  "px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-300 border flex items-center gap-1.5",
                  isActive
                    ? isTanyaJawab
                      ? "bg-amber-500 text-white border-amber-500 shadow-cta"
                      : "bg-primary text-white border-primary shadow-cta"
                    : isTanyaJawab
                    ? "bg-white border-amber-300 text-amber-600 hover:border-amber-500 hover:text-amber-700"
                    : "bg-white border-border-default text-text-light hover:border-primary/50 hover:text-primary",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {isTanyaJawab && <span>❓</span>}
                {cat}
              </button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
