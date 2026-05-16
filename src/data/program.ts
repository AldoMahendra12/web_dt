import type { ProgramCategory, ProgramItem } from "@/types";

/* =========================================
   Program Data — Dakwah Tulungagung
   All program categories and items.
   ========================================= */

export const programCategories: ProgramCategory[] = [
  {
    id: "dakwah",
    label: "Dakwah",
    description:
      "Program dakwah untuk menyebarkan ilmu agama Islam yang shahih dan bermanfaat bagi umat.",
    icon: "🕌",
  },
  {
    id: "sosial",
    label: "Sosial",
    description:
      "Program sosial untuk membantu sesama dan meringankan beban masyarakat yang membutuhkan.",
    icon: "🤝",
  },
  {
    id: "pendidikan",
    label: "Pendidikan",
    description:
      "Program pendidikan untuk meningkatkan kualitas ilmu dan keterampilan umat Islam.",
    icon: "📖",
  },
  {
    id: "mitra",
    label: "Mitra",
    description:
      "Jaringan mitra dan lembaga yang berkolaborasi dalam kebaikan bersama Dakwah Tulungagung.",
    icon: "🔗",
  },
];

export const programItems: ProgramItem[] = [
  /* ── Dakwah ── */
  {
    id: "live-kajian",
    categoryId: "dakwah",
    title: "Live Kajian",
    subtitle: "Kajian Online",
    description: "Siaran langsung kajian ilmu agama melalui platform digital yang dapat diakses di mana saja.",
    fullDescription: "Program Live Kajian menghadirkan kemudahan bagi jamaah untuk tetap menimba ilmu meskipun terhalang jarak dan waktu. Melalui siaran langsung di berbagai platform media sosial Dakwah Tulungagung, jamaah dapat menyimak pembahasan kitab dan tanya jawab agama secara interaktif dari mana pun mereka berada.",
    icon: "📡",
  },
  {
    id: "tabligh-akbar",
    categoryId: "dakwah",
    title: "Tabligh Akbar",
    subtitle: "Kajian Umum Besar",
    description: "Kajian akbar yang menghadirkan tokoh nasional untuk mempererat ukhuwah dan syiar Islam.",
    fullDescription: "Tabligh Akbar adalah perhelatan kajian besar yang menjadi momentum berkumpulnya ribuan jamaah untuk mempererat tali ukhuwah islamiyah. Menghadirkan pemateri terkemuka tingkat nasional, acara ini bertujuan untuk memberikan pencerahan sekaligus memperkuat syiar dakwah sunnah di tengah masyarakat Tulungagung.",
    icon: "🎤",
  },
  {
    id: "kajian-muslimah",
    categoryId: "dakwah",
    title: "Kajian Muslimah",
    subtitle: "Kajian Khusus Akhwat",
    description: "Wadah belajar khusus muslimah untuk memperdalam fiqih wanita dan peran keluarga.",
    fullDescription: "Kajian Muslimah dirancang khusus untuk memenuhi kebutuhan ilmu para akhwat dalam menjalankan peran sebagai ibu, istri, dan hamba Allah. Pembahasan difokuskan pada fiqih wanita, tarbiyatul aulad (pendidikan anak), serta manajemen rumah tangga yang sesuai dengan tuntunan Al-Qur'an dan As-Sunnah.",
    icon: "👩",
  },
  {
    id: "safari-dakwah",
    categoryId: "dakwah",
    title: "Safari Dakwah",
    subtitle: "Kajian Intensif",
    description: "Rangkaian kajian yang menghadirkan asatidzah dari luar daerah untuk menyapa jamaah di Tulungagung.",
    fullDescription: "Safari Dakwah adalah program khusus Dakwah Tulungagung yang mengundang para ustadz dan asatidzah berkompeten dari luar daerah untuk mengisi serangkaian kajian di Tulungagung. Meskipun serupa dengan Tabligh Akbar, Safari Dakwah memiliki rangkaian acara yang lebih banyak dan terjadwal secara intensif di berbagai lokasi, memungkinkan interaksi ilmu yang lebih mendalam bagi seluruh lapisan masyarakat.",
    icon: "🚐",
  },
  {
    id: "kajian-rutin",
    categoryId: "dakwah",
    title: "Kajian Rutin",
    subtitle: "Kajian Berkala",
    description: "Pembahasan kitab secara sistematis dan berkesinambungan untuk pemahaman ilmu yang kokoh.",
    fullDescription: "Kajian Rutin adalah sarana thalabul ilmi yang bersifat berkelanjutan. Dalam kajian ini, jamaah diajak untuk membedah kitab-kitab para ulama secara bab demi bab, mulai dari tauhid, ibadah, hingga akhlak, demi membangun pondasi pemahaman agama yang mendalam dan terstruktur.",
    icon: "📅",
  },

  /* ── Sosial ── */
  {
    id: "jumat-berkah",
    categoryId: "sosial",
    title: "Jumat Berkah",
    subtitle: "Nasi Gratis",
    description: "Inisiatif berbagi makanan gratis setiap hari Jumat sebagai wujud kepedulian sosial.",
    fullDescription: "Melalui program Jumat Berkah, Dakwah Tulungagung berupaya menyebarkan kebahagiaan dengan membagikan paket makanan gratis kepada jamaah shalat Jumat, musafir, dan masyarakat yang membutuhkan. Kegiatan ini bukan sekadar berbagi makanan, tetapi juga sarana mempererat silaturahmi dan memupuk kepedulian antar sesama.",
    icon: "🍚",
  },
  {
    id: "pemeriksaan-gratis",
    categoryId: "sosial",
    title: "Pemeriksaan Gratis",
    subtitle: "Cek Kesehatan",
    description: "Layanan cek kesehatan dasar tanpa biaya untuk membantu masyarakat menjaga kesehatan.",
    fullDescription: "Program Pemeriksaan Gratis hadir sebagai bentuk nyata kepedulian Dakwah Tulungagung terhadap kesehatan umat. Bekerja sama dengan tenaga medis profesional, kami menyediakan layanan pengecekan kesehatan rutin seperti tekanan darah, gula darah, dan konsultasi kesehatan umum bagi masyarakat luas tanpa dipungut biaya.",
    icon: "🏥",
  },
  {
    id: "pipanisasi",
    categoryId: "sosial",
    title: "Pipanisasi",
    subtitle: "Akses Air Bersih",
    description: "Pembangunan sarana air bersih untuk wilayah yang kesulitan akses air layak konsumsi.",
    fullDescription: "Program Pipanisasi berfokus pada penyediaan infrastruktur air bersih bagi pemukiman atau fasilitas umum yang selama ini kesulitan mendapatkan akses air layak. Dengan membangun jaringan pipa dan sumber air, kami berharap dapat membantu meningkatkan kualitas sanitasi dan kesehatan masyarakat di daerah-daerah terpencil.",
    icon: "💧",
  },
  {
    id: "kumplung-pahala",
    categoryId: "sosial",
    title: "Kumplung Pahala",
    subtitle: "Sedekah Mandiri",
    description: "Sedekah harian mandiri dari rumah menggunakan media 'kumplung' yang dikumpulkan setiap hari Minggu.",
    fullDescription: "Program Kumplung Pahala adalah inisiatif sedekah harian yang dirancang untuk memudahkan jamaah dalam beristiqomah menyisihkan sebagian hartanya tanpa harus setiap hari ke masjid. Jamaah akan diberikan sebuah 'kumplung' (kotak celengan) untuk diisi secara rutin di rumah. Setiap hari Minggu, jamaah dapat membawa kumplung tersebut ke titik pengumpulan untuk disetorkan dan ditukarkan dengan kotak yang baru (kosong). Dana yang terkumpul dikelola secara amanah untuk mendukung berbagai program dakwah dan sosial.",
    icon: "🕋",
  },
  {
    id: "donasi",
    categoryId: "sosial",
    title: "Donasi",
    subtitle: "Sedekah & Infaq",
    description: "Salurkan sedekah dan infaq terbaik Anda untuk mendukung keberlangsungan dakwah dan sosial.",
    fullDescription: "Program Donasi merupakan wadah bagi siapa saja yang ingin berpartisipasi dalam perjuangan dakwah. Setiap rupiah yang Anda titipkan akan dikelola secara amanah dan transparan untuk mendanai berbagai operasional dakwah, pembangunan fasilitas umat, serta bantuan kemanusiaan yang menjadi fokus Dakwah Tulungagung.",
    icon: "💰",
  },
  {
    id: "penyaluran-dana-riba",
    categoryId: "sosial",
    title: "Penyaluran Dana Riba",
    subtitle: "Pembersihan Harta",
    description: "Layanan penyaluran dana sisa riba untuk fasilitas umum sesuai tuntunan syariah.",
    fullDescription: "Bagi jamaah yang ingin membersihkan hartanya dari unsur riba yang tidak sengaja diperoleh, kami menyediakan layanan penyaluran dana riba. Sesuai fatwa para ulama, dana tersebut akan dialokasikan murni untuk kepentingan fasilitas umum non-konsumtif, seperti pembangunan jalan, jembatan, atau sarana kebersihan masyarakat.",
    icon: "🔄",
  },

  /* ── Pendidikan ── */
  {
    id: "tahsin-alquran",
    categoryId: "pendidikan",
    title: "Tahsin Al-Qur'an",
    subtitle: "Perbaikan Bacaan",
    description: "Kelas perbaikan bacaan Al-Qur'an agar sesuai dengan kaidah tajwid yang benar.",
    fullDescription: "Kelas Tahsin Al-Qur'an terbuka bagi jamaah yang ingin memperbaiki kualitas bacaan mereka. Dengan bimbingan ustadz yang mumpuni, peserta akan belajar mengenai makhorijul huruf, sifat-sifat huruf, serta hukum-hukum tajwid secara mendalam demi mencapai bacaan yang tartil dan sesuai sunnah.",
    icon: "📖",
  },
  {
    id: "bahasa-arab",
    categoryId: "pendidikan",
    title: "Bahasa Arab",
    subtitle: "Kelas Bahasa",
    description: "Pembelajaran bahasa Arab dasar sebagai kunci utama memahami Al-Qur'an dan Sunnah.",
    fullDescription: "Program Bahasa Arab hadir untuk memudahkan umat dalam menyelami makna Al-Qur'an dan kitab-kitab para ulama. Pembelajaran dirancang secara sistematis bagi pemula hingga tingkat lanjut, mencakup pemahaman nahwu, sharaf, dan percakapan harian untuk menumbuhkan kecintaan terhadap bahasa agama.",
    icon: "🔤",
  },
  {
    id: "pelatihan",
    categoryId: "pendidikan",
    title: "Pelatihan-Pelatihan",
    subtitle: "Panitia Qurban dll.",
    description: "Berbagai workshop keterampilan praktis untuk meningkatkan kapasitas dan kemandirian umat.",
    fullDescription: "Kami menyelenggarakan beragam pelatihan praktis yang bermanfaat bagi kehidupan bermasyarakat, mulai dari pelatihan manajemen masjid, tata cara pengurusan jenazah, hingga pelatihan penyembelihan hewan qurban sesuai syariat. Tujuannya adalah untuk melahirkan pribadi-pribadi yang terampil dan mandiri.",
    icon: "🎓",
  },

  /* ── Mitra ── */
  {
    id: "kita-peduli",
    categoryId: "mitra",
    title: "Kita Peduli",
    subtitle: "Mitra Sosial",
    description: "Lembaga mitra strategis yang bergerak dalam aksi kemanusiaan dan tanggap bencana.",
    fullDescription: "Kita Peduli adalah mitra strategis Dakwah Tulungagung dalam menyalurkan bantuan kemanusiaan secara cepat dan tepat sasaran. Fokus utama kemitraan ini mencakup bantuan bencana alam, santunan yatim piatu, serta pemberdayaan ekonomi umat melalui program-program yang berkelanjutan.",
    icon: "❤️",
  },
  {
    id: "ksmi",
    categoryId: "mitra",
    title: "KSMI",
    subtitle: "Koperasi Syariah",
    description: "Koperasi Syariah penyedia solusi ekonomi tanpa riba, denda, dan sita dengan prinsip gotong royong.",
    fullDescription: "Koperasi Syirkah Muslim Indonesia (KSMI) hadir sebagai solusi nyata bagi umat untuk berlepas diri dari jeratan riba. Berlandaskan semangat gotong royong, KSMI menyediakan berbagai layanan keuangan berbasis syariah murni, termasuk investasi proyek produktif, pembiayaan (kredit) barang tanpa denda dan sita, serta layanan tabungan dengan akad qard. Seluruh transaksi di KSMI diawasi untuk memastikan kesesuaian dengan hukum syar’i, memberikan ketenangan dan keberkahan bagi para anggotanya.",
    icon: "🏛️",
  },
  {
    id: "ponpes-imam-syafii",
    categoryId: "mitra",
    title: "Ponpes Imam Syafi'i",
    subtitle: "Pondok Pesantren",
    description: "Lembaga pendidikan pesantren mitra dalam mencetak generasi thalabul ilmi yang bermanhaj salaf.",
    fullDescription: "Pondok Pesantren Imam Syafi'i Tulungagung adalah mitra utama kami dalam sektor pendidikan formal and non-formal. Dengan kurikulum yang berfokus pada hifdzul Qur'an dan pemahaman kitab-kitab salaf, pesantren ini berkomitmen mencetak generasi muslim yang berilmu amaliyah dan beramal ilmiyah.",
    icon: "🕌",
  },
  {
    id: "sekolah-sunnah",
    categoryId: "mitra",
    title: "Sekolah di Tulungagung",
    subtitle: "Sekolah Sunnah",
    description: "Jaringan sekolah berbasis sunnah yang berkolaborasi dalam mendidik generasi Rabbani.",
    fullDescription: "Dakwah Tulungagung menjalin kerja sama dengan berbagai sekolah Islam di wilayah Tulungagung yang memiliki visi serupa dalam menanamkan nilai-nilai tauhid dan sunnah sejak dini. Kolaborasi ini mencakup pembinaan asatidzah, pengembangan kurikulum agama, serta kegiatan ekstrakurikuler yang Islami.",
    icon: "🏫",
  },
];
