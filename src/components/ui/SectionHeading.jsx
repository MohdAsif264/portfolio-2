import { motion, useReducedMotion } from 'framer-motion';
import { reveal } from '../../utils/motion';

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
      className={`flex flex-col ${alignClass} mb-12 sm:mb-16 ${className}`}
      {...reveal(shouldReduceMotion)}
    >
      {eyebrow && (
        <span className={`eyebrow mb-5 ${align === 'center' ? 'eyebrow--center' : ''}`}>
          {eyebrow}
        </span>
      )}

      <h2
        className={`display-title max-w-3xl text-balance ${light ? 'text-white!' : ''}`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-6 max-w-2xl font-sans text-[15px] sm:text-base leading-relaxed text-pretty ${
            light ? 'text-[var(--color-ivory-dark)]' : 'text-[var(--color-muted)]'
          } ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
