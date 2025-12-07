// services/auth/validationSchemas.ts
import { z } from "zod";

export const registerValidationZodSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),

  email: z.string().email({ message: "Valid email is required" }),

  password: z.string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(100, { message: "Password must be at most 100 characters long" }),

  confirmPassword: z.string()
    .min(6, { message: "Confirm Password must be at least 6 characters long" }),

  address: z.string().optional(),

  contactNumber: z.string().regex(/^\+?[0-9]+$/, {
    message: "Invalid phone number",
  }),

  category: z.string({ message: "Category is required" })
    .min(1, "Category is required"),

  languages: z.string({ message: "Language is required" })
    .min(1, "Language is required"),

  gender: z.enum(["MALE", "FEMALE"], {
    message: "Gender is required",
  }),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});




export const loginValidationZodSchema = z.object({
    email: z.email({
        message: "Email is required",
    }),
    password: z.string("Password is required").min(6, {
        error: "Password is required and must be at least 6 characters long",
    }).max(100, {
        error: "Password must be at most 100 characters long",
    }),
});