import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MapPin, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { SafeImage } from '../ui/SafeImage';
import { journeyHotels } from '../../data/projects';

const categories = ['All', 'Current Property', 'Career Milestone'];

function HotelCard({ hotel, index, shouldReduceMotion }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="glass-card glass-card-hover overflow-hidden group flex flex-col justify-between border border-[var(--color-gold)]/20"
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      layout
    >
      <div>
        {/* Hotel Image Header with SafeImage & Graceful Fallback */}
        <div className="relative w-full h-52 sm:h-56 image-zoom-container overflow-hidden border-b border-[var(--color-gold)]/20 bg-[var(--color-navy-mid)]">
          <SafeImage
            src={hotel.image}
            fallbackSrc={hotel.fallbackImage}
            alt={hotel.alt}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            placeholderType="hotel"
            title={hotel.title}
            subtitle={hotel.location}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)] via-transparent to-black/30 pointer-events-none" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="font-sans text-[9px] text-[var(--color-gold)] tracking-[0.2em] uppercase border border-[var(--color-gold)]/40 px-2.5 py-0.5 bg-[var(--color-navy)]/85 backdrop-blur-md font-medium">
              {hotel.category}
            </span>
          </div>

          <div className="absolute bottom-2.5 right-3">
            <span className={`font-sans text-[9px] tracking-wider px-2.5 py-0.5 border backdrop-blur-md ${
              hotel.status === 'Active Leadership'
                ? 'text-emerald-400 border-emerald-500/30 bg-emerald-950/70 font-medium'
                : 'text-[var(--color-ivory)]/75 border-[var(--color-gold)]/20 bg-[var(--color-navy)]/80'
            }`}>
              {hotel.status}
            </span>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          {/* Header */}
          <div className="mb-3">
            <h3 className="font-serif text-lg sm:text-xl text-[var(--color-ivory)] group-hover:text-[var(--color-gold)] transition-colors leading-snug font-medium">
              {hotel.title}
            </h3>
            <p className="font-sans text-xs text-[var(--color-gold)] font-medium mt-0.5">
              {hotel.designation}
            </p>
            <div className="flex items-start gap-1.5 mt-2 text-[var(--color-muted)] font-sans text-xs">
              <MapPin size={11} className="text-[var(--color-gold)]/60 shrink-0" />
              <span className="min-w-0">{hotel.location}</span>
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-[var(--color-gold)]/25 to-transparent mb-3.5" />

          {/* Overview */}
          <p className="font-sans text-xs sm:text-[13px] text-[var(--color-muted)] leading-relaxed mb-4">
            {hotel.overview}
          </p>

          {/* Core Focus tags */}
          <div className="mb-4">
            <span className="font-sans text-[10px] text-[var(--color-gold)]/90 uppercase tracking-wider block mb-2 font-medium">
              Operational Focus:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {hotel.coreFocus.map((focus, i) => (
                <span
                  key={i}
                  className="font-sans text-[10px] text-[var(--color-ivory)]/80 px-2.5 py-0.5 bg-[var(--color-navy)]/60 border border-[var(--color-gold)]/15"
                >
                  {focus}
                </span>
              ))}
            </div>
          </div>

          {/* Expand Details Toggle */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 font-sans text-xs text-[var(--color-gold)] hover:text-[var(--color-gold-light)] transition-colors font-medium py-1"
          >
            {expanded ? <><ChevronUp size={13} /> Less Details</> : <><ChevronDown size={13} /> View Property Summary</>}
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="pt-3 border-t border-[var(--color-gold)]/15 mt-3 space-y-2">
                  <div className="flex items-start gap-2 text-[var(--color-muted)] text-xs font-sans">
                    <CheckCircle size={12} className="text-[var(--color-gold)] mt-0.5 shrink-0" />
                    <span>Location: {hotel.location}</span>
                  </div>
                  <div className="flex items-start gap-2 text-[var(--color-muted)] text-xs font-sans">
                    <CheckCircle size={12} className="text-[var(--color-gold)] mt-0.5 shrink-0" />
                    <span>Designation: {hotel.designation}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const shouldReduceMotion = useReducedMotion();

  const filtered = activeFilter === 'All'
    ? journeyHotels
    : journeyHotels.filter((h) => h.category === activeFilter);

  return (
    <section id="projects" className="relative py-20 lg:py-24 bg-[var(--color-navy-light)] overflow-hidden transition-colors duration-500">
      <Container className="max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="My Hospitality Journey"
          title="Hotels & Establishments"
          subtitle="Featuring the four verified career properties in Kushinagar, Uttar Pradesh associated with Ranjeet Singh Patel."
        />

        {/* Filter pills */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`font-sans text-xs tracking-wider uppercase px-4 py-1.5 border transition-all duration-300 rounded-[2px] ${
                activeFilter === cat
                  ? 'bg-[var(--color-gold)] text-[var(--color-navy)] border-[var(--color-gold)] font-medium shadow-[0_4px_16px_rgba(201,168,76,0.3)]'
                  : 'text-[var(--color-muted)] border-[var(--color-muted)]/20 hover:border-[var(--color-gold)]/60 hover:text-[var(--color-gold)]'
              }`}
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Hotels Grid */}
        <motion.div layout className="grid md:grid-cols-2 gap-6 lg:gap-8">
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
        <motion.div
          className="mt-10 text-center"
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Button href="/experience" variant="outline" size="sm">
            View Career Timeline & Education
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
