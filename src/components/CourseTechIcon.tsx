'use client';

import React from 'react';
import Image from 'next/image';
import { CategoryAccent } from '@/data/programs';

export type TechIconType =
  | 'excel'
  | 'sql'
  | 'power-bi'
  | 'tableau'
  | 'data-analytics'
  | 'python'
  | 'ai-ml'
  | 'data-science'
  | 'ai-engineer'
  | 'agentic-ai'
  | 'azure-devops'
  | 'business-analyst';

interface CourseTechIconProps {
  type: TechIconType;
  accent?: CategoryAccent;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showGlow?: boolean;
}

const REAL_TECH_LOGOS: Record<
  TechIconType,
  { src: string; alt: string }
> = {
  excel: {
    src: '/logos/tools/excel.svg',
    alt: 'Microsoft Excel',
  },
  sql: {
    src: '/logos/tools/postgresql.svg',
    alt: 'SQL (PostgreSQL)',
  },
  'power-bi': {
    src: '/logos/tools/powerbi.svg',
    alt: 'Microsoft Power BI',
  },
  tableau: {
    src: '/logos/tools/tableau.svg',
    alt: 'Tableau',
  },
  'data-analytics': {
    src: '/logos/tools/pandas.svg',
    alt: 'Pandas & Data Analytics',
  },
  python: {
    src: '/logos/tools/python.svg',
    alt: 'Python',
  },
  'ai-ml': {
    src: '/logos/tools/scikit-learn.svg',
    alt: 'Scikit-Learn Machine Learning',
  },
  'data-science': {
    src: '/logos/tools/jupyter.svg',
    alt: 'Jupyter & Data Science',
  },
  'ai-engineer': {
    src: '/logos/tools/openai.svg',
    alt: 'OpenAI AI Engineer',
  },
  'agentic-ai': {
    src: '/logos/tools/langchain.svg',
    alt: 'LangChain Agentic AI',
  },
  'azure-devops': {
    src: '/logos/tools/azure-devops.svg',
    alt: 'Microsoft Azure DevOps',
  },
  'business-analyst': {
    src: '/logos/tools/jira.svg',
    alt: 'Atlassian Jira Business Analyst',
  },
};

export function CourseTechIcon({
  type,
  size = 'lg',
  className = '',
}: CourseTechIconProps) {
  const logo = REAL_TECH_LOGOS[type] || REAL_TECH_LOGOS.python;

  // Sizing configurations - 100% border-free & container-free real brand logos
  const sizeMap = {
    sm: {
      container: 'w-7 h-7 sm:w-8 sm:h-8',
      iconSize: 28,
      iconClass: 'w-6 h-6 sm:w-7 sm:h-7',
    },
    md: {
      container: 'w-9 h-9 sm:w-10 sm:h-10',
      iconSize: 36,
      iconClass: 'w-8 h-8 sm:w-9 sm:h-9',
    },
    lg: {
      container: 'w-12 h-12 sm:w-14 sm:h-14',
      iconSize: 44,
      iconClass: 'w-10 h-10 sm:w-12 sm:h-12',
    },
    xl: {
      container: 'w-16 h-16',
      iconSize: 56,
      iconClass: 'w-14 h-14',
    },
  }[size];

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 transition-transform duration-200 bg-transparent ${sizeMap.container} ${className}`}
      aria-hidden="true"
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        width={sizeMap.iconSize}
        height={sizeMap.iconSize}
        className={`${sizeMap.iconClass} object-contain`}
        unoptimized
      />
    </div>
  );
}
