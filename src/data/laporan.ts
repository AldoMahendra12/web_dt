export interface LaporanItem {
  id: string;
  year: number;
  type: 'keuangan' | 'kegiatan';
  title: string;
  description: string;
  fileUrl: string;
}

export const laporanData: LaporanItem[] = [
  {
    id: '5',
    year: 2025,
    type: 'keuangan',
    title: 'Laporan Keuangan 2025',
    description: 'Transparansi dana umat dan penggunaan anggaran tahun 2025.',
    fileUrl: '#'
  },
  {
    id: '6',
    year: 2025,
    type: 'kegiatan',
    title: 'Laporan Kegiatan 2025',
    description: 'Rekapitulasi program dan aktivitas dakwah sepanjang tahun 2025.',
    fileUrl: '#'
  },
  {
    id: '1',
    year: 2024,
    type: 'keuangan',
    title: 'Laporan Keuangan 2024',
    description: 'Transparansi dana umat dan penggunaan anggaran tahun 2024.',
    fileUrl: '#'
  },
  {
    id: '2',
    year: 2024,
    type: 'kegiatan',
    title: 'Laporan Kegiatan 2024',
    description: 'Rekapitulasi program dan aktivitas dakwah sepanjang tahun 2024.',
    fileUrl: '#'
  },
  {
    id: '3',
    year: 2023,
    type: 'keuangan',
    title: 'Laporan Keuangan 2023',
    description: 'Transparansi dana umat dan penggunaan anggaran tahun 2023.',
    fileUrl: '#'
  },
  {
    id: '4',
    year: 2023,
    type: 'kegiatan',
    title: 'Laporan Kegiatan 2023',
    description: 'Rekapitulasi program dan aktivitas dakwah sepanjang tahun 2023.',
    fileUrl: '#'
  }
];
