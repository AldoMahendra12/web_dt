/* =========================================
   TypeScript Interfaces — Dakwah Tulungagung
   ========================================= */

/** Navigation link item */
export interface NavItem {
  label: string;
  href: string;
}

/** Feature card in the "Inspirasi, Informasi & Solusi" section */
export interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

/** Activity card for the horizontal slider */
export interface ActivityItem {
  image: string;
  alt: string;
  label: string;
  title: string;
  description: string;
}

/** Footer link column */
export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

/** Social media link */
export interface SocialLink {
  platform: string;
  href: string;
  icon?: React.ReactNode;
}

/** Hadith content for the hadith section */
export interface HadithContent {
  header: string;
  arabic: string;
  translation: string;
  source: string;
}

/** Achievement/impact data */
export interface AchievementData {
  topText: string;
  number: number;
  bottomText: string;
  ctaLabel: string;
  ctaHref: string;
  floatingImages: { src: string; alt: string }[];
}

/** Video embed data */
export interface VideoData {
  description: string;
  youtubeId: string;
  title: string;
}

/** Program category (Dakwah, Sosial, Pendidikan, Mitra) */
export interface ProgramCategory {
  id: string;
  label: string;
  description: string;
  icon: string;
}

/** Individual program item within a category */
export interface ProgramItem {
  id: string;
  categoryId: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription?: string;
  icon: string;
}

/** Laporan (Report) item */
export interface LaporanItem {
  id: string;
  year: number;
  type: 'keuangan' | 'kegiatan';
  title: string;
  description: string;
  fileUrl: string;
}

/** Jadwal Kajian types */
export interface Schedule {
  day: string;
  time: string;
  kitab: string;
  ustadz: string;
}

export interface Mosque {
  id: string;
  name: string;
  image: string;
  address: string;
  contact: string;
  schedules: Schedule[];
  khutbah?: {
    ustadz: string;
    date: string;
    title: string;
  }[];
}
