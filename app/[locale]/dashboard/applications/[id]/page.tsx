"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft, CheckCircle, Clock, Calendar, MapPin,
  FileText, ShieldCheck, Download, AlertTriangle,
  CreditCard, User, ExternalLink, HelpCircle
} from "lucide-react";
import { mockApplications, mockApplicationHistory } from "@/data/dashboard/applications";
import { mockDocuments } from "@/data/dashboard/documents";
import StatusBadge from "@/components/dashboard/StatusBadge";
import ActionRequired from "@/components/dashboard/ActionRequired";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ApplicationDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const allApps = [...mockApplications, ...mockApplicationHistory];
  const app = allApps.find((a) => a.id === id) || mockApplications[0];

  const relatedDocs = mockDocuments.filter((d) => d.applicationId === app.id);
  const isActionRequired = app.status === "action_required";
  const isCompleted = app.status === "completed" || app.status === "approved";

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/en/dashboard/applications"
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-navy hover:bg-slate-50 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded">
                {app.applicationNo}
              </span>
              <StatusBadge status={app.status} />
            </div>
            <h2 className="text-2xl font-extrabold text-navy mt-1 tracking-tight">
              {app.visaType}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => alert(`Downloading Application Form Copy for ${app.applicationNo}...`)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 shadow-sm transition-colors"
          >
            <Download className="w-4 h-4 text-slate-500" />
            Download Summary
          </button>
          {isCompleted && (
            <button
              onClick={() => alert(`Downloading official e-Visa grant PDF for ${app.applicationNo}...`)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-sm transition-all"
            >
              <Download className="w-4 h-4" />
              Download e-Visa
            </button>
          )}
        </div>
      </div>

      {/* Action Required Banner if applicable */}
      {isActionRequired && (
        <ActionRequired application={app} />
      )}

      {/* Multi-Step Timeline Tracker */}
      {app.steps && app.steps.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-navy mb-4 flex items-center justify-between">
            <span>Official Application Progress</span>
            <span className="text-xs font-normal text-slate-500">Updated: {app.lastUpdated || "Recently"}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {app.steps.map((step, idx) => (
              <div
                key={step.id}
                className={cn(
                  "p-4 rounded-xl border transition-all relative flex flex-col justify-between",
                  step.completed
                    ? "bg-emerald-50/50 border-emerald-200"
                    : step.active
                      ? isActionRequired
                        ? "bg-red-50 border-red-300 ring-2 ring-red-100"
                        : "bg-orange-50/60 border-saffron/40 ring-2 ring-saffron/20"
                      : "bg-slate-50/60 border-slate-200 opacity-60"
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold font-mono text-slate-400">Step {step.id}</span>
                    {step.completed ? (
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    ) : step.active ? (
                      <Clock className={cn("w-4 h-4", isActionRequired ? "text-red-500 animate-pulse" : "text-saffron animate-spin")} />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-slate-300" />
                    )}
                  </div>
                  <h4 className={cn("text-sm font-bold", step.active ? (isActionRequired ? "text-red-700" : "text-saffron") : "text-navy")}>
                    {step.label}
                  </h4>
                </div>

                {step.date ? (
                  <p className="text-[11px] text-slate-500 mt-3 font-medium">
                    {step.date}
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-400 mt-3 italic">
                    Pending
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid of Details: Applicant, Travel, Documents, Payment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Applicant & Travel Info (2 cols wide on desktop) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Applicant & Passport Details */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-base font-bold text-navy mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-saffron" />
              Applicant & Travel Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Full Name</span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 block">John Doe</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Nationality</span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 block">{app.nationality}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Passport Number</span>
                <span className="font-bold font-mono text-slate-800 text-sm mt-0.5 block">{app.passportNo}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Visa Sub-Category</span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 block">{app.visaCategory}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Expected Travel Date</span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 block">{app.travelDate || "15 Sep 2026"}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Port of Arrival</span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 block">{app.portOfEntry || "Delhi Airport (DEL)"}</span>
              </div>
            </div>
          </div>

          {/* Attached Documents Checklist */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-navy flex items-center gap-2">
                <FileText className="w-5 h-5 text-saffron" />
                Submitted Documents
              </h3>
              <Link
                href="/en/dashboard/documents"
                className="text-xs font-semibold text-saffron hover:underline flex items-center gap-1"
              >
                Document Center <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-2.5">
              {relatedDocs.length > 0 ? (
                relatedDocs.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-navy" />
                      <div>
                        <div className="text-xs font-bold text-slate-800">{doc.name}</div>
                        <div className="text-[11px] text-slate-500">{doc.fileType} • {doc.fileSize || "Pending upload"}</div>
                      </div>
                    </div>
                    <span className={cn(
                      "text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase",
                      doc.status === "uploaded" ? "bg-emerald-100 text-emerald-700" :
                      doc.status === "required" ? "bg-red-100 text-red-700" :
                      "bg-amber-100 text-amber-700"
                    )}>
                      {doc.status.replace("_", " ")}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 py-3 text-center">No individual documents tagged to this record.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Payment & Support card */}
        <div className="space-y-6">
          {/* Payment summary */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-base font-bold text-navy mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-saffron" />
              Payment Information
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Government Visa Fee</span>
                <span className="font-bold text-slate-800">{app.paymentAmount || "₹2,500"}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Payment Status</span>
                <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  {app.paymentStatus ? app.paymentStatus.toUpperCase() : "PAID"}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Payment Mode</span>
                <span className="font-medium text-slate-700">Online Card / UPI</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-500">Receipt Ref</span>
                <span className="font-mono text-slate-700">TXN-8941258</span>
              </div>
            </div>

            <button
              onClick={() => alert(`Downloading payment receipt for TXN-8941258...`)}
              className="w-full mt-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Download Tax Invoice
            </button>
          </div>

          {/* Official Verification Seal */}
          <div className="bg-gradient-to-br from-navy to-navy-light text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
            <div className="relative z-10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-saffron" />
              </div>
              <h4 className="text-base font-bold">Government Authenticated</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                This application is registered with the Ministry of Home Affairs, Government of India. All submissions are encrypted and legally verified.
              </p>
              <div className="pt-2">
                <Link
                  href="/en/dashboard/help"
                  className="inline-flex items-center gap-1.5 text-xs text-saffron hover:underline font-semibold"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  Need assistance with this visa?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
