import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, MapPinIcon, UserIcon, WalletIcon } from 'lucide-react';
import { CarouselSection } from './CarouselSection';
import { type RentalRequest } from '../data/homeData';
import { useData } from '../context/DataContext';

function RequestCard({ request }: {request: RentalRequest;}) {
  return (
    <article className="w-[240px] shrink-0 snap-start rounded-2xl border border-brand-orange/15 bg-brand-orangeSoft px-4 py-5 transition-transform hover:-translate-y-1 sm:w-[260px]">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-orange">
        <UserIcon className="h-4 w-4" />
      </span>

      <h3 className="mt-4 text-[13px] font-bold text-brand-navy">{request.propertyType}</h3>

      <dl className="mt-3 space-y-2 text-[11px] text-slate-600">
        <div className="flex items-center gap-2">
          <WalletIcon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
          <dt className="font-medium">Budget:</dt>
          <dd>N$ {request.budget.toLocaleString('en-US')}</dd>
        </div>
        <div className="flex items-center gap-2">
          <MapPinIcon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
          <dt className="sr-only">Area</dt>
          <dd>
            {request.town} ({request.area})
          </dd>
        </div>
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
          <dt className="font-medium">Move in:</dt>
          <dd>{request.moveDate}</dd>
        </div>
      </dl>

      <Link
        to={`/request/${request.id}`}
        className="mt-5 block w-full rounded-lg border border-brand-orange bg-white px-4 py-2 text-center text-xs font-semibold text-brand-orange transition-colors hover:bg-brand-orange hover:text-white">
        
        View Request
      </Link>
    </article>);

}

export function RecentRequests() {
  const { requests, foundRequestIds } = useData();
  const rentalRequests = requests.filter((r) => !foundRequestIds.includes(r.id)).slice(0, 6);

  return (
    <CarouselSection
      id="requests"
      tone="canvas"
      title="Recent Accommodation Requests"
      viewAllLabel="View all requests"
      viewAllTo="/requests">
      
      {rentalRequests.map((request) =>
      <RequestCard key={request.id} request={request} />
      )}
    </CarouselSection>);

}