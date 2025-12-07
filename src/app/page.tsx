import LandingPagePreview from "@/components/modules/home/FeaturedDestinations";
import FeaturedDestinations from "@/components/modules/home/FeaturedDestinations";
import HeroSection from "@/components/modules/home/HeroSection";
import HowItWorks from "@/components/modules/home/HowItWorks";
import Navbar from "@/components/modules/home/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <LandingPagePreview/>
    </div>
  );
}
