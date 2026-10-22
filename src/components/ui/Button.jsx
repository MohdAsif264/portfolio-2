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
    group relative inline-flex items-center justify-center gap-2.5 font-sans font-semibold uppercase
    tracking-[0.18em] transition-[background-color,color,border-color,box-shadow] duration-300
    cursor-pointer select-none border rounded-[1px] min-h-11
    focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-navy)]
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const sizes = {
    sm:  'text-[11px] px-5 py-2.5',
    md:  'text-[11px] px-7 py-3.5',
    lg:  'text-xs px-10 py-4',
  };

  const variants = {
    primary: `
      bg-[var(--color-gold)] text-[var(--color-on-gold)] border-[var(--color-gold)]
      hover:bg-[var(--color-gold-light)] hover:border-[var(--color-gold-light)]
      hover:shadow-[var(--shadow-gold)]
    `,
    outline: `
      bg-transparent text-[var(--color-gold)] border-[var(--color-gold)]/60
      hover:border-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[var(--color-on-gold)]
    `,
    ghost: `
      bg-transparent text-[var(--color-ivory)] border-transparent px-1!
      hover:text-[var(--color-gold)]
    `,
    dark: `
      bg-[var(--color-surface)] text-[var(--color-ivory)] border-[var(--color-line-strong)]
      hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]
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

  const hoverMotion = shouldReduceMotion ? {} : { y: -2 };
  const tapMotion = shouldReduceMotion ? {} : { scale: 0.98 };

  // Internal routing link
  if (href && href.startsWith('/') && !download && !href.startsWith('/#')) {
    return (
      <MotionLink
        to={href}
        onClick={onClick}
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
        onClick={onClick}
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
