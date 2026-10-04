import AboutSection from "./components/AboutSection/AboutSection";
import AccreditationSection from "./components/AccreditationSection/AccreditationSection";
import AmbassadorSection from "./components/AmbassadorSection/AmbassadorSection";
import ApprenticeshipsBanner from "./components/ApprenticeshipsBanner/ApprenticeshipsBanner";
import BannerSection from "./components/BannerSection/BannerSection";
import CipsCoursesBanner from "./components/BannerSection/CipsCoursesBanner";
import CampusSection from "./components/CampusSection/CampusSection";
import CipsNavigation from "./components/CipsNavigation/CipsNavigation";
import CourseCurriculumSection from "./components/CourseCurriculumSection/CourseCurriculumSection";
import CipsCoursesHome from "./components/CoursesSection/CoursesSection";
import CTASection from "./components/CTASection/CTASection";
import DemoClassSection from "./components/DemoClassSection/DemoClassSection";
import FaqSection from "./components/FaqSection/FaqSection";
import GallerySection from "./components/GallerySection/GallerySection";
import GlobalPresence from "./components/GlobalPresence/GlobalPresence";
import GlobalReachSection from "./components/GlobalReachSection/GlobalReachSection";
import WhyChooseCips from "./components/WhyChooseCips/WhyChooseCips";

export default function Home() {
  return (
    <main className="space-y-24 pb-12 md:pb-16 min-h-screen">
      <BannerSection />
      {/* <HeroSection/> */}
      <CipsNavigation />
      <WhyChooseCips />
      <div>
        <CipsCoursesHome />
        <AboutSection />
        <AccreditationSection />
      </div>
      {/* <CampusSection/> */}
      <DemoClassSection/>
      <GlobalReachSection />
      <CourseCurriculumSection/>
      <AmbassadorSection />
      <FaqSection />
      {/* <GallerySection/> */}
      {/* <CipsCoursesBanner />
      <ApprenticeshipsBanner/>
      <GlobalPresence /> */}
      {/* <CTASection/> */}
    </main>
  );
}
