/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Search, MapPin, Star, Users, Globe, Shield, ArrowRight, Check, Quote } from 'lucide-react';
import PopularTrips from './PopularTrips';

const LandingPagePreview = () => {
  return (
    <div className="min-h-screen bg-background">


      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Discover Your City Through
              <span className="text-primary"> Local Eyes</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Connect with passionate local guides for authentic, personalized experiences. Skip the tourist traps and explore like a local.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mt-8">
              <div className="flex flex-col md:flex-row gap-3 p-2 bg-card border rounded-lg shadow-lg">
                <div className="flex-1 flex items-center gap-2 px-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Where are you going?"
                    className="w-full bg-transparent border-none outline-none text-sm"
                  />
                </div>
                <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                  <Search className="h-4 w-4" />
                  Search
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground pt-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>1000+ Guides</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>50+ Cities</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                <span>4.9 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience authentic local culture in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Find Your Guide", desc: "Browse local experts by location, interest, or expertise", icon: Search },
              { step: "02", title: "Book Experience", desc: "Choose your date and customize your perfect tour", icon: MapPin },
              { step: "03", title: "Explore & Enjoy", desc: "Meet your guide and discover hidden gems", icon: Star }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-card border rounded-lg p-6 text-center space-y-4 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-primary/20">{item.step}</div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
                {i < 2 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-primary h-8 w-8" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <PopularTrips />

      {/* Top Rated Guides */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Top Rated Guides</h2>
            <p className="text-muted-foreground">Meet our expert local guides</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow">
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

      {/* Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore by Category</h2>
            <p className="text-muted-foreground">Find experiences that match your interests</p>
          </div>

          <div className="grid md:grid-cols-6 gap-4">
            {["Food Tours", "History", "Adventure", "Art & Culture", "Nightlife", "Shopping"].map((cat, i) => (
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

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose LocalGuide</h2>
            <p className="text-muted-foreground">The benefits of traveling with local experts</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { title: "Authentic Experiences", desc: "Skip tourist traps and discover hidden gems only locals know", icon: Star },
              { title: "Verified Guides", desc: "All guides are verified with reviews from real travelers", icon: Shield },
              { title: "Flexible Bookings", desc: "Easy booking process with secure payments and cancellation", icon: Check }
            ].map((item, i) => (
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

      {/* Testimonials */}
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

      {/* Become a Guide CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Become a Local Guide</h2>
            <p className="text-lg opacity-90">
              Share your city's secrets and earn money doing what you love. Join our community of passionate local experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button className="bg-background text-foreground px-8 py-3 rounded-md font-medium hover:bg-background/90 transition-colors">
                Learn More
              </button>
              <button className="border-2 border-primary-foreground px-8 py-3 rounded-md font-medium hover:bg-primary-foreground/10 transition-colors">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Globe className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">LocalGuide</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Connect with local guides for authentic travel experiences worldwide.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">For Travelers</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Explore Tours</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Popular Destinations</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">For Guides</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Become a Guide</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Guide Resources</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Guide Dashboard</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 LocalGuide. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPagePreview;