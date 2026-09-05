"use client";

import { PlayCircle, FileText, MessageCircle, PhoneCall, Mail } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="min-h-screen py-12 relative z-10">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-12 bg-white px-8 py-6 rounded-2xl max-w-xl mx-auto shadow-md border border-slate-200">
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-3">Help &amp; Tutorials</h1>
          <p className="text-slate-600 text-sm md:text-base">Learn how to complete your visa application correctly with our step-by-step guides.</p>
        </div>

        {/* Video Tutorials Section */}
        <section className="mb-16">
          <div className="inline-flex items-center gap-2 bg-white px-5 py-2 rounded-xl shadow-sm border border-slate-200 mb-6">
            <h2 className="text-2xl font-bold text-navy flex items-center gap-2">
              <PlayCircle className="w-6 h-6 text-saffron" /> Video Tutorials
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/35npVaFGHMY?rel=0"
                  title="How to fill the eVisa Application Form"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-navy mb-2">How to fill the eVisa Application Form</h3>
                <p className="text-sm text-slate-600 mb-3">A complete walkthrough of the eVisa application process, from choosing your category to payment.</p>
                <a
                  href="https://www.youtube.com/watch?v=35npVaFGHMY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-saffron hover:text-saffron-600 hover:underline transition-colors"
                >
                  <PlayCircle className="w-4 h-4" /> Watch on YouTube ↗
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/ZRvb97ZRFX4?rel=0"
                  title="Uploading Documents Correctly"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-navy mb-2">Uploading Documents Correctly</h3>
                <p className="text-sm text-slate-600 mb-3">Learn how to resize and upload your passport scan and photograph without errors.</p>
                <a
                  href="https://www.youtube.com/watch?v=ZRvb97ZRFX4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-saffron hover:text-saffron-600 hover:underline transition-colors"
                >
                  <PlayCircle className="w-4 h-4" /> Watch on YouTube ↗
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* Step by Step Guides */}
        <section className="mb-16">
          <div className="inline-flex items-center gap-2 bg-white px-5 py-2 rounded-xl shadow-sm border border-slate-200 mb-6">
            <h2 className="text-2xl font-bold text-navy flex items-center gap-2">
              <FileText className="w-6 h-6 text-emerald-500" /> Step-by-Step Guides
            </h2>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md border border-slate-200 space-y-6">
            <div className="flex gap-4 items-start group hover:bg-blue-50 p-4 rounded-xl transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">1</div>
              <div>
                <h4 className="font-bold text-slate-800 group-hover:text-navy">Check Eligibility &amp; Select Visa Type</h4>
                <p className="text-sm text-slate-600 mt-1">Make sure your passport country is eligible. Select the visa category that matches your purpose of visit exactly.</p>
                <a href="/visa-information" className="inline-block mt-2 text-xs font-semibold text-blue-600 hover:underline">→ View Visa Types</a>
              </div>
            </div>
            <div className="flex gap-4 items-start group hover:bg-saffron/5 p-4 rounded-xl transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold flex-shrink-0 group-hover:bg-saffron group-hover:text-white transition-colors">2</div>
              <div>
                <h4 className="font-bold text-slate-800 group-hover:text-navy">Fill Application Details</h4>
                <p className="text-sm text-slate-600 mt-1">Enter your details EXACTLY as they appear on your passport. A single typo can lead to denial of boarding at the airport.</p>
                <a href="/apply/type-selection" className="inline-block mt-2 text-xs font-semibold text-saffron hover:underline">→ Start Application</a>
              </div>
            </div>
            <div className="flex gap-4 items-start group hover:bg-emerald-50 p-4 rounded-xl transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">3</div>
              <div>
                <h4 className="font-bold text-slate-800 group-hover:text-navy">Upload Documents</h4>
                <p className="text-sm text-slate-600 mt-1">Passport scan must be in PDF format (10KB–300KB). Photo must be in JPEG format (10KB–1MB) with a white background.</p>
                <a href="/evisa#categories" className="inline-block mt-2 text-xs font-semibold text-emerald-600 hover:underline">→ See Document Requirements</a>
              </div>
            </div>
            <div className="flex gap-4 items-start group hover:bg-purple-50 p-4 rounded-xl transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold flex-shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">4</div>
              <div>
                <h4 className="font-bold text-slate-800 group-hover:text-navy">Pay Securely &amp; Track Status</h4>
                <p className="text-sm text-slate-600 mt-1">Pay via authorized government payment gateways. After submission, use your Application ID to track your visa status.</p>
                <a href="/status" className="inline-block mt-2 text-xs font-semibold text-purple-600 hover:underline">→ Check Status</a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-8">
          <div className="inline-flex items-center gap-2 bg-white px-5 py-2 rounded-xl shadow-sm border border-slate-200 mb-6">
            <h2 className="text-2xl font-bold text-navy flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-blue-500" /> Contact &amp; Support
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/contact" className="bg-white p-6 rounded-xl shadow-md border border-slate-200 hover:border-navy hover:shadow-lg transition-all text-center group">
              <MessageCircle className="w-8 h-8 text-navy mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold text-navy">Contact Us</h4>
              <p className="text-xs text-slate-500 mt-1">Send a query to our support team</p>
            </a>
            <a href="tel:+911124300666" className="bg-white p-6 rounded-xl shadow-md border border-slate-200 hover:border-saffron hover:shadow-lg transition-all text-center group">
              <PhoneCall className="w-8 h-8 text-saffron mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold text-navy">Helpline</h4>
              <p className="text-xs text-slate-500 mt-1">+91-11-24300666</p>
            </a>
            <a href="mailto:indiatvoa@gov.in" className="bg-white p-6 rounded-xl shadow-md border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all text-center group">
              <Mail className="w-8 h-8 text-emerald-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold text-navy">Email Support</h4>
              <p className="text-xs text-slate-500 mt-1">indiatvoa@gov.in</p>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
