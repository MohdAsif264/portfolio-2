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
    <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 flex items-center gap-3">
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="hidden sm:flex items-center gap-2.5 lux-card px-4 py-2.5 shadow-[var(--shadow-soft)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
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
        className="relative w-14 h-14 flex items-center justify-center rounded-full bg-[#1f9e57] text-white shadow-[0_12px_28px_-8px_rgba(0,0,0,0.5)] ring-1 ring-[var(--color-gold)]/40 ring-offset-4 ring-offset-transparent hover:bg-[#25b866] transition-colors duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.94 }}
        initial={shouldReduceMotion ? {} : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 260, damping: 20 }}
      >
        <span className="sr-only">Chat on WhatsApp</span>
        <MessageCircle size={24} strokeWidth={1.75} className="transition-transform duration-300 group-hover:scale-110" />

      </motion.a>
    </div>
  );
}
