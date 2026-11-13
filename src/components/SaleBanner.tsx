import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Reveal } from './motion.tsx';

export default function SaleBanner() {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#A84E2B,#C05A30)] px-6 py-12 text-white sm:px-10 lg:px-14">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/20 blur-3xl"
          animate={{ opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-white/10 blur-3xl"
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/80">
            Seasonal sale
          </p>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-bold leading-tight sm:text-4xl">
            Up to 20% off top-rated picks
          </h2>
          <p className="mt-3 max-w-xl text-white/85">
            Our highest-rated tech, jewellery and style — now with 20% off, for a
            limited time.
          </p>
          <Link
            to="/?sale=1#featured"
            className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-clay shadow-sm transition hover:bg-cream"
          >
            Shop the sale
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
