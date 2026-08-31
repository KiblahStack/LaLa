import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CheckCircle2Icon,
  LockIcon,
  MessageCircleIcon,
  PhoneIcon,
  XIcon,
  ZapIcon } from
'lucide-react';
import { type Listing } from '../data/homeData';
import { useConnect } from '../context/ConnectContext';

type RevealContactModalProps = {
  listing: Listing;
  open: boolean;
  onClose: () => void;
};

type Stage = 'confirm' | 'revealed' | 'empty';

export function RevealContactModal({ listing, open, onClose }: RevealContactModalProps) {
  const { credits, hasConnected, connect } = useConnect();
  const alreadyUnlocked = hasConnected(listing.landlordId);
  const [stage, setStage] = useState<Stage>('confirm');
  const [charged, setCharged] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (alreadyUnlocked) setStage('revealed');else
    if (credits < 1) setStage('empty');else
    setStage('confirm');
    setCharged(false);
  }, [open, alreadyUnlocked, credits]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleConfirm = () => {
    const result = connect(listing.landlordId);
    if (result === 'no-credits') {
      setStage('empty');
      return;
    }
    setCharged(result === 'charged');
    setStage('revealed');
  };

  const waLink = `https://wa.me/${listing.landlordWhatsapp.replace(/[^0-9]/g, '')}`;

  return (
    <AnimatePresence>
      {open &&
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="reveal-title"
        className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center">
        
          <motion.button
          type="button"
          aria-label="Close dialog"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 cursor-default bg-brand-navyDark/60 backdrop-blur-sm" />
        

          <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-float">
          
            <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-brand-navy">
            
              <XIcon className="h-4 w-4" />
            </button>

            <div className="px-6 pb-6 pt-8">
              {stage === 'confirm' &&
            <>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-orangeSoft text-brand-orange">
                    <LockIcon className="h-5 w-5" />
                  </span>
                  <h2 id="reveal-title" className="mt-4 text-lg font-extrabold text-brand-navy">
                    Reveal {listing.landlordName}'s contact details?
                  </h2>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-500">
                    This uses <span className="font-semibold text-brand-navy">1 connect credit</span>{' '}
                    for this landlord. Reconnecting with {listing.landlordName} later is always free
                    — credits are only ever charged once per landlord.
                  </p>

                  <div className="mt-5 flex items-center justify-between rounded-xl bg-brand-blueSoft px-4 py-3">
                    <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-brand-navy">
                      <ZapIcon className="h-4 w-4 text-brand-orange" />
                      Your balance
                    </span>
                    <span className="text-[13px] font-bold text-brand-navy">
                      {credits} credits
                    </span>
                  </div>

                  <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                    <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-[13px] font-semibold text-brand-navy hover:bg-slate-50">
                  
                      Not now
                    </button>
                    <button
                  type="button"
                  onClick={handleConfirm}
                  className="flex-1 rounded-lg bg-brand-orange px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-[#dd551a]">
                  
                      Use 1 credit
                    </button>
                  </div>
                </>
            }

              {stage === 'revealed' &&
            <>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-greenSoft text-brand-green">
                    <CheckCircle2Icon className="h-5 w-5" />
                  </span>
                  <h2 id="reveal-title" className="mt-4 text-lg font-extrabold text-brand-navy">
                    {charged ? 'Contact unlocked' : 'Already unlocked'}
                  </h2>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-500">
                    {charged ?
                `1 credit used. ${listing.landlordName} is now unlocked for good — you can come back any time at no extra cost.` :
                `You have already connected with ${listing.landlordName}. No credit was used.`}
                  </p>

                  <div className="mt-5 rounded-xl border border-slate-200 px-4 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      Landlord
                    </p>
                    <p className="mt-1 text-sm font-bold text-brand-navy">
                      {listing.landlordName}
                    </p>
                    <p className="mt-2 inline-flex items-center gap-2 text-[13px] text-slate-600">
                      <PhoneIcon className="h-4 w-4 text-brand-orange" />
                      {listing.landlordWhatsapp}
                    </p>
                  </div>

                  <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-green px-4 py-3 text-[13px] font-semibold text-white hover:bg-[#187a45]">
                
                    <MessageCircleIcon className="h-4 w-4" />
                    Chat on WhatsApp
                  </a>
                  <p className="mt-3 text-center text-[11px] text-slate-400">
                    Balance: {credits} credits remaining
                  </p>
                </>
            }

              {stage === 'empty' &&
            <>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-orangeSoft text-brand-orange">
                    <ZapIcon className="h-5 w-5" />
                  </span>
                  <h2 id="reveal-title" className="mt-4 text-lg font-extrabold text-brand-navy">
                    You're out of connect credits
                  </h2>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-500">
                    Browsing stays free — you just need credits to reveal landlord contact details.
                    Packages start at N$ 49 for 30 connections.
                  </p>
                  <Link
                to="/pricing"
                onClick={onClose}
                className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-brand-orange px-4 py-3 text-[13px] font-semibold text-white hover:bg-[#dd551a]">
                
                    View connect packages
                  </Link>
                  <button
                type="button"
                onClick={onClose}
                className="mt-2 w-full rounded-lg px-4 py-2.5 text-[13px] font-semibold text-slate-500 hover:bg-slate-50">
                
                    Keep browsing
                  </button>
                </>
            }
            </div>
          </motion.div>
        </div>
      }
    </AnimatePresence>);

}