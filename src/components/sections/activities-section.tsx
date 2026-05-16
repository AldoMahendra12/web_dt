"use client";

import Image from "next/image";
import Badge from "@/components/ui/badge";
import type { ActivityItem } from "@/types";

/* =========================================
   ActivitiesSection — Infinite Sliding Carousel
   All cards same size, infinite marquee
   ========================================= */

const ACTIVITIES: ActivityItem[] = [
  {
    image: "/activities/berbagi.jpg",
    alt: "Dakwah Tulungagung Berbagi",
    label: "Program Sosial",
    title: "Dakwah Tulungagung Berbagi",
    description:
      "Penyaluran paket sembako dan bantuan tunai untuk dhuafa dan masyarakat terdampak.",
  },
  {
    image: "/activities/pipanisasi.jpg",
    alt: "Pipanisasi",
    label: "Wakaf Air",
    title: "Program Pipanisasi",
    description:
      "Pembangunan sarana air bersih untuk wilayah yang kesulitan akses air layak konsumsi.",
  },
  {
    image: "/assets/safari-dakwah.jpeg",
    alt: "Safari Dakwah Intensif",
    label: "Kajian Intensif",
    title: "Safari Dakwah Intensif",
    description:
      "Rangkaian kajian yang menghadirkan asatidzah dari luar daerah untuk menyapa jamaah di Tulungagung.",
  },
  {
    image: "/assets/live-kajian.jpeg",
    alt: "Live Kajian",
    label: "Dakwah",
    title: "Live Kajian",
    description:
      "Siaran langsung kajian ilmu agama melalui platform digital yang dapat diakses di mana saja.",
  },
  {
    image: "/assets/pelatihan.jpeg",
    alt: "Pelatihan",
    label: "Pendidikan",
    title: "Pelatihan & Keterampilan",
    description:
      "Program pelatihan vokasional untuk meningkatkan kualitas dan kemandirian ekonomi umat.",
  },
  {
    image: "/assets/jumat-berkah.jpeg",
    alt: "Jumat Berkah",
    label: "Sosial",
    title: "Jumat Berkah",
    description:
      "Inisiatif berbagi makanan gratis setiap hari Jumat sebagai wujud kepedulian sosial.",
  },
];

function ActivityCard({ activity }: { activity: ActivityItem }) {
  return (
    <div className="relative flex-none w-[280px] sm:w-[340px] h-[360px] sm:h-[420px] rounded-2xl overflow-hidden group cursor-pointer">
      <Image
        src={activity.image}
        alt={activity.alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 640px) 280px, 340px"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500" />
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 text-white flex flex-col justify-end">
        <Badge className="mb-3 w-fit text-xs">{activity.label}</Badge>
        <h3 className="text-lg sm:text-xl font-extrabold tracking-[-0.5px] mb-2 text-white leading-snug">
          {activity.title}
        </h3>
        <p className="text-xs sm:text-sm text-white/75 leading-relaxed line-clamp-3">
          {activity.description}
        </p>
      </div>
    </div>
  );
}

export default function ActivitiesSection() {
  // Duplicate array for seamless loop
  const loopItems = [...ACTIVITIES, ...ACTIVITIES];

  return (
    <section className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 mb-12 sm:mb-16">
        {/* Header */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-[-1px] sm:tracking-[-2px] text-text-heading mb-6 max-w-[900px]">
          Kegiatan rutin kami untuk menebar{" "}
          <span className="text-primary italic font-medium">kebaikan</span> di{" "}
          Tulungagung
        </h2>
        <p className="text-lg text-text-light max-w-[600px]">
          Mewujudkan kepedulian nyata melalui berbagai program dakwah dan sosial
          yang berkelanjutan.
        </p>
      </div>

      {/* Infinite Sliding Track */}
      <div className="relative w-full">
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-white to-transparent" />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-white to-transparent" />

        {/* Sliding wrapper */}
        <div
          className="flex gap-6 w-max"
          style={{
            animation: "slide-infinite 30s linear infinite",
          }}
        >
          {loopItems.map((activity, i) => (
            <ActivityCard key={`${activity.title}-${i}`} activity={activity} />
          ))}
        </div>
      </div>

      {/* Keyframe injection */}
      <style>{`
        @keyframes slide-infinite {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        div[style*="slide-infinite"]:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
