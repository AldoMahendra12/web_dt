"use client";

import { useState } from "react";
import { laporanData } from "@/data/laporan";
import Button from "@/components/ui/button";

/* =========================================
   LaporanContent — Reports Section
   Matches Image 1 layout (but light theme)
   ========================================= */

export default function LaporanContent() {
  const years = Array.from(new Set(laporanData.map((item) => item.year))).sort((a, b) => b - a);
  const [selectedYear, setSelectedYear] = useState(years[0]);

  const filteredLaporan = laporanData.filter((item) => item.year === selectedYear);

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Side: Title & Year Picker */}
          <div className="lg:col-span-5">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-text-heading leading-tight mb-8 tracking-tight">
              Laporan Tahunan <br />
              <span className="text-primary">Dakwah Tulungagung</span>
            </h2>
            
            <p className="text-text-light text-lg mb-10 leading-relaxed max-w-[400px]">
              Transparansi adalah amanah. Lihat dan unduh laporan pertanggungjawaban kegiatan dan keuangan kami.
            </p>

            {/* Year Picker (Styled like Image 1 toggle) */}
            <div className="inline-flex p-1.5 bg-bg-light rounded-xl border border-border-default shadow-sm overflow-x-auto scrollbar-hide max-w-full">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={[
                    "px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 whitespace-nowrap",
                    selectedYear === year
                      ? "bg-white text-primary shadow-md ring-1 ring-black/5"
                      : "text-text-muted hover:text-text-heading"
                  ].join(" ")}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Report Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredLaporan.map((item) => (
              <div 
                key={item.id}
                className="group bg-white rounded-2xl p-8 border border-border-default shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors duration-300">
                  {item.type === 'keuangan' ? (
                    <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v12a2 2 0 01-2 2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 2v6h6" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 13H8m8 4H8m0-8h1" />
                    </svg>
                  )}
                </div>

                <h3 className="text-xl font-bold text-text-heading mb-3 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-text-light leading-relaxed mb-8">
                  {item.description}
                </p>

                <div className="mt-auto">
                  <Button 
                    href={item.fileUrl}
                    variant="primary"
                    className="w-full"
                  >
                    Unduh
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                    </svg>
                  </Button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
