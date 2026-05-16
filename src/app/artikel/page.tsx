import { Metadata } from "next";
import NavBar from "@/components/sections/nav-bar";
import FooterSection from "@/components/sections/footer-section";
import ArtikelPageClient from "@/components/sections/artikel/ArtikelPageClient";

export const metadata: Metadata = {
  title: "Artikel & Inspirasi - Dakwah Tulungagung",
  description:
    "Temukan artikel, berita, inspirasi, dan tanya jawab keislaman terbaru dari Dakwah Tulungagung.",
};

export default function ArtikelPage() {
  return (
    <>
      <NavBar />
      <ArtikelPageClient />
      <FooterSection />
    </>
  );
}
