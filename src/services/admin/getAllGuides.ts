import { serverFetch } from "@/lib/server-fetch"

export async function getAllGuides() {
    try {

        const response = await serverFetch.get('/user/get/guides')
        const result = await response.json()
        return result
    } catch (error) {

        return {
            success: false,
            message: "Something went wrong",

        }

    }

}