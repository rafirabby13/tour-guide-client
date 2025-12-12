/**
 * Converts "HH:MM" string to total minutes from midnight.
 * Example: "01:30" -> 90
 */
export const timeToMinutes = (time: string): number => {
  if (!time) return 0;
  const [hours, minutes] = time.split(":").map(Number);
  return (hours * 60) + minutes;
};

/**
 * Converts total minutes to "HH:MM" string format.
 * Example: 90 -> "01:30"
 */
export const minutesToTime = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  // Pad with '0' if single digit (e.g., 9 -> "09")
  const hh = hours.toString().padStart(2, "0");
  const mm = minutes.toString().padStart(2, "0");

  return `${hh}:${mm}`;
};

/**
 * Formatting Helper: Returns a readable duration string.
 * Example: 90 -> "1h 30m"
 */
export const formatDuration = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h`;
  return `${minutes}m`;
};