/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export const cancelBooking = async (bookingId: string) => {
    try {
       
        const res = await serverFetch.patch(`/booking/${bookingId}/cancel`);

        const result = await res.json();

        return result;

    } catch (error: any) {
        console.error("Cancel booking error:", error);
        return {
            success: false,
            error: error.message || "Failed to cancel booking. Please try again.",
        };
    }
};