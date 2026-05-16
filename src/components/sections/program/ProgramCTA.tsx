"use client";

import Button from "@/components/ui/button";
import { useDonasiDialog } from "@/components/ui/donasi-provider";

/* =========================================
   ProgramCTA — Call to Action
   Bottom section encouraging donations
   and participation in programs
   ========================================= */

export default function ProgramCTA() {
  const { openDonasi } = useDonasiDialog();
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-dark px-8 py-16 sm:px-16 sm:py-20 text-center text-white">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 max-w-[600px] mx-auto">
            <p className="text-xs font-bold tracking-[4px] text-white/70 mb-4">
              BERGABUNG BERSAMA KAMI
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">
              Mari Berkontribusi dalam Kebaikan
            </h2>
            <p className="text-base text-white/80 leading-relaxed mb-8">
              Setiap kontribusi Anda, sekecil apapun, sangat berarti bagi kemajuan
              dakwah dan kesejahteraan umat di Tulungagung.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={openDonasi}
                variant="secondary"
                size="lg"
                
              >
                Donasi Sekarang
              </Button>
              <Button
                href="#"
                variant="ghost"
                size="lg"
                
              >
                Hubungi Kami
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
