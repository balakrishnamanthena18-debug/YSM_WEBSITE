'use client';

import React from 'react';

export function CourseExplorerIllustration() {
  return (
    <div className="relative w-full h-[340px] sm:h-[390px] lg:h-[415px] rounded-3xl overflow-hidden border border-[#12AFA8]/20 bg-gradient-to-br from-[#021d20]/95 via-[#03282c]/95 to-[#011215] shadow-[0_20px_50px_rgba(0,107,104,0.18)] flex items-center justify-center select-none">
      {/* 1. Ambient multi-colored luminous lighting sweeps */}
      <div
        className="absolute -top-14 -right-14 w-80 h-80 rounded-full bg-[#12AFA8]/25 blur-[90px] animate-ambient-sweep pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-14 -left-14 w-72 h-72 rounded-full bg-[#38C6C3]/20 blur-[90px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#5BC4CC]/10 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-8 left-10 w-44 h-44 rounded-full bg-[#3776AB]/15 blur-[80px] pointer-events-none"
        aria-hidden="true"
      />

      {/* 2. Micro Coordinate Grid Lines */}
      <div
        className="absolute inset-0 opacity-15 bg-[radial-gradient(#12AFA8_1px,transparent_1px)] [background-size:26px_26px] pointer-events-none"
        aria-hidden="true"
      />

      {/* 3. Master 3D Vector Composition: Central Laptop + Surrounding Animated 3D Tech Logos */}
      <svg
        className="relative z-10 w-full h-full p-2 sm:p-3"
        viewBox="0 0 620 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Shadow filters */}
          <filter id="tileShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#000000" floodOpacity="0.45" />
          </filter>
          <filter id="laptopGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#12AFA8" floodOpacity="0.25" />
          </filter>
          <filter id="aiGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#5BC4CC" floodOpacity="0.55" />
          </filter>

          {/* Screen and Laptop Gradients */}
          <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B192C" />
            <stop offset="100%" stopColor="#030C17" />
          </linearGradient>
          <linearGradient id="laptopLid" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="laptopBase" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="50%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="chartArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#12AFA8" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#12AFA8" stopOpacity="0" />
          </linearGradient>

          {/* Technology Tile Gradients */}
          <linearGradient id="excelGreenGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1F9A55" />
            <stop offset="100%" stopColor="#0B552C" />
          </linearGradient>
          <linearGradient id="sqlBlueGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>
          <linearGradient id="pbiYellowGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F5D22B" />
            <stop offset="100%" stopColor="#D99B00" />
          </linearGradient>
          <linearGradient id="azureBlueGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#50E6FF" />
            <stop offset="100%" stopColor="#0078D4" />
          </linearGradient>
        </defs>

        {/* --- Connected Network Data Lines with Animated Dash Movement --- */}
        <g opacity="0.65">
          {/* Excel to Laptop */}
          <path
            d="M 115 110 C 170 110 210 180 250 200"
            stroke="#107C41"
            strokeWidth="2"
            strokeDasharray="4 4"
            className="animate-dash-flow"
          />
          {/* SQL to Laptop */}
          <path
            d="M 190 75 C 220 90 250 160 280 180"
            stroke="#0284C7"
            strokeWidth="2"
            strokeDasharray="4 4"
            className="animate-dash-flow"
          />
          {/* Python to Laptop */}
          <path
            d="M 505 105 C 450 115 410 180 370 200"
            stroke="#FFD43B"
            strokeWidth="2"
            strokeDasharray="4 4"
            className="animate-dash-flow"
          />
          {/* Azure to Laptop */}
          <path
            d="M 525 210 C 470 210 430 220 380 230"
            stroke="#0078D4"
            strokeWidth="2"
            strokeDasharray="4 4"
            className="animate-dash-flow"
          />
          {/* Power BI to Laptop */}
          <path
            d="M 495 320 C 440 310 410 270 370 250"
            stroke="#F2C811"
            strokeWidth="2"
            strokeDasharray="4 4"
            className="animate-dash-flow"
          />
          {/* Tableau to Laptop */}
          <path
            d="M 125 315 C 180 310 210 260 250 240"
            stroke="#E15759"
            strokeWidth="2"
            strokeDasharray="4 4"
            className="animate-dash-flow"
          />
          {/* AI Core (Top) to Laptop */}
          <path
            d="M 310 75 L 310 160"
            stroke="#5BC4CC"
            strokeWidth="2.5"
            strokeDasharray="3 3"
            className="animate-dash-flow"
          />
        </g>

        {/* =========================================================================
            CENTRAL 3D METALLIC LAPTOP WITH ACTIVE ENTERPRISE ANALYTICS DASHBOARD
            Visual focal point of the composition
            ========================================================================= */}
        <g transform="translate(185, 150)" filter="url(#laptopGlow)">
          {/* Laptop Screen Bezel */}
          <rect x="0" y="0" width="250" height="155" rx="10" fill="url(#laptopLid)" stroke="#64748B" strokeWidth="2" />
          {/* Laptop Display Screen */}
          <rect x="8" y="8" width="234" height="139" rx="6" fill="url(#screenGrad)" />

          {/* Dashboard Header Bar */}
          <rect x="8" y="8" width="234" height="18" rx="4" fill="#0F172A" />
          {/* Window Control Dots */}
          <circle cx="18" cy="17" r="2.8" fill="#EF4444" />
          <circle cx="26" cy="17" r="2.8" fill="#F59E0B" />
          <circle cx="34" cy="17" r="2.8" fill="#10B981" />
          {/* Header Title */}
          <text x="50" y="20" fill="#94A3B8" fontSize="7.5" fontWeight="600" fontFamily="system-ui, sans-serif" letterSpacing="0.08em">
            YSM ANALYTICS CLOUD • REAL-TIME AI
          </text>
          {/* Live indicator badge */}
          <rect x="205" y="12" width="30" height="10" rx="3" fill="#12AFA8" fillOpacity="0.25" stroke="#12AFA8" strokeWidth="0.8" />
          <circle cx="211" cy="17" r="1.8" fill="#5BC4CC" className="animate-node-pulse" />
          <text x="222" y="19" fill="#38C6C3" fontSize="6" fontWeight="bold" textAnchor="middle" fontFamily="system-ui, sans-serif">
            LIVE
          </text>

          {/* Dashboard Sidebar */}
          <rect x="8" y="26" width="34" height="121" fill="#090E17" />
          <rect x="13" y="34" width="24" height="6" rx="2" fill="#12AFA8" fillOpacity="0.4" />
          <rect x="13" y="45" width="24" height="5" rx="2" fill="#334155" />
          <rect x="13" y="55" width="24" height="5" rx="2" fill="#334155" />
          <rect x="13" y="65" width="24" height="5" rx="2" fill="#334155" />
          <rect x="13" y="75" width="24" height="5" rx="2" fill="#334155" />

          {/* Dashboard Main Viewport */}
          {/* KPI Widget 1: Revenue / Growth */}
          <rect x="48" y="32" width="60" height="24" rx="4" fill="#0F1E2E" stroke="#1E293B" strokeWidth="0.8" />
          <text x="54" y="41" fill="#94A3B8" fontSize="5.5" fontWeight="600" fontFamily="system-ui, sans-serif">MODELS DEPLOYED</text>
          <text x="54" y="51" fill="#38C6C3" fontSize="9" fontWeight="bold" fontFamily="system-ui, sans-serif">12 ACTIVE</text>

          {/* KPI Widget 2: Accuracy */}
          <rect x="114" y="32" width="60" height="24" rx="4" fill="#0F1E2E" stroke="#1E293B" strokeWidth="0.8" />
          <text x="120" y="41" fill="#94A3B8" fontSize="5.5" fontWeight="600" fontFamily="system-ui, sans-serif">ACCURACY INDEX</text>
          <text x="120" y="51" fill="#5BC4CC" fontSize="9" fontWeight="bold" fontFamily="system-ui, sans-serif">99.4%</text>

          {/* KPI Widget 3: Live Throughput */}
          <rect x="180" y="32" width="56" height="24" rx="4" fill="#0F1E2E" stroke="#1E293B" strokeWidth="0.8" />
          <text x="186" y="41" fill="#94A3B8" fontSize="5.5" fontWeight="600" fontFamily="system-ui, sans-serif">LATENCY</text>
          <text x="186" y="51" fill="#10B981" fontSize="9" fontWeight="bold" fontFamily="system-ui, sans-serif">14ms</text>

          {/* Main Area Chart Widget */}
          <rect x="48" y="61" width="126" height="80" rx="4" fill="#081420" stroke="#1E293B" strokeWidth="0.8" />
          {/* Area fill */}
          <path d="M 52 125 Q 75 105 100 115 T 145 85 T 170 75 L 170 135 L 52 135 Z" fill="url(#chartArea)" />
          {/* Primary Trendline (Turquoise) */}
          <path d="M 52 125 Q 75 105 100 115 T 145 85 T 170 75" stroke="#38C6C3" strokeWidth="2" fill="none" />
          {/* Secondary Trendline */}
          <path d="M 52 132 C 80 125 110 110 140 100 C 155 95 165 88 170 82" stroke="#5BC4CC" strokeWidth="1.4" strokeDasharray="2 2" fill="none" />

          {/* Right Histogram Chart Widget */}
          <rect x="180" y="61" width="56" height="80" rx="4" fill="#081420" stroke="#1E293B" strokeWidth="0.8" />
          <rect x="186" y="105" width="7" height="30" rx="1.5" fill="#006B68" />
          <rect x="196" y="90" width="7" height="45" rx="1.5" fill="#12AFA8" />
          <rect x="206" y="78" width="7" height="57" rx="1.5" fill="#38C6C3" />
          <rect x="216" y="70" width="7" height="65" rx="1.5" fill="#5BC4CC" />

          {/* Laptop Base / Keyboard Deck in Perspective */}
          <polygon points="-25,155 275,155 250,172 0,172" fill="url(#laptopBase)" stroke="#64748B" strokeWidth="1.5" />
          {/* Trackpad */}
          <rect x="100" y="158" width="50" height="9" rx="2" fill="#334155" stroke="#475569" strokeWidth="0.8" />
          {/* Front Edge Lip Accent */}
          <line x1="0" y1="172" x2="250" y2="172" stroke="#94A3B8" strokeWidth="1.2" />
        </g>

        {/* =========================================================================
            SURROUNDING REAL OFFICIAL TECHNOLOGY LOGOS (BORDER-FREE)
            Independent gentle floating animations (animate-float-1, 2, 3, 4)
            ========================================================================= */}

        {/* --- 1. MICROSOFT EXCEL REAL LOGO (Top-Left) --- */}
        <g transform="translate(60, 60)" filter="url(#tileShadow)" className="animate-float-1">
          <rect x="0" y="0" width="68" height="68" rx="18" fill="#0B3822" fillOpacity="0.85" />
          <image href="/logos/tools/excel.svg" x="14" y="14" width="40" height="40" preserveAspectRatio="xMidYMid meet" />
          <circle cx="56" cy="14" r="2.5" fill="#5BC4CC" className="animate-node-pulse" />
        </g>

        {/* --- 2. SQL (POSTGRESQL) REAL LOGO (Top-Center-Left) --- */}
        <g transform="translate(150, 25)" filter="url(#tileShadow)" className="animate-float-2">
          <rect x="0" y="0" width="62" height="62" rx="16" fill="#082F49" fillOpacity="0.85" />
          <image href="/logos/tools/postgresql.svg" x="11" y="11" width="40" height="40" preserveAspectRatio="xMidYMid meet" />
        </g>

        {/* --- 3. CENTRAL AI & AGENTIC BRAIN CORE (Top-Center) --- */}
        <g transform="translate(280, 20)" filter="url(#aiGlow)" className="animate-node-pulse">
          <circle cx="30" cy="30" r="26" fill="#102E2D" fillOpacity="0.9" />
          {/* Pulsing Synapses */}
          <circle cx="30" cy="30" r="16" fill="#104E4D" />
          <circle cx="30" cy="30" r="6" fill="#5BC4CC" />
          <line x1="16" y1="20" x2="24" y2="26" stroke="#5BC4CC" strokeWidth="2" />
          <line x1="44" y1="20" x2="36" y2="26" stroke="#5BC4CC" strokeWidth="2" />
          <line x1="20" y1="40" x2="26" y2="34" stroke="#38C6C3" strokeWidth="2" />
          <line x1="40" y1="40" x2="34" y2="34" stroke="#38C6C3" strokeWidth="2" />
          <circle cx="16" cy="20" r="3" fill="#38C6C3" />
          <circle cx="44" cy="20" r="3" fill="#38C6C3" />
          <circle cx="20" cy="40" r="3" fill="#A855F7" />
          <circle cx="40" cy="40" r="3" fill="#A855F7" />
        </g>

        {/* --- 4. PYTHON REAL OFFICIAL LOGO (Top-Right) --- */}
        <g transform="translate(470, 55)" filter="url(#tileShadow)" className="animate-float-3">
          <rect x="0" y="0" width="68" height="68" rx="18" fill="#172554" fillOpacity="0.85" />
          <image href="/logos/tools/python.svg" x="14" y="14" width="40" height="40" preserveAspectRatio="xMidYMid meet" />
        </g>

        {/* --- 5. MICROSOFT AZURE DEVOPS REAL LOGO (Middle-Right) --- */}
        <g transform="translate(490, 165)" filter="url(#tileShadow)" className="animate-float-4">
          <rect x="0" y="0" width="66" height="66" rx="18" fill="#0C2340" fillOpacity="0.85" />
          <image href="/logos/tools/azure-devops.svg" x="13" y="13" width="40" height="40" preserveAspectRatio="xMidYMid meet" />
        </g>

        {/* --- 6. POWER BI REAL OFFICIAL LOGO (Bottom-Right) --- */}
        <g transform="translate(460, 275)" filter="url(#tileShadow)" className="animate-float-1">
          <rect x="0" y="0" width="66" height="66" rx="18" fill="#452C05" fillOpacity="0.85" />
          <image href="/logos/tools/powerbi.svg" x="13" y="13" width="40" height="40" preserveAspectRatio="xMidYMid meet" />
        </g>

        {/* --- 7. TABLEAU REAL MULTICOLOR LOGO (Bottom-Left) --- */}
        <g transform="translate(70, 270)" filter="url(#tileShadow)" className="animate-float-2">
          <rect x="0" y="0" width="66" height="66" rx="18" fill="#1E293B" fillOpacity="0.85" />
          <image href="/logos/tools/tableau.svg" x="13" y="13" width="40" height="40" preserveAspectRatio="xMidYMid meet" />
        </g>

        {/* --- Floating Status Badge (Bottom Center) --- */}
        <g transform="translate(230, 375)">
          <rect x="0" y="0" width="160" height="28" rx="14" fill="#002D30" stroke="#12AFA8" strokeWidth="1.2" />
          <circle cx="16" cy="14" r="4" fill="#5BC4CC" className="animate-node-pulse" />
          <text x="28" y="18" fill="#FFFFFF" fontSize="10" fontWeight="bold" letterSpacing="0.08em" fontFamily="system-ui, sans-serif">
            ENTERPRISE LABS ACTIVE
          </text>
        </g>
      </svg>
    </div>
  );
}
