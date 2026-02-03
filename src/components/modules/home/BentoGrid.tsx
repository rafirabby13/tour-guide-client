
import SectionHeader from '@/components/shared/home/SectionHeader';
import { GRID_ITEMS } from './bento-grid/grid-data';
import { GridCard } from './bento-grid/GridCard';

const BentoGrid = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        
        <SectionHeader
          title="Find Your"
          highlight="Travel Vibe"
          subtitle="Don't just go somewhere. Do something unforgettable."
        />

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-[1200px] md:h-[600px] mt-12">
          {GRID_ITEMS.map((item) => (
            <GridCard key={item.id} item={item} />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default BentoGrid;