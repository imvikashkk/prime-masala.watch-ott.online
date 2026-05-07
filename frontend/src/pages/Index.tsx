import Topbar from "@/components/Topbar";
import AppHeader from "@/components/AppHeader";
import ScreenshotCarousel from "@/components/ScreenshotCarousel";
import WhatsNew from "@/components/WhatsNew";
import AboutSection from "@/components/AboutSection";
import PrivacyCard from "@/components/PrivacyCard";
import RatingOverview from "@/components/RatingOverview";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Topbar />
      <div className="max-w-[960px] mx-auto px-4 md:px-12 pt-8 pb-20">
        <AppHeader />
        <ScreenshotCarousel />
        <WhatsNew />
        <AboutSection />
        <PrivacyCard />
        <RatingOverview />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
