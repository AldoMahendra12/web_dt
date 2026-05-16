"use client";

import { useState, useCallback } from "react";
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

  const handleCategoryChange = useCallback((cat: string) => {
    setSelectedCategory(cat);
  }, []);

  const handleSearchChange = useCallback((q: string) => {
    setSearchQuery(q);
  }, []);

  return (
    <main className="min-h-screen bg-bg-light">
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
