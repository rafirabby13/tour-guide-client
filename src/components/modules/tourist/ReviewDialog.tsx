/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import Swal from "sweetalert2";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { submitReview } from "@/services/tourist/submitReview";


interface ReviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
}

export default function ReviewDialog({
  isOpen,
  onClose,
  bookingId,
}: ReviewDialogProps) {
  
  // Hook for Server Action
  const [state, formAction, isPending] = useActionState(submitReview, null);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  // Helper: Handle Star Click
  const handleRating = (value: number) => {
    setRating(value);
  };

  // Intercept submit to inject rating & bookingId
  const handleSubmit = (formData: FormData) => {
    formData.append("bookingId", bookingId);
    formData.append("rating", rating.toString());
    formAction(formData);
  };

  // Effect: Handle Success/Error
  useEffect(() => {
    if (state?.error) {
      Swal.fire({
        title: "Error",
        text: typeof state.error === "string" ? state.error : "Failed to submit review",
        icon: "error",
      });
    }
    if (state?.success) {
      Swal.fire({
        title: "Thank You!",
        text: "Your review has been submitted.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      onClose();
    }
  }, [state, onClose]);

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (isOpen) {
        setRating(0);
        setHover(0);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rate Your Experience</DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-6">
          <FieldGroup>
            
            {/* --- Star Rating --- */}
            <div className="flex flex-col items-center justify-center space-y-2 py-4">
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            className="focus:outline-none transition-transform hover:scale-110"
                            onClick={() => handleRating(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(rating)}
                        >
                            <Star
                                className={`w-8 h-8 ${
                                    star <= (hover || rating) 
                                        ? "fill-yellow-400 text-yellow-400" 
                                        : "text-gray-300"
                                }`}
                            />
                        </button>
                    ))}
                </div>
                <p className="text-sm font-medium text-gray-500 min-h-[20px]">
                    {hover === 5 ? "Excellent!" : 
                     hover === 4 ? "Very Good" : 
                     hover === 3 ? "Good" : 
                     hover === 2 ? "Fair" : 
                     hover === 1 ? "Poor" : ""}
                </p>
            </div>

            {/* --- Comment Field --- */}
            <Field>
              <FieldLabel>Write a review (Optional)</FieldLabel>
              <Textarea
                name="comment"
                placeholder="Share details of your own experience..."
                rows={4}
                className="resize-none"
              />
            </Field>

            {/* --- Actions --- */}
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending || rating === 0}>
                {isPending ? "Submitting..." : "Submit Review"}
              </Button>
            </div>

          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}