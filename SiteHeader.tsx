import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  ChevronDownIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MenuIcon,
  PlusIcon,
  XIcon,
  ZapIcon } from
'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { LalaLogo } from './LalaLogo';
import { navLinks } from '../data/homeData';
import { useConnect } from '../context/ConnectContext';
import { useAuth } from '../context/AuthContext';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const { credits } = useConnect();
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setOpen(false);
    setAccountOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node))
      setAccountOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const dashboardTo = user?.role === 'landlord' ? '/landlord' : '/dashboard';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange">
          
          <LalaLogo withTagline />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) =>
          link.to.includes('#') ?
          <a
            key={link.label}
            href={link.to}
            className="text-[13px] font-medium text-brand-navy/80 transition-colors hover:text-brand-orange">
            
                {link.label}
              </a> :

          <NavLink
            key={link.label}
            to={link.to}
            className={({ isActive }) =>
            `text-[13px] font-medium transition-colors hover:text-brand-orange ${
            isActive ? 'text-brand-orange' : 'text-brand-navy/80'}`

            }>
            
                {link.label}
              </NavLink>

          )}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          {user?.role === 'tenant' &&
          <Link
            to="/pricing"
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-blueSoft px-3 py-1.5 text-[12px] font-semibold text-brand-navy transition-colors hover:bg-brand-navy hover:text-white"
            title="Your remaining connect credits">
            
              <ZapIcon className="h-3.5 w-3.5 text-brand-orange" />
              {credits} credits
            </Link>
          }

          {user ?
          <div className="relative" ref={accountRef}>
              <button
              type="button"
              onClick={() => setAccountOpen((v) => !v)}
              aria-expanded={accountOpen}
              aria-haspopup="menu"
              className="inline-flex items-center gap-2 rounded-lg border border-brand-navy/15 px-3 py-2 text-[13px] font-semibold text-brand-navy hover:bg-brand-navy/5">
              
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-navy text-[10px] font-bold text-white">
                  {user.name.
                split(' ').
                map((n) => n[0]).
                join('').
                slice(0, 2)}
                </span>
                {user.name.split(' ')[0]}
                <ChevronDownIcon className="h-3.5 w-3.5 text-slate-400" />
              </button>

              <AnimatePresence>
                {accountOpen &&
              <motion.div
                role="menu"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl bg-white p-1.5 shadow-float ring-1 ring-slate-100">
                
                    <p className="px-3 py-2 text-[11px] uppercase tracking-wide text-slate-400">
                      {user.role === 'landlord' ? 'Landlord account' : 'Tenant account'}
                    </p>
                    <Link
                  to={dashboardTo}
                  role="menuitem"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-medium text-brand-navy hover:bg-brand-blueSoft">
                  
                      <LayoutDashboardIcon className="h-4 w-4" />
                      Dashboard
                    </Link>
                    <Link
                  to={user.role === 'landlord' ? '/listing/new' : '/post-request'}
                  role="menuitem"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-medium text-brand-navy hover:bg-brand-blueSoft">
                  
                      <PlusIcon className="h-4 w-4" />
                      {user.role === 'landlord' ? 'Create listing' : 'Post a request'}
                    </Link>
                    <button
                  type="button"
                  role="menuitem"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-medium text-slate-500 hover:bg-slate-50">
                  
                      <LogOutIcon className="h-4 w-4" />
                      Log out
                    </button>
                  </motion.div>
              }
              </AnimatePresence>
            </div> :

          <>
              <Link
              to="/login"
              className="rounded-lg border border-brand-navy/20 px-5 py-2 text-sm font-semibold text-brand-navy transition-colors hover:border-brand-navy hover:bg-brand-navy/5">
              
                Login
              </Link>
              <Link
              to="/register"
              className="rounded-lg bg-brand-orange px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#dd551a]">
              
                Register
              </Link>
            </>
          }
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-brand-navy lg:hidden">
          
          {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open &&
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="overflow-hidden border-t border-slate-100 bg-white lg:hidden">
          
            <nav aria-label="Mobile" className="flex flex-col px-4 py-3 sm:px-6">
              {navLinks.map((link) =>
            <Link
              key={link.label}
              to={link.to}
              className="rounded-lg px-2 py-3 text-sm font-medium text-brand-navy hover:bg-brand-blueSoft">
              
                  {link.label}
                </Link>
            )}

              {user ?
            <>
                  <Link
                to={dashboardTo}
                className="rounded-lg px-2 py-3 text-sm font-medium text-brand-navy hover:bg-brand-blueSoft">
                
                    Dashboard
                  </Link>
                  <div className="mt-2 flex items-center gap-3 pb-2">
                    {user.role === 'tenant' &&
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-blueSoft px-3 py-2 text-[12px] font-semibold text-brand-navy">
                        <ZapIcon className="h-3.5 w-3.5 text-brand-orange" />
                        {credits}
                      </span>
                }
                    <button
                  type="button"
                  onClick={handleLogout}
                  className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-brand-navy">
                  
                      Log out
                    </button>
                  </div>
                </> :

            <div className="mt-2 flex gap-3 pb-2">
                  <Link
                to="/login"
                className="flex-1 rounded-lg border border-brand-navy/20 px-4 py-2.5 text-center text-sm font-semibold text-brand-navy">
                
                    Login
                  </Link>
                  <Link
                to="/register"
                className="flex-1 rounded-lg bg-brand-orange px-4 py-2.5 text-center text-sm font-semibold text-white">
                
                    Register
                  </Link>
                </div>
            }
            </nav>
          </motion.div>
        }
      </AnimatePresence>
    </header>);

}