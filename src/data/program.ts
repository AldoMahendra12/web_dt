import type { ProgramCategory, ProgramItem } from "@/types";

/* =========================================
   Program Data - Dakwah Tulungagung
   All program categories and items.
   ========================================= */

export const programCategories: ProgramCategory[] = [
  {
    id: "dakwah",
    label: "Dakwah",
    description:
      "Program dakwah untuk menyebarkan ilmu agama Islam yang shahih dan bermanfaat bagi umat.",
    icon: "mosque",
  },
  {
    id: "sosial",
    label: "Sosial",
    description:
      "Program sosial untuk membantu sesama dan meringankan beban masyarakat yang membutuhkan.",
    icon: "heart",
  },
  {
    id: "pendidikan",
    label: "Pendidikan",
    description:
      "Program pendidikan untuk meningkatkan kualitas ilmu dan keterampilan umat Islam.",
    icon: "book",
  },
  {
    id: "mitra",
    label: "Mitra",
    description:
      "Jaringan mitra dan lembaga yang berkolaborasi dalam kebaikan bersama Dakwah Tulungagung.",
    icon: "handshake",
  },
];

export const programItems: ProgramItem[] = [
  /* === Dakwah === */
  {
    id: "live-kajian",
    categoryId: "dakwah",
    title: "Live Kajian",
    subtitle: "Kajian Online",
    description: "Siaran langsung kajian ilmu agama melalui platform digital yang dapat diakses di mana saja.",
    fullDescription: "Program Live Kajian menghadirkan kemudahan bagi jamaah untuk tetap menimba ilmu meskipun terhalang jarak dan waktu. Melalui siaran langsung di berbagai platform media sosial Dakwah Tulungagung, jamaah dapat menyimak pembahasan kitab dan tanya jawab agama secara interaktif dari mana pun mereka berada.",
    icon: "live",
    youtubePlaylistUrl: "https://www.youtube.com/@DakwahTulungagung/streams",
  },
  {
    id: "tabligh-akbar",
    categoryId: "dakwah",
    title: "Tabligh Akbar",
    subtitle: "Kajian Umum Besar",
    description: "Kajian akbar yang menghadirkan tokoh nasional untuk mempererat ukhuwah dan syiar Islam.",
    fullDescription: "Tabligh Akbar adalah perhelatan kajian besar yang menjadi momentum berkumpulnya ribuan jamaah untuk mempererat tali ukhuwah islamiyah. Menghadirkan pemateri terkemuka tingkat nasional, acara ini bertujuan untuk memberikan pencerahan sekaligus memperkuat syiar dakwah sunnah di tengah masyarakat Tulungagung.",
    icon: "event",
    youtubePlaylistUrl: "https://www.youtube.com/@DakwahTulungagung/search?query=Tabligh+Akbar",
  },
  {
    id: "kajian-muslimah",
    categoryId: "dakwah",
    title: "Kajian Muslimah",
    subtitle: "Kajian Khusus Akhwat",
    description: "Wadah belajar khusus muslimah untuk memperdalam fiqih wanita dan peran keluarga.",
    fullDescription: "Kajian Muslimah dirancang khusus untuk memenuhi kebutuhan ilmu para akhwat dalam menjalankan peran sebagai ibu, istri, dan hamba Allah. Pembahasan difokuskan pada fiqih wanita, tarbiyatul aulad (pendidikan anak), serta manajemen rumah tangga yang sesuai dengan tuntunan Al-Qur'an dan As-Sunnah.",
    icon: "study",
    youtubePlaylistUrl: "https://www.youtube.com/@DakwahTulungagung/search?query=Kajian+Muslimah",
  },
  {
    id: "safari-dakwah",
    categoryId: "dakwah",
    title: "Safari Dakwah",
    subtitle: "Kajian Intensif",
    description: "Rangkaian kajian yang menghadirkan asatidzah dari luar daerah untuk menyapa jamaah di Tulungagung.",
    fullDescription: "Safari Dakwah adalah program khusus Dakwah Tulungagung yang mengundang para ustadz dan asatidzah berkompeten dari luar daerah untuk mengisi serangkaian kajian di Tulungagung. Meskipun serupa dengan Tabligh Akbar, Safari Dakwah memiliki rangkaian acara yang lebih banyak dan terjadwal secara intensif di berbagai lokasi, memungkinkan interaksi ilmu yang lebih mendalam bagi seluruh lapisan masyarakat.",
    icon: "journey",
    youtubePlaylistUrl: "https://www.youtube.com/@DakwahTulungagung/search?query=Safari+Dakwah",
  },
  {
    id: "kajian-rutin",
    categoryId: "dakwah",
    title: "Kajian Rutin",
    subtitle: "Kajian Berkala",
    description: "Pembahasan kitab secara sistematis dan berkesinambungan untuk pemahaman ilmu yang kokoh.",
    fullDescription: "Kajian Rutin adalah sarana thalabul ilmi yang bersifat berkelanjutan. Dalam kajian ini, jamaah diajak untuk membedah kitab-kitab para ulama secara bab demi bab, mulai dari tauhid, ibadah, hingga akhlak, demi membangun pondasi pemahaman agama yang mendalam dan terstruktur.",
    icon: "book",
    youtubePlaylistUrl: "https://www.youtube.com/@DakwahTulungagung/playlists",
  },

  /* === Sosial === */
  {
    id: "jumat-berkah",
    categoryId: "sosial",
    title: "Jumat Berkah",
    subtitle: "Nasi Gratis",
    description: "Inisiatif berbagi makanan gratis setiap hari Jumat sebagai wujud kepedulian sosial.",
    fullDescription: "Melalui program Jumat Berkah, Dakwah Tulungagung berupaya menyebarkan kebahagiaan dengan membagikan paket makanan gratis kepada jamaah shalat Jumat, musafir, dan masyarakat yang membutuhkan. Kegiatan ini bukan sekadar berbagi makanan, tetapi juga sarana mempererat silaturahmi dan memupuk kepedulian antar sesama.",
    icon: "food",
    reports: [
      {
        date: "28 Juli 2026",
        title: "Penyaluran Nasi Kotak Jumat Berkah",
        description: "Alhamdulillah, pekan ini tim relawan Dakwah Tulungagung telah menyalurkan 350 kotak nasi sehat gratis bagi jamaah shalat Jumat, tukang becak, dan dhuafa di kawasan sekitar Masjid Jami'. Jazakumullahu khairan kepada para donatur.",
        stats: [
          { label: "Jumlah Paket", value: "350 Box" },
          { label: "Lokasi", value: "Kec. Kedungwaru" },
        ],
      },
      {
        date: "21 Juli 2026",
        title: "Aksi Jumat Peduli Sesama",
        description: "Penyaluran berkah hari Jumat berupa makanan siap saji yang berjalan tertib. Donasi terkumpul dikonversi secara transparan untuk penyediaan bahan pangan segar dari pedagang lokal.",
        stats: [
          { label: "Jumlah Paket", value: "320 Box" },
          { label: "Mitra Warung", value: "3 Warung Lokal" },
        ],
      },
    ],
  },
  {
    id: "pemeriksaan-gratis",
    categoryId: "sosial",
    title: "Pemeriksaan Gratis",
    subtitle: "Cek Kesehatan",
    description: "Layanan cek kesehatan dasar tanpa biaya untuk membantu masyarakat menjaga kesehatan.",
    fullDescription: "Program Pemeriksaan Gratis hadir sebagai bentuk nyata kepedulian Dakwah Tulungagung terhadap kesehatan umat. Bekerja sama dengan tenaga medis profesional, kami menyediakan layanan pengecekan kesehatan rutin seperti tekanan darah, gula darah, dan konsultasi kesehatan umum bagi masyarakat luas tanpa dipungut biaya.",
    icon: "health",
    reports: [
      {
        date: "15 Juni 2026",
        title: "Bakti Sosial & Cek Kesehatan Gratis",
        description: "Pelaksanaan cek kesehatan gratis yang meliputi pemeriksaan gula darah, kolesterol, asam urat, dan tensi. Didukung oleh 3 dokter umum dan 4 perawat sukarelawan.",
        stats: [
          { label: "Penerima Manfaat", value: "150 Orang" },
          { label: "Tenaga Medis", value: "7 Relawan" },
        ],
      },
    ],
  },
  {
    id: "pipanisasi",
    categoryId: "sosial",
    title: "Pipanisasi",
    subtitle: "Akses Air Bersih",
    description: "Pembangunan sarana air bersih untuk wilayah yang kesulitan akses air layak konsumsi.",
    fullDescription: "Program Pipanisasi berfokus pada penyediaan infrastruktur air bersih bagi pemukiman atau fasilitas umum yang selama ini kesulitan mendapatkan akses air layak. Dengan membangun jaringan pipa dan sumber air, kami berharap dapat membantu meningkatkan kualitas sanitasi dan kesehatan masyarakat di daerah-daerah terpencil.",
    icon: "water",
    reports: [
      {
        date: "10 Mei 2026",
        title: "Peresmian Saluran Air Bersih Desa Tanggung",
        description: "Alhamdulillah, instalasi pipa sepanjang 1.5 kilometer dari sumber mata air pegunungan ke pemukiman warga lereng bukit telah selesai dikerjakan. Air kini mengalir langsung ke bak penampungan masjid dan rumah warga.",
        stats: [
          { label: "Panjang Pipa", value: "1.5 KM" },
          { label: "Penerima Manfaat", value: "65 Kepala Keluarga" },
        ],
      },
    ],
  },
  {
    id: "kumplung-pahala",
    categoryId: "sosial",
    title: "Kumplung Pahala",
    subtitle: "Sedekah Mandiri",
    description: "Sedekah harian mandiri dari rumah menggunakan media 'kumplung' yang dikumpulkan setiap hari Minggu.",
    fullDescription: "Program Kumplung Pahala adalah inisiatif sedekah harian yang dirancang untuk memudahkan jamaah dalam beristiqomah menyisihkan sebagian hartanya tanpa harus setiap hari ke masjid. Jamaah akan diberikan sebuah 'kumplung' (kotak celengan) untuk diisi secara rutin di rumah. Setiap hari Minggu, jamaah dapat membawa kumplung tersebut ke titik pengumpulan untuk disetorkan dan ditukarkan dengan kotak yang baru (kosong). Dana yang terkumpul dikelola secara amanah untuk mendukung berbagai program dakwah dan sosial.",
    icon: "charity",
    reports: [
      {
        date: "Juni 2026",
        title: "Rekapitulasi Penyaluran Kumplung Pahala Periode Juni",
        description: "Laporan rekapitulasi pengumpulan sedekah harian jamaah yang disetorkan setiap pekan. Dana terkumpul langsung dialokasikan untuk operasional dakwah dan subsidi pangan santri.",
        stats: [
          { label: "Kumplung Terkumpul", value: "128 Kotak" },
          { label: "Alokasi Sosial", value: "100% Amanah" },
        ],
      },
    ],
  },
  {
    id: "donasi",
    categoryId: "sosial",
    title: "Donasi",
    subtitle: "Sedekah & Infaq",
    description: "Salurkan sedekah dan infaq terbaik Anda untuk mendukung keberlangsungan dakwah dan sosial.",
    fullDescription: "Program Donasi merupakan wadah bagi siapa saja yang ingin berpartisipasi dalam perjuangan dakwah. Setiap rupiah yang Anda titipkan akan dikelola secara amanah dan transparan untuk mendanai berbagai operasional dakwah, pembangunan fasilitas umat, serta bantuan kemanusiaan yang menjadi fokus Dakwah Tulungagung.",
    icon: "donate",
    reports: [
      {
        date: "Juli 2026",
        title: "Transparansi Dana Masuk Dakwah",
        description: "Laporan rutin penerimaan dan pengeluaran infaq pembangunan masjid serta kegiatan dakwah operasional asatidz.",
        stats: [
          { label: "Audit Internal", value: "Wajar Tanpa Pengecualian" },
          { label: "Update Laporan", value: "Setiap Bulan" },
        ],
      },
    ],
  },
  {
    id: "penyaluran-dana-riba",
    categoryId: "sosial",
    title: "Penyaluran Dana Riba",
    subtitle: "Pembersihan Harta",
    description: "Layanan penyaluran dana sisa riba untuk fasilitas umum sesuai tuntunan syariah.",
    fullDescription: "Bagi jamaah yang ingin membersihkan hartanya dari unsur riba yang tidak sengaja diperoleh, kami menyediakan layanan penyaluran dana riba. Sesuai fatwa para ulama, dana tersebut akan dialokasikan murni untuk kepentingan fasilitas umum non-konsumtif, seperti pembangunan jalan, jembatan, atau sarana kebersihan masyarakat.",
    icon: "purify",
    reports: [
      {
        date: "April 2026",
        title: "Pembangunan Sarana MCK Umum Bangoan",
        description: "Dana pembersihan harta riba dialokasikan untuk pembangunan toilet dan sarana wudhu umum warga yang tidak terikat ibadah shalat langsung (fasilitas non-masjid) guna kemaslahatan sanitasi bersama.",
        stats: [
          { label: "Fasilitas Dibangun", value: "2 Pintu MCK" },
          { label: "Lokasi", value: "Kec. Kedungwaru" },
        ],
      },
    ],
  },

  /* === Pendidikan === */
  {
    id: "tahsin-alquran",
    categoryId: "pendidikan",
    title: "Tahsin Al-Qur'an",
    subtitle: "Perbaikan Bacaan",
    description: "Kelas perbaikan bacaan Al-Qur'an agar sesuai dengan kaidah tajwid yang benar.",
    fullDescription: "Kelas Tahsin Al-Qur'an terbuka bagi jamaah yang ingin memperbaiki kualitas bacaan mereka. Dengan bimbingan ustadz yang mumpuni, peserta akan belajar mengenai makhorijul huruf, sifat-sifat huruf, serta hukum-hukum tajwid secara mendalam demi mencapai bacaan yang tartil dan sesuai sunnah.",
    icon: "quran",
    vendorProfile: {
      name: "Divisi Pendidikan Dakwah Tulungagung",
      description: "Pusat bimbingan literasi Al-Qur'an bersertifikat yang berkomitmen mengajarkan Al-Qur'an sesuai kaidah tajwid riwayat Hafs 'an 'Ashim.",
      contribution: "Menyediakan asatidz pengajar tahsin, modul pembelajaran berkala, dan evaluasi kenaikan tingkat tajwid gratis.",
      contactUrl: "https://wa.me/6285731110003?text=Bismillah%2C%20saya%20tertarik%20mengikuti%20kelas%20Tahsin",
      website: "https://dakwahtulungagung.com",
    },
  },
  {
    id: "bahasa-arab",
    categoryId: "pendidikan",
    title: "Bahasa Arab",
    subtitle: "Kelas Bahasa",
    description: "Pembelajaran bahasa Arab dasar sebagai kunci utama memahami Al-Qur'an dan Sunnah.",
    fullDescription: "Program Bahasa Arab hadir untuk memudahkan umat dalam menyelami makna Al-Qur'an dan kitab-kitab para ulama. Pembelajaran dirancang secara sistematis bagi pemula hingga tingkat lanjut, mencakup pemahaman nahwu, sharaf, dan percakapan harian untuk menumbuhkan kecintaan terhadap bahasa agama.",
    icon: "language",
    vendorProfile: {
      name: "Markaz Lughah Al-Arabiyah Tulungagung",
      description: "Lembaga pengajaran bahasa Arab komunikatif dan teoritis (kitab Durusul Lughah & Al-Muyassar).",
      contribution: "Mengisi kurikulum tata bahasa Arab intensif, menyediakan lembar kerja siswa, dan membimbing metode praktis cepat paham bahasa Arab.",
      contactUrl: "https://wa.me/6285731110003?text=Bismillah%2C%20saya%20tertarik%20mengikuti%20kelas%20Bahasa%20Arab",
      website: "https://dakwahtulungagung.com",
    },
  },
  {
    id: "pelatihan",
    categoryId: "pendidikan",
    title: "Pelatihan-Pelatihan",
    subtitle: "Panitia Qurban dll.",
    description: "Berbagai workshop keterampilan praktis untuk meningkatkan kapasitas dan kemandirian umat.",
    fullDescription: "Kami menyelenggarakan beragam pelatihan praktis yang bermanfaat bagi kehidupan bermasyarakat, mulai dari pelatihan manajemen masjid, tata cara pengurusan jenazah, hingga pelatihan penyembelihan hewan qurban sesuai syariat. Tujuannya adalah untuk melahirkan pribadi-pribadi yang terampil dan mandiri.",
    icon: "training",
    vendorProfile: {
      name: "Asosiasi Juru Sembelih Halal (JULEHA) DPD Tulungagung",
      description: "Lembaga sertifikasi dan edukasi tata cara penyembelihan hewan halal sesuai syariat Islam dan standar higienitas kesehatan.",
      contribution: "Menyediakan instruktur ahli bersertifikat untuk mengisi pelatihan berkala, demonstrasi teknik asah pisau setajam silet, dan tata cara handling hewan qurban.",
      contactUrl: "https://wa.me/6285731110003?text=Bismillah%2C%20saya%20ingin%20bertanya%20info%20Pelatihan",
      website: "https://dakwahtulungagung.com",
    },
  },

  /* === Mitra === */
  {
    id: "kita-peduli",
    categoryId: "mitra",
    title: "Kita Peduli",
    subtitle: "Mitra Sosial",
    description: "Lembaga mitra strategis yang bergerak dalam aksi kemanusiaan dan tanggap bencana.",
    fullDescription: "Kita Peduli adalah mitra strategis Dakwah Tulungagung dalam menyalurkan bantuan kemanusiaan secara cepat dan tepat sasaran. Fokus utama kemitraan ini mencakup bantuan bencana alam, santunan yatim piatu, serta pemberdayaan ekonomi umat melalui program-program yang berkelanjutan.",
    icon: "care",
    vendorProfile: {
      name: "Yayasan Kita Peduli Kemanusiaan",
      description: "Lembaga nirlaba tanggap darurat dan aksi sosial kemanusiaan yang berkedudukan di Jawa Timur.",
      contribution: "Bermitra dalam distribusi bantuan pangan, pakaian layak pakai, dan pembangunan hunian sementara untuk korban bencana.",
      contactUrl: "https://wa.me/6285731110003?text=Bismillah%2C%20saya%20ingin%20mengetahui%20lebih%20lanjut%20tentang%20Kita%20Peduli",
      website: "https://dakwahtulungagung.com",
    },
  },
  {
    id: "sekolah-islam",
    categoryId: "mitra",
    title: "Sekolah Islam",
    subtitle: "Mitra Pendidikan",
    description: "Kemitraan dengan lembaga pendidikan Islam terpadu untuk pembinaan generasi qurani.",
    fullDescription: "Dakwah Tulungagung menjalin kemitraan erat dengan sekolah-sekolah Islam terpadu di Tulungagung. Kerjasama ini mencakup penyediaan pemateri kajian keagamaan, pengembangan kurikulum agama, serta kegiatan ekstrakurikuler yang Islami.",
    icon: "school",
    vendorProfile: {
      name: "Jaringan Sekolah Islam Terpadu Tulungagung",
      description: "Konsorsium lembaga pendidikan Islam dari tingkat TK hingga SMA yang berkomitmen pada pendidikan berkarakter Islami.",
      contribution: "Menjadi mitra dalam program tahfidz, kajian keagamaan sekolah, dan mentoring karakter siswa.",
      contactUrl: "https://wa.me/6285731110003?text=Bismillah%2C%20saya%20ingin%20mengetahui%20lebih%20lanjut%20tentang%20Mitra%20Sekolah%20Islam",
      website: "https://dakwahtulungagung.com",
    },
  },
];