"use client";

import Button from "@/components/ui/button";
import { useDonasiDialog } from "@/components/ui/donasi-provider";

/* =========================================
   HadithSection — Clean & Simple
   ─────────────────────────────────────
   Removed scroll animations and sequence
   to focus purely on the message.
   ========================================= */

export default function HadithSection() {
  const { openDonasi } = useDonasiDialog();

  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="container mx-auto px-5">
        <div className="text-center max-w-[1000px] mx-auto">
          {/* Header */}
          <p className="text-primary text-xs font-bold tracking-[4px] mb-[30px] uppercase">
            Rasulullah ﷺ Bersabda
          </p>

          {/* Arabic Text */}
          <h2
            className="font-arabic text-[28px] sm:text-[40px] md:text-5xl lg:text-6xl leading-snug mb-[30px] text-text-heading"
            dir="rtl"
          >
            وَاللَّهُ فِى عَوْنِ الْعَبْدِ مَا كَانَ الْعَبْدُ فِى عَوْنِ
            أَخِيهِ
          </h2>

          {/* Translation */}
          <div className="mb-10">
            <p className="text-xl sm:text-2xl leading-relaxed italic text-text-muted mb-4 max-w-[800px] mx-auto">
              &quot;Allah senantiasa menolong hamba selama ia menolong
              saudaranya.&quot;
            </p>
            {/* Source */}
            <p className="text-sm text-text-faint">
              (HR. Muslim no. 2699)
            </p>
          </div>

          {/* Donation CTA */}
          <div className="flex justify-center">
            <Button onClick={openDonasi} variant="primary" size="lg">
              Donasi Sekarang
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
