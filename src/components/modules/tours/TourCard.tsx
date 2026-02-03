/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Star, Heart } from 'lucide-react';

// interface TourCardProps {
//   tour: Tour;
// }

export default function TourCard({ tour }: any) {
  // Safe min price calculation with fallback
  const minPrice =
    tour.tourPricings?.length
      ? Math.min(...tour.tourPricings.map((p: { pricePerHour: any; }) => Number(p.pricePerHour || 0)))
      : null;

    

  return (
    <Link
      href={`/tours/${tour.id}`}
      className="group relative flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out"
    >
      {/* Image */}
      <div className="relative aspect-4/5 overflow-hidden">
        <Image
          src={tour.images?.[0] ?? '/placeholder-tour.jpg'}
          alt={tour.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          priority={false} // only first card could be priority if above fold
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-500" />

        {/* Wishlist button (would need 'use client' + state if interactive) */}
        <button
          aria-label="Add to wishlist"
          className="absolute top-4 right-4 p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white hover:text-red-500 transition-colors z-20"
        >
          <Heart className="w-4 h-4" />
        </button>

        {/* Location badge */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
          <MapPin className="w-3.5 h-3.5 text-white" />
          <span className="text-xs font-medium text-white tracking-wide">
            {tour.location || 'Unknown'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col grow">
        {/* Rating (hard-coded for now – make dynamic later) */}
        <div className="flex items-center gap-1.5 mb-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-bold">4.92</span>
          <span className="text-xs text-gray-500">(128)</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold leading-tight mb-4 line-clamp-2 group-hover:text-primary transition-colors">
          {tour.title}
        </h3>

        {/* Price */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-600">Starting from</span>
          <span className="ml-2 text-lg font-bold text-gray-900">
            {minPrice != null ? `$${minPrice}` : '—'}
          </span>
        </div>
      </div>
    </Link>
  );
}