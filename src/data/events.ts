/* =========================================
   EVENTS DATA — Dakwah Tulungagung
   
   Untuk menambah event baru:
   1. Tambahkan objek baru ke array EVENTS_DATA
   2. Set `isUpcoming: true` agar tombol di navbar
      otomatis menampilkan animasi event baru
   ========================================= */

export interface EventItem {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  locationDetail?: string;
  poster: string;
  registrationLink: string;
  isFree: boolean;
  isUpcoming: boolean;
  description?: string;
}

export const EVENTS_DATA: EventItem[] = [
  {
    id: "kajian-muslimah-090826",
    title: "Kajian Khusus Muslimah: Pola Asuh Anak Tangguh di Akhir Zaman",
    category: "Kajian Muslimah",
    date: "Ahad, 9 Agustus 2026",
    time: "08.00 – 11.30 WIB",
    location: "Masjid Al Hidayah",
    locationDetail: "Ds. Bangoan, Kec. Kedungwaru, Tulungagung",
    poster: "/assets/kajianmuslimah-dt.jpeg",
    registrationLink: "https://s.id/kajianmuslimah-dt",
    isFree: true,
    isUpcoming: true,
    description:
      "Bersama Ustadzah Yasaroh Ummu Unaisah. Gratis untuk 200 pendaftar pertama. Free seminar kit & snack.",
  },
];

/** Mengecek apakah terdapat event yang berstatus upcoming */
export function hasUpcomingEvents(): boolean {
  return EVENTS_DATA.some((e) => e.isUpcoming);
}
