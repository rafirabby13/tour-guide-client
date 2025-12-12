/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Link from 'next/link';
import { Globe, Facebook, Twitter, Instagram, Linkedin, Send, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-slate-300 relative overflow-hidden pt-20 pb-10">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- Top Section: Brand & Newsletter --- */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16 border-b border-slate-800 pb-12">
          
          {/* Brand Promise */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <span className="font-bold text-3xl text-white tracking-tight">GuideNest</span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed text-lg">
              Connecting curious travelers with passionate local experts. We believe the best way to see the world is through the eyes of someone who calls it home.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-full bg-slate-800 hover:bg-primary hover:text-white transition-all duration-300 group">
                  <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <h3 className="text-white font-bold text-xl mb-2">Join our travel community</h3>
            <p className="text-slate-400 mb-6 text-sm">Get the latest travel tips, hidden gems, and exclusive deals sent to your inbox.</p>
            
            <form className="relative">
              <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full bg-slate-900 border border-slate-700 text-white pl-12 pr-32 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-600"
              />
              <button className="absolute right-1.5 top-1.5 bottom-1.5 bg-primary hover:bg-primary/90 text-white px-6 rounded-lg font-medium transition-colors flex items-center gap-2">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* --- Middle Section: Links --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {[
            {
              header: "Discover",
              links: ["Featured Tours", "Categories", "Destinations", "Travel Guides", "Gift Cards"]
            },
            {
              header: "Company",
              links: ["About Us", "Careers", "Press", "Sustainability", "Partners"]
            },
            {
              header: "Support",
              links: ["Help Center", "Safety Information", "Cancellation Options", "Report a Concern"]
            },
            {
              header: "Contact",
              isContact: true,
              links: [
                { icon: MapPin, text: "123 Explore Ave, NY" },
                { icon: Phone, text: "+1 (555) 123-4567" },
                { icon: Mail, text: "hello@guidenest.com" },
              ]
            }
          ].map((col, idx) => (
            <div key={idx}>
              <h4 className="text-white font-semibold text-lg mb-6">{col.header}</h4>
              <ul className="space-y-4">
                {col.isContact 
                  ? col.links.map((item: any, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-sm group cursor-pointer">
                        <item.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="group-hover:text-white transition-colors">{item.text}</span>
                      </li>
                    ))
                  : col.links.map((link: any, i: number) => (
                      <li key={i}>
                        <Link href="#" className="text-sm hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
                          {link}
                        </Link>
                      </li>
                    ))
                }
              </ul>
            </div>
          ))}
        </div>

        {/* --- Bottom Section: Copyright --- */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} GuideNest Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;