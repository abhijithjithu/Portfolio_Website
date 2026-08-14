import { Moon, Sun } from 'lucide-react';
import useTheme from '../hooks/useTheme';

const ThemeToggle = ({ className = '' }) => {
  const { isDark, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`u-focus inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-ink-muted transition-colors duration-fast ease-smooth hover:border-line-strong hover:bg-sunken hover:text-ink ${className}`}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
};

export default ThemeToggle;
