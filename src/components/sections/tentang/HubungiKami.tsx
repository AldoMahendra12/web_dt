"use client";

import React from 'react';
import { Kontak as KontakType } from '@/types/tentang';
import Button from '@/components/ui/button';
import { useDonasiDialog } from '@/components/ui/donasi-provider';

/* =========================================
   HubungiKami — Section Component
   Matches ProgramCTA style
   ========================================= */

interface HubungiKamiProps {
  data: KontakType;
}

export default function HubungiKami({ data }: HubungiKamiProps) {
  const { openDonasi } = useDonasiDialog();

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-dark px-8 py-16 sm:px-16 sm:py-20 text-center text-white shadow-card-hover border border-primary/20">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 max-w-[600px] mx-auto">
            <p className="text-xs font-bold tracking-[4px] text-white/70 mb-4 uppercase">
              Hubungi Kami
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 leading-tight">
              Mari Bersinergi dalam Dakwah
            </h2>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10">
              {data.email && (
                <div className="flex items-center gap-2 text-white/90">
                  <svg className="w-5 h-5 text-accent-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{data.email}</span>
                </div>
              )}
              {data.telepon && (
                <div className="flex items-center gap-2 text-white/90">
                  <svg className="w-5 h-5 text-accent-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{data.telepon}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={openDonasi} variant="secondary" size="lg" >
                Donasi Sekarang
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
