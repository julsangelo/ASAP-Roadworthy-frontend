import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const initials = (name: string = "") => {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] || "";
  const last = parts.at(-1)?.[0] || "";

  return (first + last).toUpperCase();
};

export function formatDateTime(dateStr: string): string {
  if (!dateStr || dateStr === "0000-00-00 00:00:00") return "-";

  const date = new Date(dateStr.replace(" ", "T"));
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
