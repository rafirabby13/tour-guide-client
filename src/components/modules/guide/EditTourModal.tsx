/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, Trash2, UploadCloud, X } from "lucide-react";

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
import { updateTour } from "@/services/guide/UpdateTour";


interface EditTourDialogProps {
  isOpen: boolean;
  onClose: () => void;
  tour: any; // Replace with ITour interface if available
}

export default function EditTourDialog({
  isOpen,
  onClose,
  tour,
}: EditTourDialogProps) {
  const router = useRouter();

  // Hook for Server Action
  const [state, formAction, isPending] = useActionState(updateTour, null);

  // --- State for Dynamic Sections ---
  // We initialize these arrays based on the length of existing data
  const [pricingRows, setPricingRows] = useState<number[]>([]);
  const [availRows, setAvailRows] = useState<number[]>([]);

  // --- State for Images ---
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]); // Track URLs to remove
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);

  // --- Initialize Data when Tour changes ---
  useEffect(() => {
    if (tour && isOpen) {
      // 1. Setup Dynamic Rows indices [0, 1, 2...]
      setPricingRows(tour.tourPricings?.map((_: any, i: number) => i) || [0]);
      setAvailRows(tour.tourAvailabilities?.map((_: any, i: number) => i) || [0]);
      
      // 2. Setup Images
      setExistingImages(tour.images || []);
      setDeletedImages([]);
      setNewFiles([]);
      setNewPreviews([]);
    }
  }, [tour, isOpen]);

  // --- Helper: Get Field Errors ---
  const getFieldError = (fieldName: string) => {
    if (state?.errors) {
      const error = state.errors.find((err: any) => 
        err.field === fieldName || err.path?.join(".") === fieldName
      );
      return error ? error.message : null;
    }
    return null;
  };

  // --- Handlers: Dynamic Rows ---
  const addPricingRow = () => setPricingRows((prev) => [...prev, prev.length > 0 ? prev[prev.length - 1] + 1 : 0]);
  const removePricingRow = (id: number) => setPricingRows((prev) => prev.filter((rowId) => rowId !== id));

  const addAvailRow = () => setAvailRows((prev) => [...prev, prev.length > 0 ? prev[prev.length - 1] + 1 : 0]);
  const removeAvailRow = (id: number) => setAvailRows((prev) => prev.filter((rowId) => rowId !== id));

  // --- Handlers: New File Uploads ---
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const incomingFiles = Array.from(e.target.files);
      setNewFiles((prev) => [...prev, ...incomingFiles]);
      
      const incomingPreviews = incomingFiles.map((file) => URL.createObjectURL(file));
      setNewPreviews((prev) => [...prev, ...incomingPreviews]);
    }
  };

  const removeNewFile = (index: number) => {
    URL.revokeObjectURL(newPreviews[index]);
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // --- Handlers: Existing Images ---
  const removeExistingImage = (url: string) => {
    setExistingImages((prev) => prev.filter((img) => img !== url));
    setDeletedImages((prev) => [...prev, url]); // Mark for deletion
  };

  // --- Form Submission Interceptor ---
  const handleFormSubmit = (formData: FormData) => {
    // 1. Append ID
    formData.append("id", tour.id);

    // 2. Append New Files
    newFiles.forEach((file) => {
      formData.append("newImages", file);
    });

    // 3. Append List of Deleted Images (Backend needs to process this)
    if (deletedImages.length > 0) {
      formData.append("deletedImages", JSON.stringify(deletedImages));
    }

    // 4. Submit
    formAction(formData);
  };

  // --- Effect: Handle Success/Error ---
  useEffect(() => {
    if (state?.error) {
      Swal.fire({
        title: "Error Occurred",
        text: typeof state.error === 'string' ? state.error : "Update failed",
        icon: "error",
      });
    }
    if (state?.success) {
      Swal.fire({
        title: "Success",
        text: "Tour updated successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      router.refresh();
      onClose();
    }
  }, [state, router, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Tour</DialogTitle>
        </DialogHeader>

        <form action={handleFormSubmit} className="space-y-6">
          <FieldGroup className="space-y-4">
            
            {/* --- Hidden Guide ID --- */}
            <input type="hidden" name="guideId" defaultValue={tour?.guideId} />

            {/* --- Basic Info --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field className="md:col-span-2">
                <FieldLabel htmlFor="title">Tour Title</FieldLabel>
                <Input id="title" name="title" defaultValue={tour?.title} />
                {getFieldError("title") && (
                  <FieldDescription className="text-red-600">{getFieldError("title")}</FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="location">Location</FieldLabel>
                <Input id="location" name="location" defaultValue={tour?.location} />
                {getFieldError("location") && (
                  <FieldDescription className="text-red-600">{getFieldError("location")}</FieldDescription>
                )}
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                id="description"
                name="description"
                rows={4}
                defaultValue={tour?.description}
              />
              {getFieldError("description") && (
                <FieldDescription className="text-red-600">{getFieldError("description")}</FieldDescription>
              )}
            </Field>

            <div className="border-t my-4"></div>

            {/* --- Image Section --- */}
            <Field>
              <FieldLabel>Gallery Images</FieldLabel>
              
              {/* 1. Existing Images */}
              {existingImages.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Current Images:</p>
                  <div className="flex gap-4 flex-wrap">
                    {existingImages.map((src, index) => (
                      <div key={index} className="relative group w-24 h-24 rounded-md overflow-hidden border">
                         {/* Using standard img tag for external URLs if domain not configured in Next.js, otherwise use Image */}
                        <img src={src} alt="existing" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeExistingImage(src)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Upload New */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
                <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Upload new images</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>

              {/* 3. New Previews */}
              {newFiles.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mt-4">
                  {newPreviews.map((src, index) => (
                    <div key={index} className="relative group aspect-square rounded-md overflow-hidden border">
                      <img src={src} alt="new-preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeNewFile(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Field>

            <div className="border-t my-4"></div>

            {/* --- Pricing Tiers --- */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Pricing Tiers</h3>
                <Button type="button" variant="outline" size="sm" onClick={addPricingRow}>
                  <Plus className="w-4 h-4 mr-1" /> Add Tier
                </Button>
              </div>

              {pricingRows.map((rowId, index) => {
                const data = tour?.tourPricings?.[index] || {};
                return (
                  <div key={rowId} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 border rounded-md bg-gray-50 relative">
                    {pricingRows.length > 1 && (
                      <button type="button" onClick={() => removePricingRow(rowId)} className="absolute top-2 right-2 text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}

                    <Field>
                      <FieldLabel>Min Guests</FieldLabel>
                      <Input name={`tourPricings[${index}][minGuests]`} type="number" min="1" defaultValue={data.minGuests || 1} />
                    </Field>
                    <Field>
                      <FieldLabel>Max Guests</FieldLabel>
                      <Input name={`tourPricings[${index}][maxGuests]`} type="number" min="1" defaultValue={data.maxGuests || 2} />
                    </Field>
                    <Field>
                      <FieldLabel>Price ($)</FieldLabel>
                      <Input name={`tourPricings[${index}][pricePerHour]`} type="number" step="0.01" defaultValue={data.pricePerHour || 50} />
                    </Field>
                  </div>
                );
              })}
              {getFieldError("tourPricings") && <FieldDescription className="text-red-600">{getFieldError("tourPricings")}</FieldDescription>}
            </div>

            <div className="border-t my-4"></div>

            {/* --- Availability --- */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Weekly Availability</h3>
                <Button type="button" variant="outline" size="sm" onClick={addAvailRow}>
                  <Plus className="w-4 h-4 mr-1" /> Add Slot
                </Button>
              </div>

              {availRows.map((rowId, index) => {
                 const data = tour?.tourAvailabilities?.[index] || {};
                 return (
                    <div key={rowId} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 border rounded-md bg-gray-50 relative">
                      {availRows.length > 1 && (
                        <button type="button" onClick={() => removeAvailRow(rowId)} className="absolute top-2 right-2 text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}

                      <Field>
                        <FieldLabel>Day</FieldLabel>
                        <select
                          name={`tourAvailabilities[${index}][dayOfWeek]`}
                          defaultValue={data.dayOfWeek !== undefined ? data.dayOfWeek : 0}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day, i) => (
                            <option key={day} value={i}>{day}</option>
                          ))}
                        </select>
                      </Field>
                      <Field>
                        <FieldLabel>Start</FieldLabel>
                        <Input name={`tourAvailabilities[${index}][startTime]`} type="time" defaultValue={data.startTime || "09:00"} />
                      </Field>
                      <Field>
                        <FieldLabel>End</FieldLabel>
                        <Input name={`tourAvailabilities[${index}][endTime]`} type="time" defaultValue={data.endTime || "17:00"} />
                      </Field>
                      <Field>
                        <FieldLabel>Capacity</FieldLabel>
                        <Input name={`tourAvailabilities[${index}][maxBookings]`} type="number" defaultValue={data.maxBookings || 10} />
                      </Field>
                    </div>
                 );
              })}
               {getFieldError("tourAvailabilities") && <FieldDescription className="text-red-600">{getFieldError("tourAvailabilities")}</FieldDescription>}
            </div>

            {/* --- Actions --- */}
            <div className="flex justify-end gap-3 mt-6 pt-2 border-t">
              <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Updating..." : "Save Changes"}
              </Button>
            </div>

          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}