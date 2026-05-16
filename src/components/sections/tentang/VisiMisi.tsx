import React from 'react';
import { VisiMisi as VisiMisiType } from '@/types/tentang';

/* =========================================
   VisiMisi — Section Component
   Matches Program page style
   ========================================= */

interface VisiMisiProps {
  data: VisiMisiType;
}

export default function VisiMisi({ data }: VisiMisiProps) {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="text-center mb-16 sm:mb-20">
          <p className="text-xs font-bold tracking-[4px] text-primary mb-4 uppercase">
            Tujuan Kami
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-heading tracking-tight">
            Visi & Misi
          </h2>
        </div>

        <div className="max-w-[1000px] mx-auto space-y-8 sm:space-y-12">
          {/* Visi Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-dark px-8 py-12 sm:px-16 sm:py-16 shadow-card-hover group border border-primary/20">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 transition-transform duration-700 group-hover:scale-110" />

            <div className="relative z-10 text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-xs font-bold tracking-[2px] text-white uppercase mb-6 backdrop-blur-sm border border-white/10">
                Visi
              </span>
              <p className="text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed text-white">
                {data.visi}
              </p>
            </div>
          </div>

          {/* Misi Header */}
          <div className="text-center pt-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-xs font-bold tracking-[2px] text-primary uppercase mb-2 backdrop-blur-sm border border-primary/10">
              Misi
            </span>
          </div>

          {/* Misi Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {data.misi.map((item, index) => (
              <div 
                key={index} 
                className={`bg-bg-light rounded-3xl p-8 sm:p-10 border border-border-default hover:border-primary/30 transition-colors duration-300 group ${
                  index === 4 ? 'md:col-span-2' : ''
                }`}
              >
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-xl font-bold text-primary mb-6 shadow-sm border border-border-default group-hover:scale-110 transition-transform duration-300">
                  {item.nomor}
                </span>
                <p className="text-base text-text-light leading-relaxed">
                  {item.teks}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
