import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { profile } from '../../data/profile';

export function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const cleanPhone = (profile.whatsapp || '918707015028').replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent("Hello Ranjeet, I am reaching out regarding your hospitality portfolio and Hotel The Ideal, Kushinagar.")}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="hidden sm:flex items-center gap-2 glass-card px-3.5 py-2 border border-[var(--color-gold)]/40 shadow-xl"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-sans text-xs text-[var(--color-ivory)] whitespace-nowrap">
              Chat on WhatsApp · +91 8707015028
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Connect on WhatsApp with General Manager Ranjeet Singh Patel"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative w-13 h-13 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.35)] border border-emerald-400/40 hover:shadow-[0_12px_40px_rgba(37,211,102,0.5)] transition-shadow duration-300 group focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-navy)]"
        whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.94 }}
        initial={shouldReduceMotion ? {} : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 260, damping: 20 }}
      >
        <span className="sr-only">Chat on WhatsApp</span>
        <MessageCircle size={24} className="transition-transform duration-300 group-hover:scale-110" />

        {/* Pulse ring (disabled if reduced motion) */}
        {!shouldReduceMotion && (
          <span className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping pointer-events-none -z-10" />
        )}
      </motion.a>
    </div>
  );
}
