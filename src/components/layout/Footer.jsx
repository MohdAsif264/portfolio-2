import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { profile } from '../../data/profile';
import { NAV_LINKS } from '../../utils/constants';

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer aria-label="Site footer" className="relative bg-[var(--color-charcoal)] border-t border-[var(--color-gold)]/15 transition-colors duration-500">
      {/* Top gold line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">

          {/* Brand Column — 6 cols */}
          <div className="lg:col-span-6">
            <Link to="/" className="inline-block mb-4">
              <div className="font-serif text-2xl text-[var(--color-gold)]">Ranjeet Singh Patel</div>
              <div className="font-sans text-[9px] text-[var(--color-ivory)]/50 tracking-[0.3em] uppercase mt-1">
                General Manager · Hotel The Ideal, Kushinagar
              </div>
            </Link>
            <p className="font-sans text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed max-w-md mb-6">
              With 12 years of professional experience in hospitality operations, front-office services, and guest handling. Holding a Master of Hotel Management (M.H.M.) from Sikkim Global Technical University.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={profile.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Message"
                className="flex items-center gap-2 px-3 py-1.5 border border-emerald-500/30 text-emerald-400 bg-emerald-950/20 text-xs font-sans hover:bg-emerald-500/20 transition-all focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-charcoal)]"
              >
                <MessageCircle size={14} />
                <span>WhatsApp (+91 8707015028)</span>
              </a>
              <a
                href={profile.telUrl}
                aria-label="Call Now"
                className="flex items-center gap-2 px-3 py-1.5 border border-[var(--color-gold)]/30 text-[var(--color-gold)] text-xs font-sans hover:bg-[var(--color-gold)]/10 transition-all focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-charcoal)]"
              >
                <Phone size={13} />
                <span>Call Directly</span>
              </a>
            </div>
          </div>

          {/* Navigation — 3 cols */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-[var(--color-gold)] text-sm mb-4 tracking-wider uppercase">Navigation</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-sans text-xs text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors animated-underline focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-charcoal)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/projects"
                  className="font-sans text-xs text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors animated-underline focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-charcoal)]"
                >
                  My Hospitality Journey
                </Link>
              </li>
            </ul>
          </div>

          {/* Verified Contact Details — 3 cols */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-[var(--color-gold)] text-sm mb-4 tracking-wider uppercase">Direct Contact</h4>
            <ul className="space-y-3.5">
              <li>
                <a
                  href={profile.mailUrl}
                  className="flex items-start gap-2.5 text-xs text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors group focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-charcoal)]"
                >
                  <Mail size={14} className="mt-0.5 shrink-0 text-[var(--color-gold)]/70 group-hover:text-[var(--color-gold)]" />
                  <span className="font-sans break-all">{profile.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={profile.telUrl}
                  className="flex items-start gap-2.5 text-xs text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors group focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-charcoal)]"
                >
                  <Phone size={14} className="mt-0.5 shrink-0 text-[var(--color-gold)]/70 group-hover:text-[var(--color-gold)]" />
                  <span className="font-sans">{profile.phone}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-[var(--color-muted)]">
                <MapPin size={14} className="mt-0.5 shrink-0 text-[var(--color-gold)]/70" />
                <span className="font-sans">{profile.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--color-gold)]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-[var(--color-muted)] text-center sm:text-left">
            © {CURRENT_YEAR} Ranjeet Singh Patel · General Manager, Hotel The Ideal.
            <span className="block sm:inline sm:ml-2 text-[var(--color-gold)]/60">12 Years of Hospitality Experience.</span>
          </p>
          <motion.button
            onClick={scrollTop}
            aria-label="Scroll to top"
            className="w-8 h-8 flex items-center justify-center border border-[var(--color-gold)]/30 text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[var(--color-navy)] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-charcoal)]"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={14} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
