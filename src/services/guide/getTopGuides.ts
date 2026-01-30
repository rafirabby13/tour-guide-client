 
import { serverFetch } from "@/lib/server-fetch"

export async function getTopGuides(limit: number = 4) {
    try {

        console.log({limit})
        // const page = Number(query.page)
        const response = await serverFetch.get(`/user/top-guides?limit=${limit}`)
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
