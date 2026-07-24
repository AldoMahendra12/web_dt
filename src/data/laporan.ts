export interface LaporanItem {
  id: string;
  year: number;
  type: 'keuangan' | 'kegiatan';
  title: string;
  description: string;
  fileUrl: string;
}

export const laporanData: LaporanItem[] = [
  // ── 2026 ──────────────────────────────────────
  {
    id: '7',
    year: 2026,
    type: 'keuangan',
    title: 'Laporan Keuangan 2026',
    description: 'Transparansi dana umat dan penggunaan anggaran tahun 2026. Terus diperbarui secara berkala.',
    fileUrl: 'https://drive.google.com/drive/folders/1OkZYF5Ao6j_Lk_J0J8oe1A3HHo1spa5A?usp=drive_link'
  },
  {
    id: '8',
    year: 2026,
    type: 'kegiatan',
    title: 'Laporan Kegiatan 2026',
    description: 'Rekapitulasi program dan aktivitas dakwah sepanjang tahun 2026. Terus diperbarui secara berkala.',
    fileUrl: 'https://drive.google.com/drive/folders/1OkZYF5Ao6j_Lk_J0J8oe1A3HHo1spa5A?usp=drive_link'
  },

  // ── 2025 ──────────────────────────────────────
  {
    id: '5',
    year: 2025,
    type: 'keuangan',
    title: 'Laporan Keuangan 2025',
    description: 'Transparansi dana umat dan penggunaan anggaran tahun 2025.',
    fileUrl: 'https://drive.google.com/drive/folders/1CQ43ftOIeyIbLnvwGzmgN7tga5YZLMfz?usp=drive_link'
  },
  {
    id: '6',
    year: 2025,
    type: 'kegiatan',
    title: 'Laporan Kegiatan 2025',
    description: 'Rekapitulasi program dan aktivitas dakwah sepanjang tahun 2025.',
    fileUrl: 'https://drive.google.com/drive/folders/1CQ43ftOIeyIbLnvwGzmgN7tga5YZLMfz?usp=drive_link'
  },

  // ── 2024 ──────────────────────────────────────
  {
    id: '1',
    year: 2024,
    type: 'keuangan',
    title: 'Laporan Keuangan 2024',
    description: 'Transparansi dana umat dan penggunaan anggaran tahun 2024.',
    fileUrl: 'https://drive.google.com/drive/folders/1TttC2v4m5wnocfEKMPVmzhCpPRTgGNPs?usp=drive_link'
  },
  {
    id: '2',
    year: 2024,
    type: 'kegiatan',
    title: 'Laporan Kegiatan 2024',
    description: 'Rekapitulasi program dan aktivitas dakwah sepanjang tahun 2024.',
    fileUrl: 'https://drive.google.com/drive/folders/1TttC2v4m5wnocfEKMPVmzhCpPRTgGNPs?usp=drive_link'
  }
];
