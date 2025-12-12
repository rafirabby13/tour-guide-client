/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Star, Shield, CheckCircle2, Map, Zap } from 'lucide-react';
import SectionHeader from '@/components/shared/home/SectionHeader';
import { getAdminDashboardStats } from '@/services/stats/stats'; // Adjust path if needed
import { formatStat } from '@/helper/formatStat';

const WhyChooseUs = async () => {
  const features = [
    {
      title: "Authentic Experiences",
      desc: "Go beyond the guidebook. Discover hidden alleys, secret cafes, and local stories that tourists never see.",
      icon: Map,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      shadow: "group-hover:shadow-blue-500/20"
    },
    {
      title: "Verified Experts",
      desc: "Every guide is vetted, interviewed, and rated by real travelers. Safety and quality are our top priority.",
      icon: Shield,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      shadow: "group-hover:shadow-emerald-500/20"
    },
    {
      title: "Seamless Flexibility",
      desc: "Book with confidence. Enjoy free cancellation up to 24 hours before your trip and secure payment protection.",
      icon: CheckCircle2,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      shadow: "group-hover:shadow-purple-500/20"
    }
  ];

  // 1. Fetch data
  const response = await getAdminDashboardStats();
  
  // 2. Extract 'overview' from the data structure
  const statsData = response?.success ? response.data : {};
  const overview = statsData?.overview || {}; 

  const metrics = [
    { 
      label: "Happy Travelers", 
      // ✅ Fix: Access via overview
      value: formatStat(overview.totalTourists || 0) 
    },
    { 
      label: "Local Guides", 
      // ✅ Fix: Access via overview
      value: formatStat(overview.totalGuides || 0) 
    },
    { 
      label: "Cities Covered", 
      // Note: 'totalCities' is missing from your API log, so this will default to 85
      value: formatStat(overview.totalCities || 85) 
    }, 
    { 
      label: "Completed Tours", // Renamed from "5-Star Reviews" as review count isn't in 'overview'
      // ✅ Fix: Mapped to totalBookings since totalReviews is missing in overview
      value: formatStat(overview.totalBookings || 0) 
    },
  ];

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}>
      </div>

      {/* Decorative Blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">

        <SectionHeader
          title="Why Travelers"
          highlight="Love Us"
          subtitle="We don't just sell tours. We craft unforgettable memories."
        />

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((item, i) => (
            <div
              key={i}
              className={`group relative bg-white p-8 rounded-[2rem] border border-slate-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${item.shadow}`}
            >
              <div className="absolute inset-0 rounded-[2rem] border-2 border-transparent group-hover:border-primary/10 transition-colors pointer-events-none" />

              <div className={`relative w-20 h-20 mb-8 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${item.bg}`}>
                <item.icon className={`h-10 w-10 ${item.color}`} strokeWidth={1.5} />
                <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity delay-100 scale-0 group-hover:scale-100 duration-300">
                  <Zap className={`w-3 h-3 ${item.color}`} fill="currentColor" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors">
                {item.title}
              </h3>

              <p className="text-slate-600 leading-relaxed text-lg">
                {item.desc}
              </p>

              <div className={`mt-8 h-1 w-12 rounded-full ${item.bg.replace('/10', '')} opacity-20 group-hover:w-full transition-all duration-500`} />
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 border-t border-slate-100 pt-12">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {metrics.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                   <div className="text-3xl md:text-4xl font-extrabold text-slate-900">
                     {stat.value}
                   </div>
                   <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                     {stat.label}
                   </div>
                </div>
              ))}
           </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;