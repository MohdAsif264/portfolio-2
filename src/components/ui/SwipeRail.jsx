import { Children, useRef, useState } from 'react';

// Grid on tablet/desktop; on phones the same children become a horizontal,
// snap-scrolling rail with a slim progress indicator (see .swipe-rail in index.css).
export function SwipeRail({ children, label, className = '', wrapperClassName = '' }) {
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  const count = Children.count(children);

  const handleScroll = () => {
    const el = ref.current;
    const first = el?.firstElementChild;
    if (!first) return;
    const step = first.getBoundingClientRect().width + 12;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    setIndex(atEnd ? count - 1 : Math.min(count - 1, Math.round(el.scrollLeft / step)));
  };

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className={`min-w-0 ${wrapperClassName}`}>
      <div
        ref={ref}
        role="region"
        aria-label={label}
        tabIndex={0}
        onScroll={handleScroll}
        className={`swipe-rail ${className}`}
      >
        {children}
      </div>

      <div className="sm:hidden mt-5 flex items-center gap-4" aria-hidden="true">
        <span className="font-display text-base text-[var(--color-gold)] lining-nums tabular-nums">{pad(index + 1)}</span>
        <span className="relative flex-1 h-px bg-[var(--color-line-strong)]">
          <span
            className="absolute inset-y-0 left-0 bg-[var(--color-gold)] transition-[width] duration-500"
            style={{ width: `${((index + 1) / count) * 100}%` }}
          />
        </span>
        <span className="font-display text-base text-[var(--color-muted)] lining-nums tabular-nums">{pad(count)}</span>
      </div>
    </div>
  );
}
