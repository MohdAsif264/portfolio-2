import { MessageCircle, Mail, Phone } from 'lucide-react';
import { Linkedin, Instagram, Twitter, Facebook, Youtube } from './SocialIcons';
import { profile } from '../../data/profile';
import { hasSocialLink } from '../../utils/social';

// Social profiles render only when a real URL is set in profile.socialLinks
// (src/data/profile.js). Direct contact channels always show.
const SOCIAL_PLATFORMS = [
  { key: 'linkedin', label: 'LinkedIn', Icon: Linkedin },
  { key: 'instagram', label: 'Instagram', Icon: Instagram },
  { key: 'facebook', label: 'Facebook', Icon: Facebook },
  { key: 'youtube', label: 'YouTube', Icon: Youtube },
  { key: 'twitter', label: 'X (Twitter)', Icon: Twitter },
];

const CONTACT_CHANNELS = [
  { label: 'WhatsApp', href: profile.whatsappUrl, Icon: MessageCircle, external: true },
  { label: 'Send Email', href: profile.mailUrl, Icon: Mail },
  { label: 'Call Now', href: profile.telUrl, Icon: Phone },
];

const socialProfiles = SOCIAL_PLATFORMS
  .filter(({ key }) => hasSocialLink(key))
  .map((platform) => ({ ...platform, href: profile.socialLinks[platform.key], external: true }));

export function SocialLinks({ className = '', includeContact = true, size = 'md', ringOffset = 'var(--color-navy)' }) {
  const links = [...socialProfiles, ...(includeContact ? CONTACT_CHANNELS : [])];
  if (!links.length) return null;

  const box = size === 'sm' ? 'w-10 h-10' : 'w-11 h-11';
  const icon = size === 'sm' ? 15 : 16;

  return (
    <ul className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {links.map(({ label, href, Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            aria-label={`${label} — Ranjeet Singh Patel`}
            title={label}
            style={{ '--tw-ring-offset-color': ringOffset }}
            className={`${box} flex items-center justify-center rounded-full border border-[var(--color-line-strong)] text-[var(--color-gold)] transition-colors duration-300 hover:bg-[var(--color-gold)] hover:text-[var(--color-on-gold)] hover:border-[var(--color-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2`}
          >
            <Icon size={icon} strokeWidth={1.5} />
          </a>
        </li>
      ))}
    </ul>
  );
}
