import React from 'react';

type LalaLogoProps = {
  variant?: 'navy' | 'light';
  withTagline?: boolean;
  className?: string;
};

export function LalaLogo({
  variant = 'navy',
  withTagline = false,
  className = ''
}: LalaLogoProps) {
  const mark = variant === 'navy' ? '#132f5f' : '#ffffff';

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 44 26"
        aria-hidden="true"
        className="h-6 w-10 shrink-0"
        fill="none">
        
        <rect x="1" y="10" width="42" height="12" rx="4" stroke={mark} strokeWidth="2.5" />
        <rect x="6" y="3" width="14" height="7" rx="2.5" stroke={mark} strokeWidth="2.5" />
        <path d="M24 10V3.5" stroke={mark} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M30 10V3.5" stroke={mark} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M36 10V3.5" stroke={mark} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className="text-2xl font-extrabold tracking-tight"
          style={{ color: mark }}>
          
          lal<span className="text-brand-orange">a</span>
        </span>
        {withTagline &&
        <span
          className="mt-0.5 text-[7px] font-semibold tracking-[0.28em]"
          style={{ color: mark, opacity: 0.75 }}>
          
            FIND. MOVE. LALA.
          </span>
        }
      </span>
      <span className="sr-only">Lala Namibia</span>
    </span>);

}