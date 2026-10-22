import { useState } from 'react';
import { Building2, User } from 'lucide-react';

export function SafeImage({
  src,
  fallbackSrc,
  alt,
  className = '',
  placeholderType = 'hotel', // 'hotel' | 'portrait'
  title = '',
  subtitle = '',
  loading = 'lazy',
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [prevSrc, setPrevSrc] = useState(src);

  // Adjust state when the src prop changes (React-recommended pattern
  // avoids useEffect + setState which triggers cascading renders)
  if (src !== prevSrc) {
    setPrevSrc(src);
    setImgSrc(src);
    setHasError(false);
  }

  const handleError = () => {
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  if (!imgSrc || hasError) {
    if (placeholderType === 'portrait') {
      return (
        <div className={`relative w-full h-full flex flex-col items-center justify-center p-8 bg-[radial-gradient(ellipse_at_top,var(--color-navy-mid),var(--color-navy)_60%,var(--color-charcoal))] text-center select-none ${className}`}>
          <div className="w-20 h-20 rotate-45 border border-[var(--color-gold)]/50 flex items-center justify-center mb-6">
            <User size={28} strokeWidth={1.25} className="-rotate-45 text-[var(--color-gold)]" />
          </div>
          <span className="font-serif text-lg sm:text-xl text-[var(--color-ivory)]">
            {title || "Ranjeet Singh Patel"}
          </span>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent my-3" />
          <span className="font-sans text-[11px] text-[var(--color-gold)] tracking-[0.22em] uppercase font-semibold">
            {subtitle || "Hotel General Manager"}
          </span>
          <span className="font-sans text-xs text-[var(--color-muted)] mt-1.5">
            Hotel The Ideal · Kushinagar
          </span>
        </div>
      );
    }

    // Default: Hotel / Architecture luxury placeholder
    return (
      <div className={`relative w-full h-full flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,var(--color-navy-mid),var(--color-navy)_70%)] text-center select-none ${className}`}>
        <div aria-hidden="true" className="absolute inset-3 border border-[var(--color-gold)]/20 pointer-events-none" />
        <div className="w-12 h-12 rotate-45 border border-[var(--color-gold)]/45 flex items-center justify-center mb-5">
          <Building2 size={18} strokeWidth={1.25} className="-rotate-45 text-[var(--color-gold)]" />
        </div>
        <span className="font-display text-xl sm:text-2xl text-[var(--color-ivory)] font-medium px-4 leading-tight max-w-xs">
          {title || "Hospitality Property"}
        </span>
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-[var(--color-gold)]/70 to-transparent my-3" />
        <span className="font-sans text-[11px] text-[var(--color-gold)]/90 tracking-[0.2em] uppercase px-6 max-w-sm leading-relaxed">
          {subtitle || "Kushinagar, Uttar Pradesh"}
        </span>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt || title || 'Ranjeet Singh Patel Portfolio'}
      className={className}
      loading={loading}
      decoding="async"
      onError={handleError}
    />
  );
}
