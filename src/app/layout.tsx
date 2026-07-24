import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Amiri } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/ui/lenis-provider";
import DonasiProvider from "@/components/ui/donasi-provider";
import TanyaProvider from "@/components/ui/tanya-provider";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://dakwahtulungagung.vercel.app'),
  title: "Dakwah Tulungagung - Inspirasi, Informasi & Solusi Islami",
  description:
    "Membangun ummat dengan nilai-nilai Islami yang moderat, akurat, dan memberikan solusi nyata bagi kehidupan sehari-hari di Tulungagung dan sekitarnya.",
  keywords: ["Dakwah", "Tulungagung", "Kajian", "Islam", "Artikel Islami", "Jadwal Kajian", "Tanya Jawab Agama"],
  openGraph: {
    title: "Dakwah Tulungagung",
    description: "Inspirasi, Informasi & Solusi Islami di Tulungagung dan sekitarnya.",
    url: "/",
    siteName: "Dakwah Tulungagung",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dakwah Tulungagung",
    description: "Inspirasi, Informasi & Solusi Islami di Tulungagung dan sekitarnya.",
  },
  icons: {
    icon: "/favicon-square.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} ${amiri.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <DonasiProvider>
          <TanyaProvider>
            <LenisProvider>{children}</LenisProvider>
          </TanyaProvider>
        </DonasiProvider>
      </body>
    </html>
  );
}

