import SectionHeader from "@/components/shared/home/SectionHeader";
import { Map, UserCheck, CalendarCheck, ArrowRight } from "lucide-react";

const STEPS = [
  {
    icon: Map,
    title: "Choose Destination",
    desc: "Browse authentic tours curated by locals who know the city best.",
    color: "bg-blue-100 text-blue-600",
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
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        <SectionHeader 
            title="Your Journey Starts" 
            align="center" 
            highlight="Here" 
            subtitle="Three simple steps to unlock authentic experiences with local experts."
        />

        {/* Steps Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-16">
          
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-slate-200 to-transparent -z-10" />

          {STEPS.map((step, idx) => (
            <div key={idx} className="group flex flex-col items-center text-center">
              
              {/* Icon Container (Badge is now inside here to stay anchored) */}
              <div className={`relative w-24 h-24 rounded-2xl mb-8 flex items-center justify-center shadow-sm transition-all duration-500 ease-out 
                ${step.color} ${step.hoverColor} 
                group-hover:shadow-xl group-hover:-translate-y-2 group-hover:rotate-3`}>
                
                {/* FIX: Badge moved inside relative container */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-lg z-20 ring-4 ring-white transition-transform duration-300 group-hover:scale-110">
                  {idx + 1}
                </div>

                <step.icon size={40} strokeWidth={1.5} className="transition-transform duration-500 group-hover:scale-110" />
              </div>

              {/* Text Content */}
              <div className="relative bg-white/50 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-transparent transition-all duration-300 group-hover:border-slate-100 group-hover:bg-white group-hover:shadow-lg w-full">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  {step.desc}
                </p>
              </div>

              {/* Mobile Arrow */}
              {idx < 2 && (
                <div className="md:hidden mt-6 text-slate-300 animate-bounce" aria-hidden="true">
                  <ArrowRight className="rotate-90 w-6 h-6" />
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