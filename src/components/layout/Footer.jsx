import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, ArrowUp } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '../../data/profile';
import { NAV_LINKS } from '../../utils/constants';

const CURRENT_YEAR = new Date().getFullYear();

const linkFocus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-charcoal)]';

export function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const scrollTop = () => window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' });

  return (
    <footer aria-label="Site footer" className="relative bg-[var(--color-charcoal)] transition-colors duration-500">
      <div className="hairline hairline--center" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10 mb-16">

          {/* Brand Column */}
          <div className="md:col-span-2 lg:col-span-5">
            <Link to="/" className={`inline-block mb-6 group ${linkFocus}`}>
              <div className="font-serif text-3xl sm:text-4xl text-[var(--color-ivory)] group-hover:text-[var(--color-gold)] transition-colors">Ranjeet Singh Patel</div>
              <div className="font-sans text-[10px] text-[var(--color-gold)] tracking-[0.3em] uppercase mt-3">
                General Manager · Hotel The Ideal, Kushinagar
              </div>
            </Link>
            <p className="font-sans text-sm text-[var(--color-muted)] leading-relaxed max-w-md mb-8">
              With 12 years of professional experience in hospitality operations, front-office services, and guest handling. Holding a Master of Hotel Management (M.H.M.) from Sikkim Global Technical University.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={profile.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Message"
                className={`flex items-center gap-2 px-4 min-h-11 border border-[var(--color-line-strong)] text-[var(--color-ivory)] text-xs font-sans hover:border-[#25D366] hover:text-[#25D366] transition-colors ${linkFocus}`}
              >
                <MessageCircle size={14} strokeWidth={1.5} className="text-[#25D366]" />
                <span>WhatsApp (+91 8707015028)</span>
              </a>
              <a
                href={profile.telUrl}
                aria-label="Call Now"
                className={`flex items-center gap-2 px-4 min-h-11 border border-[var(--color-line-strong)] text-[var(--color-gold)] text-xs font-sans hover:bg-[var(--color-gold)] hover:text-[var(--color-on-gold)] hover:border-[var(--color-gold)] transition-colors ${linkFocus}`}
              >
                <Phone size={13} strokeWidth={1.5} />
                <span>Call Directly</span>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3 lg:col-start-6">
            <h4 className="label mb-6">Navigation</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className={`font-sans text-sm text-[var(--color-ivory)]/75 hover:text-[var(--color-gold)] transition-colors animated-underline ${linkFocus}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/projects"
                  className={`font-sans text-sm text-[var(--color-ivory)]/75 hover:text-[var(--color-gold)] transition-colors animated-underline ${linkFocus}`}
                >
                  My Hospitality Journey
                </Link>
              </li>
            </ul>
          </div>

          {/* Verified Contact Details */}
          <div className="lg:col-span-4 min-w-0">
            <h4 className="label mb-6">Direct Contact</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={profile.mailUrl}
                  className={`flex items-start gap-3 text-sm text-[var(--color-ivory)]/75 hover:text-[var(--color-gold)] transition-colors group ${linkFocus}`}
                >
                  <Mail size={15} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[var(--color-gold)]" />
                  <span className="font-sans break-words min-w-0">{profile.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={profile.telUrl}
                  className={`flex items-start gap-3 text-sm text-[var(--color-ivory)]/75 hover:text-[var(--color-gold)] transition-colors group ${linkFocus}`}
                >
                  <Phone size={15} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[var(--color-gold)]" />
                  <span className="font-sans">{profile.phone}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-[var(--color-ivory)]/75">
                <MapPin size={15} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[var(--color-gold)]" />
                <span className="font-sans">{profile.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--color-line)] flex flex-col sm:flex-row items-center justify-between gap-5 sm:pr-20">
          <p className="font-sans text-xs text-[var(--color-muted)] text-center sm:text-left leading-relaxed">
            © {CURRENT_YEAR} Ranjeet Singh Patel · General Manager, Hotel The Ideal.
            <span className="block sm:inline sm:ml-2 text-[var(--color-gold)]/80">12 Years of Hospitality Experience.</span>
          </p>
          <motion.button
            onClick={scrollTop}
            aria-label="Scroll to top"
            className={`w-11 h-11 flex items-center justify-center border border-[var(--color-line-strong)] text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[var(--color-on-gold)] hover:border-[var(--color-gold)] transition-colors duration-300 ${linkFocus}`}
            whileHover={shouldReduceMotion ? {} : { y: -2 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.94 }}
          >
            <ArrowUp size={15} strokeWidth={1.5} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
