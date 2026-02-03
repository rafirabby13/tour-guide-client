import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { GridItem } from './grid.types';

export const GridCard = ({ item }: { item: GridItem }) => {
  const { type, colSpan, rowSpan, image, title, subtitle, icon: Icon, theme, href, ctaText } = item;
  
  // Shared base styles
  const baseClass = cn(
    "group relative rounded-3xl overflow-hidden cursor-pointer transition-all hover:shadow-xl",
    colSpan || "md:col-span-1",
    rowSpan || "md:row-span-1",
    theme === 'slate' ? 'bg-slate-900' : 
    theme === 'primary' ? 'bg-primary' : 
    'bg-gray-100'
  );

  // Performance Optimization: Calculate image sizes based on column span
  const sizeProp = colSpan?.includes('col-span-2') 
    ? "(max-width: 768px) 100vw, 50vw" 
    : "(max-width: 768px) 100vw, 25vw";

  // --- RENDER: Feature Card (Image + Text + Icon) ---
  if (type === 'feature' && image) {
    return (
      <div className={baseClass}>
        <Image
          src={image}
          alt={title || 'Feature'}
          fill
          sizes={sizeProp}
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-6 text-white p-2">
          {Icon && (
            <div className="bg-orange-500/20 backdrop-blur-md w-fit p-2 rounded-lg mb-3">
              <Icon className="w-5 h-5 text-orange-400" />
            </div>
          )}
          <h3 className="text-xl md:text-2xl font-bold mb-2">{title}</h3>
          {subtitle && (
             <p className="text-slate-200 text-sm max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
               {subtitle}
             </p>
          )}
          {ctaText && (
             <div className="flex items-center gap-2 text-sm font-semibold text-orange-400 mt-2">
                {ctaText} <ArrowUpRight className="w-4 h-4" />
             </div>
          )}
        </div>
      </div>
    );
  }

  // --- RENDER: CTA Card (Text + Button) ---
  if (type === 'cta') {
    return (
      <div className={cn(baseClass, "p-6 flex flex-col justify-between")}>
         <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors" />
         <div>
            {Icon && <Icon className={cn("w-8 h-8 mb-4", theme === 'primary' ? 'text-secondary' : 'text-primary')} />}
            <h3 className="text-white font-bold text-lg leading-tight">{title}</h3>
         </div>
         {href && (
           <Link href={href} className="w-full">
             <Button variant="outline" className="w-full bg-transparent text-white border-white/20 hover:bg-white hover:text-black">
               {ctaText}
             </Button>
           </Link>
         )}
      </div>
    );
  }

  // --- RENDER: Stat Card ---
  if (type === 'stat') {
     return (
        <div className={cn(baseClass, "bg-primary/10 border border-primary/20 hover:border-primary/50 flex flex-col items-center justify-center text-center")}>
           <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
              {Icon && <Icon className="w-6 h-6 text-primary" />}
           </div>
           <div className="text-2xl font-black text-slate-900">{subtitle}</div>
           <div className="text-xs font-medium text-slate-500 uppercase">{title}</div>
        </div>
     )
  }

  // --- RENDER: Simple Image Card ---
  return (
    <div className={baseClass}>
       {image && (
         <Image 
           src={image} 
           alt="Gallery" 
           fill 
           sizes={sizeProp}
           className="object-cover transition-transform duration-700 group-hover:scale-110" 
         />
       )}
       <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
    </div>
  )
};