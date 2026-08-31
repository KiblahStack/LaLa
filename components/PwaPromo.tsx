import React from 'react';
import { CheckCircle2Icon } from 'lucide-react';
import { motion } from 'framer-motion';
import { LalaLogo } from './LalaLogo';

const perks = [
'Post on the go',
'Instant notifications',
'Save your favourites',
'Easy communication'];


function QrCode() {
  const cells: boolean[] = [];
  for (let i = 0; i < 21 * 21; i++) {
    cells.push((i * 7919 + Math.floor(i / 21) * 104729) % 5 < 2);
  }
  const isFinder = (row: number, col: number) =>
  row < 7 && col < 7 || row < 7 && col > 13 || row > 13 && col < 7;

  return (
    <div
      aria-hidden="true"
      className="grid h-24 w-24 grid-cols-[repeat(21,1fr)] grid-rows-[repeat(21,1fr)] overflow-hidden rounded bg-white p-1">
      
      {cells.map((on, i) => {
        const row = Math.floor(i / 21);
        const col = i % 21;
        const finder = isFinder(row, col);
        const filled = finder ?
        (row % 6 === 0 || col % 6 === 0 || row % 6 >= 2 && row % 6 <= 3 && col % 6 >= 2 && col % 6 <= 3) &&
        !(row === 7 || col === 7) :
        on;
        return (
          <span key={i} className={filled ? 'bg-brand-navyDark' : 'bg-transparent'} />);

      })}
    </div>);

}

export function PwaPromo() {
  return (
    <section aria-labelledby="pwa-heading" className="w-full bg-white pb-14">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-2xl bg-brand-navy px-6 pt-10 sm:px-10 lg:px-12">
          
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-end lg:gap-14">
            {/* Phone mock */}
            <div className="relative w-[168px] shrink-0 self-center lg:self-end">
              <div className="translate-y-2 rounded-t-[28px] border-[6px] border-b-0 border-slate-900 bg-white pb-2 shadow-float lg:translate-y-3">
                <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-slate-200" />
                <div className="px-3 pb-1 pt-3">
                  <LalaLogo className="scale-[0.7] origin-left" />
                  <div className="mt-3 rounded-lg bg-brand-canvas p-2">
                    <div className="h-1.5 w-14 rounded-full bg-slate-300" />
                    <div className="mt-1.5 h-1.5 w-20 rounded-full bg-slate-200" />
                  </div>
                  {[0, 1, 2].map((i) =>
                  <div key={i} className="mt-2 flex items-center gap-2">
                      <span className="h-8 w-9 shrink-0 rounded bg-slate-200" />
                      <span className="flex-1">
                        <span className="block h-1.5 w-full rounded-full bg-slate-300" />
                        <span className="mt-1.5 block h-1.5 w-2/3 rounded-full bg-slate-200" />
                        <span className="mt-1.5 block h-1.5 w-1/3 rounded-full bg-brand-orange/70" />
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Copy */}
            <div className="flex-1 pb-10 text-center lg:text-left">
              <h2
                id="pwa-heading"
                className="text-2xl font-extrabold leading-snug text-white sm:text-[26px]">
                
                Take Lala with you everywhere.
                <br />
                Find. Connect. Move.
                <br />
                All in one place.
              </h2>
            </div>

            {/* Perks */}
            <ul className="pb-10 space-y-3 lg:w-56">
              {perks.map((perk) =>
              <li key={perk} className="flex items-center gap-2.5 text-[13px] text-white/90">
                  <CheckCircle2Icon className="h-4 w-4 shrink-0 text-[#4ea3e0]" />
                  {perk}
                </li>
              )}
            </ul>

            {/* QR */}
            <div className="flex items-center gap-3 pb-10">
              <QrCode />
              <p className="max-w-[90px] text-[11px] leading-snug text-white/80">
                Scan to install Lala App
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>);

}