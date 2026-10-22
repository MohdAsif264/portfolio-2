// Shared, restrained entrance motion. Pass the result of useReducedMotion()
// so users who prefer reduced motion see content immediately.
export const EASE_LUX = [0.22, 1, 0.36, 1];

export function reveal(shouldReduceMotion, { delay = 0, y = 22, x = 0, duration = 0.7, amount = '-60px' } = {}) {
  if (shouldReduceMotion) return {};
  return {
    initial: { opacity: 0, y, x },
    whileInView: { opacity: 1, y: 0, x: 0 },
    viewport: { once: true, margin: amount },
    transition: { duration, delay, ease: EASE_LUX },
  };
}
