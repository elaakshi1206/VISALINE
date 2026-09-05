"use client";

import { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, CheckCircle, Save, HelpCircle, AlertCircle, UploadCloud, FileText } from "lucide-react";
import { ALL_COUNTRIES } from "@/data/countries";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  "Visa Type & Eligibility",
  "Applicant Details",
  "Passport Details",
  "Document Upload",
  "Review & Payment"
];

export default function ApplicationFormPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    passportType: "",
    nationality: "",
    portOfArrival: "",
    dob: "",
    email: "",
    passportNo: "",
    givenName: "",
    surname: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Simulate loading from local storage
  useEffect(() => {
    const saved = localStorage.getItem("visa_draft");
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(JSON.parse(saved));
      setLastSaved("Just now (restored)");
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("visa_draft", JSON.stringify(formData));
    const now = new Date();
    setLastSaved(`Today at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
  };

  const validateStep0 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.passportType) newErrors.passportType = "Please select your passport type.";
    if (!formData.nationality) newErrors.nationality = "Please select your nationality as printed on your passport.";
    if (!formData.email) newErrors.email = "An email address is required to send your ETA.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.passportNo || formData.passportNo.length < 5) {
      newErrors.passportNo = "Passport number appears to be incorrect. Please enter it exactly as shown on your passport.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = true;
    if (currentStep === 0) isValid = validateStep0();
    if (currentStep === 2) isValid = validateStep2();

    if (isValid) {
      handleSave();
      setCurrentStep(s => Math.min(STEPS.length - 1, s + 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen py-12 relative z-10">
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-md">
            <h1 className="text-3xl font-bold text-navy mb-2">eVisa Application Form</h1>
            <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
              {lastSaved ? (
                <span className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  <Save className="w-3.5 h-3.5" /> Saved: {lastSaved}
                </span>
              ) : (
                "Please fill out all mandatory fields accurately."
              )}
            </div>
          </div>
          <div className="bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-md flex flex-col items-end justify-center">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">Application ID</p>
            <p className="text-xl font-mono font-bold text-navy tracking-tight">ETA-847293</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Progress Tracker */}
          <div className="lg:w-1/4">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 sticky top-24">
              <h3 className="font-bold text-slate-800 mb-6 text-sm uppercase tracking-wider flex items-center justify-between">
                Progress
                <span className="text-navy">{currentStep + 1} of {STEPS.length}</span>
              </h3>
              <div className="space-y-0 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-100">
                {STEPS.map((step, index) => {
                  const isActive = index === currentStep;
                  const isCompleted = index < currentStep;
                  return (
                    <div key={index} className="relative flex items-center gap-4 py-3 group cursor-pointer" onClick={() => isCompleted && setCurrentStep(index)}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 z-10 transition-colors ${
                        isActive ? "bg-navy text-white ring-4 ring-blue-50" :
                        isCompleted ? "bg-emerald-500 text-white hover:bg-emerald-600" : "bg-slate-100 text-slate-400 border-2 border-white"
                      }`}>
                        {isCompleted ? <CheckCircle className="w-3.5 h-3.5" /> : index + 1}
                      </div>
                      <span className={`text-sm font-semibold transition-colors ${isActive ? "text-navy" : isCompleted ? "text-slate-700 group-hover:text-emerald-600" : "text-slate-400"}`}>
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Form Area */}
          <div className="lg:w-3/4">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentStep}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 mb-6"
              >
                
                <div className="border-b border-slate-100 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h2 className="text-2xl font-bold text-navy">Step {currentStep + 1}: {STEPS[currentStep]}</h2>
                  <button onClick={handleSave} className="flex items-center justify-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors">
                    <Save className="w-4 h-4" /> Save Draft
                  </button>
                </div>

                {/* Step 0: Eligibility */}
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Passport Type <span className="text-red-500">*</span>
                        </label>
                        <select 
                          value={formData.passportType}
                          onChange={(e) => setFormData({...formData, passportType: e.target.value})}
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:outline-none transition-all ${errors.passportType ? 'border-red-300 focus:border-red-500 focus:ring-red-50' : 'border-slate-200 focus:border-navy focus:ring-blue-50'} bg-white text-slate-700`}
                        >
                          <option value="">Select Passport Type</option>
                          <option value="ordinary">Ordinary Passport</option>
                          <option value="diplomatic">Diplomatic Passport</option>
                          <option value="official">Official Passport</option>
                        </select>
                        {errors.passportType && <p className="text-red-500 text-xs font-semibold mt-1.5 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.passportType}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Nationality/Region <span className="text-red-500">*</span>
                        </label>
                        <select 
                          value={formData.nationality}
                          onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:outline-none transition-all ${errors.nationality ? 'border-red-300 focus:border-red-500 focus:ring-red-50' : 'border-slate-200 focus:border-navy focus:ring-blue-50'} bg-white text-slate-700`}
                        >
                          <option value="">Select Country</option>
                          {ALL_COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
                        </select>
                        {errors.nationality && <p className="text-red-500 text-xs font-semibold mt-1.5 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.nationality}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Date of Birth <span className="text-red-500">*</span>
                        </label>
                        <input type="date" className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-navy focus:outline-none text-slate-700 transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Email ID <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="email" 
                          placeholder="john.doe@example.com" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:outline-none transition-all ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-50' : 'border-slate-200 focus:border-navy focus:ring-blue-50'} bg-white text-slate-700`}
                        />
                        {errors.email && <p className="text-red-500 text-xs font-semibold mt-1.5 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.email}</p>}
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3 mt-8">
                      <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-amber-900 mb-1">Important Instruction</h4>
                        <p className="text-sm text-amber-800 leading-relaxed">
                          Your ETA will be sent to the email address provided above. Please ensure it is accurate and accessible. A single typo can lead to denial of boarding at the airport.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Passport Details (Showcasing contextual validation) */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Passport Number <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        value={formData.passportNo}
                        onChange={(e) => setFormData({...formData, passportNo: e.target.value})}
                        className={`w-full max-w-md px-4 py-3 border-2 rounded-xl focus:ring-4 focus:outline-none transition-all uppercase ${errors.passportNo ? 'border-red-300 focus:border-red-500 focus:ring-red-50' : 'border-slate-200 focus:border-navy focus:ring-blue-50'} bg-white text-slate-700`}
                      />
                      {errors.passportNo && (
                        <div className="bg-red-50 border border-red-100 rounded-lg p-3 mt-3 max-w-md">
                          <p className="text-red-600 text-sm font-medium flex items-start gap-2">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            {errors.passportNo}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 3: Document Upload */}
                {currentStep === 3 && (
                  <div className="space-y-8">
                    
                    <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:bg-slate-50 hover:border-navy transition-colors group cursor-pointer">
                      <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <UploadCloud className="w-8 h-8" />
                      </div>
                      <h3 className="text-lg font-bold text-navy mb-2">Upload Passport Scan</h3>
                      <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
                        PDF format only. Minimum 10KB, Maximum 300KB.
                      </p>
                      <button className="bg-white border-2 border-slate-200 text-slate-700 font-bold px-6 py-2.5 rounded-xl group-hover:border-navy group-hover:text-navy transition-colors">
                        Browse Files
                      </button>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                      <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-slate-500" /> Passport Document Requirements
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                          <p className="text-sm text-slate-600">Must show biographical page clearly</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                          <p className="text-sm text-slate-600">No glare or cut-off edges</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                          <p className="text-sm text-slate-600">Must be a valid passport (not expired)</p>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {/* Mockup for other steps */}
                {(currentStep === 1 || currentStep === 4) && (
                  <div className="py-20 text-center">
                    <div className="w-16 h-16 bg-slate-50 text-slate-300 border-2 border-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FileText className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-700 mb-2">{STEPS[currentStep]} Details</h3>
                    <p className="text-slate-500 mb-6">This section of the form is currently a mockup for the UX prototype.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Bottom Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button 
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-slate-600 bg-white border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              
              <button 
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-navy shadow-[0_8px_30px_rgb(15,23,42,0.2)] hover:-translate-y-0.5 transition-all hover:bg-navy-dark"
              >
                {currentStep === STEPS.length - 1 ? "Submit Application" : "Save & Continue"}
                {currentStep < STEPS.length - 1 && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
