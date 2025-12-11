import React from 'react';
import { Users, Star } from 'lucide-react';

const TopRatedGuides = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Top Rated Guides</h2>
          <p className="text-muted-foreground">Meet our expert local guides</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((_, i) => (
            <div key={i} className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-primary/60" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="font-semibold">Maria Garcia</h3>
                <p className="text-sm text-muted-foreground">Barcelona</p>
                <div className="flex items-center justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">(128)</span>
                </div>
                <p className="text-xs text-muted-foreground">Food & Culture Expert</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopRatedGuides;