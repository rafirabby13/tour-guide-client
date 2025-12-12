import React from 'react';

const ToursHeader = ({ totalTours }: { totalTours: number }) => {
  return (
    <div className="bg-white border-b py-12">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Explore All Experiences
        </h1>
        <p className="text-gray-500 text-lg">
          {totalTours > 0 
            ? `Showing ${totalTours} hand-picked tours for you` 
            : "Find your next adventure"}
        </p>
      </div>
    </div>
  );
};

export default ToursHeader;