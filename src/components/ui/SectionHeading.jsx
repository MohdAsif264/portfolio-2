import { motion, useReducedMotion } from 'framer-motion';

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
  className = '',
}) {
  const shouldReduceMotion = useReducedMotion();

  const alignClass = {
    center: 'text-center items-center',
    left:   'text-left items-start',
    right:  'text-right items-end',
  }[align] || 'text-center items-center';

  return (
    <motion.div
      className={`flex flex-col ${alignClass} mb-10 sm:mb-14 ${className}`}
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {eyebrow && (
        <span className="text-[var(--color-gold)] font-sans text-xs tracking-[0.3em] uppercase font-medium mb-3">
          {eyebrow}
        </span>
      )}

      <h2
        className={`font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${
          light ? 'text-white' : 'text-[var(--color-ivory)]'
        }`}
      >
        {title}
      </h2>

      {/* Gold divider */}
      <div
        className={`mt-5 h-px w-16 bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent ${
          align === 'left' ? 'mr-auto' : align === 'right' ? 'ml-auto' : 'mx-auto'
        }`}
      />

      {subtitle && (
        <p
          className={`mt-5 max-w-2xl font-sans text-base md:text-lg leading-relaxed ${
            light ? 'text-[var(--color-ivory-dark)]' : 'text-[var(--color-muted)]'
          } ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
