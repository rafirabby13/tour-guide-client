/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { createAdminAction } from "@/services/admin/createAdmin";
import { toast } from "sonner";
import { Loader2, UserPlus, Mail, Lock, ShieldCheck } from "lucide-react";

export function CreateAdminForm() {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(createAdminAction, null);

  useEffect(() => {
    if (state?.error) {
      toast.error("Failed to create admin", {
        description: state.error || "Please check your inputs and try again.",
      });
    }
    if (state?.success) {
      toast.success("Admin Created Successfully", {
        description: "Credentials have been generated.",
        icon: <ShieldCheck className="h-5 w-5 text-green-500" />,
      });
      setOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 shadow-sm transition-all hover:scale-105 active:scale-95">
          <UserPlus className="mr-2 h-4 w-4" />
          Create New Admin
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] border-none shadow-2xl bg-white/95 backdrop-blur-xl">
        <DialogHeader className="space-y-3 pb-4 border-b border-gray-100">
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
            <UserPlus className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl font-bold tracking-tight text-gray-900">
            Onboard New Admin
          </DialogTitle>
          <DialogDescription className="text-center text-gray-500 text-sm">
            Create secure credentials for a new administrator. <br />
            They can complete their profile after logging in.
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="mt-6">
          <FieldGroup className="space-y-5">
            {/* Email Field */}
            <Field>
              <FieldLabel htmlFor="email" className="font-medium text-gray-700">
                Email Address
              </FieldLabel>
              <div className="relative mt-1.5">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@company.com"
                  required
                  className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                />
              </div>
            </Field>

            {/* Password Field */}
            <Field>
              <FieldLabel htmlFor="password" className="font-medium text-gray-700">
                Temporary Password
              </FieldLabel>
              <div className="relative mt-1.5">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                />
              </div>
              <p className="text-[11px] text-muted-foreground mt-2 flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" />
                Must be at least 8 characters long
              </p>
            </Field>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-11 mt-2 text-base font-medium shadow-md transition-all hover:shadow-lg disabled:opacity-70"
            >
              {isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Confirm & Create"
              )}
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}