/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { createBookingZodSchema } from "./createBookingZodSchema";

export const bookTour = async (_currentState: any, formData: FormData): Promise<any> => {
  try {
    // 1. Extract Data
    // Note: Numbers come as strings from FormData, need conversion
    const rawData = {
      tourId: formData.get("tourId"),
      date: formData.get("date"),
      startTime: formData.get("startTime"),
      duration: Number(formData.get("duration")),
      numGuests: Number(formData.get("numGuests")),
    };

    // 2. Validate with your Schema
    // Your schema has { body: ... }, so we validate against that structure
    const validatedFields = createBookingZodSchema.safeParse({ body: rawData });

    if (!validatedFields.success) {
      console.log("Validation failed:", validatedFields.error.issues);
      return {
        success: false,
        errors: validatedFields.error.issues.map((issue) => ({
          field: issue.path[1], // path is ['body', 'fieldName']
          message: issue.message,
        })),
      };
    }

    // 3. Prepare Payload
    const payload = validatedFields.data.body;

    // 4. Send to Backend
    // Using your existing createBooking payload structure
    const res = await serverFetch.post("/booking/create", {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    if (!result.success) {
       return {
         success: false,
         error: result.message || "Booking failed"
       }
    }

    // Return success + payment URL (if your backend returns it)
    return {
        success: true,
        paymentUrl: result.data?.paymentUrl 
    };

  } catch (error: any) {
    console.error("Booking error:", error);
    return {
      success: false,
      error: error.message || "Something went wrong.",
    };
  }
};