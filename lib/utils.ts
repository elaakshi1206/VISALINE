import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "approved": return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "rejected": return "bg-red-100 text-red-800 border-red-200";
    case "processing": return "bg-amber-100 text-amber-800 border-amber-200";
    case "submitted": return "bg-blue-100 text-blue-800 border-blue-200";
    case "under-verification": return "bg-indigo-100 text-indigo-800 border-indigo-200";
    case "draft": return "bg-slate-100 text-slate-600 border-slate-200";
    case "decision-made": return "bg-purple-100 text-purple-800 border-purple-200";
    default: return "bg-slate-100 text-slate-600 border-slate-200";
  }
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case "approved": return "Approved";
    case "rejected": return "Rejected";
    case "processing": return "Under Processing";
    case "submitted": return "Submitted";
    case "under-verification": return "Under Verification";
    case "draft": return "Draft";
    case "decision-made": return "Decision Made";
    default: return status;
  }
}

export function generateApplicationNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 900000) + 100000;
  return `ETA${year}${random}`;
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}
