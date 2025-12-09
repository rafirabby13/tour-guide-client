/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";

export const getMyProfile = async () => {
    try {
      
        const res = await serverFetch.get("/user/me");

        const result = await res.json();


        return result;

    } catch (error: any) {
        console.error("Create Guide Error:", error);
        return {
            success: false,
            error: error.message || "Failed to get My Profile. Please try again."
        };
    }
}