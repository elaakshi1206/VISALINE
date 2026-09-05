"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ChevronDown, Globe, FileText, Plane, CreditCard,
  HelpCircle, Bell, Search, ArrowRight, Shield, Smartphone
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname as useIntlPathname } from "@/i18n/routing";

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Visa",
    href: "/visa-information",
    dropdown: [
      {
        group: "Visa Types",
        items: [
          { label: "Visa Information", href: "/visa-information", icon: "FileText", desc: "Learn about India visa types" },
          { label: "Regular / Paper Visa", href: "/regular-visa", icon: "Globe", desc: "Apply at Indian Mission/Post" },
          { label: "Visa on Arrival", href: "/visa-on-arrival", icon: "Plane", desc: "For Japan, South Korea & UAE" },
        ],
      },
    ],
  },
  {
    label: "eVisa",
    href: "/evisa",
    highlight: true,
    dropdown: [
      {
        group: "Electronic Visa",
        items: [
          { label: "eVisa Overview", href: "/evisa", icon: "Smartphone", desc: "Fast online visa application" },
          { label: "eVisa Categories", href: "/evisa#categories", icon: "FileText", desc: "Tourist, Business, Medical & more" },
          { label: "Eligible Countries", href: "/evisa#eligibility", icon: "Globe", desc: "Check if your country qualifies" },
          { label: "Apply for eVisa", href: "/apply/type-selection", icon: "ArrowRight", desc: "Start your application now" },
        ],
      },
    ],
  },
  {
    label: "e-Arrival Card",
    href: "/e-arrival-card",
  },
  {
    label: "Application",
    href: "/apply/type-selection",
    dropdown: [
      {
        group: "Apply & Track",
        items: [
          { label: "New Application", href: "/apply/type-selection", icon: "FileText", desc: "Start a fresh application" },
          { label: "Check Status", href: "/status", icon: "Search", desc: "Track your application" },
          { label: "Continue Application", href: "/apply/form", icon: "ArrowRight", desc: "Resume saved application" },
          { label: "Dashboard", href: "/dashboard", icon: "Shield", desc: "Your applications dashboard" },
        ],
      },
    ],
  },
  {
    label: "Resources",
    href: "/faq",
    dropdown: [
      {
        group: "Information",
        items: [
          { label: "FAQs", href: "/faq", icon: "HelpCircle", desc: "Frequently asked questions" },
          { label: "Important Advisories", href: "/advisories", icon: "Bell", desc: "Official notices & warnings" },
        ],
      },
    ],
  },
  {
    label: "Help",
    href: "/help",
    dropdown: [
      {
        group: "Support",
        items: [
          { label: "Help & Support", href: "/help", icon: "HelpCircle", desc: "Get assistance" },
          { label: "Contact Us", href: "/contact", icon: "Globe", desc: "Reach our team" },
        ],
      },
    ],
  },
];

