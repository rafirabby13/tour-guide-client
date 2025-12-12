/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = "force-dynamic";
import React from 'react';
import Link from 'next/link';
import { 
    Wallet, 
    Star, 
    CalendarCheck, 
    PlusCircle,
    MapPin,
    TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock Data
const guideStats = [
    { label: "Total Earnings", value: "$0.00", icon: Wallet, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Tours Completed", value: "0", icon: MapPin, color: "text-primary", bg: "bg-secondary/50" },
    { label: "Avg. Rating", value: "0.0", icon: Star, color: "text-amber-500", bg: "bg-amber-50" },
];

const GuideDashboard = () => {
    return (
        <div className="space-y-8 animate-in fade-in-50 duration-500">
            
            {/* 1. Header with Quick Action */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Guide Dashboard</h1>
                    <p className="text-gray-500">Manage your tours, check bookings, and track your success.</p>
                </div>
                <Button asChild className="gap-2 bg-primary hover:bg-primary shadow-md hover:shadow-lg transition-all">
                    <Link href="/guide/dashboard/create-tour">
                        <PlusCircle className="h-4 w-4" /> Create New Tour
                    </Link>
                </Button>
            </div>

            {/* 2. Performance Stats */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {guideStats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                        </div>
                        <div className={`p-3 rounded-xl ${stat.bg}`}>
                            <stat.icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                    </div>
                ))}
            </div>

            {/* 3. Main Content Split */}
            <div className="grid lg:grid-cols-3 gap-8">
                
                {/* Upcoming Schedule (2/3 width) */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 min-h-[400px]">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <CalendarCheck className="h-5 w-5 text-gray-400" />
                            Upcoming Bookings
                        </h3>
                        <Link href="/guide/dashboard/bookings" className="text-sm text-primary hover:underline">
                            View Calendar
                        </Link>
                    </div>
                    
                    {/* Empty State */}
                    <div className="flex flex-col items-center justify-center h-64 text-center border-2 border-dashed border-gray-100 rounded-xl bg-gray-50/50">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                            <CalendarCheck className="h-8 w-8 text-gray-300" />
                        </div>
                        <h4 className="font-medium text-gray-900">No upcoming bookings</h4>
                        <p className="text-sm text-gray-500 max-w-xs mt-1">
                            Your future bookings will appear here once travelers start reserving your tours.
                        </p>
                    </div>
                </div>

                {/* Tips / Insights (1/3 width) */}
                <div className="bg-gradient-to-b from-primaryto-white rounded-2xl border border-primary p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Pro Tips
                    </h3>
                    <ul className="space-y-4">
                        <li className="flex gap-3 items-start text-sm text-gray-600">
                            <div className="w-6 h-6 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-primary font-bold text-xs">1</div>
                            <p>Add high-quality photos to your tours to increase booking rates by up to 40%.</p>
                        </li>
                        <li className="flex gap-3 items-start text-sm text-gray-600">
                            <div className="w-6 h-6 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-primary font-bold text-xs">2</div>
                            <p>Respond to booking inquiries within 2 hours to maintain a high response badge.</p>
                        </li>
                        <li className="flex gap-3 items-start text-sm text-gray-600">
                            <div className="w-6 h-6 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-primary font-bold text-xs">3</div>
                            <p>Ask happy travelers to leave a review immediately after the tour ends.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default GuideDashboard;