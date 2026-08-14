import { useCallback, useEffect, useState } from 'react';

/**
 * The `.dark` class is applied by an inline script in index.html before first
 * paint, so this hook reads the DOM as the source of truth rather than
 * re-deciding and re-applying — which is what used to cause a dark flash on
 * every load for light-mode visitors.
 */
const readTheme = () =>
  typeof document !== 'undefined' && document.documentElement.classList.contains('dark');

export default function useTheme() {
  const [isDark, setIsDark] = useState(readTheme);

  // Follow the OS while the visitor has not made an explicit choice.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => {
      if (localStorage.getItem('theme')) return;
      document.documentElement.classList.toggle('dark', e.matches);
      setIsDark(e.matches);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      try {
        localStorage.setItem('theme', next ? 'dark' : 'light');
      } catch (e) { /* private mode */ }
      return next;
    });
  }, []);

  return { isDark, toggle };
}
