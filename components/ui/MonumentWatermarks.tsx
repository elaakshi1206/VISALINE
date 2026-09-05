import React from "react";

// Taj Mahal - Minimal Geometric One-Line Art
export const TajMahalSVG = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} preserveAspectRatio="xMidYMid meet" stroke="currentColor" fill="none" strokeWidth="1.5">
    {/* Main Dome */}
    <path d="M 50 20 C 40 30 35 45 40 55 L 60 55 C 65 45 60 30 50 20 Z" />
    {/* Side Domes */}
    <path d="M 33 40 C 28 45 28 50 30 55 L 40 55" />
    <path d="M 67 40 C 72 45 72 50 70 55 L 60 55" />
    {/* Base Building */}
    <rect x="25" y="55" width="50" height="25" />
    {/* Central Arch */}
    <path d="M 40 80 L 40 65 C 40 55 60 55 60 65 L 60 80" />
    {/* Side Arches */}
    <path d="M 30 80 L 30 65 C 30 60 36 60 36 65 L 36 80" />
    <path d="M 70 80 L 70 65 C 70 60 64 60 64 65 L 64 80" />
    {/* Minarets */}
    <line x1="15" y1="80" x2="15" y2="35" />
    <line x1="12" y1="35" x2="18" y2="35" />
    <line x1="15" y1="35" x2="15" y2="30" />
    <line x1="85" y1="80" x2="85" y2="35" />
    <line x1="82" y1="35" x2="88" y2="35" />
    <line x1="85" y1="35" x2="85" y2="30" />
    {/* Base Platform */}
    <rect x="5" y="80" width="90" height="4" />
  </svg>
);

// India Gate - Minimal Geometric One-Line Art
export const IndiaGateSVG = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} preserveAspectRatio="xMidYMid meet" stroke="currentColor" fill="none" strokeWidth="1.5">
    {/* Main structure */}
    <rect x="25" y="20" width="50" height="60" />
    {/* Arch */}
    <path d="M 40 80 L 40 45 C 40 35 60 35 60 45 L 60 80" />
    {/* Top tiers */}
    <rect x="30" y="15" width="40" height="5" />
    <rect x="35" y="10" width="30" height="5" />
    {/* Top dome bowl */}
    <path d="M 45 10 C 45 5 55 5 55 10" /> 
    {/* Base */}
    <rect x="15" y="80" width="70" height="4" />
    {/* Side details */}
    <line x1="32" y1="20" x2="32" y2="80" />
    <line x1="68" y1="20" x2="68" y2="80" />
  </svg>
);

// Gateway of India - Minimal Geometric One-Line Art
export const GatewayOfIndiaSVG = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} preserveAspectRatio="xMidYMid meet" stroke="currentColor" fill="none" strokeWidth="1.5">
    {/* Main structure */}
    <rect x="20" y="30" width="60" height="50" />
    {/* Central Arch */}
    <path d="M 40 80 L 40 50 C 40 40 60 40 60 50 L 60 80" />
    {/* Side Arches */}
    <path d="M 26 80 L 26 60 C 26 55 34 55 34 60 L 34 80" />
    <path d="M 74 80 L 74 60 C 74 55 66 55 66 60 L 66 80" />
    {/* Top domes/turrets */}
    <path d="M 20 30 C 20 20 30 20 30 30" />
    <path d="M 70 30 C 70 20 80 20 80 30" />
    {/* Top parapet details */}
    <rect x="30" y="25" width="40" height="5" />
    <circle cx="50" cy="22" r="1.5" />
    <circle cx="40" cy="22" r="1.5" />
    <circle cx="60" cy="22" r="1.5" />
    {/* Base */}
    <rect x="10" y="80" width="80" height="4" />
  </svg>
);

// Red Fort (Lal Qila) - Minimal Geometric One-Line Art
export const RedFortSVG = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} preserveAspectRatio="xMidYMid meet" stroke="currentColor" fill="none" strokeWidth="1.5">
    {/* Walls */}
    <rect x="10" y="50" width="80" height="30" />
    {/* Main Entrance / Lahori Gate */}
    <rect x="35" y="40" width="30" height="40" />
    <path d="M 42 80 L 42 60 C 42 55 58 55 58 60 L 58 80" />
    {/* Side Towers */}
    <polygon points="10,50 20,50 18,30 12,30" />
    <path d="M 10 30 C 10 20 20 20 20 30" />
    <polygon points="80,50 90,50 88,30 82,30" />
    <path d="M 80 30 C 80 20 90 20 90 30" />
    {/* Center domes over gate */}
    <path d="M 38 40 C 38 30 48 30 48 40" />
    <path d="M 52 40 C 52 30 62 30 62 40" />
    {/* Small chatris */}
    <line x1="43" y1="30" x2="43" y2="25" />
    <line x1="57" y1="30" x2="57" y2="25" />
    {/* Base */}
    <rect x="5" y="80" width="90" height="4" />
  </svg>
);

// Qutub Minar - Minimal Geometric One-Line Art
export const QutubMinarSVG = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} preserveAspectRatio="xMidYMid meet" stroke="currentColor" fill="none" strokeWidth="1.5">
    {/* Main tower tapering */}
    <polygon points="40,90 60,90 55,10 45,10" />
    {/* Balconies */}
    <line x1="42" y1="70" x2="58" y2="70" strokeWidth="2.5" />
    <line x1="43" y1="50" x2="57" y2="50" strokeWidth="2.5" />
    <line x1="44" y1="30" x2="56" y2="30" strokeWidth="2.5" />
    {/* Top */}
    <circle cx="50" cy="8" r="2" />
    {/* Base */}
    <rect x="30" y="90" width="40" height="4" />
  </svg>
);

export const LotusTempleSVG = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} preserveAspectRatio="xMidYMid meet" stroke="currentColor" fill="none" strokeWidth="1.5">
    <path d="M 50 15 C 35 35 25 55 25 80 C 40 75 50 70 50 70 C 50 70 60 75 75 80 C 75 55 65 35 50 15 Z" />
    <path d="M 50 35 C 40 50 32 65 32 80 C 42 75 50 72 50 72 C 50 72 58 75 68 80 C 68 65 60 50 50 35 Z" />
    <path d="M 50 50 C 42 60 37 70 37 80 C 45 78 50 75 50 75 C 50 75 55 78 63 80 C 63 70 58 60 50 50 Z" />
    <line x1="15" y1="80" x2="85" y2="80" strokeWidth="2" />
  </svg>
);

// Indian Mandala / Pattern SVG for aesthetic dividers
export const MandalaPatternSVG = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
    <g stroke="currentColor" fill="none">
      <circle cx="50" cy="50" r="45" strokeWidth="1" />
      <circle cx="50" cy="50" r="38" strokeWidth="0.5" strokeDasharray="2 2" />
      <circle cx="50" cy="50" r="32" strokeWidth="1" />
      
      {/* 8-pointed star / petals */}
      <path d="M50 18 Q60 34 82 50 Q60 66 50 82 Q40 66 18 50 Q40 34 50 18 Z" strokeWidth="1" />
      <path d="M27 27 Q43 38 50 18 Q57 38 73 27 Q62 43 82 50 Q62 57 73 73 Q57 62 50 82 Q43 62 27 73 Q38 57 18 50 Q38 43 27 27 Z" strokeWidth="0.5" />
      
      <circle cx="50" cy="50" r="10" strokeWidth="1" />
      <circle cx="50" cy="50" r="4" fill="currentColor" />
    </g>
  </svg>
);



