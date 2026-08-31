import React from 'react';
import { Link } from 'react-router-dom';
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  YoutubeIcon,
  MessageCircleIcon } from
'lucide-react';
import { LalaLogo } from './LalaLogo';

const columns = [
{
  heading: 'Explore',
  links: [
  { label: 'Find Accommodation', to: '/find' },
  { label: 'Looking for Accommodation', to: '/requests' },
  { label: 'Advertise Property', to: '/listing/new' },
  { label: 'How It Works', to: '/#how-it-works' },
  { label: 'Pricing', to: '/pricing' }]

},
{
  heading: 'Help',
  links: [
  { label: 'FAQs', to: '/pricing' },
  { label: 'Safety Tips', to: '/pricing' },
  { label: 'Contact Us', to: '/pricing' },
  { label: 'Privacy Policy', to: '/pricing' },
  { label: 'Terms of Use', to: '/pricing' }]

},
{
  heading: 'Account',
  links: [
  { label: 'Login', to: '/login' },
  { label: 'Register', to: '/register' },
  { label: 'Dashboard', to: '/dashboard' }]

}];


const socials = [
{ label: 'Facebook', Icon: FacebookIcon },
{ label: 'Instagram', Icon: InstagramIcon },
{ label: 'WhatsApp', Icon: MessageCircleIcon },
{ label: 'YouTube', Icon: YoutubeIcon }];


export function SiteFooter() {
  return (
    <footer className="w-full bg-brand-navy pt-14 text-white">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2 lg:max-w-xs">
            <LalaLogo variant="light" />
            <p className="mt-4 text-xs leading-relaxed text-white/70">
              Lala is Namibia's smart rental marketplace connecting landlords and people
              looking for accommodation.
            </p>
            <ul className="mt-5 flex gap-2.5">
              {socials.map(({ label, Icon }) =>
              <li key={label}>
                  <a
                  href="#"
                  aria-label={label}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-orange">
                  
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                </li>
              )}
            </ul>
          </div>

          {columns.map((column) =>
          <nav key={column.heading} aria-label={column.heading}>
              <h3 className="text-[13px] font-bold text-white">{column.heading}</h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) =>
              <li key={link.label}>
                    <Link
                  to={link.to}
                  className="text-xs text-white/70 transition-colors hover:text-brand-orange">
                  
                      {link.label}
                    </Link>
                  </li>
              )}
              </ul>
            </nav>
          )}

          <div>
            <h3 className="text-[13px] font-bold text-white">Contact</h3>
            <ul className="mt-4 space-y-3 text-xs text-white/70">
              <li className="flex items-center gap-2.5">
                <PhoneIcon className="h-3.5 w-3.5 shrink-0 text-brand-orange" />
                <a href="tel:+264811234567" className="hover:text-white">
                  +264 81 123 4567
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MailIcon className="h-3.5 w-3.5 shrink-0 text-brand-orange" />
                <a href="mailto:hello@lala.com.na" className="hover:text-white">
                  hello@lala.com.na
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPinIcon className="h-3.5 w-3.5 shrink-0 text-brand-orange" />
                Windhoek, Namibia
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 py-5 text-center text-[11px] text-white/50">
          © 2025 Lala Namibia. All rights reserved.
        </div>
      </div>
    </footer>);

}