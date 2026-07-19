import type { DirectusArtikelItem } from "@/lib/directus";

/* =========================================
   Mock Artikel Data — untuk preview layout
   Digunakan saat Directus belum terhubung
   ========================================= */

export const MOCK_ARTIKEL: DirectusArtikelItem[] = [
  {
    id: "1",
    slug: "allah-menyayangi-yang-menyayangi-sesama",
    judul: "Allah Menyayangi Orang yang Menyayangi Sesama",
    ringkasan:
      "Islam mengajarkan bahwa kasih sayang adalah fondasi utama dalam hubungan antar manusia. Rasulullah ﷺ bersabda bahwa Allah tidak akan menyayangi orang yang tidak menyayangi sesama. Bagaimana seorang Muslim mewujudkan kasih sayang dalam kehidupan sehari-hari?",
    kategori: "Inspirasi",
    tanggal_publish: "2024-07-15T08:00:00Z",
    penulis: "Ustadz Ahmad Farid",
    gambar_utama: null,
    is_featured: true,
    status: "published",
  },
  {
    id: "2",
    slug: "keutamaan-sedekah-harian",
    judul: "Keutamaan Sedekah Harian dan Dampaknya bagi Kehidupan",
    ringkasan:
      "Sedekah bukan sekadar kewajiban, melainkan investasi terbaik seorang Muslim. Setiap hari adalah kesempatan untuk meraih berkah melalui pemberian yang ikhlas, baik berupa harta, senyuman, maupun ilmu yang bermanfaat.",
    kategori: "Inspirasi",
    tanggal_publish: "2024-07-12T08:00:00Z",
    penulis: "Tim Redaksi",
    gambar_utama: null,
    is_featured: false,
    status: "published",
  },
  {
    id: "3",
    slug: "hukum-membaca-al-fatihah-bagi-makmum",
    judul: "Hukum Membaca Al-Fatihah bagi Makmum dalam Shalat Berjamaah",
    ringkasan:
      "Para ulama berbeda pendapat mengenai kewajiban makmum membaca Al-Fatihah di belakang imam. Artikel ini merangkum pendapat-pendapat tersebut beserta dalil masing-masing untuk membantu umat dalam memahami permasalahan ini.",
    kategori: "Fiqih",
    tanggal_publish: "2024-07-10T08:00:00Z",
    penulis: "Ustadz Muhammad Yusuf",
    gambar_utama: null,
    is_featured: false,
    status: "published",
  },
  {
    id: "4",
    slug: "laporan-safari-dakwah-juli-2024",
    judul: "Laporan Kegiatan Safari Dakwah Juli 2024 di Tulungagung",
    ringkasan:
      "Dakwah Tulungagung kembali mengadakan Safari Dakwah yang menghadirkan para asatidzah dari berbagai daerah. Kegiatan berlangsung selama tiga hari dengan puluhan majelis ilmu yang tersebar di masjid-masjid wilayah Tulungagung.",
    kategori: "Kegiatan",
    tanggal_publish: "2024-07-08T08:00:00Z",
    penulis: "Tim Dakwah Tulungagung",
    gambar_utama: null,
    is_featured: false,
    status: "published",
  },
  {
    id: "5",
    slug: "abu-bakar-ash-shiddiq-sahabat-termulia",
    judul: "Abu Bakar Ash-Shiddiq: Sahabat Termulia yang Membenarkan Segala Wahyu",
    ringkasan:
      "Abu Bakar Ash-Shiddiq adalah sahabat yang paling dicintai Rasulullah ﷺ. Kisah hidupnya penuh dengan teladan keteguhan iman, keberanian dalam membela kebenaran, dan kedermawanan yang tiada tara.",
    kategori: "Sejarah",
    tanggal_publish: "2024-07-05T08:00:00Z",
    penulis: "Ustadz Ibrahim Al-Atsari",
    gambar_utama: null,
    is_featured: false,
    status: "published",
  },
  {
    id: "6",
    slug: "metode-nabi-mendidik-anak",
    judul: "Metode Nabi dalam Mendidik Anak: Kasih Sayang sebagai Pondasi",
    ringkasan:
      "Rasulullah ﷺ adalah suri teladan terbaik dalam segala aspek kehidupan, termasuk mendidik generasi penerus. Metode beliau yang penuh kasih sayang, dialog, dan keteladanan langsung terbukti melahirkan generasi terbaik sepanjang sejarah.",
    kategori: "Inspirasi",
    tanggal_publish: "2024-07-02T08:00:00Z",
    penulis: "Ustadzah Aisyah Rahma",
    gambar_utama: null,
    is_featured: false,
    status: "published",
  },
  {
    id: "7",
    slug: "tabligh-akbar-1445-h",
    judul: "Tabligh Akbar 1445 H: Ribuan Jamaah Padati Alun-Alun Tulungagung",
    ringkasan:
      "Kegiatan Tabligh Akbar yang diselenggarakan Dakwah Tulungagung sukses menghadirkan ribuan jamaah. Acara yang berlangsung khidmat ini menghadirkan pemateri nasional dan diisi dengan tausiyah yang menyejukkan hati.",
    kategori: "Kegiatan",
    tanggal_publish: "2024-06-28T08:00:00Z",
    penulis: "Tim Dakwah Tulungagung",
    gambar_utama: null,
    is_featured: false,
    status: "published",
  },
  {
    id: "8",
    slug: "doa-pagi-hari-rasulullah",
    judul: "Doa-Doa Pagi Hari yang Diajarkan Rasulullah ﷺ",
    ringkasan:
      "Memulai hari dengan dzikir dan doa pagi adalah salah satu amalan sunnah yang sangat dianjurkan. Setiap doa mengandung makna yang dalam dan manfaat spiritual maupun psikologis bagi pembacanya.",
    kategori: "Inspirasi",
    tanggal_publish: "2024-06-25T08:00:00Z",
    penulis: "Tim Redaksi",
    gambar_utama: null,
    is_featured: false,
    status: "published",
  },
  {
    id: "9",
    slug: "sejarah-masjid-tulungagung",
    judul: "Sejarah Singkat Perkembangan Islam di Tulungagung",
    ringkasan:
      "Tulungagung memiliki sejarah Islam yang kaya dan panjang. Dari peranan para wali hingga ulama-ulama lokal yang berdakwah dengan penuh ketekunan, jejak Islam di kota ini layak untuk diketahui oleh generasi muda.",
    kategori: "Sejarah",
    tanggal_publish: "2024-06-20T08:00:00Z",
    penulis: "Ustadz Ibrahim Al-Atsari",
    gambar_utama: null,
    is_featured: false,
    status: "published",
  },
];
