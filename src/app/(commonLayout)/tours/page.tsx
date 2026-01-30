/* eslint-disable @typescript-eslint/no-explicit-any */
// export const dynamic = "force-dynamic"; // <--- ADD THIS
import React, { Suspense } from 'react';
import { getAllTours } from '@/services/admin/tourManagement';
import ToursFilter from '@/components/modules/tours/ToursFilter';
import ToursGrid from '@/components/modules/tours/ToursGrid';
import TablePagination from '@/components/shared/tables/TablePagination';
import SectionHeader from '@/components/shared/home/SectionHeader';
import ToursLoadingSkeleton from '@/components/shared/loader/ToursLoadingSkeleton';
import TourResults from '@/components/modules/tours/TourResults';

interface ToursPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const ToursPage = async (props: ToursPageProps) => {
  const searchParams = await props.searchParams;
  const queryParams = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      if (Array.isArray(value)) {
        // Handle array params (e.g. category=a&category=b)
        value.forEach(v => queryParams.append(key, v));
      } else {
        // Handle single string
        queryParams.append(key, value);
      }
    }
  });
  const query = queryParams.toString();
  const response = await getAllTours(query);


  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-5">
      {/* 1. Header & Breadcrumbs */}
      {/* <ToursHeader totalTours={publishedTours.length} /> */}

      <SectionHeader title='Explore All ' highlight='Experiences' align='center' subtitle="Find your next adventure" />

      <div className="container mx-auto px-4 md:px-6 pt-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* 2. Sidebar Filters (Desktop) */}
          <aside className="w-full lg:w-1/4 shrink-0 hidden lg:block space-y-8">
            <Suspense fallback={<div>Loading filters...</div>}>
              <ToursFilter />
            </Suspense>
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
            {/* <Suspense fallback={<p>Loading...</p>}>
              <ToursGrid tours={publishedTours} />
            </Suspense>

           
            <div className="mt-12">
              <Suspense fallback={<p>Loading...</p>}>

                <TablePagination limit={meta.limit} page={meta.page} total={meta.total} />
              </Suspense>
            </div> */}
            <Suspense key={query} fallback={<ToursLoadingSkeleton />}>
              <TourResults query={query} />
            </Suspense>

          </main>
        </div>
      </div>
    </div>
  );
};

export default ToursPage;