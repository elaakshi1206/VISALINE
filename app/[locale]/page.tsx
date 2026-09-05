"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Globe, FileText, Smartphone,
  Plane, Search, Shield, Bell, ArrowUpRight,
  Calendar, Info, CheckCircle
} from "lucide-react";
import { NOTIFICATIONS } from "@/data/notifications";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { ALL_COUNTRIES } from "@/data/countries";
import { 
  TajMahalSVG, IndiaGateSVG, GatewayOfIndiaSVG, 
  LotusTempleSVG, QutubMinarSVG
} from "@/components/ui/MonumentWatermarks";

// Ticker Component
const NotificationTicker = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div 
      className="bg-navy-dark text-white py-3 overflow-hidden border-b border-white/10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex w-[200%] md:w-[150%] xl:w-full">
        <motion.div
          animate={{ x: isPaused ? 0 : "-50%" }}
          transition={{ ease: "linear", duration: 40, repeat: Infinity, bounce: 0 }}
          className="flex whitespace-nowrap"
          style={{ width: "200%" }}
        >
          {[...NOTIFICATIONS, ...NOTIFICATIONS].map((notif, i) => (
            <Link 
              href={notif.link} 
              key={`${notif.id}-${i}`}
              className="flex items-center gap-3 mx-8 hover:text-saffron transition-colors text-sm group"
            >
              <span className="font-bold text-saffron uppercase flex items-center gap-2 tracking-wide">
                🔔 {notif.type === 'alert' ? 'IMPORTANT UPDATE' : notif.type === 'advisory' ? 'TRAVEL ADVISORY' : 'EVISA UPDATE'}
              </span>
              <span className="text-white/90 font-medium">{notif.summary}</span>
              <ArrowRight className="w-4 h-4 text-saffron opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// Guided Wizard Component
const FindVisaWizard = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ purpose: '', nationality: '', duration: '' });

  const nextStep = (key: string, val: string) => {
    // We are deliberately ignoring the answers state for the mockup, but it could be used later
    setAnswers(prev => ({ ...prev, [key]: val }));
    setStep(s => s + 1);
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgb(0,0,0,0.08)] border border-slate-200 p-10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 pointer-events-none translate-x-10 -translate-y-10">
        <TajMahalSVG className="w-full h-full opacity-20 fill-navy" />
      </div>
      
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-navy mb-2">Find Your Visa</h3>
        <p className="text-slate-500 mb-8 text-sm">Answer a few questions to see your eligible visa options.</p>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="step0" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}}>
              <p className="font-semibold text-slate-800 mb-6 text-lg">What is the purpose of your visit?</p>
              <div className="flex flex-wrap gap-4">
                {['Tourism', 'Business', 'Medical', 'Conference', 'Other'].map(p => (
                  <button 
                    key={p} 
                    onClick={() => nextStep('purpose', p)} 
                    className="px-6 py-3 rounded-full border-2 border-slate-100 text-slate-600 font-medium hover:border-saffron hover:bg-saffron/5 hover:text-saffron-600 transition-all shadow-sm hover:shadow-md cursor-pointer"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="step1" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}}>
              <p className="font-semibold text-slate-800 mb-4 text-lg">What is your nationality?</p>
              <select 
                onChange={(e) => nextStep('nationality', e.target.value)}
                className="w-full max-w-md px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold focus:border-navy focus:outline-none"
                defaultValue=""
              >
                <option value="" disabled>Select Country</option>
                {ALL_COUNTRIES.slice(0, 10).map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
              </select>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}}>
              <p className="font-semibold text-slate-800 mb-6 text-lg">How long do you plan to stay?</p>
              <div className="flex flex-wrap gap-4">
                {['Less than 30 days', 'Up to 1 year', 'More than 1 year'].map(d => (
                  <button 
                    key={d} 
                    onClick={() => nextStep('duration', d)} 
                    className="px-6 py-3 rounded-full border-2 border-slate-100 text-slate-600 font-medium hover:border-saffron hover:bg-saffron/5 hover:text-saffron-600 transition-all shadow-sm hover:shadow-md cursor-pointer"
                  >
                    {d}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}}>
              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                  <p className="font-bold text-emerald-900 text-lg">Recommended: e-Tourist Visa</p>
                </div>
                <p className="text-emerald-800/80 text-sm mb-6 max-w-md">Based on your answers, you are eligible for an e-Tourist visa which can be applied entirely online.</p>
                
                <div className="flex gap-4">
                  <Link href="/apply/form?type=evisa" className="px-6 py-3 bg-navy text-white rounded-xl font-bold shadow-lg hover:-translate-y-0.5 transition-all">
                    Start Application
                  </Link>
                  <button onClick={() => setStep(0)} className="px-6 py-3 bg-white text-slate-600 border rounded-xl font-semibold hover:bg-slate-50 transition-all">
                    Start Over
                  </button>
                </div>
                
                <p className="text-[10px] text-emerald-600/60 mt-6 uppercase tracking-wider">
                  * Note: Final eligibility depends on official government verification during processing.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};


