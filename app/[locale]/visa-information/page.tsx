"use client";

import { FileText, CheckCircle, Info } from "lucide-react";

export default function VisaInformationPage() {
  return (
    <div className="min-h-screen py-16 relative z-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12 bg-white px-8 py-6 rounded-2xl max-w-xl mx-auto shadow-md border border-slate-200">
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-3">Visa Information</h1>
          <p className="text-slate-600 text-sm md:text-base">General guidelines, eligibility, and document requirements for traveling to India.</p>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-200">
            <h2 className="text-2xl font-bold text-navy mb-4 flex items-center gap-2">
              <Info className="w-6 h-6 text-blue-500" /> General Guidelines
            </h2>
            <div className="space-y-4 text-slate-600">
              <p>All foreign nationals entering India are required to possess a valid international travel document in the form of a national passport with a valid visa from an Indian Mission/Post or eVisa.</p>
              <p>All Individual visa seekers are requested to apply for the Indian Visa through online application link.</p>
              <ul className="list-disc pl-5 space-y-2 mt-4">
                <li>Your passport must have at least six months validity from the date of arrival in India.</li>
                <li>The passport should have at least two blank pages for stamping by the Immigration Officer.</li>
                <li>Applicants must travel on the passport which they have applied for the eVisa on.</li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-200">
            <h2 className="text-2xl font-bold text-navy mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-saffron" /> Photo Requirements
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700">Format: JPEG</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700">Size: Minimum 10 KB, Maximum 1 MB</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700">Dimensions: Minimum 350x350 pixels</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700">Recent front facing photograph with white background</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700">No borders around the image</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
