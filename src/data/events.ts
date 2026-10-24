/* ===================================================================
   EVENTS DATA — Dakwah Tulungagung
   
   PANDUAN KONTEN EVENT:
   Desain tampilan (popup, card, navbar) sudah DIKUNCI / LOCKED
   sesuai standar resmi. Untuk event mendatang berikutnya, Anda
   CUKUP mengubah / menambah data di file ini saja tanpa perlu
   mengubah kode styling / layout komponen.

   CARA MENGELOLA EVENT:
   1. Event Baru / Mendatang (Upcoming):
      - Simpan poster di: /public/assets/events/nama_poster.webp
      - Tambahkan objek baru di array EVENTS_DATA paling atas
      - Set `isUpcoming: true`
      - Otomatis:
        a. Popup modal di web langsung menampilkan poster & info ini
        b. Tombol "Events" di navbar menyalakan animasi radar & badge "New"
        c. Muncul di section "Event Mendatang" di halaman /events

   2. Ketika Event Sudah Selesai (Past Event):
      - Ubah `isUpcoming: false`
      - Jika ada video/foto dokumentasi, isi `documentationUrl`
        (misal: "/assets/events/ustadzah_yasaroh.mp4")
      - Isi `description` dengan laporan/testimoni kegiatan
      - Otomatis:
        a. Popup modal tidak akan muncul (jika tidak ada event upcoming lain)
        b. Tombol di navbar kembali normal tanpa animasi
        c. Event pindah ke "Event Sebelumnya" dan tombolnya otomatis
           berubah menjadi "Dokumentasi" (bisa putar video)
   =================================================================== */

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
    id: "kajian-anak-011126",
    title: '✨ Kajian Anak: "Asyiknya Bermain Bersama" & Bedah Buku',
    category: "Kajian Anak",
    date: "Ahad, 1 November 2026",
    time: "07.30 – 10.00 WIB",
    location: "The Nice Playland Tulungagung",
    locationDetail: "Ds. Ngujang, Kec. Kedungwaru, Tulungagung",
    poster: "/assets/events/KA_kak_erlan.webp",
    registrationLink: "https://wa.me/6285731110003",
    isFree: false,
    isUpcoming: true,
    description: `Ayah dan Bunda, bingung mau ajak si kecil ke mana di akhir pekan? Yuk, ajak Ananda ikutan serunya bermain sambil belajar adab dan ilmu agama di event kajian Anak!

InsyaAllah bersama:
🎙️ Kak Erlan Iskandar, S.T., M.Psi

📅 Ahad, 1 November 2026
⏰ Pukul 07.30 – 10.00 WIB
🏰 The Nice Playland Tulungagung

Untuk anak usia 4–12 tahun
🎟️ HTM: Rp 35.000/orang* (*Gratis untuk anak dengan tinggi <80 cm)

📚 OPEN ORDER BUNDLING BUKU
Siapkan bacaan bermanfaat untuk buah hati dengan bundling dua buku karya Kak Erlan. Harga spesial bundling: Rp 100.000,-

Yuk, siapkan bukunya sebelum kajian agar bisa mengikuti sesi bedah buku dengan lebih maksimal!

📲 Pendaftaran & info: wa.me/6285731110003 (Admin Dakwah Tulungagung)

Baarakallahu fiikum 🌷`,
  },
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
