import { z } from "zod";

export const createBookingZodSchema = z.object({
  body: z.object({
    tourId: z.string({ message: "Tour ID is required" }).uuid({
      message: "Tour ID must be a valid UUID",
    }),

    date: z.string({ message: "Date is required" })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format. Please use YYYY-MM-DD",
      })
      .refine((val) => {
        const selectedDate = new Date(val);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to compare dates only
        return selectedDate >= today;
      }, {
        message: "Booking date cannot be in the past",
      }),

    startTime: z.string({ message: "Start time is required" })
      .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: "Start time must be in HH:MM format (24-hour)",
      }),

    duration: z.number({ message: "Duration must be a number" })
      .positive({ message: "Duration must be positive" })
      .max(24, { message: "Duration cannot exceed 24 hours" }),

    numGuests: z.number({ message: "Guest count must be a number" })
      .int({ message: "Number of guests must be an integer" })
      .min(1, { message: "At least 1 guest is required" }),
  }),
});

// Export the type for use in your Server Actions or Frontend components
export type CreateBookingInput = z.infer<typeof createBookingZodSchema>['body'];