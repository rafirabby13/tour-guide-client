/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from 'react';
import { getAllTours } from '@/services/admin/tourManagement';
import ToursHeader from '@/components/modules/tours/ToursHeader';
import ToursFilter from '@/components/modules/tours/ToursFilter';
import ToursGrid from '@/components/modules/tours/ToursGrid';
import TablePagination from '@/components/shared/tables/TablePagination';

// Define search params type
interface ToursPageProps {
  searchParams: {
    page?: string;
    limit?: string;
    searchTerm?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

const ToursPage = async ({ searchParams }: ToursPageProps) => {
  // Construct query string for API
  // const query = new URLSearchParams(searchParams as any).toString();
  
  // Fetch Data
  const response = await getAllTours(); // Ensure your service accepts query string
  const tours = Array.isArray(response) ? response : response?.data || [];
  const meta = response?.meta || { page: 1, limit: 10, total: 0 };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* 1. Header & Breadcrumbs */}
      <ToursHeader totalTours={meta.total} />

      <div className="container mx-auto px-4 md:px-6 pt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* 2. Sidebar Filters (Desktop) */}
          <aside className="w-full lg:w-1/4 shrink-0 hidden lg:block space-y-8">
             <ToursFilter />
          </aside>

          {/* 3. Main Content Area */}
          <main className="flex-1">
            
            {/* Mobile Filter Toggle & Sorting */}
            <div className="flex justify-between items-center mb-6 lg:hidden">
               <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg shadow-sm font-medium text-sm">
                  Filters
               </button>
               {/* Mobile Sort Dropdown here if needed */}
            </div>

            {/* Grid */}
            <Suspense fallback={<p>Loading...</p>}>
               <ToursGrid tours={tours} />
            </Suspense>

            {/* 4. Pagination */}
            <div className="mt-12">
               <TablePagination  limit={meta.limit} page={meta.page} total={meta.total} />
            </div>

          </main>
        </div>
      </div>
    </div>
  );
};

export default ToursPage;