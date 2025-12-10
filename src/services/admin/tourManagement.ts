/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch"

export async function getAllTours(query: { [key: string]: string | string[] | undefined }) {
    try {

        // const page = Number(query.page)
        const response = await serverFetch.get(`/tour/all-tours`)
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