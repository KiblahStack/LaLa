import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  EyeIcon,
  MessageSquareIcon,
  PencilIcon,
  PlusIcon,
  Trash2Icon } from
'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Field, GhostButton, PrimaryButton, SelectInput, TextInput } from '../components/FormControls';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { towns } from '../data/homeData';
import { useScreenInit } from '../useScreenInit.js';

const tabs = ['My listings', 'Enquiries', 'Profile'] as const;
type Tab = (typeof tabs)[number];

export function LandlordDashboard() {
  const navigate = useNavigate();
  const { user, updateProfile, logout } = useAuth();
  const { listings, enquiries, setListingStatus, deleteListing } = useData();
  const screenInit = useScreenInit();
  const [tab, setTab] = useState<Tab>(
    (tabs as readonly string[]).includes(screenInit?.tab) ?
    screenInit.tab as Tab :
    'My listings'
  );

  if (!user || user.role !== 'landlord') {
    return (
      <>
        <PageHeader title="Landlord dashboard" />
        <div className="mx-auto w-full max-w-md px-4 py-16 text-center">
          <p className="text-[13px] text-slate-600">
            Log in with a landlord account to manage your listings.
          </p>
          <Link
            to="/login"
            className="mt-5 inline-flex rounded-lg bg-brand-orange px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#dd551a]">
            
            Log in
          </Link>
        </div>
      </>);

  }

  const myListings = listings.filter(
    (l) => l.landlordId === user.id || l.landlordName === user.name
  );
  const myListingIds = myListings.map((l) => l.id);
  const myEnquiries = enquiries.filter((e) => myListingIds.includes(e.listingId));
  const available = myListings.filter((l) => l.status === 'Available').length;

  return (
    <>
      <PageHeader
        title={`Hi, ${user.name.split(' ')[0]}`}
        description={`${myListings.length} listings · ${available} currently available · advertising is free.`}>
        
        <Link
          to="/listing/new"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#dd551a]">
          
          <PlusIcon className="h-4 w-4" />
          Create listing
        </Link>
      </PageHeader>

      <div className="w-full bg-brand-canvas pb-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            role="tablist"
            aria-label="Dashboard sections"
            className="no-scrollbar -mb-px flex gap-1 overflow-x-auto pt-4">
            
            {tabs.map((t) =>
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`shrink-0 rounded-t-lg px-4 py-2.5 text-[13px] font-semibold transition-colors ${
              tab === t ?
              'bg-white text-brand-navy shadow-[0_-2px_0_0_#f26522_inset]' :
              'text-slate-500 hover:text-brand-navy'}`
              }>
              
                {t}
              </button>
            )}
          </div>

          <div className="rounded-2xl rounded-tl-none bg-white p-6 shadow-card ring-1 ring-slate-100">
            {tab === 'My listings' &&
            <div>
                <h2 className="text-sm font-bold text-brand-navy">My listings</h2>
                {myListings.length === 0 ?
              <div className="mt-4 rounded-xl bg-brand-canvas px-6 py-12 text-center">
                    <p className="text-[13px] text-slate-500">
                      No listings yet. Advertising on Lala is free and unlimited.
                    </p>
                    <Link
                  to="/listing/new"
                  className="mt-4 inline-flex rounded-lg bg-brand-orange px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#dd551a]">
                  
                      Create your first listing
                    </Link>
                  </div> :

              <ul className="mt-4 space-y-3">
                    {myListings.map((listing) =>
                <li
                  key={listing.id}
                  className="flex flex-wrap items-center gap-4 rounded-xl border border-slate-100 p-3">
                  
                        <img
                    src={listing.images[0]}
                    alt=""
                    className="h-16 w-24 shrink-0 rounded-lg object-cover" />
                  
                        <div className="min-w-0 flex-1">
                          <p className="text-[13px] font-bold text-brand-navy">{listing.title}</p>
                          <p className="mt-0.5 text-[12px] text-slate-500">
                            {listing.suburb}, {listing.town} · N${' '}
                            {listing.rent.toLocaleString('en-US')} /month
                          </p>
                          <p className="mt-1 text-[11px] text-slate-400">
                            Listed {listing.postedAt}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <label className="sr-only" htmlFor={`status-${listing.id}`}>
                            Availability for {listing.title}
                          </label>
                          <select
                      id={`status-${listing.id}`}
                      value={listing.status}
                      onChange={(e) =>
                      setListingStatus(
                        listing.id,
                        e.target.value as 'Available' | 'Occupied'
                      )
                      }
                      className={`cursor-pointer rounded-lg border px-3 py-2 text-[12px] font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/40 ${
                      listing.status === 'Available' ?
                      'border-brand-green/40 bg-brand-greenSoft text-brand-green' :
                      'border-slate-200 bg-slate-50 text-slate-500'}`
                      }>
                      
                            <option value="Available">Available</option>
                            <option value="Occupied">Occupied</option>
                          </select>

                          <Link
                      to={`/property/${listing.id}`}
                      aria-label={`View ${listing.title}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-brand-navy hover:bg-slate-50">
                      
                            <EyeIcon className="h-4 w-4" />
                          </Link>
                          <Link
                      to={`/listing/${listing.id}/edit`}
                      aria-label={`Edit ${listing.title}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-brand-navy hover:bg-slate-50">
                      
                            <PencilIcon className="h-4 w-4" />
                          </Link>
                          <button
                      type="button"
                      onClick={() => deleteListing(listing.id)}
                      aria-label={`Delete ${listing.title}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-brand-orange">
                      
                            <Trash2Icon className="h-4 w-4" />
                          </button>
                        </div>
                      </li>
                )}
                  </ul>
              }
              </div>
            }

            {tab === 'Enquiries' &&
            <div>
                <h2 className="text-sm font-bold text-brand-navy">Recent enquiries</h2>
                <p className="mt-1.5 text-[12px] text-slate-500">
                  Tenants who used a connect credit to reach you.
                </p>
                {myEnquiries.length === 0 ?
              <p className="mt-4 rounded-xl bg-brand-canvas px-6 py-12 text-center text-[13px] text-slate-500">
                    No enquiries yet. Listings with clear photos and full descriptions get contacted
                    faster.
                  </p> :

              <ul className="mt-4 space-y-3">
                    {myEnquiries.map((enquiry) => {
                  const listing = listings.find((l) => l.id === enquiry.listingId);
                  return (
                    <li
                      key={enquiry.id}
                      className="flex gap-3 rounded-xl border border-slate-100 p-4">
                      
                          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-blueSoft text-brand-navy">
                            <MessageSquareIcon className="h-4 w-4" />
                          </span>
                          <div className="min-w-0">
                            <p className="text-[13px] font-bold text-brand-navy">
                              {enquiry.tenantName}
                              <span className="ml-2 text-[11px] font-medium text-slate-400">
                                {enquiry.at}
                              </span>
                            </p>
                            <p className="mt-1 text-[12px] leading-relaxed text-slate-600">
                              {enquiry.message}
                            </p>
                            {listing &&
                        <Link
                          to={`/property/${listing.id}`}
                          className="mt-2 inline-flex text-[12px] font-semibold text-brand-orange hover:underline">
                          
                                {listing.title}
                              </Link>
                        }
                          </div>
                        </li>);

                })}
                  </ul>
              }
              </div>
            }

            {tab === 'Profile' &&
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setTab('My listings');
              }}
              className="max-w-md">
              
                <h2 className="text-sm font-bold text-brand-navy">Profile & settings</h2>
                <div className="mt-4 space-y-4">
                  <Field label="Full name" htmlFor="l-name">
                    <TextInput
                    id="l-name"
                    value={user.name}
                    onChange={(e) => updateProfile({ name: e.target.value })} />
                  
                  </Field>
                  <Field label="Email address" htmlFor="l-email">
                    <TextInput
                    id="l-email"
                    type="email"
                    value={user.email}
                    onChange={(e) => updateProfile({ email: e.target.value })} />
                  
                  </Field>
                  <Field
                  label="WhatsApp number"
                  htmlFor="l-wa"
                  hint="Shown to tenants only after they use a connect credit.">
                  
                    <TextInput
                    id="l-wa"
                    inputMode="tel"
                    value={user.whatsapp}
                    onChange={(e) => updateProfile({ whatsapp: e.target.value })} />
                  
                  </Field>
                  <Field label="Town" htmlFor="l-town-profile">
                    <SelectInput
                    id="l-town-profile"
                    value={user.town}
                    options={towns.filter((t) => t !== 'All Areas')}
                    onChange={(e) => updateProfile({ town: e.target.value })} />
                  
                  </Field>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <PrimaryButton type="submit">Save changes</PrimaryButton>
                  <GhostButton
                  type="button"
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}>
                  
                    Log out
                  </GhostButton>
                </div>
              </form>
            }
          </div>
        </div>
      </div>
    </>);

}