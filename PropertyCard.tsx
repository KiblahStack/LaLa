import React from 'react';
import { Link } from 'react-router-dom';
import { BathIcon, BedIcon, CarIcon, HeartIcon } from 'lucide-react';
import { type Listing } from '../data/homeData';
import { useConnect } from '../context/ConnectContext';

type PropertyCardProps = {
  listing: Listing;
  layout?: 'carousel' | 'grid';
};

export function PropertyCard({ listing, layout = 'grid' }: PropertyCardProps) {
  const { isFavourite, toggleFavourite, hasConnected } = useConnect();
  const saved = isFavourite(listing.id);
  const unlocked = hasConnected(listing.landlordId);

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-slate-100 transition-transform hover:-translate-y-1 ${
      layout === 'carousel' ? 'w-[260px] shrink-0 snap-start sm:w-[280px]' : 'w-full'}`
      }>
      
      <div className="relative h-[150px] w-full overflow-hidden">
        <img
          src={listing.images[0]}
          alt={`${listing.title} in ${listing.suburb}, ${listing.town}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy" />
        
        <button
          type="button"
          aria-label={saved ? 'Remove from favourites' : 'Save to favourites'}
          aria-pressed={saved}
          onClick={() => toggleFavourite(listing.id)}
          className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-brand-navy shadow-sm transition-transform hover:scale-110">
          
          <HeartIcon
            className={`h-4 w-4 ${saved ? 'text-brand-orange' : ''}`}
            fill={saved ? 'currentColor' : 'none'} />
          
        </button>
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
          {listing.featured &&
          <span className="rounded bg-brand-orange px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-white">
              Featured
            </span>
          }
          <span
            className={`rounded px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-white ${
            listing.status === 'Available' ? 'bg-brand-green' : 'bg-slate-500'}`
            }>
            
            {listing.status}
          </span>
          {unlocked &&
          <span className="rounded bg-white px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-brand-navy">
              Unlocked
            </span>
          }
        </div>
      </div>

      <div className="px-4 pb-4 pt-3">
        <p className="text-sm font-bold text-brand-orange">
          N$ {listing.rent.toLocaleString('en-US')}
          <span className="ml-1 text-[11px] font-medium text-slate-400">/month</span>
        </p>
        <h3 className="mt-1.5 text-[13px] font-bold text-brand-navy">
          <Link to={`/property/${listing.id}`} className="hover:text-brand-orange">
            <span className="absolute inset-0" aria-hidden="true" />
            {listing.title}
          </Link>
        </h3>
        <p className="mt-0.5 text-[11px] text-slate-400">
          {listing.suburb}, {listing.town}
        </p>

        <dl className="mt-3 flex items-center gap-4 border-t border-slate-100 pt-3 text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <BedIcon className="h-3.5 w-3.5" />
            <dt className="sr-only">Bedrooms</dt>
            <dd>{listing.bedrooms}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <BathIcon className="h-3.5 w-3.5" />
            <dt className="sr-only">Bathrooms</dt>
            <dd>{listing.bathrooms}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <CarIcon className="h-3.5 w-3.5" />
            <dt className="sr-only">Parking</dt>
            <dd>{listing.parking}</dd>
          </div>
        </dl>
      </div>
    </article>);

}