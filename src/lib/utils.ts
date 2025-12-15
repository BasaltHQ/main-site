import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeAgo(iso: string | number | Date | undefined) {
  if (!iso) return "just now";
  const t = typeof iso === 'string' || typeof iso === 'number' ? new Date(iso).getTime() : (iso as Date).getTime();
  const diff = Math.max(0, Date.now() - t);
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m} min ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hr${h>1?'s':''} ago`;
  const d = Math.floor(h / 24);
  return `${d} day${d>1?'s':''} ago`;
}
