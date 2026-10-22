import { motion, useReducedMotion } from 'framer-motion';
import { Briefcase, GraduationCap, Building2, Languages, CheckCircle2 } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { stats, achievements, values } from '../../data/achievements';
import { reveal } from '../../utils/motion';

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
    <section id="achievements" className="relative section-pad bg-[var(--color-charcoal)] transition-colors duration-500">
      <Container>
        <SectionHeading
          eyebrow="Credentials & Professional Values"
          title="Career Highlights & Standards"
          subtitle="Verified benchmarks representing 12 years of dedicated service in the hospitality sector of Kushinagar."
        />

        {/* Verified Stats Band */}
        <motion.div className="stat-band mb-24" {...reveal(shouldReduceMotion)}>
          {stats.map((s, i) => {
            const Icon = statIcons[i % statIcons.length];
            return (
              <div key={s.id} className="flex flex-col text-center lg:text-left group">
                <Icon size={18} strokeWidth={1.25} className="text-[var(--color-gold)] mb-5 mx-auto lg:mx-0" />
                <div className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-medium leading-none text-[var(--color-ivory)]">
                  {s.value === "M.H.M." ? (
                    <span className="text-gold-gradient">{s.value}</span>
                  ) : (
                    <>
                      <AnimatedCounter value={s.value} className="text-gold-gradient" />
                      <span className="font-display italic text-lg sm:text-xl text-[var(--color-gold)] ml-1">{s.suffix}</span>
                    </>
                  )}
                </div>
                <div className="font-sans text-[11px] sm:text-xs text-[var(--color-ivory)] font-semibold uppercase tracking-[0.16em] mt-4">
                  {s.label}
                </div>
                <div className="font-sans text-xs sm:text-[13px] text-[var(--color-muted)] leading-relaxed mt-2">
                  {s.detail}
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* If verified awards exist, render them. Otherwise, cleanly hide empty cards and render Professional Values alternative */}
        {hasVerifiedAchievements ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {achievements.map((item) => (
              <div key={item.id} className="lux-card p-6">
                <h4 className="font-display text-xl text-[var(--color-ivory)]">{item.title}</h4>
                <p className="font-sans text-sm text-[var(--color-muted)] mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <motion.div className="lg:col-span-4 lg:sticky lg:top-28 self-start" {...reveal(shouldReduceMotion)}>
              <span className="eyebrow mb-5">
                Core Hospitality Philosophy
              </span>
              <h3 className="font-display text-3xl sm:text-4xl text-[var(--color-ivory)] mb-5 font-medium leading-tight">
                Professional Values & Service Standards
              </h3>
              <p className="font-sans text-[15px] text-[var(--color-muted)] leading-relaxed">
                Ranjeet Singh Patel's hospitality leadership is anchored in proven principles of courteous service, operational discipline, and genuine guest care.
              </p>
            </motion.div>

            <div className="lg:col-span-8 hairline-grid sm:grid-cols-2">
              {values.map((val, idx) => (
                <motion.div
                  key={val.id}
                  className="p-7 sm:p-8 transition-colors duration-500 hover:bg-[var(--color-surface)] group"
                  {...reveal(shouldReduceMotion, { delay: idx * 0.06, y: 14, amount: '-30px' })}
                >
                  <CheckCircle2 size={18} strokeWidth={1.25} className="text-[var(--color-gold)] mb-5" />
                  <h4 className="font-display text-xl text-[var(--color-ivory)] group-hover:text-[var(--color-gold)] transition-colors mb-2 font-medium">
                    {val.title}
                  </h4>
                  <p className="font-sans text-sm text-[var(--color-muted)] leading-relaxed">
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
