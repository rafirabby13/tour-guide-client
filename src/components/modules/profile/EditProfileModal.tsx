/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const profile = user.admin || user.tourist || user.guide;
  const isGuide = user.role === "GUIDE";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.error("Only image files are allowed");
        return;
      }
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      // Add file if selected
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      // Prepare data object
      const data: any = {
        name: formData.get("name"),
        contactNumber: formData.get("contactNumber"),
      };

      if (isGuide) {
        data.bio = formData.get("bio");
        data.city = formData.get("city");
        data.country = formData.get("country");
        data.experience = parseInt(formData.get("experience") as string);
      }

      // Create new FormData for backend
      const backendFormData = new FormData();
      backendFormData.append("data", JSON.stringify(data));

      if (selectedFile) {
        backendFormData.append("file", selectedFile);
      }

      const result = await updateMyProfile(backendFormData);

      if (result.success) {
        toast.success("Profile updated successfully");
        router.refresh();
        onClose();
      } else {
        toast.error(result.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Photo */}
          <div className="space-y-2">
            <Label>Profile Photo</Label>
            {!preview && !profile?.profilePhoto ? (
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="file"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, JPEG (MAX. 5MB)
                    </p>
                  </div>
                  <Input
                    id="file"
                    name="file"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <div className="relative w-32 h-32 rounded-lg overflow-hidden border">
                <Image
                  src={preview || profile.profilePhoto}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={profile?.name}
              required
            />
          </div>

          {/* Contact Number */}
          <div className="space-y-2">
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input
              id="contactNumber"
              name="contactNumber"
              defaultValue={profile?.contactNumber}
              required
            />
          </div>

          {/* Guide-specific fields */}
          {isGuide && user.guide && (
            <>
              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  defaultValue={user.guide.bio || ""}
                  placeholder="Tell travelers about yourself..."
                />
              </div>

              {/* City */}
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  defaultValue={user.guide.city || ""}
                />
              </div>

              {/* Country */}
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  defaultValue={user.guide.country || ""}
                />
              </div>

              {/* Experience */}
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  name="experience"
                  type="number"
                  min="0"
                  defaultValue={user.guide.experience || 0}
                />
              </div>
            </>
          )}

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}