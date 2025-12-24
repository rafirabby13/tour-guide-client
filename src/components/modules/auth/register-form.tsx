/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
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
import Image from "next/image";

const RegisterForm = () => {
    const [state, formAction, isPending] = useActionState(registerTourist, null);
    const [preview, setPreview] = useState<string | null>(null);

    const router = useRouter()
    const formRef = useRef<HTMLFormElement>(null);
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

    useEffect(() => {
        if (!state) return; // Do nothing on initial load

        if (state.error) {
            Swal.fire({
                title: `Error Occurred!`,
                text: state.error,
                icon: "error",
                draggable: true
            });
            // ❌ DO NOT reset the form here.
            // Leaving it alone keeps the user's typed data visible.
        }

        if (state.success) {
            Swal.fire({
                title: "Success",
                text: state.message,
                icon: "success",
                draggable: true,
                timer: 2000
            });

            // ✅ RESET ONLY ON SUCCESS
            formRef.current?.reset();

            // Redirect after a short delay so user sees the success message
            setTimeout(() => {
                router.push("/login");
            }, 1000);
        }
    }, [state, router]);

    return (
        // <form action={formAction} ref={formRef}>
        //     <FieldGroup>


        //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        //             {/* Full Name */}
        //             <Field>
        //                 <FieldLabel htmlFor="name">Full Name</FieldLabel>
        //                 <Input id="name" name="name" type="text" placeholder="John Doe" />
        //                 {getFieldError("name") && (
        //                     <FieldDescription className="text-red-600">
        //                         {getFieldError("name")}
        //                     </FieldDescription>
        //                 )}
        //             </Field>

        //             {/* Address */}
        //             <Field>
        //                 <FieldLabel htmlFor="address">Address</FieldLabel>
        //                 <Input
        //                     id="address"
        //                     name="address"
        //                     type="text"
        //                     placeholder="123 Main St"
        //                 />
        //                 {getFieldError("address") && (
        //                     <FieldDescription className="text-red-600">
        //                         {getFieldError("address")}
        //                     </FieldDescription>
        //                 )}
        //             </Field>

        //             {/* Email */}
        //             <Field>
        //                 <FieldLabel htmlFor="email">Email</FieldLabel>
        //                 <Input
        //                     id="email"
        //                     name="email"
        //                     type="email"
        //                     placeholder="m@example.com"
        //                 />
        //                 {getFieldError("email") && (
        //                     <FieldDescription className="text-red-600">
        //                         {getFieldError("email")}
        //                     </FieldDescription>
        //                 )}
        //             </Field>

        //             {/* Contact Number */}
        //             <Field>
        //                 <FieldLabel htmlFor="contactNumber">Contact Number</FieldLabel>
        //                 <Input
        //                     id="contactNumber"
        //                     name="contactNumber"
        //                     type="text"
        //                     placeholder="+8801XXXXXXXXX"
        //                 />
        //                 {getFieldError("contactNumber") && (
        //                     <FieldDescription className="text-red-600">
        //                         {getFieldError("contactNumber")}
        //                     </FieldDescription>
        //                 )}
        //             </Field>

        //             {/* 🔥 Image Upload - Added name attribute */}
        //             <Field className="md:col-span-2">
        //                 <FieldLabel>Profile Photo</FieldLabel>
        //                 <Input
        //                     type="file"
        //                     name="file"
        //                     accept="image/*"
        //                     onChange={handlePhotoUpload}
        //                 />

        //                 {preview && (
        //                     <img
        //                         src={preview}
        //                         alt="preview"
        //                         className="mt-2 w-24 h-24 rounded-md object-cover border"
        //                     />
        //                 )}

        //                 {getFieldError("file") && (
        //                     <FieldDescription className="text-red-600">
        //                         {getFieldError("file")}
        //                     </FieldDescription>
        //                 )}
        //             </Field>

        //             {/* Gender */}
        //             <Field>
        //                 <FieldLabel htmlFor="gender">Gender</FieldLabel>
        //                 <select
        //                     id="gender"
        //                     name="gender"
        //                     className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        //                 >
        //                     <option value="">Select Gender</option>
        //                     <option value="MALE">Male</option>
        //                     <option value="FEMALE">Female</option>
        //                 </select>

        //                 {getFieldError("gender") && (
        //                     <FieldDescription className="text-red-600">
        //                         {getFieldError("gender")}
        //                     </FieldDescription>
        //                 )}
        //             </Field>

        //             {/* Category - Single Select */}
        //             <Field>
        //                 <FieldLabel htmlFor="category">Category</FieldLabel>
        //                 <select
        //                     id="category"
        //                     name="category"
        //                     className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        //                 >
        //                     <option value="">Select Category</option>
        //                     <option value="ADVENTURE">Adventure</option>
        //                     <option value="CULTURAL">Cultural</option>
        //                     <option value="FOOD">Food</option>
        //                     <option value="NATURE">Nature</option>
        //                 </select>

        //                 {getFieldError("category") && (
        //                     <FieldDescription className="text-red-600">
        //                         {getFieldError("category")}
        //                     </FieldDescription>
        //                 )}
        //             </Field>

        //             {/* Language - Single Select */}
        //             <Field>
        //                 <FieldLabel htmlFor="languages">Language</FieldLabel>
        //                 <select
        //                     id="languages"
        //                     name="languages"
        //                     className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        //                 >
        //                     <option value="">Select Language</option>
        //                     <option value="ENGLISH">English</option>
        //                     <option value="BANGLA">Bangla</option>
        //                     <option value="HINDI">Hindi</option>
        //                     <option value="ARABIC">Arabic</option>
        //                 </select>

        //                 {getFieldError("languages") && (
        //                     <FieldDescription className="text-red-600">
        //                         {getFieldError("languages")}
        //                     </FieldDescription>
        //                 )}
        //             </Field>

        //             {/* Password */}
        //             <Field>
        //                 <FieldLabel htmlFor="password">Password</FieldLabel>
        //                 <Input id="password" name="password" type="password" />
        //                 {getFieldError("password") && (
        //                     <FieldDescription className="text-red-600">
        //                         {getFieldError("password")}
        //                     </FieldDescription>
        //                 )}
        //             </Field>

        //             {/* Confirm Password */}
        //             <Field>
        //                 <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
        //                 <Input
        //                     id="confirmPassword"
        //                     name="confirmPassword"
        //                     type="password"
        //                 />
        //                 {getFieldError("confirmPassword") && (
        //                     <FieldDescription className="text-red-600">
        //                         {getFieldError("confirmPassword")}
        //                     </FieldDescription>
        //                 )}
        //             </Field>
        //         </div>

        //         <FieldGroup className="mt-4">
        //             <Field>
        //                 <Button type="submit" disabled={isPending} className="w-full">
        //                     {isPending ? "Creating Account..." : "Create Account"}
        //                 </Button>

        //                 <FieldDescription className="px-6 text-center">
        //                     Already have an account?{" "}
        //                     <a href="/login" className="text-blue-600 hover:underline">
        //                         Sign in
        //                     </a>
        //                 </FieldDescription>
        //             </Field>
        //         </FieldGroup>
        //     </FieldGroup>
        // </form>

        <form action={formAction} ref={formRef}>
            <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

                {/* LEFT — FORM */}
                <div className="flex items-center justify-center px-6 py-12 bg-background">
                    <div className="w-full  space-y-8">

                        {/* Header */}
                        <div className="space-y-2">
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                                Create your account
                            </h1>
                            <p className="text-muted-foreground">
                                Start exploring cities with trusted local guides.
                            </p>
                        </div>

                        {/* Form Card */}
                        <div className="rounded-2xl border bg-card p-6 md:p-8 shadow-sm space-y-8">

                            {/* Basic Info */}
                            <section className="space-y-4">
                                <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                    Personal Info
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel>Full Name</FieldLabel>
                                        <Input name="name" placeholder="John Doe" />
                                    </Field>

                                    <Field>
                                        <FieldLabel>Address</FieldLabel>
                                        <Input name="address" placeholder="Dhaka, Bangladesh" />
                                    </Field>

                                    <Field>
                                        <FieldLabel>Email</FieldLabel>
                                        <Input name="email" type="email" placeholder="you@example.com" />
                                    </Field>

                                    <Field>
                                        <FieldLabel>Contact Number</FieldLabel>
                                        <Input name="contactNumber" placeholder="+8801XXXXXXXXX" />
                                    </Field>
                                </div>
                            </section>

                            {/* Profile */}
                            <section className="space-y-4">
                                <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                    Profile
                                </h2>

                                <Field>
                                    <FieldLabel>Profile Photo</FieldLabel>
                                    <div className="flex items-center gap-4">
                                        <Input
                                            type="file"
                                            name="file"
                                            accept="image/*"
                                            onChange={handlePhotoUpload}
                                        />
                                        {preview && (
                                            <Image
                                                src={preview}
                                                alt="preview"
                                                height={50}
                                                width={150}
                                                className=" rounded-xl object-cover border"
                                            />
                                        )}
                                    </div>
                                </Field>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Field>
                                        <FieldLabel>Gender</FieldLabel>
                                        <select className="h-10 w-full rounded-md border bg-background px-3 text-sm focus:ring-2 focus:ring-primary" name="gender">
                                            <option value="">Select</option>
                                            <option value="MALE">Male</option>
                                            <option value="FEMALE">Female</option>
                                        </select>
                                    </Field>

                                    <Field>
                                        <FieldLabel>Category</FieldLabel>
                                        <select className="h-10 w-full rounded-md border bg-background px-3 text-sm focus:ring-2 focus:ring-primary" name="category">
                                            <option value="">Select</option>
                                            <option value="ADVENTURE">Adventure</option>
                                            <option value="CULTURAL">Cultural</option>
                                            <option value="FOOD">Food</option>
                                            <option value="NATURE">Nature</option>
                                        </select>
                                    </Field>

                                    <Field>
                                        <FieldLabel>Language</FieldLabel>
                                        <select className="h-10 w-full rounded-md border bg-background px-3 text-sm focus:ring-2 focus:ring-primary" name="languages">
                                            <option value="">Select</option>
                                            <option value="ENGLISH">English</option>
                                            <option value="BANGLA">Bangla</option>
                                            <option value="HINDI">Hindi</option>
                                            <option value="ARABIC">Arabic</option>
                                        </select>
                                    </Field>
                                </div>
                            </section>

                            {/* Security */}
                            <section className="space-y-4">
                                <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                    Security
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel>Password</FieldLabel>
                                        <Input type="password" name="password" />
                                    </Field>

                                    <Field>
                                        <FieldLabel>Confirm Password</FieldLabel>
                                        <Input type="password" name="confirmPassword" />
                                    </Field>
                                </div>
                            </section>

                            {/* Action */}
                            <div className="space-y-4 pt-2">
                                <Button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full h-11 text-base font-semibold"
                                >
                                    {isPending ? "Creating Account..." : "Create Account"}
                                </Button>

                                <p className="text-center text-sm text-muted-foreground">
                                    Already have an account?{" "}
                                    <a href="/login" className="text-primary font-medium hover:underline">
                                        Sign in
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT — STORY / VALUE */}
                <div className="hidden lg:flex flex-col justify-center px-16 bg-linear-to-r from-primary to-primary/80 text-primary-foreground">
                    <div className="max-w-md space-y-8">

                        <h2 className="text-4xl font-bold leading-tight">
                            Travel deeper.
                            <br />
                            Experience cities
                            <br />
                            like a local.
                        </h2>

                        <p className="text-primary-foreground/90 text-lg leading-relaxed">
                            GuideNest connects you with verified local guides who turn trips into unforgettable stories.
                        </p>

                        <ul className="space-y-4 text-sm">
                            <li className="flex items-center gap-3">
                                <span className="h-2 w-2 rounded-full bg-primary-foreground" />
                                Trusted local experts
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="h-2 w-2 rounded-full bg-primary-foreground" />
                                Authentic cultural experiences
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="h-2 w-2 rounded-full bg-primary-foreground" />
                                Safe, secure & verified
                            </li>
                        </ul>

                        <p className="text-xs text-primary-foreground/70">
                            © {new Date().getFullYear()} GuideNest. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </form>



    );
};

export default RegisterForm;