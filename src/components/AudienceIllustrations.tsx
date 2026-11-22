'use client';

import React from 'react';

// =========================================================================
// 01. FOR BEGINNERS STUDENTS — EXPANSIVE LEARNING ROADMAP CANVAS
// Visual Concept: Structured milestone pathway with module progression,
// connected progress nodes, and mentorship status in emerald & mint tones.
// =========================================================================
export function BeginnersStudentIllustration({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative w-full max-w-[340px] aspect-[16/11] flex items-center justify-center select-none ${className}`}
      aria-label="Structured learning roadmap and module progress visualization"
    >
      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm transition-transform duration-300 group-hover:scale-[1.02]"
      >
        <defs>
          <linearGradient id="studentCardBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F0FDF4" />
            <stop offset="100%" stopColor="#ECFDF5" />
          </linearGradient>
          <linearGradient id="studentBarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <filter id="studentGlow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#059669" floodOpacity="0.1" />
          </filter>
        </defs>

        {/* Base Container */}
        <rect x="1" y="1" width="318" height="218" rx="16" fill="url(#studentCardBg)" stroke="#A7F3D0" strokeWidth="1.2" />

        {/* Header Bar */}
        <rect x="1" y="1" width="318" height="36" rx="16" fill="#E6F7F0" />
        <rect x="1" y="24" width="318" height="13" fill="#E6F7F0" />
        <line x1="1" y1="37" x2="319" y2="37" stroke="#A7F3D0" strokeWidth="1" />

        <circle cx="18" cy="18" r="4" fill="#10B981" />
        <text x="28" y="22" fill="#065F46" fontSize="10" fontWeight="700" fontFamily="system-ui, sans-serif">
          LEARNING PATHWAY &bull; MILESTONE PROGRESS
        </text>

        <rect x="238" y="9" width="68" height="18" rx="9" fill="#10B981" fillOpacity="0.15" />
        <text x="248" y="21.5" fill="#047857" fontSize="8.5" fontWeight="700" fontFamily="system-ui, sans-serif">
          ENROLLED
        </text>

        {/* Connected Milestone Pathway */}
        <g transform="translate(22, 52)">
          {/* Milestone 1: Completed */}
          <circle cx="14" cy="14" r="10" fill="#10B981" filter="url(#studentGlow)" />
          <path d="M10.5 14L13 16.5L17.5 11" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <text x="34" y="14" fill="#0F172A" fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif">
            Step 1: Core Fundamentals
          </text>
          <text x="34" y="26" fill="#059669" fontSize="9" fontWeight="500" fontFamily="system-ui, sans-serif">
            Foundations &bull; Algorithmic Thinking
          </text>
          <rect x="210" y="7" width="55" height="16" rx="4" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="0.8" />
          <text x="218" y="18.5" fill="#059669" fontSize="8" fontWeight="700" fontFamily="system-ui, sans-serif">
            COMPLETE
          </text>

          {/* Connecting Line 1 to 2 */}
          <line x1="14" y1="26" x2="14" y2="52" stroke="#10B981" strokeWidth="2" strokeDasharray="3 3" />

          {/* Milestone 2: Active */}
          <circle cx="14" cy="64" r="10" fill="#ECFDF5" stroke="#059669" strokeWidth="2.5" />
          <circle cx="14" cy="64" r="4" fill="#059669" />
          <text x="34" y="64" fill="#0F172A" fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif">
            Step 2: Guided Hands-on Labs
          </text>
          <text x="34" y="76" fill="#0284C7" fontSize="9" fontWeight="500" fontFamily="system-ui, sans-serif">
            Live Sandbox &bull; Real Datasets
          </text>
          <rect x="210" y="57" width="55" height="16" rx="4" fill="#E0F2FE" stroke="#BAE6FD" strokeWidth="0.8" />
          <text x="216" y="68.5" fill="#0369A1" fontSize="8" fontWeight="700" fontFamily="system-ui, sans-serif">
            IN PROGRESS
          </text>

          {/* Connecting Line 2 to 3 */}
          <line x1="14" y1="76" x2="14" y2="102" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="3 3" />

          {/* Milestone 3: Upcoming */}
          <circle cx="14" cy="114" r="10" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.5" />
          <text x="34" y="114" fill="#64748B" fontSize="11" fontWeight="600" fontFamily="system-ui, sans-serif">
            Step 3: Industry Portfolio Capstone
          </text>
          <text x="34" y="126" fill="#94A3B8" fontSize="9" fontWeight="500" fontFamily="system-ui, sans-serif">
            GitHub Showcase &bull; Resume Ready
          </text>
        </g>

        {/* Footer Progress Bar & Reassurance */}
        <g transform="translate(22, 192)">
          <rect x="0" y="0" width="276" height="7" rx="3.5" fill="#E2E8F0" />
          <rect x="0" y="0" width="190" height="7" rx="3.5" fill="url(#studentBarGrad)" />
          <text x="0" y="19" fill="#065F46" fontSize="8.5" fontWeight="600" fontFamily="system-ui, sans-serif">
            Student Track Progress: 68%
          </text>
          <text x="180" y="19" fill="#047857" fontSize="8.5" fontWeight="700" fontFamily="system-ui, sans-serif">
            Live Instructor Active
          </text>
        </g>
      </svg>
    </div>
  );
}

// =========================================================================
// 02. BEGINNERS IT SPECIALISTS — DEVELOPER IDE & TERMINAL ENVIRONMENT
// Visual Concept: Compact macOS code editor window with syntax-highlighted
// Python function and green terminal build status in electric blue & cyan.
// =========================================================================
export function BeginnerITSpecialistIllustration({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative w-full max-w-[340px] aspect-[16/10] flex items-center justify-center select-none ${className}`}
      aria-label="Developer IDE and command-line terminal environment"
    >
      <svg
        viewBox="0 0 320 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm transition-transform duration-300 group-hover:scale-[1.02]"
      >
        <defs>
          <linearGradient id="itEditorBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#0B132B" />
          </linearGradient>
        </defs>

        {/* Outer Container Window */}
        <rect x="1" y="1" width="318" height="198" rx="14" fill="url(#itEditorBg)" stroke="#1E293B" strokeWidth="1.2" />

        {/* Title Bar */}
        <rect x="1" y="1" width="318" height="32" rx="14" fill="#1E293B" />
        <rect x="1" y="20" width="318" height="13" fill="#1E293B" />
        <line x1="1" y1="33" x2="319" y2="33" stroke="#334155" strokeWidth="0.8" />

        {/* macOS Window Controls */}
        <circle cx="16" cy="16" r="4" fill="#EF4444" />
        <circle cx="28" cy="16" r="4" fill="#F59E0B" />
        <circle cx="40" cy="16" r="4" fill="#10B981" />

        {/* Active Tabs */}
        <rect x="56" y="6" width="92" height="21" rx="4" fill="#0F172A" stroke="#334155" strokeWidth="0.8" />
        <text x="65" y="20" fill="#38BDF8" fontSize="9.5" fontWeight="600" fontFamily="monospace">
          deploy_app.py
        </text>

        <rect x="154" y="6" width="70" height="21" rx="4" fill="#1E293B" />
        <text x="162" y="20" fill="#64748B" fontSize="9.5" fontWeight="500" fontFamily="monospace">
          docker.yaml
        </text>

        {/* Code Snippet with Python Syntax Tokens */}
        <g transform="translate(18, 48)" fontFamily="monospace" fontSize="10.5" fontWeight="500">
          {/* Line 1 */}
          <text x="0" y="14" fill="#475569">01</text>
          <text x="20" y="14" fill="#F43F5E">import</text>
          <text x="64" y="14" fill="#F8FAFC">torch,</text>
          <text x="108" y="14" fill="#F43F5E">pandas</text>
          <text x="152" y="14" fill="#F43F5E">as</text>
          <text x="170" y="14" fill="#F8FAFC">pd</text>

          {/* Line 2 */}
          <text x="0" y="32" fill="#475569">02</text>
          <text x="20" y="32" fill="#38BDF8">async def</text>
          <text x="84" y="32" fill="#FBBF24">train_pipeline</text>
          <text x="180" y="32" fill="#F8FAFC">(config):</text>

          {/* Line 3 */}
          <text x="0" y="50" fill="#475569">03</text>
          <text x="36" y="50" fill="#F43F5E">await</text>
          <text x="76" y="50" fill="#34D399">model.deploy_ready</text>
          <text x="200" y="50" fill="#F8FAFC">()</text>

          {/* Line 4 */}
          <text x="0" y="68" fill="#475569">04</text>
          <text x="36" y="68" fill="#F43F5E">return</text>
          <text x="84" y="68" fill="#A7F3D0">&quot;Career Transition Ready&quot;</text>
        </g>

        {/* Embedded Terminal Status Console */}
        <rect x="12" y="132" width="296" height="56" rx="8" fill="#070D18" stroke="#1E293B" strokeWidth="1" />
        <g transform="translate(22, 148)" fontFamily="monospace" fontSize="9.5">
          <text x="0" y="10" fill="#0EA5E9" fontWeight="700">user@ysm-dev:~$</text>
          <text x="110" y="10" fill="#F1F5F9">ysm build --verify</text>
          
          <circle cx="4" cy="27" r="3.5" fill="#10B981" />
          <text x="13" y="30" fill="#34D399" fontWeight="700">[BUILD SUCCESS]</text>
          <text x="110" y="30" fill="#94A3B8">0 errors &bull; 100% tests passed (140ms)</text>
        </g>
      </svg>
    </div>
  );
}

