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

const LoginForm = ({ redirect }: { redirect?: string }) => {
    console.log(redirect)
    const [state, formAction, isPending] = useActionState(loginUser, null);
    const router = useRouter()

    const getFieldError = (fieldName: string) => {
        if (state && state.errors) {
            const error = state.errors.find((err: any) => err.field === fieldName);
            return error.message;
        } else {
            return null;
        }
    };

    useEffect(() => {
        if (state?.error) {
            console.log("object")
            toast.error(state?.message)

        }
        if (state?.success) {
            Swal.fire({
                title: `${state.message}`,
                icon: "success",
                draggable: true
            });
            router.push("/")
        }
    }, [state])

    return (
        <form action={formAction}>
            {
                redirect && <input type="hidden" name="redirect" value={redirect} />
            }
            <FieldGroup>
                <div className="grid grid-cols-1 gap-4">
                    {/* Email */}
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="m@example.com"
                        //   required
                        />


                    </Field>

                    {/* Password */}
                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                        //   required
                        />
                        {getFieldError("password") && (
                            <FieldDescription className="text-red-600">
                                {getFieldError("password")}
                            </FieldDescription>
                        )}
                    </Field>
                </div>
                <FieldGroup className="mt-4">
                    <Field>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Logging in..." : "Login"}
                        </Button>

                        <FieldDescription className="px-6 text-center">
                            Don&apos;t have an account?{" "}
                            <a href="/register" className="text-blue-600 hover:underline">
                                Sign up
                            </a>
                        </FieldDescription>
                        <FieldDescription className="px-6 text-center">
                            <a
                                href="/forget-password"
                                className="text-blue-600 hover:underline"
                            >
                                Forgot password?
                            </a>
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </FieldGroup>
        </form>
    );
};

export default LoginForm;