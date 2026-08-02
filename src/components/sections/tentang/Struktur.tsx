"use client";

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { StrukturData, Pengurus } from '@/types/tentang';
import Button from '@/components/ui/button';

/* =========================================
   Struktur — Section Component
   Matches Photo 1 Layout but combined with
   a toggle for Pembina/Pengurus
   ========================================= */

interface StrukturProps {
  data: StrukturData;
}

const PersonCard = ({ person }: { person: Pengurus }) => {
  return (
    <div className="relative w-[240px] sm:w-[280px] h-[300px] sm:h-[340px] shrink-0 snap-start rounded-2xl overflow-hidden group bg-gray-100">
      {person.foto ? (
        <Image
          src={person.foto}
          alt={person.nama}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}
      {/* Gradient overlay at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80" />
      
      {/* Text Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-sm sm:text-base font-bold mb-1 whitespace-nowrap">
          {person.nama}
        </h3>
        <p className="text-white/70 text-sm font-medium">{person.jabatan}</p>
      </div>
    </div>
  );
};

export default function Struktur({ data }: StrukturProps) {
  const [activeTab, setActiveTab] = useState<'pembina' | 'pengawas' | 'pengurus' | 'anggota'>('pembina');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const currentData = data[activeTab] || [];
  const currentTitle = activeTab.charAt(0).toUpperCase() + activeTab.slice(1);
  const currentDesc = {
    pembina: 'Membimbing dan mengarahkan strategi pergerakan dakwah untuk mencapai visi dan misi organisasi secara optimal.',
    pengawas: 'Mengawasi jalannya roda organisasi agar tetap berjalan sesuai dengan visi, misi, and nilai-nilai yang telah ditetapkan.',
    pengurus: 'Tim eksekutif yang menjalankan roda organisasi, mengkoordinir berbagai program dakwah, sosial, dan pendidikan.',
    anggota: 'Segenap jajaran yang aktif berkontribusi dalam pelaksanaan program-program dakwah di lapangan.'
  }[activeTab];

  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <p className="text-xs font-bold tracking-[4px] text-primary mb-4 uppercase">
              Struktur Organisasi
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-heading tracking-tight mb-2">
              Tim Kami
            </h2>
          </div>
        </div>

        {/* Header & Nav Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-8 gap-6">
          {/* Section Toggle — Aligned above Intro Card */}
          <div className="p-1.5 rounded-xl bg-bg-light border border-border-default flex flex-wrap items-center gap-1">
            {[
              { id: 'pembina', label: 'Pembina' },
              { id: 'pengawas', label: 'Pengawas' },
              { id: 'pengurus', label: 'Pengurus' },
              { id: 'anggota', label: 'Anggota' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={[
                  "px-6 py-2.5 rounded-lg text-xs font-bold transition-all duration-300",
                  activeTab === tab.id 
                    ? "bg-primary text-white shadow-cta" 
                    : "text-text-light hover:text-primary"
                ].join(" ")}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button 
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-white border border-border-default hover:bg-bg-light transition-colors shadow-sm cursor-pointer"
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5 text-text-heading" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={scrollRight}
              className="w-12 h-12 rounded-full flex items-center justify-center btn-gradient-hover bg-gradient-to-br from-primary to-primary-dark text-white border-none transition-all relative overflow-hidden shadow-cta cursor-pointer"
              aria-label="Scroll right"
            >
              <span className="relative z-10 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-10 -mx-5 px-5 sm:mx-0 sm:px-0"
        >
          {/* Intro Card */}
          <div className="relative w-[240px] sm:w-[320px] h-[300px] sm:h-[340px] shrink-0 snap-start rounded-2xl overflow-hidden p-8 text-white flex flex-col btn-gradient-hover bg-gradient-to-br from-primary to-primary-dark group">
            <div className="relative z-10 mb-6">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">{currentTitle}</h3>
              <p className="text-white/80 leading-relaxed text-sm">
                {currentDesc}
              </p>
            </div>
            {/* Removed social links */}
          </div>

          {/* People Cards */}
          {currentData.map((person, index) => (
            <PersonCard key={index} person={person} />
          ))}
        </div>
      </div>
    </section>
  );
}
