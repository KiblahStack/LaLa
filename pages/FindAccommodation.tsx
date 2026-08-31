import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchXIcon, SlidersHorizontalIcon } from 'lucide-react';
import { PropertyCard } from '../components/PropertyCard';
import { useData } from '../context/DataContext';
import {
  availabilityOptions,
  bedroomOptions,
  priceCeilings,
  priceOptions,
  propertyTypes,
  suburbsByTown,
  towns } from
'../data/homeData';

type SortKey = 'newest' | 'low' | 'high';

function FilterSelect({
  label,
  value,
  options,
  onChange





}: {label: string;value: string;options: string[];onChange: (v: string) => void;}) {
  const id = `filter-${label.replace(/[^a-z]/gi, '').toLowerCase()}`;
  return (
    <div>
      <label htmlFor={id} className="block text-[11px] font-semibold text-brand-navy">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] font-medium text-brand-navy focus:border-brand-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/40">
        
        {options.map((o) =>
        <option key={o} value={o}>
            {o}
          </option>
        )}
      </select>
    </div>);

}

export function FindAccommodation() {
  const [params] = useSearchParams();
  const { listings } = useData();
  const [type, setType] = useState(params.get('type') ?? propertyTypes[0]);
  const [town, setTown] = useState(params.get('town') ?? towns[0]);
  const [suburb, setSuburb] = useState('All Suburbs');
  const [price, setPrice] = useState(params.get('price') ?? priceOptions[0]);
  const [bedrooms, setBedrooms] = useState(bedroomOptions[0]);
  const [availability, setAvailability] = useState(availabilityOptions[0]);
  const [sort, setSort] = useState<SortKey>('newest');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const suburbOptions = useMemo(
    () => ['All Suburbs', ...(town !== 'All Areas' ? suburbsByTown[town] ?? [] : [])],
    [town]
  );

  const results = useMemo(() => {
    const ceiling = priceCeilings[price] ?? Infinity;
    const floor = price === 'N$ 12,000+' ? 12000 : 0;

    const filtered = listings.filter((l) => {
      if (type !== 'All Types' && l.type !== type) return false;
      if (town !== 'All Areas' && l.town !== town) return false;
      if (suburb !== 'All Suburbs' && l.suburb !== suburb) return false;
      if (l.rent > ceiling || l.rent < floor) return false;
      if (bedrooms !== 'Any') {
        if (bedrooms === '4+' ? l.bedrooms < 4 : l.bedrooms !== Number(bedrooms)) return false;
      }
      if (availability !== 'All' && l.status !== availability) return false;
      return true;
    });

    if (sort === 'low') return [...filtered].sort((a, b) => a.rent - b.rent);
    if (sort === 'high') return [...filtered].sort((a, b) => b.rent - a.rent);
    return filtered;
  }, [listings, type, town, suburb, price, bedrooms, availability, sort]);

  const reset = () => {
    setType(propertyTypes[0]);
    setTown(towns[0]);
    setSuburb('All Suburbs');
    setPrice(priceOptions[0]);
    setBedrooms(bedroomOptions[0]);
    setAvailability(availabilityOptions[0]);
  };

  const filterPanel =
  <div className="space-y-4">
      <FilterSelect label="Property type" value={type} options={propertyTypes} onChange={setType} />
      <FilterSelect
      label="Town"
      value={town}
      options={towns}
      onChange={(v) => {
        setTown(v);
        setSuburb('All Suburbs');
      }} />
    
      <FilterSelect label="Suburb" value={suburb} options={suburbOptions} onChange={setSuburb} />
      <FilterSelect label="Budget" value={price} options={priceOptions} onChange={setPrice} />
      <FilterSelect
      label="Bedrooms"
      value={bedrooms}
      options={bedroomOptions}
      onChange={setBedrooms} />
    
      <FilterSelect
      label="Availability"
      value={availability}
      options={availabilityOptions}
      onChange={setAvailability} />
    
      <button
      type="button"
      onClick={reset}
      className="w-full rounded-lg border border-slate-200 px-4 py-2 text-[13px] font-semibold text-brand-navy transition-colors hover:bg-brand-blueSoft">
      
        Clear filters
      </button>
    </div>;


  return (
    <div className="w-full bg-brand-canvas">
      <div className="bg-brand-navy py-10">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold text-white sm:text-3xl">Find Accommodation</h1>
          <p className="mt-2 max-w-lg text-sm text-white/70">
            Browsing and searching is always free. You only use a connect credit when you reveal a
            landlord's contact details.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="lg:w-64 lg:shrink-0" aria-label="Search filters">
            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              aria-expanded={filtersOpen}
              className="mb-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-brand-navy lg:hidden">
              
              <SlidersHorizontalIcon className="h-4 w-4" />
              {filtersOpen ? 'Hide filters' : 'Show filters'}
            </button>
            <div
              className={`rounded-2xl bg-white p-5 shadow-card ring-1 ring-slate-100 ${
              filtersOpen ? 'block' : 'hidden lg:block'}`
              }>
              
              <h2 className="mb-4 text-sm font-bold text-brand-navy">Filters</h2>
              {filterPanel}
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[13px] text-slate-500">
                <span className="font-bold text-brand-navy">{results.length}</span>{' '}
                {results.length === 1 ? 'property' : 'properties'} found
              </p>
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-[12px] font-medium text-slate-500">
                  Sort by
                </label>
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] font-medium text-brand-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/40">
                  
                  <option value="newest">Newest</option>
                  <option value="low">Price: low to high</option>
                  <option value="high">Price: high to low</option>
                </select>
              </div>
            </div>

            {results.length > 0 ?
            <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((listing) =>
              <PropertyCard key={listing.id} listing={listing} />
              )}
              </div> :

            <div className="mt-5 flex flex-col items-center rounded-2xl bg-white px-6 py-16 text-center shadow-card ring-1 ring-slate-100">
                <SearchXIcon className="h-8 w-8 text-slate-300" />
                <h3 className="mt-4 text-sm font-bold text-brand-navy">
                  No properties match your search
                </h3>
                <p className="mt-2 max-w-sm text-[13px] text-slate-500">
                  Try widening your budget or removing a filter — or post a rental request and let
                  landlords come to you.
                </p>
                <button
                type="button"
                onClick={reset}
                className="mt-5 rounded-lg bg-brand-navy px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-brand-navyDark">
                
                  Clear all filters
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>);

}