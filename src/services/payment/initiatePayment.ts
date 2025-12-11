/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export const initiatePayment = async (bookingId: string) => {
  try {
    console.log("/...................asdfsdg......dg",{bookingId})
    const res = await serverFetch.post(`/payment/initiate/${bookingId}`);

    const result = await res.json();

    if (!result.success) {
       return {
         success: false,
         error: result.message || "Booking failed"
       }
    }

   
    return {
        success: true,
        paymentUrl: result.data?.paymentUrl 
    };

  } catch (error: any) {
    console.error("Payment error:", error);
    return {
      success: false,
      error: error.message || "Something went wrong.",
    };
  }
};