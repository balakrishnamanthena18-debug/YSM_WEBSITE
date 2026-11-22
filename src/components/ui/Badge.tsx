import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'teal' | 'subtle' | 'accent' | 'dark';
  children: React.ReactNode;
}

export function Badge({
  variant = 'teal',
  className,
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium tracking-wide rounded-full transition-colors duration-200';

  const variants = {
    teal: 'bg-[#16B6B8]/10 text-[#176B68] border border-[#16B6B8]/20',
    subtle: 'bg-[#F5F9F8] text-[#586765] border border-[#E3ECEA]',
    accent: 'bg-[#5BC4CC]/15 text-[#104E4D] border border-[#5BC4CC]/40',
    dark: 'bg-[#102E2D] text-white border border-white/10',
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </span>
  );
}
