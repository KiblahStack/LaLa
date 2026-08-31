import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeftIcon,
  CalendarIcon,
  CheckCircle2Icon,
  HomeIcon,
  MapPinIcon,
  MessageCircleIcon,
  UserIcon,
  WalletIcon } from
'lucide-react';
import { useData } from '../context/DataContext';

export function RequestDetail() {
  const { id } = useParams<{id: string;}>();
  const { requests, foundRequestIds } = useData();
  const request = requests.find((r) => r.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  if (!request) {
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-24 text-center">
        <h1 className="text-xl font-extrabold text-brand-navy">Request not found</h1>
        <p className="mt-2 text-[13px] text-slate-500">
          This tenant may have already found accommodation.
        </p>
        <Link
          to="/requests"
          className="mt-6 rounded-lg bg-brand-navy px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-brand-navyDark">
          
          Back to requests
        </Link>
      </div>);

  }

  const found = foundRequestIds.includes(request.id);
  const wa = `https://wa.me/${request.tenantWhatsapp.replace(/[^0-9]/g, '')}`;

  const facts = [
  { label: 'Budget', value: `N$ ${request.budget.toLocaleString('en-US')} /month`, Icon: WalletIcon },
  { label: 'Property type', value: request.propertyType, Icon: HomeIcon },
  { label: 'Preferred area', value: `${request.area}, ${request.town}`, Icon: MapPinIcon },
  { label: 'Move-in date', value: request.moveDate, Icon: CalendarIcon }];


  return (
    <div className="w-full bg-brand-canvas pb-16">
      <div className="mx-auto w-full max-w-4xl px-4 pt-6 sm:px-6 lg:px-8">
        <Link
          to="/requests"
          className="inline-flex items-center gap-2 text-[13px] font-semibold text-brand-navy hover:text-brand-orange">
          
          <ArrowLeftIcon className="h-4 w-4" />
          Back to requests
        </Link>

        <div className="mt-5 rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-orangeSoft text-brand-orange">
                <UserIcon className="h-5 w-5" />
              </span>
              <div>
                <h1 className="text-lg font-extrabold text-brand-navy">
                  {request.propertyType} wanted
                </h1>
                <p className="text-[12px] text-slate-400">Posted by {request.tenantName}</p>
              </div>
            </div>
            {found ?
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-greenSoft px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-brand-green">
                <CheckCircle2Icon className="h-3.5 w-3.5" />
                Found
              </span> :

            request.featured &&
            <span className="rounded bg-brand-orange px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                  Featured
                </span>

            }
          </div>

          <dl className="mt-6 grid gap-4 border-y border-slate-100 py-5 sm:grid-cols-2">
            {facts.map((fact) =>
            <div key={fact.label} className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-blueSoft text-brand-navy">
                  <fact.Icon className="h-4 w-4" />
                </span>
                <span>
                  <dt className="text-[11px] text-slate-400">{fact.label}</dt>
                  <dd className="text-[13px] font-bold text-brand-navy">{fact.value}</dd>
                </span>
              </div>
            )}
          </dl>

          <h2 className="mt-6 text-sm font-bold text-brand-navy">About this request</h2>
          <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{request.description}</p>

          {found ?
          <p className="mt-6 rounded-xl bg-brand-greenSoft px-4 py-3 text-[12px] font-medium text-brand-green">
              This tenant has marked their request as found — no need to make contact.
            </p> :

          <>
              <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-green px-4 py-3 text-[13px] font-semibold text-white hover:bg-[#187a45] sm:w-auto sm:px-8">
              
                <MessageCircleIcon className="h-4 w-4" />
                Contact tenant on WhatsApp
              </a>
              <p className="mt-3 text-[11px] text-slate-400">
                Contacting tenants is free for landlords — no connect credits required.
              </p>
            </>
          }
        </div>
      </div>
    </div>);

}