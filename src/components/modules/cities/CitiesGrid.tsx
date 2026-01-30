/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { getPopularDestinations } from '@/services/commmon/getPopularDestination';

export default async function CitiesGrid() {
  const { data: popularDestinations } = await getPopularDestinations();
  const cities = popularDestinations?.length > 0 ? popularDestinations : [];

  if (cities.length === 0) return <div className="text-center">No cities found.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {cities.map((city: any) => (
        <Link 
          key={city.id} 
          href={`/tours?searchTerm=${city.name}`} 
          className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer"
        >
          <Image 
            src={city.image} 
            alt={city.name}
            fill
            // ⚡ PERFORMANCE FIX: 
            // "sizes" tells the browser: "On mobile this is 100vw, on desktop it's only 33vw"
            // This prevents downloading massive 4k images for small cards.
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* ... Rest of your card overlay code ... */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />
           <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-slate-300 text-sm font-medium mb-1 flex items-center gap-1 uppercase tracking-wider">
                      <MapPin className="w-3 h-3" /> {city.country}
                    </p>
                    <h3 className="text-3xl font-bold text-white mb-2">{city.name}</h3>
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium text-white border border-white/10">
                      {city.count} Tours Available
                    </span>
                  </div>
                  
                  {/* Floating Arrow Button */}
                  <div className="w-12 h-12 rounded-full bg-white text-slate-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
        </Link>
      ))}
    </div>
  );
}