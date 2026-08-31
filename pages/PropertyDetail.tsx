import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeftIcon,
  BathIcon,
  BedIcon,
  CarIcon,
  CheckIcon,
  FlagIcon,
  HeartIcon,
  LockIcon,
  MapPinIcon,
  MessageCircleIcon,
  Share2Icon,
  ZapIcon } from
'lucide-react';
import { useData } from '../context/DataContext';
import { useConnect } from '../context/ConnectContext';
import { RevealContactModal } from '../components/RevealContactModal';
import { useScreenInit } from '../useScreenInit.js';

export function PropertyDetail() {
  const { id } = useParams<{id: string;}>();
  const { listings } = useData();
  const listing = listings.find((l) => l.id === id);
  const { isFavourite, toggleFavourite, hasConnected, credits } = useConnect();
  const screenInit = useScreenInit();
  const [activeImage, setActiveImage] = useState(0);
  const [modalOpen, setModalOpen] = useState(Boolean(screenInit?.modalOpen));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setActiveImage(0);
    window.scrollTo({ top: 0 });
  }, [id]);

  if (!listing) {
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-24 text-center">
        <h1 className="text-xl font-extrabold text-brand-navy">Listing not found</h1>
        <p className="mt-2 text-[13px] text-slate-500">
          This property may have been removed or marked as occupied.
        </p>
        <Link
          to="/find"
          className="mt-6 rounded-lg bg-brand-navy px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-brand-navyDark">
          
          Back to search
        </Link>
      </div>);

  }

  const unlocked = hasConnected(listing.landlordId);
  const saved = isFavourite(listing.id);

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const specs = [
  { label: 'Bedrooms', value: String(listing.bedrooms), Icon: BedIcon },
  { label: 'Bathrooms', value: String(listing.bathrooms), Icon: BathIcon },
  { label: 'Parking', value: String(listing.parking), Icon: CarIcon }];


  return (
    <div className="w-full bg-brand-canvas pb-16">
      <div className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Link
          to="/find"
          className="inline-flex items-center gap-2 text-[13px] font-semibold text-brand-navy hover:text-brand-orange">
          
          <ArrowLeftIcon className="h-4 w-4" />
          Back to search
        </Link>

        <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Gallery + info */}
          <div className="min-w-0">
            <div className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-slate-100">
              <div className="relative h-[260px] w-full sm:h-[380px]">
                <img
                  src={listing.images[activeImage]}
                  alt={`${listing.title} — photo ${activeImage + 1}`}
                  className="h-full w-full object-cover" />
                
                <div className="absolute left-4 top-4 flex gap-2">
                  {listing.featured &&
                  <span className="rounded bg-brand-orange px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                      Featured
                    </span>
                  }
                  <span
                    className={`rounded px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white ${
                    listing.status === 'Available' ? 'bg-brand-green' : 'bg-slate-500'}`
                    }>
                    
                    {listing.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-3 p-3">
                {listing.images.map((img, i) =>
                <button
                  key={img + i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`Show photo ${i + 1}`}
                  aria-current={i === activeImage}
                  className={`h-16 w-24 overflow-hidden rounded-lg ring-2 transition-all ${
                  i === activeImage ? 'ring-brand-orange' : 'ring-transparent hover:ring-slate-200'}`
                  }>
                  
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                )}
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-xl font-extrabold text-brand-navy sm:text-2xl">
                    {listing.title}
                  </h1>
                  <p className="mt-1.5 inline-flex items-center gap-1.5 text-[13px] text-slate-500">
                    <MapPinIcon className="h-4 w-4 text-brand-orange" />
                    {listing.suburb}, {listing.town}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-extrabold text-brand-orange">
                    N$ {listing.rent.toLocaleString('en-US')}
                    <span className="ml-1 text-[12px] font-medium text-slate-400">/month</span>
                  </p>
                  <p className="mt-1 text-[12px] text-slate-500">
                    Deposit N$ {listing.deposit.toLocaleString('en-US')}
                  </p>
                </div>
              </div>

              <dl className="mt-6 grid grid-cols-3 gap-3 border-y border-slate-100 py-4">
                {specs.map((spec) =>
                <div key={spec.label} className="flex items-center gap-2.5">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-blueSoft text-brand-navy">
                      <spec.Icon className="h-4 w-4" />
                    </span>
                    <span>
                      <dt className="text-[11px] text-slate-400">{spec.label}</dt>
                      <dd className="text-[13px] font-bold text-brand-navy">{spec.value}</dd>
                    </span>
                  </div>
                )}
              </dl>

              <h2 className="mt-6 text-sm font-bold text-brand-navy">Description</h2>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                {listing.description}
              </p>

              <dl className="mt-6 grid gap-x-8 gap-y-3 text-[13px] sm:grid-cols-2">
                {[
                ['Property type', listing.type],
                ['Town', listing.town],
                ['Suburb', listing.suburb],
                ['Availability', listing.status],
                ['Listed', listing.postedAt]].
                map(([label, value]) =>
                <div key={label} className="flex justify-between border-b border-slate-100 pb-2">
                    <dt className="text-slate-400">{label}</dt>
                    <dd className="font-semibold text-brand-navy">{value}</dd>
                  </div>
                )}
              </dl>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => toggleFavourite(listing.id)}
                  aria-pressed={saved}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-[13px] font-semibold text-brand-navy hover:bg-slate-50">
                  
                  <HeartIcon
                    className={`h-4 w-4 ${saved ? 'text-brand-orange' : ''}`}
                    fill={saved ? 'currentColor' : 'none'} />
                  
                  {saved ? 'Saved' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={share}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-[13px] font-semibold text-brand-navy hover:bg-slate-50">
                  
                  {copied ? <CheckIcon className="h-4 w-4 text-brand-green" /> : <Share2Icon className="h-4 w-4" />}
                  {copied ? 'Link copied' : 'Share'}
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-medium text-slate-400 hover:text-brand-orange">
                  
                  <FlagIcon className="h-4 w-4" />
                  Report listing
                </button>
              </div>
            </div>
          </div>

          {/* Connect panel */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Landlord
              </p>
              <div className="mt-2 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy text-sm font-bold text-white">
                  {listing.landlordName.
                  split(' ').
                  map((n) => n[0]).
                  join('').
                  slice(0, 2)}
                </span>
                <div>
                  <p className="text-sm font-bold text-brand-navy">{listing.landlordName}</p>
                  <p className="text-[11px] text-slate-400">Verified landlord</p>
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-brand-canvas px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  WhatsApp number
                </p>
                <p
                  className={`mt-1 text-sm font-bold ${
                  unlocked ? 'text-brand-navy' : 'select-none text-slate-300 blur-[5px]'}`
                  }>
                  
                  {unlocked ? listing.landlordWhatsapp : '+264 81 000 0000'}
                </p>
              </div>

              {unlocked ?
              <a
                href={`https://wa.me/${listing.landlordWhatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-green px-4 py-3 text-[13px] font-semibold text-white hover:bg-[#187a45]">
                
                  <MessageCircleIcon className="h-4 w-4" />
                  Chat on WhatsApp
                </a> :

              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-orange px-4 py-3 text-[13px] font-semibold text-white hover:bg-[#dd551a]">
                
                  <LockIcon className="h-4 w-4" />
                  Reveal contact details
                </button>
              }

              <p className="mt-3 text-center text-[11px] leading-relaxed text-slate-400">
                {unlocked ?
                'Already unlocked — messaging this landlord again is free.' :
                'Uses 1 connect credit, once per landlord.'}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-brand-navy">
                  <ZapIcon className="h-3.5 w-3.5 text-brand-orange" />
                  {credits} credits left
                </span>
                <Link
                  to="/pricing"
                  className="text-[12px] font-semibold text-brand-orange hover:underline">
                  
                  Top up
                </Link>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-brand-navy p-5 text-white">
              <h2 className="text-[13px] font-bold">Stay safe on Lala</h2>
              <ul className="mt-3 space-y-2 text-[12px] text-white/75">
                <li>Never pay a deposit before viewing the property.</li>
                <li>Meet at the property during the day.</li>
                <li>Report suspicious listings to our team.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <RevealContactModal
        listing={listing}
        open={modalOpen}
        onClose={() => setModalOpen(false)} />
      
    </div>);

}