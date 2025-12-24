"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatItem {
  label: string;
  value: number;
  suffix?: string;
}

export default function CountUpStats({ stats }: { stats: StatItem[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div 
      ref={ref} 
      className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 relative"
    >
      {/* Vertical Dividers for Desktop */}
      <div className="hidden md:block absolute top-1/2 left-1/4 w-px h-12 bg-slate-200 -translate-y-1/2" />
      <div className="hidden md:block absolute top-1/2 left-1/2 w-px h-12 bg-slate-200 -translate-y-1/2" />
      <div className="hidden md:block absolute top-1/2 left-3/4 w-px h-12 bg-slate-200 -translate-y-1/2" />

      {stats.map((stat, idx) => (
        <Counter 
          key={idx} 
          target={stat.value} 
          label={stat.label} 
          suffix={stat.suffix} 
          play={isInView} 
        />
      ))}
    </div>
  );
}

function Counter({ target, label, suffix = "", play }: { target: number; label: string; suffix?: string; play: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!play) return;

    let startTime: number | null = null;
    const duration = 2000; // 2 seconds

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function (easeOutExpo) for a premium feel
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [target, play]);

  return (
    <div className="flex flex-col items-center justify-center space-y-2 group cursor-default">
      <div className={cn(
        "text-4xl md:text-5xl font-extrabold tracking-tight tabular-nums",
        "bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600"
      )}>
        {count}
        <span className="text-primary ml-0.5">{suffix}</span>
      </div>
      <div className="text-sm font-semibold text-slate-500 uppercase tracking-widest group-hover:text-primary transition-colors duration-300">
        {label}
      </div>
    </div>
  );
}