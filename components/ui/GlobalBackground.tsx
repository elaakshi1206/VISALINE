"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";

export default function GlobalBackground() {
  const pathname = usePathname();
  
  // The homepage and dashboard have their own specialized full-screen layout
  const isHomePage = !pathname || pathname === "/" || /^\/[a-z]{2}\/?$/.test(pathname);
  if (isHomePage || pathname.includes("/dashboard")) {
    return null; 
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[0] overflow-hidden">
      
      {/* Route-Specific Background Designs with Indian Monuments */}
      {pathname.includes("e-arrival-card") || pathname.includes("regular-visa") ? (
        <Image src="/bg_hawa_mahal.jpg" alt="Hawa Mahal Background" fill sizes="100vw" quality={90} className="object-cover opacity-40" />
      ) : pathname.includes("visa-on-arrival") || pathname.includes("status") || pathname.includes("faq") || pathname.includes("help") || pathname.includes("contact") || pathname.includes("advisories") ? (
        <Image src="/bg_india_gate.jpg" alt="India Gate Background" fill sizes="100vw" quality={90} className="object-cover opacity-40" />
      ) : (
        // Default (eVisa, Application Forms, Visa Information, etc)
        <Image src="/bg_taj_mahal.jpg" alt="Taj Mahal Background" fill sizes="100vw" quality={90} className="object-cover opacity-40" />
      )}
    </div>
  );
}
