export function Container({ children, className = '', narrow = false, wide = false }) {
  const maxWidth = wide
    ? 'max-w-screen-2xl'
    : narrow
    ? 'max-w-4xl'
    : 'max-w-7xl';

  return (
    <div className={`${maxWidth} mx-auto px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}
