import Link from "next/link";
import {
  Camera, Users, MessageCircle, Video, Briefcase,
  ExternalLink, Shield, Phone, Mail
} from "lucide-react";
import { GOVERNMENT_LINKS } from "@/data/visaData";

export default function Footer() {
  return (
    <footer className="relative z-20 bg-[#0A182E] text-white border-t border-slate-800 shadow-2xl">
      {/* Subtle top accent line representing Indian tricolor colors subtly */}
      <div className="h-1 w-full bg-gradient-to-r from-saffron via-white to-emerald" />

      {/* Main footer container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-saffron rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                <span className="text-white font-extrabold text-xl">V</span>
              </div>
              <div>
                <div className="font-extrabold text-white text-lg sm:text-xl tracking-tight">VISALINE</div>
                <div className="text-xs font-semibold text-slate-300 tracking-wider">Government of India</div>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-5 max-w-sm">
              The authorized portal for visa applications to India. Managed by the Bureau of Immigration, Ministry of Home Affairs.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {[
                { icon: Camera, href: "https://www.instagram.com/bureauofimmigrationindia", label: "Instagram" },
                { icon: Users, href: "https://www.facebook.com/profile.php?id=61584135957737", label: "Facebook" },
                { icon: MessageCircle, href: "https://x.com/BOIndiaOfficial", label: "X (Twitter)" },
                { icon: Video, href: "https://youtube.com/@bureauofimmigrationindia", label: "YouTube" },
                { icon: Briefcase, href: "https://linkedin.com/company/bureau-of-immigration-india", label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 bg-white/10 hover:bg-saffron hover:text-white text-slate-200 rounded-lg flex items-center justify-center transition-all duration-200 border border-white/10 shadow-sm"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Visa Services */}
          <div>
            <h3 className="font-bold text-white mb-4 text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-saffron inline-block"></span>
              Visa Services
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "Apply for eVisa", href: "/apply/type-selection" },
                { label: "eVisa Information", href: "/evisa" },
                { label: "Regular Visa", href: "/regular-visa" },
                { label: "e-Arrival Card", href: "/e-arrival-card" },
                { label: "Visa on Arrival", href: "/visa-on-arrival" },
                { label: "Check Application Status", href: "/status" },
                { label: "Applicant Dashboard", href: "/dashboard" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-saffron text-sm transition-colors flex items-center gap-2 py-0.5"
                  >
                    <span className="w-1.5 h-1.5 bg-saffron/70 rounded-full flex-shrink-0" />
                    <span className="hover:translate-x-0.5 transition-transform">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-bold text-white mb-4 text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400 inline-block"></span>
              Information
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "Visa Information", href: "/visa-information" },
                { label: "FAQs", href: "/faq" },
                { label: "Important Advisories", href: "/advisories" },
                { label: "Help & Support", href: "/help" },
                { label: "Contact Us", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Use", href: "/privacy#terms" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-saffron text-sm transition-colors flex items-center gap-2 py-0.5"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-400/70 rounded-full flex-shrink-0" />
                    <span className="hover:translate-x-0.5 transition-transform">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Government Links */}
          <div>
            <h3 className="font-bold text-white mb-4 text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
              Official Links
            </h3>
            <ul className="space-y-2.5">
              {GOVERNMENT_LINKS.slice(0, 7).map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-saffron text-sm transition-colors flex items-center gap-2 py-0.5 group"
                  >
                    <span className="w-1.5 h-1.5 bg-emerald-400/70 rounded-full flex-shrink-0" />
                    <span className="hover:translate-x-0.5 transition-transform flex items-center gap-1.5">
                      {link.name}
                      <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Security notice */}
        <div className="border border-amber-500/40 bg-[#162235] rounded-2xl p-4 sm:p-5 mb-8 shadow-lg">
          <div className="flex items-start gap-3.5">
            <Shield className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-300 text-sm font-bold mb-1">Official Government Advisory</p>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                The Government of India does NOT authorize any agent or intermediary to charge fees for emergency, express visa, eVisas, or e-Arrival card facilitation. 
                Apply only through official government portals. Beware of fraudulent websites and unauthorized agents.
              </p>
            </div>
          </div>
        </div>

        {/* Helpdesk strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 pb-8 border-b border-slate-700/80">
          <div className="flex items-center gap-3.5 bg-[#10223D] border border-slate-700/60 rounded-xl p-4 shadow-sm hover:border-slate-600 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-saffron/15 border border-saffron/30 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-saffron" />
            </div>
            <div className="min-w-0">
              <div className="text-xs text-slate-300 mb-0.5 font-medium truncate">Payment Helpdesk — SBI ePay</div>
              <div className="text-sm sm:text-base font-bold text-white tracking-wide">+91-022-65361671 <span className="text-xs text-slate-400 font-normal">(24×7)</span></div>
            </div>
          </div>
          <div className="flex items-center gap-3.5 bg-[#10223D] border border-slate-700/60 rounded-xl p-4 shadow-sm hover:border-slate-600 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-saffron/15 border border-saffron/30 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-saffron" />
            </div>
            <div className="min-w-0">
              <div className="text-xs text-slate-300 mb-0.5 font-medium truncate">Payment Helpdesk — Axis Bank</div>
              <div className="text-sm sm:text-base font-bold text-white tracking-wide">1800-419-0073 <span className="text-xs text-slate-400 font-normal">(24×7 Toll-free)</span></div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-400 text-center md:text-left">
          <div className="leading-relaxed">
            Content managed by <span className="text-slate-200 font-medium">Bureau of Immigration, Ministry of Home Affairs</span> · 
            Designed &amp; Developed by <span className="text-slate-200 font-medium">NIC</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/privacy#terms" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <a 
              href="https://boi.gov.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors inline-flex items-center gap-1 font-medium text-slate-300"
            >
              boi.gov.in <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
