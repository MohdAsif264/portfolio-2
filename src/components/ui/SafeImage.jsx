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
        <div className={`w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[var(--color-navy-mid)] via-[var(--color-navy)] to-[var(--color-charcoal)] border border-[var(--color-gold)]/30 text-center select-none ${className}`}>
          <div className="w-16 h-16 rounded-full border border-[var(--color-gold)]/40 flex items-center justify-center mb-3 bg-[var(--color-gold)]/5 shadow-[0_0_15px_rgba(201,168,76,0.15)]">
            <User size={28} className="text-[var(--color-gold)]/80" />
          </div>
          <div className="h-px w-14 bg-gradient-to-r from-transparent via-[var(--color-gold)]/60 to-transparent mb-2.5" />
          <span className="font-serif text-sm sm:text-base text-[var(--color-ivory)] font-medium">
            {title || "Ranjeet Singh Patel"}
          </span>
          <span className="font-sans text-[10px] text-[var(--color-gold)]/90 tracking-[0.2em] uppercase mt-1 font-medium">
            {subtitle || "Hotel General Manager"}
          </span>
          <span className="font-sans text-[9px] text-[var(--color-muted)] mt-1">
            Hotel The Ideal · Kushinagar
          </span>
        </div>
      );
    }

    // Default: Hotel / Architecture luxury placeholder
    return (
      <div className={`w-full h-full flex flex-col items-center justify-center p-5 bg-gradient-to-br from-[var(--color-navy-mid)] to-[var(--color-charcoal)] border border-[var(--color-gold)]/20 text-center select-none ${className}`}>
        <div className="w-12 h-12 rounded-full border border-[var(--color-gold)]/30 flex items-center justify-center mb-2.5 bg-[var(--color-gold)]/5">
          <Building2 size={20} className="text-[var(--color-gold)]/70" />
        </div>
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-[var(--color-gold)]/40 to-transparent mb-2" />
        <span className="font-serif text-sm text-[var(--color-ivory)]/90 font-medium px-2">
          {title || "Hospitality Property"}
        </span>
        <span className="font-sans text-[9px] text-[var(--color-gold)]/70 tracking-[0.2em] uppercase mt-1">
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
