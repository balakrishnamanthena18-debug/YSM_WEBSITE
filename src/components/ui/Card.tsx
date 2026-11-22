import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
}

export function Card({
  className,
  children,
  hoverable = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-white border border-[#071B1C]/8 p-6 sm:p-8 transition-all duration-300',
        hoverable &&
          'hover:border-[#006B68]/30 hover:shadow-lg hover:shadow-[#006B68]/5 hover:-translate-y-0.5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
