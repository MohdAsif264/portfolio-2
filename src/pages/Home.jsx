import { useEffect } from 'react';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Journey } from '../components/sections/Journey';
import { Expertise } from '../components/sections/Expertise';
import { Experience } from '../components/sections/Experience';
import { Projects } from '../components/sections/Projects';
import { Achievements } from '../components/sections/Achievements';
import { Contact } from '../components/sections/Contact';
import { SITE_META } from '../utils/constants';

export function Home() {
  useEffect(() => {
    document.title = SITE_META.title;
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Journey />
      <Expertise />
      <Experience />
      <Projects />
      <Achievements />
      <Contact />
    </>
  );
}
