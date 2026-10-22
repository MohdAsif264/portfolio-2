import { useEffect } from 'react';
import { Contact } from '../components/sections/Contact';
import { PageHero } from '../components/ui/PageHero';

export function ContactPage() {
  useEffect(() => {
    document.title = `Contact — Ranjeet Singh Patel | Hotel General Manager`;
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Direct Communication"
        title="Get In"
        accent="Touch"
        description="Connect directly with Ranjeet Singh Patel for hotel operations, guest services, reservations, or professional correspondence in Kushinagar."
      />
      <Contact />
    </>
  );
}
