import React from 'react'

const CitiesSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-[400px] rounded-2xl bg-gray-200 animate-pulse" />
            ))}
        </div>
    )
}

export default CitiesSkeleton
