 
import { serverFetch } from "@/lib/server-fetch"

export async function getAllTours(query: string = "") {
    try {
        // console.log({query})
        // const url = query ? `/tour/all-tours?limit=${query.limit}` : `/tour/all-tours`;
        // console.log({url})
        // const page = Number(query.page)
        const url = `/tour/all-tours?${query}`;
        const response = await serverFetch.get(url)
        const result = await response.json()
        return result
    } catch (error) {

        return {
            success: false,
            message: "Something went wrong",

        }

    }

}
export async function updateTourStatus(tourId: string, status: string) {
    try {

        const response = await serverFetch.patch(`/tour/update-tour-status`, {
            // 1. Define the Content-Type so the backend knows it's JSON
            headers: {
                "Content-Type": "application/json",
            },
            // 2. Put your actual data inside 'body' and stringify it
            body: JSON.stringify({
                tourId: tourId,
                status: status
            })
        });

        const result = await response.json();
        return result;

    } catch (error) {
        console.error("Update status error:", error);
        return {
            success: false,
            message: "Something went wrong",
        };
    }
}