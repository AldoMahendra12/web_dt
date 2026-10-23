"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Clock,
  ArrowRight,
  Tag,
  CheckCircle2,
  PlayCircle,
  X,
  ExternalLink,
} from "lucide-react";
import { EVENTS_DATA, type EventItem } from "@/data/events";

/* =========================================
   EventCard Component
   ========================================= */
function EventCard({
  event,
  onOpenDoc,
}: {
  event: EventItem;
  onOpenDoc: (event: EventItem) => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-border-default shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col overflow-hidden">
      {/* Poster */}
      <div className="relative overflow-hidden bg-bg-light">
        <Image
          src={event.poster}
          alt={`Poster ${event.title}`}
          width={600}
          height={800}
          className="w-full object-contain block transition-transform duration-500 group-hover:scale-[1.02]"
          style={{ width: "100%", height: "auto" }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
        />
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {event.isUpcoming ? (
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500 text-white shadow-md flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Upcoming
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-gray-700/80 backdrop-blur-sm text-white shadow-md flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              Selesai
            </span>
          )}
          {event.isFree && (
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-md">
              GRATIS
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Category */}
        <div className="flex items-center gap-1.5 text-primary text-[11px] font-bold uppercase tracking-wider">
          <Tag className="w-3 h-3" />
          {event.category}
        </div>

        {/* Title */}
        <h2 className="text-lg font-extrabold text-text-heading leading-snug">
          {event.title}
        </h2>

        {/* Description */}
        {event.description && (
          <p className="text-sm text-text-muted leading-relaxed">
            {event.description}
          </p>
        )}

        {/* Details */}
        <div className="space-y-2 mt-1">
          <div className="flex items-start gap-2 text-sm text-text-light">
            <CalendarDays className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-start gap-2 text-sm text-text-light">
            <Clock className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-start gap-2 text-sm text-text-light">
            <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-text-heading">{event.location}</span>
              {event.locationDetail && (
                <p className="text-xs text-text-faint mt-0.5">{event.locationDetail}</p>
              )}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-3 mt-auto">
          {event.isUpcoming ? (
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 active:scale-95 transition-all shadow-md"
            >
              Daftar Sekarang
              <ArrowRight className="w-4 h-4" />
            </a>
          ) : event.documentationUrl ? (
            <button
              type="button"
              onClick={() => onOpenDoc(event)}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 active:scale-95 transition-all shadow-md group/doc"
            >
              <PlayCircle className="w-4 h-4 text-amber-300 group-hover/doc:scale-110 transition-transform" />
              <span>Dokumentasi</span>
            </button>
          ) : (
            <div className="w-full text-center py-2.5 px-4 rounded-xl bg-gray-100 text-text-muted font-medium text-xs">
              Event Telah Selesai Dilaksanakan
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================
   Main Page Component
   ========================================= */
export default function EventsPageClient() {
  const [activeDocEvent, setActiveDocEvent] = useState<EventItem | null>(null);

  const upcomingEvents = EVENTS_DATA.filter((e) => e.isUpcoming);
  const pastEvents = EVENTS_DATA.filter((e) => !e.isUpcoming);

  // Lock body scroll and handle Escape key for modal
  useEffect(() => {
    if (!activeDocEvent) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveDocEvent(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeDocEvent]);

  return (
    <div>
      {/* Hero Header */}
      <section className="bg-white border-b border-border-default py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-5 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-5">
            <CalendarDays className="w-3.5 h-3.5" />
            Jadwal Kegiatan
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-text-heading mb-4 tracking-tight">
            Events &{" "}
            <span className="text-primary">Kajian</span>
          </h1>
          <p className="text-text-muted text-lg max-w-xl mx-auto leading-relaxed">
            Ikuti kajian, seminar, dan kegiatan dakwah bersama Dakwah Tulungagung.
            Terbuka untuk semua lapisan masyarakat.
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-5">

          {/* Upcoming */}
          {upcomingEvents.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-extrabold text-text-heading mb-8 flex items-center gap-3">
                <span className="w-2 h-6 rounded-full bg-emerald-500 inline-block" />
                Event Mendatang
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onOpenDoc={setActiveDocEvent}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <div>
              <h2 className="text-2xl font-extrabold text-text-heading mb-8 flex items-center gap-3">
                <span className="w-2 h-6 rounded-full bg-primary/40 inline-block" />
                Event Sebelumnya
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onOpenDoc={setActiveDocEvent}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {EVENTS_DATA.length === 0 && (
            <div className="py-32 flex flex-col items-center text-center">
              <CalendarDays className="w-16 h-16 text-primary/20 mb-4" />
              <h3 className="text-2xl font-bold text-text-heading mb-2">
                Belum Ada Event
              </h3>
              <p className="text-text-muted max-w-sm">
                Event dan kajian mendatang akan segera diumumkan. Pantau terus halaman ini.
              </p>
            </div>
          )}

        </div>
      </section>

      {/* Documentation Video Modal */}
      {activeDocEvent && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
            onClick={() => setActiveDocEvent(null)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-3xl bg-stone-900 rounded-2xl shadow-2xl overflow-hidden border border-white/10 z-10 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:px-6 border-b border-white/10 bg-stone-950/80">
              <div className="flex items-center gap-3 pr-4">
                <span className="p-2 rounded-xl bg-primary/20 text-primary">
                  <PlayCircle className="w-5 h-5 text-amber-400" />
                </span>
                <div>
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                    Dokumentasi Kegiatan
                  </span>
                  <h3 className="text-white font-bold text-sm sm:text-base line-clamp-1">
                    {activeDocEvent.title}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveDocEvent(null)}
                className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Tutup Dokumentasi"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player */}
            <div className="p-4 sm:p-6 bg-black flex items-center justify-center overflow-hidden flex-1">
              {activeDocEvent.documentationUrl?.endsWith(".mp4") ||
              activeDocEvent.documentationUrl?.endsWith(".webm") ? (
                <video
                  src={activeDocEvent.documentationUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full max-h-[60vh] rounded-xl object-contain bg-black"
                />
              ) : (
                <div className="text-center py-12">
                  <p className="text-stone-300 mb-4">
                    Dokumentasi tersedia di tautan eksternal
                  </p>
                  <a
                    href={activeDocEvent.documentationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-colors"
                  >
                    Buka Dokumentasi
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 sm:px-6 py-3 border-t border-white/10 bg-stone-950/80 flex items-center justify-between text-xs text-stone-400">
              <span className="line-clamp-1">
                {activeDocEvent.date} • {activeDocEvent.location}
              </span>
              {activeDocEvent.documentationUrl && (
                <a
                  href={activeDocEvent.documentationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-amber-400 hover:underline hover:text-amber-300 font-medium whitespace-nowrap ml-4"
                >
                  Buka di Tab Baru
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CTA Banner */}
      <section className="py-16 bg-primary">
        <div className="max-w-[1200px] mx-auto px-5 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Ingin tahu info event lebih awal?
          </h2>
          <p className="text-white/80 mb-8 max-w-md mx-auto">
            Ikuti media sosial kami atau hubungi admin untuk mendapatkan notifikasi kajian terbaru.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/6285731110003"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-bold text-sm hover:bg-white/90 transition-colors shadow-lg"
            >
              Hubungi via WhatsApp
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/30 text-white font-bold text-sm hover:bg-white/10 transition-colors"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
