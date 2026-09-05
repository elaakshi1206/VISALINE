"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showInitialBubble, setShowInitialBubble] = useState(false);

  // Show a brief "Namaste" bubble after 3 seconds, then hide it after 5 seconds
  useEffect(() => {
    const showTimer = setTimeout(() => setShowInitialBubble(true), 3000);
    const hideTimer = setTimeout(() => setShowInitialBubble(false), 8000);
    return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
  }, []);

  const showTooltip = (isHovered || showInitialBubble) && !isOpen;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip Popup — shows on hover OR briefly on load */}
      <div
        className={cn(
          "absolute bottom-full right-0 mb-3 bg-white px-4 py-2.5 rounded-xl shadow-lg border border-orange-100 text-sm font-semibold text-navy w-52 text-center transition-all duration-300 origin-bottom-right pointer-events-none",
          showTooltip ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-1"
        )}
      >
        <span>Namaste! 🙏</span><br/>
        <span className="text-xs font-medium text-slate-500">I am here to assist you.</span>
        <div className="absolute top-full right-6 w-3 h-3 bg-white border-b border-r border-orange-100 transform rotate-45 -mt-1.5" />
      </div>

      {isOpen ? (
        <div className="bg-white w-80 h-[420px] rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
          <div className="bg-gradient-to-r from-saffron via-white to-green-500 p-1">
            <div className="bg-navy text-white p-3 rounded-t-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-white border-2 border-saffron">
                  <Image src="/chatbot_avatar.jpg" alt="Avatar" width={32} height={32} className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Visa Assistant</h3>
                  <div className="text-[10px] text-green-400 font-medium">● Online</div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex-1 p-4 bg-slate-50 flex flex-col gap-3 overflow-y-auto">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full overflow-hidden bg-white flex-shrink-0 mt-1 shadow-sm border border-slate-200">
                <Image src="/chatbot_avatar.jpg" alt="Avatar" width={24} height={24} className="object-cover" />
              </div>
              <div className="bg-white p-3 rounded-xl rounded-tl-none border border-slate-100 text-sm text-slate-700 shadow-sm">
                Namaste! 🙏 I&apos;m the VISALINE assistant. How can I help you with your Indian visa application today?
              </div>
            </div>
          </div>
          <div className="p-3 border-t border-slate-100 bg-white">
            <input type="text" placeholder="Type your message..." className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy" />
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-14 h-14 rounded-full overflow-hidden shadow-[0_4px_20px_rgba(249,115,22,0.35)] hover:scale-110 transition-all duration-300 border-2 border-white cursor-pointer"
          title="Visa Assistant — Namaste!"
        >
          <Image src="/chatbot_avatar.jpg" alt="Chat Assistant" fill sizes="64px" quality={95} className="object-cover" />
        </button>
      )}
    </div>
  );
}
