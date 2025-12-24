import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, Camera, Coffee, Compass, Map, MapPin, Tent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionHeader from '@/components/shared/home/SectionHeader';
import Link from 'next/link';

const BentoGrid = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">

        <SectionHeader
          title="Find Your"
          highlight="Travel Vibe"
          subtitle="Don't just go somewhere. Do something unforgettable."
        />

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-[1200px] md:h-[600px] mt-12">

          {/* Item 1: Large Feature (Left) */}
          <div className="group relative md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden cursor-pointer">
            <Image
              src="https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1000&auto=format&fit=crop"
              alt="Night Market"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white p-4">
              <div className="bg-orange-500/20 backdrop-blur-md w-fit p-2 rounded-lg mb-3">
                <Coffee className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="text-3xl font-bold mb-2">Culinary Secrets</h3>
              <p className="text-slate-200 text-sm max-w-xs mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                Taste street food with locals who know the hygiene-safe hidden gems.
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-orange-400">
                Explore Food Tours <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Item 2: Tall Feature (Right) */}
          <div className="group relative md:col-span-1 md:row-span-2 rounded-3xl overflow-hidden cursor-pointer">
            <Image
              src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=1000&auto=format&fit=crop"
              alt="Hiking"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
            <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20">
              <Tent className="w-5 h-5 text-white" />
            </div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-xl font-bold mb-1">Wild & Free</h3>
              <p className="text-xs text-slate-200">Off-grid hiking trails.</p>
            </div>
          </div>

          {/* Item 3: Promo / Text Box */}
          <div className="md:col-span-1 md:row-span-1 bg-slate-900 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group">
            {/* Abstract Decoration */}
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-colors" />

            <div>
              <Compass className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-white font-bold text-lg leading-tight">
                Not sure where to go?
              </h3>
            </div>
            <Link href={'/tours'}><Button variant="outline" className="w-full ">
              Explore Now
            </Button></Link>
          </div>
          <div className="md:col-span-1 md:row-span-1 bg-primary rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group">
            {/* Abstract Decoration */}
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-colors" />

            <div>
              <MapPin className="w-8 h-8 text-secondary mb-4" /> {/* Changed icon */}
              <h3 className="text-white font-bold text-lg leading-tight">
                Find hidden gems near you
              </h3> {/* Changed title */}
            </div>
            <Link href={'/tours'}>
              <Button variant="outline" className="w-full   ">
                Discover Now
              </Button> {/* Changed button variant and link */}
            </Link>
          </div>


          {/* Item 4: Wide Bottom (Bottom Left) */}
          <div className="group relative md:col-span-2 md:row-span-1 rounded-3xl overflow-hidden cursor-pointer">
            <Image
              src="https://images.unsplash.com/photo-1598890777032-bde835ba27c2?q=40&w=1000&auto=format&fit=crop"
              alt="History"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
            <div className="absolute inset-0 flex items-center p-8">
              <div className="text-white">
                <div className="flex items-center gap-2 mb-2 text-primary">
                  <Camera className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Photography</span>
                </div>
                <h3 className="text-2xl font-bold">Insta-Worthy Spots</h3>
              </div>
            </div>
          </div>

          {/* Item 5: Small Stat / Icon Box (Bottom Middle) */}
          <div className="group md:col-span-1 md:row-span-1 bg-primary/10 rounded-3xl p-6 flex flex-col items-center justify-center text-center border border-primary/20 hover:border-primary/50 transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
              <Map className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-black text-slate-900">8+</div>
            <div className="text-xs font-medium text-slate-500 uppercase">Cities Live</div>
          </div>

          {/* Item 6: Image Box (Bottom Right) */}
          <div className="group relative md:col-span-1 md:row-span-1 rounded-3xl overflow-hidden cursor-pointer">
            <Image
              src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=1000&auto=format&fit=crop"
              alt="Bus"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default BentoGrid;