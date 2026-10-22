import { motion, useReducedMotion } from 'framer-motion';
import { Briefcase, GraduationCap, MapPin, ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { experiences, education } from '../../data/experience';
import { reveal } from '../../utils/motion';

function CurrentTag() {
  return (
    <span className="inline-flex items-center gap-1.5 font-sans text-[10px] px-2.5 py-1 bg-[var(--color-gold)] text-[var(--color-on-gold)] tracking-[0.16em] uppercase font-semibold">
      Current Profile
    </span>
  );
}

function SubHeading({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <span className="w-11 h-11 border border-[var(--color-line-strong)] flex items-center justify-center text-[var(--color-gold)] shrink-0">
        <Icon size={18} strokeWidth={1.5} />
      </span>
      <h3 className="font-display text-2xl sm:text-3xl text-[var(--color-ivory)] font-medium">{children}</h3>
      <span aria-hidden="true" className="hairline flex-1 hidden sm:block" />
    </div>
  );
}

export function Experience() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="experience" className="relative section-pad bg-[var(--color-navy)] overflow-hidden transition-colors duration-500">
      <Container>
        <SectionHeading
          eyebrow="Career History & Education"
          title="12 Years of Hospitality Experience"
          subtitle="A verified professional journey across leading hotel establishments and academic qualifications in Kushinagar, Uttar Pradesh."
        />

        {/* Highlight Banner */}
        <motion.div
          className="lux-card corner-frame px-6 py-6 sm:px-8 mb-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
          {...reveal(shouldReduceMotion)}
        >
          <div>
            <span className="font-display text-xl sm:text-2xl text-[var(--color-ivory)] font-medium block">
              Verified Career Timeline · 4 Listed Hotel Positions
            </span>
            <p className="font-sans text-sm text-[var(--color-muted)] mt-1.5">
              Reflects front-office management, guest handling, and hotel operations across hospitality properties in Kushinagar.
            </p>
          </div>
          <div className="shrink-0 px-4 py-2 border border-[var(--color-gold)]/60 text-[var(--color-gold)] font-sans text-[11px] tracking-[0.18em] uppercase font-semibold">
            12 Years Experience
          </div>
        </motion.div>

        {/* Experience Timeline */}
        <div className="mb-24">
          <SubHeading icon={Briefcase}>Hospitality Career History</SubHeading>

          <ol>
            {experiences.map((exp, i) => {
              const isLast = i === experiences.length - 1;
              return (
                <motion.li
                  key={exp.id}
                  className="grid lg:grid-cols-[13rem_1fr] lg:gap-10"
                  {...reveal(shouldReduceMotion, { delay: i * 0.05, amount: '-40px' })}
                >
                  {/* Meta column (desktop) */}
                  <div className="hidden lg:flex flex-col items-end text-right pt-1">
                    <span aria-hidden="true" className="font-display text-6xl leading-none text-[var(--color-gold)]/30 mb-3">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {exp.period && (
                      <span className="font-sans text-[11px] text-[var(--color-muted)] tracking-[0.16em] uppercase mb-3">
                        {exp.period}
                      </span>
                    )}
                    {exp.isCurrent && <CurrentTag />}
                  </div>

                  {/* Rail + card */}
                  <div className={`relative pl-8 sm:pl-12 ${isLast ? '' : 'pb-10 sm:pb-12'}`}>
                    <span aria-hidden="true" className={`absolute left-0 top-0 w-px ${isLast ? 'h-8' : 'bottom-0'} bg-[var(--color-line-strong)]`} />
                    <span aria-hidden="true" className={`timeline-node -left-[7px] top-6 ${exp.isCurrent ? 'timeline-node--current' : ''}`} />

                    <article className={`lux-card lux-card-hover group p-6 sm:p-8 ${exp.isCurrent ? 'border-[var(--color-line-strong)]!' : ''}`}>
                      {/* Mobile meta */}
                      <div className="lg:hidden flex flex-wrap items-center gap-3 mb-4">
                        {exp.period && (
                          <span className="font-sans text-[10px] text-[var(--color-muted)] tracking-[0.16em] uppercase">
                            {exp.period}
                          </span>
                        )}
                        {exp.isCurrent && <CurrentTag />}
                      </div>

                      <h4 className="font-display text-2xl sm:text-3xl text-[var(--color-ivory)] font-medium leading-tight group-hover:text-[var(--color-gold)] transition-colors">
                        {exp.role}
                      </h4>
                      <p className="font-sans text-sm sm:text-[15px] text-[var(--color-gold)] font-medium mt-1.5">{exp.company}</p>

                      <div className="flex items-start gap-2 mt-3 text-[var(--color-muted)]">
                        <MapPin size={13} strokeWidth={1.5} className="text-[var(--color-gold)]/80 shrink-0 mt-0.5" />
                        <span className="font-sans text-xs sm:text-[13px]">{exp.location}</span>
                      </div>

                      <div className="hairline my-6" />

                      <p className="prose-lux text-[15px]! mb-6">
                        {exp.overview}
                      </p>

                      <div>
                        <div className="label mb-4">
                          Core Responsibilities:
                        </div>
                        <ul className="grid md:grid-cols-2 gap-x-8 gap-y-3">
                          {exp.responsibilities.map((resp, j) => (
                            <li key={j} className="flex items-start gap-3 font-sans text-sm text-[var(--color-muted)] leading-relaxed">
                              <span aria-hidden="true" className="w-1.5 h-1.5 rotate-45 bg-[var(--color-gold)]/80 mt-2 shrink-0" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>

        {/* Education & Qualifications */}
        <div>
          <SubHeading icon={GraduationCap}>Education & Qualifications</SubHeading>

          <ul className="border-t border-[var(--color-line)]">
            {education.map((edu, i) => (
              <motion.li
                key={edu.id}
                className="group grid md:grid-cols-12 gap-4 md:gap-10 py-8 sm:py-10 border-b border-[var(--color-line)] transition-colors duration-500 hover:bg-[var(--color-surface)] md:px-6"
                {...reveal(shouldReduceMotion, { delay: i * 0.05, y: 14, amount: '-30px' })}
              >
                <div className="md:col-span-5 flex gap-5">
                  <span aria-hidden="true" className="font-display text-3xl text-[var(--color-gold)]/40 leading-none pt-1 w-8 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <span className="label text-[10px]! block mb-2">
                      {edu.type}
                    </span>
                    <h4 className="font-display text-xl sm:text-2xl text-[var(--color-ivory)] leading-snug font-medium group-hover:text-[var(--color-gold)] transition-colors">
                      {edu.degree}
                    </h4>
                  </div>
                </div>

                <div className="md:col-span-7 pl-13 md:pl-0">
                  <p className="font-sans text-[15px] text-[var(--color-ivory)] font-medium">
                    {edu.institution}
                  </p>
                  {edu.affiliatingBody && (
                    <p className="font-sans text-sm text-[var(--color-gold)] mt-1">
                      Affiliated with: {edu.affiliatingBody}
                    </p>
                  )}
                  <span className="font-sans text-xs text-[var(--color-muted)] flex items-center gap-1.5 mt-2">
                    <MapPin size={12} strokeWidth={1.5} className="text-[var(--color-gold)]/70" /> {edu.location}
                  </span>
                  <p className="font-sans text-sm text-[var(--color-muted)] leading-relaxed mt-3 max-w-[60ch]">
                    {edu.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>

          {/* CTA for Journey */}
          <motion.div
            className="mt-16 lux-card corner-frame p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6"
            {...reveal(shouldReduceMotion)}
          >
            <div>
              <h4 className="font-display text-2xl sm:text-3xl text-[var(--color-ivory)] mb-2">My Hospitality Journey</h4>
              <p className="font-sans text-sm text-[var(--color-muted)]">
                Explore the four hospitality properties across Kushinagar associated with Ranjeet Singh Patel.
              </p>
            </div>
            <Button href="/projects" variant="outline" size="md" className="shrink-0" icon={<ArrowRight size={14} />}>
              Explore The 4 Properties
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
