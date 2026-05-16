import Card from "@/components/ui/card";
import type { FeatureItem } from "@/types";

/* =========================================
   FeaturesSection — Section Component
   Matches homepage .features-section
   3-column grid: Inspirasi, Informasi, Solusi
   ========================================= */

const FEATURES: FeatureItem[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      </svg>
    ),
    title: "Inspirasi",
    description:
      "Menyajikan konten yang menggugah jiwa dan memperkuat iman melalui kisah hikmah dan teladan Islami.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
    title: "Informasi",
    description:
      "Update kegiatan kajian, jadwal ustadz, dan berita terkini seputar dunia Islam di Tulungagung dan sekitarnya.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: "Solusi Islami",
    description:
      "Menjawab problematika umat dengan panduan syariat yang relevan untuk menghadapi tantangan zaman modern.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-[60px] sm:py-[100px] bg-white">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Section Header */}
        <div className="text-center max-w-[800px] mx-auto mb-[60px]">
          <h2 className="text-[32px] sm:text-5xl font-extrabold tracking-[-1.5px] mb-5 text-text-heading">
            Inspirasi, Informasi <span className="italic font-semibold">&amp; Solusi</span>
          </h2>
          <p className="text-lg text-text-light leading-relaxed">
            Membangun ummat dengan nilai-nilai Islami yang moderat, akurat, dan
            memberikan solusi nyata bagi kehidupan sehari-hari.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-[30px]">
          {FEATURES.map((feature) => (
            <Card key={feature.title}>
              {/* Icon */}
              <div className="mb-[25px]">
                <div className="w-[50px] h-[50px] bg-primary-10 text-primary rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-[15px] tracking-[-0.5px] text-text-heading">
                {feature.title}
              </h3>
              <p className="text-text-light leading-relaxed text-base">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
