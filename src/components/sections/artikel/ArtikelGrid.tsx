"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowUpRight, MessageCircleQuestion, ChevronDown, Loader2, BookOpen } from "lucide-react";
import Button from "@/components/ui/button";
import { getDirectusAssetUrl, type DirectusArtikelItem, type TanyaJawabItem } from "@/lib/directus";
import { TANYA_JAWAB_DATA, type TanyaJawabEntry } from "@/data/tanya-jawab";
import { MOCK_ARTIKEL } from "@/data/artikel";

/* =========================================
   ArtikelGrid — Client Component
   - Fetch dari /api/artikel (Directus)
   - Mendukung filter kategori & search
   - Menampilkan section Tanya Jawab jika ada
   ========================================= */

interface ArtikelGridProps {
  /** Kategori aktif dari ArtikelHero filter chips */
  selectedCategory: string;
  /** Query pencarian dari ArtikelHero search bar */
  searchQuery: string;
}

/** Format tanggal ISO ke format Indonesia */
function formatTanggal(iso: string | null): string {
  if (!iso) return "-";
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Shared helper to parse Q&A content with Arabic styling */
function renderQALines(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    const trimmed = line.trim();
    if (!trimmed) return <div key={i} className="h-3" />;

    const hasArabic = /[\u0600-\u06FF]/.test(trimmed);
    if (hasArabic) {
      return (
        <div 
          key={i} 
          dir="rtl" 
          className="font-arabic text-2xl text-text-heading leading-loose text-center my-4 font-normal"
        >
          {trimmed}
        </div>
      );
    }

    const isTranslation = trimmed.startsWith('"') || trimmed.startsWith('“') || trimmed.startsWith('(') || trimmed.startsWith('&quot;');
    if (isTranslation) {
      return (
        <p key={i} className="text-sm italic text-text-muted text-center max-w-[600px] mx-auto my-3 leading-relaxed">
          {trimmed}
        </p>
      );
    }

    if (/^(Yang (pertama|ke\s*\w+|ketiga|keempat)|\d+\.|•)/.test(trimmed)) {
      return <p key={i} className="font-semibold text-text-heading mt-4 mb-2">{trimmed}</p>;
    }

    return <p key={i} className="text-justify mb-2 leading-relaxed text-text-light text-sm">{trimmed}</p>;
  });
}