const languages = [
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪' },
  { code: 'ru', name: 'Russian', native: 'Русский', flag: '🇷🇺' },
  { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵' },
  { code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇦🇪' },
  { code: 'zh', name: 'Chinese', native: '中文', flag: '🇨🇳' },
];

const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText className="w-4 h-4" />,
  Globe: <Globe className="w-4 h-4" />,
  Plane: <Plane className="w-4 h-4" />,
  Smartphone: <Smartphone className="w-4 h-4" />,
  ArrowRight: <ArrowRight className="w-4 h-4" />,
  Search: <Search className="w-4 h-4" />,
  Shield: <Shield className="w-4 h-4" />,
  HelpCircle: <HelpCircle className="w-4 h-4" />,
  Bell: <Bell className="w-4 h-4" />,
  CreditCard: <CreditCard className="w-4 h-4" />,
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const intlRouter = useRouter();
  const intlPathname = useIntlPathname();

  const handleLocaleChange = (newLocale: string) => {
    intlRouter.replace(intlPathname, { locale: newLocale });
    setLangOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMobileOpen(false);
      setActiveDropdown(null);
      setLangOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = languages.find(l => l.code === locale) || languages[0];

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-navy-dark text-white text-xs py-2 overflow-hidden border-b border-white/10">
        <div className="ticker-wrap">
          <div className="ticker-content px-4">
            <span className="mr-16">
              ⚠️ <strong>Advisory:</strong> Government of India does NOT authorize any agent to charge fees for eVisa/e-Arrival Card facilitation. Apply only at official portals.
            </span>
            <span className="mr-16">
              📱 e-Arrival Card: Submit within 72 hours before arrival at <strong>boi.gov.in</strong> or via official &apos;Indian Visa Su-Swagatam&apos; app.
            </span>
            <span className="mr-16">
              ✈️ Visa on Arrival available for nationals of <strong>Japan, South Korea, and UAE</strong> at selected airports.
            </span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <header
        ref={dropdownRef}
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-white/98 backdrop-blur-md shadow-lg border-b border-slate-200/90"
            : "bg-white border-b border-slate-200"
        )}
      >
        <nav className="max-w-[96rem] mx-auto px-3 sm:px-6 lg:px-8 py-1.5 sm:py-2">
          <div className="flex items-center justify-between h-16 sm:h-20 xl:h-24">
            {/* Logo and Branding (Dynamically Scaled) */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3.5 flex-shrink-0 group">
              <div className="flex items-center justify-center bg-white rounded-xl sm:rounded-2xl p-1 sm:p-1.5 shadow-sm sm:shadow-md border border-slate-200/80 group-hover:shadow-lg transition-all group-hover:scale-105 duration-200">
                <img 
                  src="/visaline_logo.jpg" 
                  alt="Visaline Official Logo" 
                  className="h-10 w-10 sm:h-13 sm:w-13 md:h-15 md:w-15 xl:h-16 xl:w-16 object-cover rounded-lg sm:rounded-xl" 
                />
              </div>
              <div className="ml-0.5 sm:ml-1">
                <div className="font-black text-navy text-xl sm:text-2xl md:text-3xl xl:text-[32px] leading-tight tracking-tight group-hover:text-saffron-600 transition-colors">
                  VISALINE
                </div>
                <div className="text-[9px] xs:text-[10px] sm:text-[11px] md:text-xs uppercase font-bold text-slate-600 tracking-wider flex items-center gap-1 sm:gap-1.5 mt-0.5">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
                    alt="National Emblem of India" 
                    className="h-3 sm:h-4 w-auto opacity-90 shrink-0" 
                  />
                  <span className="text-slate-700 font-extrabold whitespace-nowrap">Government of India</span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Features (Font size increased & strictly in one straight line) */}
            <div className="hidden xl:flex items-center gap-1.5 2xl:gap-3 flex-nowrap shrink-0">
              {navItems.map((item) => {
                const navKey = item.label.toLowerCase().replace(/ /g, '').replace('-', '');
                const labelText = t.has(navKey) ? t(navKey) : item.label;
                const isActive = intlPathname === item.href;

                return (
                  <div
                    key={item.label}
                    className="relative flex-shrink-0"
                    onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.dropdown ? (
                      <button
                        className={cn(
                          "flex items-center gap-1.5 px-3.5 2xl:px-4 py-2.5 rounded-xl text-[15px] 2xl:text-base font-bold whitespace-nowrap transition-all duration-200 cursor-pointer",
                          activeDropdown === item.label
                            ? "text-saffron-600 bg-saffron/10 shadow-sm"
                            : isActive
                              ? "text-saffron-600 bg-saffron/5"
                              : "text-slate-700 hover:text-navy hover:bg-slate-100/70",
                          item.highlight && activeDropdown !== item.label && !isActive && "text-saffron-600 font-extrabold"
                        )}
                        aria-expanded={activeDropdown === item.label}
                        aria-haspopup="true"
                      >
                        <span className="whitespace-nowrap leading-none">{labelText}</span>
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 transition-transform duration-200 shrink-0",
                            activeDropdown === item.label && "rotate-180 text-saffron-600"
                          )}
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center px-3.5 2xl:px-4 py-2.5 rounded-xl text-[15px] 2xl:text-base font-bold whitespace-nowrap transition-all duration-200 leading-none",
                          isActive
                            ? "text-saffron-600 bg-saffron/10 font-extrabold"
                            : "text-slate-700 hover:text-navy hover:bg-slate-100/70"
                        )}
                      >
                        <span className="whitespace-nowrap">{labelText}</span>
                      </Link>
                    )}

                    {/* Dropdown panel */}
                    <AnimatePresence>
                      {item.dropdown && activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.97 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 p-2"
                        >
                          {item.dropdown.map((group) => (
                            <div key={group.group}>
                              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2">
                                {group.group}
                              </div>
                              {group.items.map((link) => (
                                <Link
                                  key={link.href}
                                  href={link.href}
                                  className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-navy/10 flex items-center justify-center flex-shrink-0 text-navy group-hover:bg-navy group-hover:text-white transition-colors mt-0.5">
                                    {iconMap[link.icon]}
                                  </div>
                                  <div>
                                    <div className="text-sm font-semibold text-slate-800 group-hover:text-navy whitespace-nowrap">{link.label}</div>
                                    <div className="text-xs text-slate-500 mt-0.5">{link.desc}</div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* CTA + Language Selector */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              {/* International Language Dropdown */}
              <div 
                ref={langRef} 
                className="relative"
                onMouseEnter={() => setLangOpen(true)}
                onMouseLeave={() => setLangOpen(false)}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLangOpen((prev) => !prev);
                  }}
                  className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:text-navy bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                  aria-label="Select Language"
                  aria-expanded={langOpen}
                >
                  <span className="text-base sm:text-lg leading-none">{currentLang.flag}</span>
                  <span className="font-extrabold uppercase text-[11px] sm:text-xs tracking-wider">{currentLang.code}</span>
                  <ChevronDown className={cn("w-3 sm:w-3.5 h-3 sm:h-3.5 text-slate-500 transition-transform", langOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-60 sm:w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 overflow-hidden"
                    >
                      <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                        Select Language / भाषा चुनें
                      </div>
                      <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => handleLocaleChange(lang.code)}
                            className={cn(
                              "w-full text-left px-3.5 py-2.5 text-sm flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer",
                              locale === lang.code ? "bg-saffron/10 text-saffron-700 font-bold" : "text-slate-700 font-medium"
                            )}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-xl leading-none">{lang.flag}</span>
                              <div>
                                <div className="leading-tight font-semibold text-slate-900">{lang.native}</div>
                                <div className="text-[11px] text-slate-500 leading-tight">{lang.name}</div>
                              </div>
                            </div>
                            {locale === lang.code && (
                              <span className="w-2 h-2 rounded-full bg-saffron"></span>
                            )}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Apply CTA button */}
              <Link
                href="/apply/type-selection"
                className="apply-btn hidden sm:flex items-center gap-2 bg-saffron hover:bg-saffron-600 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm sm:text-[15px] font-bold transition-all duration-200 hover:shadow-lg hover:shadow-saffron/30 hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
              >
                <span>{t.has('applyNow') ? t('applyNow') : 'Apply Now'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="xl:hidden p-2 sm:p-2.5 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200 min-w-[38px] min-h-[38px] sm:min-w-[42px] sm:min-h-[42px] flex items-center justify-center cursor-pointer"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-5 sm:w-6 h-5 sm:h-6 text-slate-800" /> : <Menu className="w-5 sm:w-6 h-5 sm:h-6 text-slate-800" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="xl:hidden border-t border-slate-200 bg-white overflow-y-auto max-h-[85dvh]"
            >
              <div className="px-4 py-3 space-y-1">
                {/* Language Picker in Mobile Menu */}
                <div className="mb-3 pb-3 border-b border-slate-100">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Select Language</div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLocaleChange(lang.code)}
                        className={cn(
                          "px-2 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all",
                          locale === lang.code
                            ? "bg-saffron text-white border-saffron shadow-sm"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        )}
                      >
                        <span>{lang.flag}</span>
                        <span className="truncate">{lang.native}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {navItems.map((item) => (
                  <div key={item.label}>
                    {item.dropdown ? (
                      <>
                        <button
                          onClick={() => setExpandedMobile(expandedMobile === item.label ? null : item.label)}
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-slate-50 text-sm font-medium text-slate-700"
                        >
                          {item.label}
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 text-slate-400 transition-transform",
                              expandedMobile === item.label && "rotate-180"
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {expandedMobile === item.label && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-3 pl-3 border-l-2 border-slate-200 space-y-1 mt-1 mb-2"
                            >
                              {item.dropdown.flatMap((g) =>
                                g.items.map((link) => (
                                  <Link
                                    key={link.href}
                                    href={link.href}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 text-sm text-slate-600 hover:text-navy"
                                  >
                                    <span className="text-slate-400">{iconMap[link.icon]}</span>
                                    {link.label}
                                  </Link>
                                ))
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          "block px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50",
                          pathname === item.href ? "text-navy bg-navy/5" : "text-slate-700"
                        )}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="pt-3 pb-2">
                  <Link
                    href="/apply/type-selection"
                    className="w-full flex items-center justify-center gap-2 bg-saffron text-white py-3 rounded-lg text-sm font-semibold shadow-md"
                  >
                    Apply Now <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
