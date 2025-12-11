import React from 'react';
import { Star, Shield, Check } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    { title: "Authentic Experiences", desc: "Skip tourist traps and discover hidden gems only locals know", icon: Star },
    { title: "Verified Guides", desc: "All guides are verified with reviews from real travelers", icon: Shield },
    { title: "Flexible Bookings", desc: "Easy booking process with secure payments and cancellation", icon: Check }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-muted-foreground">The benefits of traveling with local experts</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((item, i) => (
            <div key={i} className="text-center space-y-3">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <item.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;