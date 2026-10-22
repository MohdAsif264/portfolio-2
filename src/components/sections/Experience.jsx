import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, MapPin, ChevronRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { experiences, education } from '../../data/experience';

export function Experience() {

  return (
    <section id="experience" className="relative py-20 lg:py-24 bg-[var(--color-navy)] overflow-hidden transition-colors duration-500">
      {/* Decorative side accent */}
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--color-gold)]/15 to-transparent pointer-events-none" />

      <Container className="max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Career History & Education"
          title="12 Years of Hospitality Experience"
          subtitle="A verified professional journey across leading hotel establishments and academic qualifications in Kushinagar, Uttar Pradesh."
        />

        {/* Highlight Banner */}
        <motion.div
          className="glass-card p-5 mb-10 border-l-2 border-l-[var(--color-gold)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="font-serif text-base sm:text-lg text-[var(--color-ivory)] font-medium block">
              Verified Career Timeline · 4 Listed Hotel Positions
            </span>
            <p className="font-sans text-xs text-[var(--color-muted)] mt-0.5">
              Reflects front-office management, guest handling, and hotel operations across hospitality properties in Kushinagar.
            </p>
          </div>
          <div className="shrink-0 px-3.5 py-1.5 border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 text-[var(--color-gold)] font-sans text-xs tracking-wider uppercase font-semibold">
            12 Years Experience
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Experience Timeline — takes 7 cols */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 border border-[var(--color-gold)]/30 flex items-center justify-center text-[var(--color-gold)] bg-[var(--color-gold)]/5">
                <Briefcase size={15} />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[var(--color-ivory)] font-medium">Hospitality Career History</h3>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-3.5 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-gold)]/50 via-[var(--color-gold)]/25 to-transparent" />

              <div className="space-y-6">
                {experiences.map((exp, i) => (
                  <motion.div
                    key={exp.id}
                    className="relative pl-10 sm:pl-12"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    {/* Timeline dot */}
                    <div className={`absolute left-0 top-1.5 w-7 h-7 rounded-full flex items-center justify-center border-2 z-10 ${
                      exp.isCurrent
                        ? 'bg-[var(--color-gold)] border-[var(--color-gold)] shadow-[0_0_15px_rgba(201,168,76,0.5)]'
                        : 'bg-[var(--color-navy)] border-[var(--color-gold)]/40'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${exp.isCurrent ? 'bg-[var(--color-navy)]' : 'bg-[var(--color-gold)]/60'}`} />
                    </div>

                    {/* Card */}
                    <div className="glass-card glass-card-hover p-5 sm:p-6 group border border-[var(--color-gold)]/20">
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2.5">
                        <div>
                          <h4 className="font-serif text-base sm:text-lg text-[var(--color-ivory)] group-hover:text-[var(--color-gold)] transition-colors font-medium">
                            {exp.role}
                          </h4>
                          <p className="font-sans text-xs sm:text-sm text-[var(--color-gold)] font-medium mt-0.5">{exp.company}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          {exp.period && (
                            <span className="font-sans text-[9px] text-[var(--color-muted)] tracking-[0.12em] uppercase">
                              {exp.period}
                            </span>
                          )}
                          {exp.isCurrent && (
                            <span className="font-sans text-[9px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 tracking-wider uppercase font-medium">
                              Current Profile
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-1.5 mb-3 text-[var(--color-muted)]">
                        <MapPin size={11} className="text-[var(--color-gold)]/60 shrink-0" />
                        <span className="font-sans text-xs">{exp.location}</span>
                      </div>

                      {/* Overview */}
                      <p className="font-sans text-xs sm:text-[13px] text-[var(--color-ivory)]/80 leading-relaxed mb-3.5">
                        {exp.overview}
                      </p>

                      {/* Responsibilities */}
                      <div>
                        <div className="font-sans text-[10px] text-[var(--color-gold)] uppercase tracking-wider mb-2 font-medium">
                          Core Responsibilities:
                        </div>
                        <ul className="space-y-1.5">
                          {exp.responsibilities.map((resp, j) => (
                            <li key={j} className="flex items-start gap-2 font-sans text-xs text-[var(--color-muted)]">
                              <ChevronRight size={11} className="text-[var(--color-gold)]/70 mt-0.5 shrink-0" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Education & Qualifications — 5 cols */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 border border-[var(--color-gold)]/30 flex items-center justify-center text-[var(--color-gold)] bg-[var(--color-gold)]/5">
                <GraduationCap size={15} />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[var(--color-ivory)] font-medium">Education & Qualifications</h3>
            </div>

            <div className="space-y-3.5">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.id}
                  className="glass-card glass-card-hover p-4 sm:p-5 border-l-2 border-l-[var(--color-gold)]/40 hover:border-l-[var(--color-gold)] transition-colors"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-7 h-7 flex items-center justify-center border border-[var(--color-gold)]/30 text-[var(--color-gold)] shrink-0 mt-0.5 bg-[var(--color-gold)]/5">
                      <GraduationCap size={13} />
                    </div>
                    <div>
                      <span className="font-sans text-[9px] text-[var(--color-gold)] uppercase tracking-wider block font-medium">
                        {edu.type}
                      </span>
                      <h4 className="font-serif text-sm sm:text-base text-[var(--color-ivory)] leading-snug font-medium">
                        {edu.degree}
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-0.5 mb-2 pl-10">
                    <p className="font-sans text-xs text-[var(--color-ivory)]/90 font-medium">
                      {edu.institution}
                    </p>
                    {edu.affiliatingBody && (
                      <p className="font-sans text-[11px] text-[var(--color-gold)]/80">
                        Affiliated with: {edu.affiliatingBody}
                      </p>
                    )}
                    <span className="font-sans text-[10px] text-[var(--color-muted)] flex items-center gap-1">
                      <MapPin size={9} className="text-[var(--color-gold)]/50" /> {edu.location}
                    </span>
                  </div>

                  <p className="font-sans text-xs text-[var(--color-muted)] leading-relaxed pl-10">
                    {edu.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA card for Journey */}
            <motion.div
              className="mt-6 glass-card p-5 border border-[var(--color-gold)]/30 bg-gradient-to-br from-[var(--color-gold)]/5 to-transparent text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="font-serif text-base text-[var(--color-ivory)] mb-1">My Hospitality Journey</h4>
              <p className="font-sans text-xs text-[var(--color-muted)] mb-3.5">
                Explore the four hospitality properties across Kushinagar associated with Ranjeet Singh Patel.
              </p>
              <Button href="/projects" variant="outline" size="sm" className="w-full justify-center">
                Explore The 4 Properties
              </Button>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
