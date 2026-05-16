"use client";

import { motion } from "framer-motion";
import { Info, Target, Users, MapPin } from "lucide-react";
import type { TentangSection } from "@/app/tentang/page";

interface TentangHeroProps {
  activeSection: TentangSection;
  onSectionChange: (section: TentangSection) => void;
}

export default function TentangHero({ activeSection, onSectionChange }: TentangHeroProps) {
  return (
    <section className="pt-32 pb-16 bg-white overflow-hidden relative">
      {/* Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-1/2 h-full bg-primary/5 blur-[120px] -z-10 rounded-full" />
      
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-text-heading mb-6 tracking-tight">
            Mengenal Lebih Dekat <br />
            <span className="text-primary">Dakwah Tulungagung.</span>
          </h1>
          <p className="text-text-light max-w-2xl mx-auto mb-12 text-lg">
             Menjadi wadah inspirasi, informasi, dan solusi islami bagi masyarakat Tulungagung dan sekitarnya.
          </p>
        </motion.div>

        {/* Toggle Container */}
        <div className="flex flex-wrap items-center justify-center gap-4">
           {/* Custom Segmented Toggle */}
           <div className="p-1.5 rounded-xl bg-bg-light border border-border-default flex flex-wrap items-center gap-1">
              <button
                onClick={() => onSectionChange("latar-belakang")}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${
                  activeSection === "latar-belakang" 
                    ? "bg-primary text-white shadow-cta" 
                    : "text-text-light hover:text-primary"
                }`}
              >
                <Info className="w-4 h-4" />
                Latar Belakang
              </button>
              <button
                onClick={() => onSectionChange("visi-misi")}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${
                  activeSection === "visi-misi" 
                    ? "bg-primary text-white shadow-cta" 
                    : "text-text-light hover:text-primary"
                }`}
              >
                <Target className="w-4 h-4" />
                Visi & Misi
              </button>
              <button
                onClick={() => onSectionChange("struktur")}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${
                  activeSection === "struktur" 
                    ? "bg-primary text-white shadow-cta" 
                    : "text-text-light hover:text-primary"
                }`}
              >
                <Users className="w-4 h-4" />
                Struktur
              </button>
              <button
                onClick={() => onSectionChange("lokasi")}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${
                  activeSection === "lokasi" 
                    ? "bg-primary text-white shadow-cta" 
                    : "text-text-light hover:text-primary"
                }`}
              >
                <MapPin className="w-4 h-4" />
                Lokasi
              </button>
           </div>
        </div>
      </div>
    </section>
  );
}
