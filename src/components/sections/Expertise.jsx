import { motion } from 'framer-motion';
import {
  ConciergeBell, Users, MessageSquare, Building, HeartHandshake,
  FileSpreadsheet, Calculator, Database, Laptop, MonitorCheck, Globe,
  Languages
} from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { hospitalitySkills, computerSkills, languageSkills } from '../../data/skills';

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

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: 'easeOut' },
  }),
};

export function Expertise() {

  return (
    <section id="expertise" className="relative py-20 lg:py-24 bg-[var(--color-charcoal)] overflow-hidden transition-colors duration-500">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-28 bg-gradient-to-b from-[var(--color-gold)]/40 to-transparent pointer-events-none" />

      <Container className="max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Areas of Competence"
          title="Hospitality & Technical Expertise"
          subtitle="Grounded in 12 years of hands-on hotel practice, formal M.H.M. education, and certified computer applications training."
        />

        {/* Category 1: Hospitality Experience */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 border border-[var(--color-gold)]/30 flex items-center justify-center text-[var(--color-gold)] bg-[var(--color-gold)]/5">
              <ConciergeBell size={16} />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-[var(--color-ivory)] font-medium">Hospitality Experience</h3>
              <span className="font-sans text-[10px] text-[var(--color-gold)] tracking-wider uppercase font-medium">
                Front Office Services & Hotel Operations
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {hospitalitySkills.map((skill, i) => {
              const Icon = hospitalityIcons[skill.id] || ConciergeBell;
              return (
                <motion.div
                  key={skill.id}
                  className="glass-card glass-card-hover p-5 sm:p-6 group cursor-default border border-[var(--color-gold)]/20"
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-30px' }}
                  custom={i}
                >
                  <div className="w-9 h-9 border border-[var(--color-gold)]/30 flex items-center justify-center text-[var(--color-gold)] mb-3.5 group-hover:border-[var(--color-gold)] group-hover:bg-[var(--color-gold)]/5 transition-all">
                    <Icon size={16} />
                  </div>
                  <h4 className="font-serif text-base text-[var(--color-ivory)] mb-1.5 group-hover:text-[var(--color-gold)] transition-colors font-medium">
                    {skill.name}
                  </h4>
                  <div className="w-8 h-px bg-[var(--color-gold)]/30 mb-2.5 group-hover:w-12 transition-all duration-300" />
                  <p className="font-sans text-xs text-[var(--color-muted)] leading-relaxed">
                    {skill.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Category 2: Computer Skills */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 border border-[var(--color-gold)]/30 flex items-center justify-center text-[var(--color-gold)] bg-[var(--color-gold)]/5">
              <Laptop size={16} />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-[var(--color-ivory)] font-medium">Computer Skills</h3>
              <span className="font-sans text-[10px] text-[var(--color-gold)] tracking-wider uppercase font-medium">
                Diploma in Computer Applications (D.C.A.) Backing
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {computerSkills.map((skill, i) => {
              const Icon = computerIcons[skill.id] || Laptop;
              return (
                <motion.div
                  key={skill.id}
                  className="glass-card glass-card-hover p-5 sm:p-6 group cursor-default border border-[var(--color-gold)]/20"
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-30px' }}
                  custom={i}
                >
                  <div className="w-9 h-9 border border-[var(--color-gold)]/30 flex items-center justify-center text-[var(--color-gold)] mb-3.5 group-hover:border-[var(--color-gold)] group-hover:bg-[var(--color-gold)]/5 transition-all">
                    <Icon size={16} />
                  </div>
                  <h4 className="font-serif text-base text-[var(--color-ivory)] mb-1.5 group-hover:text-[var(--color-gold)] transition-colors font-medium">
                    {skill.name}
                  </h4>
                  <div className="w-8 h-px bg-[var(--color-gold)]/30 mb-2.5 group-hover:w-12 transition-all duration-300" />
                  <p className="font-sans text-xs text-[var(--color-muted)] leading-relaxed">
                    {skill.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Category 3: Languages */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 border border-[var(--color-gold)]/30 flex items-center justify-center text-[var(--color-gold)] bg-[var(--color-gold)]/5">
              <Languages size={16} />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-[var(--color-ivory)] font-medium">Language Proficiency</h3>
              <span className="font-sans text-[10px] text-[var(--color-gold)] tracking-wider uppercase font-medium">
                Domestic & International Guest Communication
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            {languageSkills.map((lang, idx) => (
              <motion.div
                key={lang.id}
                className="glass-card p-5 border border-[var(--color-gold)]/20 flex flex-col justify-between"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif text-lg text-[var(--color-ivory)] font-medium">{lang.name}</span>
                    <span className="font-sans text-[10px] text-[var(--color-gold)] uppercase tracking-wider font-semibold px-2 py-0.5 border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/5">
                      {lang.type}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-[var(--color-muted)] leading-relaxed">
                    {lang.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </Container>
    </section>
  );
}
