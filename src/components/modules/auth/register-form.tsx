/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerTourist } from "@/services/auth/registerTourist";
import { useActionState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
    const [state, formAction, isPending] = useActionState(registerTourist, null);
    const [preview, setPreview] = useState<string | null>(null);

    const router = useRouter()
  
    const getFieldError = (fieldName: string) => {
        if (state?.errors) {
            const error = state.errors.find((err: any) => err.field === fieldName);
            return error ? error.message : null;
        }
        return null;
    };

    // 🔥 Handle Image Upload Preview
    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert("File size must be less than 5MB");
            return;
        }

        // Validate file type
        if (!file.type.startsWith("image/")) {
            alert("Only image files are allowed");
            return;
        }

        // Show preview
        setPreview(URL.createObjectURL(file));
    };

    if (state?.error) {
        Swal.fire({
            title: `Error Occured! ${state.error}`,
            icon: "error",
            draggable: true
        });
    }
    if (state?.success) {
        Swal.fire({
            title: ` ${state.message}`,
            icon: "success",
            draggable: true
        });
        router.push("/login")
    }

    return (
        <form action={formAction}>
            <FieldGroup>
                {/* {state?.error && (
                    <div className="bg-red-50 text-red-600 px-4 py-3 rounded-md text-sm mb-4">
                        {state.error}
                    </div>
                )}

                {state?.success && (
                    <div className="bg-green-50 text-green-600 px-4 py-3 rounded-md text-sm mb-4">
                        {state.message}
                    </div>
                )} */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <Field>
                        <FieldLabel htmlFor="name">Full Name</FieldLabel>
                        <Input id="name" name="name" type="text" placeholder="John Doe" />
                        {getFieldError("name") && (
                            <FieldDescription className="text-red-600">
                                {getFieldError("name")}
                            </FieldDescription>
                        )}
                    </Field>

                    {/* Address */}
                    <Field>
                        <FieldLabel htmlFor="address">Address</FieldLabel>
                        <Input
                            id="address"
                            name="address"
                            type="text"
                            placeholder="123 Main St"
                        />
                        {getFieldError("address") && (
                            <FieldDescription className="text-red-600">
                                {getFieldError("address")}
                            </FieldDescription>
                        )}
                    </Field>

                    {/* Email */}
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="m@example.com"
                        />
                        {getFieldError("email") && (
                            <FieldDescription className="text-red-600">
                                {getFieldError("email")}
                            </FieldDescription>
                        )}
                    </Field>

                    {/* Contact Number */}
                    <Field>
                        <FieldLabel htmlFor="contactNumber">Contact Number</FieldLabel>
                        <Input
                            id="contactNumber"
                            name="contactNumber"
                            type="text"
                            placeholder="+8801XXXXXXXXX"
                        />
                        {getFieldError("contactNumber") && (
                            <FieldDescription className="text-red-600">
                                {getFieldError("contactNumber")}
                            </FieldDescription>
                        )}
                    </Field>

                    {/* 🔥 Image Upload - Added name attribute */}
                    <Field className="md:col-span-2">
                        <FieldLabel>Profile Photo</FieldLabel>
                        <Input
                            type="file"
                            name="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                        />

                        {preview && (
                            <img
                                src={preview}
                                alt="preview"
                                className="mt-2 w-24 h-24 rounded-md object-cover border"
                            />
                        )}

                        {getFieldError("file") && (
                            <FieldDescription className="text-red-600">
                                {getFieldError("file")}
                            </FieldDescription>
                        )}
                    </Field>

                    {/* Gender */}
                    <Field>
                        <FieldLabel htmlFor="gender">Gender</FieldLabel>
                        <select
                            id="gender"
                            name="gender"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            <option value="">Select Gender</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                        </select>

                        {getFieldError("gender") && (
                            <FieldDescription className="text-red-600">
                                {getFieldError("gender")}
                            </FieldDescription>
                        )}
                    </Field>

                    {/* Category - Single Select */}
                    <Field>
                        <FieldLabel htmlFor="category">Category</FieldLabel>
                        <select
                            id="category"
                            name="category"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            <option value="">Select Category</option>
                            <option value="ADVENTURE">Adventure</option>
                            <option value="CULTURAL">Cultural</option>
                            <option value="FOOD">Food</option>
                            <option value="NATURE">Nature</option>
                        </select>

                        {getFieldError("category") && (
                            <FieldDescription className="text-red-600">
                                {getFieldError("category")}
                            </FieldDescription>
                        )}
                    </Field>

                    {/* Language - Single Select */}
                    <Field>
                        <FieldLabel htmlFor="languages">Language</FieldLabel>
                        <select
                            id="languages"
                            name="languages"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            <option value="">Select Language</option>
                            <option value="ENGLISH">English</option>
                            <option value="BANGLA">Bangla</option>
                            <option value="HINDI">Hindi</option>
                            <option value="ARABIC">Arabic</option>
                        </select>

                        {getFieldError("languages") && (
                            <FieldDescription className="text-red-600">
                                {getFieldError("languages")}
                            </FieldDescription>
                        )}
                    </Field>

                    {/* Password */}
                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input id="password" name="password" type="password" />
                        {getFieldError("password") && (
                            <FieldDescription className="text-red-600">
                                {getFieldError("password")}
                            </FieldDescription>
                        )}
                    </Field>

                    {/* Confirm Password */}
                    <Field>
                        <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                        />
                        {getFieldError("confirmPassword") && (
                            <FieldDescription className="text-red-600">
                                {getFieldError("confirmPassword")}
                            </FieldDescription>
                        )}
                    </Field>
                </div>

                <FieldGroup className="mt-4">
                    <Field>
                        <Button type="submit" disabled={isPending} className="w-full">
                            {isPending ? "Creating Account..." : "Create Account"}
                        </Button>

                        <FieldDescription className="px-6 text-center">
                            Already have an account?{" "}
                            <a href="/login" className="text-blue-600 hover:underline">
                                Sign in
                            </a>
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </FieldGroup>
        </form>
    );
};

export default RegisterForm;