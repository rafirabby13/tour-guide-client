import Categories from "@/components/modules/home/Categories";
import HeroSection from "@/components/modules/home/HeroSection";
import HowItWorks from "@/components/modules/home/HowItWorks";
import PopularTrips from "@/components/modules/home/PopularTrips";
import Testimonials from "@/components/modules/home/Testimonials";
import TopRatedGuides from "@/components/modules/home/TopRatedGuides";
import WhyChooseUs from "@/components/modules/home/WhyChooseUs";

export default function Home() {
  return (
    <div>
      <div className="min-h-screen bg-background">
      {/* <HeroSection /> */}
      <HeroSection/>
      <HowItWorks />
      <PopularTrips />
      <TopRatedGuides />
      <Categories />
      <WhyChooseUs />
      <Testimonials />
    </div>
    </div>
  );
}
