"use client"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Compass, MoveLeft, Home, Map } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-slate-50">
      
      {/* --- Background Texture (Map Pattern) --- */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
           style={{ 
             backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', 
             backgroundSize: '24px 24px' 
           }}>
      </div>
      
      {/* --- Ambient Glows --- */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />

      {/* --- Main Content Card --- */}
      <div className="relative z-10 text-center px-4 animate-in fade-in zoom-in duration-700 slide-in-from-bottom-4">
        
        {/* Floating 404 Graphic */}
        <div className="relative inline-flex items-center justify-center mb-8">
          {/* Radar Pulse Effect */}
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-20 duration-1000" />
          <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse delay-150" />
          
          <div className="relative bg-white p-6 rounded-full shadow-2xl border border-slate-100">
            <Compass className="w-24 h-24 text-primary animate-[spin_10s_linear_infinite]" strokeWidth={1} />
          </div>

          {/* Decorative "404" Badge */}
          <div className="absolute -top-2 -right-4 bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg rotate-12">
            Error 404
          </div>
        </div>

        {/* Text Content */}
        <div className="max-w-md mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Off the Map
          </h1>
          <p className="text-lg text-slate-500">
            Even the best explorers get lost sometimes. The page you are looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Button asChild size="lg" className="rounded-full px-8 shadow-lg hover:shadow-primary/25 transition-all">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 bg-white/50 backdrop-blur-sm border-slate-200 hover:bg-white transition-all">
            <Link href="/tours">
              <Map className="mr-2 h-4 w-4" />
              Explore Tours
            </Link>
          </Button>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-sm text-slate-400 flex items-center justify-center gap-2">
          <MoveLeft className="w-4 h-4" />
          <span className="cursor-pointer hover:text-primary transition-colors" onClick={() => window.history.back()}>
            Go back to previous page
          </span>
        </div>

      </div>
    </div>
  );
};

export default NotFound;