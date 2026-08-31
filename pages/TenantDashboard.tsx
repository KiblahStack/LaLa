import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BellIcon,
  CheckCircle2Icon,
  HeartIcon,
  PlusIcon,
  Trash2Icon,
  ZapIcon } from
'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { PropertyCard } from '../components/PropertyCard';
import { Field, GhostButton, PrimaryButton, SelectInput, TextInput } from '../components/FormControls';
import { useAuth } from '../context/AuthContext';
import { useConnect } from '../context/ConnectContext';
import { useData } from '../context/DataContext';
import { towns } from '../data/homeData';
import { useScreenInit } from '../useScreenInit.js';

const tabs = ['Overview', 'My requests', 'Favourites', 'Packages', 'Profile'] as const;
type Tab = (typeof tabs)[number];

export function TenantDashboard() {
  const navigate = useNavigate();
  const { user, updateProfile, logout } = useAuth();
  const { credits, packageName, expiresInDays, favourites, connectedLandlordIds } = useConnect();
  const { listings, requests, foundRequestIds, markRequestFound, deleteRequest } = useData();
  const screenInit = useScreenInit();
  const [tab, setTab] = useState<Tab>(
    (tabs as readonly string[]).includes(screenInit?.tab) ?
    screenInit.tab as Tab :
    'Overview'
  );

  if (!user) {
    return (
      <>
        <PageHeader title="Tenant dashboard" />
        <div className="mx-auto w-full max-w-md px-4 py-16 text-center">
          <p className="text-[13px] text-slate-600">Log in to view your dashboard.</p>
          <Link
            to="/login"
            className="mt-5 inline-flex rounded-lg bg-brand-orange px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#dd551a]">
            
            Log in
          </Link>
        </div>
      </>);

  }

  const myRequests = requests.filter((r) => r.tenantName === user.name);
  const savedListings = listings.filter((l) => favourites.includes(l.id));
  const lowBalance = credits <= 3;

  const stats = [
  { label: 'Connect credits left', value: String(credits), Icon: ZapIcon },
  { label: 'Saved properties', value: String(savedListings.length), Icon: HeartIcon },
  { label: 'Landlords unlocked', value: String(connectedLandlordIds.length), Icon: CheckCircle2Icon }];


  return (
    <>
      <PageHeader
        title={`Hi, ${user.name.split(' ')[0]}`}
        description="Track your requests, favourites and connect credits in one place.">
        
        <Link
          to="/post-request"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#dd551a]">
          
          <PlusIcon className="h-4 w-4" />
          Post a request
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
            {tab === 'Overview' &&
            <div>
                {lowBalance &&
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-brand-orangeSoft px-4 py-3">
                    <p className="inline-flex items-center gap-2 text-[12px] font-semibold text-brand-orange">
                      <BellIcon className="h-4 w-4" />
                      Your connection balance is low ({credits} left).
                    </p>
                    <Link
                  to="/pricing"
                  className="text-[12px] font-bold text-brand-orange underline">
                  
                      Top up now
                    </Link>
                  </div>
              }

                <div className="grid gap-4 sm:grid-cols-3">
                  {stats.map((stat) =>
                <div key={stat.label} className="rounded-xl bg-brand-canvas p-5">
                      <stat.Icon className="h-5 w-5 text-brand-orange" />
                      <p className="mt-3 text-2xl font-extrabold text-brand-navy">{stat.value}</p>
                      <p className="mt-1 text-[12px] text-slate-500">{stat.label}</p>
                    </div>
                )}
                </div>

                <div className="mt-6 rounded-xl border border-slate-100 p-5">
                  <h2 className="text-sm font-bold text-brand-navy">Current package</h2>
                  <p className="mt-2 text-[13px] text-slate-600">
                    {packageName ?
                  `${packageName} — ${credits} connections remaining, expires in ${expiresInDays} days.` :
                  'No active package. Browsing stays free; buy credits when you are ready to connect.'}
                  </p>
                  <Link
                  to="/pricing"
                  className="mt-4 inline-flex rounded-lg bg-brand-navy px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-brand-navyDark">
                  
                    {packageName ? 'Buy more connections' : 'View packages'}
                  </Link>
                </div>
              </div>
            }

            {tab === 'My requests' &&
            <div>
                <h2 className="text-sm font-bold text-brand-navy">My rental requests</h2>
                {myRequests.length === 0 ?
              <div className="mt-4 rounded-xl bg-brand-canvas px-6 py-12 text-center">
                    <p className="text-[13px] text-slate-500">
                      You have not posted a request yet. Tell landlords what you need and let them
                      come to you.
                    </p>
                    <Link
                  to="/post-request"
                  className="mt-4 inline-flex rounded-lg bg-brand-orange px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#dd551a]">
                  
                      Post a request
                    </Link>
                  </div> :

              <ul className="mt-4 space-y-3">
                    {myRequests.map((request) => {
                  const found = foundRequestIds.includes(request.id);
                  return (
                    <li
                      key={request.id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 px-4 py-4">
                      
                          <div className="min-w-0">
                            <p className="text-[13px] font-bold text-brand-navy">
                              {request.propertyType} · N$ {request.budget.toLocaleString('en-US')}
                            </p>
                            <p className="mt-0.5 text-[12px] text-slate-500">
                              {request.area}, {request.town} · move in {request.moveDate}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {found ?
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-greenSoft px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-brand-green">
                                <CheckCircle2Icon className="h-3.5 w-3.5" />
                                Found
                              </span> :

                        <button
                          type="button"
                          onClick={() => markRequestFound(request.id)}
                          className="rounded-lg border border-brand-green px-3 py-2 text-[12px] font-semibold text-brand-green hover:bg-brand-greenSoft">
                          
                                Mark as found
                              </button>
                        }
                            <Link
                          to={`/request/${request.id}`}
                          className="rounded-lg border border-slate-200 px-3 py-2 text-[12px] font-semibold text-brand-navy hover:bg-slate-50">
                          
                              View
                            </Link>
                            <button
                          type="button"
                          onClick={() => deleteRequest(request.id)}
                          aria-label="Delete request"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-brand-orange">
                          
                              <Trash2Icon className="h-4 w-4" />
                            </button>
                          </div>
                        </li>);

                })}
                  </ul>
              }
              </div>
            }

            {tab === 'Favourites' &&
            <div>
                <h2 className="text-sm font-bold text-brand-navy">Saved listings</h2>
                {savedListings.length === 0 ?
              <div className="mt-4 rounded-xl bg-brand-canvas px-6 py-12 text-center">
                    <p className="text-[13px] text-slate-500">
                      Nothing saved yet. Tap the heart on any listing to keep it here.
                    </p>
                    <Link
                  to="/find"
                  className="mt-4 inline-flex rounded-lg bg-brand-navy px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-brand-navyDark">
                  
                      Browse rentals
                    </Link>
                  </div> :

              <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {savedListings.map((listing) =>
                <PropertyCard key={listing.id} listing={listing} />
                )}
                  </div>
              }
              </div>
            }

            {tab === 'Packages' &&
            <div>
                <h2 className="text-sm font-bold text-brand-navy">Connections used</h2>
                <p className="mt-1.5 text-[12px] text-slate-500">
                  A landlord is only ever charged once. Returning to an unlocked landlord is free.
                </p>
                {connectedLandlordIds.length === 0 ?
              <p className="mt-4 rounded-xl bg-brand-canvas px-6 py-10 text-center text-[13px] text-slate-500">
                    You have not connected with any landlords yet.
                  </p> :

              <ul className="mt-4 divide-y divide-slate-100">
                    {connectedLandlordIds.map((landlordId) => {
                  const landlord = listings.find((l) => l.landlordId === landlordId);
                  return (
                    <li
                      key={landlordId}
                      className="flex items-center justify-between gap-3 py-3">
                      
                          <div>
                            <p className="text-[13px] font-semibold text-brand-navy">
                              {landlord?.landlordName ?? 'Landlord'}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              {landlord ? `${landlord.suburb}, ${landlord.town}` : 'Unlocked'}
                            </p>
                          </div>
                          <span className="rounded-full bg-brand-greenSoft px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-green">
                            1 credit
                          </span>
                        </li>);

                })}
                  </ul>
              }
                <Link
                to="/pricing"
                className="mt-6 inline-flex rounded-lg bg-brand-orange px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#dd551a]">
                
                  Purchase package
                </Link>
              </div>
            }

            {tab === 'Profile' &&
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setTab('Overview');
              }}
              className="max-w-md">
              
                <h2 className="text-sm font-bold text-brand-navy">Profile & settings</h2>
                <div className="mt-4 space-y-4">
                  <Field label="Full name" htmlFor="t-name">
                    <TextInput
                    id="t-name"
                    value={user.name}
                    onChange={(e) => updateProfile({ name: e.target.value })} />
                  
                  </Field>
                  <Field label="Email address" htmlFor="t-email">
                    <TextInput
                    id="t-email"
                    type="email"
                    value={user.email}
                    onChange={(e) => updateProfile({ email: e.target.value })} />
                  
                  </Field>
                  <Field label="WhatsApp number" htmlFor="t-whatsapp">
                    <TextInput
                    id="t-whatsapp"
                    inputMode="tel"
                    value={user.whatsapp}
                    onChange={(e) => updateProfile({ whatsapp: e.target.value })} />
                  
                  </Field>
                  <Field label="Town" htmlFor="t-town">
                    <SelectInput
                    id="t-town"
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