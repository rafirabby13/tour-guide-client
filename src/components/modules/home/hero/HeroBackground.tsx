"use client"

import { useRef } from "react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { HERO_SLIDES } from "./hero-data"

interface HeroBackgroundProps {
  setApi: (api: CarouselApi) => void;
  currentIndex: number;
}

export function HeroBackground({ setApi, currentIndex }: HeroBackgroundProps) {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  console.log(HERO_SLIDES[0].src)

  return (
    <Carousel
      setApi={setApi}
      plugins={[plugin.current]}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      opts={{ loop: true, duration: 60 }}
    >
      <CarouselContent className="h-full ml-0">
        {HERO_SLIDES.map((slide, index) => (
          <CarouselItem key={slide.id} className="relative h-full pl-0">
            <div className={cn(
              "relative w-full h-full transition-transform duration-10000 ease-linear",
              currentIndex === index + 1 ? "scale-110" : "scale-100"
            )}>
              <Image
                src={slide.src}
                alt={slide.alt}
                height={1000}
                width={2000}
                priority={index === 0} 
                className="object-cover opacity-90"
              />
            </div>
            {/* Overlays */}
            <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/90" />
            <div className="absolute inset-0 bg-black/40" /> 
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}