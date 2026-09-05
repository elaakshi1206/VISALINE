"use client";

import Link from "next/link";
import { CheckCircle, Clock, Calendar, MapPin, ArrowRight, Eye, Download, AlertCircle } from "lucide-react";
import { Application } from "@/data/dashboard/applications";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { cn } from "@/lib/utils";

interface ApplicationCardProps {
  application: Application;
  compact?: boolean;
}

export default function ApplicationCard({ application, compact = false }: ApplicationCardProps) {
  const isDraft = application.status === "draft";
  const isActionRequired = application.status === "action_required";
  const isCompleted = application.status === "completed" || application.status === "approved";

  return (
    <div className={cn(
      "bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm hover:shadow-md",
      isActionRequired ? "border-red-200 ring-1 ring-red-100" : "border-slate-200/80"
    )}>
      {/* Top Header */}
      <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
              {application.applicationNo}
            </span>
            <StatusBadge status={application.status} />
          </div>
          <h3 className="text-lg font-bold text-navy mt-2">
            {application.visaType}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Category: <span className="font-semibold text-slate-700">{application.visaCategory}</span> • Nationality: <span className="font-semibold text-slate-700">{application.nationality}</span>
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          {isDraft ? (
            <Link
              href="/en/apply/form"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-saffron hover:bg-saffron-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm"
            >
              Resume Application <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <>
              <Link
                href={`/en/dashboard/applications/${application.id}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 hover:text-navy transition-colors"
              >
                <Eye className="w-4 h-4" />
                View Details
              </Link>
              {isCompleted && (
                <button
                  onClick={() => alert(`Downloading e-Visa Grant Letter for ${application.applicationNo}`)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm font-semibold hover:bg-emerald-100 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  e-Visa PDF
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Body: Key info & Steps */}
      <div className="p-5 sm:p-6 bg-slate-50/40">
        {!isDraft && application.travelDate && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5 text-xs text-slate-600">
            <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-100">
              <Calendar className="w-4 h-4 text-saffron flex-shrink-0" />
              <div>
                <div className="text-slate-400 font-medium">Expected Arrival</div>
                <div className="font-semibold text-slate-800">{application.travelDate}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-100">
              <MapPin className="w-4 h-4 text-saffron flex-shrink-0" />
              <div className="truncate">
                <div className="text-slate-400 font-medium">Port of Entry</div>
                <div className="font-semibold text-slate-800 truncate">{application.portOfEntry || "Delhi Airport"}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-100">
              <Clock className="w-4 h-4 text-saffron flex-shrink-0" />
              <div>
                <div className="text-slate-400 font-medium">Last Status Update</div>
                <div className="font-semibold text-slate-800">{application.lastUpdated || application.submittedDate}</div>
              </div>
            </div>
          </div>
        )}

        {/* Draft progress bar */}
        {isDraft && (
          <div className="space-y-2 mb-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600">Application Completion</span>
              <span className="font-bold text-saffron">{application.progress || 60}%</span>
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-saffron rounded-full transition-all duration-500"
                style={{ width: `${application.progress || 60}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span>Sections completed: 3 of 5</span>
              <span>Saved: {application.lastSaved || "Recently"}</span>
            </div>
          </div>
        )}

        {/* Multi-step progress tracker for active applications */}
        {!isDraft && application.steps && application.steps.length > 0 && !compact && (
          <div>
            <div className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wider">
              Application Timeline Tracker
            </div>
            <div className="flex items-center justify-between overflow-x-auto pb-2">
              {application.steps.map((step, idx) => {
                const isLast = idx === application.steps.length - 1;
                return (
                  <div key={step.id} className="flex items-center flex-1 min-w-[90px]">
                    <div className="flex flex-col items-center text-center">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center border-2 text-xs font-bold transition-all shadow-sm",
                        step.completed
                          ? "bg-emerald-500 border-emerald-500 text-white"
                          : step.active
                            ? isActionRequired
                              ? "bg-red-500 border-red-500 text-white animate-pulse"
                              : "bg-saffron border-saffron text-white ring-4 ring-saffron/20"
                            : "bg-white border-slate-300 text-slate-400"
                      )}>
                        {step.completed ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : step.active && isActionRequired ? (
                          <AlertCircle className="w-4 h-4" />
                        ) : (
                          step.id
                        )}
                      </div>
                      <span className={cn(
                        "text-[11px] font-semibold mt-1.5 line-clamp-1",
                        step.active ? (isActionRequired ? "text-red-600" : "text-saffron font-bold") : step.completed ? "text-emerald-700" : "text-slate-400"
                      )}>
                        {step.label}
                      </span>
                      {step.date && (
                        <span className="text-[9px] text-slate-400 mt-0.5 leading-none">
                          {step.date.split(",")[0]}
                        </span>
                      )}
                    </div>
                    {!isLast && (
                      <div className={cn(
                        "h-0.5 flex-1 mx-2 -mt-5 transition-colors",
                        application.steps[idx + 1].completed || application.steps[idx + 1].active
                          ? "bg-emerald-400"
                          : "bg-slate-200"
                      )} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
