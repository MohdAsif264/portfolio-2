import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Phone, Download, FileText } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ThemeToggle } from '../ui/ThemeToggle';
import { NAV_LINKS } from '../../utils/constants';
import { profile } from '../../data/profile';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinkClass = ({ isActive }) =>
    `font-sans text-xs tracking-[0.2em] uppercase transition-colors duration-300 animated-underline pb-0.5 ${
      isActive
        ? 'text-[var(--color-gold)] font-medium'
        : 'text-[var(--color-ivory)]/85 hover:text-[var(--color-gold)]'
    }`;

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[var(--color-navy)]/95 backdrop-blur-md border-b border-[var(--color-gold)]/10 py-3 shadow-2xl'
            : 'bg-transparent py-5'
        }`}
        initial={shouldReduceMotion ? false : { y: -100 }}
        animate={{ y: 0 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex flex-col group" onClick={() => setMobileOpen(false)}>
            <span className="font-serif text-base sm:text-xl text-[var(--color-gold)] leading-none tracking-wide group-hover:text-[var(--color-gold-light)] transition-colors whitespace-nowrap">
              Ranjeet Singh Patel
            </span>
            <span className="hidden sm:block font-sans text-[9px] text-[var(--color-ivory)]/60 tracking-[0.3em] uppercase mt-1">
              General Manager · Hotel The Ideal
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} to={link.href} end={link.href === '/'} className={navLinkClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3.5">
            <ThemeToggle />
            <a
              href={profile.telUrl}
              className="flex items-center gap-1.5 text-[var(--color-ivory)]/85 hover:text-[var(--color-gold)] transition-colors text-xs tracking-wide"
              title="Call Ranjeet Singh Patel directly"
            >
              <Phone size={13} className="text-[var(--color-gold)]" />
              <span className="font-sans font-medium">{profile.phone}</span>
            </a>

            {profile.resumeAvailable ? (
              <a
                href={profile.resumeUrl}
                download
                className="flex items-center gap-1.5 px-4 py-2 border border-[var(--color-gold)]/50 text-[var(--color-gold)] text-[10px] tracking-[0.2em] uppercase font-sans hover:bg-[var(--color-gold)] hover:text-[var(--color-navy)] transition-all duration-300"
              >
                <Download size={11} />
                Download CV
              </a>
            ) : (
              <Link
                to="/contact"
                className="flex items-center gap-1.5 px-4 py-2 border border-[var(--color-gold)]/40 text-[var(--color-gold)] text-[10px] tracking-[0.2em] uppercase font-sans hover:bg-[var(--color-gold)] hover:text-[var(--color-navy)] transition-all duration-300"
                title="CV available upon request"
              >
                <FileText size={11} />
                CV On Request
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="w-10 h-10 flex items-center justify-center text-[var(--color-gold)] border border-[var(--color-gold)]/30 hover:border-[var(--color-gold)] transition-colors"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[var(--color-navy)]/98 backdrop-blur-lg flex flex-col items-center justify-center gap-7 px-6 text-center"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3 }}
          >
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent" />

            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { delay: i * 0.07, duration: 0.3 }}
              >
                <NavLink
                  to={link.href}
                  end={link.href === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `font-serif text-2xl ${isActive ? 'text-[var(--color-gold)] font-medium' : 'text-[var(--color-ivory)]'} hover:text-[var(--color-gold)] transition-colors`
                  }
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ))}

            <div className="mt-4 flex flex-col items-center gap-3">
              <a
                href={profile.telUrl}
                className="flex items-center gap-2 text-[var(--color-ivory)]/80 hover:text-[var(--color-gold)] transition-colors text-sm"
              >
                <Phone size={13} className="text-[var(--color-gold)]" />
                <span className="font-sans">{profile.phone}</span>
              </a>

              {profile.resumeAvailable ? (
                <a
                  href={profile.resumeUrl}
                  download
                  className="flex items-center gap-2 px-5 py-2.5 border border-[var(--color-gold)] text-[var(--color-gold)] text-xs tracking-[0.2em] uppercase font-sans hover:bg-[var(--color-gold)] hover:text-[var(--color-navy)] transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  <Download size={12} />
                  Download Resume
                </a>
              ) : (
                <Link
                  to="/contact"
                  className="flex items-center gap-2 px-5 py-2.5 border border-[var(--color-gold)] text-[var(--color-gold)] text-xs tracking-[0.2em] uppercase font-sans hover:bg-[var(--color-gold)] hover:text-[var(--color-navy)] transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  <FileText size={12} />
                  Request Official CV
                </Link>
              )}
            </div>

            {/* Decorative bottom border */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
