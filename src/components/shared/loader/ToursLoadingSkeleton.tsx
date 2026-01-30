import React from 'react'

const ToursLoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="h-[400px] w-full bg-gray-200 animate-pulse rounded-xl"></div>
        ))}
    </div>
  )
}

export default ToursLoadingSkeleton
