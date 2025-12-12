"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Image from "next/image"
import { MapPin, Search, Star, Users, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = React.useState("")
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  )

  const slides = [
    { id: 1, src: "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?_gl=1*1bximr5*_ga*MTg1Nzg1OTAuMTc2NDAxMDA3NA..*_ga_8JE65Q40S6*czE3NjU1Njc1ODckbzEwJGcxJHQxNzY1NTY3NjAwJGo0NyRsMCRoMA..", alt: "Explore Mountains" },
    { id: 2, src: "https://images.pexels.com/photos/417344/pexels-photo-417344.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "City Tours" },
    { id: 3, src: "https://images.pexels.com/photos/815880/pexels-photo-815880.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Food Adventures" },
  ]

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/tours?searchTerm=${query}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    // CHANGED: Use min-h-screen or vh units for better mobile coverage
    <div className="relative w-full min-h-[75vh] md:h-[550px] lg:h-[650px] flex flex-col overflow-hidden">

      {/* Background Carousel */}
      <Carousel
        plugins={[plugin.current]}
        className="absolute inset-0 w-full h-full z-0"
        opts={{ loop: true }}
      >
        <CarouselContent className="h-full ml-0"> {/* ml-0 fixes potential embla gap issues */}
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="relative h-full pl-0">
              <Image
                src={slide.src}
                alt={slide.alt}
                width={3600}
                height={100}
                // layout="fill"
                unoptimized
                priority={slide.id === 1}
                className="object-cover pointer-events-none"
              />
              {/* Dark overlay - Increased opacity slightly for mobile readability */}
              <div className="absolute inset-0 bg-black/50 md:bg-black/35" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      
      <div className="relative z-10 flex-grow flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl space-y-6 md:space-y-8 animate-in fade-in zoom-in duration-700 slide-in-from-bottom-4">

          {/* Heading - CHANGED: Massive size adjustments for mobile */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white drop-shadow-xl leading-tight">
            Discover Your City Through
            <br className="hidden md:block" />
            <span className="block mt-2 md:mt-0 bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-emerald-400">
              Local Eyes
            </span>
          </h1>

          {/* Subtext - CHANGED: Visible on mobile now, just smaller */}
          <p className="text-base sm:text-lg md:text-xl text-gray-100 max-w-xl md:max-w-2xl mx-auto drop-shadow-md leading-relaxed">
            Connect with passionate local guides for authentic experiences. 
            <span className="hidden sm:inline"> Explore like a local, not just a tourist.</span>
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto w-full pt-4">
            <div className="flex flex-col sm:flex-row gap-3 p-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-2xl">

              {/* Input Wrapper */}
              <div className="flex-1 flex items-center gap-3 px-4 bg-white rounded-xl h-12 sm:h-14 transition-transform focus-within:scale-[1.01]">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0" />
                <Input
                  type="text"
                  placeholder="Where to? (e.g. Tokyo)"
                  className="border-none shadow-none focus-visible:ring-0 text-base h-full placeholder:text-muted-foreground/70 px-0 w-full"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>

              {/* Button - CHANGED: Full width on mobile */}
              <Button
                size="lg"
                className="w-full sm:w-auto h-12 sm:h-14 px-8 text-base font-semibold shadow-lg rounded-xl bg-primary hover:bg-primary/90 transition-all active:scale-95"
                onClick={handleSearch}
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>

          {/* Stats - CHANGED: Visible on mobile, flex-wrap for small screens */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-xs sm:text-sm font-medium text-white/90 pt-6">
            
            <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 md:px-4 md:py-2 rounded-full backdrop-blur-sm border border-white/10">
              <Users className="h-3 w-3 md:h-4 md:w-4 text-emerald-400" />
              <span>1k+ Guides</span>
            </div>
            
            <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 md:px-4 md:py-2 rounded-full backdrop-blur-sm border border-white/10">
              <MapPin className="h-3 w-3 md:h-4 md:w-4 text-emerald-400" />
              <span>50+ Cities</span>
            </div>
            
            <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 md:px-4 md:py-2 rounded-full backdrop-blur-sm border border-white/10">
              <Star className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 fill-yellow-400" />
              <span>4.9/5 Rating</span>
            </div>

          </div>

        </div>
      </div>

      {/* Decorative Gradient at bottom for smooth transition to next section */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" /> */}

    </div>
  )
}