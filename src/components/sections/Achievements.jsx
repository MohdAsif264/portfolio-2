import { motion, useReducedMotion } from 'framer-motion';
import { Briefcase, GraduationCap, Building2, Languages, CheckCircle2 } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { stats, achievements, values } from '../../data/achievements';

const statIcons = [
  Briefcase,
  GraduationCap,
  Building2,
  Languages,
];

export function Achievements() {
  const shouldReduceMotion = useReducedMotion();
  const hasVerifiedAchievements = achievements && achievements.length > 0;

  return (
    <section id="achievements" className="relative py-20 lg:py-24 bg-[var(--color-charcoal)] overflow-hidden transition-colors duration-500">
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/30 to-transparent pointer-events-none" />

      <Container className="max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Credentials & Professional Values"
          title="Career Highlights & Standards"
          subtitle="Verified benchmarks representing 12 years of dedicated service in the hospitality sector of Kushinagar."
        />

        {/* Verified Stats Banner */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-14"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((s, i) => {
            const Icon = statIcons[i % statIcons.length];
            return (
              <div
                key={s.id}
                className="glass-card text-center py-6 px-4 group hover:border-[var(--color-gold)]/40 transition-all flex flex-col justify-between border border-[var(--color-gold)]/20"
              >
                <div>
                  <div className="w-9 h-9 mx-auto rounded-full border border-[var(--color-gold)]/30 flex items-center justify-center text-[var(--color-gold)] mb-2.5 bg-[var(--color-gold)]/5">
                    <Icon size={16} />
                  </div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-gold-gradient">
                    {s.value === "M.H.M." ? (
                      <span>{s.value}</span>
                    ) : (
                      <>
                        <AnimatedCounter value={s.value} />
                        <span className="text-lg font-normal ml-0.5">{s.suffix}</span>
                      </>
                    )}
                  </div>
                  <div className="font-sans text-[11px] sm:text-xs text-[var(--color-ivory)]/90 font-medium uppercase tracking-wider mt-1.5">
                    {s.label}
                  </div>
                </div>
                <div className="font-sans text-[10px] sm:text-[11px] text-[var(--color-muted)] mt-2 pt-2 border-t border-[var(--color-gold)]/10">
                  {s.detail}
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* If verified awards exist, render them. Otherwise, cleanly hide empty cards and render Professional Values alternative */}
        {hasVerifiedAchievements ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {achievements.map((item) => (
              <div key={item.id} className="glass-card p-5">
                <h4 className="font-serif text-base text-[var(--color-ivory)]">{item.title}</h4>
                <p className="font-sans text-xs text-[var(--color-muted)] mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card p-6 sm:p-8 lg:p-10 border border-[var(--color-gold)]/25 bg-gradient-to-br from-[var(--color-navy)] via-[var(--color-navy-mid)] to-[var(--color-charcoal)]">
            <div className="max-w-2xl mx-auto text-center mb-8">
              <span className="font-sans text-[10px] text-[var(--color-gold)] tracking-[0.25em] uppercase block mb-1.5 font-medium">
                Core Hospitality Philosophy
              </span>
              <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl text-[var(--color-ivory)] mb-2.5 font-medium">
                Professional Values & Service Standards
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                Ranjeet Singh Patel's hospitality leadership is anchored in proven principles of courteous service, operational discipline, and genuine guest care.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {values.map((val, idx) => (
                <motion.div
                  key={val.id}
                  className="p-4 bg-[var(--color-navy)]/80 border border-[var(--color-gold)]/15 hover:border-[var(--color-gold)]/40 transition-all duration-300 group"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                >
                  <div className="w-7 h-7 rounded-full border border-[var(--color-gold)]/30 flex items-center justify-center text-[var(--color-gold)] mb-2.5 group-hover:bg-[var(--color-gold)]/10 transition-colors">
                    <CheckCircle2 size={14} />
                  </div>
                  <h4 className="font-serif text-sm sm:text-base text-[var(--color-ivory)] group-hover:text-[var(--color-gold)] transition-colors mb-1 font-medium">
                    {val.title}
                  </h4>
                  <p className="font-sans text-xs text-[var(--color-muted)] leading-relaxed">
                    {val.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
