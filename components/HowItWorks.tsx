import React from 'react';
import { CheckCircleIcon, MessageCircleIcon, SearchIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
{
  title: '1. Search or Post',
  body: "Find properties or post what you're looking for.",
  Icon: SearchIcon,
  surface: 'bg-brand-blueSoft',
  tint: 'text-brand-navy'
},
{
  title: '2. Connect',
  body: 'Contact directly with landlords or tenants.',
  Icon: MessageCircleIcon,
  surface: 'bg-brand-orangeSoft',
  tint: 'text-brand-orange'
},
{
  title: '3. Move In',
  body: 'Find the right place and make it home.',
  Icon: CheckCircleIcon,
  surface: 'bg-brand-greenSoft',
  tint: 'text-brand-green'
}];


export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="w-full bg-brand-canvas py-16">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <h2 id="how-heading" className="text-2xl font-extrabold text-brand-navy">
            How It Works
          </h2>
          <span className="mt-3 h-0.5 w-10 rounded-full bg-brand-orange" />
        </div>

        <div className="relative mt-12">
          <span
            aria-hidden="true"
            className="absolute left-[16%] right-[16%] top-7 hidden border-t border-dashed border-slate-300 md:block" />
          
          <div className="relative grid gap-10 md:grid-cols-3">
            {steps.map((step, i) =>
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: i * 0.12, ease: 'easeOut' }}
              className="flex flex-col items-center text-center">
              
                <span
                className={`inline-flex h-14 w-14 items-center justify-center rounded-full ${step.surface} ${step.tint} ring-8 ring-brand-canvas`}>
                
                  <step.Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-sm font-bold text-brand-navy">{step.title}</h3>
                <p className="mt-2 max-w-[15rem] text-xs leading-relaxed text-slate-500">
                  {step.body}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>);

}