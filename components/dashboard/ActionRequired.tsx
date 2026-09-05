"use client";

import Link from "next/link";
import { AlertTriangle, UploadCloud, ArrowRight, Clock } from "lucide-react";
import { Application } from "@/data/dashboard/applications";

interface ActionRequiredProps {
  application: Application;
  onActionClick?: () => void;
}

export default function ActionRequired({ application, onActionClick }: ActionRequiredProps) {
  return (
    <div className="bg-gradient-to-r from-red-50 via-amber-50 to-orange-50 border-2 border-red-200/80 rounded-2xl p-5 sm:p-6 shadow-sm relative overflow-hidden transition-all hover:shadow-md">
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-100/50 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 shadow-sm">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-red-100 text-red-700 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Action Required
              </span>
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                Response requested within 48h
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-navy mt-1">
              {application.visaType} — {application.applicationNo}
            </h3>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              {application.remarks || "An additional document or correction is required to continue processing your visa application."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto flex-shrink-0 pt-2 sm:pt-0">
          <Link
            href={`/en/dashboard/applications/${application.id}`}
            className="flex-1 sm:flex-none text-center px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-white transition-colors"
          >
            View Details
          </Link>
          <Link
            href="/en/dashboard/documents"
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-saffron hover:bg-saffron-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm group"
          >
            <UploadCloud className="w-4 h-4" />
            Upload Document
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
