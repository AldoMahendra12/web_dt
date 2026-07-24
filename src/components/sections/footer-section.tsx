import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/button";
import type { FooterColumn, SocialLink } from "@/types";

/* =========================================
   FooterSection — Section Component
   Matches homepage .footer exactly
   Dark card with logo, links grid, socials
   ========================================= */

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Program",
    links: [
      { label: "Dakwah", href: "#" },
      { label: "Sosial", href: "#" },
      { label: "Pendidikan", href: "#" },
      { label: "Wakaf", href: "#" },
    ],
  },
  {
    title: "Bantuan",
    links: [
      { label: "FAQ", href: "#" },
      { label: "Privasi", href: "#" },
      { label: "Akses", href: "#" },
      { label: "Kontak", href: "#" },
    ],
  },
  {
    title: "Organisasi",
    links: [
      { label: "Tentang", href: "/tentang" },
      { label: "Laporan", href: "/laporan" },
      { label: "Artikel", href: "/artikel" },
      { label: "Kegiatan", href: "#" },
      { label: "Donasi", href: "#" },
    ],
  },
];

// Custom Icons to avoid Lucide import issues
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.46-5.58z" /><polyline points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const SOCIAL_LINKS = [
  { platform: "Instagram", href: "https://www.instagram.com/dakwahtulungagung/", icon: <InstagramIcon className="w-4 h-4" /> },
  { platform: "Facebook",  href: "https://web.facebook.com/dakwahtulungagung",   icon: <FacebookIcon  className="w-4 h-4" /> },
  { platform: "YouTube",   href: "https://www.youtube.com/@DakwahTulungagung",   icon: <YoutubeIcon   className="w-4 h-4" /> },
  { platform: "TikTok",    href: "https://www.tiktok.com/@dakwahtulungaung",     icon: <TikTokIcon    className="w-4 h-4" /> },
];

export default function FooterSection() {
  return (
    <footer className="pt-5 pb-[60px] bg-white">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="bg-bg-dark rounded-md p-[40px_20px] sm:p-[70px_80px] text-white">
          {/* Top: Brand + Links */}
          <div className="flex flex-col lg:flex-row justify-between items-start mb-[50px] gap-10 lg:gap-[40px]">
            {/* Brand */}
            <div className="flex-1">
              <div className="mb-5">
                <Image
                  src="/logo.png"
                  alt="Dakwah Tulungagung"
                  width={150}
                  height={55}
                  className="h-[55px] w-auto brightness-0 invert"
                />
              </div>
              <p className="text-lg font-medium text-white leading-snug max-w-[250px]">
                Inspirasi, Informasi &amp;<br />
                Solusi Islami untuk Umat.
              </p>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-10 lg:gap-[40px] lg:justify-end w-full lg:w-auto lg:ml-auto">
              {FOOTER_COLUMNS.map((col) => (
                <div key={col.title} className="min-w-[120px]">
                  <h4 className="text-base font-bold mb-[25px] text-white tracking-[0.5px]">
                    {col.title}
                  </h4>
                  <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-white/60 text-sm transition-colors duration-300 hover:text-white whitespace-nowrap"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 mb-10" />

          {/* Bottom: Copyright + Socials */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-10 text-center sm:text-left">
            <div>
              <p className="text-xs text-white/50 leading-relaxed">
                © Dakwah Tulungagung 2024
                <br />
                All Rights Reserved.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              {SOCIAL_LINKS.map((social) => (
                <Button
                  key={social.platform}
                  href={social.href}
                  variant="ghost"
                  className="text-xs justify-center px-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                  {social.platform}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
