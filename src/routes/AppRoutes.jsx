import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { MainLayout } from '../components/layout/MainLayout';
import { PageTransition } from '../components/layout/PageTransition';
import { ScrollToTop } from '../components/layout/ScrollToTop';
import { Home } from '../pages/Home';
import { AboutPage } from '../pages/AboutPage';
import { ExperiencePage } from '../pages/ExperiencePage';
import { ProjectsPage } from '../pages/ProjectsPage';
import { ContactPage } from '../pages/ContactPage';
import { NotFound } from '../pages/NotFound';

export function AppRoutes() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <MainLayout>
                <PageTransition>
                  <Home />
                </PageTransition>
              </MainLayout>
            }
          />
          <Route
            path="/about"
            element={
              <MainLayout>
                <PageTransition>
                  <AboutPage />
                </PageTransition>
              </MainLayout>
            }
          />
          <Route
            path="/experience"
            element={
              <MainLayout>
                <PageTransition>
                  <ExperiencePage />
                </PageTransition>
              </MainLayout>
            }
          />
          <Route
            path="/projects"
            element={
              <MainLayout>
                <PageTransition>
                  <ProjectsPage />
                </PageTransition>
              </MainLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <MainLayout>
                <PageTransition>
                  <ContactPage />
                </PageTransition>
              </MainLayout>
            }
          />
          <Route
            path="*"
            element={
              <PageTransition>
                <NotFound />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}
