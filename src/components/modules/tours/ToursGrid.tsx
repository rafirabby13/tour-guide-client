/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Star, Heart } from 'lucide-react';

const ToursGrid = ({ tours }: { tours: any[] }) => {
  
  if (tours.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-3xl">
           🔍
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No tours found</h3>
        <p className="text-gray-500 text-center max-w-xs">
          Try adjusting your filters or search for a different location.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {tours.map((tour) => {
        const minPrice = tour.tourPricings?.length 
          ? Math.min(...tour.tourPricings.map((p: any) => Number(p.pricePerHour))) 
          : 0;

        return (
          <Link 
            key={tour.id} 
            href={`/tours/${tour.id}`}
            className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
              <Image 
                src={tour.images?.[0] || "/placeholder-tour.jpg"} 
                alt={tour.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Wishlist */}
              <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:text-red-500 hover:bg-white transition-colors shadow-sm">
                <Heart className="w-4 h-4" />
              </button>

              {/* Status Badge */}
              {tour.status === 'PUBLISHED' && (
                 <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold text-gray-900 rounded-md shadow-sm uppercase tracking-wide">
                    Featured
                 </span>
              )}
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              
              <div className="flex items-center gap-1.5 text-gray-500 text-xs font-medium mb-3 uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                {tour.location}
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {tour.title}
              </h3>

              <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-bold text-gray-900">4.9</span>
                  <span className="text-xs text-gray-400">(24)</span>
                </div>
                
                <div className="text-right">
                  <span className="text-xs text-gray-400 block">From</span>
                  <span className="text-lg font-bold text-primary">${minPrice}</span>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ToursGrid;