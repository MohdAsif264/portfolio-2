import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Phone, Download, Briefcase, GraduationCap, Building2, Globe2, MessageCircle } from 'lucide-react';
import { profile } from '../../data/profile';
import { Button } from '../ui/Button';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { SafeImage } from '../ui/SafeImage';

// Floating particle component
function Particle({ style, duration, delay, shouldReduceMotion }) {
  if (shouldReduceMotion) return null;
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-[var(--color-gold)]/30 pointer-events-none"
      style={style}
      animate={{ y: [-10, 10, -10], opacity: [0.25, 0.75, 0.25] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

// Floating particle positions (deterministic to avoid Math.random during render)
const particlePositions = [
  { left: 12, top: 15, size: 3, duration: 5.2, delay: 0.4 },
  { left: 28, top: 8, size: 4, duration: 6.1, delay: 1.2 },
  { left: 45, top: 22, size: 2, duration: 4.8, delay: 0.8 },
  { left: 67, top: 12, size: 3, duration: 5.5, delay: 1.6 },
  { left: 82, top: 28, size: 4, duration: 6.3, delay: 0.3 },
  { left: 8, top: 45, size: 2, duration: 4.5, delay: 1.9 },
  { left: 35, top: 55, size: 3, duration: 5.8, delay: 0.7 },
  { left: 58, top: 42, size: 4, duration: 6.5, delay: 1.4 },
  { left: 75, top: 58, size: 2, duration: 4.2, delay: 0.5 },
  { left: 92, top: 48, size: 3, duration: 5.6, delay: 1.8 },
  { left: 15, top: 72, size: 4, duration: 6.0, delay: 0.9 },
  { left: 40, top: 78, size: 2, duration: 4.9, delay: 1.3 },
  { left: 62, top: 68, size: 3, duration: 5.3, delay: 0.6 },
  { left: 85, top: 75, size: 4, duration: 6.2, delay: 1.5 },
  { left: 22, top: 88, size: 2, duration: 4.7, delay: 0.2 },
  { left: 50, top: 92, size: 3, duration: 5.9, delay: 1.1 },
  { left: 72, top: 85, size: 2, duration: 4.6, delay: 0.1 },
  { left: 95, top: 92, size: 3, duration: 5.4, delay: 1.7 },
];

const particles = particlePositions.map((p, i) => ({
  id: i,
  style: {
    left: `${p.left}%`,
    top: `${p.top}%`,
    width: `${p.size}px`,
    height: `${p.size}px`,
  },
  duration: p.duration,
  delay: p.delay,
}));

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [cvRequested, setCvRequested] = useState(false);

  const handleDownloadCV = (e) => {
    if (!profile.resumeAvailable) {
      e.preventDefault();
      setCvRequested(true);
      setTimeout(() => setCvRequested(false), 4500);
    }
  };

  return (
    <section
      id="hero"
      className="hero-portfolio relative min-h-[760px] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[var(--color-navy)] transition-colors duration-500 pt-28 sm:pt-32 pb-24 lg:pb-20"
    >
      {/* Background gradient layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 hero-image" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-[var(--color-gold)]/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[var(--color-navy-mid)]/60 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />
      </div>

      {/* Floating particles (disabled if reduced motion) */}
      {!shouldReduceMotion && particles.map((p) => (
        <Particle key={p.id} style={p.style} duration={p.duration} delay={p.delay} shouldReduceMotion={shouldReduceMotion} />
      ))}

      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(var(--color-gold) 1px, transparent 1px), linear-gradient(90deg, var(--color-gold) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-16 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        {/* Left text — 7 cols */}
        <div className="hero-copy lg:col-span-7">
          {/* Eyebrow */}
          <motion.div
            className="hero-eyebrow flex items-center gap-2.5 mb-4"
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="h-px w-6 sm:w-8 bg-[var(--color-gold)]" />
            <span className="font-sans text-[10px] sm:text-[11px] text-[var(--color-gold)] tracking-[0.25em] uppercase font-semibold">
              {profile.eyebrow}
            </span>
          </motion.div>

          {/* Name & Public Title */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mb-4"
          >
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-[var(--color-ivory)] leading-[0.98] tracking-[-0.04em] mb-3">
              Ranjeet <span className="text-gold-gradient">Singh Patel</span>
            </h1>
            <p className="font-sans text-xs sm:text-sm text-[var(--color-gold)] font-semibold tracking-[0.12em] uppercase">
              {profile.publicTitle}
            </p>
            <p className="hero-meta font-sans text-xs text-[var(--color-muted)] mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>{profile.hotel}</span>
              <span className="text-[var(--color-gold)]/50">•</span>
              <span>{profile.location}</span>
            </p>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            className="font-serif text-xl sm:text-2xl lg:text-3xl text-[var(--color-ivory)] font-medium mb-5 leading-snug italic max-w-2xl"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            "{profile.mainHeading}"
          </motion.h2>

          {/* Gold divider */}
          <motion.div
            className="w-20 h-px bg-gradient-to-r from-[var(--color-gold)] to-transparent mb-5"
            initial={shouldReduceMotion ? {} : { scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          />

          {/* Hero Description */}
          <motion.div
            className="space-y-2.5 mb-6 max-w-2xl text-[var(--color-ivory)]/85 font-sans text-xs sm:text-sm leading-relaxed"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <p>
              With <strong>12 years of professional experience</strong> in the hospitality industry, Ranjeet Singh Patel brings a background spanning front-office services, guest handling, and hotel operations in Kushinagar, Uttar Pradesh. Holding a <strong>Master of Hotel Management (M.H.M.)</strong>, he combines formal hospitality education with practical experience gained across different hotel environments.
            </p>
            <p className="text-[var(--color-muted)]">
              His professional journey reflects an understanding of guest-facing service, hospitality coordination, and the importance of maintaining a welcoming and professional environment.
            </p>
            <p className="text-[var(--color-gold)]/90 italic font-medium pt-0.5">
              "{profile.supportingStatement}"
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="hero-actions flex flex-wrap items-center gap-2.5 sm:gap-3 mb-7"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <Button
              href="#experience"
              variant="primary"
              size="sm"
              icon={<Briefcase size={13} />}
            >
              Explore My Experience
            </Button>
            <Button
              href={profile.telUrl}
              variant="outline"
              size="sm"
              icon={<Phone size={13} />}
              iconPosition="left"
            >
              Call Now
            </Button>
            <Button
              href={profile.resumeAvailable ? profile.resumeUrl : "#contact"}
              variant="dark"
              size="sm"
              icon={<Download size={13} />}
              onClick={handleDownloadCV}
              download={profile.resumeAvailable}
            >
              {profile.resumeAvailable ? 'Download CV' : 'Request CV'}
            </Button>
            <Button href={profile.whatsappUrl} target="_blank" rel="noopener noreferrer" variant="ghost" size="sm" icon={<MessageCircle size={13} />}>
              WhatsApp
            </Button>
          </motion.div>

          {/* CV Status Feedback if file pending */}
          {cvRequested && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-5 p-2.5 bg-[var(--color-navy-mid)] border border-[var(--color-gold)]/40 text-[11px] text-[var(--color-gold)] rounded-[2px]"
            >
              📄 <strong>Official CV Status:</strong> The full manager CV is available on request. Please contact Ranjeet directly at <a href={profile.mailUrl} className="underline">{profile.email}</a> or via <a href={profile.whatsappUrl} className="underline">WhatsApp</a>.
            </motion.div>
          )}

          {/* Verified Stats Bar — 4 Compact Highlights */}
          <motion.div
            className="hero-stats grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-[var(--color-gold)]/15 pt-5"
            initial={shouldReduceMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.65 }}
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-[var(--color-gold)] mb-0.5">
                <Briefcase size={13} />
                <span className="font-serif text-xl sm:text-2xl font-bold text-[var(--color-ivory)]">
                  <AnimatedCounter value="12" />
                </span>
                <span className="font-serif text-xs font-semibold text-[var(--color-gold)]">Years</span>
              </div>
              <span className="font-sans text-[10px] text-[var(--color-muted)] tracking-wider uppercase font-medium">
                Hospitality Experience
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-[var(--color-gold)] mb-0.5">
                <GraduationCap size={13} />
                <span className="font-serif text-lg sm:text-xl font-bold text-[var(--color-ivory)]">M.H.M.</span>
              </div>
              <span className="font-sans text-[10px] text-[var(--color-muted)] tracking-wider uppercase font-medium">
                Master of Hotel Mgmt
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-[var(--color-gold)] mb-0.5">
                <Building2 size={13} />
                <span className="font-serif text-xl sm:text-2xl font-bold text-[var(--color-ivory)]">
                  <AnimatedCounter value="4" />
                </span>
                <span className="font-serif text-xs font-semibold text-[var(--color-gold)]">Entries</span>
              </div>
              <span className="font-sans text-[10px] text-[var(--color-muted)] tracking-wider uppercase font-medium">
                Listed Career Entries
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-[var(--color-gold)] mb-0.5">
                <Globe2 size={13} />
                <span className="font-serif text-base sm:text-lg font-bold text-[var(--color-ivory)]">2 Lang.</span>
              </div>
              <span className="font-sans text-[10px] text-[var(--color-muted)] tracking-wider uppercase font-medium">
                Hindi & English
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right — Photo / Ornamental card — 5 cols */}
        <motion.div
          className="hero-portrait lg:col-span-5 relative flex items-center justify-center mt-4 lg:mt-0 overflow-visible"
          initial={shouldReduceMotion ? {} : { opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          {/* Decorative corner frames */}
          <div className="absolute -top-3 -left-3 w-16 h-16 border-t border-l border-[var(--color-gold)]/70 z-20 pointer-events-none" />
          <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b border-r border-[var(--color-gold)]/70 z-20 pointer-events-none" />

          {/* Ambient Glow behind image */}
          <div className="absolute inset-0 bg-[var(--color-gold)]/10 blur-xl rounded-sm scale-95 pointer-events-none" />

          {/* Photo container */}
          <div className="relative w-full max-w-md aspect-[4/5] bg-gradient-to-br from-[var(--color-navy-mid)] to-[var(--color-charcoal)] border border-[var(--color-gold)]/35 overflow-hidden shadow-2xl group portrait-frame">
            <SafeImage
              src={profile.photo}
              fallbackSrc={profile.photoFallback}
              alt="Ranjeet Singh Patel — Hotel General Manager, Hotel The Ideal, Kushinagar"
              className="w-full h-full object-cover object-[50%_15%] transition-transform duration-700 group-hover:scale-105"
              placeholderType="portrait"
              title="Ranjeet Singh Patel"
              subtitle="General Manager · Hotel The Ideal"
              loading="eager"
            />

            {/* Bottom gradient overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[var(--color-navy)] via-[var(--color-navy)]/70 to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 z-10 pointer-events-none">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--color-gold)]/50 to-transparent mb-1.5" />
              <div className="font-serif text-xs sm:text-sm text-[var(--color-ivory)] text-center font-medium">
                Ranjeet Singh Patel
              </div>
              <div className="font-sans text-[9px] text-[var(--color-gold)] tracking-[0.25em] uppercase text-center font-medium">
                Hotel The Ideal · Kushinagar
              </div>
            </div>
          </div>

          {/* Floating experience badge */}
          <motion.div
            className="absolute -bottom-3 -left-3 glass-card px-3.5 py-2 border border-[var(--color-gold)]/40 z-20 shadow-xl"
            animate={shouldReduceMotion ? {} : { y: [-2, 2, -2] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <div className="font-serif text-[11px] sm:text-xs text-[var(--color-gold)] font-bold">12 Years Experience</div>
                <div className="font-sans text-[8px] sm:text-[9px] text-[var(--color-ivory)]/75">Hotel Operations & Guest Care</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-navy)]"
        animate={shouldReduceMotion ? {} : { y: [0, 4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="font-sans text-[8px] tracking-[0.3em] uppercase">Explore Profile</span>
        <ArrowDown size={13} />
      </motion.a>
    </section>
  );
}
