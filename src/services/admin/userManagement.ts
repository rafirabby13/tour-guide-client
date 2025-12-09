/* eslint-disable @typescript-eslint/no-unused-vars */
import { serverFetch } from "@/lib/server-fetch";

export async function getAllUsers() {
    try {
        const response = await serverFetch.get("/user/all-users")
        const result = await response.json()
        return result
    } catch (error) {

        return {
            success: false,
            message: "Something went wrong",

        }

    }

}

export async function createAdmin(formData: FormData) {
    try {
        // ⚠️ Note: Do NOT set 'Content-Type': 'application/json' for FormData
        // The browser/fetch automatically sets the correct multipart boundary
        const response = await serverFetch.post("/user/create-admin", {
            body: formData, 
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: "Failed to create admin" };
    }
}


export async function createGuide(formData: FormData) {
    try {
        const response = await serverFetch.post("/user/create-guide", {
            body: formData,
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: "Failed to create guide" };
    }
}

export async function updateUserRole(userId: string, role: string) {
    try {
        const response = await serverFetch.patch(`/user/${userId}/role`, {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ role }),
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: "Failed to update user role" };
    }
}


export async function updateUserStatus(userId: string, status: "ACTIVE" | "INACTIVE" | "DELETED") {
    try {
        const response = await serverFetch.patch(`/user/${userId}/update-status`,{
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status }),
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: "Failed to toggle user status" };
    }
}

export async function deleteUser(userId: string) {
    try {
        const response = await serverFetch.delete(`/user/${userId}`);
        return await response.json();
    } catch (error) {
        return { success: false, message: "Failed to delete user" };
    }
}

export async function updateUserProfileByAdmin(userId: string, formData: FormData) {
    try {
        const response = await serverFetch.patch(`/user/${userId}`, {
            body: formData,
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: "Failed to update user profile" };
    }
}