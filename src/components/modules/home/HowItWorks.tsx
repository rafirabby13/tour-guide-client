// // src/components/modules/landing/HowItWorks.tsx
// import { Map, UserCheck, CalendarCheck } from "lucide-react";

// const STEPS = [
//     {
//         icon: Map,
//         title: "1. Choose a Destination",
//         desc: "Browse authentic tours curated by locals who know the city best."
//     },
//     {
//         icon: UserCheck,
//         title: "2. Select a Guide",
//         desc: "Check reviews, languages, and expertise to find your perfect match."
//     },
//     {
//         icon: CalendarCheck,
//         title: "3. Book & Enjoy",
//         desc: "Secure your date seamlessly and experience the city like a true local."
//     },
// ];

// const HowItWorks = () => {
//     return (
//         <section className="bg-slate-50 py-24">
//             <div className="container mx-auto px-4 text-center">
//                 <h2 className="text-3xl md:text-4xl font-bold text-primary mb-16">How It Works</h2>

//                 <div className="flex justify-center  gap-12 relative ">
//                     {/* Optional connecting line for large screens */}
//                     <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-900 -z-10 p-10" />

//                     {STEPS.map((step, idx) => (
//                         <div key={idx} className="flex flex-col items-center bg-white  p-16  hover:shadow-2xl hover:border-t-8 hover:border-red-500 rounded-2xl shadow-sm md:shadow-none">
//                             <div className="h-24 w-24 bg-white border-4 border-slate-50 text-secondary rounded-full flex items-center justify-center mb-6 shadow-sm z-10 ">
//                                 <step.icon size={40} strokeWidth={1.5} />
//                             </div>
//                             <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
//                             <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">{step.desc}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default HowItWorks;

import SectionHeader from "@/components/shared/home/SectionHeader";
import { Map, UserCheck, CalendarCheck, ArrowRight } from "lucide-react";

const STEPS = [
  {
    icon: Map,
    title: "Choose Destination",
    desc: "Browse authentic tours curated by locals who know the city best.",
    color: "bg-blue-100 text-blue-600", // Accent colors for variety
    hoverColor: "group-hover:bg-blue-600 group-hover:text-white"
  },
  {
    icon: UserCheck,
    title: "Select a Guide",
    desc: "Check reviews, languages, and expertise to find your perfect match.",
    color: "bg-amber-100 text-amber-600",
    hoverColor: "group-hover:bg-amber-600 group-hover:text-white"
  },
  {
    icon: CalendarCheck,
    title: "Book & Enjoy",
    desc: "Secure your date seamlessly and experience the city like a true local.",
    color: "bg-emerald-100 text-emerald-600",
    hoverColor: "group-hover:bg-emerald-600 group-hover:text-white"
  },
];

const HowItWorks = () => {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background Decor (Subtle dots) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
    
        
        <SectionHeader title="Your Journey Starts" align="center" highlight="Here" subtitle=" Three simple steps to unlock authentic experiences with local experts."/>

        {/* Steps Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-slate-200 to-transparent -z-10" />

          {STEPS.map((step, idx) => (
            <div key={idx} className="group relative flex flex-col items-center text-center">
              
              {/* Step Number Badge (Floating) */}
              <div className="absolute top-0 right-10 -mt-4 -mr-4 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-lg z-20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                {idx + 1}
              </div>

              {/* Icon Container */}
              <div className={`relative w-24 h-24 rounded-2xl mb-8 flex items-center justify-center shadow-sm transition-all duration-500 ease-out 
                ${step.color} ${step.hoverColor} 
                group-hover:shadow-xl group-hover:-translate-y-2 group-hover:rotate-3`}>
                
                <step.icon size={40} strokeWidth={1.5} className="transition-transform duration-500 group-hover:scale-110" />
                
                {/* Decorative blob behind icon */}
                <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Text Content */}
              <div className="relative bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-transparent transition-all duration-300 group-hover:border-slate-100 group-hover:bg-white group-hover:shadow-lg">
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Mobile Arrow (Visual flow for mobile users) */}
              {idx < 2 && (
                <div className="md:hidden mt-8 text-slate-300 animate-bounce">
                  <ArrowRight className="rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;