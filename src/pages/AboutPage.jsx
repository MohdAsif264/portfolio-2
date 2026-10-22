import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { About } from '../components/sections/About';
import { SafeImage } from '../components/ui/SafeImage';
import { PageHero } from '../components/ui/PageHero';

const propertyShowcase = [
  {
    title: 'Hospitality Reception & Front Office',
    subtitle: 'Guest Welcoming & Check-In',
    image: '/images/ranjeet/hotel-the-ideal.webp',
    fallbackImage: '/images/hotel_exterior.jpg',
    desc: 'Welcoming domestic and international travelers visiting the sacred Buddhist heritage town of Kushinagar with warmth and organized service.',
  },
  {
    title: 'Hospitality Coordination & Dining',
    subtitle: 'Service Quality Standards',
    image: '/images/hotel_dining.jpg',
    fallbackImage: null,
    desc: 'Coordinating operational workflows to ensure clean, courteous, and timely services for hotel guests and pilgrim groups.',
  },
  {
    title: 'Guest Comfort & Accommodation',
    subtitle: 'Room Readiness & Care',
    image: '/images/hotel_suite.jpg',
    fallbackImage: null,
    desc: 'Maintaining high standards of cleanliness, peace, and comfort for discerning visitors seeking serene accommodations.',
  },
];

export function AboutPage() {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    document.title = `About — Ranjeet Singh Patel | Hotel General Manager`;
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHero
        eyebrow="About the General Manager"
        title="Ranjeet"
        accent="Singh Patel"
        description="12 Years of Hospitality Experience · Master of Hotel Management (M.H.M.) · Dedicated to courteous guest handling, organized operations, and continuous professional growth."
      />

      <About />

      {/* Property & Environment Showcase */}
      <section className="relative py-24 bg-[var(--color-navy)] overflow-hidden border-t border-[var(--color-gold)]/10 transition-colors duration-500">
        <Container>
          <SectionHeading
            eyebrow="The Operational Environment"
            title="Hotel The Ideal, Kushinagar"
            subtitle="The hospitality environment where Ranjeet Singh Patel oversees front-office coordination and daily operational workflows."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {propertyShowcase.map((item, idx) => (
              <motion.div
                key={item.title}
                className="glass-card glass-card-hover overflow-hidden group"
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
              >
                <div className="relative h-60 image-zoom-container overflow-hidden bg-[var(--color-navy-mid)]">
                  <SafeImage
                    src={item.image}
                    fallbackSrc={item.fallbackImage}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    placeholderType="hotel"
                    title={item.title}
                    subtitle={item.subtitle}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)] via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-3 left-4 font-sans text-[10px] text-[var(--color-gold)] tracking-[0.2em] uppercase font-medium bg-[var(--color-navy)]/80 backdrop-blur-md px-2.5 py-1 border border-[var(--color-gold)]/30">
                    {item.subtitle}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-lg text-[var(--color-ivory)] group-hover:text-[var(--color-gold)] transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-[var(--color-muted)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
