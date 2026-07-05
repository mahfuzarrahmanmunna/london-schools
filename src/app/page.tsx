import ApprenticeshipsBanner from "./components/ApprenticeshipsBanner/ApprenticeshipsBanner";
import BannerSection from "./components/BannerSection/BannerSection";
import CipsCoursesBanner from "./components/BannerSection/CipsCoursesBanner";

export default function Home() {
  return (
    <main className="space-y-24 min-h-screen mb-24">
      <BannerSection />
      <CipsCoursesBanner />
      <ApprenticeshipsBanner/>
    </main>
  );
}
