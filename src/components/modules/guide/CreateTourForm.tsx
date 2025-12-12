/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Plus, Trash2, UploadCloud, X } from "lucide-react";
import { createTour } from "@/services/guide/createTour";

const CreateTourForm = () => {
    const [state, formAction, isPending] = useActionState(createTour, null);
    // console.log({ state })

    const [pricingRows, setPricingRows] = useState<number[]>([0]);
    const [availRows, setAvailRows] = useState<number[]>([0]);

    const getFieldError = (fieldName: string) => {
        if (state?.errors) {
            const error = state.errors.find((err: any) =>
                err.field === fieldName || err.path?.join(".") === fieldName
            );
            return error ? error.message : null;
        }
        return null;
    };

    // --- Handlers for Dynamic Sections ---

    // Pricing
    const addPricingRow = () => setPricingRows((prev) => [...prev, prev.length > 0 ? prev[prev.length - 1] + 1 : 0]);
    const removePricingRow = (id: number) => setPricingRows((prev) => prev.filter((rowId) => rowId !== id));

    // Availability
    const addAvailRow = () => setAvailRows((prev) => [...prev, prev.length > 0 ? prev[prev.length - 1] + 1 : 0]);
    const removeAvailRow = (id: number) => setAvailRows((prev) => prev.filter((rowId) => rowId !== id));
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        // e.preventDefault()
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);

            // 1. Add to File State
            setFiles((prev) => [...prev, ...newFiles]);

            // 2. Generate Previews
            const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
            setPreviews((prev) => [...prev, ...newPreviews]);
        }
    };

    const removeFile = (index: number) => {
        // Revoke URL to avoid memory leaks
        URL.revokeObjectURL(previews[index]);

        setFiles((prev) => prev.filter((_, i) => i !== index));
        setPreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const handleFormSubmit = (formData: FormData) => {
        // Manually append all files from state to 'images' key
        files.forEach((file) => {
            formData.append("images", file);
        });
        
        // Call the original Server Action
        formAction(formData);
    };

    // --- Feedback Logic ---
    useEffect(() => {
    if (state?.error) {
      Swal.fire({
        title: `Error Occurred!`,
        text: state.error,
        icon: "error",
        draggable: true
      });
    }
    if (state?.success) {
      Swal.fire({
        title: "Tour Created!",
        text: state.message,
        icon: "success",
        draggable: true
      });
      // Optional: Redirect or reset form here
      // router.push("/tours") 
    }
  }, [state]);

    return (
        <form action={handleFormSubmit} className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Create New Tour</h2>

            <FieldGroup>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field className="md:col-span-2">
                        <FieldLabel htmlFor="title">Tour Title</FieldLabel>
                        <Input id="title" name="title" type="text" placeholder="e.g. Midnight Food Walk" />
                        {getFieldError("title") && (
                            <FieldDescription className="text-red-600">{getFieldError("title")}</FieldDescription>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="location">Location</FieldLabel>
                        <Input id="location" name="location" type="text" placeholder="City, Country" />
                        {getFieldError("location") && (
                            <FieldDescription className="text-red-600">{getFieldError("location")}</FieldDescription>
                        )}
                    </Field>
                </div>

                <Field className="mt-4">
                    <FieldLabel htmlFor="description">Description</FieldLabel>
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Describe the experience..."
                    />
                    {getFieldError("description") && (
                        <FieldDescription className="text-red-600">{getFieldError("description")}</FieldDescription>
                    )}
                </Field>
                <div className="border-t my-6"></div>
                <Field>
                    <FieldLabel>Gallery Images</FieldLabel>

                    {/* Visual Upload Button */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
                        <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Click to upload images</p>

                        {/* Hidden Real Input */}
                        {/* Note: No 'name' attribute here, so it doesn't double-submit */}
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </div>

                    {/* Previews Grid */}
                    {files.length > 0 && (
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mt-4">
                            {previews.map((src, index) => (
                                <div key={index} className="relative group aspect-square rounded-md overflow-hidden border">
                                    <img src={src} alt="preview" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeFile(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {getFieldError("images") && (
                        <FieldDescription className="text-red-600 mt-2">{getFieldError("images")}</FieldDescription>
                    )}
                </Field>
                <div className="border-t my-6"></div>
                <div className="border-t my-6"></div>

                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Pricing Tiers</h3>
                        <Button type="button" variant="outline" size="sm" onClick={addPricingRow}>
                            <Plus className="w-4 h-4 mr-1" /> Add Tier
                        </Button>
                    </div>

                    {pricingRows.map((rowId, index) => (
                        <div key={rowId} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 border rounded-md bg-gray-50 relative">
                            {pricingRows.length > 1 && (
                                <button type="button" onClick={() => removePricingRow(rowId)} className="absolute top-2 right-2 text-red-500">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )}

                            <Field>
                                <FieldLabel htmlFor={`tourPricings[${index}][minGuests]`}>Min Guests</FieldLabel>
                                <Input
                                    name={`tourPricings[${index}][minGuests]`}
                                    type="number"
                                    min="1"
                                    defaultValue="1"
                                />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor={`tourPricings[${index}][maxGuests]`}>Max Guests</FieldLabel>
                                <Input
                                    name={`tourPricings[${index}][maxGuests]`}
                                    type="number"
                                    min="1"
                                    defaultValue="2"
                                />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor={`tourPricings[${index}][pricePerHour]`}>Price ($)</FieldLabel>
                                <Input
                                    name={`tourPricings[${index}][pricePerHour]`}
                                    type="number"
                                    step="0.01"
                                    placeholder="50.00"
                                />
                            </Field>
                        </div>
                    ))}
                    {getFieldError("tourPricings") && (
                        <FieldDescription className="text-red-600">{getFieldError("tourPricings")}</FieldDescription>
                    )}
                </div>

                <div className="border-t my-6"></div>

                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Weekly Availability</h3>
                        <Button type="button" variant="outline" size="sm" onClick={addAvailRow}>
                            <Plus className="w-4 h-4 mr-1" /> Add Slot
                        </Button>
                    </div>

                    {availRows.map((rowId, index) => (
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
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                >
                                    {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day, i) => (
                                        <option key={day} value={i}>{day}</option>
                                    ))}
                                </select>
                            </Field>

                            <Field>
                                <FieldLabel>Start Time</FieldLabel>
                                <Input name={`tourAvailabilities[${index}][startTime]`} type="time" defaultValue="09:00" />
                            </Field>

                            <Field>
                                <FieldLabel>End Time</FieldLabel>
                                <Input name={`tourAvailabilities[${index}][endTime]`} type="time" defaultValue="17:00" />
                            </Field>

                            <Field>
                                <FieldLabel>Capacity</FieldLabel>
                                <Input name={`tourAvailabilities[${index}][maxBookings]`} type="number" defaultValue="10" />
                            </Field>
                        </div>
                    ))}
                    {getFieldError("tourAvailabilities") && (
                        <FieldDescription className="text-red-600">{getFieldError("tourAvailabilities")}</FieldDescription>
                    )}
                </div>

                {/* Submit Button */}
                <FieldGroup className="mt-8">
                    <Field>
                        <Button type="submit" disabled={isPending} className="w-full text-lg py-6">
                            {isPending ? "Publishing Tour..." : "Publish Tour"}
                        </Button>
                    </Field>
                </FieldGroup>
            </FieldGroup>
        </form>
    );
};

export default CreateTourForm;