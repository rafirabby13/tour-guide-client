/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Quote, Star } from 'lucide-react';

const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Travelers Say</h2>
          <p className="text-muted-foreground">Real experiences from our community</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="bg-card border rounded-lg p-6 space-y-4">
              <Quote className="h-8 w-8 text-primary/30" />
              <p className="text-muted-foreground">
                "Amazing experience! Our guide showed us places we would never have found on our own. Highly recommend!"
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full" />
                <div>
                  <p className="font-semibold text-sm">Sarah Johnson</p>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;