import { z } from "zod";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

// Sub-schemas
const tourPricingSchema = z.object({
  minGuests: z.number().int().positive("Min guests must be positive"),
  maxGuests: z.number().int().positive("Max guests must be positive"),
  pricePerHour: z.number().positive("Price must be positive"),
})

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// 1. Individual Slot Schema
const tourAvailabilitySchema = z.object({
  dayOfWeek: z.coerce.number().min(0).max(6),
  startTime: z.string().min(1, "Required"),
  endTime: z.string().min(1, "Required"),
  maxBookings: z.coerce.number().min(1, "Min 1 capacity"),
}).refine((data) => {
  // Logic: End time must be after start time
  return data.endTime > data.startTime;
}, {
  message: "End time must be after start time",
  path: ["endTime"], // This puts the red error text specifically under the "End Time" input
});

const blockedDateSchema = z.object({
  blockedDate: z.string().datetime("Must be a valid ISO date"),
  startTime: z.string().regex(timeRegex, "Time must be HH:MM").optional(),
  endTime: z.string().regex(timeRegex, "Time must be HH:MM").optional(),
  isAllDay: z.boolean().default(true),
  reason: z.string().max(255, "Reason too long").optional(),
});

const validPricingList = z.array(tourPricingSchema)
  .nonempty("At least one pricing tier required")
  .superRefine((tiers, ctx) => {
    tiers.sort((a, b) => a.minGuests - b.minGuests); // Sort for easier reading
    
    for (let i = 0; i < tiers.length; i++) {
      const tier = tiers[i];
      if (tier.minGuests > tier.maxGuests) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Min guests cannot be greater than Max guests`,
          path: [i, "minGuests"],
        });
      }

      for (let j = i + 1; j < tiers.length; j++) {
        const other = tiers[j];
        // Check Overlap
        if (tier.minGuests <= other.maxGuests && tier.maxGuests >= other.minGuests) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Conflict! Overlaps with guests ${tier.minGuests}-${tier.maxGuests}`,
            path: [j, "minGuests"],
          });
        }
      }
    }
  });
const validAvailabilityList = z.array(tourAvailabilitySchema)
  .nonempty("At least one availability slot is required")
  .superRefine((items, ctx) => {
    // Define type for logic
    type AvailabilityWithIndex = z.infer<typeof tourAvailabilitySchema> & { _index: number };
    
    const slotsByDay = new Map<number, AvailabilityWithIndex[]>();

    // Group by Day
    items.forEach((item, index) => {
      if (!slotsByDay.has(item.dayOfWeek)) slotsByDay.set(item.dayOfWeek, []);
      slotsByDay.get(item.dayOfWeek)?.push({ ...item, _index: index });
    });

    // Check Overlaps per Day
    slotsByDay.forEach((daySlots, dayIndex) => {
      daySlots.sort((a, b) => a.startTime.localeCompare(b.startTime));

      for (let i = 0; i < daySlots.length - 1; i++) {
        const current = daySlots[i];
        const next = daySlots[i + 1];

        if (current.endTime > next.startTime) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Time Conflict! Starts ${next.startTime} but previous slot ends ${current.endTime}.`,
            path: [next._index, "startTime"], 
          });
        }
      }
    });
  });
export const createTourFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(2, "Location is required"),
  guideId: z.string().uuid("Invalid guide ID"),
  availableDates: z.array(z.string().datetime("Must be valid ISO date")).optional(),
  tourPricings: validPricingList,
  tourAvailabilities: validAvailabilityList,
  blockedDates: z.array(blockedDateSchema).optional(),
});

// Update Tour Schema (frontend)
export const updateTourFrontendSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  location: z.string().min(2).optional(),
  availableDates: z.array(z.string().datetime()).optional(),
  tourPricings: validPricingList.optional(),
  tourAvailabilities: validAvailabilityList.optional(),
  blockedDates: z.array(blockedDateSchema).optional(),
});

// Types for TypeScript
export type CreateTourFormInput = z.infer<typeof createTourFormSchema>;
export type UpdateTourFrontendInput = z.infer<typeof updateTourFrontendSchema>;
