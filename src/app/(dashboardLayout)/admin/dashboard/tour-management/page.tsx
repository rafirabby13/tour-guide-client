"use server"
import TourManagementTable from '@/components/modules/admin/TourManagementTable'
import { getAllTours } from '@/services/admin/tourManagement'

interface SearchParamsProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const AllToursPage = async ({ searchParams }: SearchParamsProps) => {
    // 1. Await params for pagination
    const query = await searchParams;
    
    // 2. Fetch tours with the query (page, limit, etc.)
    const toursResponse = await getAllTours(query);

    return (
        <div>
            <TourManagementTable 
                tours={toursResponse?.data || []} 
                meta={toursResponse?.meta || { page: 1, limit: 10, total: 0 }}
            />
        </div>
    )
}

export default AllToursPage