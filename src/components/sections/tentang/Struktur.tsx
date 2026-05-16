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
        <h3 className="text-base sm:text-lg font-bold mb-1 whitespace-nowrap overflow-hidden text-ellipsis">
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
            
            <div className="relative z-10 flex gap-3 mt-auto">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
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
