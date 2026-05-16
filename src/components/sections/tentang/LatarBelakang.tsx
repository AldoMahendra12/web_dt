import React from 'react';
import { LatarBelakang as LatarBelakangType } from '@/types/tentang';

/* =========================================
   LatarBelakang — Section Component
   Matches Program page style
   ========================================= */

interface LatarBelakangProps {
  data: LatarBelakangType;
}

export default function LatarBelakang({ data }: LatarBelakangProps) {
  return (
    <section className="py-16 sm:py-24 bg-bg-light">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="max-w-[800px] mx-auto text-center">
          <p className="text-xs font-bold tracking-[4px] text-primary mb-4 uppercase">
            Latar Belakang
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-heading mb-8 tracking-tight leading-tight">
            {data.headline}
          </h2>
          <div className="space-y-6">
            {data.body.map((paragraph, index) => (
              <p key={index} className="text-lg sm:text-xl text-text-light leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
