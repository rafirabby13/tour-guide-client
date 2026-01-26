

"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import Image from "next/image"
import { MapPin, Search, Star, Globe } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

export default function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = React.useState("")
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  // Autoplay plugin configuration
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  )

  const slides = [
    { 
      id: 1, 
      src: "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg", 
      alt: "Explore Mountains",
    },
    { 
      id: 2, 
      src: "https://images.pexels.com/photos/417344/pexels-photo-417344.jpeg", 
      alt: "City Tours",
    },
    { 
      id: 3, 
      src: "https://images.pexels.com/photos/815880/pexels-photo-815880.jpeg", 
      alt: "Food Adventures",
    },
  ]

  // Track carousel state
  React.useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap() + 1)
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/tours?searchTerm=${query}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };


  return (
    // PARENT CONTAINER: Defines the height of the whole section
    <div className="relative w-full min-h-[65vh] flex flex-col overflow-hidden  group">

      {/* --- LAYER 1: CINEMATIC BACKGROUND (Z-0) --- */}
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none" // pointer-events-none prevents blocking clicks
        opts={{ loop: true, duration: 60 }}
      >
        <CarouselContent className="h-full ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id} className="relative h-full pl-0">
              <div className={cn(
                "relative w-full h-full transition-transform duration-[10000ms] ease-linear",
                current === index + 1 ? "scale-110" : "scale-100"
              )}>
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  height={1700}
                  width={2000}
                  priority={index === 0}
                  className="object-cover opacity-90"
                />
              </div>
              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
              <div className="absolute inset-0 bg-black/40" /> 
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* --- LAYER 2: MAIN CONTENT (Z-20) --- */}
      {/* Added pb-32 to prevent collision with bottom bar */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 flex-grow flex flex-col items-center justify-center py-20 pb-32 md:pb-40">
        
        {/* Animated Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-700">
          <Globe className="h-3.5 w-3.5 text-emerald-400" />
          <span className="tracking-wide uppercase text-[10px] sm:text-xs">The World Awaits</span>
        </div>

        {/* Headline */}
        <div className="text-center max-w-5xl space-y-6 mb-12 animate-in fade-in zoom-in-95 duration-1000 delay-100">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white drop-shadow-2xl leading-[0.95]">
            Curated Tours for
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-white to-teal-200 font-serif italic pr-2">
              The Modern Explorer
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
            Connect with expert local guides. Uncover hidden gems. Experience the authentic soul of the city.
          </p>
        </div>

        {/* Search Bar Container */}
        <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <div className="group/search relative flex items-center p-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl transition-all duration-300 hover:bg-white/15 hover:border-white/30">
            
            <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white ml-1">
              <MapPin className="h-5 w-5" />
            </div>

            <Input 
              className="flex-1 h-12 sm:h-14 bg-transparent border-none text-white placeholder:text-white/70 focus-visible:ring-0 text-base sm:text-lg px-4 sm:px-6"
              placeholder="Where is your next adventure?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <Button 
              onClick={handleSearch}
              size="icon"
              className="h-12 w-12 sm:w-auto sm:h-12 sm:px-8 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white border-0 transition-transform active:scale-95 shadow-lg shadow-emerald-500/25"
            >
              <Search className="h-5 w-5 sm:mr-2" />
              <span className="hidden sm:inline font-semibold">Explore</span>
            </Button>
          </div>

          {/* Trending Tags */}
          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-white/70 font-medium animate-in fade-in duration-1000 delay-300">
            <span className="opacity-60">Trending:</span>
            <button onClick={() => {setQuery("Kyoto"); handleSearch()}} className="hover:text-white transition-colors hover:underline underline-offset-4 decoration-emerald-400">Kyoto</button>
            <button onClick={() => {setQuery("Reykjavik"); handleSearch()}} className="hover:text-white transition-colors hover:underline underline-offset-4 decoration-emerald-400">Reykjavik</button>
            <button onClick={() => {setQuery("Marrakech"); handleSearch()}} className="hover:text-white transition-colors hover:underline underline-offset-4 decoration-emerald-400">Marrakech</button>
          </div>
        </div>
      </div>

      {/* --- LAYER 3: BOTTOM STATS BAR (Z-30) --- */}
      <div className="absolute bottom-0 left-0 w-full z-30 border-t border-white/10 bg-black/40 backdrop-blur-md hidden md:block">
        <div className="container mx-auto px-6 py-6 flex justify-between items-center text-white/90">
          
          <div className="flex gap-12 text-sm font-medium tracking-wide">
            <div className="flex items-center gap-3 group/stat cursor-default">
              <div className="p-1.5 rounded-full bg-white/10 group-hover/stat:bg-emerald-500/20 transition-colors">
                <Star className="h-4 w-4 text-emerald-400 fill-emerald-400" />
              </div>
              <span className="opacity-90">Rated 4.9/5 by Travelers</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[1,2,3].map(i => (
                  <div key={i} className="h-8 w-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 border-2 border-black/50" /> 
                ))}
              </div>
              <span className="opacity-90 pl-1">10k+ Happy Explorers</span>
            </div>
          </div>
          
          {/* Progress Indicator */}
          <div className="flex items-center gap-4">
            <span className="text-xs tracking-widest uppercase text-white/50 font-mono">
              0{current} / 0{slides.length}
            </span>
            <div className="w-24 h-0.5 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 transition-all duration-500 ease-out"
                style={{ width: `${(current / slides.length) * 100}%` }}
              />
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}