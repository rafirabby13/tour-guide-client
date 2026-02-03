// export const dynamic = "force-dynamic"; // <--- ADD THIS
// import BentoGrid from "@/components/modules/home/BentoGrid";
import HeroSection from "@/components/modules/home/HeroSection";
import HowItWorks from "@/components/modules/home/HowItWorks";

// import WhyChooseUs from "@/components/modules/home/WhyChooseUs";
import SectionLoader from "@/components/shared/loader/SectionLoader";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const PopularTrips = dynamic(() => import("@/components/modules/home/PopularTrips"), {
  loading: () => <SectionLoader />,
  ssr: true
});
const TopRatedGuides = dynamic(() => import("@/components/modules/home/TopRatedGuides"), {
  loading: () => <SectionLoader />,
  ssr: true
});
const Categories = dynamic(() => import("@/components/modules/home/Categories"), {
  loading: () => <SectionLoader />,
});
const WhyChooseUs = dynamic(() => import("@/components/modules/home/WhyChooseUs"));

const BentoGrid = dynamic(() => import("@/components/modules/home/BentoGrid"), {
  loading: () => <SectionLoader />,
});

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
        <Suspense fallback={<SectionLoader />}>
          <BentoGrid />
        </Suspense>
      </div>
    </div>
  );
}
