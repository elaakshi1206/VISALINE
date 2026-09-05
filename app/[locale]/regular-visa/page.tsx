"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle, FileText, Building2, MapPin } from "lucide-react";

export default function RegularVisaPage() {
  return (
    <div className="min-h-screen py-12 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg mb-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Building2 className="w-32 h-32" />
          </div>
          <h1 className="text-3xl font-bold mb-4 relative z-10">Regular / Paper Visa</h1>
          <p className="text-slate-300 text-lg relative z-10 mb-8 max-w-2xl mx-auto">
            Apply online, then submit your physical application at an Indian Mission or Visa Application Center.
          </p>
          <div className="inline-flex gap-4 relative z-10">
            <Link
              href="/apply/type-selection?type=regular"
              className="bg-saffron hover:bg-saffron-600 text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-md"
            >
              Start Application <ArrowRight className="w-4 h-4 inline ml-2" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-md">
              <h2 className="text-xl font-bold text-navy mb-4">How it works</h2>
              
              <div className="space-y-6 relative">
                <div className="absolute top-0 bottom-0 left-[19px] w-0.5 bg-slate-100" />
                
                {[
                  { title: "Fill Online Form", desc: "Complete the regular visa application online." },
                  { title: "Print Application", desc: "Print the completed application and sign it." },
                  { title: "Book Appointment", desc: "Schedule a visit to the nearest Indian Mission or outsourcing agency." },
                  { title: "Submit Documents", desc: "Submit your physical passport, photos, and supporting documents." },
                  { title: "Collect Passport", desc: "Collect your passport with the stamped visa once processed." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 relative z-10">
                    <div className="w-10 h-10 bg-navy text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 mt-2">{step.title}</h3>
                      <p className="text-slate-600 text-sm mt-1">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-md">
               <h2 className="text-xl font-bold text-navy mb-4">Common Visa Types</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {[
                   "Tourist Visa", "Business Visa", "Employment Visa",
                   "Student Visa", "Entry Visa", "Medical Visa",
                   "Conference Visa", "Journalist Visa"
                 ].map(v => (
                   <div key={v} className="flex items-center gap-2 text-sm text-slate-800 bg-slate-50 p-3 rounded-lg border border-slate-200">
                     <CheckCircle className="w-4 h-4 text-emerald-500" /> {v}
                   </div>
                 ))}
               </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-md">
               <h3 className="font-bold text-navy mb-4 flex items-center gap-2">
                 <MapPin className="w-5 h-5 text-saffron" />
                 Find Indian Mission
               </h3>
               <p className="text-sm text-slate-600 mb-4">
                 You must submit your physical application to the Indian Mission, Post, or outsourced Visa Application Center in your jurisdiction.
               </p>
               <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium py-2 rounded-lg text-sm transition-colors border border-slate-200">
                 Locate nearest center
               </button>
            </div>

            <div className="bg-white p-6 rounded-xl border border-blue-200 shadow-md text-slate-800">
               <h3 className="font-bold mb-2 flex items-center gap-2 text-navy">
                 <FileText className="w-5 h-5 text-blue-600" />
                 Required Documents
               </h3>
               <p className="text-sm mb-4 text-slate-600">
                 Document requirements vary significantly by visa type and your nationality.
               </p>
               <ul className="text-sm space-y-2 list-disc pl-4 text-slate-700">
                 <li>Original passport (6+ months validity)</li>
                 <li>2 recent passport-size photos</li>
                 <li>Printed application form</li>
                 <li>Supporting docs (invitation letters, bank statements, etc.)</li>
               </ul>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
