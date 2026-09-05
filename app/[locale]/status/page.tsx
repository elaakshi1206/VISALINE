"use client";

import { CheckCircle, FileText, Clock, Download } from "lucide-react";
import { useState } from "react";

export default function StatusPage() {
  const [searched, setSearched] = useState(false);

  return (
    <div className="min-h-screen py-16 relative z-10">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        
        <div className="text-center mb-12 bg-white px-8 py-6 rounded-2xl max-w-xl mx-auto shadow-md border border-slate-200">
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-3">Track Application Status</h1>
          <p className="text-slate-600 text-sm md:text-base">Enter your application ID and passport number to check current processing status.</p>
        </div>

        {/* Search Form */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-8 max-w-2xl mx-auto">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSearched(true); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Application ID</label>
                <input type="text" defaultValue="IND123456" className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-navy focus:outline-none uppercase font-mono" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Passport Number</label>
                <input type="text" defaultValue="A1234567" className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-navy focus:outline-none uppercase" />
              </div>
            </div>
            <button className="w-full bg-navy hover:bg-navy-dark text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Check Status
            </button>
          </form>
        </div>

        {/* Status Tracker UI (Visible after search) */}
        {searched && (
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            <div className="flex flex-col md:flex-row items-center justify-between border-b border-slate-100 pb-8 mb-10 gap-4">
              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Application ID</p>
                <p className="text-2xl font-mono font-bold text-navy">IND123456</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Under Processing
              </div>
            </div>

            <div className="relative">
              {/* Vertical line for mobile, horizontal for desktop */}
              <div className="absolute left-[27px] top-0 bottom-0 w-1 bg-slate-100 md:hidden" />
              <div className="hidden md:block absolute top-[27px] left-0 right-0 h-1 bg-slate-100" />

              {/* Dynamic filled line (mocking 50% progress) */}
              <div className="hidden md:block absolute top-[27px] left-0 w-1/2 h-1 bg-emerald-500 transition-all duration-1000" />
              <div className="absolute left-[27px] top-0 h-1/2 w-1 bg-emerald-500 transition-all duration-1000 md:hidden" />

              <div className="flex flex-col md:flex-row justify-between relative z-10 gap-8 md:gap-0">
                
                {/* Step 1: Completed */}
                <div className="flex md:flex-col items-center gap-4 md:gap-3 flex-1 md:text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg border-4 border-white flex-shrink-0">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Application Submitted</h4>
                    <p className="text-xs text-slate-500 mt-1">12 Oct 2026, 09:41 AM</p>
                  </div>
                </div>

                {/* Step 2: Completed */}
                <div className="flex md:flex-col items-center gap-4 md:gap-3 flex-1 md:text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg border-4 border-white flex-shrink-0">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Documents Verified</h4>
                    <p className="text-xs text-slate-500 mt-1">12 Oct 2026, 11:30 AM</p>
                  </div>
                </div>

                {/* Step 3: Current */}
                <div className="flex md:flex-col items-center gap-4 md:gap-3 flex-1 md:text-center">
                  <div className="w-14 h-14 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg border-4 border-amber-100 ring-4 ring-amber-50 flex-shrink-0 relative">
                    <Clock className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-600">Under Processing</h4>
                    <p className="text-xs text-slate-500 mt-1">Typically takes 72 hours</p>
                  </div>
                </div>

                {/* Step 4: Pending */}
                <div className="flex md:flex-col items-center gap-4 md:gap-3 flex-1 md:text-center">
                  <div className="w-14 h-14 rounded-full bg-white text-slate-300 border-4 border-slate-100 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-400">Decision & ETA</h4>
                    <p className="text-xs text-slate-400 mt-1">Pending</p>
                  </div>
                </div>

              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-slate-100 flex items-center justify-center">
              <button disabled className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-400 bg-slate-100 cursor-not-allowed">
                <Download className="w-4 h-4" /> Download ETA Receipt
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
