"use client";

import { motion } from "framer-motion";
import { Calendar, FileText, ExternalLink } from "lucide-react";

interface JadwalHeroProps {
  type: "kajian" | "khutbah";
  onTypeChange: (type: "kajian" | "khutbah") => void;
}

export default function JadwalHero({ type, onTypeChange }: JadwalHeroProps) {
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
            Jadwal Kajian <br />
            <span className="text-primary">&amp; Khutbah Jumat.</span>
          </h1>
          <p className="text-text-light max-w-2xl mx-auto mb-12 text-lg">
             Temukan informasi jadwal kajian rutin dan daftar khatib Jumat di masjid-masjid mitra Dakwah Tulungagung.
          </p>
        </motion.div>

        {/* Toggle & Drive Link Container */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
           {/* Custom Segmented Toggle */}
           <div className="p-1.5 rounded-xl bg-bg-light border border-border-default flex items-center gap-1">
              <button
                onClick={() => onTypeChange("kajian")}
                className={`px-8 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${
                  type === "kajian" 
                    ? "bg-primary text-white shadow-cta" 
                    : "text-text-light hover:text-primary"
                }`}
              >
                Jadwal Kajian
              </button>
              <button
                onClick={() => onTypeChange("khutbah")}
                className={`px-8 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${
                  type === "khutbah" 
                    ? "bg-primary text-white shadow-cta" 
                    : "text-text-light hover:text-primary"
                }`}
              >
                Khutbah Jumat
              </button>
           </div>

           {/* Google Drive Link */}
           <a 
             href="https://drive.google.com/path-to-your-pdf" 
             target="_blank" 
             rel="noopener noreferrer"
             className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white border border-border-default text-text-light hover:border-primary hover:text-primary transition-all group"
           >
              <FileText className="w-5 h-5 text-primary" />
              <span className="font-bold text-sm">Download PDF (G-Drive)</span>
              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
           </a>
        </div>
      </div>
    </section>
  );
}
