import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Create MotionLink outside of render to avoid re-creating the component on each render
const MotionLink = motion.create ? motion.create(Link) : motion(Link);

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  icon,
  iconPosition = 'right',
  disabled = false,
  type = 'button',
  download,
  target,
  rel,
}) {
  const shouldReduceMotion = useReducedMotion();

  const base = `
    relative inline-flex items-center gap-2 font-sans font-medium tracking-wider uppercase
    transition-all duration-300 cursor-pointer select-none border rounded-[2px] overflow-hidden
    focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const sizes = {
    sm:  'text-xs px-5 py-2.5',
    md:  'text-xs px-7 py-3.5',
    lg:  'text-sm px-10 py-4.5',
  };

  const variants = {
    primary: `
      bg-[var(--color-gold)] text-[var(--color-navy)] border-[var(--color-gold)]
      hover:bg-[var(--color-gold-light)] hover:border-[var(--color-gold-light)]
      hover:shadow-[0_8px_30px_rgba(201,168,76,0.35)]
      active:scale-95
    `,
    outline: `
      bg-transparent text-[var(--color-gold)] border-[var(--color-gold)]
      hover:bg-[var(--color-gold)] hover:text-[var(--color-navy)]
      hover:shadow-[0_8px_30px_rgba(201,168,76,0.25)]
      active:scale-95
    `,
    ghost: `
      bg-transparent text-[var(--color-ivory)] border-transparent
      hover:text-[var(--color-gold)] hover:border-transparent
      active:scale-95
    `,
    dark: `
      bg-[var(--color-navy)] text-[var(--color-gold)] border-[var(--color-gold)]/30
      hover:border-[var(--color-gold)] hover:bg-[var(--color-navy-light)]
      active:scale-95
    `,
  };

  const classes = `${base} ${sizes[size] || sizes.md} ${variants[variant] || variants.primary} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5">{icon}</span>}
      <span className="relative z-10">{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
    </>
  );

  const hoverMotion = shouldReduceMotion ? {} : { scale: 1.025, y: -1 };
  const tapMotion = shouldReduceMotion ? {} : { scale: 0.97 };

  // Internal routing link
  if (href && href.startsWith('/') && !download && !href.startsWith('/#')) {
    return (
      <MotionLink
        to={href}
        className={classes}
        whileHover={hoverMotion}
        whileTap={tapMotion}
      >
        {content}
      </MotionLink>
    );
  }

  // External or anchor link
  if (href) {
    return (
      <motion.a
        href={href}
        download={download}
        target={target}
        rel={rel}
        className={classes}
        whileHover={hoverMotion}
        whileTap={tapMotion}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      whileHover={disabled ? {} : hoverMotion}
      whileTap={disabled ? {} : tapMotion}
    >
      {content}
    </motion.button>
  );
}
