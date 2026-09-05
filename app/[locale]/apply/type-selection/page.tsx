"use client";

import Link from "next/link";
import { ArrowRight, Smartphone, Building2 } from "lucide-react";

export default function TypeSelectionPage() {
  return (
    <div className="min-h-screen py-16 relative z-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12 bg-white px-8 py-6 rounded-2xl max-w-xl mx-auto shadow-md border border-slate-200">
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-3">Start Your Application</h1>
          <p className="text-slate-600 text-sm md:text-base">Select the type of visa application you want to begin.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all flex flex-col h-full">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
              <Smartphone className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-navy mb-2">Apply for eVisa</h2>
            <p className="text-slate-600 mb-8 flex-grow">
              Fast, online processing for Tourism, Business, and Medical purposes. 
              Only available for eligible countries.
            </p>
            <Link href="/apply/form?type=evisa" className="w-full bg-navy hover:bg-navy-dark text-white font-bold py-3.5 rounded-xl text-center transition-all shadow-md">
              Start eVisa Application
            </Link>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-200 hover:border-amber-500 hover:shadow-xl transition-all flex flex-col h-full">
            <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-6">
              <Building2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-navy mb-2">Apply for Regular Visa</h2>
            <p className="text-slate-600 mb-8 flex-grow">
              For long-term stays, employment, or nationalities not eligible for eVisa. 
              Requires physical submission at an Indian Mission.
            </p>
            <Link href="/apply/form?type=regular" className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3.5 rounded-xl text-center transition-all shadow-md">
              Start Regular Visa
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
