import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { About } from '../components/sections/About';
import { SafeImage } from '../components/ui/SafeImage';
import { PageHero } from '../components/ui/PageHero';
import { EASE_LUX } from '../utils/motion';

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
      <section className="relative section-pad bg-[var(--color-navy)] overflow-hidden transition-colors duration-500">
        <Container>
          <SectionHeading
            eyebrow="The Operational Environment"
            title="Hotel The Ideal, Kushinagar"
            subtitle="The hospitality environment where Ranjeet Singh Patel oversees front-office coordination and daily operational workflows."
          />

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {propertyShowcase.map((item, idx) => (
              <motion.div
                key={item.title}
                className="lux-card lux-card-hover overflow-hidden group flex flex-col"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: EASE_LUX }}
              >
                <div className="relative aspect-[4/3] image-zoom-container bg-[var(--color-navy-mid)]">
                  <SafeImage
                    src={item.image}
                    fallbackSrc={item.fallbackImage}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    placeholderType="hotel"
                    title={item.title}
                    subtitle={item.subtitle}
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0a1424]/80 to-transparent pointer-events-none" />
                  <span className="absolute bottom-4 left-4 font-sans text-[10px] text-[#e4cfa0] tracking-[0.2em] uppercase font-semibold bg-[#0a1424]/85 px-3 py-1 border border-[#c9a96e]/50">
                    {item.subtitle}
                  </span>
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="font-display text-2xl text-[var(--color-ivory)] group-hover:text-[var(--color-gold)] transition-colors mb-3 font-medium leading-tight">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-[var(--color-muted)] leading-relaxed">
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
