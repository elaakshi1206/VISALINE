"use client";

import { FileText, Image as ImageIcon, UploadCloud, CheckCircle, Clock, AlertTriangle, Eye, Trash2, Download } from "lucide-react";
import { DashboardDocument, getDocStatusLabel, getDocStatusColor } from "@/data/dashboard/documents";
import { cn } from "@/lib/utils";

interface DocumentCardProps {
  doc: DashboardDocument;
  onUpload?: (id: string) => void;
  onView?: (doc: DashboardDocument) => void;
  onDelete?: (id: string) => void;
}

export default function DocumentCard({ doc, onUpload, onView, onDelete }: DocumentCardProps) {
  const isRequired = doc.status === "required";
  const isUploaded = doc.status === "uploaded";
  const isReview = doc.status === "under_review";
  const isRejected = doc.status === "rejected";

  const isImage = doc.fileType?.toLowerCase().includes("jpg") || doc.fileType?.toLowerCase().includes("jpeg") || doc.type === "photo";

  return (
    <div className={cn(
      "bg-white rounded-2xl border transition-all p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:shadow-md",
      isRequired || isRejected ? "border-red-200 bg-red-50/20" : "border-slate-200/80"
    )}>
      <div className="flex items-start gap-3.5">
        <div className={cn(
          "w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm",
          isRequired ? "bg-red-100 text-red-600" :
          isReview ? "bg-amber-100 text-amber-600" :
          "bg-blue-50 text-navy"
        )}>
          {isImage ? <ImageIcon className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
        </div>

        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-bold text-navy text-sm sm:text-base">{doc.name}</h4>
            <span className={cn("text-[11px] font-bold px-2 py-0.5 rounded-full", getDocStatusColor(doc.status))}>
              {getDocStatusLabel(doc.status)}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
            {doc.fileType && <span>Format: <strong className="text-slate-700">{doc.fileType}</strong></span>}
            {doc.fileSize && <span>• Size: <strong className="text-slate-700">{doc.fileSize}</strong></span>}
            {doc.uploadDate && <span>• Uploaded on {doc.uploadDate}</span>}
            {isRequired && <span className="text-red-600 font-semibold">• Pending upload</span>}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-center w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        {isUploaded && (
          <>
            <button
              onClick={() => onView && onView(doc)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 hover:text-navy transition-colors"
            >
              <Eye className="w-3.5 h-3.5" /> Preview
            </button>
            <button
              onClick={() => alert(`Downloading ${doc.name}...`)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 hover:text-navy transition-colors"
              title="Download file"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </>
        )}

        {(isRequired || isRejected) && (
          <button
            onClick={() => onUpload && onUpload(doc.id)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-saffron hover:bg-saffron-600 text-white text-xs font-semibold shadow-sm transition-all"
          >
            <UploadCloud className="w-4 h-4" /> Upload Now
          </button>
        )}

        {isUploaded && (
          <button
            onClick={() => onUpload && onUpload(doc.id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-navy hover:bg-slate-100 transition-colors"
          >
            Replace
          </button>
        )}
      </div>
    </div>
  );
}
