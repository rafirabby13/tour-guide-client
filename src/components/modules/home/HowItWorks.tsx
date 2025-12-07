// src/components/modules/landing/HowItWorks.tsx
import { Map, UserCheck, CalendarCheck } from "lucide-react";

const STEPS = [
    {
        icon: Map,
        title: "1. Choose a Destination",
        desc: "Browse authentic tours curated by locals who know the city best."
    },
    {
        icon: UserCheck,
        title: "2. Select a Guide",
        desc: "Check reviews, languages, and expertise to find your perfect match."
    },
    {
        icon: CalendarCheck,
        title: "3. Book & Enjoy",
        desc: "Secure your date seamlessly and experience the city like a true local."
    },
];

const HowItWorks = () => {
    return (
        <section className="bg-slate-50 py-24">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-16">How It Works</h2>

                <div className="flex justify-center  gap-12 relative ">
                    {/* Optional connecting line for large screens */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-900 -z-10 p-10" />

                    {STEPS.map((step, idx) => (
                        <div key={idx} className="flex flex-col items-center bg-white  p-16  hover:shadow-2xl hover:border-t-8 hover:border-red-500 rounded-2xl shadow-sm md:shadow-none">
                            <div className="h-24 w-24 bg-white border-4 border-slate-50 text-secondary rounded-full flex items-center justify-center mb-6 shadow-sm z-10 ">
                                <step.icon size={40} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
                            <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;