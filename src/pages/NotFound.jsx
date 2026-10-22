import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export function NotFound() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-navy)] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-image" aria-hidden="true" />
      <div className="absolute inset-0 bg-[var(--color-navy)]/90" aria-hidden="true" />

      <div className="relative z-10 text-center px-5">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div aria-hidden="true" className="font-display text-[clamp(8rem,30vw,13rem)] leading-none font-medium text-gold-gradient opacity-40 select-none">
            404
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-[var(--color-ivory)] -mt-4 mb-4 font-medium">
            Page Not Found
          </h1>
          <div className="gold-divider mb-6" />
          <p className="font-sans text-[15px] text-[var(--color-muted)] max-w-sm mx-auto mb-10">
            The page you're looking for doesn't exist or may have been moved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 px-7 min-h-12 bg-[var(--color-gold)] text-[var(--color-on-gold)] font-sans text-[11px] tracking-[0.18em] uppercase font-semibold hover:bg-[var(--color-gold-light)] transition-colors"
            >
              <Home size={14} /> Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-7 min-h-12 border border-[var(--color-gold)]/60 text-[var(--color-gold)] font-sans text-[11px] tracking-[0.18em] uppercase font-semibold hover:bg-[var(--color-gold)] hover:text-[var(--color-on-gold)] transition-colors"
            >
              <ArrowLeft size={14} /> Go Back
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
