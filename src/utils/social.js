import { profile } from '../data/profile';

// A social profile counts only when profile.socialLinks holds a real URL for it.
export const hasSocialLink = (key) =>
  typeof profile.socialLinks?.[key] === 'string' && profile.socialLinks[key].trim() !== '';

export const hasAnySocialProfile = ['linkedin', 'instagram', 'facebook', 'youtube', 'twitter'].some(hasSocialLink);
