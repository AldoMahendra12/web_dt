"use client";

import { motion } from "framer-motion";
import { Sparkles, Mic2, Handshake, BookOpen, Link as LinkIcon } from "lucide-react";
import { programCategories } from "@/data/program";

/* =========================================
   ProgramHero — Hero Section for Program Page
   Centered style matching Tentang Kami Hero
   Includes Section Toggle
   ========================================= */

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  dakwah: <Mic2 className="w-4 h-4" />,
  sosial: <Handshake className="w-4 h-4" />,
  pendidikan: <BookOpen className="w-4 h-4" />,
  mitra: <LinkIcon className="w-4 h-4" />,
};

interface ProgramHeroProps {
  activeCategoryId: string;
  onCategoryChange: (id: string) => void;
}

export default function ProgramHero({ activeCategoryId, onCategoryChange }: ProgramHeroProps) {
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
            Ikhtiar Nyata Untuk <br />
            <span className="text-primary">Kemanusiaan & Dakwah.</span>
          </h1>
          <p className="text-text-light max-w-2xl mx-auto mb-12 text-lg">
             Berbagai inisiatif berkelanjutan untuk membangun masyarakat Tulungagung yang lebih religius, sejahtera, dan mandiri.
          </p>
        </motion.div>

        {/* Toggle Container */}
        <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="p-1.5 rounded-xl bg-bg-light border border-border-default flex flex-wrap items-center gap-1">
              {programCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onCategoryChange(cat.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${
                    activeCategoryId === cat.id 
                      ? "bg-primary text-white shadow-cta" 
                      : "text-text-light hover:text-primary"
                  }`}
                >
                  {CATEGORY_ICONS[cat.id]}
                  {cat.label}
                </button>
              ))}
            </div>
        </div>
      </div>
    </section>
  );
}
