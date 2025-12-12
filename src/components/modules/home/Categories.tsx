import React from 'react';
import Image from 'next/image';
import { Utensils, Landmark, Mountain, Palette, Music, ShoppingBag, ArrowUpRight } from 'lucide-react';
import SectionHeader from '@/components/shared/home/SectionHeader';
import { Marquee } from '@/components/ui/marquee'; // Ensure this path is correct

const CATEGORIES = [
  { 
    id: 1,
    label: "Food & Drink", 
    count: "40+ Tours",
    icon: Utensils, 
    image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  { 
    id: 2,
    label: "History", 
    count: "25+ Tours",
    icon: Landmark, 
    image: "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  { 
    id: 3,
    label: "Adventure", 
    count: "50+ Tours",
    icon: Mountain, 
    image: "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  { 
    id: 4,
    label: "Art & Culture", 
    count: "30+ Tours",
    icon: Palette, 
    image: "https://images.pexels.com/photos/2123337/pexels-photo-2123337.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  { 
    id: 5,
    label: "Nightlife", 
    count: "15+ Tours",
    icon: Music, 
    image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  { 
    id: 6,
    label: "Shopping", 
    count: "10+ Tours",
    icon: ShoppingBag, 
    image: "https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
];

const CategoryCard = ({ cat }: { cat: typeof CATEGORIES[0] }) => (
  <div 
    className="group relative h-[320px] w-[260px] rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 mx-3"
  >
    {/* Background Image */}
    <Image 
      src={cat.image} 
      alt={cat.label}
      fill
      className="object-cover transition-transform duration-700 group-hover:scale-110"
    />
    
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

    {/* Top Right Arrow */}
    <div className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-md rounded-full text-white opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
      <ArrowUpRight className="w-4 h-4" />
    </div>

    {/* Content */}
    <div className="absolute bottom-0 left-0 w-full p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
      <div className="w-12 h-12 mb-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white group-hover:bg-primary group-hover:text-white transition-colors duration-500">
        <cat.icon className="w-6 h-6" />
      </div>

      <h3 className="text-white font-bold text-xl leading-tight mb-1 group-hover:tracking-wide transition-all">
        {cat.label}
      </h3>
      
      <p className="text-white/70 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
        {cat.count}
      </p>
    </div>
  </div>
);

const Categories = () => {
  return (
    <section className="py-24 bg-white overflow-hidden w-[85%] mx-auto">
      <div className="container mx-auto px-6 mb-12">
        <SectionHeader 
          title="Explore by" 
          highlight="Interest" 
          subtitle="Find the perfect experience tailored to your passion."
        />
      </div>

      {/* Marquee Container */}
      <div className="relative w-full">
        <Marquee pauseOnHover className="[--duration:40s]">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.id} cat={cat} />
          ))}
        </Marquee>

        
      </div>
    </section>
  );
};

export default Categories;