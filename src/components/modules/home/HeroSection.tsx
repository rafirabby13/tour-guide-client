// src/components/modules/landing/HeroSection.tsx
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2568&auto=format&fit=crop"
          alt="Travel Hero"
         
          className="object-cover"
   
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Hero Content */}
      <div className="container relative z-10 flex flex-col items-center text-center text-white space-y-8 px-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
          Experience the World <br /> Like a <span className="text-secondary">Local</span>
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-gray-200 animate-in fade-in slide-in-from-bottom-5 duration-1000">
          Unlock hidden gems, authentic stories, and unforgettable adventures with passionate local guides.
        </p>
        
        {/* Search Component Wrapper */}
        <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-6 duration-1000">
            {/* <SearchBar /> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;