/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllTours } from '@/services/admin/tourManagement';
import ToursGrid from './ToursGrid';
import TablePagination from '@/components/shared/tables/TablePagination';


const TourResults = async ({ query }: { query: string }) => {
    const response = await getAllTours(query as number | any);
    const toursData = response?.data || [];
    const publishedTours = Array.isArray(toursData)
        ? toursData.filter((tour: any) => tour.status === "PUBLISHED")
        : [];
    const meta = response?.meta || { page: 1, limit: 10, total: 0 };

    console.log({response}, {publishedTours})
    if (publishedTours.length === 0) {
        return <div className="text-center py-20">No tours found.</div>;
    }
    return (
        <>
          
          
            <ToursGrid tours={publishedTours} />

            <div className="mt-12">
                <TablePagination limit={meta.limit} page={meta.page} total={meta.total} />
            </div>
        </>
    )
}

export default TourResults
