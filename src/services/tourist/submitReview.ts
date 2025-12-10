/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";
import { createReviewSchema } from "./review.schema";

export const submitReview = async (_currentState: any, formData: FormData): Promise<any> => {
  try {
    // 1. Extract Data
    const rawData = {
      bookingId: formData.get("bookingId"),
      rating: Number(formData.get("rating")), // Convert string to number
      comment: formData.get("comment") || undefined, // Send undefined if empty string
    };

    // 2. Validate against your schema structure { body: ... }
    const validatedFields = createReviewSchema.safeParse({ body: rawData });

    if (!validatedFields.success) {
      return {
        success: false,
        error: validatedFields.error.issues[0].message || "Invalid input",
      };
    }

    // 3. Send to Backend
    // Adjust endpoint URL as needed
    const res = await serverFetch.post("/review/create", {
      body: JSON.stringify(validatedFields.data.body), // Send just the body object
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    if (!result.success) {
      return {
        success: false,
        error: result.message || "Failed to submit review",
      };
    }

    // 4. Revalidate to show "Reviewed" status on dashboard
    revalidatePath("/dashboard/tourist/bookings");

    return { success: true };

  } catch (error: any) {
    console.error("Review error:", error);
    return {
      success: false,
      error: error.message || "Something went wrong.",
    };
  }
};