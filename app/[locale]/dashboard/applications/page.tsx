"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Plus, Filter, FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { mockApplications, mockApplicationHistory } from "@/data/dashboard/applications";
import ApplicationCard from "@/components/dashboard/ApplicationCard";

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "active" | "completed" | "draft">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const allApps = [...mockApplications, ...mockApplicationHistory];

  const filteredApps = allApps.filter((app) => {
    // Filter by tab
    if (activeTab === "active" && (app.status === "completed" || app.status === "draft" || app.status === "rejected")) return false;
    if (activeTab === "completed" && app.status !== "completed") return false;
    if (activeTab === "draft" && app.status !== "draft") return false;

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchNo = app.applicationNo.toLowerCase().includes(q);
      const matchType = app.visaType.toLowerCase().includes(q);
      const matchCat = app.visaCategory.toLowerCase().includes(q);
      return matchNo || matchType || matchCat;
    }

    return true;
  });

  const activeCount = allApps.filter((a) => a.status !== "draft" && a.status !== "completed" && a.status !== "rejected").length;
  const completedCount = allApps.filter((a) => a.status === "completed").length;
  const draftCount = allApps.filter((a) => a.status === "draft").length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Header & CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-navy tracking-tight">My Applications</h2>
          <p className="text-sm text-slate-500 mt-1">
            Track, manage, and view status history of all your submitted and draft visa applications.
          </p>
        </div>

        <Link
          href="/en/apply/type-selection"
          className="inline-flex items-center justify-center gap-2 bg-saffron hover:bg-saffron-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all flex-shrink-0"
        >
          <Plus className="w-4 h-4" /> Start New Application
        </Link>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Tabs */}
        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "all" ? "bg-navy text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            All Applications ({allApps.length})
          </button>
          <button
            onClick={() => setActiveTab("active")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "active" ? "bg-navy text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            In Progress ({activeCount})
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "completed" ? "bg-navy text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Completed ({completedCount})
          </button>
          <button
            onClick={() => setActiveTab("draft")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "draft" ? "bg-navy text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Drafts ({draftCount})
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72 flex-shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by ID or visa type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-saffron focus:bg-white transition-all text-slate-800"
          />
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApps.length > 0 ? (
          filteredApps.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
            <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-navy">No applications found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              We couldn&apos;t find any applications matching your selected filter or search keyword.
            </p>
            <button
              onClick={() => { setActiveTab("all"); setSearchQuery(""); }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-saffron hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
