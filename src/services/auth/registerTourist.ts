/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { registerValidationZodSchema } from "./validationSchemas";



export const registerTourist = async (_currentState: any, formData: FormData): Promise<any> => {
    try {
        // Extract file
        const file = formData.get("file") as File | null;

        // Validate file if provided
        if (file && file.size > 0) {
            // Check file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                return {
                    success: false,
                    errors: [{ field: "file", message: "File size must be less than 5MB" }]
                };
            }

            // Check file type
            if (!file.type.startsWith("image/")) {
                return {
                    success: false,
                    errors: [{ field: "file", message: "Only image files are allowed" }]
                };
            }
        }

        // Prepare validation data
        const validationData = {
            name: formData.get('name'),
            address: formData.get('address'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
            contactNumber: formData.get('contactNumber'),
            category: formData.get('category'),
            languages: formData.get('languages'),
            gender: formData.get('gender'),
        };

        // Validate fields
        const validatedFields = registerValidationZodSchema.safeParse(validationData);

        if (!validatedFields.success) {
            return {
                success: false,
                errors: validatedFields.error.issues.map(issue => ({
                    field: issue.path[0],
                    message: issue.message,
                }))
            };
        }

        // Prepare data for backend
        const registerData = {
            email: formData.get('email'),
            password: formData.get('password'),
            name: formData.get('name'),
            address: formData.get('address'),
            contactNumber: formData.get('contactNumber'),
            gender: formData.get('gender'),
            category: [formData.get('category')], // Convert to array
            languages: [formData.get('languages')], // Convert to array
            role: "TOURIST"
        };

        // Create new FormData for backend
        const backendFormData = new FormData();
        
        // Append data as JSON string
        backendFormData.append("data", JSON.stringify(registerData));
        
        // Append file if exists
        if (file && file.size > 0) {
            backendFormData.append("file", file);
        }

        // Send to backend
        const res = await fetch("http://localhost:5000/api/v1/user/create-tourist", {
            method: "POST",
            body: backendFormData,
        });

        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                error: data.message || "Registration failed"
            };
        }

        return {
            success: true,
            message: "Registration successful! Please login.",
            data
        };

    } catch (error) {
        console.error("Registration error:", error);
        return { 
            success: false,
            error: "Registration failed. Please try again." 
        };
    }
}