import { z } from "zod";

export const createReviewSchema = z.object({
    body: z.object({
        rating: z.number()
            .int("Rating must be an integer")
            .min(1, "Rating must be at least 1")
            .max(5, "Rating must be at most 5"),
        comment: z.string().optional(),
        bookingId: z.string().uuid("Invalid booking ID"),
        tourId: z.string().uuid("Invalid tour ID")
    })
});