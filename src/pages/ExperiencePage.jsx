import { useEffect } from 'react';
import { Experience } from '../components/sections/Experience';
import { PageHero } from '../components/ui/PageHero';

export function ExperiencePage() {
  useEffect(() => {
    document.title = `Career Experience & Education — Ranjeet Singh Patel | Hotel General Manager`;
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHero
        eyebrow="12 Years of Hospitality Experience"
        title="Career Timeline &"
        accent="Education"
        description="A verified professional record across front-office management, guest handling, and hotel operations in Kushinagar, Uttar Pradesh."
      />
      <Experience />
    </>
  );
}
