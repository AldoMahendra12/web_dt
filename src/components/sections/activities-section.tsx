import Image from "next/image";
import Badge from "@/components/ui/badge";
import type { ActivityItem } from "@/types";

/* =========================================
   ActivitiesSection — Static Grid
   ─────────────────────────────────────
   7 kegiatan dengan foto nyata dari
   folder /activities dan /assets
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
    image: "/activities/safari.jpg",
    alt: "Safari Dakwah",
    label: "Edukasi Islami",
    title: "Safari Dakwah",
    description:
      "Rangkaian kajian menghadirkan asatidzah dari luar daerah untuk menyapa jamaah di Tulungagung.",
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
    image: "/assets/safari-dakwah.jpeg",
    alt: "Safari Dakwah Intensif",
    label: "Kajian Intensif",
    title: "Safari Dakwah Intensif",
    description:
      "Kunjungan dakwah terjadwal ke berbagai lokasi agar ilmu agama menjangkau seluruh pelosok.",
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

        {/* Grid — 3 kolom, 3 baris (total 7 kartu + 1 span) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Kartu 1-3 */}
          {ACTIVITIES.slice(0, 3).map((activity, i) => (
            <ActivityCard key={`${activity.title}-${i}`} activity={activity} />
          ))}

          {/* Kartu 4: Live Kajian — span 2 kolom (featured) */}
          <div className="lg:col-span-2">
            <ActivityCard activity={ACTIVITIES[3]} />
          </div>

          {/* Kartu 5: Pelatihan */}
          <ActivityCard key={ACTIVITIES[4].title} activity={ACTIVITIES[4]} />

          {/* Kartu 6: Safari Dakwah */}
          <ActivityCard key={ACTIVITIES[5].title} activity={ACTIVITIES[5]} />

          {/* Kartu 7: Jumat Berkah — span 2 kolom (featured) */}
          <div className="lg:col-span-2">
            <ActivityCard activity={ACTIVITIES[6]} />
          </div>
        </div>
      </div>
    </section>
  );
}
