/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch"; // Your custom fetch wrapper
import { revalidatePath } from "next/cache";

export async function becomeGuideAction(prevState: any, formData: FormData) {
  const payload = {
    bio: formData.get("bio"),
    experience: formData.get("experience"),
    country: formData.get("country"),
    city: formData.get("city"),
    contactNo: formData.get("contactNo"),
  };

  try {
    const res = await serverFetch.post("/user/become-a-guide", {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        // serverFetch likely handles the Authorization header automatically via cookies
      },
    });

    const data = await res.json();

    return data

  } catch (error: any) {
    console.error("Booking error:", error);
    return {
      success: false,
      error: error.message || "Something went wrong.",
    };
  }
}