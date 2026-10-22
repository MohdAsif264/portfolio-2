import { motion, useReducedMotion } from 'framer-motion';
import {
  ConciergeBell, Users, MessageSquare, Building, HeartHandshake,
  FileSpreadsheet, Calculator, Database, Laptop, MonitorCheck, Globe,
  Languages
} from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { SwipeRail } from '../ui/SwipeRail';
import { hospitalitySkills, computerSkills, languageSkills } from '../../data/skills';
import { reveal } from '../../utils/motion';

const hospitalityIcons = {
  "h-1": ConciergeBell,
  "h-2": Users,
  "h-3": MessageSquare,
  "h-4": Building,
  "h-5": HeartHandshake,
};

const computerIcons = {
  "c-1": FileSpreadsheet,
  "c-2": Calculator,
  "c-3": Database,
  "c-4": Laptop,
  "c-5": MonitorCheck,
  "c-6": Globe,
};

function CategoryHeader({ index, icon: Icon, title, caption }) {
  return (
    <div className="flex items-end justify-between gap-6 mb-8 pb-5 border-b border-[var(--color-line)]">
      <div className="flex items-center gap-4">
        <span className="w-11 h-11 border border-[var(--color-line-strong)] flex items-center justify-center text-[var(--color-gold)] shrink-0">
          <Icon size={18} strokeWidth={1.5} />
        </span>
        <div>
          <h3 className="font-display text-2xl sm:text-3xl text-[var(--color-ivory)] font-medium leading-tight">{title}</h3>
          <span className="label block mt-1 text-[11px]!">{caption}</span>
        </div>
      </div>
      <span aria-hidden="true" className="hidden sm:block font-display text-5xl text-[var(--color-gold)]/25 leading-none">{index}</span>
    </div>
  );
}

function SkillGrid({ skills, icons, fallbackIcon, shouldReduceMotion, label }) {
  return (
    <SwipeRail label={label} className="hairline-grid hairline-grid--surface sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((skill, i) => {
        const Icon = icons[skill.id] || fallbackIcon;
        return (
          <motion.div
            key={skill.id}
            className="group p-7 sm:p-8 transition-colors duration-500 hover:bg-[var(--color-surface-raised)]!"
            {...reveal(shouldReduceMotion, { delay: i * 0.06, y: 16, amount: '-30px' })}
          >
            <Icon size={22} strokeWidth={1.25} className="text-[var(--color-gold)] mb-6 transition-transform duration-500 group-hover:-translate-y-0.5" />
            <h4 className="font-display text-xl text-[var(--color-ivory)] mb-3 font-medium group-hover:text-[var(--color-gold)] transition-colors">
              {skill.name}
            </h4>
            <div className="w-8 h-px bg-[var(--color-gold)]/50 mb-4 group-hover:w-14 transition-all duration-500" />
            <p className="font-sans text-sm text-[var(--color-muted)] leading-relaxed">
              {skill.description}
            </p>
          </motion.div>
        );
      })}
    </SwipeRail>
  );
}

export function Expertise() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="expertise" className="relative section-pad bg-[var(--color-charcoal)] overflow-hidden transition-colors duration-500">
      <Container>
        <SectionHeading
          eyebrow="Areas of Competence"
          title="Hospitality & Technical Expertise"
          subtitle="Grounded in 12 years of hands-on hotel practice, formal M.H.M. education, and certified computer applications training."
        />

        {/* Category 1: Hospitality Experience */}
        <div className="mb-16 sm:mb-20">
          <CategoryHeader index="01" icon={ConciergeBell} title="Hospitality Experience" caption="Front Office Services & Hotel Operations" />
          <SkillGrid label="Hospitality Experience" skills={hospitalitySkills} icons={hospitalityIcons} fallbackIcon={ConciergeBell} shouldReduceMotion={shouldReduceMotion} />
        </div>

        {/* Category 2: Computer Skills */}
        <div className="mb-16 sm:mb-20">
          <CategoryHeader index="02" icon={Laptop} title="Computer Skills" caption="Diploma in Computer Applications (D.C.A.) Backing" />
          <SkillGrid label="Computer Skills" skills={computerSkills} icons={computerIcons} fallbackIcon={Laptop} shouldReduceMotion={shouldReduceMotion} />
        </div>

        {/* Category 3: Languages */}
        <div>
          <CategoryHeader index="03" icon={Languages} title="Language Proficiency" caption="Domestic & International Guest Communication" />

          <div className="grid sm:grid-cols-2 gap-6">
            {languageSkills.map((lang, idx) => (
              <motion.div
                key={lang.id}
                className="lux-card lux-card-hover p-7 sm:p-9"
                {...reveal(shouldReduceMotion, { delay: idx * 0.1, y: 16 })}
              >
                <div className="flex flex-col items-start sm:flex-row sm:flex-wrap sm:items-center justify-between gap-3 mb-4">
                  <span className="font-display text-3xl sm:text-4xl text-[var(--color-ivory)] font-medium">{lang.name}</span>
                  <span className="label text-[11px]! px-3 py-1.5 border border-[var(--color-line-strong)]">
                    {lang.type}
                  </span>
                </div>
                <div className="hairline mb-4" />
                <p className="font-sans text-sm text-[var(--color-muted)] leading-relaxed">
                  {lang.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
