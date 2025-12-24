/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";

export const acceptGuideRequest = async (_currentState: any, formData: FormData): Promise<any> => {
    try {
      

     
        const res = await serverFetch.post("/user/accept/verfiy");

        const result = await res.json();


        return result;

    } catch (error: any) {
        console.error("Create Admin Error:", error);
        return {
            success: false,
            error: error.message || "Failed to create Admin. Please try again."
        };
    }
}