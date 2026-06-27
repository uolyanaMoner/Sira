import MainLayout from "../layouts/MainLayout";
import HeroCard from "../components/Hero";
import CardSection from "../components/CardSection";
import ContinueReadingButton from "./ContinueReadingButton";
import AchievementSlider from "./AchievmentSlider";
import BadgeSection from "./BadgeSection";
import DayExplorer from "../components/DayExplorer";
import Footer from "../components/Footer";
import FloatingAIButton from "./AIButton";

export default function Home() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-[#2c2c2c] via-[#3a3325] to-[#c6a96b]">
        <HeroCard />
        <AchievementSlider />
        <BadgeSection />
        <ContinueReadingButton />
        <CardSection />
        <DayExplorer />
        <FloatingAIButton />
        <Footer />
      </div>
    </MainLayout>
  );
}