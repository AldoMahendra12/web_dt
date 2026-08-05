import { Metadata } from "next";
import NavBar from "@/components/sections/nav-bar";
import FooterSection from "@/components/sections/footer-section";
import EventsPageClient from "@/components/sections/events/EventsPageClient";

export const metadata: Metadata = {
  title: "Events & Kajian - Dakwah Tulungagung",
  description:
    "Temukan jadwal kajian, event, dan kegiatan Islam terbaru dari Dakwah Tulungagung. Daftar dan ikuti kajian bersama kami.",
};

export default function EventsPage() {
  return (
    <div className="bg-bg-light min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        <EventsPageClient />
      </main>
      <FooterSection />
    </div>
  );
}
