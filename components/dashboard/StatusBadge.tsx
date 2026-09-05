"use client";

import { ApplicationStatus, getStatusLabel, getStatusColor } from "@/data/dashboard/applications";
import { cn } from "@/lib/utils";
import {
  Clock, CheckCircle, AlertTriangle, XCircle,
  FileText, Loader2, Award, Edit3
} from "lucide-react";

interface Props {
  status: ApplicationStatus;
  size?: "sm" | "md";
  showIcon?: boolean;
}

const icons: Record<ApplicationStatus, React.ElementType> = {
  draft: Edit3,
  submitted: FileText,
  verification: Clock,
  processing: Loader2,
  action_required: AlertTriangle,
  approved: Award,
  rejected: XCircle,
  completed: CheckCircle,
};

export default function StatusBadge({ status, size = "md", showIcon = true }: Props) {
  const Icon = icons[status];
  const colorClass = getStatusColor(status);
  const label = getStatusLabel(status);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-semibold rounded-full border",
        size === "sm" ? "text-xs px-2.5 py-0.5" : "text-sm px-3 py-1",
        colorClass,
        "border-current/20"
      )}
    >
      {showIcon && <Icon className={cn("flex-shrink-0", size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5")} />}
      {label}
    </span>
  );
}
