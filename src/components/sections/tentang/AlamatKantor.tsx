"use client";

import React from 'react';
import { Kantor } from '@/types/tentang';
import Button from '@/components/ui/button';
import { MessageCircle, Mail, MapPin, Clock } from 'lucide-react';

/* =========================================
   AlamatKantor — Section Component
   Matches Photo 2 Layout
   Title & text on left, location cards on right,
   Map on bottom.
   ========================================= */

interface AlamatKantorProps {
  data: Kantor;
}

const AlamatKantor: React.FC<AlamatKantorProps> = ({ data }) => {
  return (
    <section className="py-16 sm:py-24 bg-bg-light">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 mb-12">
          {/* Left Column: Title & Description */}
          <div className="w-full lg:w-5/12 xl:w-1/2">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-bold text-text-heading mb-6 tracking-tight">
              Lokasi Kami
            </h2>
            <p className="text-text-light text-base sm:text-lg mb-8 leading-relaxed max-w-md">
              Temukan pusat kegiatan dan administrasi dakwah kami. Ada pertanyaan atau ingin berkunjung?
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                href={`https://wa.me/${data.whatsapp_number}`} 
                target="_blank" 
                rel="noopener noreferrer"
                variant="primary"
                className="px-8"
              >
                <MessageCircle className="w-4 h-4" />
                Hubungi Kami
              </Button>
              <Button 
                href={`mailto:${data.kontak.email}`}
                variant="secondary"
                className="px-8 border border-border-default"
              >
                <Mail className="w-4 h-4" />
                Kirim Email
              </Button>
            </div>
          </div>

          {/* Right Column: Location Cards */}
          <div className="w-full lg:w-7/12 xl:w-1/2">
            <div className="flex justify-between items-end mb-4 border-b border-border-default pb-4">
              <h3 className="text-xl sm:text-2xl font-bold text-text-heading">
                Tulungagung
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Location Card */}
              <div className="bg-white rounded-md p-6 border border-border-default shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-md bg-primary-10 flex items-center justify-center text-primary flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-heading mb-1">Kantor Pusat</h4>
                    <p className="text-sm text-text-light leading-relaxed">
                      {data.alamat}
                    </p>
                  </div>
                </div>
              </div>

              {/* Operational Hours Card */}
              <div className="bg-white rounded-md p-6 border border-border-default shadow-sm hover:shadow-md transition-shadow">
                 <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-md bg-primary-10 flex items-center justify-center text-primary flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-heading mb-1">Jam Operasional</h4>
                    <p className="text-sm text-text-light leading-relaxed">
                      {data.jam_operasional}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Map */}
        <div className="w-full">
          <div className="rounded-md overflow-hidden shadow-sm aspect-video sm:aspect-[21/9] w-full border border-border-default bg-gray-100">
            <iframe
              src={data.maps_embed_url}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Lokasi Dakwah Tulungagung"
              className="w-full h-full object-cover grayscale contrast-125 opacity-90"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlamatKantor;
