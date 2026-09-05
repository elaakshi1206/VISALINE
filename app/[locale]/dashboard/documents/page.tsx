"use client";

import { useState } from "react";
import {
  UploadCloud, FileCheck, AlertCircle, Info,
  Search, Filter, CheckCircle, Clock, Eye, Download, X
} from "lucide-react";
import { mockDocuments, DashboardDocument } from "@/data/dashboard/documents";
import DocumentCard from "@/components/dashboard/DocumentCard";

export default function DocumentsPage() {
  const [docs, setDocs] = useState<DashboardDocument[]>(mockDocuments);
  const [filter, setFilter] = useState<"all" | "required" | "uploaded" | "under_review">("all");
  const [uploadModalDocId, setUploadModalDocId] = useState<string | null>(null);
  const [previewDoc, setPreviewDoc] = useState<DashboardDocument | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const filteredDocs = docs.filter((d) => {
    if (filter === "all") return true;
    return d.status === filter;
  });

  const requiredCount = docs.filter((d) => d.status === "required" || d.status === "rejected").length;
  const uploadedCount = docs.filter((d) => d.status === "uploaded").length;
  const reviewCount = docs.filter((d) => d.status === "under_review").length;

  const handleSimulateUpload = (docId: string) => {
    setDocs((prev) =>
      prev.map((d) =>
        d.id === docId
          ? { ...d, status: "under_review", uploadDate: "Just now", fileSize: "145 KB", fileType: "PDF" }
          : d
      )
    );
    setUploadModalDocId(null);
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-navy tracking-tight">Document Center</h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage, upload, and review all documents submitted for your visa applications.
          </p>
        </div>

        <button
          onClick={() => {
            const req = docs.find((d) => d.status === "required");
            if (req) setUploadModalDocId(req.id);
            else alert("All required documents have already been uploaded!");
          }}
          className="inline-flex items-center justify-center gap-2 bg-saffron hover:bg-saffron-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all flex-shrink-0"
        >
          <UploadCloud className="w-4 h-4" /> Upload Document
        </button>
      </div>

      {/* Success Notification */}
      {uploadSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-4 flex items-center justify-between shadow-sm animate-fade-in">
          <div className="flex items-center gap-2.5 text-sm font-medium">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span>Document uploaded successfully and sent for official verification!</span>
          </div>
          <button onClick={() => setUploadSuccess(false)} className="text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Official Guidelines Alert */}
      <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-navy flex-shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs text-slate-700">
            <h4 className="font-bold text-navy text-sm">Official Government Upload Specifications</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-600 pt-1">
              <li><strong>Passport Bio Page:</strong> PDF format, minimum 10 KB, maximum 300 KB. Must be clearly legible.</li>
              <li><strong>Passport Photograph:</strong> JPEG/JPG format, minimum 10 KB, maximum 1 MB. Plain white background, full face front view.</li>
              <li><strong>Supporting Letters (Business/Medical):</strong> PDF format, maximum 1 MB, on official organization letterhead.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-extrabold text-navy">{uploadedCount}</div>
            <div className="text-xs text-slate-500 font-medium">Verified / Uploaded</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-extrabold text-navy">{reviewCount}</div>
            <div className="text-xs text-slate-500 font-medium">Under Review</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-extrabold text-navy">{requiredCount}</div>
            <div className="text-xs text-slate-500 font-medium">Action / Missing</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
        <button
          onClick={() => setFilter("all")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            filter === "all" ? "bg-navy text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          All Documents ({docs.length})
        </button>
        <button
          onClick={() => setFilter("required")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            filter === "required" ? "bg-navy text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Pending / Required ({requiredCount})
        </button>
        <button
          onClick={() => setFilter("under_review")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            filter === "under_review" ? "bg-navy text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Under Review ({reviewCount})
        </button>
        <button
          onClick={() => setFilter("uploaded")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            filter === "uploaded" ? "bg-navy text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Approved / Uploaded ({uploadedCount})
        </button>
      </div>

      {/* Document List */}
      <div className="space-y-3">
        {filteredDocs.map((doc) => (
          <DocumentCard
            key={doc.id}
            doc={doc}
            onUpload={(id) => setUploadModalDocId(id)}
            onView={(d) => setPreviewDoc(d)}
          />
        ))}
      </div>

      {/* Upload Modal */}
      {uploadModalDocId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 relative">
            <button
              onClick={() => setUploadModalDocId(null)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-lg font-bold text-navy">Upload Document</h3>
              <p className="text-xs text-slate-500 mt-1">
                {docs.find((d) => d.id === uploadModalDocId)?.name}
              </p>
            </div>

            <div className="border-2 border-dashed border-slate-300 hover:border-saffron rounded-2xl p-8 text-center bg-slate-50/60 cursor-pointer transition-colors group">
              <UploadCloud className="w-10 h-10 text-slate-400 group-hover:text-saffron mx-auto mb-2 transition-colors" />
              <p className="text-sm font-bold text-slate-700">Click to browse or drag file here</p>
              <p className="text-xs text-slate-400 mt-1">Supports PDF, JPG, PNG (Max 1 MB)</p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setUploadModalDocId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSimulateUpload(uploadModalDocId)}
                className="px-5 py-2 text-xs font-semibold bg-saffron hover:bg-saffron-600 text-white rounded-xl shadow-sm transition-all"
              >
                Confirm & Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 relative">
            <button
              onClick={() => setPreviewDoc(null)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-base font-bold text-navy">{previewDoc.name}</h3>
              <p className="text-xs text-slate-500">{previewDoc.fileType} • {previewDoc.fileSize}</p>
            </div>

            <div className="bg-slate-100 rounded-xl p-8 flex flex-col items-center justify-center min-h-[220px] border border-slate-200">
              <FileCheck className="w-16 h-16 text-emerald-600 mb-2" />
              <p className="text-sm font-semibold text-slate-700">Document Verified & Archived</p>
              <p className="text-xs text-slate-400 mt-1 text-center">
                Uploaded on {previewDoc.uploadDate}. Verified by Government of India Immigration Portal.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => { alert(`Downloading ${previewDoc.name}...`); setPreviewDoc(null); }}
                className="px-4 py-2 text-xs font-semibold bg-navy hover:bg-navy-light text-white rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
