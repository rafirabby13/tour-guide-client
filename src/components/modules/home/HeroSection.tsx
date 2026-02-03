"use client"

import { useState, useEffect } from "react"
import { type CarouselApi } from "@/components/ui/carousel"
import { Globe, Star } from "lucide-react"
import { HeroSearch } from "./hero/HeroSearch"
import { HERO_SLIDES } from "./hero/hero-data"
import { HeroBackground } from "./hero/HeroBackground"


export default function HeroSection() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

// Sync Carousel State
  useEffect(() => {
    if (!api) return

    // 1. Define the handler (reads directly from api, doesn't need 'current' state)
    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1)
    }

    // 2. Run immediately to set initial state
    handleSelect()

    // 3. Subscribe to Embla events
    api.on("select", handleSelect)
    api.on("reInit", handleSelect) // Handle window resizing/refreshes

    // 4. Cleanup listener on unmount
    return () => {
      api.off("select", handleSelect)
      api.off("reInit", handleSelect)
    }
  }, [api]) // <--- CRITICAL: Dependency array must ONLY contain [api]
  return (
    <div className="relative w-full min-h-[85vh] flex flex-col overflow-hidden group">
      
      {/* 1. Background Layer */}
      <HeroBackground setApi={setApi} currentIndex={current} />

      {/* 2. Content Layer */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 flex-grow flex flex-col items-center justify-center py-20 pb-32 md:pb-40">
        
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-700">
          <Globe className="h-3.5 w-3.5 text-emerald-400" />
          <span className="tracking-wide uppercase text-[10px] sm:text-xs">The World Awaits</span>
        </div>

        {/* Text */}
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

        {/* Search Component */}
        <HeroSearch />
      </div>

      {/* 3. Bottom Stats Layer (Inline here or extract if it grows) */}
      <HeroStatsBar current={current} total={HERO_SLIDES.length} />
    </div>
  )
}

// Simple internal component for the stats bar to keep main clean
function HeroStatsBar({ current, total }: { current: number, total: number }) {
  return (
    <div className="absolute bottom-0 left-0 w-full z-30 border-t border-white/10 bg-black/40 backdrop-blur-md hidden md:block">
      <div className="container mx-auto px-6 py-6 flex justify-between items-center text-white/90">
        <div className="flex gap-12 text-sm font-medium tracking-wide">
          <div className="flex items-center gap-3">
             <Star className="h-4 w-4 text-emerald-400 fill-emerald-400" />
             <span>Rated 4.9/5 by Travelers</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-xs tracking-widest uppercase text-white/50 font-mono">
            0{current} / 0{total}
          </span>
          <div className="w-24 h-0.5 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 transition-all duration-500 ease-out"
              style={{ width: `${(current / total) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}