// =========================================================================
// 03. CURRENT IT SPECIALISTS — AI TELEMETRY & CONVERGENCE HUD
// Visual Concept: High-tech dark telemetry HUD with inference throughput,
// model accuracy, and neural convergence waveform in violet & indigo.
// =========================================================================
export function CurrentITSpecialistIllustration({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative w-full max-w-[340px] aspect-[16/10] flex items-center justify-center select-none ${className}`}
      aria-label="AI telemetry and neural network convergence HUD"
    >
      <svg
        viewBox="0 0 320 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm transition-transform duration-300 group-hover:scale-[1.02]"
      >
        <defs>
          <linearGradient id="proCardBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="proWaveArea" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Outer Container Window */}
        <rect x="1" y="1" width="318" height="198" rx="14" fill="url(#proCardBg)" stroke="#312E81" strokeWidth="1.2" />

        {/* Header Bar */}
        <rect x="1" y="1" width="318" height="32" rx="14" fill="#312E81" fillOpacity="0.6" />
        <rect x="1" y="20" width="318" height="13" fill="#312E81" fillOpacity="0.6" />
        <line x1="1" y1="33" x2="319" y2="33" stroke="#4338CA" strokeWidth="0.8" />

        <circle cx="16" cy="16" r="4" fill="#818CF8" />
        <text x="26" y="20" fill="#E0E7FF" fontSize="9.5" fontWeight="700" fontFamily="system-ui, sans-serif">
          NEURAL TELEMETRY HUD &bull; V3.8
        </text>

        <rect x="238" y="7" width="68" height="18" rx="9" fill="#4338CA" />
        <text x="246" y="19.5" fill="#C7D2FE" fontSize="8.5" fontWeight="700" fontFamily="system-ui, sans-serif">
          LIVE 99.8%
        </text>

        {/* Dual KPI Chips */}
        <g transform="translate(14, 44)">
          {/* Chip 1 */}
          <rect x="0" y="0" width="140" height="48" rx="8" fill="#1E1B4B" stroke="#4338CA" strokeWidth="0.8" />
          <text x="10" y="15" fill="#A5B4FC" fontSize="8.5" fontWeight="600" fontFamily="system-ui">INFERENCE THROUGHPUT</text>
          <text x="10" y="37" fill="#FFFFFF" fontSize="17" fontWeight="800" fontFamily="monospace">14.2k</text>
          <text x="68" y="37" fill="#34D399" fontSize="10" fontWeight="700" fontFamily="monospace">+28%</text>

          {/* Chip 2 */}
          <rect x="152" y="0" width="140" height="48" rx="8" fill="#1E1B4B" stroke="#4338CA" strokeWidth="0.8" />
          <text x="10" y="15" fill="#A5B4FC" fontSize="8.5" fontWeight="600" fontFamily="system-ui">MODEL ACCURACY</text>
          <text x="10" y="37" fill="#C084FC" fontSize="17" fontWeight="800" fontFamily="monospace">99.4%</text>
          <text x="70" y="37" fill="#818CF8" fontSize="10" fontWeight="700" fontFamily="monospace">p99</text>
        </g>

        {/* Convergence Waveform Graph */}
        <g transform="translate(14, 102)">
          <rect x="0" y="0" width="292" height="84" rx="8" fill="#0B0F19" stroke="#3730A3" strokeWidth="0.8" />
          
          {/* Grid lines */}
          <line x1="12" y1="28" x2="280" y2="28" stroke="#1E1B4B" strokeWidth="0.8" />
          <line x1="12" y1="56" x2="280" y2="56" stroke="#1E1B4B" strokeWidth="0.8" />

          {/* Shaded Area under wave */}
          <path
            d="M 12 65 Q 70 60 120 40 T 200 24 T 276 12 L 276 74 L 12 74 Z"
            fill="url(#proWaveArea)"
          />
          {/* Wave Line */}
          <path
            d="M 12 65 Q 70 60 120 40 T 200 24 T 276 12"
            stroke="#A855F7"
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
          />
          {/* Secondary dotted comparison line */}
          <path
            d="M 12 70 Q 80 54 140 48 T 220 34 T 276 22"
            stroke="#6366F1"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="4 4"
          />

          <circle cx="276" cy="12" r="4.5" fill="#C084FC" stroke="#FFFFFF" strokeWidth="1.5" />
          <text x="12" y="74" fill="#64748B" fontSize="7.5" fontFamily="monospace">0.0 Epoch</text>
          <text x="216" y="74" fill="#34D399" fontSize="7.5" fontFamily="monospace">Converged &bull; 12ms</text>
        </g>
      </svg>
    </div>
  );
}

// =========================================================================
// 04. CORPORATE CUSTOMERS — WORKFORCE 360 TALENT & GOVERNANCE SCORECARD
// Visual Concept: Executive corporate cohort dashboard with team progress
// bars, ROI +340% chip, and ISO 9001:2015 accreditation seal in teal & amber.
// =========================================================================
export function CorporateCustomerIllustration({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative w-full max-w-[340px] aspect-[16/11] flex items-center justify-center select-none ${className}`}
      aria-label="Enterprise workforce talent scorecard and governance dashboard"
    >
      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm transition-transform duration-300 group-hover:scale-[1.02]"
      >
        <defs>
          <linearGradient id="corpCardBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#042F2E" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>

        {/* Base Container Window */}
        <rect x="1" y="1" width="318" height="218" rx="16" fill="url(#corpCardBg)" stroke="#115E59" strokeWidth="1.2" />

        {/* Header Bar */}
        <rect x="1" y="1" width="318" height="36" rx="16" fill="#134E4A" fillOpacity="0.8" />
        <rect x="1" y="24" width="318" height="13" fill="#134E4A" fillOpacity="0.8" />
        <line x1="1" y1="37" x2="319" y2="37" stroke="#115E59" strokeWidth="0.8" />

        {/* Shield Icon */}
        <path
          d="M 16 12 L 23 8 L 30 12 V 18 C 30 23 23 27 23 27 C 23 27 16 23 16 18 Z"
          fill="#F59E0B"
        />
        <text x="36" y="22" fill="#CCFBF1" fontSize="10" fontWeight="700" fontFamily="system-ui, sans-serif">
          WORKFORCE 360 COHORT
        </text>

        <rect x="238" y="9" width="68" height="18" rx="9" fill="#F59E0B" />
        <text x="246" y="21.5" fill="#78350F" fontSize="8.5" fontWeight="800" fontFamily="system-ui, sans-serif">
          ROI +340%
        </text>

        {/* Team Cohort Rows */}
        <g transform="translate(16, 50)">
          {/* Row 1: AI & LLMOps Team */}
          <rect x="0" y="0" width="288" height="42" rx="8" fill="#134E4A" fillOpacity="0.4" stroke="#115E59" strokeWidth="0.8" />
          <circle cx="20" cy="21" r="11" fill="#14B8A6" />
          <text x="15" y="25" fill="#FFFFFF" fontSize="9" fontWeight="800" fontFamily="system-ui">AI</text>
          <text x="38" y="18" fill="#FFFFFF" fontSize="10.5" fontWeight="600" fontFamily="system-ui">AI &amp; LLMOps Engineering</text>
          <text x="38" y="30" fill="#99F6E4" fontSize="8.5" fontFamily="system-ui">32 Engineers &bull; Advanced Track</text>
          <rect x="200" y="16" width="76" height="10" rx="5" fill="#042F2E" />
          <rect x="200" y="16" width="65" height="10" rx="5" fill="#14B8A6" />

          {/* Row 2: Data Analytics Team */}
          <rect x="0" y="48" width="288" height="42" rx="8" fill="#134E4A" fillOpacity="0.4" stroke="#115E59" strokeWidth="0.8" />
          <circle cx="20" cy="69" r="11" fill="#F59E0B" />
          <text x="14" y="73" fill="#FFFFFF" fontSize="9" fontWeight="800" fontFamily="system-ui">DA</text>
          <text x="38" y="66" fill="#FFFFFF" fontSize="10.5" fontWeight="600" fontFamily="system-ui">Data Analytics &amp; BI Track</text>
          <text x="38" y="78" fill="#FDE68A" fontSize="8.5" fontFamily="system-ui">24 Analysts &bull; Power BI &amp; SQL</text>
          <rect x="200" y="64" width="76" height="10" rx="5" fill="#042F2E" />
          <rect x="200" y="64" width="55" height="10" rx="5" fill="#F59E0B" />

          {/* Row 3: Cloud & DevOps Team */}
          <rect x="0" y="96" width="288" height="42" rx="8" fill="#134E4A" fillOpacity="0.4" stroke="#115E59" strokeWidth="0.8" />
          <circle cx="20" cy="117" r="11" fill="#0284C7" />
          <text x="14" y="121" fill="#FFFFFF" fontSize="9" fontWeight="800" fontFamily="system-ui">CL</text>
          <text x="38" y="114" fill="#FFFFFF" fontSize="10.5" fontWeight="600" fontFamily="system-ui">Cloud &amp; DevOps Practice</text>
          <text x="38" y="126" fill="#BAE6FD" fontSize="8.5" fontFamily="system-ui">18 Practitioners &bull; Multi-Cloud</text>
          <rect x="200" y="112" width="76" height="10" rx="5" fill="#042F2E" />
          <rect x="200" y="112" width="68" height="10" rx="5" fill="#0284C7" />
        </g>

        {/* Governance & SLA Footer */}
        <g transform="translate(16, 194)">
          <rect x="0" y="0" width="288" height="20" rx="5" fill="#0F766E" fillOpacity="0.4" stroke="#115E59" strokeWidth="0.6" />
          <circle cx="12" cy="10" r="3" fill="#34D399" />
          <text x="22" y="13.5" fill="#CCFBF1" fontSize="8" fontWeight="600" fontFamily="system-ui">
            ISO 9001:2015 Accredited Enterprise Sandbox &bull; Flexible Scheduling
          </text>
        </g>
      </svg>
    </div>
  );
}
