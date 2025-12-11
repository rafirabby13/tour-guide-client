/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllTours } from '@/services/admin/tourManagement'
import { MapPin, ArrowUpRight, Star, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const PopularTrips = async () => {
  const response = await getAllTours();
  const tours = Array.isArray(response) ? response : response?.data || [];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
         <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
         <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl space-y-4">
            <span className="text-primary font-semibold tracking-wider text-sm uppercase">Curated For You</span>
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

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tours?.slice(0, 4).map((tour: any, index: number) => {
            // Calculate "From" Price
            const minPrice = tour.tourPricings?.length 
              ? Math.min(...tour.tourPricings.map((p: any) => Number(p.pricePerHour))) 
              : 0;

            return (
              <Link 
                key={tour.id} 
                href={`/tours/${tour.id}`}
                className="group relative flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out"
              >
                
                {/* Image Area */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image 
                    src={tour.images?.[0] || "/placeholder-tour.jpg"} 
                    alt={tour.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                  {/* Wishlist Button (Visual Only) */}
                  <button className="absolute top-4 right-4 p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white hover:text-red-500 transition-colors z-20">
                    <Heart className="w-4 h-4" />
                  </button>

                  {/* Floating Location Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                    <MapPin className="w-3.5 h-3.5 text-white" />
                    <span className="text-xs font-medium text-white tracking-wide">{tour.location}</span>
                  </div>
                </div>

                {/* Content Overlay (Bottom of Card) */}
                <div className="absolute bottom-0 left-0 w-full p-6 text-white z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mb-2 opacity-90">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold">4.92</span>
                    <span className="text-xs text-gray-300">(128)</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold leading-tight mb-2 line-clamp-2 group-hover:text-primary-foreground transition-colors">
                    {tour.title}
                  </h3>

                  {/* Price Row */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/20 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <span className="text-sm font-medium text-gray-200">Starting from</span>
                    <span className="text-lg font-bold text-white">${minPrice}</span>
                  </div>
                </div>
                
              </Link>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default PopularTrips