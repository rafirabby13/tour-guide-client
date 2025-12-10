import { z } from "zod";

// Enums matching your Prisma Schema
const GenderEnum = z.enum(["MALE", "FEMALE"]);
// Assuming categories/languages come as strings from the form
// If you have strict enums for these in backend, define them here.
// For now, we'll validate them as strings or arrays of strings.

/* -------------------------------------------------------------------------- */
/* BASE SCHEMA                                 */
/* -------------------------------------------------------------------------- */
// Fields common to logic, but specific constraints vary
const baseSchema = z.object({
  name: z.string().min(1, "Name is required").optional(), // Optional in Zod because we might not be updating it
  profilePhoto: z.any().optional(), // File validation handled manually in Action
});

/* -------------------------------------------------------------------------- */
/* ADMIN SCHEMA                                 */
/* -------------------------------------------------------------------------- */
// Admin: contactNumber is REQUIRED in DB
export const adminProfileSchema = baseSchema.extend({
  contactNumber: z.string().min(10, "Contact number is required for Admins"),
});

/* -------------------------------------------------------------------------- */
/* GUIDE SCHEMA                                 */
/* -------------------------------------------------------------------------- */
// Guide: ALMOST EVERYTHING IS OPTIONAL in DB (String?)
export const guideProfileSchema = baseSchema.extend({
  contactNumber: z.string().optional().or(z.literal('')), // Optional in DB
  gender: GenderEnum.optional().or(z.literal('')),       // Optional in DB
  
  bio: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  experience: z.number().min(0).optional(),
  
  // Arrays
  languages: z.array(z.string()).optional(),
  category: z.array(z.string()).optional(),
});

/* -------------------------------------------------------------------------- */
/* TOURIST SCHEMA                                */
/* -------------------------------------------------------------------------- */
// Tourist: contactNumber & gender are REQUIRED in DB
export const touristProfileSchema = baseSchema.extend({
  contactNumber: z.string().min(1, "Contact number is required for Tourists"),
  gender: GenderEnum, // Required in DB
  
  // Arrays
  languages: z.array(z.string()).optional(),
  category: z.array(z.string()).optional(),
});