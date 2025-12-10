/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { changePasswordSchema } from "./changePasswordValidationSchema";

export async function changePasswordAction(_prevState: any, formData: FormData) {
    // 1. Extract Data
    const rawData = {
        oldPassword: formData.get("oldPassword"),
        newPassword: formData.get("newPassword"),
        confirmPassword: formData.get("confirmPassword"),
    };

    // 2. Validate Fields
    const validatedFields = changePasswordSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.issues.map((issue) => ({
                field: issue.path[0],
                message: issue.message,
            })),
        };
    }

    console.log({ rawData })
    const data = {
        oldPassword: rawData.oldPassword,
        newPassword: rawData.newPassword,
    }

    console.log(data)

    // 3. Call Backend
    try {
        const res = await serverFetch.post("/user/change-password", {
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        });

        const result = await res.json();
        return result;

    } catch (error: any) {
        return {
            success: false,
            error: error.message || "Failed to change password",
        };
    }
}