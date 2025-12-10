/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import { useActionState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PackageX, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { updateMyProfile } from "@/services/commmon/updateProfile";
import { CATEGORIES, LANGUAGES, MultiSelectField } from "@/components/shared/multi-select/MultiSelectField";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  user,
}: EditProfileModalProps) {
  const router = useRouter();

  // Hook for Server Action
  const [state, formAction, isPending] = useActionState(updateMyProfile, null);



  // Consolidate profile data
  const profile = user.admin || user.tourist || user.guide || {};
  const isGuide = user.role === "GUIDE";

  const [preview, setPreview] = useState<string | null>(null);

  // Helper: Get Field Errors
  const getFieldError = (fieldName: string) => {
    if (state?.errors) {
      const error = state.errors.find((err: any) => err.field === fieldName);
      return error ? error.message : null;
    }
    return null;
  };

  // Image Upload Handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      Swal.fire({ icon: "error", title: "File too large", text: "Max size is 5MB" });
      return;
    }

    if (!file.type.startsWith("image/")) {
      Swal.fire({ icon: "error", title: "Invalid file", text: "Only images are allowed" });
      return;
    }

    setPreview(URL.createObjectURL(file));
  };



  // Effect: Handle Success/Error
  useEffect(() => {
    if (state?.error) {
      console.log(state)
      Swal.fire({
        title: "Error Occurred",
        text: state.error.message,
        icon: "error",
      });
    }
    if (state?.success) {
      Swal.fire({
        title: "Success",
        text: "Profile updated successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      router.refresh();
      onClose();
    }
  }, [state, router, onClose]);

  return (
    <Dialog open={isOpen} >

      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <form action={formAction} encType="multipart/form-data">
          <FieldGroup className="space-y-4">

            {/* --- Profile Photo --- */}


            <Field className="md:col-span-2">
              <FieldLabel>Profile Photo</FieldLabel>
              <Input
                type="file"
                name="file"
                accept="image/*"
                onChange={handlePhotoUpload}
              />

              {preview && (
                <Image
                  src={preview}
                  width={300}
                  height={100}
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


            {/* --- Basic Info (All Users) --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input id="name" name="name" defaultValue={profile?.name} />
                {getFieldError("name") && (
                  <FieldDescription className="text-red-600">
                    {getFieldError("name")}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="contactNumber">Contact Number</FieldLabel>
                <Input
                  id="contactNumber"
                  name="contactNumber"
                  defaultValue={profile?.contactNumber}
                />
                {getFieldError("contactNumber") && (
                  <FieldDescription className="text-red-600">
                    {getFieldError("contactNumber")}
                  </FieldDescription>
                )}
              </Field>
            </div>

            {/* 🚀 FIX 4: Added Address Field (It was missing!) */}
            <Field>
              <FieldLabel htmlFor="address">Address</FieldLabel>
              <Input
                id="address"
                name="address"
                defaultValue={profile?.address || ""}
                placeholder="Enter your address"
              />
            </Field>

            {/* --- Guide Specific Fields (Only shows if role is GUIDE) --- */}
            {isGuide && (
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-sm font-medium text-muted-foreground">Guide Details</h3>

                <Field>
                  <FieldLabel htmlFor="bio">Bio</FieldLabel>
                  <Textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    defaultValue={user.guide?.bio || ""}
                    placeholder="Tell travelers about yourself..."
                  />
                </Field>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="city">City</FieldLabel>
                    <Input id="city" name="city" defaultValue={user.guide?.city || ""} />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="country">Country</FieldLabel>
                    <Input id="country" name="country" defaultValue={user.guide?.country || ""} />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="experience">Years of Experience</FieldLabel>
                    <Input
                      id="experience"
                      name="experience"
                      type="number"
                      min="0"
                      defaultValue={user.guide?.experience || 0}
                    />
                  </Field>
                </div>
                <div className="space-y-4">
                  <MultiSelectField
                    label="Languages Spoken"
                    name="languages"
                    options={LANGUAGES}
                    defaultValues={user.guide?.languages || []}
                  />

                  <MultiSelectField
                    label="Expertise Categories"
                    name="category"
                    options={CATEGORIES}
                    defaultValues={user.guide?.category || []}
                  />
                </div>
              </div>
            )}

            {/* --- Actions --- */}
            <div className="flex justify-end gap-3 mt-6 pt-2 border-t">
              <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>

          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}