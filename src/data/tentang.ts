import { LatarBelakang, VisiMisi, Pengurus, Kantor, StrukturData } from "@/types/tentang";

export const latarBelakangData: LatarBelakang = {
  headline: "Menjadi Jembatan Kebaikan untuk Umat",
  body: [
    "Berawal dari sebuah kesadaran akan pentingnya dakwah yang menyentuh akar rumput, lembaga kami hadir di tengah masyarakat bukan sekadar sebagai wadah kajian, melainkan sebagai pusat solusi bagi problematika umat. Kami percaya bahwa Islam adalah agama yang memberikan jawaban atas seluruh dimensi kehidupan—baik spiritual, sosial, maupun ekonomi.",
    "Semboyan kami Inspirasi, Informasi, dan Solusi adalah ruh dari setiap langkah yang kami ambil. Kami bergerak dengan keyakinan bahwa dakwah yang kuat harus dibarengi with aksi nyata. Oleh karena itu, selain konsisten menghidupkan syiar melalui kajian rutin dan Tabligh Akbar, kami juga berkomitmen hadir dalam ruang-ruang kemanusiaan."
  ],
  image_url: "/activities/berbagi.jpg", // Using one of the existing public images
};

export const visiMisiData: VisiMisi = {
  visi: "Menjadi penggerak dakwah dan solusi sosial islami yang unggul, terpercaya, dan profesional.",
  misi: [
    { nomor: "01", teks: "Transformasi Dakwah yang Inspiratif dan Informatif: Menyelenggarakan kajian rutin dan tabligh akbar dengan materi yang sistematis serta memanfaatkan media digital untuk penyebaran syiar." },
    { nomor: "02", teks: "Standardisasi Manajemen Organisasi yang Profesional: Membangun tata kelola internal yang rapi berbasis SOP dan melakukan peningkatan kapasitas SDM secara berkala." },
    { nomor: "03", teks: "Penguatan Akuntabilitas dan Transparansi Publik: Menjamin pengelolaan dana amanah secara jujur dengan laporan periodik yang dapat diakses oleh donatur dan masyarakat." },
    { nomor: "04", teks: "Optimalisasi Solusi Sosial Melalui Program Strategis: Menjalankan aksi nyata yang berdampak pada kesejahteraan, seperti layanan kesehatan gratis, khitan massal, dan penyaluran bantuan sosial." },
    { nomor: "05", teks: "Edukasi dan Literasi Problematika Umat: Menyediakan ruang edukasi dan informasi mengenai pola asuh islami, keharmonisan keluarga, serta hukum-hukum harian (seperti waris)." }
  ]
};

export const strukturData: StrukturData = {
  pembina: [
    { nama: "Ustadz Anwar Zen", jabatan: "Pembina", foto: "/assets/avatar.png" },
    { nama: "Ustadz Imam Hambali", jabatan: "Pembina", foto: "/assets/avatar.png" },
    { nama: "Bpk Abdul Qodir Hasan", jabatan: "Pembina", foto: "/assets/avatar.png" },
  ],
  pengawas: [
    { nama: "Ustadz Muhammad Yusuf", jabatan: "Pengawas", foto: "/assets/avatar.png" },
    { nama: "Ustadz Firdaus", jabatan: "Pengawas", foto: "/assets/avatar.png" },
    { nama: "Ustadz Nasir fi Rahmatullah", jabatan: "Pengawas", foto: "/assets/avatar.png" },
  ],
  pengurus: [
    { nama: "Moh Shohibul Umam", jabatan: "Ketua", foto: "/assets/avatar.png" },
    { nama: "Aji Waskito Hidayatullah", jabatan: "Sekertaris", foto: "/assets/avatar.png" },
    { nama: "Muh Irsyadsyah", jabatan: "Bendahara", foto: "/assets/avatar.png" },
  ],
  anggota: [
    { nama: "Mochammad Arjun Naja", jabatan: "Anggota", foto: "/assets/avatar.png" },
    { nama: "Anang Dwi Prastia", jabatan: "Anggota", foto: "/assets/avatar.png" },
    { nama: "Moch Harris Ardianto", jabatan: "Anggota", foto: "/assets/avatar.png" },
    { nama: "Rizki Kurniansyah", jabatan: "Anggota", foto: "/assets/avatar.png" },
    { nama: "Aldo Mahendra Putra", jabatan: "Anggota", foto: "/assets/avatar.png" },
    { nama: "Akhmad Cahyo Prihandoko", jabatan: "Anggota", foto: "/assets/avatar.png" },
    { nama: "Ahmad Wadid Rifai'i", jabatan: "Anggota", foto: "/assets/avatar.png" },
    { nama: "Bayu Anugrah", jabatan: "Anggota", foto: "/assets/avatar.png" },
    { nama: "Bagus Nur Huda", jabatan: "Anggota", foto: "/assets/avatar.png" },
    { nama: "Aziz Nurkartikahadi", jabatan: "Anggota", foto: "/assets/avatar.png" },
    { nama: "Hermansah", jabatan: "Anggota", foto: "/assets/avatar.png" },
  ]
};

export const kantorData: Kantor = {
  alamat: "XW4R+54P, Jl. Gajah Mada, Bangoan, Kec. Kedungwaru, Kabupaten Tulungagung, Jawa Timur 66229",
  jam_operasional: "Senin - Jumat: 08.00 - 16.00 WIB",
  kontak: {
    telepon: "0355-123456",
    email: "info@dakwahtulungagung.or.id"
  },
  maps_embed_url: "https://maps.google.com/maps?q=XW4R%2B54P,+Jl.+Gajah+Mada,+Bangoan,+Kedungwaru,+Tulungagung&t=&z=16&ie=UTF8&iwloc=&output=embed",
  whatsapp_number: "6281234567890"
};
