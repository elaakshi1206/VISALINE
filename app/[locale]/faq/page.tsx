"use client";

import { FAQ_CATEGORIES } from "@/data/visaData";

export default function FAQPage() {
  return (
    <div className="min-h-screen py-12 relative z-10">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 bg-white px-8 py-6 rounded-2xl max-w-xl mx-auto shadow-md border border-slate-200">
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-3">Frequently Asked Questions</h1>
          <p className="text-slate-600 text-sm md:text-base">Find answers to common questions about Indian Visas.</p>
        </div>

        <div className="space-y-12">
          {FAQ_CATEGORIES.map(category => (
            <div key={category.id}>
              <div className="inline-block bg-white px-5 py-2 rounded-xl shadow-sm border border-slate-200 mb-6">
                <h2 className="text-2xl font-bold text-navy">{category.title}</h2>
              </div>
              <div className="space-y-4">
                {category.items.map(faq => (
                  <div key={faq.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-md">
                    <h3 className="font-bold text-slate-800 mb-2">{faq.question}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
