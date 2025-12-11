/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";

export const getSingleTour = async (id: string) => {
    try {
      
        const res = await serverFetch.get(`/tour/${id}`);

        const result = await res.json();


        return result;

    } catch (error: any) {
        console.error("Get tourError:", error);
        return {
            success: false,
            error: error.message || "Failed to get tour. Please try again."
        };
    }
}