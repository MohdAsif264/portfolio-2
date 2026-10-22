import { useEffect } from 'react';
import { Projects } from '../components/sections/Projects';
import { Journey } from '../components/sections/Journey';
import { PageHero } from '../components/ui/PageHero';

export function ProjectsPage() {
  useEffect(() => {
    document.title = `My Hospitality Journey — Ranjeet Singh Patel | Hotel General Manager`;
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Hotels & Properties"
        title="My Hospitality"
        accent="Journey"
        description="A curated overview of the four hospitality establishments in Kushinagar associated with Ranjeet Singh Patel's career."
      />
      <Journey />
      <Projects />
    </>
  );
}
