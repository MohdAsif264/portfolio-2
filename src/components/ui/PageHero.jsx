import { motion, useReducedMotion } from 'framer-motion';
import { Container } from './Container';
import { EASE_LUX } from '../../utils/motion';

export function PageHero({ eyebrow, title, description, accent }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="page-hero">
      <div className="page-hero__image" aria-hidden="true" />
      <div className="page-hero__wash" aria-hidden="true" />
      <Container className="page-hero__content">
        <motion.div
          className="page-hero__copy"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_LUX }}
        >
          <span className="page-hero__eyebrow eyebrow">{eyebrow}</span>
          <h1>{title}{accent && <> <span>{accent}</span></>}</h1>
          <div className="page-hero__rule" />
          <p>{description}</p>
        </motion.div>
      </Container>
    </section>
  );
}
