# 🕌 Dakwah Tulungagung — Website Resmi

> **Inspirasi, Informasi & Solusi Islami** untuk masyarakat Tulungagung dan sekitarnya.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Directus](https://img.shields.io/badge/CMS-Directus-6644ff?logo=directus)](https://directus.io/)

---

## 📋 Tentang Project

Website resmi lembaga dakwah **Dakwah Tulungagung** — sebuah organisasi Islam yang aktif dalam bidang dakwah, sosial, dan pendidikan di wilayah Tulungagung, Jawa Timur.

Website ini dibangun dengan arsitektur modern untuk mendukung:
- 📰 **Manajemen Konten** artikel & tanya jawab via Directus CMS
- 📅 **Jadwal Kajian** dan khutbah Jumat masjid-masjid di Tulungagung
- 💰 **Laporan Keuangan & Kegiatan** yang transparan dan dapat diunduh
- 🏢 **Profil Organisasi** lengkap dengan struktur pengurus
- 🎯 **Program Dakwah** (dakwah, sosial, pendidikan, dan mitra)

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| **Frontend** | Next.js 14 (App Router) + React + TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Animasi** | Framer Motion + Lenis (smooth scroll) |
| **CMS** | Directus (self-hosted, open license) |
| **Database** | SQLite (dev) / PostgreSQL (production) |
| **Storage** | Cloudflare R2 |
| **Hosting** | Hostinger Node.js Web Apps |
| **Deploy** | GitHub (push to deploy) |

---

## 📁 Struktur Folder

```
src/
├── app/                    → Next.js App Router (pages)
│   ├── artikel/            → Halaman artikel & tanya jawab
│   ├── jadwal/             → Halaman jadwal kajian
│   ├── laporan/            → Halaman laporan keuangan & kegiatan
│   ├── program/            → Halaman program organisasi
│   ├── tentang/            → Halaman tentang kami
│   └── api/artikel/        → API route → Directus CMS
├── components/
│   ├── ui/                 → Base elements (Button, Card, Badge, dll.)
│   └── sections/           → Section per halaman
├── lib/
│   └── directus.ts         → Directus API client
├── types/                  → TypeScript interfaces
├── data/                   → Data statis (program, tentang, dll.)
└── hooks/                  → Custom React hooks

directus-cms/               → Directus CMS (self-hosted)
```

---

## 🚀 Cara Menjalankan (Development)

### 1. Clone & Install

```bash
git clone https://github.com/AldoMahendra12/web_dt.git
cd web_dt
npm install
```

### 2. Setup Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
DIRECTUS_URL=http://localhost:8055
DIRECTUS_TOKEN=token_directus_anda
```

### 3. Jalankan Dev Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

---

## 📡 Setup Directus CMS (Opsional)

Lihat panduan lengkap di [`DIRECTUS_SETUP.md`](./DIRECTUS_SETUP.md).

Tanpa Directus berjalan, halaman artikel tetap tampil dengan state kosong — tidak crash.

---

## 🗂️ Halaman yang Tersedia

| Halaman | URL | Keterangan |
|---|---|---|
| Beranda | `/` | Homepage dengan hero scrollytelling |
| Artikel | `/artikel` | Artikel & tanya jawab dari Directus |
| Jadwal | `/jadwal` | Jadwal kajian & khutbah masjid |
| Program | `/program` | Program dakwah, sosial, pendidikan |
| Tentang | `/tentang` | Profil & struktur organisasi |
| Laporan | `/laporan` | Laporan keuangan & kegiatan |

---

## 🏛️ Struktur Organisasi

**Pembina:** Ustadz Anwar Zen, Ustadz Imam Hambali, Bpk Abdul Qodir Hasan

**Pengawas:** Ustadz Muhammad Yusuf, Ustadz Firdaus, Ustadz Nasir fi Rahmatullah

**Pengurus:**
- Ketua: Moh Shohibul Umam
- Sekretaris: Aji Waskito Hidayatullah
- Bendahara: Muh Irsyadsyah

---

## 📄 Lisensi

Website ini dikembangkan khusus untuk **Lembaga Dakwah Tulungagung**.  
Hak cipta © 2026 Dakwah Tulungagung. All rights reserved.

---

<p align="center">
  Dibuat dengan ❤️ untuk kemajuan dakwah Islam di Tulungagung
</p>
