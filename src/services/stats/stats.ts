/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch"

// ==========================================
// 🛡️ ADMIN STATS SERVICES
// ==========================================

export async function getAdminDashboardStats() {
    try {
        const response = await serverFetch.get(`/stats/dashboard`)
        const result = await response.json()
        return result
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong fetching dashboard stats",
        }
    }
}

export async function getAdminBookingStats() {
    try {
        const response = await serverFetch.get(`/stats/bookings`)
        const result = await response.json()
        return result
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong fetching booking stats",
        }
    }
}

export async function getAdminPaymentStats() {
    try {
        const response = await serverFetch.get(`/stats/payments`)
        const result = await response.json()
        return result
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong fetching payment stats",
        }
    }
}

export async function getAdminTourStats() {
    try {
        const response = await serverFetch.get(`/stats/tours`)
        const result = await response.json()
        return result
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong fetching tour stats",
        }
    }
}

export async function getAdminUserStats() {
    try {
        const response = await serverFetch.get(`/stats/users`)
        const result = await response.json()
        return result
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong fetching user stats",
        }
    }
}

// ==========================================
// 🧭 GUIDE STATS SERVICES
// ==========================================

export async function getMyGuideStats() {
    try {
        const response = await serverFetch.get(`/stats/my-stats`)
        const result = await response.json()
        return result
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong fetching guide stats",
        }
    }
}

export async function getGuideStatsById(guideId: string) {
    try {
        const response = await serverFetch.get(`/stats/guide/${guideId}`)
        const result = await response.json()
        return result
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong fetching specific guide stats",
        }
    }
}

// ==========================================
// 🎒 TOURIST STATS SERVICES
// ==========================================

export async function getMyTouristStats() {
    try {
        const response = await serverFetch.get(`/stats/my-tourist-stats`)
        const result = await response.json()
        return result
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong fetching tourist stats",
        }
    }
}

export async function getTouristStatsById(touristId: string) {
    try {
        const response = await serverFetch.get(`/stats/tourist/${touristId}`)
        const result = await response.json()
        return result
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong fetching specific tourist stats",
        }
    }
}