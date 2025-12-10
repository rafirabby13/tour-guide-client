/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export const deleteTour = async (tourId: string) => {
    try {
       
        const res = await serverFetch.delete(`/tour/delete/${tourId}`);

        const result = await res.json();

        return result;

    } catch (error: any) {
        console.error("Update Tour error:", error);
        return {
            success: false,
            error: error.message || "Failed to Delete tour. Please try again.",
        };
    }
};