/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = "force-dynamic";
import React from 'react';
import Link from 'next/link';
import { 
    Compass, 
    Ticket, 
    Heart, 
    Map, 
    ArrowRight,
    CalendarClock
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock Data (Replace with API calls later)
const stats = [
    { label: "Total Trips", value: "0", icon: Map, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Upcoming", value: "0", icon: CalendarClock, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Wishlist", value: "0", icon: Heart, color: "text-rose-500", bg: "bg-rose-50" },
];

const TouristDashboard = () => {
    return (
        <div className="space-y-8 animate-in fade-in-50 duration-500">
            
            {/* 1. Welcome Header */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-primary/70 p-8 md:p-12 text-white shadow-xl">
                <div className="relative z-10 max-w-2xl space-y-4">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Ready for your next adventure?
                    </h1>
                    <p className="text-blue-100 text-lg">
                        Explore hundreds of unique tours curated by local experts. The world is waiting for you.
                    </p>
                    <Button asChild size="lg" className="bg-white text-primary hover:bg-blue-50 border-none mt-4 rounded-full font-semibold">
                        <Link href="/tours">
                            Explore Tours <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
                
                {/* Decorative Background Icon */}
                <Compass className="absolute -right-12 -bottom-12 h-64 w-64 text-white/10 rotate-12" />
            </div>

            {/* 2. Key Metrics Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className={`p-4 rounded-xl ${stat.bg}`}>
                            <stat.icon className={`h-8 w-8 ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* 3. Empty State / Call to Action Area */}
            <div className="grid md:grid-cols-2 gap-8">
                
                {/* Recent Bookings Placeholder */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm min-h-[300px] flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
                        <Link href="/dashboard/my-bookings" className="text-sm text-primaryhover:underline">View all</Link>
                    </div>
                    
                    <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-500 space-y-4 p-8 border-2 border-dashed border-primary rounded-xl">
                        <div className="p-4 bg-primary rounded-full">
                            <Ticket className="h-8 w-8 text-gray-300" />
                        </div>
                        <p>No upcoming trips booked yet.</p>
                        <Button variant="default" size="sm" asChild>
                            <Link href="/tours">Book a Trip</Link>
                        </Button>
                    </div>
                </div>

                {/* Become a Guide Promo */}
                <div className="relative overflow-hidden bg-primary/70 rounded-2xl p-8 text-white flex flex-col justify-center shadow-lg">
                    <div className="relative z-10 space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-xs font-medium text-emerald-100 border border-emerald-700">
                            ✨ New Opportunity
                        </div>
                        <h3 className="text-2xl font-bold">Know your city best?</h3>
                        <p className="text-emerald-100">
                            Turn your local knowledge into income. Become a guide and host travelers from around the world.
                        </p>
                        <Button asChild className="bg-primary hover:bg-primary text-white w-fit border-none">
                            <Link href="/dashboard/become-a-guide">Apply Now</Link>
                        </Button>
                    </div>
                    {/* Decorative Circle */}
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-primary rounded-full blur-3xl opacity-50"></div>
                </div>

            </div>
        </div>
    );
};

export default TouristDashboard;