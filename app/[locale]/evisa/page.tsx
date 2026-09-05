"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight, Search, CheckCircle, Info, ChevronDown, ChevronUp, AlertCircle, Globe
} from "lucide-react";
import { EVISA_CATEGORIES, FAQ_CATEGORIES } from "@/data/visaData";
import { ALL_COUNTRIES } from "@/data/countries";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

export default function EVisaPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const t = useTranslations('EVisa');

  const filteredCountries = ALL_COUNTRIES.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen py-12 relative">
      
      {/* Hero */}
      <section className="bg-navy py-16 text-white text-center relative z-10 shadow-md rounded-2xl max-w-7xl mx-auto mb-8 px-4">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
          <p className="text-blue-200 text-lg mb-8">
            {t('description')}
          </p>
          <Link
            href="/apply/type-selection?type=evisa"
            className="inline-flex items-center gap-2 bg-saffron hover:bg-saffron-600 px-8 py-3.5 rounded-xl font-semibold transition-all shadow-lg hover:-translate-y-1"
          >
            Start eVisa Application <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        
        {/* Left Col - Categories & Info */}
        <div className="lg:col-span-2 space-y-12">
          
          <section id="categories">
            <div className="inline-block bg-white px-5 py-2 rounded-xl shadow-sm border border-slate-200 mb-6">
              <h2 className="text-2xl font-bold text-navy">eVisa Categories</h2>
            </div>
            <div className="space-y-4">
              {EVISA_CATEGORIES.map((cat) => (
                <div key={cat.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-md">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-slate-800">{cat.title} ({cat.code})</h3>
                    <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {cat.maxStay}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">{cat.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <span className="text-slate-500 block mb-1">Durations:</span>
                      <ul className="list-disc pl-4 text-slate-700">
                        {cat.durations.map(d => <li key={d.code}>{d.label}</li>)}
                      </ul>
                    </div>
                    <div>
                      <span className="text-slate-500 block mb-1">Required Docs:</span>
                      <ul className="list-disc pl-4 text-slate-700">
                        {cat.documents.map((d, i) => <li key={i}>{d}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="faqs">
            <div className="inline-block bg-white px-5 py-2 rounded-xl shadow-sm border border-slate-200 mb-6">
              <h2 className="text-2xl font-bold text-navy">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {FAQ_CATEGORIES.find(c => c.id === 'evisa')?.items.map((faq) => (
                <div key={faq.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <button 
                    className="w-full px-6 py-4 text-left font-semibold text-slate-800 flex justify-between items-center"
                    onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                  >
                    {faq.question}
                    {activeFaq === faq.id ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </button>
                  <AnimatePresence>
                    {activeFaq === faq.id && (
                      <motion.div 
                        initial={{ height: 0 }} 
                        animate={{ height: "auto" }} 
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4 text-slate-600 text-sm">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Col - Eligibility & Help */}
        <div className="space-y-8">
          
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-md sticky top-24">
            <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-saffron" />
              Eligible Countries
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Search to see if your nationality is eligible for an eVisa.
            </p>
            
            <div className="relative mb-4">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search country..." 
                className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="max-h-64 overflow-y-auto border border-slate-100 rounded-lg p-2 space-y-1">
              {filteredCountries.map(c => (
                <div key={c.code} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded text-sm">
                  <span className="flex items-center gap-2">
                    <span className="text-lg">{c.flag}</span>
                    <span className="font-medium text-slate-700">{c.name}</span>
                  </span>
                  {c.eligible ? (
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-400" />
                  )}
                </div>
              ))}
              {filteredCountries.length === 0 && (
                <div className="text-center text-slate-500 text-sm py-4">No countries found</div>
              )}
            </div>
            
            <div className="mt-6 p-4 bg-white border border-blue-200 rounded-lg text-sm text-blue-900 shadow-sm">
              <h4 className="font-semibold mb-1 flex items-center gap-1"><Info className="w-4 h-4" /> Need Help?</h4>
              <p className="mb-2">For eVisa assistance, contact the official helpdesk:</p>
              <p className="font-semibold">+91-11-24300666</p>
              <p className="text-blue-600">indiatvoa@gov.in</p>
            </div>
          </div>
          
        </div>
        
      </div>
    </div>
  );
}
