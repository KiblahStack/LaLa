import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon, CheckCircle2Icon, InfoIcon, ZapIcon } from 'lucide-react';
import { connectPackages, paymentMethods, type ConnectPackage } from '../data/homeData';
import { useConnect } from '../context/ConnectContext';
import { useScreenInit } from '../useScreenInit.js';

export function Pricing() {
  const { credits, packageName, purchase } = useConnect();
  const screenInit = useScreenInit();
  const [selected, setSelected] = useState<ConnectPackage | null>(
    connectPackages.find((p) => p.id === screenInit?.selectedPackageId) ?? null
  );
  const [confirmed, setConfirmed] = useState<ConnectPackage | null>(null);
  const [method, setMethod] = useState(paymentMethods[0]);

  const handlePay = () => {
    if (!selected) return;
    purchase(selected);
    setConfirmed(selected);
    setSelected(null);
  };

  return (
    <div className="w-full bg-brand-canvas pb-16">
      <div className="bg-brand-navy py-12">
        <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6">
          <h1 className="text-2xl font-extrabold text-white sm:text-3xl">Connect Packages</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/75">
            Browsing, searching and viewing listings is always free. You only pay to connect —
            and each landlord costs a credit only once, no matter how often you chat again.
          </p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[13px] font-semibold text-white">
            <ZapIcon className="h-4 w-4 text-brand-orange" />
            {credits} credits available
            {packageName ? ` · ${packageName} plan` : ''}
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-8 grid gap-5 md:grid-cols-3">
          {connectPackages.map((pkg, i) =>
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.08, ease: 'easeOut' }}
            className={`relative flex flex-col rounded-2xl bg-white p-6 shadow-card ring-1 ${
            pkg.popular ? 'ring-2 ring-brand-orange' : 'ring-slate-100'}`
            }>
            
              {pkg.popular &&
            <span className="absolute -top-3 left-6 rounded bg-brand-orange px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                  Most popular
                </span>
            }
              <h2 className="text-sm font-bold uppercase tracking-wide text-brand-navy">
                {pkg.name}
              </h2>
              <p className="mt-3 text-3xl font-extrabold text-brand-navy">
                N$ {pkg.price}
                <span className="ml-1 text-[12px] font-medium text-slate-400">
                  / {pkg.validDays} days
                </span>
              </p>
              <p className="mt-2 text-[13px] font-semibold text-brand-orange">
                {pkg.connections} unique landlord connections
              </p>

              <ul className="mt-5 flex-1 space-y-2.5">
                {pkg.perks.map((perk) =>
              <li key={perk} className="flex items-start gap-2 text-[13px] text-slate-600">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                    {perk}
                  </li>
              )}
              </ul>

              <button
              type="button"
              onClick={() => setSelected(pkg)}
              className={`mt-6 rounded-lg px-4 py-3 text-[13px] font-semibold transition-colors ${
              pkg.popular ?
              'bg-brand-orange text-white hover:bg-[#dd551a]' :
              'bg-brand-navy text-white hover:bg-brand-navyDark'}`
              }>
              
                Buy {pkg.name}
              </button>
            </motion.div>
          )}
        </div>

        {/* How credits work */}
        <section className="mt-10 grid gap-5 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100 lg:col-span-2">
            <h2 className="text-sm font-bold text-brand-navy">How connect credits work</h2>
            <ul className="mt-4 space-y-3 text-[13px] leading-relaxed text-slate-600">
              <li className="flex gap-2.5">
                <CheckCircle2Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                Browsing, searching and viewing full listings is free — always.
              </li>
              <li className="flex gap-2.5">
                <CheckCircle2Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                One credit is used the first time you reveal a landlord's contact details.
              </li>
              <li className="flex gap-2.5">
                <CheckCircle2Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                That landlord stays unlocked — returning to their listings never costs again, even
                for their other properties.
              </li>
              <li className="flex gap-2.5">
                <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                Credits expire with your package validity period.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-brand-navy p-6 text-white">
            <h2 className="text-sm font-bold">Landlords pay nothing</h2>
            <p className="mt-3 text-[13px] leading-relaxed text-white/75">
              Registration, unlimited listings and photo uploads are free for landlords in V1.
              Tenants only pay for the connection.
            </p>
            <Link
              to="/find"
              className="mt-5 inline-flex rounded-lg bg-white px-4 py-2.5 text-[13px] font-semibold text-brand-navy hover:bg-white/90">
              
              Browse rentals free
            </Link>
          </div>
        </section>
      </div>

      {/* Checkout sheet */}
      <AnimatePresence>
        {selected &&
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-title"
          className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center">
          
            <motion.button
            type="button"
            aria-label="Cancel purchase"
            onClick={() => setSelected(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 cursor-default bg-brand-navyDark/60 backdrop-blur-sm" />
          
            <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-float">
            
              <h2 id="checkout-title" className="text-lg font-extrabold text-brand-navy">
                Pay for {selected.name}
              </h2>
              <p className="mt-1 text-[13px] text-slate-500">
                N$ {selected.price} · {selected.connections} connections · valid{' '}
                {selected.validDays} days
              </p>

              <fieldset className="mt-5">
                <legend className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Payment method
                </legend>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {paymentMethods.map((m) =>
                <label
                  key={m}
                  className={`cursor-pointer rounded-lg border px-3 py-2.5 text-[12px] font-semibold transition-colors ${
                  method === m ?
                  'border-brand-orange bg-brand-orangeSoft text-brand-orange' :
                  'border-slate-200 text-brand-navy hover:bg-slate-50'}`
                  }>
                  
                      <input
                    type="radio"
                    name="payment-method"
                    value={m}
                    checked={method === m}
                    onChange={() => setMethod(m)}
                    className="sr-only" />
                  
                      {m}
                    </label>
                )}
                </div>
              </fieldset>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <button
                type="button"
                onClick={() => setSelected(null)}
                className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-[13px] font-semibold text-brand-navy hover:bg-slate-50">
                
                  Cancel
                </button>
                <button
                type="button"
                onClick={handlePay}
                className="flex-1 rounded-lg bg-brand-orange px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-[#dd551a]">
                
                  Pay N$ {selected.price}
                </button>
              </div>
            </motion.div>
          </div>
        }
      </AnimatePresence>

      {/* Success toast */}
      <AnimatePresence>
        {confirmed &&
        <motion.div
          role="status"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-1/2 z-[70] w-[min(92vw,26rem)] -translate-x-1/2 rounded-xl bg-brand-navy px-5 py-4 text-white shadow-float">
          
            <div className="flex items-start gap-3">
              <CheckCircle2Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
              <div className="flex-1">
                <p className="text-[13px] font-bold">{confirmed.name} activated</p>
                <p className="mt-1 text-[12px] text-white/75">
                  {confirmed.connections} connections added · reference LALA-
                  {confirmed.id.toUpperCase()}-2481
                </p>
              </div>
              <button
              type="button"
              onClick={() => setConfirmed(null)}
              className="text-[12px] font-semibold text-white/70 hover:text-white">
              
                Close
              </button>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}