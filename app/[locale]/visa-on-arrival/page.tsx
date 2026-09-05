"use client";

import { Plane, CheckCircle } from "lucide-react";

export default function VisaOnArrivalPage() {
  return (
    <div className="min-h-screen py-12 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-purple-800 text-white p-8 rounded-2xl shadow-lg mb-12 relative overflow-hidden">
          <Plane className="absolute top-0 right-0 w-32 h-32 opacity-10 m-8" />
          <h1 className="text-3xl font-bold mb-4 relative z-10">Visa on Arrival (VoA)</h1>
          <p className="text-purple-100 text-lg relative z-10 max-w-2xl">
            Visa on Arrival facility is available for nationals of Japan, South Korea, and UAE (only for such UAE nationals who had earlier obtained e-Visa or Regular Visa for India).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
            <h2 className="text-xl font-bold text-navy mb-4">Eligible Airports</h2>
            <ul className="space-y-3">
              {['Delhi', 'Mumbai', 'Chennai', 'Kolkata', 'Bengaluru', 'Hyderabad'].map(airport => (
                <li key={airport} className="flex items-center gap-2 text-slate-800 font-medium">
                  <CheckCircle className="w-5 h-5 text-emerald-500" /> {airport}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
            <h2 className="text-xl font-bold text-navy mb-4">Key Information</h2>
            <div className="space-y-4 text-sm text-slate-700">
              <p><strong>Validity:</strong> Up to 60 days with Double Entry.</p>
              <p><strong>Purpose:</strong> Business, Tourism, Conference, and Medical.</p>
              <p><strong>Fee:</strong> Rs. 2000/- (or equivalent in foreign currency) per passenger.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