/** Kartu artikel individual */
function ArtikelCard({
  item,
  featured = false,
  className = "",
}: {
  item: DirectusArtikelItem;
  featured?: boolean;
  className?: string;
}) {
  const [qaOpen, setQaOpen] = useState<string | null>(null);
  const hasTanyaJawab =
    item.kategori === "Tanya Jawab" &&
    Array.isArray(item.konten_tanya_jawab) &&
    item.konten_tanya_jawab.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className={[
        "group relative flex flex-col overflow-hidden rounded-md border border-border-default bg-white transition-all duration-500 hover:shadow-card-hover",
        featured ? "md:flex-row md:col-span-2" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Kategori Badge */}
      <div className="absolute left-6 top-6 z-20">
        <div
          className={`rounded-md px-4 py-1.5 text-xs font-semibold backdrop-blur-md border ${
            item.kategori === "Tanya Jawab"
              ? "bg-amber-500/90 text-white border-amber-400/30"
              : "bg-white/20 text-white border-white/30"
          }`}
        >
          {item.kategori === "Tanya Jawab" ? "❓ Tanya Jawab" : item.kategori}
        </div>
      </div>

      {/* Gambar */}
      <div
        className={`relative overflow-hidden ${
          featured ? "md:w-1/2 h-64 md:h-auto" : "h-52 w-full"
        }`}
      >
        <Image
          src={getDirectusAssetUrl(item.gambar_utama)}
          alt={item.judul}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      </div>

      {/* Konten */}
      <div
        className={`relative flex flex-1 flex-col justify-between p-8 ${
          featured ? "md:w-1/2" : "w-full"
        }`}
      >
        <div>
          <div className="mb-3 flex items-center gap-4 text-xs text-text-light">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formatTanggal(item.tanggal_publish)}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              {item.penulis}
            </span>
          </div>

          <h3
            className={`font-sans font-bold leading-tight text-text-heading group-hover:text-primary transition-colors ${
              featured ? "text-2xl mb-4" : "text-xl mb-3"
            }`}
          >
            {item.judul}
          </h3>

          <p className="line-clamp-3 text-sm leading-relaxed text-text-light">
            {item.ringkasan}
          </p>
        </div>

        {/* Section Tanya Jawab (accordion) */}
        {hasTanyaJawab && (
          <div className="mt-6 border-t border-border-default pt-5">
            <div className="flex items-center gap-2 mb-3 text-xs font-bold text-primary uppercase tracking-wider">
              <MessageCircleQuestion className="h-4 w-4" />
              Tanya Jawab
            </div>
            <div className="space-y-2">
              {(item.konten_tanya_jawab as TanyaJawabItem[])
                .sort((a, b) => a.sort - b.sort)
                .map((qa) => (
                  <div
                    key={qa.id}
                    className="rounded-md border border-border-default overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setQaOpen(qaOpen === qa.id ? null : qa.id)
                      }
                      className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-semibold text-text-heading hover:bg-bg-light transition-colors"
                    >
                      <span>{qa.pertanyaan}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-text-light shrink-0 transition-transform duration-300 ${
                          qaOpen === qa.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {qaOpen === qa.id && (
                        <motion.div
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 pt-1 space-y-1.5 text-sm text-text-light leading-relaxed">
                            {renderQALines(qa.jawaban)}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
            </div>
          </div>
        )}

        {!hasTanyaJawab && (
          <div className="mt-6">
            <Link href={`/artikel/${item.slug}`}>
              <Button variant="primary" size="default" className="px-5 py-2 group/btn w-full sm:w-auto">
                Baca Selengkapnya
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/** Skeleton loading card */
function SkeletonCard({ featured = false }: { featured?: boolean }) {
  return (
    <div
      className={`animate-pulse rounded-md border border-border-default bg-white overflow-hidden ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      <div className={`bg-gray-200 ${featured ? "h-64" : "h-52"}`} />
      <div className="p-8 space-y-3">
        <div className="h-3 bg-gray-200 rounded w-1/3" />
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
        <div className="h-9 bg-gray-200 rounded w-40 mt-4" />
      </div>
    </div>
  );
}

/* =========================================
   TanyaJawabStaticGrid — Renders static Q&A
   data when category "Tanya Jawab" is selected
   ========================================= */

function TanyaJawabQACard({ item, index }: { item: TanyaJawabEntry; index: number }) {
  const [open, setOpen] = useState(false);
  const lines = item.jawaban.split("\n");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.5 }}
      className={[
        "rounded-md border transition-all duration-300 overflow-hidden bg-white",
        open ? "border-amber-300 shadow-[0_4px_20px_rgba(245,158,11,0.12)]" : "border-border-default hover:border-amber-200",
      ].join(" ")}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-start gap-4 group"
        aria-expanded={open}
      >
        {/* Number badge */}
        <div className={[
          "flex-none w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300 mt-0.5",
          open ? "bg-amber-500 text-white" : "bg-amber-50 text-amber-600 group-hover:bg-amber-100",
        ].join(" ")}>
          {String(item.id).padStart(2, "0")}
        </div>

        <div className="flex-1 min-w-0">
          {item.penanya && (
            <div className="flex items-center gap-1.5 text-[10px] font-medium text-text-faint uppercase tracking-wider mb-1">
              <User className="w-3 h-3" />
              {item.penanya}
            </div>
          )}
          <p className={[
            "font-semibold leading-snug text-sm transition-colors duration-300",
            open ? "text-amber-700" : "text-text-heading group-hover:text-amber-700",
          ].join(" ")}>
            {item.pertanyaan}
          </p>
        </div>

        <ChevronDown className={[
          "flex-none w-4 h-4 text-text-faint transition-transform duration-300 mt-1",
          open ? "rotate-180 text-amber-500" : "",
        ].join(" ")} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="ans"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-5 pt-0">
              <div className="h-px bg-gradient-to-r from-amber-200 via-amber-100 to-transparent mb-4" />
              <div className="space-y-1.5 text-sm text-text-light leading-relaxed">
                {renderQALines(item.jawaban)}
              </div>
              <div className="mt-4 pt-3 border-t border-border-default flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-amber-500 flex-none" />
                <p className="text-[10px] text-text-faint">
                  Dijawab oleh <span className="font-semibold text-text-light">{item.ustadz}</span> Hafidzahullahu Ta&apos;ala
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function TanyaJawabStaticGrid({ searchQuery }: { searchQuery: string }) {
  const filtered = TANYA_JAWAB_DATA.filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return item.pertanyaan.toLowerCase().includes(q) || item.jawaban.toLowerCase().includes(q);
  });

  return (
    <section className="pb-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-wider">
            <MessageCircleQuestion className="w-3.5 h-3.5" />
            Tanya Jawab Asatidz
          </div>
          <span className="text-text-faint text-sm">{filtered.length} pertanyaan</span>
        </motion.div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center text-text-faint">
            <MessageCircleQuestion className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Tidak ada pertanyaan yang cocok dengan pencarian.</p>
          </div>
        ) : (
          <div className="max-w-[860px] mx-auto space-y-3">
            {filtered.map((item, idx) => (
              <TanyaJawabQACard key={item.id} item={item} index={idx} />
            ))}
          </div>
        )}

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-[860px] mx-auto mt-10 p-5 rounded-2xl bg-amber-50 border border-amber-100 text-center"
        >
          <p className="font-arabic text-xl text-text-heading mb-1" dir="rtl">وَاللَّهُ أَعْلَمُ</p>
          <p className="text-xs text-text-faint">
            Semua jawaban merupakan ijtihad berdasarkan dalil-dalil yang ada. Untuk permasalahan yang lebih kompleks, silakan berkonsultasi langsung.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default function ArtikelGrid({
  selectedCategory,
  searchQuery,
}: ArtikelGridProps) {
  // ── Shortcircuit: render static Q&A when Tanya Jawab is selected ──
  if (selectedCategory === "Tanya Jawab") {
    return <TanyaJawabStaticGrid searchQuery={searchQuery} />;
  }

  const [articles, setArticles] = useState<DirectusArtikelItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const LIMIT = 12;

  const loadArticles = useCallback(
    async (currentPage: number, reset: boolean) => {
      if (reset) setLoading(true);
      else setLoadingMore(true);

      try {
        const params = new URLSearchParams({
          page: String(currentPage),
          limit: String(LIMIT),
        });
        if (selectedCategory && selectedCategory !== "Semua") {
          params.set("kategori", selectedCategory);
        }
        if (searchQuery) {
          params.set("search", searchQuery);
        }

        const res = await fetch(`/api/artikel?${params.toString()}`);
        const json = await res.json();
        let incoming: DirectusArtikelItem[] = json.data ?? [];

        // Fallback ke mock data jika Directus belum terhubung
        if (incoming.length === 0 && reset && currentPage === 1) {
          let mock = MOCK_ARTIKEL;
          if (selectedCategory && selectedCategory !== "Semua") {
            mock = mock.filter((a) => a.kategori === selectedCategory);
          }
          if (searchQuery) {
            const q = searchQuery.toLowerCase();
            mock = mock.filter(
              (a) =>
                a.judul.toLowerCase().includes(q) ||
                a.ringkasan.toLowerCase().includes(q)
            );
          }
          incoming = mock;
        }

        setArticles((prev) => (reset ? incoming : [...prev, ...incoming]));
        setHasMore(incoming.length === LIMIT);
      } catch (err) {
        console.error("[ArtikelGrid] Gagal fetch artikel:", err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [selectedCategory, searchQuery]
  );

  // Reset & reload saat filter/search berubah
  useEffect(() => {
    setPage(1);
    loadArticles(1, true);
  }, [selectedCategory, searchQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLoadMore = () => {
    const next = page + 1;
    setPage(next);
    loadArticles(next, false);
  };

  // ── Skeleton loaders ──
  if (loading) {
    return (
      <section className="pb-24">
        <div className="max-w-[1200px] mx-auto px-5">
          {/* Featured skeleton */}
          <div className="animate-pulse mb-8">
            <div className="w-full h-[420px] bg-gray-200 rounded-2xl mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
            <div className="h-7 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-full mb-1" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
          {/* Row of 3 skeletons */}
          <div className="grid grid-cols-3 gap-5 mb-8">
            {[1,2,3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-44 bg-gray-200 rounded-xl mb-3" />
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                <div className="h-5 bg-gray-200 rounded w-full mb-1" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            ))}
          </div>
          {/* List skeletons */}
          {[1,2,3,4,5].map(i => (
            <div key={i} className="animate-pulse flex gap-4 py-5 border-b border-border-default">
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-1/4" />
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
              </div>
              <div className="w-32 h-24 bg-gray-200 rounded-xl flex-none" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ── Empty state ──
  if (!loading && articles.length === 0) {
    return (
      <section className="pb-24">
        <div className="max-w-[1200px] mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-24 flex flex-col items-center text-center"
          >
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <BookOpen className="w-10 h-10 text-primary/50" />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Segera Hadir
            </div>
            <h3 className="text-3xl font-bold text-text-heading mb-3">Belum Ada Artikel</h3>
            <p className="text-text-light text-sm max-w-sm leading-relaxed">
              Konten sedang dipersiapkan. Nantikan artikel-artikel bermanfaat yang akan segera hadir.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  const [featured, ...rest] = articles;
  const secondary = rest.slice(0, 3);
  const listItems = rest.slice(3);

  return (
    <section className="pb-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-5">

        {/* ── FEATURED ARTICLE (Hero besar) ── */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <Link href={`/artikel/${featured.slug}`} className="group block">
              <div className="relative w-full h-[400px] sm:h-[480px] rounded-2xl overflow-hidden mb-5">
                <Image
                  src={getDirectusAssetUrl(featured.gambar_utama)}
                  alt={featured.judul}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {/* Category badge */}
                <div className="absolute top-5 left-5">
                  <span className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wider">
                    {featured.kategori}
                  </span>
                </div>
                {/* Title overlay on image */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <h2 className="text-white text-2xl sm:text-3xl font-bold leading-tight mb-2 group-hover:text-primary/90 transition-colors line-clamp-2">
                    {featured.judul}
                  </h2>
                  <div className="flex items-center gap-4 text-white/70 text-xs">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatTanggal(featured.tanggal_publish)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      {featured.penulis}
                    </span>
                  </div>
                </div>
              </div>
              {/* Ringkasan di bawah gambar */}
              <p className="text-text-light text-sm leading-relaxed line-clamp-2">
                {featured.ringkasan}
              </p>
            </Link>
          </motion.div>
        )}

        {/* ── DIVIDER ── */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-6 bg-primary rounded-full" />
          <h2 className="text-base font-bold text-text-heading tracking-wide uppercase">Artikel Terbaru</h2>
          <div className="flex-1 h-px bg-border-default" />
        </div>

        {/* ── SECONDARY CARDS (3 kolom) ── */}
        {secondary.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            {secondary.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <Link href={`/artikel/${article.slug}`} className="group block">
                  <div className="relative w-full h-44 rounded-xl overflow-hidden mb-3">
                    <Image
                      src={getDirectusAssetUrl(article.gambar_utama)}
                      alt={article.judul}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 text-primary text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        {article.kategori}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-text-faint mb-1.5">
                    <Calendar className="w-3 h-3" />
                    {formatTanggal(article.tanggal_publish)}
                  </div>
                  <h3 className="text-sm font-bold text-text-heading leading-snug line-clamp-3 group-hover:text-primary transition-colors">
                    {article.judul}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── DIVIDER ── */}
        {listItems.length > 0 && (
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <h2 className="text-base font-bold text-text-heading tracking-wide uppercase">Baca Juga</h2>
            <div className="flex-1 h-px bg-border-default" />
          </div>
        )}

        {/* ── LIST ARTIKEL (thumbnail kanan, teks kiri) ── */}
        {listItems.length > 0 && (
          <div className="divide-y divide-border-default">
            {listItems.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <Link
                  href={`/artikel/${article.slug}`}
                  className="group flex items-start gap-4 py-5 hover:bg-bg-light/60 transition-colors -mx-2 px-2 rounded-lg"
                >
                  {/* Teks kiri */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary/8 px-2 py-0.5 rounded">
                        {article.kategori}
                      </span>
                      <span className="text-[11px] text-text-faint flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatTanggal(article.tanggal_publish)}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-text-heading leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {article.judul}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-light leading-relaxed line-clamp-2 hidden sm:block">
                      {article.ringkasan}
                    </p>
                    <div className="flex items-center gap-1.5 mt-2 text-[11px] text-text-faint">
                      <User className="w-3 h-3" />
                      {article.penulis}
                    </div>
                  </div>

                  {/* Thumbnail kanan */}
                  <div className="relative w-28 h-20 sm:w-36 sm:h-24 flex-none rounded-xl overflow-hidden">
                    <Image
                      src={getDirectusAssetUrl(article.gambar_utama)}
                      alt={article.judul}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── LOAD MORE ── */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-center"
          >
            <Button
              variant="secondary"
              size="lg"
              onClick={handleLoadMore}
              disabled={loadingMore}
            >
              {loadingMore ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Memuat...
                </>
              ) : (
                "Muat Lebih Banyak"
              )}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

