import ApprenticeshipsBanner from "./components/ApprenticeshipsBanner/ApprenticeshipsBanner";
import BannerSection from "./components/BannerSection/BannerSection";
import CipsCoursesBanner from "./components/BannerSection/CipsCoursesBanner";
import CipsNavigation from "./components/CipsNavigation/CipsNavigation";
import CTASection from "./components/CTASection/CTASection";
import GlobalPresence from "./components/GlobalPresence/GlobalPresence";

export default function Home() {
  return (
    <main className="space-y-24 min-h-screen mb-24">
      <BannerSection />
      {/* <HeroSection/> */}
      <CipsNavigation/>
      <CipsCoursesBanner />
      <ApprenticeshipsBanner/>
      <GlobalPresence />
      <CTASection/>
    </main>
  );
}
