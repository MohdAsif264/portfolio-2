import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MapPin, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { SafeImage } from '../ui/SafeImage';
import { journeyHotels } from '../../data/projects';
import { EASE_LUX } from '../../utils/motion';

const categories = ['All', 'Current Property', 'Career Milestone'];

function HotelCard({ hotel, index, shouldReduceMotion }) {
  const [expanded, setExpanded] = useState(false);
  const isActive = hotel.status === 'Active Leadership';

  return (
    <motion.article
      className="lux-card lux-card-hover overflow-hidden group flex flex-col"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE_LUX }}
      layout={!shouldReduceMotion}
    >
      {/* Hotel Image Header with SafeImage & Graceful Fallback */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] image-zoom-container bg-[var(--color-navy-mid)]">
        <SafeImage
          src={hotel.image}
          fallbackSrc={hotel.fallbackImage}
          alt={hotel.alt}
          className="w-full h-full object-cover"
          placeholderType="hotel"
          title={hotel.title}
          subtitle={hotel.location}
          loading="lazy"
        />

        {/* Badges */}
        <span className="absolute top-4 left-4 pointer-events-none font-sans text-[11px] text-[var(--color-gold)] tracking-[0.2em] uppercase border border-[var(--color-gold)]/50 px-3 py-1 bg-[var(--color-navy)]/90 font-semibold">
          {hotel.category}
        </span>
        <div className="absolute bottom-4 right-4 pointer-events-none">
          <span className={`font-sans text-[11px] tracking-[0.14em] uppercase px-3 py-1 font-semibold ${
            isActive
              ? 'bg-[var(--color-gold)] text-[var(--color-on-gold)]'
              : 'text-[var(--color-ivory)]/85 border border-[var(--color-line-strong)] bg-[var(--color-navy)]/90'
          }`}>
            {hotel.status}
          </span>
        </div>
      </div>

      <div className="p-6 sm:p-8 flex flex-col flex-1">
        {/* Header */}
        <div className="mb-5">
          <p className="label text-[11px]! mb-2">
            {hotel.designation}
          </p>
          <h3 className="font-display text-2xl sm:text-[1.75rem] text-[var(--color-ivory)] group-hover:text-[var(--color-gold)] transition-colors leading-tight font-medium">
            {hotel.title}
          </h3>
          <div className="flex items-start gap-2 mt-3 text-[var(--color-muted)] font-sans text-xs sm:text-[13px]">
            <MapPin size={13} strokeWidth={1.5} className="text-[var(--color-gold)]/80 shrink-0 mt-0.5" />
            <span className="min-w-0">{hotel.location}</span>
          </div>
        </div>

        <div className="hairline mb-5" />

        {/* Overview */}
        <p className="font-sans text-sm text-[var(--color-muted)] leading-relaxed mb-6">
          {hotel.overview}
        </p>

        {/* Core Focus tags */}
        <div className="mb-6">
          <span className="label text-[11px]! block mb-3">
            Operational Focus:
          </span>
          <ul className="flex flex-wrap gap-2">
            {hotel.coreFocus.map((focus, i) => (
              <li
                key={i}
                className="font-sans text-xs text-[var(--color-ivory)]/85 px-3 py-1.5 border border-[var(--color-line)]"
              >
                {focus}
              </li>
            ))}
          </ul>
        </div>

        {/* Expand Details Toggle */}
        <div className="mt-auto">
          <button
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.12em] uppercase text-[var(--color-gold)] hover:text-[var(--color-gold-light)] transition-colors font-semibold min-h-11"
          >
            {expanded ? <><ChevronUp size={14} /> Less Details</> : <><ChevronDown size={14} /> View Property Summary</>}
          </button>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: EASE_LUX }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-[var(--color-line)] mt-2 space-y-2.5">
                  <div className="flex items-start gap-2.5 text-[var(--color-muted)] text-sm font-sans">
                    <CheckCircle size={14} strokeWidth={1.5} className="text-[var(--color-gold)] mt-0.5 shrink-0" />
                    <span>Location: {hotel.location}</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-[var(--color-muted)] text-sm font-sans">
                    <CheckCircle size={14} strokeWidth={1.5} className="text-[var(--color-gold)] mt-0.5 shrink-0" />
                    <span>Designation: {hotel.designation}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const shouldReduceMotion = useReducedMotion();

  const filtered = activeFilter === 'All'
    ? journeyHotels
    : journeyHotels.filter((h) => h.category === activeFilter);

  return (
    <section id="projects" className="relative section-pad bg-[var(--color-navy-light)] overflow-hidden transition-colors duration-500">
      <Container>
        <SectionHeading
          eyebrow="My Hospitality Journey"
          title="Hotels & Establishments"
          subtitle="Featuring the four verified career properties in Kushinagar, Uttar Pradesh associated with Ranjeet Singh Patel."
        />

        {/* Filter — segmented control */}
        <div className="flex justify-center mb-12">
          <div role="group" aria-label="Filter properties" className="grid grid-cols-[auto_1fr_1fr] sm:inline-flex w-full sm:w-auto border border-[var(--color-line-strong)] p-1 gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                aria-pressed={activeFilter === cat}
                className={`font-sans text-[11px] leading-tight tracking-[0.1em] sm:tracking-[0.16em] uppercase px-3 sm:px-6 min-h-11 font-semibold transition-colors duration-300 ${
                  activeFilter === cat
                    ? 'bg-[var(--color-gold)] text-[var(--color-on-gold)]'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-gold)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Hotels Grid */}
        <motion.div layout={!shouldReduceMotion} className="grid md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          <AnimatePresence mode="popLayout">
            {filtered.map((hotel, i) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                index={i}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Link */}
        <div className="mt-14 text-center">
          <Button href="/experience" variant="outline" size="md">
            View Career Timeline & Education
          </Button>
        </div>
      </Container>
    </section>
  );
}
