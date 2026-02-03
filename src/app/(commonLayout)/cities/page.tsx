import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SectionHeader from '@/components/shared/home/SectionHeader';
import { Button } from '@/components/ui/button';
import CitiesSkeleton from '@/components/shared/loader/CitiesSkeleton';
import CitiesGrid from '@/components/modules/cities/CitiesGrid';



const CitiesPage =  () => {

  
  return (
    <div className="min-h-screen bg-white pb-20">

      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg"
            alt="World Map"
            fill
            priority={true}
            sizes="100vw"
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
          align="center"
        />

        {/* Cities Grid */}
        <Suspense fallback={<CitiesSkeleton />}>
          <CitiesGrid />
        </Suspense>
      

       
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