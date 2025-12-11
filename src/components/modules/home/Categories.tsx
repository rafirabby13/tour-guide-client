import React from 'react';
import { MapPin } from 'lucide-react';

const Categories = () => {
  const categories = ["Food Tours", "History", "Adventure", "Art & Culture", "Nightlife", "Shopping"];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore by Category</h2>
          <p className="text-muted-foreground">Find experiences that match your interests</p>
        </div>

        <div className="grid md:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <div key={i} className="bg-card border rounded-lg p-6 text-center hover:shadow-md transition-shadow cursor-pointer group">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium text-sm">{cat}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;