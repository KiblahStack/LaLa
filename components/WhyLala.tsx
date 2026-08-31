import React from 'react';
import {
  ArrowLeftRightIcon,
  BadgeCheckIcon,
  SearchIcon,
  ShieldCheckIcon,
  SmartphoneIcon } from
'lucide-react';
import { motion } from 'framer-motion';

const reasons = [
{
  title: 'Two-sided Marketplace',
  body: 'Landlords and tenants connect directly.',
  Icon: ArrowLeftRightIcon
},
{
  title: 'Easy & Fast',
  body: 'Post your property or request in minutes.',
  Icon: BadgeCheckIcon
},
{
  title: 'Secure & Trusted',
  body: 'Verified users and safe connections.',
  Icon: ShieldCheckIcon
},
{
  title: 'Smart Search',
  body: 'Find exactly what you need with advanced filters.',
  Icon: SearchIcon
},
{
  title: 'Works Everywhere',
  body: 'Use on any device, anytime, anywhere.',
  Icon: SmartphoneIcon
}];


export function WhyLala() {
  return (
    <section aria-labelledby="why-lala" className="w-full bg-brand-canvas py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <h2 id="why-lala" className="text-2xl font-extrabold text-brand-navy">
            Why Lala?
          </h2>
          <span className="mt-3 h-0.5 w-10 rounded-full bg-brand-orange" />
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {reasons.map((reason, i) =>
          <motion.div
            key={reason.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.35, delay: i * 0.07, ease: 'easeOut' }}
            className="flex flex-col items-center px-2 text-center">
            
              <reason.Icon className="h-7 w-7 text-brand-navy" strokeWidth={1.9} />
              <h3 className="mt-4 text-[13px] font-bold text-brand-navy">{reason.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">{reason.body}</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}