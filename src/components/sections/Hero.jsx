import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Phone, Download, Briefcase, GraduationCap, Building2, Globe2, MessageCircle } from 'lucide-react';
import { profile } from '../../data/profile';
import { Button } from '../ui/Button';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { SafeImage } from '../ui/SafeImage';
import { EASE_LUX } from '../../utils/motion';

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

  // Staggered on-load entrance for hero copy
  const enter = (delay, y = 18) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE_LUX },
        };

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[var(--color-navy)] transition-colors duration-500 pt-32 sm:pt-36 lg:pt-40"
    >
      {/* Cinematic background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 hero-image" />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_24rem] xl:grid-cols-[minmax(0,1fr)_28rem] gap-14 lg:gap-12 items-center">

          {/* Left — Executive introduction */}
          <div className="text-left min-w-0">
            <motion.div className="mb-7" {...enter(0.1, 0)}>
              <span className="eyebrow text-[10px] sm:text-[11px]">{profile.eyebrow}</span>
            </motion.div>

            {/* Name & Public Title */}
            <motion.div className="mb-8" {...enter(0.2, 24)}>
              <h1 className="font-serif text-[clamp(2.9rem,8vw,6rem)] font-medium text-[var(--color-ivory)] leading-[0.95] tracking-[-0.03em] mb-6">
                Ranjeet <span className="block sm:inline italic font-normal text-gold-gradient pr-1">Singh Patel</span>
              </h1>
              <p className="font-sans text-xs sm:text-[13px] text-[var(--color-gold)] font-semibold tracking-[0.16em] uppercase leading-relaxed">
                {profile.publicTitle}
              </p>
              <p className="font-sans text-sm text-[var(--color-muted)] mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>{profile.hotel}</span>
                <span aria-hidden="true" className="w-1 h-1 rotate-45 bg-[var(--color-gold)]/70" />
                <span>{profile.location}</span>
              </p>
            </motion.div>

            {/* Main Heading */}
            <motion.h2
              className="font-display text-[clamp(1.5rem,3vw,2.15rem)] text-[var(--color-ivory)] font-medium italic leading-snug max-w-2xl pl-5 sm:pl-6 border-l border-[var(--color-gold)] mb-8"
              {...enter(0.32)}
            >
              "{profile.mainHeading}"
            </motion.h2>

            {/* Hero Description */}
            <motion.div
              className="space-y-4 mb-9 max-w-2xl font-sans text-[15px] leading-[1.85] text-[var(--color-ivory)]/80"
              {...enter(0.42)}
            >
              <p>
                With <strong className="font-semibold text-[var(--color-ivory)]">12 years of professional experience</strong> in the hospitality industry, Ranjeet Singh Patel brings a background spanning front-office services, guest handling, and hotel operations in Kushinagar, Uttar Pradesh. Holding a <strong className="font-semibold text-[var(--color-ivory)]">Master of Hotel Management (M.H.M.)</strong>, he combines formal hospitality education with practical experience gained across different hotel environments.
              </p>
              <p className="text-[var(--color-muted)]">
                His professional journey reflects an understanding of guest-facing service, hospitality coordination, and the importance of maintaining a welcoming and professional environment.
              </p>
              <p className="font-display text-lg sm:text-xl text-[var(--color-gold)] italic leading-relaxed pt-1">
                "{profile.supportingStatement}"
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap items-center gap-2.5 mb-6"
              {...enter(0.52)}
            >
              <Button
                href="#experience"
                variant="primary"
                size="sm"
                className="min-h-12 px-6! tracking-[0.14em]!"
                icon={<Briefcase size={14} />}
              >
                Explore My Experience
              </Button>
              <Button
                href={profile.telUrl}
                variant="outline"
                size="sm"
                className="min-h-12 tracking-[0.14em]!"
                icon={<Phone size={14} />}
                iconPosition="left"
              >
                Call Now
              </Button>
              <Button
                href={profile.resumeAvailable ? profile.resumeUrl : "#contact"}
                variant="dark"
                size="sm"
                className="min-h-12 tracking-[0.14em]!"
                icon={<Download size={14} />}
                onClick={handleDownloadCV}
                download={profile.resumeAvailable}
              >
                {profile.resumeAvailable ? 'Download CV' : 'Request CV'}
              </Button>
              <Button href={profile.whatsappUrl} target="_blank" rel="noopener noreferrer" variant="ghost" size="sm" className="min-h-12 tracking-[0.14em]!" icon={<MessageCircle size={14} />}>
                WhatsApp
              </Button>
            </motion.div>

            {/* CV Status Feedback if file pending */}
            {cvRequested && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                role="status"
                className="mb-6 max-w-2xl px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-line-strong)] border-l-2 border-l-[var(--color-gold)] text-xs leading-relaxed text-[var(--color-ivory)]/90"
              >
                📄 <strong className="text-[var(--color-gold)]">Official CV Status:</strong> The full manager CV is available on request. Please contact Ranjeet directly at <a href={profile.mailUrl} className="underline decoration-[var(--color-gold)] underline-offset-2 hover:text-[var(--color-gold)]">{profile.email}</a> or via <a href={profile.whatsappUrl} className="underline decoration-[var(--color-gold)] underline-offset-2 hover:text-[var(--color-gold)]">WhatsApp</a>.
              </motion.div>
            )}
          </div>

          {/* Right — Framed executive portrait */}
          <motion.div
            className="relative w-full max-w-[26rem] sm:max-w-md mx-auto lg:mx-0 lg:max-w-none pr-4 pb-4 sm:pr-6 sm:pb-6"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: EASE_LUX }}
          >
            {/* Offset gold frame */}
            <div aria-hidden="true" className="absolute top-4 left-4 sm:top-6 sm:left-6 right-0 bottom-0 border border-[var(--color-gold)]/55 pointer-events-none" />

            {/* Photo container */}
            <div className="relative aspect-[4/5] bg-[var(--color-navy-mid)] overflow-hidden shadow-[var(--shadow-soft)] group portrait-frame image-zoom-container">
              <SafeImage
                src={profile.photo}
                fallbackSrc={profile.photoFallback}
                alt="Ranjeet Singh Patel — Hotel General Manager, Hotel The Ideal, Kushinagar"
                className="w-full h-full object-cover object-[50%_15%]"
                placeholderType="portrait"
                title="Ranjeet Singh Patel"
                subtitle="General Manager · Hotel The Ideal"
                loading="eager"
              />

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a1424]/95 via-[#0a1424]/55 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 z-10 pointer-events-none">
                <div className="font-serif text-lg text-[#f4eee3]">
                  Ranjeet Singh Patel
                </div>
                <div className="h-px w-10 bg-[#c9a96e] my-2" />
                <div className="font-sans text-[10px] text-[#e4cfa0] tracking-[0.25em] uppercase font-medium">
                  Hotel The Ideal · Kushinagar
                </div>
              </div>
            </div>

            {/* Experience badge */}
            <div className="absolute -left-3 sm:-left-8 top-10 z-20 bg-[var(--color-surface)] border border-[var(--color-line-strong)] px-4 py-3 shadow-[var(--shadow-soft)]">
              <div className="font-display text-base sm:text-lg text-[var(--color-gold)] font-semibold leading-tight">12 Years Experience</div>
              <div className="font-sans text-[10px] sm:text-[11px] text-[var(--color-ivory)]/75 mt-0.5">Hotel Operations & Guest Care</div>
            </div>
          </motion.div>
        </div>

        {/* Verified Stats Band — 4 Highlights */}
        <motion.div
          className="stat-band mt-16 lg:mt-24"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease: EASE_LUX }}
        >
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-display text-4xl sm:text-5xl font-medium text-[var(--color-ivory)] leading-none">
                <AnimatedCounter value="12" />
              </span>
              <span className="font-display text-lg italic text-[var(--color-gold)]">Years</span>
            </div>
            <span className="flex items-center gap-2 font-sans text-[10px] sm:text-[11px] text-[var(--color-muted)] tracking-[0.16em] uppercase font-medium">
              <Briefcase size={12} strokeWidth={1.5} className="text-[var(--color-gold)] shrink-0" />
              Hospitality Experience
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-display text-3xl sm:text-[2.6rem] font-medium text-[var(--color-ivory)] leading-none">M.H.M.</span>
            </div>
            <span className="flex items-center gap-2 font-sans text-[10px] sm:text-[11px] text-[var(--color-muted)] tracking-[0.16em] uppercase font-medium">
              <GraduationCap size={12} strokeWidth={1.5} className="text-[var(--color-gold)] shrink-0" />
              Master of Hotel Mgmt
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-display text-4xl sm:text-5xl font-medium text-[var(--color-ivory)] leading-none">
                <AnimatedCounter value="4" />
              </span>
              <span className="font-display text-lg italic text-[var(--color-gold)]">Entries</span>
            </div>
            <span className="flex items-center gap-2 font-sans text-[10px] sm:text-[11px] text-[var(--color-muted)] tracking-[0.16em] uppercase font-medium">
              <Building2 size={12} strokeWidth={1.5} className="text-[var(--color-gold)] shrink-0" />
              Listed Career Entries
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-display text-3xl sm:text-[2.6rem] font-medium text-[var(--color-ivory)] leading-none">2 Lang.</span>
            </div>
            <span className="flex items-center gap-2 font-sans text-[10px] sm:text-[11px] text-[var(--color-muted)] tracking-[0.16em] uppercase font-medium">
              <Globe2 size={12} strokeWidth={1.5} className="text-[var(--color-gold)] shrink-0" />
              Hindi & English
            </span>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="flex justify-center py-8">
          <motion.a
            href="#about"
            className="flex flex-col items-center gap-2 text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors min-h-11 px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            animate={shouldReduceMotion ? {} : { y: [0, 4, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase">Explore Profile</span>
            <ArrowDown size={14} strokeWidth={1.5} />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
