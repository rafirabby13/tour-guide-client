/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useMemo } from "react";
import { useActionState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Calendar, Clock, CreditCard, Timer, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { bookTour } from "@/services/tourist/bookTour";
import { minToTime } from "@/helper/minToTime";
import { getCurrentTimeStr } from "@/helper/getCurrentTimeStr";


interface TourBookingFormProps {
  tourId: string;
  pricePerHour: number;
  maxGuests: number; // Optional limit from tour details
  availabilities: any[],
  user?: any
}

export default function TourBookingForm({ tourId, pricePerHour, maxGuests, availabilities, user }: TourBookingFormProps) {
  const router = useRouter();

  // Hook for Server Action
  const [state, formAction, isPending] = useActionState(bookTour, null);

  // --- Local State for Live Calculations ---
  // We keep track of these values to show the user the Total Price immediately
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState<number>(1);
  const [numGuests, setNumGuests] = useState<number>(1);
  const [startTime, setStartTime] = useState<string>("09:00");
  const handleSubmitClick = (e: any) => {
    if (!user) {
      e.preventDefault();           // Stop form submission
      router.push("/login");        // Redirect to login
      return;
    }
  }
  const timeConstraints = useMemo(() => {
    if (!date) return { disabled: true, min: "", max: "", error: "Please select a date first" };

    const selectedDate = new Date(date);
    const dayOfWeek = selectedDate.getDay(); // 0 (Sun) - 6 (Sat)
    console.log(availabilities, dayOfWeek)

    // Find if guide works on this day
    const schedule = availabilities.find((slot: any) => slot.dayOfWeek === dayOfWeek);

    if (!schedule || !schedule.isActive) {
      return { disabled: true, error: "Tour not available on this day of the week." };
    }

    // Base Min/Max from schedule
    let min = minToTime(schedule.startTimeMinutes);
    const max = minToTime(schedule.endTimeMinutes);

    console.log(min)

    // If TODAY, ensure min time is not in the past
    const todayStr = new Date().toISOString().split("T")[0];
    if (date === todayStr) {
      const nowStr = getCurrentTimeStr();
      if (nowStr > max) return { disabled: true, error: "Too late to book for today." };
      if (nowStr > min) min = nowStr; // Bump min time to now
    }

    return { disabled: false, min, max, error: null };
  }, [date, availabilities]);

  // Helper: Calculate End Time for display
  const calculateEndTime = (start: string, hrs: number) => {
    if (!start) return "--:--";
    const [h, m] = start.split(":").map(Number);
    const date = new Date();
    date.setHours(h, m);
    date.setHours(date.getHours() + hrs);
    return date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  };

  const estimatedEndTime = calculateEndTime(startTime, duration);
  const totalPrice = pricePerHour * duration * numGuests;

  // Helper: Get Field Errors
  const getFieldError = (fieldName: string) => {
    if (state?.errors) {
      const error = state.errors.find((err: any) =>
        err.field === fieldName || err.path?.join(".") === fieldName
      );
      return error ? error.message : null;
    }
    return null;
  };

  // Effect: Handle Success/Error
  useEffect(() => {
    if (state?.error) {
      Swal.fire({
        title: "Booking Failed",
        text: typeof state.error === "string" ? state.error : "Could not complete booking",
        icon: "error",
      });
    }
    if (state?.success) {
      Swal.fire({
        title: "Booking Initiated!",
        text: "Redirecting to payment...",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      // Redirect to Payment URL provided by backend
      if (state.paymentUrl) {
        window.location.href = state.paymentUrl;
      } else {
        router.refresh(); // Fallback
      }
    }
  }, [state, router]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 w-full max-w-md sticky top-8">
      <div className="mb-6 pb-4 border-b">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-primary" />
          Book This Tour
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          <span className="font-bold text-lg text-black">${pricePerHour}</span> / hour per guest
        </p>
      </div>

      <form action={formAction}>
        {/* Hidden Tour ID */}
        <input type="hidden" name="tourId" value={tourId} />

        <FieldGroup className="space-y-4">

          {/* --- Date --- */}
          <Field>
            <FieldLabel className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Select Date
            </FieldLabel>
            <Input
              type="date"
              name="date"
              min={new Date().toISOString().split("T")[0]} // Disable past dates
              onChange={(e) => {
                setDate(e.target.value);
                setStartTime(""); // Reset time on date change
              }}
              required
            />
            {/* {getFieldError("date") && (
              <FieldDescription className="text-red-600">
                {getFieldError("date")}
              </FieldDescription>
            )} */}
            {timeConstraints.error && (
              <p className="text-xs text-red-500 mt-1 font-medium">{timeConstraints.error}</p>
            )}
          </Field>

          <div className="grid grid-cols-2 gap-4">
            {/* --- Start Time --- */}
            <Field>
              <FieldLabel className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> Start
              </FieldLabel>
              <Input
                type="time"
                name="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                min={timeConstraints.min}
                max={timeConstraints.max}
                disabled={timeConstraints.disabled}
                required
                className={timeConstraints.error ? "bg-gray-100 cursor-not-allowed" : ""}
              />
              {/* {getFieldError("startTime") && (
                <FieldDescription className="text-red-600">
                  {getFieldError("startTime")}
                </FieldDescription>
              )} */}
              {!timeConstraints.disabled && date && timeConstraints.error && (
                <p className="text-[10px] text-red-500 mt-1">
                  Valid: {timeConstraints.min} - {timeConstraints.max}
                </p>
              )}
            </Field>

            {/* --- Duration --- */}
            <Field>
              <FieldLabel className="flex items-center gap-2">
                <Timer className="w-4 h-4" /> Duration (Hr)
              </FieldLabel>
              <Input
                type="number"
                name="duration"
                min={1}
                max={24}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                required
              />
              {getFieldError("duration") && (
                <FieldDescription className="text-red-600">
                  {getFieldError("duration")}
                </FieldDescription>
              )}
            </Field>
          </div>

          {/* --- Guests --- */}
          <Field>
            <FieldLabel className="flex items-center gap-2">
              <Users className="w-4 h-4" /> Guests
            </FieldLabel>
            <Input
              type="number"
              name="numGuests"
              min={1}
              max={maxGuests}
              value={numGuests}
              onChange={(e) => setNumGuests(Number(e.target.value))}
              required
            />
            <p className="text-xs text-gray-400 text-right mt-1">Max capacity: {maxGuests}</p>
            {getFieldError("numGuests") && (
              <FieldDescription className="text-red-600">
                {getFieldError("numGuests")}
              </FieldDescription>
            )}
          </Field>

          {/* --- Summary Calculation Box --- */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-2 border border-gray-200 mt-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>End Time (Approx):</span>
              <span className="font-medium">{estimatedEndTime}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-300">
              <span className="font-bold text-gray-900">Total Price</span>
              <span className="text-xl font-bold text-blue-600">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          {/* --- Submit Button --- */}
          <div className="mt-6">
            <Button type="submit" disabled={isPending || timeConstraints.disabled} onClick={handleSubmitClick}
              className="w-full h-12 text-lg">
              {isPending ? "Processing..." : "Confirm Booking"}
            </Button>
            {/* General Error Message (e.g. Server Error) */}
            {state?.error && typeof state.error === 'string' && (
              <p className="text-red-600 text-sm text-center mt-2">{state.error}</p>
            )}
          </div>

        </FieldGroup>
      </form>
    </div>
  );
}