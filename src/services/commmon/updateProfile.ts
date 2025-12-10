/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { getCookie } from "../auth/tokenHandlers";
import { getMyProfile } from "./myProfile";
import { adminProfileSchema, guideProfileSchema, touristProfileSchema } from "./updateProfileValidationSchema";

export const updateMyProfile = async (_currentState: string, formData: FormData): Promise<any> => {
    try {
        console.log(".......sdfsdgsdfg.......")
        const file = formData.get("file") as File | null;
        const profile = await getMyProfile()

        // console.log(profile?.data?.role)
        const role = profile?.data?.role


        console.log({ role })

        if (file && file.size > 0) {
            if (file.size > 5 * 1024 * 1024) {
                return {
                    success: false,
                    errors: [{ field: "file", message: "File size must be less than 5MB" }]
                };
            }
            if (!file.type.startsWith("image/")) {
                return {
                    success: false,
                    errors: [{ field: "file", message: "Only image files are allowed" }]
                };
            }
        }

        const getValue = (key: string) => {
            const value = formData.get(key);
            // Convert empty string "" or null to undefined
            return value && value !== "null" && value !== "" ? value : undefined;
        };

        const rawData = {
            name: getValue("name"),
            address: getValue("address"),
            contactNumber: getValue("contactNumber"),
            bio: getValue("bio"),

            // 👇 FIX: This ensures gender is 'undefined' instead of 'null' if not selected
            gender: getValue("gender"),

            city: getValue("city"),
            country: getValue("country"),
            experience: formData.get("experience") ? Number(formData.get("experience")) : undefined,

            // Arrays need getAll
            languages: formData.getAll("languages"),
            category: formData.getAll("category"),
        };

        console.log({ rawData })

        let validatedFields;

        if (role === "GUIDE") {
            validatedFields = guideProfileSchema.safeParse(rawData);
        } else if (role === "TOURIST") {
            validatedFields = touristProfileSchema.safeParse(rawData);
        } else if (role === "ADMIN") {
            validatedFields = adminProfileSchema.safeParse(rawData);
        } else {
            return { success: false, error: "Invalid User Role" };
        }

        if (!validatedFields.success) {
            console.log("false........")
            return {
                success: false,
                errors: validatedFields.error.issues.map(issue => ({
                    field: issue.path[0],
                    message: issue.message,
                }))
            };
        }


        const updateData: any = { ...validatedFields.data };
        Object.keys(updateData).forEach(key => {
            if (updateData[key] === null || updateData[key] === "" || updateData[key] === undefined) {
                delete updateData[key];
            }
        });

        const backendFormData = new FormData();


        backendFormData.append("data", JSON.stringify(updateData));
        console.log({ backendFormData })

        if (file && file.size > 0) {
            backendFormData.append("file", file);
        }
        console.log("...............................fdsgdfg............dfsg")
        console.log(".............", { backendFormData })

        const res = await serverFetch.patch("/user/update-profile", {
            body: backendFormData,
        });

        const result = await res.json();

        return result;

    } catch (error: any) {
        console.error("Update Profile Error:", error);
        return {
            success: false,
            error: "Update failed. Please try again."
        };
    }
}