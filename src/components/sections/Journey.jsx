import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Expand, X, MapPin, ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { SafeImage } from '../ui/SafeImage';
import { profile } from '../../data/profile';
import { reveal, EASE_LUX } from '../../utils/motion';

const POSTER_FALLBACK = '/images/ranjeet/kushinagar-journey.png';
const POSTER_ALT =
  'Kushinagar — Journey of Life, Service to Humanity: poster featuring Ranjeet Singh Patel with the Mahaparinirvana Stupa and reclining Buddha of Kushinagar';

function PosterLightbox({ open, onClose }) {
  const closeRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.activeElement;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      previous?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Kushinagar — Journey of Life and Service"
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8 bg-[#050a14]/92 backdrop-blur-sm"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close image"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 flex items-center justify-center border border-[#c9a96e]/60 text-[#e4cfa0] hover:bg-[#c9a96e] hover:text-[#0a1424] transition-colors"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
          <motion.img
            src={profile.kushinagarPoster || POSTER_FALLBACK}
            alt={POSTER_ALT}
            className="max-w-full max-h-[85vh] w-auto h-auto shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] ring-1 ring-[#c9a96e]/40"
            initial={shouldReduceMotion ? false : { scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_LUX }}
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Journey() {
  const shouldReduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <section id="journey" className="relative section-pad bg-[var(--color-navy)] overflow-hidden transition-colors duration-500">
      {/* Soft golden-hour wash echoing the poster's sunset palette */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_75%_40%,color-mix(in_srgb,var(--color-gold)_9%,transparent),transparent_70%)]" />

      <Container className="relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">

          {/* Copy */}
          <motion.div className="lg:col-span-4 order-2 lg:order-1" {...reveal(shouldReduceMotion)}>
            <span className="eyebrow mb-6">Kushinagar</span>
            <h2 className="display-title text-balance mb-6">
              Journey of Life <span className="italic text-[var(--color-gold)]">&amp;</span> Service
            </h2>
            <div className="w-16 h-px bg-[var(--color-gold)] mb-7" />
            <p className="font-display text-xl sm:text-2xl italic leading-relaxed text-[var(--color-ivory)]/90 mb-8">
              "{profile.supportingStatement}"
            </p>

            <ul className="border-t border-[var(--color-line)] mb-9">
              <li className="flex items-start gap-3 py-4 border-b border-[var(--color-line)]">
                <span aria-hidden="true" className="w-1.5 h-1.5 rotate-45 bg-[var(--color-gold)] mt-2 shrink-0" />
                <span className="font-sans text-sm text-[var(--color-ivory)]/85">{profile.hotel}</span>
              </li>
              <li className="flex items-start gap-3 py-4 border-b border-[var(--color-line)]">
                <MapPin size={14} strokeWidth={1.5} className="text-[var(--color-gold)] mt-0.5 shrink-0" />
                <span className="font-sans text-sm text-[var(--color-ivory)]/85">{profile.location}</span>
              </li>
            </ul>

            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={() => setOpen(true)} variant="primary" size="sm" icon={<Expand size={13} />}>
                View Full Image
              </Button>
              <Button href="/projects" variant="outline" size="sm" icon={<ArrowRight size={13} />}>
                My Hospitality Journey
              </Button>
            </div>
          </motion.div>

          {/* Poster — native 3:2, shown uncropped so its lettering stays intact */}
          <motion.div
            className="lg:col-span-8 order-1 lg:order-2 relative pr-4 pb-4 sm:pr-6 sm:pb-6"
            {...reveal(shouldReduceMotion, { delay: 0.1, y: 30, duration: 0.9 })}
          >
            <div aria-hidden="true" className="absolute top-4 left-4 sm:top-6 sm:left-6 right-0 bottom-0 border border-[var(--color-gold)]/50 pointer-events-none" />

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="View the Kushinagar — Journey of Life and Service image in full size"
              className="group relative block w-full aspect-[3/2] overflow-hidden bg-[var(--color-navy-mid)] shadow-[var(--shadow-soft)] image-zoom-container cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-navy)]"
            >
              <SafeImage
                src={profile.kushinagarPoster}
                fallbackSrc={POSTER_FALLBACK}
                alt={POSTER_ALT}
                className="w-full h-full object-cover"
                placeholderType="hotel"
                title="Journey of Life and Service"
                subtitle={profile.location}
                loading="lazy"
              />
              <span aria-hidden="true" className="absolute inset-3 sm:inset-4 border border-[#e4cfa0]/0 group-hover:border-[#e4cfa0]/60 transition-colors duration-700 pointer-events-none" />
              <span className="absolute top-3 right-3 sm:top-5 sm:right-5 inline-flex items-center gap-2 px-3.5 py-2 bg-[#0a1424]/85 border border-[#c9a96e]/50 text-[#e4cfa0] font-sans text-[10px] font-semibold tracking-[0.2em] uppercase opacity-100 sm:opacity-0 sm:-translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 transition-all duration-500">
                <Expand size={12} strokeWidth={1.75} /> View
              </span>
            </button>
          </motion.div>
        </div>
      </Container>

      <PosterLightbox open={open} onClose={close} />
    </section>
  );
}
