/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import React from 'react';
import Image from 'next/image';
import {
  MapPin,
  Clock,
  Users,
  ShieldCheck,
  Star,
  CalendarDays,
  CheckCircle2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getSingleTour } from '@/services/commmon/getSinlgeTour';
import TourBookingForm from '../tourist/TourBookingForm';
import { getMyProfile } from '@/services/commmon/myProfile';
// --- Helper to format minutes to HH:MM ---
const formatMinutesToTime = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const ampm = h >= 12 ? 'PM' : 'AM';
  const formattedH = h % 12 || 12;
  const formattedM = m.toString().padStart(2, '0');
  return `${formattedH}:${formattedM} ${ampm}`;
};

// --- Helper to get day name ---
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


const TourDetailComponent = async ({ id }: { id: string }) => {
  console.log(id)
  const profile = await getMyProfile()
  const data = await getSingleTour(id)
  console.log(data)
  const tour = data.data
  if (!tour) return <div className="container py-20 text-center text-xl font-medium">Tour not found.</div>;

  // Calculate lowest price for "From $X" display
  // const lowestPrice = tour.tourPricings?.length 
  //   ? Math.min(...tour.tourPricings.map((p: any) => Number(p.pricePerHour))) 
  //   : 0;

  // Get primary image and gallery slice
  const mainImage = tour.images?.[0] || '/placeholder-tour.jpg';
  const galleryImages = tour.images?.slice(1, 5) || [];
  return (
    <div className="min-h-screen bg-white pb-20 font-sans max-w-[70%] mx-auto">

      {/* 1. HERO SECTION (Images) */}
      <section className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden bg-gray-100">
        {tour.images?.length > 0 ? (
          <div className="grid h-full w-full grid-cols-1 md:grid-cols-2 gap-1 p-1">
            {/* Main Image */}
            <div className="relative h-full w-full overflow-hidden group">
              <Image
                src={mainImage}
                alt={tour.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
            {/* Secondary Grid (Hidden on mobile) */}
            <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-1 h-full">
              {galleryImages.map((img: string, i: number) => (
                <div key={i} className="relative h-full w-full overflow-hidden group">
                  <Image
                    src={img}
                    alt={`Gallery ${i}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
              {/* Placeholder logic if < 5 images to keep grid layout intact */}
              {galleryImages.length < 4 && Array.from({ length: 4 - galleryImages.length }).map((_, i) => (
                <div key={`placeholder-${i}`} className="relative h-full w-full bg-gray-200 flex items-center justify-center text-gray-400">
                  <Image src="/placeholder-tour.jpg" alt="placeholder" fill className="object-cover opacity-50" />
                </div>
              ))}
            </div>

            <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-md shadow-md text-sm font-semibold hover:bg-white transition-colors">
              View Photos
            </button>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-100 text-gray-400">
            No Images Available
          </div>
        )}
      </section>

      {/* 2. MAIN CONTENT WRAPPER */}
      <div className="container mx-auto px-4 md:px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* LEFT COLUMN: Tour Details */}
          <div className="lg:col-span-2 space-y-12">

            {/* Header Info */}
            <div className="space-y-4 border-b pb-8">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary" className="rounded-full px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20">
                  {tour.status === 'PUBLISHED' ? 'Featured Tour' : 'Local Experience'}
                </Badge>
                <div className="flex items-center gap-1.5 text-muted-foreground text-sm font-medium">
                  <MapPin className="w-4 h-4" />
                  {tour.location}
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                {tour.title}
              </h1>

              {/* Quick Stats Bar */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-700 pt-2">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-black">4.92</span>
                  <span className="text-gray-500 underline decoration-gray-300 underline-offset-2 cursor-pointer">(120 reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span>Max {Math.max(...(tour.tourPricings?.map((p: any) => p.maxGuests) || [0]))} Guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span>Duration: Flexible</span>
                </div>
              </div>
            </div>

            {/* Host Profile Snippet */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm">
                  {/* Fallback image */}
                  <Image
                    src={tour.guide?.profilePhoto || "/placeholder-user.png"}
                    alt="Host"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Hosted by {tour.guide?.name || "Local Expert"}</h3>
                  <p className="text-sm text-gray-500">Professional Guide • Verified</p>
                </div>
              </div>
            </div>

            <div className="h-px bg-gray-100 w-full" />

            {/* Description */}
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-gray-900">About this experience</h2>
              <div
                className="prose prose-gray max-w-none text-gray-600 leading-relaxed text-lg"
                dangerouslySetInnerHTML={{ __html: tour.description }}
              />
            </div>

            {/* Highlights (Static example) */}
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-gray-900">What&apos;s Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50/50 border border-gray-100">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="font-medium text-gray-700">Expert local guide</span>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50/50 border border-gray-100">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="font-medium text-gray-700">Hidden gems discovery</span>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50/50 border border-gray-100">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="font-medium text-gray-700">Photography assistance</span>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50/50 border border-gray-100">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="font-medium text-gray-700">Local recommendations</span>
                </div>
              </div>
            </div>

            {/* Availability Schedule */}
            {tour.tourAvailabilities?.length > 0 && (
              <div className="space-y-5">
                <h2 className="text-2xl font-bold text-gray-900">Weekly Schedule</h2>
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {tour.tourAvailabilities.map((slot: any) => (
                      <div key={slot.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <CalendarDays className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{dayNames[slot.dayOfWeek]}</p>
                          <p className="text-sm text-gray-500 font-medium">
                            {formatMinutesToTime(slot.startTimeMinutes)} - {formatMinutesToTime(slot.endTimeMinutes)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Pricing Tiers */}
            {tour.tourPricings?.length > 0 && (
              <div className="space-y-5">
                <h2 className="text-2xl font-bold text-gray-900">Group Pricing</h2>
                <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50/80 text-gray-600 font-semibold border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4">Group Size</th>
                        <th className="px-6 py-4 text-right">Price per Person/Hour</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      {tour.tourPricings.map((tier: any) => (
                        <tr key={tier.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 font-medium text-gray-900">
                            {tier.minGuests} - {tier.maxGuests} Guests
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="font-bold text-lg text-primary">${tier.pricePerHour}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: Sticky Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">

              {/* Booking Form Component */}
              <TourBookingForm
                availabilities={tour?.tourAvailabilities}
                user={profile?.data?.id}
                tourId={tour.id}
                pricePerHour={Number(tour.tourPricings?.[0]?.pricePerHour || 0)}
                maxGuests={Math.max(...(tour.tourPricings?.map((p: any) => p.maxGuests) || [10]))}
              />

              {/* Trust Badges */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-gray-700 font-medium text-sm">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  Secure Payment
                </div>
                <p className="text-xs text-gray-400">
                  Processed securely via Stripe or SSLCommerz. Your data is protected.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default TourDetailComponent
