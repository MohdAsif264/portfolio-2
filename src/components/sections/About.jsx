import { motion } from 'framer-motion';
import { Compass, Users2, Quote, ArrowRight, Briefcase, GraduationCap, Building2, Globe2 } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { profile } from '../../data/profile';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0 },
};

export function About() {

  return (
    <section id="about" className="relative py-20 lg:py-24 bg-[var(--color-navy-light)] overflow-hidden transition-colors duration-500">
      {/* Subtle side accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--color-gold)]/20 to-transparent pointer-events-none" />

      <Container className="max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About Ranjeet Singh Patel"
          title="Hospitality Defined by Care & Experience"
          subtitle="12 Years of Hospitality Leadership · Master of Hotel Management (M.H.M.) · Kushinagar, UP"
        />

        {/* Two-Column Ultra-Premium Layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mt-8">

          {/* Left Column — Concise Professional Summary (7 cols) */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-between glass-card p-6 sm:p-8 border border-[var(--color-gold)]/25"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.6 }}
          >
            <div>
              {/* Subtle quote accent */}
              <div className="flex items-center gap-2 mb-4 text-[var(--color-gold)]">
                <Quote size={16} className="rotate-180 opacity-70" />
                <span className="font-sans text-[11px] uppercase tracking-[0.25em] font-semibold text-[var(--color-gold)]">
                  Executive Background
                </span>
              </div>

              {/* 3 Concise Summary Paragraphs (~115 words) */}
              <div className="space-y-3.5 text-[var(--color-ivory)]/85 font-sans text-sm sm:text-[15px] leading-relaxed">
                {profile.aboutParagraphs.map((para, i) => (
                  <p key={i}>
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Quick Action Links */}
            <div className="pt-6 mt-6 border-t border-[var(--color-gold)]/15 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-[var(--color-muted)] font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Hotel The Ideal · Kushinagar</span>
              </div>
              <div className="flex items-center gap-3">
                <Button href="/experience" variant="primary" size="sm" icon={<ArrowRight size={12} />}>
                  Career Timeline
                </Button>
                <Button href="/contact" variant="outline" size="sm">
                  Contact GM
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Right Column — Compact Vision & Leadership Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-5">

            {/* Vision Card */}
            <motion.div
              className="glass-card glass-card-hover p-6 border border-[var(--color-gold)]/25 border-l-2 border-l-[var(--color-gold)] flex-1 flex flex-col justify-center"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-8 h-8 rounded-full border border-[var(--color-gold)]/40 flex items-center justify-center text-[var(--color-gold)] bg-[var(--color-gold)]/5">
                  <Compass size={15} />
                </div>
                <h3 className="font-serif text-lg text-[var(--color-ivory)] font-medium">Vision</h3>
              </div>
              <p className="font-sans text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                "{profile.vision}"
              </p>
            </motion.div>

            {/* Leadership Philosophy Card */}
            <motion.div
              className="glass-card glass-card-hover p-6 border border-[var(--color-gold)]/25 border-l-2 border-l-[var(--color-gold)] flex-1 flex flex-col justify-center"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-8 h-8 rounded-full border border-[var(--color-gold)]/40 flex items-center justify-center text-[var(--color-gold)] bg-[var(--color-gold)]/5">
                  <Users2 size={15} />
                </div>
                <h3 className="font-serif text-lg text-[var(--color-ivory)] font-medium">Leadership Philosophy</h3>
              </div>
              <p className="font-sans text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                "{profile.leadershipPhilosophy}"
              </p>
            </motion.div>

            {/* Compact Highlights Strip */}
            <motion.div
              className="grid grid-cols-2 gap-2.5"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <div className="p-2.5 bg-[var(--color-navy)]/80 border border-[var(--color-gold)]/20 flex items-center gap-2 text-left">
                <Briefcase size={14} className="text-[var(--color-gold)] shrink-0" />
                <span className="font-sans text-[11px] text-[var(--color-ivory)] font-medium leading-tight">12 Years Experience</span>
              </div>
              <div className="p-2.5 bg-[var(--color-navy)]/80 border border-[var(--color-gold)]/20 flex items-center gap-2 text-left">
                <GraduationCap size={14} className="text-[var(--color-gold)] shrink-0" />
                <span className="font-sans text-[11px] text-[var(--color-ivory)] font-medium leading-tight">M.H.M. Degree</span>
              </div>
              <div className="p-2.5 bg-[var(--color-navy)]/80 border border-[var(--color-gold)]/20 flex items-center gap-2 text-left">
                <Building2 size={14} className="text-[var(--color-gold)] shrink-0" />
                <span className="font-sans text-[11px] text-[var(--color-ivory)] font-medium leading-tight">4 Career Entries</span>
              </div>
              <div className="p-2.5 bg-[var(--color-navy)]/80 border border-[var(--color-gold)]/20 flex items-center gap-2 text-left">
                <Globe2 size={14} className="text-[var(--color-gold)] shrink-0" />
                <span className="font-sans text-[11px] text-[var(--color-ivory)] font-medium leading-tight">Hindi & English</span>
              </div>
            </motion.div>

          </div>
        </div>
      </Container>
    </section>
  );
}
