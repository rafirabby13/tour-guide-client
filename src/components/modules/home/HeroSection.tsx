"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Image from "next/image"
import { MapPin, Search, Star, Users } from "lucide-react"
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
    { id: 1, src: "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Explore Mountains" },
    { id: 2, src: "https://images.pexels.com/photos/417344/pexels-photo-417344.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "City Tours" },
    { id: 3, src: "https://images.pexels.com/photos/815880/pexels-photo-815880.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Food Adventures" },
  ]
const handleSearch = () => {
    if (query.trim()) {
      // Redirect to the tours page with the search query
      router.push(`/tours?searchTerm=${query}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">

      {/* Background Carousel */}
      <Carousel
        plugins={[plugin.current]}
        className="absolute inset-0 w-full h-full z-0"
        opts={{ loop: true }}
      >
        <CarouselContent className="h-full">
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="relative h-full">
              <Image
                src={slide.src}
                alt={slide.alt}
                width={2000}
                height={100}
                priority={slide.id === 1}
                className="object-cover"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/45" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

     
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <div className="max-w-5xl space-y-8 animate-in fade-in zoom-in duration-700 slide-in-from-bottom-4">

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-xl">
            Discover Your City Through
            <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-secondary to-emerald-400">
              Local Eyes
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto drop-shadow-md">
            Connect with passionate local guides for authentic, personalized experiences.
            Explore like a local, not a tourist.
          </p>

          {/* Search Bar */}
         <div className="max-w-2xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row gap-2 p-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-xl shadow-xl">

              <div className="flex-1 flex items-center gap-3 px-4 bg-white rounded-lg h-12 sm:h-14">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0" />
                <Input
                  type="text"
                  placeholder="Where are you going? (e.g. Kyoto, Food Tour)"
                  className="border-none shadow-none focus-visible:ring-0 text-base h-full placeholder:text-muted-foreground/70"
                  // ✅ Bind State
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>

              <Button
                size="lg"
                className="h-12 sm:h-14 px-8 text-lg font-medium shadow-lg"
                // ✅ Bind Click
                onClick={handleSearch}
              >
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-white/90 pt-4">
            <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
              <Users className="h-4 w-4 text-accent" />
              <span>1000+ Guides</span>
            </div>
            <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
              <MapPin className="h-4 w-4 text-accent" />
              <span>50+ Cities</span>
            </div>
            <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
              <Star className="h-4 w-4 text-accent fill-accent" />
              <span>4.9 Rating</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
