import { NextRequest, NextResponse } from "next/server";
import { fetchArtikel, type ArtikelKategori } from "@/lib/directus";

/* =========================================
   GET /api/artikel
   Query params:
     - kategori : filter kategori (opsional)
     - search   : pencarian teks (opsional)
     - page     : halaman (default: 1)
     - limit    : jumlah item (default: 12)
   ========================================= */

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const kategori = searchParams.get("kategori") as ArtikelKategori | null;
    const search = searchParams.get("search") ?? undefined;
    const page = Number(searchParams.get("page") ?? "1");
    const limit = Number(searchParams.get("limit") ?? "12");

    const articles = await fetchArtikel({
      kategori: kategori ?? undefined,
      search,
      page,
      limit,
    });

    return NextResponse.json({ data: articles });
  } catch (err) {
    // Directus mungkin belum online (localhost / production belum dikonfigurasi)
    console.error("[API/artikel] Unhandled error:", err);
    return NextResponse.json({ data: [] }, { status: 200 });
  }
}
