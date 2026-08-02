"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Phone, Globe, Users, BookOpen, ChevronRight } from "lucide-react";
import type { ProgramItem, ProgramCategory } from "@/types";
import Button from "@/components/ui/button";

/* =========================================
   ProgramDetailClient - Renders the detail
   page for Sosial, Pendidikan, and Mitra
   programs. Shows reports or vendor profile.
   ========================================= */

interface ProgramDetailClientProps {
  item: ProgramItem;
  category: ProgramCategory | null;
}

/* ─── Fade-In wrapper ─── */
const FadeIn = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function ProgramDetailClient({
  item,
  category,
}: ProgramDetailClientProps) {
  const isSosial = item.categoryId === "sosial";

  return (
    <main className="min-h-screen bg-bg-light">
      {/* ── Hero Header ── */}
      <section
        className="relative overflow-hidden pt-24 pb-16"
        style={{
          background:
            "linear-gradient(135deg, #00716a 0%, #004d47 60%, #003d38 100%)",
        }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-60 h-60 rounded-full bg-white/5 blur-2xl pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-5 relative z-10">
          {/* Back link */}
          <FadeIn>
            <Link
              href="/program"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-8 group transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Kembali ke Program
            </Link>
          </FadeIn>

          {/* Category pill */}
          <FadeIn delay={0.05}>
            <span className="inline-block text-[11px] font-bold uppercase tracking-[3px] text-white/60 bg-white/10 border border-white/15 px-4 py-1.5 rounded-full mb-4">
              Program {category?.label ?? item.categoryId}
            </span>
          </FadeIn>

          {/* Title */}
          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              {item.title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
              {item.fullDescription ?? item.description}
            </p>
          </FadeIn>

          {/* CTA for vendor/pendidikan/mitra */}
          {item.vendorProfile?.contactUrl && (
            <FadeIn delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  href={item.vendorProfile.contactUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  className="gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Daftar / Hubungi Kami
                </Button>
                {item.vendorProfile.website && (
                  <a
                    href={item.vendorProfile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/25 text-white text-sm font-semibold hover:bg-white/10 transition-all"
                  >
                    <Globe className="w-4 h-4" />
                    Kunjungi Website
                  </a>
                )}
              </div>
            </FadeIn>
          )}

          {/* Donate CTA for Sosial */}
          {isSosial && (
            <FadeIn delay={0.2}>
              <div className="mt-8">
                <Button
                  href={`https://wa.me/6285731110003?text=Assalamu%27alaikum%2C%20saya%20ingin%20berdonasi%20untuk%20program%20${encodeURIComponent(item.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  className="gap-2"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  Donasi via WhatsApp
                </Button>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* ── Content Section ── */}
      <section className="max-w-[1200px] mx-auto px-5 py-14">
        {isSosial ? (
          <SosialReports item={item} />
        ) : (
          <VendorProfile item={item} />
        )}
      </section>
    </main>
  );
}

/* ─────────────────────────────────────────
   Laporan Kegiatan (Sosial programs)
   ─────────────────────────────────────────*/
function SosialReports({ item }: { item: ProgramItem }) {
  const reports = item.reports ?? [];

  return (
    <div>
      <FadeIn>
        <div className="flex items-center gap-3 mb-10">
          <div className="flex-1 h-[1px] bg-border-default" />
          <span className="text-xs font-bold uppercase tracking-[4px] text-text-faint px-4">
            Laporan Kegiatan Terbaru
          </span>
          <div className="flex-1 h-[1px] bg-border-default" />
        </div>
      </FadeIn>

      {reports.length === 0 ? (
        <FadeIn delay={0.1}>
          <div className="text-center py-20 text-text-faint">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-semibold">Belum ada laporan tersedia</p>
            <p className="text-sm mt-1">Laporan kegiatan akan segera hadir.</p>
          </div>
        </FadeIn>
      ) : (
        <div className="space-y-8">
          {reports.map((report, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <article className="group bg-white rounded-2xl border border-border-default hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                {/* Top accent bar */}
                <div className="h-1 bg-gradient-to-r from-primary via-primary-dark to-accent-teal" />

                <div className="p-8">
                  {/* Date */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">
                      {report.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-text-heading mb-3 group-hover:text-primary transition-colors">
                    {report.title}
                  </h2>

                  {/* Description */}
                  <p className="text-text-light text-sm leading-relaxed mb-6">
                    {report.description}
                  </p>

                  {/* Stats */}
                  {report.stats && report.stats.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {report.stats.map((stat, si) => (
                        <motion.div
                          key={si}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: si * 0.05 + 0.2 }}
                          className="bg-bg-light rounded-xl p-4 text-center border border-border-default/50"
                        >
                          <p className="text-lg font-extrabold text-primary">
                            {stat.value}
                          </p>
                          <p className="text-xs text-text-faint mt-1 font-medium">
                            {stat.label}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      )}

      {/* Donate banner */}
      <FadeIn delay={0.3}>
        <div
          className="mt-14 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,113,106,0.08) 0%, rgba(0,113,106,0.03) 100%)",
            border: "1px solid rgba(0,113,106,0.15)",
          }}
        >
          <div className="flex-1 text-center sm:text-left">
            <p className="text-xl font-bold text-text-heading mb-1">
              Ingin Turut Berkontribusi?
            </p>
            <p className="text-text-light text-sm leading-relaxed">
              Setiap donasi Anda dikelola secara amanah dan transparan untuk
              mendukung keberlangsungan program ini.
            </p>
          </div>
          <Button
            href={`https://wa.me/6285731110003?text=Assalamu%27alaikum%2C%20saya%20ingin%20berdonasi%20untuk%20program%20${encodeURIComponent(item.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="whitespace-nowrap shrink-0"
          >
            Donasi Sekarang
          </Button>
        </div>
      </FadeIn>
    </div>
  );
}

/* ─────────────────────────────────────────
   Vendor / Partner Profile (Pendidikan, Mitra)
   ─────────────────────────────────────────*/
function VendorProfile({ item }: { item: ProgramItem }) {
  const vendor = item.vendorProfile;

  if (!vendor) {
    return (
      <FadeIn>
        <div className="text-center py-20 text-text-faint">
          <Users className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="text-lg font-semibold">Profil belum tersedia</p>
        </div>
      </FadeIn>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Profile Card */}
      <FadeIn delay={0.05}>
        <div className="bg-white rounded-2xl border border-border-default overflow-hidden shadow-sm">
          <div className="h-1 bg-gradient-to-r from-primary via-primary-dark to-accent-teal" />
          <div className="p-8 sm:p-10">
            {/* Name & intro */}
            <div className="flex items-start gap-4 mb-8">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-heading mb-1">
                  {vendor.name}
                </h2>
                <p className="text-text-light text-sm">{vendor.description}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border-default my-6" />

            {/* Contribution */}
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[3px] text-primary/70 mb-3">
                Kontribusi dalam Program
              </p>
              <p className="text-text-light text-sm leading-relaxed">
                {vendor.contribution}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {vendor.contactUrl && (
                <Button
                  href={vendor.contactUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  className="gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Hubungi / Daftar Sekarang
                </Button>
              )}
              {vendor.website && (
                <a
                  href={vendor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border-default text-text-heading text-sm font-semibold hover:bg-bg-light hover:border-primary/30 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  Kunjungi Website
                </a>
              )}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Info box */}
      <FadeIn delay={0.15}>
        <div
          className="mt-8 rounded-2xl p-7 flex items-start gap-4"
          style={{
            background: "linear-gradient(135deg, rgba(0,113,106,0.06) 0%, rgba(0,113,106,0.02) 100%)",
            border: "1px solid rgba(0,113,106,0.12)",
          }}
        >
          <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-text-heading text-sm mb-1">
              Bergabung dengan Program Ini
            </p>
            <p className="text-text-light text-xs leading-relaxed">
              Program ini terbuka untuk umum. Hubungi kami melalui WhatsApp untuk
              informasi jadwal, biaya, dan persyaratan pendaftaran.
            </p>
          </div>
        </div>
      </FadeIn>

      {/* Back to programs */}
      <FadeIn delay={0.2}>
        <div className="mt-10 text-center">
          <Link
            href="/program"
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Lihat Semua Program
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}
