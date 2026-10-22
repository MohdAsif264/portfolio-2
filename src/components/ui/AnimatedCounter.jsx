import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

export function AnimatedCounter({ value, duration = 1.8, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const shouldReduceMotion = useReducedMotion();

  // Parse string like "15+", "200+", "98%", "5+", "₹12Cr"
  const strVal = String(value || '');
  const match = strVal.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);

  const prefix = match ? match[1] : '';
  const targetNumber = match ? parseFloat(match[2]) : null;
  const suffix = match ? match[3] : '';

  const [displayNumber, setDisplayNumber] = useState(0);

  useEffect(() => {
    // When reduced motion is enabled, show the final value immediately
    // (handled during render via effectiveDisplay — no setState needed here)
    if (!isInView || targetNumber === null || shouldReduceMotion) {
      return;
    }

    const startTime = performance.now();
    const durationMs = duration * 1000;

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      // Luxury easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(ease * targetNumber);

      setDisplayNumber(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayNumber(targetNumber);
      }
    };

    const frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, targetNumber, duration, shouldReduceMotion]);

  if (targetNumber === null) {
    return <span ref={ref} className={className}>{strVal}</span>;
  }

  // Show final value immediately if reduced motion is enabled
  const effectiveDisplay = shouldReduceMotion ? targetNumber : displayNumber;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {effectiveDisplay}
      {suffix}
    </span>
  );
}
