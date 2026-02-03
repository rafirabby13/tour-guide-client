"use client"
import { Utensils, Landmark, Mountain, Palette, Music, ShoppingBag } from 'lucide-react';
import SectionHeader from '@/components/shared/home/SectionHeader';
import { Marquee } from '@/components/ui/marquee'; // Ensure this path is correct
import CategoryCard from './CategoryCard';
import { Category } from '@/types/category';

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
          {CATEGORIES.map((cat: Category) => (
            <CategoryCard key={cat.id} cat={cat} />
          ))}
        </Marquee>


      </div>
    </section>
  );
};

export default Categories;