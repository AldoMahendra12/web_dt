import { Metadata } from 'next';
import NavBar from '@/components/sections/nav-bar';
import LaporanHero from '@/components/sections/laporan/LaporanHero';
import LaporanContent from '@/components/sections/laporan/LaporanContent';
import FooterSection from '@/components/sections/footer-section';

export const metadata: Metadata = {
  title: 'Laporan — Dakwah Tulungagung',
  description: 'Laporan keuangan dan kegiatan tahunan Dakwah Tulungagung sebagai bentuk transparansi publik.'
};

export default function LaporanPage() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen">
        <LaporanHero />
        <LaporanContent />
      </main>
      <FooterSection />
    </>
  );
}
