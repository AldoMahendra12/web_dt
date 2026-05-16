# Setup Directus CMS — Koleksi Artikel
# Dakwah Tulungagung

Panduan ini menjelaskan cara membuat koleksi **artikel** di Directus CMS
agar terkoneksi dengan halaman Artikel pada website Dakwah Tulungagung.

---

## 1. Buat File `.env.local`

Salin `.env.example` menjadi `.env.local`, lalu isi sesuai server Directus Anda:

```env
DIRECTUS_URL=http://localhost:8055
DIRECTUS_TOKEN=token_anda_di_sini
DIRECTUS_HOSTNAME=cms.dakwahtulungagung.or.id
```

---

## 2. Buat Koleksi `artikel` di Directus

Masuk ke Directus → **Settings → Data Model → Create Collection**
Nama koleksi: `artikel`

Tambahkan field-field berikut:

| Field            | Type                  | Keterangan                              |
|------------------|-----------------------|-----------------------------------------|
| `id`             | UUID                  | Primary key (dibuat otomatis)           |
| `status`         | Dropdown              | Opsi: `published`, `draft`, `archived` |
| `slug`           | String (Unique)       | URL-friendly, contoh: `judul-artikel`  |
| `judul`          | String                | Judul artikel                           |
| `ringkasan`      | Text                  | Ringkasan singkat (max ±250 karakter)  |
| `kategori`       | Dropdown              | Lihat opsi di bawah                    |
| `tanggal_publish`| DateTime              | Tanggal artikel ditayangkan             |
| `penulis`        | String                | Nama penulis                            |
| `gambar_utama`   | Image (M2O → Files)   | Gambar thumbnail artikel                |
| `is_featured`    | Boolean               | Centang jika artikel unggulan          |
| `konten`         | Rich Text (WYSIWYG)   | Isi artikel lengkap                    |

### Opsi Dropdown `kategori`

```
Berita
Opini
Kegiatan
Inspirasi
Fiqih
Sejarah
Tanya Jawab
```

---

## 3. Buat Koleksi `artikel_tanya_jawab`

Koleksi ini untuk menyimpan pasangan tanya-jawab pada artikel berkategori **Tanya Jawab**.

Masuk ke **Settings → Data Model → Create Collection**
Nama koleksi: `artikel_tanya_jawab`

| Field         | Type             | Keterangan                    |
|---------------|------------------|-------------------------------|
| `id`          | UUID             | Primary key                   |
| `artikel_id`  | M2O → `artikel`  | Referensi ke artikel induk    |
| `pertanyaan`  | String           | Teks pertanyaan               |
| `jawaban`     | Text             | Teks jawaban                  |
| `sort`        | Integer          | Urutan tampil (mulai dari 1)  |

### Hubungkan ke `artikel` (Relasi O2M)

1. Buka koleksi **`artikel`**
2. Klik **+ Add Field**
3. Pilih type: **One to Many (O2M)**
4. Nama field: `konten_tanya_jawab`
5. Related Collection: `artikel_tanya_jawab`
6. Foreign Key: `artikel_id`
7. Sort Field: `sort`
8. Simpan

---

## 4. Atur Permissions (Akses Publik)

Masuk ke **Settings → Roles → Public** (atau buat role `frontend-read-only`):

| Koleksi                 | Aksi  | Filter                    |
|-------------------------|-------|---------------------------|
| `artikel`               | Read  | `status = published`      |
| `artikel_tanya_jawab`   | Read  | (tanpa filter)            |
| `directus_files`        | Read  | (tanpa filter)            |

---

## 5. Buat API Token

1. Masuk ke **Settings → API Tokens**
2. Klik **Create Token**
3. Nama: `web-frontend-read-only`
4. Role: Public atau role yang sudah dibuat
5. **Copy token** → paste ke `.env.local` sebagai `DIRECTUS_TOKEN`

---

## 6. Verifikasi Koneksi

Buka URL ini di browser (sesuaikan port jika berbeda):

```
http://localhost:8055/items/artikel?filter[status][_eq]=published&limit=3
```

Jika muncul response JSON berisi data artikel → koneksi berhasil ✅

---

## 7. Menambah Artikel Baru di Directus

1. Masuk ke Directus → pilih koleksi **artikel**
2. Klik **+ Create Item**
3. Isi semua field (judul, slug, ringkasan, kategori, dll.)
4. Jika kategori = **Tanya Jawab**, scroll ke bawah dan tambahkan item di relasi `konten_tanya_jawab`
5. Set `status` → **published**
6. Klik **Save**

Artikel akan otomatis muncul di website dalam ≤60 detik (ISR revalidation).

---

## Catatan

- **Tanpa Directus berjalan**, halaman artikel tetap render dan hanya menampilkan
  state kosong ("Tidak ada artikel ditemukan") — tidak akan crash.
- Gambar artikel di-serve langsung dari Directus via URL `/assets/{file-uuid}`.
- Pastikan `DIRECTUS_URL` dan `DIRECTUS_HOSTNAME` di `.env.local` sudah benar
  sebelum deploy ke production.
