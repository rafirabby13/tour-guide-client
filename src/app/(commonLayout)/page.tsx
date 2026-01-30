// export const dynamic = "force-dynamic"; // <--- ADD THIS
import BentoGrid from "@/components/modules/home/BentoGrid";
import Categories from "@/components/modules/home/Categories";
import HeroSection from "@/components/modules/home/HeroSection";
import HowItWorks from "@/components/modules/home/HowItWorks";
import PopularTrips from "@/components/modules/home/PopularTrips";
import TopRatedGuides from "@/components/modules/home/TopRatedGuides";
import WhyChooseUs from "@/components/modules/home/WhyChooseUs";
import SectionLoader from "@/components/shared/loader/SectionLoader";
import { Suspense } from "react";

export const revalidate = 600;
export default function Home() {

  return (
    <div>
      <div className="min-h-screen bg-background">

        <HeroSection />
        <HowItWorks />
        {/* <PopularTrips /> */}
        {/* <TopRatedGuides /> */}
        <Suspense fallback={<SectionLoader />}>
          <PopularTrips />
        </Suspense>


        <Suspense fallback={<SectionLoader />}>
          <TopRatedGuides />
        </Suspense>
        <Categories />
        <WhyChooseUs />
        <BentoGrid />
      </div>
    </div>
  );
}
