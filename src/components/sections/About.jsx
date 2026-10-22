import { motion, useReducedMotion } from 'framer-motion';
import { Compass, Users2, Quote, ArrowRight, Briefcase, GraduationCap, Building2, Globe2 } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { profile } from '../../data/profile';
import { reveal } from '../../utils/motion';

const highlights = [
  { icon: Briefcase, text: '12 Years Experience' },
  { icon: GraduationCap, text: 'M.H.M. Degree' },
  { icon: Building2, text: '4 Career Entries' },
  { icon: Globe2, text: 'Hindi & English' },
];

export function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="relative section-pad bg-[var(--color-navy-light)] overflow-hidden transition-colors duration-500">
      <Container>
        <SectionHeading
          align="left"
          eyebrow="About Ranjeet Singh Patel"
          title="Hospitality Defined by Care & Experience"
          subtitle="12 Years of Hospitality Leadership · Master of Hotel Management (M.H.M.) · Kushinagar, UP"
        />

        <div className="grid lg:grid-cols-12 gap-14 lg:gap-16">

          {/* Left — Professional Summary */}
          <motion.div className="lg:col-span-7 flex flex-col" {...reveal(shouldReduceMotion)}>
            <div className="flex items-center gap-3 mb-8">
              <Quote size={16} strokeWidth={1.5} className="rotate-180 text-[var(--color-gold)]" />
              <span className="label">Executive Background</span>
            </div>

            <div className="space-y-6 font-sans">
              {profile.aboutParagraphs.map((para, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? 'lead first-letter:float-left first-letter:font-serif first-letter:text-[4.25rem] first-letter:leading-[0.85] first-letter:mr-3 first-letter:mt-1.5 first-letter:text-[var(--color-gold)]'
                      : 'prose-lux'
                  }
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Quick Action Links */}
            <div className="mt-12 pt-8 border-t border-[var(--color-line)] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-2.5 text-sm text-[var(--color-muted)] font-sans">
                <span aria-hidden="true" className="w-1.5 h-1.5 rotate-45 bg-[var(--color-gold)]" />
                <span>Hotel The Ideal · Kushinagar</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button href="/experience" variant="primary" size="sm" icon={<ArrowRight size={13} />}>
                  Career Timeline
                </Button>
                <Button href="/contact" variant="outline" size="sm">
                  Contact GM
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Right — Vision & Leadership pull-quotes */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {[
              { icon: Compass, title: 'Vision', text: profile.vision },
              { icon: Users2, title: 'Leadership Philosophy', text: profile.leadershipPhilosophy },
            ].map(({ icon: Icon, title, text }, i) => (
              <motion.figure
                key={title}
                className="lux-card lux-card-hover corner-frame p-7 sm:p-9"
                {...reveal(shouldReduceMotion, { delay: 0.1 + i * 0.1 })}
              >
                <figcaption className="flex items-center gap-3 mb-5">
                  <span className="w-9 h-9 border border-[var(--color-line-strong)] flex items-center justify-center text-[var(--color-gold)]">
                    <Icon size={16} strokeWidth={1.5} />
                  </span>
                  <h3 className="font-display text-2xl text-[var(--color-ivory)] font-medium">{title}</h3>
                </figcaption>
                <blockquote className="font-display text-lg sm:text-xl italic leading-relaxed text-[var(--color-ivory)]/85">
                  "{text}"
                </blockquote>
              </motion.figure>
            ))}

            {/* Highlights */}
            <motion.ul
              className="hairline-grid grid-cols-2"
              {...reveal(shouldReduceMotion, { delay: 0.3 })}
            >
              {highlights.map(({ icon: Icon, text }) => (
                <li key={text} className="bg-[var(--color-navy-light)]! p-4 sm:p-5 flex items-center gap-3">
                  <Icon size={16} strokeWidth={1.5} className="text-[var(--color-gold)] shrink-0" />
                  <span className="font-sans text-xs sm:text-[13px] text-[var(--color-ivory)] font-medium leading-tight">{text}</span>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
