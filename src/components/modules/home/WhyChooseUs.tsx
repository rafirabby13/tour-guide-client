/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Shield, CheckCircle2, Map, Zap, Globe, ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/shared/home/SectionHeader';
import { getAdminDashboardStats } from '@/services/stats/stats'
import CountUpStats from './CountUpStats';
import Link from 'next/link';



const WhyChooseUs = async () => {
  // 1. Fetch Data
  const response = await getAdminDashboardStats();
  const statsData = response?.success ? response.data : {};
  const overview = statsData?.overview || {}; 

  // 2. Prepare Data for the Client Component
  const stats = [
    { label: "Happy Travelers", value: overview.totalTourists || 1200, suffix: "+" },
    { label: "Local Guides", value: overview.totalGuides || 50, suffix: "+" },
    { label: "Cities Covered", value: overview.totalCities || 85, suffix: "" },
    { label: "Completed Tours", value: overview.totalBookings || 340, suffix: "+" },
  ];

  const features = [
    {
      title: "Authentic Experiences",
      desc: "Go beyond the guidebook. Discover hidden alleys, secret cafes, and local stories that tourists never see.",
      icon: Map,
      // Specific colors for this card
      gradient: "from-blue-500/20 to-cyan-400/20",
      borderHover: "group-hover:border-blue-500/50",
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50"
    },
    {
      title: "Verified Experts",
      desc: "Every guide is vetted, interviewed, and rated by real travelers. Safety and quality are our top priority.",
      icon: Shield,
      gradient: "from-emerald-500/20 to-teal-400/20",
      borderHover: "group-hover:border-emerald-500/50",
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50"
    },
    {
      title: "Seamless Flexibility",
      desc: "Book with confidence. Enjoy free cancellation up to 24 hours before your trip and secure payment protection.",
      icon: CheckCircle2,
      gradient: "from-purple-500/20 to-pink-400/20",
      borderHover: "group-hover:border-purple-500/50",
      iconColor: "text-purple-600",
      iconBg: "bg-purple-50"
    }
  ];
  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      
      {/* --- BACKGROUND DECORATION --- */}
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      {/* Soft Gradient Mesh */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] opacity-60 pointer-events-none translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">

        {/* --- HEADER --- */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <SectionHeader
            title="Why Travelers"
            highlight="Choose Us"
            subtitle="We don't just sell tours. We craft unforgettable memories that last a lifetime."
          />
        </div>

        {/* --- FEATURE CARDS --- */}
        {/* --- WOW FACTOR CARDS --- */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10 mb-24">
          {features.map((item, i) => (
            <div
              key={i}
              className={`
                group relative p-8 rounded-[2.5rem] bg-white border border-slate-100 
                overflow-hidden transition-all duration-500 ease-out
                hover:-translate-y-3 hover:shadow-2xl hover:shadow-slate-200/50
                ${item.borderHover}
              `}
            >
              {/* 1. Ambient Gradient Blob (Appears on Hover) */}
              <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
              
              {/* 2. Icon Container with 3D Effect */}
              <div className="relative mb-8 inline-block">
                <div className={`w-18 h-18 p-4 rounded-2xl ${item.iconBg} relative z-10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                  <item.icon className={`w-8 h-8 ${item.iconColor}`} strokeWidth={1.5} />
                </div>
                {/* Icon Shadow Blob */}
                <div className={`absolute inset-0 rounded-2xl bg-current opacity-20 blur-lg scale-0 group-hover:scale-125 transition-transform duration-500 ${item.iconColor}`} />
              </div>

              {/* 3. Text Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-600 transition-all duration-300">
                  {item.title}
                </h3>
                
                <p className="text-slate-600 leading-relaxed mb-6">
                  {item.desc}
                </p>

                {/* 4. "Learn More" Arrow Interaction */}
                <Link href={'/tours'} className="flex items-center gap-2 text-sm font-bold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out">
                  <span className={item.iconColor}>Explore Feature</span>
                  <ArrowRight className={`w-4 h-4 ${item.iconColor}`} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* --- STATS TRUST BAR --- */}
        <div className="relative">
          {/* Decorative globe icon background */}
          <Globe className="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-64 text-slate-50 opacity-50 z-0 pointer-events-none" />
          
          <div className="relative z-10 bg-slate-50/80 backdrop-blur-sm rounded-[2.5rem] border border-slate-100 p-12 md:p-16 text-center">
             <div className="mb-12">
               <h4 className="text-lg font-semibold text-slate-900">Trusted by the World&apos;s Best</h4>
               <p className="text-slate-500 text-sm">Join our growing community of explorers</p>
             </div>
             
             {/* Inject Client Component Here */}
             <CountUpStats stats={stats} />
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;