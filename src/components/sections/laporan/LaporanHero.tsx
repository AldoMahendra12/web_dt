"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

/* =========================================
   LaporanHero — Hero Section for Laporan Page
   Centered style matching Tentang Kami Hero
   ========================================= */

export default function LaporanHero() {
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
            Amanah & Terukur <br />
            <span className="text-primary">Dalam Setiap Langkah.</span>
          </h1>
          <p className="text-text-light max-w-2xl mx-auto mb-12 text-lg">
             Laporan pertanggungjawaban kegiatan dan keuangan sebagai bentuk komitmen kami terhadap kepercayaan donatur dan umat.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
