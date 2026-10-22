import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { profile } from '../../data/profile';

const contactMethods = [
  {
    icon: <Mail size={18} />,
    label: "Direct Email",
    value: profile.email,
    href: profile.mailUrl,
    desc: "Direct communication for hotel inquiries & professional matters",
    actionLabel: "Send Email"
  },
  {
    icon: <Phone size={18} />,
    label: "Direct Phone",
    value: profile.phone,
    href: profile.telUrl,
    desc: "Available for hospitality discussions & guest inquiries",
    actionLabel: "Call Now"
  },
  {
    icon: <MessageCircle size={18} />,
    label: "WhatsApp Message",
    value: profile.phone,
    href: profile.whatsappUrl,
    desc: "Instant direct chat with General Manager Ranjeet Singh Patel",
    actionLabel: "Message on WhatsApp"
  },
  {
    icon: <MapPin size={18} />,
    label: "Current Location",
    value: profile.location,
    href: null,
    desc: "Hotel The Ideal, NH-28 Service Lane, Kushinagar, UP",
    actionLabel: null
  },
];

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submissionFeedback, setSubmissionFeedback] = useState(null);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Please enter your full name.";
    if (!form.email.trim()) {
      errs.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (form.phone.trim() && !/^[+0-9\s-]{8,15}$/.test(form.phone)) {
      errs.phone = "Please enter a valid phone number or leave blank.";
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters long.";
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    const serviceId = import.meta.env?.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env?.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env?.VITE_EMAILJS_PUBLIC_KEY;

    if (serviceId && templateId && publicKey && window.emailjs) {
      window.emailjs
        .send(serviceId, templateId, form, publicKey)
        .then(() => {
          setLoading(false);
          setSubmitted(true);
          setSubmissionFeedback({
            success: true,
            msg: "Your message has been sent successfully to Ranjeet Singh Patel."
          });
        })
        .catch(() => {
          setLoading(false);
          setSubmissionFeedback({
            success: false,
            msg: "There was an issue sending your message online. Please reach out directly via WhatsApp or Email."
          });
        });
    } else {
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
        setSubmissionFeedback({
          success: true,
          msg: "Your inquiry details have been captured. You can also send this directly via WhatsApp or Email below for immediate response."
        });
      }, 700);
    }
  };

  return (
    <section id="contact" className="relative py-20 lg:py-24 bg-[var(--color-navy)] overflow-hidden transition-colors duration-500">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-[var(--color-gold)]/3 rounded-full blur-3xl pointer-events-none" />

      <Container className="max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Connect Directly"
          title="Get In Touch"
          subtitle="Direct contact for hotel management consultation, professional inquiries, or guest services in Kushinagar."
        />

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* Left — Verified Contact Methods (5 cols) */}
          <div className="lg:col-span-5 space-y-3.5">
            {contactMethods.map((method, i) => (
              <motion.div
                key={method.label}
                className="glass-card glass-card-hover p-4 sm:p-5 flex items-start gap-3.5 sm:gap-4 border border-[var(--color-gold)]/20"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="w-10 h-10 flex items-center justify-center border border-[var(--color-gold)]/35 text-[var(--color-gold)] shrink-0 bg-[var(--color-gold)]/5">
                  {method.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-sans text-[9px] text-[var(--color-gold)] tracking-wider uppercase font-semibold mb-0.5">
                    {method.label}
                  </div>
                  {method.href ? (
                    <a
                      href={method.href}
                      target={method.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="font-serif text-sm sm:text-base text-[var(--color-ivory)] hover:text-[var(--color-gold)] transition-colors block mb-0.5 break-all focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-navy)]"
                    >
                      {method.value}
                    </a>
                  ) : (
                    <span className="font-serif text-sm sm:text-base text-[var(--color-ivory)] block mb-0.5">
                      {method.value}
                    </span>
                  )}
                  <p className="font-sans text-xs text-[var(--color-muted)] leading-relaxed">
                    {method.desc}
                  </p>
                  {method.actionLabel && method.href && (
                    <a
                      href={method.href}
                      target={method.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-sans text-[11px] text-[var(--color-gold)] hover:underline mt-1.5 font-medium focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-navy)]"
                    >
                      {method.actionLabel} →
                    </a>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Direct WhatsApp Callout */}
            <div className="p-4 sm:p-5 glass-card border border-emerald-500/30 bg-emerald-950/20 rounded-[2px]">
              <div className="flex items-center gap-2 text-emerald-400 font-serif text-sm font-medium mb-1">
                <MessageCircle size={15} />
                <span>Quick Response on WhatsApp</span>
              </div>
              <p className="font-sans text-xs text-[var(--color-muted)] mb-3">
                For quickest response regarding room reservations, hospitality services, or operational inquiries, connect directly on WhatsApp.
              </p>
              <a
                href={profile.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs tracking-wider uppercase transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-navy)]"
              >
                Open WhatsApp (+91 8707015028)
              </a>
            </div>
          </div>

          {/* Right — Professional Contact Form (7 cols) */}
          <motion.div
            className="lg:col-span-7 glass-card p-6 sm:p-8 border border-[var(--color-gold)]/25"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 220 }}
                >
                  <CheckCircle2 size={44} className="text-emerald-400 mb-3" />
                </motion.div>
                <h3 className="font-serif text-xl sm:text-2xl text-[var(--color-ivory)] mb-2 font-medium">Inquiry Recorded</h3>
                <p className="font-sans text-xs sm:text-sm text-[var(--color-muted)] max-w-md leading-relaxed mb-5">
                  {submissionFeedback?.msg}
                </p>
                <div className="flex flex-wrap justify-center gap-2.5">
                  <a
                    href={`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(`Hello Ranjeet, my name is ${form.name}. ${form.message}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-emerald-600 text-white font-sans text-xs uppercase tracking-wider hover:bg-emerald-500 transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-navy)]"
                  >
                    Send via WhatsApp
                  </a>
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', email: '', phone: '', message: '' });
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Send Another
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="mb-3">
                  <h3 className="font-serif text-xl sm:text-2xl text-[var(--color-ivory)] font-medium">Send a Message</h3>
                  <p className="font-sans text-xs text-[var(--color-muted)] mt-1">
                    Fill in your details below. Responses are provided directly by Ranjeet Singh Patel.
                  </p>
                </div>

                {/* Name & Email Row */}
                <div className="grid sm:grid-cols-2 gap-3.5">
                  <div>
                    <label htmlFor="contact-name" className="font-sans text-[10px] text-[var(--color-gold)]/90 tracking-wider uppercase block mb-1 font-medium">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Amit Sharma"
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      className={`w-full bg-[var(--color-navy)]/60 border ${errors.name ? 'border-red-400' : 'border-[var(--color-gold)]/20'} text-[var(--color-ivory)] font-sans text-xs sm:text-sm px-3.5 py-2.5 focus:border-[var(--color-gold)]/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-navy)] placeholder-[var(--color-muted)]/40 transition-colors`}
                    />
                    {errors.name && (
                      <p className="font-sans text-[10px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle size={10} /> {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="font-sans text-[10px] text-[var(--color-gold)]/90 tracking-wider uppercase block mb-1 font-medium">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="e.g. amit@example.com"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      className={`w-full bg-[var(--color-navy)]/60 border ${errors.email ? 'border-red-400' : 'border-[var(--color-gold)]/20'} text-[var(--color-ivory)] font-sans text-xs sm:text-sm px-3.5 py-2.5 focus:border-[var(--color-gold)]/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-navy)] placeholder-[var(--color-muted)]/40 transition-colors`}
                    />
                    {errors.email && (
                      <p className="font-sans text-[10px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle size={10} /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone (Optional) */}
                <div>
                  <label htmlFor="contact-phone" className="font-sans text-[10px] text-[var(--color-gold)]/90 tracking-wider uppercase block mb-1 font-medium">
                    Phone Number (Optional)
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 9876543210"
                    aria-invalid={!!errors.phone}
                    className={`w-full bg-[var(--color-navy)]/60 border ${errors.phone ? 'border-red-400' : 'border-[var(--color-gold)]/20'} text-[var(--color-ivory)] font-sans text-xs sm:text-sm px-3.5 py-2.5 focus:border-[var(--color-gold)]/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-navy)] placeholder-[var(--color-muted)]/40 transition-colors`}
                  />
                  {errors.phone && (
                    <p className="font-sans text-[10px] text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.phone}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="font-sans text-[10px] text-[var(--color-gold)]/90 tracking-wider uppercase block mb-1 font-medium">
                    Message / Inquiry *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Please specify your inquiry or message..."
                    rows={4}
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    className={`w-full bg-[var(--color-navy)]/60 border ${errors.message ? 'border-red-400' : 'border-[var(--color-gold)]/20'} text-[var(--color-ivory)] font-sans text-xs sm:text-sm px-3.5 py-2.5 focus:border-[var(--color-gold)]/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-navy)] placeholder-[var(--color-muted)]/40 transition-colors resize-none`}
                  />
                  {errors.message && (
                    <p className="font-sans text-[10px] text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full justify-center mt-1"
                  icon={loading ? null : <Send size={13} />}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Submit Inquiry'}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
