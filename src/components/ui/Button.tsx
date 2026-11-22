import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B68]/40 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none';

  const variants = {
    primary:
      'bg-[#176B68] text-white hover:bg-[#104E4D] active:scale-[0.98] shadow-sm hover:shadow-md hover:shadow-[#176B68]/15',
    secondary:
      'bg-[#102E2D] text-white hover:bg-[#104E4D] active:scale-[0.98] shadow-sm',
    outline:
      'border border-[#176B68]/30 text-[#176B68] hover:border-[#176B68] hover:bg-[#F5F9F8] active:scale-[0.98]',
    ghost:
      'text-[#111817] hover:text-[#176B68] hover:bg-[#F5F9F8] active:scale-[0.98]',
    accent:
      'bg-[#16B6B8] text-white hover:bg-[#176B68] active:scale-[0.98] font-semibold shadow-sm',
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
