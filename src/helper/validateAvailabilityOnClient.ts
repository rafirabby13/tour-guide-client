/* eslint-disable @typescript-eslint/no-explicit-any */
// src/helper/validateAvailabilityOnClient.ts

export const validateAvailabilityOnClient = (formData: FormData): string | null => {
  const entries = Array.from(formData.entries());
  const slots: any[] = [];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // 1. Parse FormData into objects
  // The form sends data like: tourAvailabilities[0][startTime]
  entries.forEach(([key, value]) => {
    const match = key.match(/tourAvailabilities\[(\d+)\]\[(\w+)\]/);
    if (match) {
      const index = Number(match[1]);
      const field = match[2];
      if (!slots[index]) slots[index] = {};
      slots[index][field] = value;
    }
  });

  // 2. check if empty (though Zod usually catches this too)
  if (slots.length === 0) return "At least one availability slot is required.";

  // 3. Validate Logic
  const byDay: Record<string, any[]> = {};

  for (const slot of slots) {
    // Ensure all fields are present
    if (!slot.startTime || !slot.endTime) continue;

    // Check Start < End
    if (slot.startTime >= slot.endTime) {
      return `Invalid Time: On ${days[slot.dayOfWeek]}, a slot starts at ${slot.startTime} but ends at ${slot.endTime}. End time must be later.`;
    }

    // Group by day for overlap check
    if (!byDay[slot.dayOfWeek]) byDay[slot.dayOfWeek] = [];
    byDay[slot.dayOfWeek].push(slot);
  }

  // 4. Check Overlaps
  for (const dayIndex in byDay) {
    const daySlots = byDay[dayIndex].sort((a, b) => a.startTime.localeCompare(b.startTime));
    
    for (let i = 0; i < daySlots.length - 1; i++) {
      const current = daySlots[i];
      const next = daySlots[i + 1];

      // If current ends AFTER next starts = Overlap
      if (current.endTime > next.startTime) {
        return `Schedule Conflict on ${days[Number(dayIndex)]}:
        
        • Slot A: ${current.startTime} - ${current.endTime}
        • Slot B: ${next.startTime} - ${next.endTime}
        
        These times overlap. Please adjust them.`;
      }
    }
  }

  return null; // No errors
};