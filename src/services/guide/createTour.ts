/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { createTourFormSchema } from "@/components/modules/guide/tour.schema";
import { serverFetch } from "@/lib/server-fetch";
import { getMyProfile } from "../commmon/myProfile";

export const createTour = async (_currentState: any, formData: FormData): Promise<any> => {
    try {
        // 1. Extract and Validate Files
        const files = formData.getAll("images") as File[];
        const validFiles: File[] = [];

        const guide = await getMyProfile();


        console.log({guide})

        for (const file of files) {
            if (file.size === 0) continue; // skip empty
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

        // 2. Extract Pricing Tiers
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

        // 3. Extract Availability Slots
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

        // 4. Extract Blocked Dates (Optional)
        const blockedDates: any[] = [];
        let b = 0;
        while (formData.has(`blockedDates[${b}][blockedDate]`)) {
            blockedDates.push({
                blockedDate: formData.get(`blockedDates[${b}][blockedDate]`)
            });
            b++;
        }

        // 5. Prepare Validation Data Object
        const rawData = {
            title: formData.get("title"),
            description: formData.get("description"),
            location: formData.get("location"),
            guideId: guide.data.id,
            tourPricings,
            tourAvailabilities,
            blockedDates: blockedDates.length > 0 ? blockedDates : undefined,
            // images: validFiles.length > 0 ? validFiles.map(() => "valid-image-placeholder") : [],
        };


        const validatedFields = createTourFormSchema.safeParse(rawData);
        if (!validatedFields.success) {
            console.log("Validation failed:", validatedFields.error.issues);
            return {
                success: false,
                errors: validatedFields.error.issues.map((issue: { path: any[]; message: any }) => ({
                    field: issue.path.join("."),
                    message: issue.message,
                })),
            };
        }

        // 7. Prepare Backend FormData (multipart/form-data)
        const backendFormData = new FormData();

        // Add JSON data as 'data' field
        const payload = {
            ...validatedFields.data,
            images: [], // Backend will populate after upload
        };
        backendFormData.append("data", JSON.stringify(payload));

        // Add all files with field name 'files' (matching backend expectation)
        validFiles.forEach((file) => {
            backendFormData.append("files", file);
        });

        console.log(backendFormData.get('data'))

        const data = backendFormData.get('data')

        // 8. Send to Backend
        const res = await serverFetch.post("/tour/create-tour", {
            // headers: {
            //     'Content-type': 'application/json'
            // },
            body:backendFormData,
        });

        const result = await res.json();



        return  result ;
    } catch (error: any) {
        console.error("Create Tour error:", error);
        return {
            success: false,
            error: error.message || "Failed to create tour. Please try again.",
        };
    }
};