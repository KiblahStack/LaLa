import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, HomeIcon, Building2Icon, UserSearchIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionLink = motion(Link);

const actions = [
{
  id: 'find',
  title: 'Find Accommodation',
  body: 'Browse available rentals in your area.',
  cta: 'Explore Rentals',
  to: '/find',
  Icon: HomeIcon,
  surface: 'bg-brand-blueSoft',
  circle: 'bg-brand-navy',
  title_color: 'text-brand-navy',
  cta_color: 'text-brand-navy'
},
{
  id: 'request',
  title: 'Looking for Accommodation',
  body: "Post what you're looking for and let landlords find you.",
  cta: 'Post a Request',
  to: '/post-request',
  Icon: UserSearchIcon,
  surface: 'bg-brand-orangeSoft',
  circle: 'bg-brand-orange',
  title_color: 'text-brand-orange',
  cta_color: 'text-brand-orange'
},
{
  id: 'advertise',
  title: 'Advertise Property',
  body: 'List your property for free and reach thousands.',
  cta: 'Post Your Property',
  to: '/listing/new',
  Icon: Building2Icon,
  surface: 'bg-brand-greenSoft',
  circle: 'bg-brand-green',
  title_color: 'text-brand-green',
  cta_color: 'text-brand-green'
}];


export function QuickActions() {
  return (
    <section
      id="advertise"
      aria-label="Quick actions"
      className="mx-auto w-full max-w-7xl px-4 pb-14 pt-24 sm:px-6 lg:px-8">
      
      <div className="grid gap-5 md:grid-cols-3">
        {actions.map((action, i) =>
        <MotionLink
          key={action.id}
          to={action.to}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
          className={`group flex flex-col items-center rounded-2xl border border-transparent ${action.surface} px-8 py-9 text-center transition-all hover:-translate-y-1 hover:shadow-card`}>
          
            <span
            className={`inline-flex h-14 w-14 items-center justify-center rounded-full ${action.circle} text-white`}>
            
              <action.Icon className="h-6 w-6" />
            </span>
            <h3 className={`mt-5 text-base font-bold ${action.title_color}`}>
              {action.title}
            </h3>
            <p className="mt-3 max-w-[16rem] text-[13px] leading-relaxed text-slate-500">
              {action.body}
            </p>
            <span
            className={`mt-6 inline-flex items-center gap-2 text-[13px] font-semibold ${action.cta_color}`}>
            
              {action.cta}
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </MotionLink>
        )}
      </div>
    </section>);

}