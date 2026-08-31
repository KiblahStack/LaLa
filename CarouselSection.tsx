import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

type CarouselSectionProps = {
  id?: string;
  title: string;
  viewAllLabel: string;
  viewAllTo: string;
  tone?: 'white' | 'canvas';
  children: React.ReactNode;
};

export function CarouselSection({
  id,
  title,
  viewAllLabel,
  viewAllTo,
  tone = 'white',
  children
}: CarouselSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const headingId = `${title.replace(/[^a-z]/gi, '-').toLowerCase()}-heading`;

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * (track.clientWidth * 0.8), behavior: 'smooth' });
  };

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`w-full py-14 ${tone === 'canvas' ? 'bg-brand-canvas' : 'bg-white'}`}>
      
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 id={headingId} className="text-xl font-extrabold text-brand-navy sm:text-2xl">
            {title}
          </h2>
          <Link
            to={viewAllTo}
            className="group inline-flex shrink-0 items-center gap-2 text-[13px] font-semibold text-brand-orange">
            
            {viewAllLabel}
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="relative mt-6">
          <div
            ref={trackRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-2 pt-1">
            
            {children}
          </div>

          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scrollBy(-1)}
            className="absolute -left-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-navy shadow-card ring-1 ring-slate-100 transition-colors hover:bg-brand-navy hover:text-white lg:flex">
            
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollBy(1)}
            className="absolute -right-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-navy shadow-card ring-1 ring-slate-100 transition-colors hover:bg-brand-navy hover:text-white lg:flex">
            
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>);

}