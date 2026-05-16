import Image from "next/image";
import Badge from "@/components/ui/badge";
import type { ActivityItem } from "@/types";

/* =========================================
   ActivitiesSection — Static Grid
   ─────────────────────────────────────
   Removed infinite scroll animation for
   better performance and direct visibility.
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
      "Penyediaan akses air bersih melalui pembangunan pipa untuk masjid dan pemukiman warga.",
  },
  {
    image: "/activities/safari.jpg",
    alt: "Safari Dakwah",
    label: "Edukasi Islami",
    title: "Safari Dakwah",
    description:
      "Rangkaian kajian Islam ilmiah menghadirkan asatidzah untuk membina akidah masyarakat.",
  },
];

function ActivityCard({ activity }: { activity: ActivityItem }) {
  return (
    <div className="relative h-[400px] rounded-2xl overflow-hidden group">
      <Image
        src={activity.image}
        alt={activity.alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-[1]" />
      <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-[2] flex flex-col justify-end">
        <Badge className="mb-3 w-fit">{activity.label}</Badge>
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-[-1px] mb-3 text-white">
          {activity.title}
        </h3>
        <p className="text-sm sm:text-base text-white/80 leading-relaxed">
          {activity.description}
        </p>
      </div>
    </div>
  );
}

export default function ActivitiesSection() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-[-2px] text-text-heading mb-6 max-w-[900px]">
            Kegiatan rutin kami untuk menebar{" "}
            <span className="text-primary italic font-medium">kebaikan</span> di{" "}
            Tulungagung
          </h2>
          <p className="text-lg text-text-light max-w-[600px]">
            Mewujudkan kepedulian nyata melalui berbagai program dakwah dan sosial
            yang berkelanjutan.
          </p>
        </div>

        {/* Static Grid (instead of infinite scroll) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {ACTIVITIES.map((activity, i) => (
            <ActivityCard key={`${activity.title}-${i}`} activity={activity} />
          ))}
        </div>
      </div>
    </section>
  );
}
