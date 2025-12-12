/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

export async function getPopularDestinations() {
  try {
    // Calling the endpoint we just created
    const response = await serverFetch.get("/tour/popular/destinations");
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Get Popular Destinations Error:", error);
    return {
      success: false,
      message: "Something went wrong fetching destinations",
      data: [],
    };
  }
}