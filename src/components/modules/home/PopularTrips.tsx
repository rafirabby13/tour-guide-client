/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllTours } from '@/services/admin/tourManagement'
import { MapPin, ArrowUpRight, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const PopularTrips = async () => {
  // Fetch data (assuming returns { data: ITour[], ... } or ITour[])
  const response = await getAllTours();
  // Safe check: handle if response is the array or response.data is the array
  const tours = Array.isArray(response) ? response : response?.data || [];
  console.log(tours)

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Trending Experiences
            </h2>
            <p className="text-lg text-gray-500">
              Discover authentic, local-led tours that go beyond the guidebook.
            </p>
          </div>
          <Link 
            href="/tours" 
            className="group flex items-center gap-2 font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            View all tours 
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tours?.slice(0, 4).map((tour: any) => (
            <Link 
              key={tour.id} 
              href={`/tours/${tour.id}`}
              className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* Image */}
                <Image 
                  src={tour.images?.[0] || "/placeholder-tour.jpg"} 
                  alt={tour.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay Gradient (for text readability if needed) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Status Badge (Optional) */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm">
                   {tour.status === 'PUBLISHED' ? 'Featured' : 'New'}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow p-5">
                
                {/* Location */}
                <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="truncate">{tour.location}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {tour.title}
                </h3>

                {/* Description Excerpt */}
                <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">
                  {tour.description}
                </p>

                {/* Footer: Rating & Price Placeholder */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900">4.9</span>
                    <span className="text-sm text-gray-400">(12)</span>
                  </div>
                  
                  {/* Assuming you might calculate 'Starting from' price later */}
                  <div className="text-right">
                    <p className="text-xs text-gray-400">From</p>
                    {
                        tour?.tourPricings?.map((price: any)=><p key={price.id} className="text-lg font-bold text-primary">${price.pricePerHour}</p>)
                    }
                    
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}

export default PopularTrips