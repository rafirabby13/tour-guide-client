import { z } from "zod";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

// Sub-schemas
const tourPricingSchema = z.object({
  minGuests: z.number().int().positive("Min guests must be positive"),
  maxGuests: z.number().int().positive("Max guests must be positive"),
  pricePerHour: z.number().positive("Price must be positive"),
})
// .refine(
//   (data) => data.maxGuests <= data.minGuests,
//   { message: "Max guests must be greater than or equal to min guests" }
// );

const tourAvailabilitySchema = z.object({
  dayOfWeek: z.number().int().min(0, "Day must be 0-6").max(6, "Day must be 0-6"),
  startTime: z.string().regex(timeRegex, "Start time must be in HH:MM format"),
  endTime: z.string().regex(timeRegex, "End time must be in HH:MM format"),
  maxBookings: z.number().int().min(1, "Max bookings must be at least 1").default(1),
})
// .refine(
//   (data) => {
//     // Convert HH:MM to minutes for proper comparison
//     const [startHour, startMin] = data.startTime.split(':').map(Number);
//     const [endHour, endMin] = data.endTime.split(':').map(Number);
//     const startMinutes = startHour * 60 + startMin;
//     const endMinutes = endHour * 60 + endMin;
//     return endMinutes > startMinutes;
//   },
//   { message: "End time must be after start time" }
// );

const blockedDateSchema = z.object({
  blockedDate: z.string().datetime("Must be a valid ISO date"),
  startTime: z.string().regex(timeRegex, "Time must be HH:MM").optional(),
  endTime: z.string().regex(timeRegex, "Time must be HH:MM").optional(),
  isAllDay: z.boolean().default(true),
  reason: z.string().max(255, "Reason too long").optional(),
});

// Create Tour Schema (frontend)
export const createTourFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(2, "Location is required"),
  guideId: z.string().uuid("Invalid guide ID"),
  availableDates: z.array(z.string().datetime("Must be valid ISO date")).optional(),
  // images: z.array(z.string()).default([]),
  tourPricings: z.array(tourPricingSchema).nonempty("At least one pricing tier required"),
  tourAvailabilities: z.array(tourAvailabilitySchema).nonempty("At least one availability slot required"),
  blockedDates: z.array(blockedDateSchema).optional(),
});

// Update Tour Schema (frontend)
export const updateTourFrontendSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  location: z.string().min(2).optional(),
  availableDates: z.array(z.string().datetime()).optional(),
  // images: z.array(z.string()).optional(),
  tourPricings: z.array(tourPricingSchema).optional(),
  tourAvailabilities: z.array(tourAvailabilitySchema).optional(),
  blockedDates: z.array(blockedDateSchema).optional(),
});

// Types for TypeScript
export type CreateTourFormInput = z.infer<typeof createTourFormSchema>;
export type UpdateTourFrontendInput = z.infer<typeof updateTourFrontendSchema>;
