import { motion, useReducedMotion } from 'framer-motion';
import { Container } from './Container';

export function PageHero({ eyebrow, title, description, accent }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="page-hero">
      <div className="page-hero__image" aria-hidden="true" />
      <div className="page-hero__wash" aria-hidden="true" />
      <Container className="page-hero__content">
        <motion.div
          className="page-hero__copy"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <span className="page-hero__eyebrow">{eyebrow}</span>
          <h1>{title}{accent && <> <span>{accent}</span></>}</h1>
          <div className="page-hero__rule" />
          <p>{description}</p>
        </motion.div>
      </Container>
    </section>
  );
}
