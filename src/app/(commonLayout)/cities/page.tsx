import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowUpRight } from 'lucide-react';
import SectionHeader from '@/components/shared/home/SectionHeader';
import { Button } from '@/components/ui/button';
import { getPopularDestinations } from '@/services/commmon/getPopularDestination';

// Mock Data (Replace with API call to get aggregated city data later)
const CITIES = [
  {
    id: 1,
    name: "Kyoto",
    country: "Japan",
    image: "https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    count: 42,
    slug: "Kyoto"
  },
  {
    id: 2,
    name: "Paris",
    country: "France",
    image: "https://images.pexels.com/photos/1850619/pexels-photo-1850619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    count: 65,
    slug: "Paris"
  },
  {
    id: 3,
    name: "New York",
    country: "USA",
    image: "https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    count: 80,
    slug: "New York"
  },
  {
    id: 4,
    name: "Rome",
    country: "Italy",
    image: "https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    count: 30,
    slug: "Rome"
  },
  {
    id: 5,
    name: "Barcelona",
    country: "Spain",
    image: "https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    count: 25,
    slug: "Barcelona"
  },
  {
    id: 6,
    name: "Bangkok",
    country: "Thailand",
    image: "https://images.pexels.com/photos/1682748/pexels-photo-1682748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    count: 55,
    slug: "Bangkok"
  },
];

const CitiesPage = async () => {
  const { data: popularDestinations } = await getPopularDestinations();
  console.log(popularDestinations)
  const citiesToDisplay = popularDestinations?.length > 0 ? popularDestinations : [];
  return (
    <div className="min-h-screen bg-white pb-20">
      
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
           <Image 
             src="https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg" 
             alt="World Map" 
             fill 
             className="object-cover"
           />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto space-y-6">
           <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
             Find Your Next Destination
           </h1>
           <p className="text-lg text-slate-200">
             Explore 50+ cities hosted by locals who know them best.
           </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        
        <SectionHeader 
          title="Popular" 
          highlight="Destinations" 
          subtitle="The most visited cities by our community this month."
          align="left"
        />

        {/* Cities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {citiesToDisplay?.map((city) => (
            <Link 
              key={city.id} 
              // ✅ Connects to your existing Search functionality
              href={`/tours?searchTerm=${city.name}`} 
              className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer"
            >
              <Image 
                src={city.image} 
                alt={city.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />

              {/* Content */}
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

        {/* CTA Section */}
        <div className="mt-24 bg-slate-50 rounded-3xl p-12 text-center border border-slate-100">
           <h2 className="text-3xl font-bold text-slate-900 mb-4">
             Don&apos;t see your city?
           </h2>
           <p className="text-slate-600 mb-8 max-w-xl mx-auto">
             We are expanding rapidly! If you are a local expert in a city not listed here, join us and put your hometown on the map.
           </p>
           <Button asChild size="lg" className="rounded-full px-8">
             <Link href="/become-a-guide">Become a Guide</Link>
           </Button>
        </div>

      </div>
    </div>
  );
};

export default CitiesPage;