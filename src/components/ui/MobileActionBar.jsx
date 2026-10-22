import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Phone, MessageCircle, Mail } from 'lucide-react';
import { profile } from '../../data/profile';

// Phone-only quick-contact bar; appears once the visitor scrolls past the hero.
export function MobileActionBar() {
  const [visible, setVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const actions = [
    { href: profile.telUrl, label: 'Call Now', icon: Phone },
    { href: profile.whatsappUrl, label: 'WhatsApp', icon: MessageCircle, external: true, accent: true },
    { href: profile.mailUrl, label: 'Send Email', icon: Mail },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          aria-label="Quick contact"
          className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-[var(--color-nav-bg)] backdrop-blur-md border-t border-[var(--color-line-strong)] pb-[env(safe-area-inset-bottom)] shadow-[0_-12px_30px_-18px_rgba(0,0,0,0.6)]"
          initial={shouldReduceMotion ? false : { y: '100%' }}
          animate={{ y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { y: '100%' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <ul className="grid grid-cols-3 divide-x divide-[var(--color-line)]">
            {actions.map(({ href, label, icon: Icon, external, accent }) => (
              <li key={label}>
                <a
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="flex flex-col items-center justify-center gap-1 min-h-16 py-2 text-[var(--color-ivory)] active:bg-[var(--color-gold)]/10 transition-colors focus-visible:outline-none focus-visible:bg-[var(--color-gold)]/10"
                >
                  <Icon size={18} strokeWidth={1.5} className={accent ? 'text-[#25D366]' : 'text-[var(--color-gold)]'} />
                  <span className="font-sans text-[11px] font-semibold tracking-[0.14em] uppercase">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
