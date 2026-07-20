import ApprenticeshipsBanner from "./components/ApprenticeshipsBanner/ApprenticeshipsBanner";
import BannerSection from "./components/BannerSection/BannerSection";
import CipsCoursesBanner from "./components/BannerSection/CipsCoursesBanner";
import CipsNavigation from "./components/CipsNavigation/CipsNavigation";
import CipsCoursesHome from "./components/CoursesSection/CoursesSection";
import CTASection from "./components/CTASection/CTASection";
import GlobalPresence from "./components/GlobalPresence/GlobalPresence";
import WhyChooseCips from "./components/WhyChooseCips/WhyChooseCips";

export default function Home() {
  return (
    <main className="space-y-24 min-h-screen">
      <BannerSection />
      {/* <HeroSection/> */}
      <CipsNavigation/>
      <WhyChooseCips/>
      <CipsCoursesHome/>
      {/* <CipsCoursesBanner />
      <ApprenticeshipsBanner/>
      <GlobalPresence /> */}
      <CTASection/>
    </main>
  );
}
