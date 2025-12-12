"use client"
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Slider } from "@/components/ui/slider" // Assuming you have shadcn/ui slider
import { Button } from "@/components/ui/button";

const ToursFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [priceRange, setPriceRange] = useState([0, 500]);

  // Handle URL updates
  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/tours?${params.toString()}`);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm sticky top-24">
      <h3 className="font-bold text-lg mb-6">Filters</h3>

      {/* Search */}
      <div className="mb-8">
        <label className="text-sm font-medium text-gray-700 mb-2 block">Search</label>
        <input 
          type="text" 
          placeholder="Keyword..."
          className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none"
          onChange={(e) => updateFilter("searchTerm", e.target.value)}
        />
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
           <label className="text-sm font-medium text-gray-700">Price Range</label>
           <span className="text-xs text-gray-500">${priceRange[0]} - ${priceRange[1]}+</span>
        </div>
        <Slider 
           defaultValue={[0, 500]} 
           max={1000} 
           step={10} 
           onValueChange={(val) => setPriceRange(val)}
           onValueCommit={(val) => {
              updateFilter("minPrice", val[0].toString());
              updateFilter("maxPrice", val[1].toString());
           }}
        />
      </div>

      {/* Reset Button */}
      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => router.push('/tours')}
      >
        Reset All Filters
      </Button>
    </div>
  );
};

export default ToursFilter;