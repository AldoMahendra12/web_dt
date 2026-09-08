/* =========================================
   Jadwal Kajian Types — Dakwah Tulungagung
   ========================================= */

export type HariKajian =
  | "Senin"
  | "Selasa"
  | "Rabu"
  | "Kamis"
  | "Jumat"
  | "Sabtu"
  | "Ahad";

export type PekanKajian = 1 | 2 | 3 | 4 | 5 | "Rutin";

export interface JadwalKajianItem {
  id: string;
  hari: HariKajian;
  pekan: PekanKajian[]; // e.g. [1] or [1, 3, 5] or ["Rutin"]
  waktu: string;        // e.g. "Ba'da Maghrib – selesai"
  masjid: string;       // e.g. "Masjid Al-Hidayah"
  alamat: string;       // e.g. "Bangoan, Kedungwaru"
  mapsUrl?: string;     // e.g. Google Maps link
  ustadz: string;       // e.g. "Ustadz Muhammad Hadi"
  kitab: string;        // e.g. "Kitab Shahih Bukhari"
  jenis: "Rutin" | "Tematik";
  posterUrl: string;    // e.g. "/assets/jadwal/senin-alikhlas-pekan1.jpeg"
}
