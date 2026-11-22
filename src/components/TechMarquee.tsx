'use client';

import React from 'react';

export interface TechLogoItem {
  id: string;
  name: string;
  hoverColor: string;
  renderIcon: () => React.ReactNode;
}

export const TECH_LOGOS: TechLogoItem[] = [
  // 1. Microsoft
  {
    id: 'microsoft',
    name: 'Microsoft',
    hoverColor: 'hover:text-[#00A4EF]',
    renderIcon: () => (
      <div className="grid grid-cols-2 gap-0.5 w-4 h-4 shrink-0" aria-hidden="true">
        <span className="bg-[#F25022] rounded-[1px]" />
        <span className="bg-[#7FBA00] rounded-[1px]" />
        <span className="bg-[#00A4EF] rounded-[1px]" />
        <span className="bg-[#FFB900] rounded-[1px]" />
      </div>
    ),
  },

  // 2. AWS
  {
    id: 'aws',
    name: 'AWS',
    hoverColor: 'hover:text-[#FF9900]',
    renderIcon: () => (
      <svg className="w-5 h-4 shrink-0 text-[#232F3E]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.92 11.24c-.11-.08-.24-.13-.39-.13-.35 0-.58.26-.58.64 0 .37.21.61.57.61.16 0 .29-.05.4-.14v-1.02l-.01.04zm3.98-6.19c.17 0 .31.14.31.31v1.65c0 .17-.14.31-.31.31H7.1c-.17 0-.31-.14-.31-.31V5.36c0-.17.14-.31.31-.31h9.8zm-1.89 6.19c-.11-.08-.24-.13-.39-.13-.35 0-.58.26-.58.64 0 .37.21.61.57.61.16 0 .29-.05.4-.14v-1.02l-.01.04zM2.84 15.65c3.2 2.37 7.73 3.6 12.01 3.6 3.48 0 7.37-.87 10.36-2.61.32-.19.49-.6.37-.96-.13-.36-.48-.59-.86-.59-.12 0-.25.03-.36.09-2.73 1.57-6.27 2.35-9.48 2.35-3.89 0-8.01-1.12-10.9-3.26-.26-.19-.62-.18-.87.03-.25.21-.3.58-.11.87l-.16.48zm20.89-1.28c-.1-.13-.26-.21-.43-.21-.06 0-.13.01-.19.04-.64.3-1.63.46-2.39.46-.24 0-.46-.02-.67-.05l-.13-.02c-.22 0-.41.15-.46.37-.05.21.06.44.27.52.33.12.72.18 1.15.18.91 0 1.95-.2 2.72-.56.2-.1.3-.32.25-.53l-.12-.2z" fill="#FF9900" />
      </svg>
    ),
  },

  // 3. Google Cloud
  {
    id: 'google-cloud',
    name: 'Google Cloud',
    hoverColor: 'hover:text-[#4285F4]',
    renderIcon: () => (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#4285F4" fillOpacity="0.15" />
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" stroke="#4285F4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },

  // 4. Microsoft Azure
  {
    id: 'azure',
    name: 'Microsoft Azure',
    hoverColor: 'hover:text-[#0078D4]',
    renderIcon: () => (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M13.05 3.5L5.5 16.5H10.8L13.05 3.5Z" fill="#0078D4" />
        <path d="M13.05 3.5L10.2 14.2L16.2 20.5H22L13.05 3.5Z" fill="#50E6FF" fillOpacity="0.8" />
        <path d="M2 20.5H17.5L14.7 15.8H6.5L2 20.5Z" fill="#0078D4" />
      </svg>
    ),
  },

  // 5. Python
  {
    id: 'python',
    name: 'Python',
    hoverColor: 'hover:text-[#3776AB]',
    renderIcon: () => (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2C6.5 2 7 4.5 7 4.5V7H12V8.5H5C2 8.5 2 12 2 12C2 15 4 15 4 15H6V13C6 11 8 11 8 11H13C15 11 15 9 15 9V4.5C15 4.5 15.5 2 12 2ZM9.5 4C10 4 10.5 4.5 10.5 5C10.5 5.5 10 6 9.5 6C9 6 8.5 5.5 8.5 5C8.5 4.5 9 4 9.5 4Z" fill="#3776AB"/>
        <path d="M12 22C17.5 22 17 19.5 17 19.5V17H12V15.5H19C22 15.5 22 12 22 12C22 9 20 9 20 9H18V11C18 13 16 13 16 13H11C9 13 9 15 9 15V19.5C9 19.5 8.5 22 12 22ZM14.5 20C14 20 13.5 19.5 13.5 19C13.5 18.5 14 18 14.5 18C15 18 15.5 18.5 15.5 19C15.5 19.5 15 20 14.5 20Z" fill="#FFD43B"/>
      </svg>
    ),
  },

  // 6. Snowflake
  {
    id: 'snowflake',
    name: 'Snowflake',
    hoverColor: 'hover:text-[#29B5E8]',
    renderIcon: () => (
      <svg className="w-4 h-4 shrink-0 text-[#29B5E8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
        <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" />
      </svg>
    ),
  },

  // 7. Databricks
  {
    id: 'databricks',
    name: 'Databricks',
    hoverColor: 'hover:text-[#FF3621]',
    renderIcon: () => (
      <span className="w-3.5 h-3.5 rotate-45 bg-[#FF3621] shrink-0 rounded-[1px] shadow-xs" aria-hidden="true" />
    ),
  },

  // 8. Microsoft Excel
  {
    id: 'excel',
    name: 'Microsoft Excel',
    hoverColor: 'hover:text-[#107C41]',
    renderIcon: () => (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="#107C41" />
        <path d="M7.5 7.5L16.5 16.5M16.5 7.5L7.5 16.5" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },

  // 9. Power BI
  {
    id: 'power-bi',
    name: 'Power BI',
    hoverColor: 'hover:text-[#D97706]',
    renderIcon: () => (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="12" width="3.5" height="9" rx="1" fill="#F59E0B" />
        <rect x="10" y="8" width="3.5" height="13" rx="1" fill="#D97706" />
        <rect x="16" y="4" width="3.5" height="17" rx="1" fill="#B45309" />
      </svg>
    ),
  },

  // 10. Tableau
  {
    id: 'tableau',
    name: 'Tableau',
    hoverColor: 'hover:text-[#E97627]',
    renderIcon: () => (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2v5M12 17v5M2 12h5M17 12h5" stroke="#E97627" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M6 6l2.5 2.5M15.5 15.5l2.5 2.5M6 18l2.5-2.5M15.5 8.5l2.5-2.5" stroke="#4E79A7" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="12" r="2" fill="#59A14F" />
      </svg>
    ),
  },

  // 11. PostgreSQL
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    hoverColor: 'hover:text-[#336791]',
    renderIcon: () => (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#336791" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.25 2.66 7.88 6.4 9.32.14.05.28-.05.28-.2v-2.12c0-.5-.22-.97-.6-1.28-1.55-1.25-2.58-3.17-2.58-5.32 0-3.86 3.14-7 7-7s7 3.14 7 7c0 2.15-1.03 4.07-2.58 5.32-.38.31-.6.78-.6 1.28v2.12c0 .15.14.25.28.2 3.74-1.44 6.4-5.07 6.4-9.32 0-5.52-4.48-10-10-10z" />
        <circle cx="9" cy="11" r="1" fill="#336791" />
        <circle cx="15" cy="11" r="1" fill="#336791" />
      </svg>
    ),
  },

  // 12. MySQL
  {
    id: 'mysql',
    name: 'MySQL',
    hoverColor: 'hover:text-[#00758F]',
    renderIcon: () => (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 18C4 18 6 12 12 12C18 12 20 18 20 18" stroke="#00758F" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M12 12V4C12 4 16 6 16 10" stroke="#F29111" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },

  // 13. OpenAI
  {
    id: 'openai',
    name: 'OpenAI',
    hoverColor: 'hover:text-[#10A37F]',
    renderIcon: () => (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22.28 9.37a5.98 5.98 0 0 0-.52-4.94 6.07 6.07 0 0 0-6.49-2.91 6.04 6.04 0 0 0-4.63-2.1c-2.4 0-4.54 1.4-5.5 3.53a6.05 6.05 0 0 0-4.22 3.06 6.02 6.02 0 0 0 .8 7.07 6.04 6.04 0 0 0 .52 4.94 6.07 6.07 0 0 0 6.49 2.91 6.05 6.05 0 0 0 4.63 2.1c2.4 0 4.54-1.4 5.5-3.53a6.05 6.05 0 0 0 4.22-3.06 6.02 6.02 0 0 0-.8-7.07zm-9.76 11.83c-.88 0-1.73-.24-2.47-.7l.15-.08 4.1-2.37a.89.89 0 0 0 .45-.77v-5.78l1.73 1a.1.1 0 0 1 .05.08v4.75c0 2.14-1.74 3.87-4.01 3.87zm-7.66-3.8c-.54-.94-.8-2-.76-3.08l.15.09 4.1 2.37c.28.16.62.16.9 0l5.01-2.89v2a.1.1 0 0 1-.04.09l-4.11 2.38c-1.85 1.07-4.24.44-5.25-1.4z" fill="#10A37F" />
      </svg>
    ),
  },

  // 14. PyTorch
  {
    id: 'pytorch',
    name: 'PyTorch',
    hoverColor: 'hover:text-[#EE4C2C]',
    renderIcon: () => (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M13.5 3.5L16 6L13.5 8.5" stroke="#EE4C2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="16.5" cy="5.5" r="1.5" fill="#EE4C2C" />
        <path d="M12 7C8.13 7 5 10.13 5 14C5 17.87 8.13 21 12 21C15.87 21 19 17.87 19 14" stroke="#EE4C2C" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },

  // 15. TensorFlow
  {
    id: 'tensorflow',
    name: 'TensorFlow',
    hoverColor: 'hover:text-[#FF6F00]',
    renderIcon: () => (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2L3 7.5V17L12 22L21 17V7.5L12 2Z" stroke="#FF6F00" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M12 2V22M3 7.5L21 17M21 7.5L3 17" stroke="#FFA800" strokeWidth="1.2" strokeOpacity="0.7" />
      </svg>
    ),
  },

  // 16. Hugging Face
  {
    id: 'hugging-face',
    name: 'Hugging Face',
    hoverColor: 'hover:text-[#FFD21E]',
    renderIcon: () => (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill="#FFD21E" fillOpacity="0.25" stroke="#EAB308" strokeWidth="1.8" />
        <circle cx="9" cy="10" r="1.5" fill="#854D0E" />
        <circle cx="15" cy="10" r="1.5" fill="#854D0E" />
        <path d="M8.5 14.5C9.5 16.5 14.5 16.5 15.5 14.5" stroke="#854D0E" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },

  // 17. Docker
  {
    id: 'docker',
    name: 'Docker',
    hoverColor: 'hover:text-[#2496ED]',
    renderIcon: () => (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="9" width="3" height="3" rx="0.5" fill="#2496ED" />
        <rect x="6" y="9" width="3" height="3" rx="0.5" fill="#2496ED" />
        <rect x="10" y="9" width="3" height="3" rx="0.5" fill="#2496ED" />
        <rect x="6" y="5" width="3" height="3" rx="0.5" fill="#2496ED" />
        <rect x="10" y="5" width="3" height="3" rx="0.5" fill="#2496ED" />
        <path d="M1 13C1 13 3 19 12 19C21 19 23 13 23 13H1Z" fill="#2496ED" />
      </svg>
    ),
  },

  // 18. Kubernetes
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    hoverColor: 'hover:text-[#326CE5]',
    renderIcon: () => (
      <svg className="w-4 h-4 shrink-0 text-[#326CE5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
      </svg>
    ),
  },

  // 19. Terraform
  {
    id: 'terraform',
    name: 'Terraform',
    hoverColor: 'hover:text-[#844FBA]',
    renderIcon: () => (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <polygon points="8,2 14,5.5 14,12.5 8,9" fill="#844FBA" />
        <polygon points="15,6 21,9.5 21,16.5 15,13" fill="#844FBA" fillOpacity="0.75" />
        <polygon points="8,10 14,13.5 14,20.5 8,17" fill="#844FBA" fillOpacity="0.85" />
        <polygon points="1,6 7,9.5 7,16.5 1,13" fill="#844FBA" />
      </svg>
    ),
  },

  // 20. TypeScript
  {
    id: 'typescript',
    name: 'TypeScript',
    hoverColor: 'hover:text-[#3178C6]',
    renderIcon: () => (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="4" fill="#3178C6" />
        <path d="M7 9H13M10 9V17" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 15C14.5 16 15.5 17 17 17C18.5 17 19.5 16 19.5 14.5C19.5 13 18.5 12.5 17 12C15.5 11.5 14.5 11 14.5 9.5C14.5 8 15.5 7 17 7C18.5 7 19.2 8 19.5 9" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },

  // 21. GitHub
  {
    id: 'github',
    name: 'GitHub',
    hoverColor: 'hover:text-[#071B1C]',
    renderIcon: () => (
      <svg className="w-4 h-4 shrink-0 text-[#24292F]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
];

export function TechMarquee() {
  return (
    <div
      className="relative w-full overflow-hidden select-none group py-4 sm:py-5 border-y border-[#E3ECEA] bg-[#F5F9F8]"
      aria-label="Industry-Relevant Technologies Marquee"
    >
      {/* Left Gradient Edge Mask */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-36 bg-gradient-to-r from-[#F5F9F8] via-[#F5F9F8]/80 to-transparent z-10"
        aria-hidden="true"
      />

      {/* Right Gradient Edge Mask */}
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-36 bg-gradient-to-l from-[#F5F9F8] via-[#F5F9F8]/80 to-transparent z-10"
        aria-hidden="true"
      />

      {/* Scrolling Track Container with Hover Pause */}
      <div className="flex w-max animate-marquee-scroll group-hover:[animation-play-state:paused]">
        {/* Sequence 1: Accessible to Screen Readers */}
        <div className="flex items-center gap-7 sm:gap-9 md:gap-11 pr-7 sm:pr-9 md:pr-11 shrink-0">
          {TECH_LOGOS.map((tech) => (
            <div
              key={`tech-1-${tech.id}`}
              className={`flex items-center gap-2 group/item cursor-pointer transition-transform duration-200 hover:scale-[1.06] active:scale-[0.98] opacity-85 hover:opacity-100 ${tech.hoverColor}`}
              title={tech.name}
            >
              {tech.renderIcon()}
              <span className="text-sm font-semibold tracking-tight text-[#586765] group-hover/item:text-[#176B68] transition-colors whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </div>

        {/* Sequence 2: Identical Duplication for Seamless Infinite Looping (Hidden from Screen Readers) */}
        <div
          className="flex items-center gap-7 sm:gap-9 md:gap-11 pr-7 sm:pr-9 md:pr-11 shrink-0"
          aria-hidden="true"
        >
          {TECH_LOGOS.map((tech) => (
            <div
              key={`tech-2-${tech.id}`}
              className={`flex items-center gap-2 group/item cursor-pointer transition-transform duration-200 hover:scale-[1.06] active:scale-[0.98] opacity-85 hover:opacity-100 ${tech.hoverColor}`}
              title={tech.name}
            >
              {tech.renderIcon()}
              <span className="text-sm font-semibold tracking-tight text-[#586765] group-hover/item:text-[#176B68] transition-colors whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

