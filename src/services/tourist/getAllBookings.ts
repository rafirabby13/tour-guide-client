/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";

export const getMyBookings = async () => {
    try {
      
        const res = await serverFetch.get("/booking/my-bookings");

        const result = await res.json();


        return result;

    } catch (error: any) {
        console.error("Get Booking Error:", error);
        return {
            success: false,
            error: error.message || "Failed to get My Bookings. Please try again."
        };
    }
}