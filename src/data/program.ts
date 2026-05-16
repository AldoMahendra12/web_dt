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
    description:
      "Kajian ilmu agama yang disiarkan secara langsung melalui platform digital agar dapat diakses oleh siapa saja, di mana saja.",
    icon: "📡",
  },
  {
    id: "tabligh-akbar",
    categoryId: "dakwah",
    title: "Tabligh Akbar",
    subtitle: "Kajian Umum Besar",
    description:
      "Acara kajian besar yang menghadirkan pemateri terkemuka dan diikuti oleh masyarakat umum dalam jumlah besar.",
    icon: "🎤",
  },
  {
    id: "kajian-muslimah",
    categoryId: "dakwah",
    title: "Kajian Muslimah",
    subtitle: "Kajian Khusus Akhwat",
    description:
      "Kajian khusus untuk para muslimah dengan pembahasan seputar fiqih wanita, keluarga, dan pendidikan anak.",
    icon: "👩",
  },
  {
    id: "safari-dakwah",
    categoryId: "dakwah",
    title: "Safari Dakwah",
    subtitle: "Dakwah Keliling",
    description:
      "Program dakwah yang menjangkau berbagai daerah dan komunitas untuk menyebarkan ilmu kebaikan.",
    icon: "🚐",
  },
  {
    id: "kajian-rutin",
    categoryId: "dakwah",
    title: "Kajian Rutin",
    subtitle: "Kajian Berkala",
    description:
      "Kajian terjadwal secara rutin yang membahas kitab-kitab dan ilmu agama secara sistematis dan berkesinambungan.",
    icon: "📅",
  },

  /* ── Sosial ── */
  {
    id: "jumat-berkah",
    categoryId: "sosial",
    title: "Jumat Berkah",
    subtitle: "Nasi Gratis",
    description:
      "Pembagian nasi gratis setiap hari Jumat untuk masyarakat yang membutuhkan sebagai bentuk kepedulian sosial.",
    icon: "🍚",
  },
  {
    id: "pemeriksaan-gratis",
    categoryId: "sosial",
    title: "Pemeriksaan Gratis",
    subtitle: "Cek Kesehatan",
    description:
      "Layanan pemeriksaan kesehatan gratis bagi masyarakat yang kurang mampu bekerja sama dengan tenaga medis.",
    icon: "🏥",
  },
  {
    id: "pipanisasi",
    categoryId: "sosial",
    title: "Pipanisasi",
    subtitle: "Akses Air Bersih",
    description:
      "Program pemasangan pipa air bersih untuk daerah-daerah yang kesulitan mendapatkan akses air layak konsumsi.",
    icon: "💧",
  },
  {
    id: "kumplung-pahala",
    categoryId: "sosial",
    title: "Kumplung Pahala",
    subtitle: "Singkatan Tanya Aji",
    description:
      "Program konsultasi dan edukasi tentang ibadah haji serta pengumpulan pahala melalui kegiatan kebaikan bersama.",
    icon: "🕋",
  },
  {
    id: "donasi",
    categoryId: "sosial",
    title: "Donasi",
    subtitle: "Sedekah & Infaq",
    description:
      "Wadah untuk menyalurkan donasi, sedekah, dan infaq yang akan dikelola secara amanah dan transparan.",
    icon: "💰",
  },
  {
    id: "penyaluran-dana-riba",
    categoryId: "sosial",
    title: "Penyaluran Dana Riba",
    subtitle: "Pembersihan Harta",
    description:
      "Program penyaluran dana yang berasal dari riba untuk disalurkan ke kegiatan sosial yang bermanfaat bagi umat.",
    icon: "🔄",
  },

  /* ── Pendidikan ── */
  {
    id: "tahsin-alquran",
    categoryId: "pendidikan",
    title: "Tahsin Al-Qur'an",
    subtitle: "Perbaikan Bacaan",
    description:
      "Kelas perbaikan bacaan Al-Qur'an agar sesuai dengan kaidah tajwid yang benar dan makhorijul huruf yang tepat.",
    icon: "📖",
  },
  {
    id: "bahasa-arab",
    categoryId: "pendidikan",
    title: "Bahasa Arab",
    subtitle: "Kelas Bahasa",
    description:
      "Pembelajaran bahasa Arab dasar hingga lanjutan untuk memahami Al-Qur'an dan sumber-sumber ilmu agama.",
    icon: "🔤",
  },
  {
    id: "pelatihan",
    categoryId: "pendidikan",
    title: "Pelatihan-Pelatihan",
    subtitle: "Panitia Qurban dll.",
    description:
      "Berbagai pelatihan praktis termasuk pelatihan panitia qurban, manajemen masjid, dan keterampilan lainnya.",
    icon: "🎓",
  },

  /* ── Mitra ── */
  {
    id: "kita-peduli",
    categoryId: "mitra",
    title: "Kita Peduli",
    subtitle: "Mitra Sosial",
    description:
      "Lembaga mitra yang berfokus pada kegiatan kepedulian sosial dan pemberdayaan masyarakat.",
    icon: "❤️",
  },
  {
    id: "ksmi",
    categoryId: "mitra",
    title: "KSMI",
    subtitle: "Komunitas Studi",
    description:
      "Komunitas Studi Muslim Indonesia yang aktif dalam kegiatan dakwah dan pengembangan keilmuan.",
    icon: "🏛️",
  },
  {
    id: "ponpes-imam-syafii",
    categoryId: "mitra",
    title: "Ponpes Imam Syafi'i",
    subtitle: "Pondok Pesantren",
    description:
      "Pondok pesantren bermanhaj salaf yang menjadi mitra dalam pendidikan dan dakwah di Tulungagung.",
    icon: "🕌",
  },
  {
    id: "sekolah-sunnah",
    categoryId: "mitra",
    title: "Sekolah di Tulungagung",
    subtitle: "Sekolah Sunnah",
    description:
      "Sekolah-sekolah berbasis sunnah di Tulungagung yang berkolaborasi dalam pendidikan generasi Islami.",
    icon: "🏫",
  },
];
