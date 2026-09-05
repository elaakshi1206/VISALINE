"use client";

import { ADVISORIES } from "@/data/visaData";
import { AlertCircle } from "lucide-react";

export default function AdvisoriesPage() {
  return (
    <div className="min-h-screen py-16 relative z-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12 bg-white px-8 py-6 rounded-2xl max-w-xl mx-auto shadow-md border border-slate-200">
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-3">Important Advisories</h1>
          <p className="text-slate-600 text-sm md:text-base">Official notifications and alerts from the Government of India.</p>
        </div>

        <div className="space-y-6">
          {ADVISORIES.map((adv) => (
            <div key={adv.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-md flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <AlertCircle className={`w-6 h-6 ${adv.severity === 'danger' ? 'text-red-500' : adv.severity === 'warning' ? 'text-amber-500' : 'text-blue-500'}`} />
              </div>
              <div>
                <h3 className="font-bold text-navy mb-2">{adv.title}</h3>
                <p className="text-sm text-slate-500 mb-3">{new Date(adv.date).toLocaleDateString()}</p>
                <p className="text-slate-600 leading-relaxed">{adv.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
