"use client";

import { useState } from "react";
import NavBar from "@/components/sections/nav-bar";
import FooterSection from "@/components/sections/footer-section";
import JadwalHero from "@/components/sections/jadwal/JadwalHero";
import JadwalKajianClient from "@/components/sections/jadwal/JadwalKajianClient";

export default function JadwalPage() {
  const [type, setType] = useState<"kajian" | "khutbah">("kajian");

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        <JadwalHero type={type} onTypeChange={setType} />
        <JadwalKajianClient />
      </main>
      <FooterSection />
    </div>
  );
}
