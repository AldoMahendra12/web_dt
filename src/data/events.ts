/* =========================================
   EVENTS DATA — Dakwah Tulungagung
   
   Untuk menambah event baru:
   1. Tambahkan objek baru ke array EVENTS_DATA
   2. Set `isUpcoming: true` jika event belum berlangsung
      (akan otomatis memicu animasi radar & badge "New" di navbar)
   3. Jika event sudah selesai:
      - Set `isUpcoming: false`
      - Masukkan path video/foto ke `documentationUrl`
        (misal: "/assets/events/ustadzah_yasaroh.mp4")
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
  documentationUrl?: string;
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
    isUpcoming: false,
    description: `Alhamdulillah atas pertolongan Allah Ta'ala, Kajian Muslimah bersama Ustadzah Yasaroh Ummu Unaisah حفظها الله تعالى dengan tema “Pola Asuh Anak Tangguh di Akhir Zaman” telah terlaksana pada Ahad, 9 Agustus 2026 di Masjid Al Hidayah, Bangoan.

"Kajian di masjid, dengan lokasi yang nyaman, tenang, anak-anak juga ada lokasi khusus dan ada fasilitas yang edukatif, kemudian materi yang disampaikan ustadzah juga mudah diserap, harapannya semoga kajian muslimah ini bisa rutin dilaksanakan" testimoni yang diberikan oleh salah satu peserta kajian muslimah.

Kajian muslimah diadakan untuk mempererat tali silaturahmi antar keluarga muslim khususnya para ummahat di Tulungagung melalui kegiatan yang bermanfaat, menyenangkan dan tentunya edukatif.

Jazakumullahu khairan kepada seluruh peserta, donatur, muhsinin, dan panitia atas doa, dukungan, waktu, tenaga, dan kontribusinya sehingga kegiatan ini dapat terlaksana dengan baik.

Semoga Allah Ta'ala membalas segala kebaikan dan menjadikannya sebagai amal jariyah.

Baarakallahu fiikum🌷`,
    documentationUrl: "/assets/events/ustadzah_yasaroh.mp4",
  },
];

/** Mengecek apakah terdapat event yang berstatus upcoming */
export function hasUpcomingEvents(): boolean {
  return EVENTS_DATA.some((e) => e.isUpcoming);
}
