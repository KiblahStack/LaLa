import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarIcon,
  MapPinIcon,
  MessageCircleIcon,
  SearchXIcon,
  UserIcon,
  WalletIcon } from
'lucide-react';
import { towns, type RentalRequest } from '../data/homeData';
import { useData } from '../context/DataContext';

function RequestCard({ request }: {request: RentalRequest;}) {
  const wa = `https://wa.me/${request.tenantWhatsapp.replace(/[^0-9]/g, '')}`;

  return (
    <article className="flex flex-col rounded-2xl bg-white p-5 shadow-card ring-1 ring-slate-100">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-orangeSoft text-brand-orange">
            <UserIcon className="h-4 w-4" />
          </span>
          <div>
            <h2 className="text-[13px] font-bold text-brand-navy">{request.propertyType}</h2>
            <p className="text-[11px] text-slate-400">{request.tenantName}</p>
          </div>
        </div>
        {request.featured &&
        <span className="rounded bg-brand-orange px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-white">
            Featured
          </span>
        }
      </div>

      <dl className="mt-4 space-y-2 text-[12px] text-slate-600">
        <div className="flex items-center gap-2">
          <WalletIcon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
          <dt className="font-medium">Budget:</dt>
          <dd>N$ {request.budget.toLocaleString('en-US')} /month</dd>
        </div>
        <div className="flex items-center gap-2">
          <MapPinIcon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
          <dt className="sr-only">Preferred area</dt>
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

      <p className="mt-4 flex-1 text-[12px] leading-relaxed text-slate-500">{request.description}</p>

      <div className="mt-5 flex gap-2">
        <Link
          to={`/request/${request.id}`}
          className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-center text-[12px] font-semibold text-brand-navy hover:bg-slate-50">
          
          View request
        </Link>
        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-green px-4 py-2.5 text-[12px] font-semibold text-white hover:bg-[#187a45]">
          
          <MessageCircleIcon className="h-4 w-4" />
          Contact
        </a>
      </div>
    </article>);

}

export function Requests() {
  const { requests, foundRequestIds } = useData();
  const [town, setTown] = useState(towns[0]);

  const results = useMemo(
    () =>
    requests.filter(
      (r) => (town === 'All Areas' || r.town === town) && !foundRequestIds.includes(r.id)
    ),
    [requests, foundRequestIds, town]
  );

  return (
    <div className="w-full bg-brand-canvas pb-16">
      <div className="bg-brand-navy py-10">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold text-white sm:text-3xl">
            Looking for Accommodation
          </h1>
          <p className="mt-2 max-w-xl text-sm text-white/70">
            Tenants tell you what they need. Contacting a tenant is completely free for landlords —
            no credits required.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[13px] text-slate-500">
            <span className="font-bold text-brand-navy">{results.length}</span>{' '}
            {results.length === 1 ? 'request' : 'requests'} open
          </p>
          <div className="flex items-center gap-2">
            <label htmlFor="request-town" className="text-[12px] font-medium text-slate-500">
              Town
            </label>
            <select
              id="request-town"
              value={town}
              onChange={(e) => setTown(e.target.value)}
              className="cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] font-medium text-brand-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/40">
              
              {towns.map((t) =>
              <option key={t} value={t}>
                  {t}
                </option>
              )}
            </select>
          </div>
        </div>

        {results.length > 0 ?
        <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((request) =>
          <RequestCard key={request.id} request={request} />
          )}
          </div> :

        <div className="mt-5 flex flex-col items-center rounded-2xl bg-white px-6 py-16 text-center shadow-card ring-1 ring-slate-100">
            <SearchXIcon className="h-8 w-8 text-slate-300" />
            <h2 className="mt-4 text-sm font-bold text-brand-navy">No open requests here yet</h2>
            <p className="mt-2 max-w-sm text-[13px] text-slate-500">
              Try another town, or advertise your property so tenants can find it.
            </p>
            <Link
            to="/find"
            className="mt-5 rounded-lg bg-brand-navy px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-brand-navyDark">
            
              Browse rentals
            </Link>
          </div>
        }
      </div>
    </div>);

}