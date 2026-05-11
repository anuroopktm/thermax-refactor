import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns the initials of a name (e.g., "John Doe" -> "JD")
 */
export function getInitials(name: string) {
  if (!name) return "??";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

/**
 * Normalizes and formats a status string (e.g., "IN_PROGRESS" -> "In Progress")
 */
export function formatStatus(status: string) {
  if (!status) return "";
  return status.replaceAll("_", " ");
}

/**
 * Maps a status string to a Badge variant
 */
export function getStatusVariant(status: string): any {
  const normalized = status?.replaceAll("_", " ").toLowerCase();
  switch (normalized) {
    case "in progress":
    case "pending":
      return "warning";
    case "completed":
    case "passed":
    case "success":
      return "success";
    case "failed":
    case "error":
      return "destructive";
    default:
      return "outline";
  }
}

/**
 * Formats a date string or object into a standard format (e.g., "DD/MM/YYYY")
 */
export function formatDate(
  date: string | Date | null | undefined,
  format = "DD/MM/YYYY",
) {
  if (!date) return "N/A";
  const d = dayjs(date);
  if (!d.isValid()) return "N/A";
  return d.format(format);
}
