import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-navy)] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-navy)] via-[var(--color-navy-light)] to-[var(--color-charcoal)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--color-gold)]/4 rounded-full blur-3xl" />

      <div className="relative z-10 text-center px-5">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="font-serif text-[180px] leading-none font-bold text-gold-gradient opacity-20 select-none">
            404
          </div>
          <h1 className="font-serif text-3xl text-[var(--color-ivory)] -mt-8 mb-4">
            Page Not Found
          </h1>
          <div className="gold-divider mb-5" />
          <p className="font-sans text-sm text-[var(--color-muted)] max-w-sm mx-auto mb-8">
            The page you're looking for doesn't exist or may have been moved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 px-7 py-3.5 bg-[var(--color-gold)] text-[var(--color-navy)] font-sans text-xs tracking-wider uppercase font-medium hover:bg-[var(--color-gold-light)] transition-all"
            >
              <Home size={14} /> Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-7 py-3.5 border border-[var(--color-gold)]/50 text-[var(--color-gold)] font-sans text-xs tracking-wider uppercase hover:bg-[var(--color-gold)] hover:text-[var(--color-navy)] transition-all"
            >
              <ArrowLeft size={14} /> Go Back
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
