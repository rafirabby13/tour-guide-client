/* eslint-disable @typescript-eslint/no-explicit-any */

import { getAllTours } from '@/services/admin/tourManagement'
import { MapPin, ArrowUpRight, Star, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import TourCard from '../tours/TourCard'

const PopularTrips = async () => {
  const query = { limit: 4 }
  const response = await getAllTours();
  const tours = await Array.isArray(response) ? response : response?.data || [];

  console.log("object", { tours })
  if (tours.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500 text-lg font-medium">
        No tours available at the moment.
      </div>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decor – consider extracting to <DecorBackground /> later */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl space-y-4">
            <span className="text-primary font-semibold tracking-wider text-sm uppercase">
              Curated For You
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Trending Experiences
            </h2>
            <p className="text-lg text-gray-500 max-w-lg">
              Unlock hidden gems with locals who know the city best.
            </p>
          </div>

          <Link
            href="/tours"
            className="group flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-all font-semibold text-gray-700 hover:text-primary hover:border-primary/20"
          >
            Explore all tours
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {tours.length > 0 ? (
          // IF DATA EXISTS: Show Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tours.map((tour: any) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          // IF NO DATA: Show a styled placeholder (keeps layout intact)
          <div className="w-full py-20 flex flex-col items-center justify-center text-center bg-white/50 border-2 border-dashed border-gray-200 rounded-3xl">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
              <ArrowUpRight className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">No trending tours found</h3>
            <p className="text-gray-500 mt-2 max-w-md">
              We couldn&apos;t find any highlighted trips right now. Check back later or explore our full catalog.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default PopularTrips