"use client";

import { useState } from "react";
import {
  User, Mail, Phone, Globe, Shield, Key,
  CheckCircle, Eye, EyeOff, Save, Lock, AlertCircle
} from "lucide-react";
import { mockProfile } from "@/data/dashboard/profile";

export default function ProfilePage() {
  const [profile, setProfile] = useState(mockProfile);
  const [showPassport, setShowPassport] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form states
  const [phone, setPhone] = useState(profile.phone);
  const [email, setEmail] = useState(profile.email);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-navy tracking-tight">My Profile & Settings</h2>
        <p className="text-sm text-slate-500 mt-1">
          Review your personal information, passport records, and communication settings.
        </p>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-4 flex items-center gap-2 text-sm font-medium shadow-sm animate-fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <div className="w-20 h-20 bg-navy text-white rounded-2xl flex items-center justify-center text-3xl font-extrabold shadow-md flex-shrink-0">
          {profile.fullName.charAt(0)}
        </div>

        <div className="flex-1 text-center sm:text-left space-y-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
            <h3 className="text-xl font-extrabold text-navy">{profile.fullName}</h3>
            <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              Verified Applicant
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Registered on VISALINE Portal since {profile.createdDate} • ID: <strong className="text-slate-700">APPL-2025-8841</strong>
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-slate-600">
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-400" /> {profile.email}</span>
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-400" /> {profile.phone}</span>
            <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-slate-400" /> {profile.nationality}</span>
          </div>
        </div>
      </div>

      {/* Form sections */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Personal Details */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h4 className="text-base font-bold text-navy flex items-center gap-2 border-b border-slate-100 pb-3">
            <User className="w-4 h-4 text-saffron" /> Personal & Contact Details
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-600 block mb-1">Full Name (as in Passport)</label>
              <input
                type="text"
                disabled
                value={profile.fullName}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 font-medium cursor-not-allowed"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Locked to verified passport record</span>
            </div>

            <div>
              <label className="font-semibold text-slate-600 block mb-1">Date of Birth</label>
              <input
                type="text"
                disabled
                value={profile.dateOfBirth}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 font-medium cursor-not-allowed"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-saffron text-slate-800 font-medium"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Contact Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-saffron text-slate-800 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Passport Details */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h4 className="text-base font-bold text-navy flex items-center gap-2 border-b border-slate-100 pb-3">
            <Shield className="w-4 h-4 text-saffron" /> Verified Passport Details
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-600 block mb-1">Nationality</label>
              <input
                type="text"
                disabled
                value={profile.nationality}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 font-medium cursor-not-allowed"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-600 block mb-1">Passport Number</label>
              <div className="relative">
                <input
                  type="text"
                  disabled
                  value={showPassport ? "US9841234" : profile.passportNo}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-mono font-bold pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassport(!showPassport)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassport ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Masked for privacy & security</span>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h4 className="text-base font-bold text-navy flex items-center gap-2 border-b border-slate-100 pb-3">
            <Key className="w-4 h-4 text-saffron" /> Communication & Alerts
          </h4>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800 block">Email Application Updates</span>
                <span className="text-slate-500 text-[11px]">Receive emails on status changes, document requests, and grant notices.</span>
              </div>
              <input
                type="checkbox"
                checked={emailNotifs}
                onChange={(e) => setEmailNotifs(e.target.checked)}
                className="w-4 h-4 accent-saffron rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800 block">SMS Alerts</span>
                <span className="text-slate-500 text-[11px]">Receive critical verification SMS to your registered mobile number.</span>
              </div>
              <input
                type="checkbox"
                checked={smsNotifs}
                onChange={(e) => setSmsNotifs(e.target.checked)}
                className="w-4 h-4 accent-saffron rounded cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-saffron hover:bg-saffron-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all"
          >
            <Save className="w-4 h-4" /> Save Profile Changes
          </button>
        </div>
      </form>
    </div>
  );
}
