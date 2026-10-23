import NavBar from "@/components/sections/nav-bar";
import HeroSection from "@/components/sections/hero-section";
import FeaturesSection from "@/components/sections/features-section";
import ActivitiesSection from "@/components/sections/activities-section";
import AchievementsSection from "@/components/sections/achievements-section";
import VideoSection from "@/components/sections/video-section";
import HadithSection from "@/components/sections/hadith-section";
import FooterSection from "@/components/sections/footer-section";

/* =========================================
   Homepage — Dakwah Tulungagung Official
   Assembles all section components in the
   exact order from the original homepage.
   ========================================= */

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <ActivitiesSection />
        <AchievementsSection />
        <VideoSection />
        <HadithSection />
      </main>
      <FooterSection />
    </>
  );
}
