"use client";

import { useState } from "react";
import { programCategories, programItems } from "@/data/program";
import NavBar from "@/components/sections/nav-bar";
import ProgramHero from "@/components/sections/program/ProgramHero";
import ProgramContent from "@/components/sections/program/ProgramContent";
import ProgramCTA from "@/components/sections/program/ProgramCTA";
import FooterSection from "@/components/sections/footer-section";

/* =========================================
   Program Page — Dakwah Tulungagung
   Displays all program categories with
   tab navigation: Dakwah, Sosial,
   Pendidikan, Mitra
   ========================================= */

export default function ProgramPage() {
  const [activeCategoryId, setActiveCategoryId] = useState(programCategories[0]?.id || "dakwah");

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-white">
        <ProgramHero 
          activeCategoryId={activeCategoryId} 
          onCategoryChange={setActiveCategoryId} 
        />
        <ProgramContent
          activeId={activeCategoryId}
          categories={programCategories}
          items={programItems}
        />
        <ProgramCTA />
      </main>
      <FooterSection />
    </>
  );
}