// Services Data
const SERVICES = [
  {
    id: "evisa",
    title: "eVisa",
    description: "Apply for your electronic Indian visa easily online. For tourism, business, and medical.",
    icon: Smartphone,
    href: "/evisa",
    primary: true,
  },
  {
    id: "regular-visa",
    title: "Regular Visa",
    description: "Explore and apply for regular/paper visas through an Indian Mission.",
    icon: Globe,
    href: "/regular-visa",
    primary: false,
  },
  {
    id: "e-arrival",
    title: "e-Arrival Card",
    description: "Complete your mandatory arrival information before travelling to India.",
    icon: FileText,
    href: "/e-arrival-card",
    primary: false,
  },
  {
    id: "voa",
    title: "Visa on Arrival",
    description: "Learn about applicable visa-on-arrival facilities at major airports.",
    icon: Plane,
    href: "/visa-on-arrival",
    primary: false,
  },
  {
    id: "status",
    title: "Check Status",
    description: "Track your existing application status securely.",
    icon: Search,
    href: "/status",
    primary: false,
  },
  {
    id: "info",
    title: "Visa Information",
    description: "Explore eligibility, requirements, documents and fee information.",
    icon: Info,
    href: "/visa-information",
    primary: false,
  }
];

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    "/hero-indian-woman.jpg",
    "/slider_ls_1.png", 
    "/slider_ls_2.png", 
    "/slider_ls_3.jpg", 
    "/slider_ls_4.png"  
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, [slides.length]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Hero parallax effects
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-slate-50">
      
      <NotificationTicker />

      {/* 1. HERO - FULL SCREEN */}
      <section className="relative h-[90vh] min-h-[600px] overflow-hidden bg-navy flex items-center">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0 origin-bottom"
        >
          {/* Crisp, subtle legibility gradient only behind text, keeping image bright and vivid */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/35 to-transparent z-10 w-full md:w-[52%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10" />
          
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={currentSlide}
              initial={{ x: "100%", opacity: 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={slides[currentSlide]}
                alt="India Visa Background"
                fill
                sizes="100vw"
                className="object-cover object-[center_20%] scale-[1.01] brightness-[1.03] contrast-[1.04]"
                priority={currentSlide === 0}
                quality={100}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 text-xs font-semibold tracking-wide uppercase mb-6">
              <Shield className="w-3.5 h-3.5 text-saffron" />
              {t('hero.badge')}
            </div>

            <h1 className="text-5xl md:text-7xl font-playfair font-bold text-white leading-[1.1] mb-6">
              {t('hero.welcome')}<br/>
              <span className="text-blue-200">{t('hero.journey')}</span>
            </h1>

            <p className="text-lg md:text-xl text-blue-50 mb-10 max-w-xl font-light leading-relaxed">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#services" className="inline-flex items-center justify-center gap-2 bg-saffron hover:bg-saffron-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-saffron/30 hover:-translate-y-0.5">
                {t('hero.explore')}
              </Link>
              <Link href="/apply/type-selection" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:-translate-y-0.5">
                {t('hero.applyEVisa')} <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>



        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/70"
        >
          <span className="text-xs uppercase tracking-widest font-semibold">{t('hero.scroll')}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <div className="w-px h-12 bg-gradient-to-b from-white/70 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* 2. SERVICES SECTION */}
      <motion.section 
        style={{ y: contentY }}
        id="services" 
        className="relative z-30 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden rounded-[3rem]">
          <Image src="/bg_homepage_updates.png" alt="India Gate Sunset Background" fill quality={95} sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover opacity-50" />
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">{t('services.title')}</h2>
          <div className="w-24 h-1 bg-saffron mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            let tKey = service.id;
            if (service.id === 'regular-visa') tKey = 'regular';
            if (service.id === 'e-arrival') tKey = 'arrival';
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={service.href} className="block h-full">
                  <div className={cn(
                    "relative h-full p-8 rounded-2xl border transition-all duration-300 group overflow-hidden bg-white shadow-md",
                    service.primary 
                      ? "border-emerald-200 hover:border-emerald-500 hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)]" 
                      : "border-slate-200 hover:border-blue-500 hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)]"
                  )}>
                    
                    <div className={cn(
                      "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br",
                      service.primary ? "from-emerald-50/50 to-transparent" : "from-blue-50/50 to-transparent"
                    )} />

                    <div className="relative z-10 flex flex-col h-full">
                      <div className={cn(
                        "w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110",
                        service.primary ? "bg-emerald-100 text-emerald-700" : "bg-blue-50 text-blue-700"
                      )}>
                        <Icon className="w-7 h-7" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-blue-700 transition-colors">
                        {t(`services.${tKey}.title`) !== `services.${tKey}.title` ? t(`services.${tKey}.title`) : service.title}
                      </h3>
                      
                      <p className="text-slate-600 text-sm leading-relaxed flex-grow mb-6">
                        {t(`services.${tKey}.desc`) !== `services.${tKey}.desc` ? t(`services.${tKey}.desc`) : service.description}
                      </p>
                      
                      <div className={cn(
                        "mt-auto flex items-center gap-2 text-sm font-semibold transition-all duration-300",
                        service.primary ? "text-emerald-600" : "text-blue-600"
                      )}>
                        {t(`services.${tKey}.explore`) !== `services.${tKey}.explore` ? t(`services.${tKey}.explore`) : 'Explore'}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Guided Wizard */}
        <FindVisaWizard />

      </motion.section>

      {/* 3. LATEST UPDATES / HOW IT WORKS */}
      <section className="py-24 bg-white border-y border-slate-100 relative overflow-hidden">
        
        <Image src="/bg_hampi.png" alt="Hampi Background" fill className="object-cover opacity-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16">
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-navy mb-2">Latest Updates</h2>
                  <p className="text-slate-500">Official announcements and advisories</p>
                </div>
                <Link href="/advisories" className="hidden sm:flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-lg transition-colors">
                  View All <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

                <div className="flex flex-wrap gap-3 mb-8">
                  {['ALL', 'VISA', 'eVISA', 'TRAVEL', 'ADVISORY'].map(tab => (
                    <button 
                      key={tab} 
                      className={cn(
                        "px-5 py-2 rounded-full text-xs font-bold tracking-wider transition-all cursor-pointer shadow-sm border",
                        tab === 'ALL' 
                          ? "bg-navy text-white border-navy" 
                          : "bg-white text-slate-500 border-slate-200 hover:border-saffron hover:text-saffron-600 hover:shadow-md"
                      )}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

              <div className="space-y-4">
                {NOTIFICATIONS.slice(0, 3).map((notif) => (
                  <Link 
                    key={notif.id}
                    href={notif.link}
                    className="group block p-6 rounded-2xl border border-slate-100 bg-white hover:border-blue-200 hover:shadow-[0_8px_30px_rgb(59,130,246,0.08)] transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <h3 className="font-bold text-navy group-hover:text-blue-700 transition-colors text-lg">
                        {notif.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(notif.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric'})}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{notif.summary}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="lg:w-[420px]">
              <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-md h-full">
                <h3 className="text-2xl font-bold text-navy mb-10">How it Works</h3>
                
                <div className="space-y-8 relative">
                  {[
                    { num: "01", title: "Choose your service", desc: "Select eVisa, Regular Visa, or e-Arrival Card." },
                    { num: "02", title: "Complete application", desc: "Fill out the secure online form with your details." },
                    { num: "03", title: "Upload documents", desc: "Upload passport and necessary photos." },
                    { num: "04", title: "Make payment", desc: "Pay securely via government authorized gateways." },
                    { num: "05", title: "Track application", desc: "Monitor your status and receive ETA via email." },
                  ].map((step, i) => (
                    <div key={i} className="relative flex items-start gap-6 group">
                      <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 text-slate-400 group-hover:border-navy group-hover:text-navy group-hover:bg-blue-50 transition-all flex items-center justify-center text-sm font-bold flex-shrink-0 z-10 shadow-sm">
                        {step.num}
                      </div>
                      <div className="pt-1">
                        <h4 className="font-bold text-slate-800 text-base group-hover:text-navy transition-colors">{step.title}</h4>
                        <p className="text-sm text-slate-500 mt-1 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. TRUST SECTION */}
      <section className="py-24 bg-navy text-white text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { title: "Simple", desc: "Streamlined digital applications", icon: Smartphone },
              { title: "Secure", desc: "Encrypted data protection", icon: Shield },
              { title: "Official", desc: "Govt. of India Authorized", icon: Globe },
              { title: "Accessible", desc: "24/7 online availability", icon: Bell },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex flex-col items-center group">
                  <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 backdrop-blur-md group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300 shadow-xl">
                    <Icon className="w-10 h-10 text-saffron group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 tracking-wide">{item.title}</h3>
                  <p className="text-sm text-blue-200/80 font-medium">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5. RULES, REGULATIONS & TUTORIALS (Includes Movable Video) */}
      <section className="py-20 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-12">
             <h2 className="text-3xl font-bold text-navy">Rules, Regulations & Tutorials</h2>
             <p className="text-slate-500 mt-2">Everything you need to know before you apply, plus a step-by-step video guide.</p>
           </div>
           
           <div className="grid md:grid-cols-2 gap-8 relative z-10">
             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
               <h3 className="text-xl font-bold text-navy mb-4">Required Documents for eVisa</h3>
               <ul className="space-y-4 text-sm text-slate-600">
                 <li className="flex gap-3 items-start"><CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5"/> <div><strong>Recent Passport Photo:</strong> Must have a white background, front view, and no glasses. Size should be 2in x 2in. Upload exactly in JPEG format.</div></li>
                 <li className="flex gap-3 items-start"><CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5"/> <div><strong>Passport Bio Page:</strong> Clear, colored scan of the page containing your personal details. Must be valid for at least 6 months from arrival. PDF format required.</div></li>
                 <li className="flex gap-3 items-start"><CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5"/> <div><strong>Business Card (For Business Visa):</strong> Clear copy of your professional business card.</div></li>
               </ul>
             </div>
             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
               <h3 className="text-xl font-bold text-navy mb-4">Important Guidelines & Form Filling</h3>
               <ul className="space-y-4 text-sm text-slate-600">
                 <li className="flex gap-3 items-start"><Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5"/> <div><strong>Form Filling:</strong> Type all answers in ENGLISH exactly as they appear on your passport. Double-check your Date of Birth, Passport Number, and Nationality.</div></li>
                 <li className="flex gap-3 items-start"><Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5"/> <div><strong>Payment Rules:</strong> Ensure your card is authorized for international transactions. Fees are non-refundable even if the visa is rejected.</div></li>
                 <li className="flex gap-3 items-start"><Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5"/> <div><strong>Timing:</strong> Apply at least 4 days in advance of your date of arrival. The maximum time to apply is 120 days prior.</div></li>
               </ul>
             </div>
           </div>

           {/* Movable Video Section */}
           <div className="mt-16 flex justify-center">
              <motion.div 
                drag 
                whileDrag={{ scale: 1.05, zIndex: 50, cursor: "grabbing" }}
                dragConstraints={{ left: -300, right: 300, top: -100, bottom: 100 }}
                className="bg-white p-4 rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl cursor-grab z-20"
              >
                <div className="flex items-center justify-between mb-3">
                   <div className="flex items-center gap-2">
                     <Info className="w-5 h-5 text-saffron" />
                     <span className="text-navy font-bold">Step-by-Step Tutorial</span>
                   </div>
                   <div className="text-xs text-saffron-600 font-bold px-3 py-1.5 bg-saffron-50 rounded-lg border border-saffron-200">You can drag me!</div>
                </div>
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black/10 border border-slate-200 shadow-inner">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/35npVaFGHMY?autoplay=0&rel=0" 
                    title="Visa Assistance Video"
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              </motion.div>
           </div>
        </div>
      </section>

      {/* 6. OFFICIAL LOGOS */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-10">Official Government Portals</p>
           <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex flex-col items-center gap-3">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Ministry of Home Affairs" className="h-16 object-contain" />
                <span className="text-xs font-bold text-navy">Ministry of Home Affairs</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Globe className="w-16 h-16 text-slate-700" />
                <span className="text-xs font-bold text-navy">Bureau of Immigration</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Smartphone className="w-16 h-16 text-slate-700" />
                <span className="text-xs font-bold text-navy">Incredible India</span>
              </div>
           </div>
        </div>
      </section>

    </div>
  );
}
