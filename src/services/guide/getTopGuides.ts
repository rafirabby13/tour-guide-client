/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch"

export async function getTopGuides() {
    try {

        // const page = Number(query.page)
        const response = await serverFetch.get(`/user/top-guides`)
        // const response = await serverFetch.get(`/tour/my-tours?page=${page ? page : 1}`)
        const result = await response.json()
        return result
    } catch (error) {

        return {
            success: false,
            message: "Something went wrong",

        }

    }

}
