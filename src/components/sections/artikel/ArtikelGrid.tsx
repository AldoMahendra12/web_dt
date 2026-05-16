"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Calendar, User, ArrowUpRight, MessageCircleQuestion, ChevronDown, Loader2 } from "lucide-react";
import Button from "@/components/ui/button";
import { getDirectusAssetUrl, type DirectusArtikelItem, type TanyaJawabItem } from "@/lib/directus";

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
                          <p className="px-4 pb-4 pt-1 text-sm text-text-light leading-relaxed">
                            {qa.jawaban}
                          </p>
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
            <Button variant="primary" size="default" className="px-5 py-2 group/btn">
              Baca Selengkapnya
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </Button>
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

export default function ArtikelGrid({
  selectedCategory,
  searchQuery,
}: ArtikelGridProps) {
  const [articles, setArticles] = useState<DirectusArtikelItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const LIMIT = 9;

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
        const incoming: DirectusArtikelItem[] = json.data ?? [];

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

  return (
    <section className="pb-24">
      <div className="container mx-auto px-6">
        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SkeletonCard featured />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {/* Coming Soon state */}
        {!loading && articles.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="py-24 flex flex-col items-center text-center"
          >
            {/* Decorative ring */}
            <div className="relative mb-8">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/50 flex items-center justify-center">
                  <span className="text-4xl">✨</span>
                </div>
              </div>
              {/* Orbiting dot */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/40" />
              </motion.div>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Segera Hadir
            </div>

            <h3 className="text-3xl font-bold text-text-heading mb-3 font-sans">
              Coming Soon
            </h3>
            <p className="text-text-light text-sm max-w-sm leading-relaxed">
              Konten sedang dipersiapkan oleh tim Dakwah Tulungagung.
              Nantikan artikel-artikel bermanfaat yang akan segera hadir.
            </p>

            {/* Decorative dots */}
            <div className="flex gap-2 mt-8">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                  className="w-2 h-2 rounded-full bg-primary/40"
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Article Grid */}
        {!loading && articles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <ArtikelCard
                key={article.id}
                item={article}
                featured={index === 0 && page === 1}
                className={index === 0 && page === 1 ? "lg:col-span-2" : ""}
              />
            ))}
          </div>
        )}

        {/* Load More */}
        {!loading && hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 text-center"
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
