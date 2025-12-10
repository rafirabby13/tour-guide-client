/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { createTourFormSchema } from "@/components/modules/guide/tour.schema"; // or wherever your schema is
import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";

export const updateTour = async (_currentState: any, formData: FormData): Promise<any> => {
    try {
        const id = formData.get("id") as string;
        if (!id) {
            return { success: false, error: "Tour ID is missing." };
        }

        // 1. Extract and Validate NEW Files
        // The EditDialog sends new files as "newImages"
        const files = formData.getAll("newImages") as File[]; 
        const validFiles: File[] = [];

        for (const file of files) {
            // Check if it's a real file (sometimes empty inputs send empty blobs)
            if (file.size === 0 || file.name === "undefined") continue;

            if (file.size > 5 * 1024 * 1024) {
                return {
                    success: false,
                    errors: [{ field: "images", message: `File ${file.name} is too large (Max 5MB)` }],
                };
            }
            if (!file.type.startsWith("image/")) {
                return {
                    success: false,
                    errors: [{ field: "images", message: `File ${file.name} is not a valid image` }],
                };
            }
            validFiles.push(file);
        }

        // 2. Extract Deleted Images List
        const deletedImagesRaw = formData.get("deletedImages");
        const deletedImages = deletedImagesRaw ? JSON.parse(deletedImagesRaw as string) : [];

        // 3. Extract Pricing Tiers
        const tourPricings: any[] = [];
        let p = 0;
        while (formData.has(`tourPricings[${p}][minGuests]`)) {
            tourPricings.push({
                minGuests: Number(formData.get(`tourPricings[${p}][minGuests]`)),
                maxGuests: Number(formData.get(`tourPricings[${p}][maxGuests]`)),
                pricePerHour: Number(formData.get(`tourPricings[${p}][pricePerHour]`)),
            });
            p++;
        }

        // 4. Extract Availability Slots
        const tourAvailabilities: any[] = [];
        let a = 0;
        while (formData.has(`tourAvailabilities[${a}][dayOfWeek]`)) {
            tourAvailabilities.push({
                dayOfWeek: Number(formData.get(`tourAvailabilities[${a}][dayOfWeek]`)),
                startTime: formData.get(`tourAvailabilities[${a}][startTime]`) as string,
                endTime: formData.get(`tourAvailabilities[${a}][endTime]`) as string,
                maxBookings: Number(formData.get(`tourAvailabilities[${a}][maxBookings]`)),
            });
            a++;
        }

        // 5. Prepare Validation Data Object
        // We reuse the create schema to ensure data integrity
        const rawData = {
            title: formData.get("title"),
            description: formData.get("description"),
            location: formData.get("location"),
            guideId: formData.get("guideId"), // Passed as hidden input from Edit Dialog
            availableDates: formData.getAll("availableDates") as string[] || [],
            tourPricings,
            tourAvailabilities,
            // Images are handled separately for updates, but schema might require an array
            // We pass an empty array or placeholder to satisfy Zod if it checks for array presence
            // images: [], 
        };

        const validatedFields = createTourFormSchema.safeParse(rawData);

        if (!validatedFields.success) {
            console.log("Validation failed:", validatedFields.error.issues);
            return {
                success: false,
                errors: validatedFields.error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message,
                })),
            };
        }

        // 6. Prepare Backend FormData
        const backendFormData = new FormData();

        // Add JSON data
        const payload = {
            ...validatedFields.data,
            deletedImages: deletedImages, // Send list of URLs to delete
            // The backend should handle merging existing images - deletedImages + newFiles
        };

        backendFormData.append("data", JSON.stringify(payload));

        // Add New Files
        validFiles.forEach((file) => {
            backendFormData.append("files", file); // Key matches backend 'files' expectation
        });

        // 7. Send to Backend (PATCH or PUT)
        const res = await serverFetch.patch(`/tour/update-tour/${id}`, {
            body: backendFormData,
        });

        const result = await res.json();

        if (result.success) {
            revalidatePath("/dashboard/tours"); // Update the list view
            revalidatePath(`/dashboard/tours/${id}`); // Update details view
        }

        return result;

    } catch (error: any) {
        console.error("Update Tour error:", error);
        return {
            success: false,
            error: error.message || "Failed to update tour. Please try again.",
        };
    }
};