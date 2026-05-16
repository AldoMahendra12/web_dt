/* =========================================
   Directus API Client — Dakwah Tulungagung
   Semua request ke Directus CMS melalui
   file ini agar mudah diganti/dikonfigurasi.
   ========================================= */

const DIRECTUS_URL = process.env.DIRECTUS_URL ?? "http://localhost:8055";
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN ?? "";

/** Header default untuk request ke Directus */
function getHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (DIRECTUS_TOKEN) {
    headers["Authorization"] = `Bearer ${DIRECTUS_TOKEN}`;
  }
  return headers;
}

/** URL asset Directus (gambar, file) */
export function getDirectusAssetUrl(fileId: string | null | undefined): string {
  if (!fileId) return "/articles/featured.png";
  return `${DIRECTUS_URL}/assets/${fileId}`;
}

/** Fetch artikel dari Directus dengan opsional filter kategori */
export async function fetchArtikel(params?: {
  kategori?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<DirectusArtikelItem[]> {
  const { kategori, search, page = 1, limit = 12 } = params ?? {};

  const filters: string[] = ["filter[status][_eq]=published"];

  if (kategori && kategori !== "Semua") {
    filters.push(`filter[kategori][_eq]=${encodeURIComponent(kategori)}`);
  }
  if (search) {
    filters.push(`search=${encodeURIComponent(search)}`);
  }

  const offset = (page - 1) * limit;
  const query = [
    ...filters,
    `limit=${limit}`,
    `offset=${offset}`,
    "sort[]=-date_created",
    "fields[]=id",
    "fields[]=slug",
    "fields[]=judul",
    "fields[]=ringkasan",
    "fields[]=kategori",
    "fields[]=tanggal_publish",
    "fields[]=penulis",
    "fields[]=gambar_utama",
    "fields[]=is_featured",
    "fields[]=konten_tanya_jawab.*",
  ].join("&");

  const res = await fetch(`${DIRECTUS_URL}/items/artikel?${query}`, {
    headers: getHeaders(),
    next: { revalidate: 60 }, // ISR: revalidate tiap 60 detik
  });

  if (!res.ok) {
    console.error(
      `[Directus] fetchArtikel gagal: ${res.status} ${res.statusText}`
    );
    return [];
  }

  const json = await res.json();
  return json.data ?? [];
}

/** Fetch satu artikel berdasarkan slug */
export async function fetchArtikelBySlug(
  slug: string
): Promise<DirectusArtikelItem | null> {
  const query = [
    `filter[slug][_eq]=${encodeURIComponent(slug)}`,
    "filter[status][_eq]=published",
    "limit=1",
    "fields[]=*",
    "fields[]=konten_tanya_jawab.*",
  ].join("&");

  const res = await fetch(`${DIRECTUS_URL}/items/artikel?${query}`, {
    headers: getHeaders(),
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;

  const json = await res.json();
  return json.data?.[0] ?? null;
}

/** Tipe data artikel dari Directus */
export interface DirectusArtikelItem {
  id: string;
  slug: string;
  judul: string;
  ringkasan: string;
  kategori: ArtikelKategori;
  tanggal_publish: string | null;
  penulis: string;
  gambar_utama: string | null; // file UUID
  is_featured: boolean;
  status: "published" | "draft" | "archived";
  konten_tanya_jawab?: TanyaJawabItem[];
}

/** Tipe item Tanya Jawab (nested dalam artikel) */
export interface TanyaJawabItem {
  id: string;
  pertanyaan: string;
  jawaban: string;
  sort: number;
}

/** Kategori valid untuk artikel */
export type ArtikelKategori =
  | "Berita"
  | "Opini"
  | "Kegiatan"
  | "Inspirasi"
  | "Fiqih"
  | "Sejarah"
  | "Tanya Jawab";
