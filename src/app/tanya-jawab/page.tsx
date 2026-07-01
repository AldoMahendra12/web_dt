import { Metadata } from "next";
import NavBar from "@/components/sections/nav-bar";
import FooterSection from "@/components/sections/footer-section";
import TanyaJawabSection from "@/components/sections/tanya-jawab/TanyaJawabSection";

export const metadata: Metadata = {
  title: "Tanya Jawab Asatidz - Dakwah Tulungagung",
  description:
    "Kumpulan tanya jawab islami seputar kehidupan sehari-hari oleh Ustadz Moh. Shohibul Umam, Lc., M.Pd. dari Dakwah Tulungagung.",
};

export default function TanyaJawabPage() {
  return (
    <>
      <NavBar />
      <main>
        <TanyaJawabSection />
      </main>
      <FooterSection />
    </>
  );
}
