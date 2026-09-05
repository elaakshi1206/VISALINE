"use client";

import { useState } from "react";
import {
  HelpCircle, ChevronDown, Phone, Mail, MessageSquare,
  Clock, Shield, Send, CheckCircle
} from "lucide-react";
import Image from "next/image";

const faqs = [
  {
    q: "How long does it take for my e-Visa to be approved?",
    a: "Standard e-Tourist and e-Business visas are typically processed within 72 hours (3 business days). However, during peak travel seasons or if additional documentation is required, it may take up to 4 to 5 business days."
  },
  {
    q: "What should I do if my application status says 'Action Required'?",
    a: "Check your 'Document Center' or the notification in your dashboard. It usually means an uploaded document was unclear, expired, or an additional invitation letter is required. Upload the requested document to resume processing immediately."
  },
  {
    q: "Can I make changes to my application after submission?",
    a: "Once submitted and paid, basic biographical details (name, passport number, nationality) cannot be directly edited online. For corrections, please submit a query using the support form below with your Application Number."
  },
  {
    q: "How do I download my approved Electronic Visa (ETA)?",
    a: "Once approved, your Electronic Travel Authorization (ETA) PDF will be available in 'My Applications' under your application details with a prominent 'Download e-Visa' button. You will also receive a copy via email."
  },
  {
    q: "What are the photo and passport upload specifications?",
    a: "Passport Bio page must be in PDF format between 10 KB and 300 KB. The applicant photograph must be in JPEG format (min 10 KB, max 1 MB), square, with a pure white background and neutral facial expression."
  },
];

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [ticketSent, setTicketSent] = useState(false);
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("application_status");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSent(true);
    setSubject("");
    setMessage("");
    setTimeout(() => setTicketSent(false), 5000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-navy tracking-tight">Help & Applicant Support</h2>
        <p className="text-sm text-slate-500 mt-1">
          Find answers to common questions, check processing guidelines, or get in touch with visa officers.
        </p>
      </div>

      {/* Quick Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-saffron flex items-center justify-center flex-shrink-0">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-navy">24x7 Visa Helpline</h4>
            <p className="text-xs text-slate-500 mt-0.5">+91-11-24300666</p>
            <span className="inline-block text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded mt-1.5">
              Toll-Free in India
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-navy">Email Support</h4>
            <p className="text-xs text-slate-500 mt-0.5">indian-evisa@gov.in</p>
            <span className="inline-block text-[10px] text-slate-500 font-medium mt-1.5">
              Response within 24 hours
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-navy">Support Hours</h4>
            <p className="text-xs text-slate-500 mt-0.5">All Days (24 Hours)</p>
            <span className="inline-block text-[10px] text-slate-500 font-medium mt-1.5">
              Indian Standard Time (IST)
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* FAQs (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-lg font-bold text-navy flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-saffron" /> Frequently Asked Questions
          </h3>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-4.5 flex items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors"
                  >
                    <span className="text-sm font-bold text-navy leading-snug">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform ${isOpen ? "rotate-180 text-saffron" : ""}`} />
                  </button>

                  {isOpen && (
                    <div className="px-4.5 pb-4.5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/30">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Form (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-base font-bold text-navy flex items-center gap-2 mb-1">
              <MessageSquare className="w-4 h-4 text-saffron" /> Submit a Query
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Have an issue with your application? Send a ticket to our visa support desk.
            </p>

            {ticketSent && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-3 mb-4 flex items-center gap-2 text-xs font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Ticket #TK-9821 submitted! A response will be sent to your email.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Query Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-saffron text-slate-800"
                >
                  <option value="application_status">Application Status Inquiry</option>
                  <option value="document_correction">Document Upload Issue</option>
                  <option value="payment_query">Payment / Fee Receipt</option>
                  <option value="general">General Visa Guidelines</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Question regarding document rejection"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-saffron text-slate-800"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Detailed Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your query in detail. Include application number if applicable..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-saffron text-slate-800 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-navy hover:bg-navy-light text-white rounded-xl text-xs font-semibold shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" /> Submit Support Ticket
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
