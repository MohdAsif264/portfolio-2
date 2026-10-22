import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { profile } from '../../data/profile';
import { reveal } from '../../utils/motion';

const contactMethods = [
  {
    icon: <Mail size={18} strokeWidth={1.5} />,
    label: "Direct Email",
    value: profile.email,
    href: profile.mailUrl,
    desc: "Direct communication for hotel inquiries & professional matters",
    actionLabel: "Send Email"
  },
  {
    icon: <Phone size={18} strokeWidth={1.5} />,
    label: "Direct Phone",
    value: profile.phone,
    href: profile.telUrl,
    desc: "Available for hospitality discussions & guest inquiries",
    actionLabel: "Call Now"
  },
  {
    icon: <MessageCircle size={18} strokeWidth={1.5} />,
    label: "WhatsApp Message",
    value: profile.phone,
    href: profile.whatsappUrl,
    desc: "Instant direct chat with General Manager Ranjeet Singh Patel",
    actionLabel: "Message on WhatsApp"
  },
  {
    icon: <MapPin size={18} strokeWidth={1.5} />,
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
  const shouldReduceMotion = useReducedMotion();

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
    <section id="contact" className="relative section-pad bg-[var(--color-navy)] overflow-hidden transition-colors duration-500">
      <Container>
        <SectionHeading
          eyebrow="Connect Directly"
          title="Get In Touch"
          subtitle="Direct contact for hotel management consultation, professional inquiries, or guest services in Kushinagar."
        />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left — Verified Contact Methods */}
          <div className="lg:col-span-5">
            <ul className="border-t border-[var(--color-line)]">
              {contactMethods.map((method, i) => (
                <motion.li
                  key={method.label}
                  className="py-6 border-b border-[var(--color-line)] flex items-start gap-5"
                  {...reveal(shouldReduceMotion, { delay: i * 0.06, y: 14, amount: '-20px' })}
                >
                  <div className="w-11 h-11 flex items-center justify-center border border-[var(--color-line-strong)] text-[var(--color-gold)] shrink-0">
                    {method.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="label text-[10px]! mb-1.5">
                      {method.label}
                    </div>
                    {method.href ? (
                      <a
                        href={method.href}
                        target={method.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="font-display text-xl sm:text-[1.4rem] text-[var(--color-ivory)] hover:text-[var(--color-gold)] transition-colors block mb-1 break-all leading-snug focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-navy)]"
                      >
                        {method.value}
                      </a>
                    ) : (
                      <span className="font-display text-xl sm:text-[1.4rem] text-[var(--color-ivory)] block mb-1 leading-snug">
                        {method.value}
                      </span>
                    )}
                    <p className="font-sans text-sm text-[var(--color-muted)] leading-relaxed">
                      {method.desc}
                    </p>
                    {method.actionLabel && method.href && (
                      <a
                        href={method.href}
                        target={method.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="animated-underline inline-flex items-center gap-1 font-sans text-[11px] tracking-[0.14em] uppercase text-[var(--color-gold)] mt-3 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-navy)]"
                      >
                        {method.actionLabel} →
                      </a>
                    )}
                  </div>
                </motion.li>
              ))}
            </ul>

            {/* Direct WhatsApp Callout */}
            <motion.div
              className="mt-8 p-6 sm:p-7 lux-card border-l-2! border-l-[#25D366]!"
              {...reveal(shouldReduceMotion, { delay: 0.2, y: 14 })}
            >
              <div className="flex items-center gap-2.5 text-[var(--color-ivory)] font-display text-xl font-medium mb-2">
                <MessageCircle size={17} strokeWidth={1.5} className="text-[#25D366]" />
                <span>Quick Response on WhatsApp</span>
              </div>
              <p className="font-sans text-sm text-[var(--color-muted)] leading-relaxed mb-5">
                For quickest response regarding room reservations, hospitality services, or operational inquiries, connect directly on WhatsApp.
              </p>
              <a
                href={profile.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-h-11 px-5 bg-[#1f9e57] hover:bg-[#25b866] text-white font-sans text-[11px] font-semibold tracking-[0.14em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-navy)]"
              >
                Open WhatsApp (+91 8707015028)
              </a>
            </motion.div>
          </div>

          {/* Right — Professional Contact Form */}
          <motion.div
            className="lg:col-span-7 lux-card corner-frame p-7 sm:p-10 lg:p-12"
            {...reveal(shouldReduceMotion, { delay: 0.1 })}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center" role="status" aria-live="polite">
                <motion.div
                  initial={shouldReduceMotion ? false : { scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                  className="w-16 h-16 rounded-full border border-[var(--color-gold)] flex items-center justify-center mb-6"
                >
                  <CheckCircle2 size={28} strokeWidth={1.25} className="text-[var(--color-gold)]" />
                </motion.div>
                <h3 className="font-display text-3xl text-[var(--color-ivory)] mb-3 font-medium">Inquiry Recorded</h3>
                <p className="font-sans text-sm text-[var(--color-muted)] max-w-md leading-relaxed mb-8">
                  {submissionFeedback?.msg}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <a
                    href={`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(`Hello Ranjeet, my name is ${form.name}. ${form.message}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center min-h-11 px-5 bg-[#1f9e57] text-white font-sans text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-[#25b866] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-navy)]"
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
              <form onSubmit={handleSubmit} className="space-y-7" noValidate>
                <div>
                  <h3 className="font-display text-3xl sm:text-4xl text-[var(--color-ivory)] font-medium">Send a Message</h3>
                  <p className="font-sans text-sm text-[var(--color-muted)] mt-2">
                    Fill in your details below. Responses are provided directly by Ranjeet Singh Patel.
                  </p>
                </div>

                {submissionFeedback && !submissionFeedback.success && (
                  <p role="alert" className="field-error border border-current/30 px-4 py-3">
                    <AlertCircle size={14} className="shrink-0" /> {submissionFeedback.msg}
                  </p>
                )}

                {/* Name & Email Row */}
                <div className="grid sm:grid-cols-2 gap-7">
                  <div>
                    <label htmlFor="contact-name" className="field-label">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Amit Sharma"
                      autoComplete="name"
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      className="field"
                    />
                    {errors.name && (
                      <p id="contact-name-error" className="field-error">
                        <AlertCircle size={12} /> {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="field-label">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="e.g. amit@example.com"
                      autoComplete="email"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      className="field"
                    />
                    {errors.email && (
                      <p id="contact-email-error" className="field-error">
                        <AlertCircle size={12} /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone (Optional) */}
                <div>
                  <label htmlFor="contact-phone" className="field-label">
                    Phone Number (Optional)
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 9876543210"
                    autoComplete="tel"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                    className="field"
                  />
                  {errors.phone && (
                    <p id="contact-phone-error" className="field-error">
                      <AlertCircle size={12} /> {errors.phone}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="field-label">
                    Message / Inquiry *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Please specify your inquiry or message..."
                    rows={5}
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    className="field resize-none"
                  />
                  {errors.message && (
                    <p id="contact-message-error" className="field-error">
                      <AlertCircle size={12} /> {errors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  icon={loading ? null : <Send size={14} />}
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
