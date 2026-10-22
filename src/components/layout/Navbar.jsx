import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Phone, Download, FileText } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ThemeToggle } from '../ui/ThemeToggle';
import { NAV_LINKS } from '../../utils/constants';
import { profile } from '../../data/profile';
import { EASE_LUX } from '../../utils/motion';
import { SocialLinks } from '../ui/SocialLinks';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu open; close it with Escape
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    if (!mobileOpen) return () => { document.body.style.overflow = ''; };
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  const navLinkClass = ({ isActive }) =>
    `animated-underline font-sans text-[11px] font-medium tracking-[0.22em] uppercase transition-colors duration-300 py-1 ${
      isActive
        ? 'text-[var(--color-gold)]'
        : 'text-[var(--color-ivory)]/80 hover:text-[var(--color-gold)]'
    }`;

  const solid = scrolled || mobileOpen;

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,padding,border-color,box-shadow] duration-500 border-b ${
          solid
            ? 'bg-[var(--color-nav-bg)] backdrop-blur-md border-[var(--color-line)] py-3 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.6)]'
            : 'bg-transparent border-transparent py-5 sm:py-6'
        }`}
        initial={shouldReduceMotion ? false : { y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: EASE_LUX }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between gap-6">
          {/* Wordmark */}
          <Link
            to="/"
            className="group flex items-center gap-3 min-w-0 min-h-11"
            onClick={() => setMobileOpen(false)}
          >
            <span aria-hidden="true" className="hidden sm:flex w-9 h-9 shrink-0 rotate-45 border border-[var(--color-gold)]/60 items-center justify-center transition-colors group-hover:border-[var(--color-gold)]">
              <span className="w-2 h-2 bg-[var(--color-gold)] transition-transform duration-500 group-hover:scale-125" />
            </span>
            <span className="flex flex-col min-w-0">
              <span className="font-serif text-[1.05rem] sm:text-xl text-[var(--color-ivory)] leading-none tracking-wide group-hover:text-[var(--color-gold)] transition-colors whitespace-nowrap">
                Ranjeet Singh Patel
              </span>
              <span className="hidden sm:block font-sans text-[11px] lg:text-[10px] text-[var(--color-gold)]/85 tracking-[0.24em] uppercase mt-1.5 whitespace-nowrap">
                General Manager · Hotel The Ideal
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} to={link.href} end={link.href === '/'} className={navLinkClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={profile.telUrl}
              className="hidden xl:flex items-center gap-2 whitespace-nowrap text-[var(--color-ivory)]/80 hover:text-[var(--color-gold)] transition-colors text-xs tracking-wide"
              title="Call Ranjeet Singh Patel directly"
            >
              <Phone size={13} strokeWidth={1.5} className="text-[var(--color-gold)]" />
              <span className="font-sans font-medium">{profile.phone}</span>
            </a>

            <ThemeToggle />

            {profile.resumeAvailable ? (
              <a
                href={profile.resumeUrl}
                download
                className="flex items-center gap-2 px-5 min-h-11 whitespace-nowrap border border-[var(--color-gold)]/60 text-[var(--color-gold)] text-[10px] font-semibold tracking-[0.22em] uppercase font-sans hover:bg-[var(--color-gold)] hover:text-[var(--color-on-gold)] hover:border-[var(--color-gold)] transition-colors duration-300"
              >
                <Download size={12} />
                Download CV
              </a>
            ) : (
              <Link
                to="/contact"
                className="flex items-center gap-2 px-5 min-h-11 whitespace-nowrap border border-[var(--color-gold)]/60 text-[var(--color-gold)] text-[10px] font-semibold tracking-[0.22em] uppercase font-sans hover:bg-[var(--color-gold)] hover:text-[var(--color-on-gold)] hover:border-[var(--color-gold)] transition-colors duration-300"
                title="CV available upon request"
              >
                <FileText size={12} />
                CV On Request
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="flex lg:hidden items-center gap-2.5">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="w-11 h-11 flex items-center justify-center text-[var(--color-gold)] border border-[var(--color-line-strong)] hover:border-[var(--color-gold)] transition-colors"
            >
              {mobileOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-[var(--color-navy)] flex flex-col justify-between px-6 sm:px-10 pt-28 pb-10 overflow-y-auto lg:hidden"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  className="border-b border-[var(--color-line)]"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.05 + i * 0.06, duration: 0.45, ease: EASE_LUX }}
                >
                  <NavLink
                    to={link.href}
                    end={link.href === '/'}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-baseline gap-4 py-4 font-display text-3xl sm:text-4xl transition-colors ${
                        isActive ? 'text-[var(--color-gold)]' : 'text-[var(--color-ivory)] hover:text-[var(--color-gold)]'
                      }`
                    }
                  >
                    <span aria-hidden="true" className="font-sans text-[11px] tracking-[0.2em] text-[var(--color-gold)]/70">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <div className="mt-10 flex flex-col gap-4">
              <a
                href={profile.telUrl}
                className="flex items-center gap-2.5 text-[var(--color-ivory)]/85 hover:text-[var(--color-gold)] transition-colors text-sm min-h-11"
              >
                <Phone size={14} strokeWidth={1.5} className="text-[var(--color-gold)]" />
                <span className="font-sans">{profile.phone}</span>
              </a>

              {profile.resumeAvailable ? (
                <a
                  href={profile.resumeUrl}
                  download
                  className="flex items-center justify-center gap-2 px-5 min-h-12 bg-[var(--color-gold)] text-[var(--color-on-gold)] text-[11px] font-semibold tracking-[0.22em] uppercase font-sans hover:bg-[var(--color-gold-light)] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <Download size={13} />
                  Download Resume
                </a>
              ) : (
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 px-5 min-h-12 bg-[var(--color-gold)] text-[var(--color-on-gold)] text-[11px] font-semibold tracking-[0.22em] uppercase font-sans hover:bg-[var(--color-gold-light)] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <FileText size={13} />
                  Request Official CV
                </Link>
              )}

              <SocialLinks className="mt-4 justify-center" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
