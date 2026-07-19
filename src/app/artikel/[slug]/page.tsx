import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User, Share2, MessageCircle, BookOpen, Clock } from "lucide-react";
import NavBar from "@/components/sections/nav-bar";
import FooterSection from "@/components/sections/footer-section";
import Button from "@/components/ui/button";
import { fetchArtikelBySlug, fetchArtikel, getDirectusAssetUrl, type DirectusArtikelItem } from "@/lib/directus";

interface ArticleDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticleDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArtikelBySlug(slug);

  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan - Dakwah Tulungagung",
    };
  }

  return {
    title: `${article.judul} - Dakwah Tulungagung`,
    description: article.ringkasan,
  };
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { slug } = await params;
  const article = await fetchArtikelBySlug(slug);

  if (!article) {
    notFound();
  }

  // Fetch related articles
  const relatedArticles = await fetchArtikel({
    kategori: article.kategori,
    limit: 3,
  });

  // Filter out the current article from related list
  const filteredRelated = relatedArticles.filter((item) => item.id !== article.id).slice(0, 3);

  // Format date helper
  const formatTanggal = (iso: string | null) => {
    if (!iso) return "-";
    return new Date(iso).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Helper to parse content paragraph by paragraph, checking for Arabic
  const renderParagraphs = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={i} className="h-4" />;

      const hasArabic = /[\u0600-\u06FF]/.test(trimmed);
      if (hasArabic) {
        return (
          <div key={i} dir="rtl" className="font-arabic text-2xl sm:text-3xl text-text-heading leading-loose text-center my-6 py-2">
            {trimmed}
          </div>
        );
      }

      // Check if it's a translation of Arabic (usually follows Arabic line or is in quotes)
      const isTranslation = trimmed.startsWith('"') || trimmed.startsWith('“') || trimmed.startsWith('&quot;');
      if (isTranslation) {
        return (
          <p key={i} className="text-base sm:text-lg italic text-text-muted text-center max-w-[650px] mx-auto mb-6 leading-relaxed">
            {trimmed}
          </p>
        );
      }

      // Check if it's a subheading/points
      if (/^(Yang (pertama|ke\s*\w+|ketiga|keempat)|\d+\.|•)/.test(trimmed)) {
        return <h3 key={i} className="text-lg font-bold text-text-heading mt-6 mb-2">{trimmed}</h3>;
      }

      return <p key={i} className="text-text-light text-base leading-relaxed mb-4 text-justify">{trimmed}</p>;
    });
  };

  return (
    <div className="bg-bg-light min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-[1200px] mx-auto px-5">
          
          {/* Article Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">
            
            {/* Left Column: Article Content */}
            <article className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-10 border border-border-default shadow-sm">
              
              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                  {article.kategori}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-heading leading-tight mb-6 tracking-tight font-sans">
                {article.judul}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-text-light pb-6 border-b border-border-default mb-8">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Oleh: <span className="font-semibold text-text-heading">{article.penulis}</span>
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  {formatTanggal(article.tanggal_publish)}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  5 Menit Baca
                </span>
              </div>

              {/* Featured Image */}
              <div className="relative w-full h-[250px] sm:h-[400px] md:h-[450px] rounded-2xl overflow-hidden mb-8 shadow-sm">
                <Image
                  src={getDirectusAssetUrl(article.gambar_utama)}
                  alt={article.judul}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Top Share Buttons */}
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border-default">
                <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Bagikan:</span>
                <button className="w-9 h-9 rounded-full bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-colors flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </button>
                <button className="w-9 h-9 rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white transition-colors flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.738-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </button>
                <button className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors flex items-center justify-center">
                  <MessageCircle className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Article Content Body */}
              <div className="prose prose-teal max-w-none mb-12">
                {renderParagraphs(article.ringkasan)}
                
                {/* Render Nested Tanya Jawab list if category is Tanya Jawab */}
                {article.kategori === "Tanya Jawab" && article.konten_tanya_jawab && article.konten_tanya_jawab.length > 0 && (
                  <div className="mt-8 space-y-8 pt-8 border-t border-border-default">
                    {article.konten_tanya_jawab
                      .sort((a, b) => a.sort - b.sort)
                      .map((qa, index) => (
                        <div key={qa.id} className="space-y-4">
                          <div className="flex gap-3 items-start">
                            <div className="w-7 h-7 rounded-lg bg-amber-500 text-white font-bold flex items-center justify-center text-sm flex-shrink-0 mt-1">
                              {index + 1}
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-text-heading mt-0.5 mb-3 leading-snug">
                                {qa.pertanyaan}
                              </h3>
                              <div className="space-y-3 pl-1">
                                {renderParagraphs(qa.jawaban)}
                              </div>
                            </div>
                          </div>
                        </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Share Buttons */}
              <div className="flex items-center gap-3 pt-6 border-t border-border-default mb-10">
                <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Bagikan:</span>
                <button className="px-4 py-2 rounded-full border border-border-default text-xs font-semibold text-text-heading hover:bg-bg-light transition-colors flex items-center gap-2">
                  <Share2 className="w-3.5 h-3.5" /> Share
                </button>
              </div>

              {/* Author Box (Ustadz Info / Writer Info) */}
              <div className="p-6 rounded-2xl bg-bg-light border border-border-default flex flex-col sm:flex-row gap-5 items-center sm:items-start text-center sm:text-left">
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-text-heading mb-1">{article.penulis}</h4>
                  <p className="text-xs text-primary font-medium mb-3">Kontributor Dakwah Tulungagung</p>
                  <p className="text-sm text-text-muted leading-relaxed">
                    Aktif menulis dan membagikan materi keislaman serta fatwa-fatwa kontemporer yang relevan untuk masyarakat.
                  </p>
                </div>
              </div>

              {/* Comments Section (Tinggalkan Balasan) */}
              <div className="mt-12 pt-10 border-t border-border-default">
                <h3 className="text-2xl font-bold text-text-heading mb-2">Tinggalkan Balasan</h3>
                <p className="text-sm text-text-muted mb-6">Alamat email Anda tidak akan dipublikasikan. Ruas yang wajib ditandai *</p>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-text-heading text-xs font-bold mb-1.5">Komentar *</label>
                    <textarea 
                      rows={5} 
                      className="w-full px-4 py-3 rounded-lg border border-border-default focus:outline-none focus:border-primary bg-bg-light/50 text-sm text-text-heading placeholder:text-text-faint resize-none"
                      placeholder="Tulis komentar Anda di sini..."
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-text-heading text-xs font-bold mb-1.5">Nama *</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2.5 rounded-lg border border-border-default focus:outline-none focus:border-primary bg-bg-light/50 text-sm text-text-heading placeholder:text-text-faint"
                        placeholder="Nama Anda"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-text-heading text-xs font-bold mb-1.5">Email *</label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-2.5 rounded-lg border border-border-default focus:outline-none focus:border-primary bg-bg-light/50 text-sm text-text-heading placeholder:text-text-faint"
                        placeholder="Email Anda"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Button type="submit" variant="primary" className="px-6 py-3">
                      Kirim Komentar
                    </Button>
                  </div>
                </form>
              </div>

            </article>

            {/* Right Column: Sidebar (Related Articles) */}
            <aside className="lg:col-span-4 space-y-8">
              
              {/* Related Articles Card */}
              <div className="bg-white rounded-2xl p-6 border border-border-default shadow-sm">
                <h3 className="text-lg font-bold text-text-heading mb-5 pb-3 border-b border-border-default flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Artikel Terkait
                </h3>
                
                {filteredRelated.length === 0 ? (
                  <p className="text-sm text-text-faint">Tidak ada artikel terkait saat ini.</p>
                ) : (
                  <div className="space-y-5">
                    {filteredRelated.map((item) => (
                      <Link 
                        key={item.id} 
                        href={`/artikel/${item.slug}`}
                        className="group flex gap-4 items-start pb-4 border-b border-border-default/50 last:pb-0 last:border-b-0"
                      >
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-bg-light">
                          <Image
                            src={getDirectusAssetUrl(item.gambar_utama)}
                            alt={item.judul}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-text-heading line-clamp-2 leading-snug group-hover:text-primary transition-colors mb-1.5">
                            {item.judul}
                          </h4>
                          <span className="text-[10px] text-text-faint">
                            {formatTanggal(item.tanggal_publish)}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Info / Call to Action */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/90 to-primary-dark text-white border border-primary/20 shadow-sm relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                <h3 className="text-xl font-bold mb-3 relative z-10">Punya Pertanyaan?</h3>
                <p className="text-sm text-white/80 leading-relaxed mb-6 relative z-10">
                  Konsultasikan masalah agama, hukum syariah, atau problem sehari-hari langsung dengan Ustadz kami.
                </p>
                <Link href="/artikel" className="inline-flex">
                  <Button variant="secondary" className="px-5 py-2.5 bg-white text-primary hover:bg-white/90">
                    Tanya Sekarang
                  </Button>
                </Link>
              </div>

            </aside>

          </div>

        </div>
      </main>

      <FooterSection />
    </div>
  );
}
