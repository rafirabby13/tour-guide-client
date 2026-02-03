
"use client"
import { Category } from '@/types/category'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
interface CategoryCardProps {
  cat: Category;
}
const CategoryCard = ( { cat }: CategoryCardProps ) => {

    return (
        <div
            className="group relative h-80 w-[260px] rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 mx-3"
        >
            {/* Background Image */}
            {cat?.image ? (
                <Image
                    // FIX: Use a real path, never an empty string
                    src={cat?.image || "/placeholder.jpg"}
                    alt={cat?.label || "Category"}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
            ) : (
                // Fallback if image is missing (Grey background)
                <div className="absolute inset-0 bg-gray-800 w-full h-full" />
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

            {/* Top Right Arrow */}
            <div className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-md rounded-full text-white opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <ArrowUpRight className="w-4 h-4" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="w-12 h-12 mb-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                    <cat.icon className="w-6 h-6" />
                </div>

                <h3 className="text-white font-bold text-xl leading-tight mb-1 group-hover:tracking-wide transition-all">
                    {cat?.label}
                </h3>

                <p className="text-white/70 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {cat?.count}
                </p>
            </div>
        </div>
    )
}

export default CategoryCard
