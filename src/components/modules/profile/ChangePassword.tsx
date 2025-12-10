/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner"; // Use toast (or Swal if you prefer)
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { changePasswordAction } from "@/services/commmon/changePassword";


const ChangePassword = () => {
  const [state, formAction, isPending] = useActionState(changePasswordAction, null);


  // Helper to extract field-specific errors
  const getFieldError = (fieldName: string) => {
    if (state?.errors) {
      const error = state.errors.find((err: any) => err.field === fieldName);
      return error ? error.message : null;
    }
    return null;
  };

  // Handle Success/Error Feedback
  useEffect(() => {
    if (state?.success) {
      toast.success("Password changed successfully");
    } else if (state?.success === false && !state.errors) {
      // Generic error (e.g. "Old password incorrect")
      toast.error(state.message || state.error || "Failed to update password");
    }
  }, [state]);

  return (
    <Card className="w-full max-w-md mx-auto mt-6 shadow-sm">
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Update your password to keep your account secure.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form action={formAction}>
          <FieldGroup className="space-y-4">
            
            {/* Current Password */}
            <Field>
              <FieldLabel htmlFor="oldPassword">Current Password</FieldLabel>
              <Input
                id="oldPassword"
                name="oldPassword"
                type="password"
                placeholder="••••••••"
                required
              />
              {getFieldError("oldPassword") && (
                <FieldDescription className="text-red-500 font-medium mt-1">
                  {getFieldError("oldPassword")}
                </FieldDescription>
              )}
            </Field>

            {/* New Password */}
            <Field>
              <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                placeholder="••••••••"
                required
              />
              {getFieldError("newPassword") && (
                <FieldDescription className="text-red-500 font-medium mt-1">
                  {getFieldError("newPassword")}
                </FieldDescription>
              )}
            </Field>

            {/* Confirm Password */}
            <Field>
              <FieldLabel htmlFor="confirmPassword">Confirm New Password</FieldLabel>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                required
              />
              {getFieldError("confirmPassword") && (
                <FieldDescription className="text-red-500 font-medium mt-1">
                  {getFieldError("confirmPassword")}
                </FieldDescription>
              )}
            </Field>

            {/* Submit Button */}
            <div className="pt-2">
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </Button>
            </div>

          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePassword;