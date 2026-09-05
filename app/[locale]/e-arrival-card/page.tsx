"use client";

import Link from "next/link";
import { ArrowRight, FileText, AlertTriangle, CheckCircle, Clock } from "lucide-react";

export default function EArrivalCardPage() {
  return (
    <div className="min-h-screen py-6 sm:py-12 relative z-10">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header Alert */}
        <div className="bg-emerald-700 text-white p-5 sm:p-8 rounded-2xl shadow-lg mb-8 sm:mb-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 sm:p-12 opacity-10 pointer-events-none">
            <FileText className="w-24 h-24 sm:w-32 sm:h-32" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 relative z-10">e-Arrival Card</h1>
          <p className="text-emerald-100 text-sm sm:text-base md:text-lg relative z-10 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Mandatory arrival information form for all foreign nationals and OCI cardholders entering India. 
            Must be submitted within 72 hours before arrival.
          </p>
          <div className="inline-flex flex-col sm:flex-row gap-4 relative z-10 w-full sm:w-auto">
            <Link
              href="#apply"
              className="bg-white text-emerald-800 hover:bg-emerald-50 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold transition-all shadow-md text-center"
            >
              Fill e-Arrival Card <ArrowRight className="w-4 h-4 inline ml-2" />
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-md">
            <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Important Notice
            </h2>
            <div className="space-y-4 text-slate-600 text-sm">
              <p>
                <strong className="text-slate-800">The e-Arrival Card is NOT a visa.</strong> It does not grant permission to enter India. You must still possess a valid Indian Visa, eVisa, or OCI card.
              </p>
              <p>
                This form replaces the physical paper arrival cards previously handed out on airplanes. It speeds up immigration clearance at the airport.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-md">
            <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              When to apply?
            </h2>
            <div className="space-y-4 text-slate-600 text-sm">
              <p>
                You can only submit the e-Arrival Card within <strong>72 hours</strong> prior to your expected time of arrival in India.
              </p>
              <p>
                Submitting earlier is not possible as flight and health declarations need to be current.
              </p>
            </div>
          </div>

        </div>

        {/* Process */}
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-md mb-12">
          <h2 className="text-2xl font-bold text-navy mb-6">What you need to fill out</h2>
          
          <div className="space-y-4">
            {[
              "Passport Details (Number, Expiry, Nationality)",
              "Visa Details (eVisa ETA number, Regular Visa number, or OCI number)",
              "Flight Details (Airline, Flight Number, Port of Origin)",
              "Address in India (Hotel name or residential address)",
              "Contact Information (Email and Phone number)",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-slate-800 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Mock form trigger */}
        <div id="apply" className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md text-center max-w-xl mx-auto mb-12">
           <p className="text-slate-600 mb-4 font-medium">Ready to submit your arrival information?</p>
           <button className="bg-navy hover:bg-navy-dark text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-lg hover:-translate-y-0.5 cursor-pointer">
             Start e-Arrival Card (Mock)
           </button>
        </div>

      </div>
    </div>
  );
}
