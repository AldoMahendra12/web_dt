"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Clock, ArrowRight, Tag, CheckCircle2 } from "lucide-react";
import { EVENTS_DATA, type EventItem } from "@/data/events";

/* =========================================
   EventCard Component
   ========================================= */
function EventCard({ event }: { event: EventItem }) {
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
  const upcomingEvents = EVENTS_DATA.filter((e) => e.isUpcoming);
  const pastEvents = EVENTS_DATA.filter((e) => !e.isUpcoming);

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
                  <EventCard key={event.id} event={event} />
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
                  <EventCard key={event.id} event={event} />
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
