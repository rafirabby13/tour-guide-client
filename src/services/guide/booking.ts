/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";

export const getGuideBookings= async () => {
    try {
      
        const res = await serverFetch.get("/booking/guide-bookings");

        const result = await res.json();


        return result;

    } catch (error: any) {
        console.error("Get All Booking Error:", error);
        return {
            success: false,
            error: error.message || "Failed to get Bookings. Please try again."
        };
    }
}