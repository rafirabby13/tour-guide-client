/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/services/auth/loginUser";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { Mail, Lock, Loader2 } from "lucide-react";
import Link from "next/link";

const LoginForm = ({ redirect }: { redirect?: string }) => {
    const [state, formAction, isPending] = useActionState(loginUser, null);
    const router = useRouter()

    const getFieldError = (fieldName: string) => {
        if (state && state.errors) {
            const error = state.errors.find((err: any) => err.field === fieldName);
            return error ? error.message : null;
        }
        return null;
    };

    useEffect(() => {
        if (state?.error) {
            toast.error(state?.message || "Login failed")
        }
        if (state?.success) {
            toast.error(state?.success || "User Logged In Successfully....")

            router.push(redirect || "/")
        }
    }, [state, router, redirect])

    return (
        <div className="w-full max-w-md mx-auto">
            {/* Main Card */}
            <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 md:p-10 space-y-8 animate-in fade-in-50 zoom-in-95 duration-500">

                {/* Header Section */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Welcome Back
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Enter your credentials to access your account
                    </p>
                </div>

                <form action={formAction} className="space-y-6">
                    {redirect && <input type="hidden" name="redirect" value={redirect} />}

                    <FieldGroup className="space-y-5">

                        {/* Email Input */}
                        <Field>
                            <FieldLabel htmlFor="email" className="text-sm font-medium text-gray-700 ml-1">Email Address</FieldLabel>
                            <div className="relative mt-1.5 group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                                </div>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    className="pl-11 h-12 bg-gray-50/50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all rounded-xl"
                                />
                            </div>
                            {getFieldError("email") && (
                                <p className="text-red-500 text-xs mt-1.5 ml-1 flex items-center gap-1 animate-in slide-in-from-top-1">
                                    • {getFieldError("email")}
                                </p>
                            )}
                        </Field>

                        {/* Password Input */}
                        <Field>
                            <div className="flex justify-between items-center ml-1 mb-1.5">
                                <FieldLabel htmlFor="password" className="text-sm font-medium text-gray-700">Password</FieldLabel>
                                {/* <Link href="/forgot-password" className="text-xs text-primary font-medium hover:underline">
                                    Forgot password?
                                </Link> */}
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-11 h-12 bg-gray-50/50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all rounded-xl"
                                />
                            </div>
                            {getFieldError("password") && (
                                <p className="text-red-500 text-xs mt-1.5 ml-1 flex items-center gap-1 animate-in slide-in-from-top-1">
                                    • {getFieldError("password")}
                                </p>
                            )}
                        </Field>

                    </FieldGroup>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="w-full h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:to-primary shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {isPending ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    <span>Signing In...</span>
                                </div>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </div>

                    {/* Footer / Sign Up Link */}
                    <div className="text-center pt-2">
                        <p className="text-sm text-gray-500">
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className="text-primary font-bold hover:underline transition-all">
                                Create account
                            </Link>
                        </p>
                    </div>
                </form>
            </div>

            {/* Optional Footer Branding */}
            <p className="text-center text-xs text-gray-400 mt-8">
                &copy; 2024 GuideNest. Secure Login.
            </p>
        </div>
    );
};

export default LoginForm;