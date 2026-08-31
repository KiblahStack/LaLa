import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { SearchIcon } from 'lucide-react';
import { banners, priceOptions, propertyTypes, towns } from '../data/homeData';

function SearchField({
  label,
  options,
  value,
  onChange





}: {label: string;options: string[];value: string;onChange: (v: string) => void;}) {
  const id = `search-${label.replace(/[^a-z]/gi, '').toLowerCase()}`;
  return (
    <div className="flex min-w-0 flex-1 flex-col px-4 py-2.5">
      <label htmlFor={id} className="text-[11px] font-medium text-slate-500">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full cursor-pointer appearance-none truncate bg-transparent pr-5 text-sm font-semibold text-brand-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
        style={{
          backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23132f5f' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right center'
        }}>
        
        {options.map((o) =>
        <option key={o} value={o}>
            {o}
          </option>
        )}
      </select>
    </div>);

}

export function HeroSlider() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [type, setType] = useState(propertyTypes[0]);
  const [town, setTown] = useState(towns[0]);
  const [price, setPrice] = useState(priceOptions[0]);

  useEffect(() => {
    const timer = window.setInterval(
      () => setIndex((i) => (i + 1) % banners.length),
      6500
    );
    return () => window.clearInterval(timer);
  }, []);

  const banner = banners[index];

  return (
    <section id="find" className="relative w-full bg-brand-navy" aria-label="Search rentals">
      <div className="relative h-[460px] w-full overflow-hidden sm:h-[480px] lg:h-[440px]">
        <AnimatePresence initial={false} mode="sync">
          <motion.img
            key={banner.id}
            src={banner.image}
            alt=""
            aria-hidden="true"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute inset-0 h-full w-full object-cover" />
          
        </AnimatePresence>
        <div
          className="absolute inset-0"
          style={{
            background:
            'linear-gradient(90deg, rgba(14,36,71,0.97) 0%, rgba(14,36,71,0.92) 34%, rgba(14,36,71,0.35) 68%, rgba(14,36,71,0.15) 100%)'
          }} />
        

        <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-4 pb-24 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="max-w-xl">
              
              <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl">
                {banner.headingLead}
                <br />
                <span className="text-brand-orange">{banner.headingAccent}</span>{' '}
                {banner.headingTail}
              </h1>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/80">
                {banner.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex gap-2" role="tablist" aria-label="Banner slides">
            {banners.map((b, i) =>
            <button
              key={b.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
              i === index ? 'w-8 bg-brand-orange' : 'w-4 bg-white/40 hover:bg-white/70'}`
              } />

            )}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 translate-y-1/2 px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const query = new URLSearchParams({ type, town, price });
            navigate(`/find?${query.toString()}`);
          }}
          className="mx-auto w-full max-w-7xl"
          aria-label="Search accommodation">
          
          <div className="w-full max-w-3xl rounded-2xl bg-white p-2 shadow-float">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
              <SearchField
                label="What are you looking for?"
                options={propertyTypes}
                value={type}
                onChange={setType} />
              
              <span className="hidden h-9 w-px bg-slate-200 sm:block" />
              <SearchField label="Where?" options={towns} value={town} onChange={setTown} />
              <span className="hidden h-9 w-px bg-slate-200 sm:block" />
              <SearchField
                label="Max Price"
                options={priceOptions}
                value={price}
                onChange={setPrice} />
              
              <button
                type="submit"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-navyDark">
                
                <SearchIcon className="h-4 w-4" />
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>);

}