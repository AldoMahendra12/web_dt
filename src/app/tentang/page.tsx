"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { latarBelakangData, visiMisiData, strukturData, kantorData } from '@/data/tentang';
import NavBar from '@/components/sections/nav-bar';
import TentangHero from '@/components/sections/tentang/TentangHero';
import LatarBelakang from '@/components/sections/tentang/LatarBelakang';
import VisiMisi from '@/components/sections/tentang/VisiMisi';
import Struktur from '@/components/sections/tentang/Struktur';
import AlamatKantor from '@/components/sections/tentang/AlamatKantor';
import FooterSection from '@/components/sections/footer-section';
import { motion, AnimatePresence } from 'framer-motion';

export type TentangSection = 'latar-belakang' | 'visi-misi' | 'struktur' | 'lokasi';

function TentangPageInner() {
  const searchParams = useSearchParams();
  const [activeSection, setActiveSection] = useState<TentangSection>('latar-belakang');

  useEffect(() => {
    const sec = searchParams.get('section') as TentangSection | null;
    if (sec && ['latar-belakang', 'visi-misi', 'struktur', 'lokasi'].includes(sec)) {
      setActiveSection(sec);
    }
  }, [searchParams]);

  const renderSection = () => {
    switch (activeSection) {
      case 'latar-belakang':
        return <LatarBelakang data={latarBelakangData} />;
      case 'visi-misi':
        return <VisiMisi data={visiMisiData} />;
      case 'struktur':
        return <Struktur data={strukturData} />;
      case 'lokasi':
        return <AlamatKantor data={kantorData} />;
      default:
        return <LatarBelakang data={latarBelakangData} />;
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <TentangHero activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {renderSection()}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}

export default function TentangPage() {
  return (
    <>
      <NavBar />
      <Suspense fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <TentangPageInner />
      </Suspense>
      <FooterSection />
    </>
  );
}
