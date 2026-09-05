import Link from "next/link";
import {
  Camera, Users, MessageCircle, Video, Briefcase,
  ExternalLink, Shield, Phone, Mail
} from "lucide-react";
import { GOVERNMENT_LINKS } from "@/data/visaData";

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-saffron rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <div>
                <div className="font-bold text-white text-lg">VISALINE</div>
                <div className="text-xs text-slate-400">Government of India</div>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              The authorized portal for visa applications to India. Managed by the Bureau of Immigration, Ministry of Home Affairs.
            </p>
            <div className="flex gap-3">
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
                  className="w-8 h-8 bg-white/10 hover:bg-saffron rounded-lg flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Visa Services */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Visa Services</h3>
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
                    className="text-slate-400 hover:text-saffron text-sm transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 bg-saffron rounded-full flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Information</h3>
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
                    className="text-slate-400 hover:text-saffron text-sm transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 bg-saffron rounded-full flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Government Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Official Links</h3>
            <ul className="space-y-2.5">
              {GOVERNMENT_LINKS.slice(0, 7).map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-saffron text-sm transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 bg-emerald-500 rounded-full flex-shrink-0" />
                    {link.name}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Security notice */}
        <div className="border border-amber-500/30 bg-amber-500/10 rounded-xl p-4 mb-8">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-300 text-sm font-medium mb-1">Official Government Advisory</p>
              <p className="text-slate-400 text-xs leading-relaxed">
                The Government of India does NOT authorize any agent or intermediary to charge fees for emergency, express visa, eVisas, or e-Arrival card facilitation. 
                Apply only through official government portals. Beware of fraudulent websites and unauthorized agents.
              </p>
            </div>
          </div>
        </div>

        {/* Helpdesk strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 pb-8 border-b border-white/10">
          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-4">
            <Phone className="w-5 h-5 text-saffron flex-shrink-0" />
            <div>
              <div className="text-xs text-slate-400 mb-0.5">Payment Helpdesk — SBI ePay</div>
              <div className="text-sm font-medium text-white">+91-022-65361671 (24×7)</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-4">
            <Phone className="w-5 h-5 text-saffron flex-shrink-0" />
            <div>
              <div className="text-xs text-slate-400 mb-0.5">Payment Helpdesk — Axis Bank</div>
              <div className="text-sm font-medium text-white">1800-419-0073 (24×7 Toll-free)</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div>
            Content managed by <span className="text-slate-300">Bureau of Immigration, Ministry of Home Affairs</span> · 
            Designed &amp; Developed by <span className="text-slate-300">NIC</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy</Link>
            <Link href="/privacy#terms" className="hover:text-slate-300 transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">Contact</Link>
            <a href="https://boi.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors flex items-center gap-1">
              boi.gov.in <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
