import { useState, useEffect, useCallback } from 'react';

const THEME_KEY = 'rsp-portfolio-theme';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved) return saved;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
      return 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (theme === 'light') {
      html.classList.add('light');
      html.classList.remove('dark');
      body.classList.add('light');
      body.classList.remove('dark');
    } else {
      html.classList.remove('light');
      html.classList.add('dark');
      body.classList.remove('light');
      body.classList.add('dark');
    }

    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // safe fallback if storage is restricted
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggleTheme, isDark: theme === 'dark' };
}
