/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Star, Trophy } from 'lucide-react';
import SectionHeader from '@/components/shared/home/SectionHeader';
import { getTopGuides } from '@/services/guide/getTopGuides';

const TopRatedGuides = async () => {
  const guides = await getTopGuides();

  console.log(guides)

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-6">
        
        <SectionHeader 
          title="Top Rated" 
          align="center" 
          highlight="Guides" 
          subtitle="Meet the local experts who make the difference."
        /> 

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {guides?.data?.map((guide: any) => (
            <Link 
              href={`/guides/${guide.id}`} 
              key={guide.id}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
            
              <div className="h-24 bg-gradient-to-r from-primary/10 to-secondary/10 relative">
               
                 <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm text-yellow-500">
                    <Trophy className="w-4 h-4" />
                 </div>
              </div>

           
              <div className="px-6 pb-6 text-center relative">
                
              
                <div className="-mt-12 mb-4 inline-block relative">
                  <div className="h-24 w-24 rounded-full border-4 border-white shadow-md overflow-hidden relative bg-gray-100">
                    <Image 
                      src={guide.profilePhoto || "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?_gl=1*j1dk4t*_ga*MTg1Nzg1OTAuMTc2NDAxMDA3NA..*_ga_8JE65Q40S6*czE3NjU1MDg4MzckbzUkZzEkdDE3NjU1MDg4NTMkajQ0JGwwJGgw" + guide.name + "&background=random"} 
                      alt={guide?.name || "guide"}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                </div>

              
                <h3 className="font-bold text-xl text-gray-900 mb-1 group-hover:text-primary transition-colors">
                  {guide.name}
                </h3>
                <p className="text-sm text-primary font-medium mb-3">
                  Local Expert
                </p>

              
                <div className="flex items-center justify-center gap-1.5 text-gray-500 text-sm mb-4">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{guide.address || "Global Citizen"}</span>
                </div>

                <div className="border-t border-gray-100 pt-4 flex justify-center gap-6">
                  
                  
                  <div className="text-center">
                    <div className="flex items-center gap-1 font-bold text-gray-900">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      4.9 
                    </div>
                    <div className="text-xs text-gray-400">Rating</div>
                  </div>

              
                  <div className="text-center">
                    <div className="font-bold text-gray-900">
                      {guide._count?.reviews || 0}
                    </div>
                    <div className="text-xs text-gray-400">Reviews</div>
                  </div>

                
                  <div className="text-center">
                    <div className="font-bold text-gray-900">
                      50+
                    </div>
                    <div className="text-xs text-gray-400">Tours</div>
                  </div>

                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopRatedGuides;