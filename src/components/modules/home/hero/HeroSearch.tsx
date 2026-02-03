"use client"

import { useState, KeyboardEvent } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (term?: string) => {
    const searchTerm = term || query;
    if (searchTerm.trim()) {
      router.push(`/tours?searchTerm=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
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
          onClick={() => handleSearch()}
          size="icon"
          className="h-12 w-12 sm:w-auto sm:h-12 sm:px-8 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white border-0 transition-transform active:scale-95 shadow-lg shadow-emerald-500/25"
        >
          <Search className="h-5 w-5 sm:mr-2" />
          <span className="hidden sm:inline font-semibold">Explore</span>
        </Button>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-white/70 font-medium animate-in fade-in duration-1000 delay-300">
        <span className="opacity-60">Trending:</span>
        {["Old Dhaka", "Sylhet", "Sundarban"].map((city) => (
           <button 
             key={city}
             // eslint-disable-next-line react/jsx-no-bind
             onClick={() => handleSearch(city)} 
             className="hover:text-white transition-colors hover:underline underline-offset-4 decoration-emerald-400"
           >
             {city}
           </button>
        ))}
      </div>
    </div>
  )
}