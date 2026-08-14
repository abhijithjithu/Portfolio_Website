import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAME, NAV } from '../config/site';
import ThemeToggle from './ThemeToggle';

/** Plain scrollIntoView — CSS decides whether it eases, honouring reduced motion. */
const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView();
};

const SiteHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [observed, setObserved] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHome = pathname === '/';

  // Derived rather than reset through an effect: off the home page there are
  // no tracked sections, so nothing should read as active.
  const active = isHome ? observed : '';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track the section currently occupying most of the viewport. Reads the same
  // NAV list the links render from, so a section can never be linkable but untracked.
  useEffect(() => {
    if (!isHome) return undefined;

    const ratios = new Map();
    const observers = NAV.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          ratios.set(id, entry.intersectionRatio);
          let best = '';
          let bestRatio = 0;
          ratios.forEach((ratio, key) => {
            if (ratio > bestRatio) {
              bestRatio = ratio;
              best = key;
            }
          });
          if (bestRatio > 0) setObserved(best);
        },
        { threshold: [0, 0.15, 0.35, 0.6] }
      );

      observer.observe(el);
      return observer;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, [isHome]);

  const go = useCallback(
    (id) => {
      setMenuOpen(false);
      if (isHome) {
        scrollToId(id);
      } else {
        navigate('/');
        // Wait for Home to mount before the target id exists.
        requestAnimationFrame(() => requestAnimationFrame(() => scrollToId(id)));
      }
    },
    [isHome, navigate]
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-header border-b transition-colors duration-base ease-smooth ${
        scrolled ? 'border-line bg-ground/85 backdrop-blur-sm' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="u-container flex h-header items-center justify-between gap-6">
        <Link
          to="/"
          className="u-focus font-display text-[1.0625rem] font-semibold tracking-tight text-ink"
        >
          {NAME}
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Sections">
          {NAV.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => go(id)}
              aria-current={active === id ? 'true' : undefined}
              className={`u-focus relative px-3 py-2 font-sans text-meta transition-colors duration-fast ease-smooth ${
                active === id ? 'text-ink' : 'text-ink-muted hover:text-ink'
              }`}
            >
              {label}
              {active === id && (
                <span className="absolute inset-x-3 bottom-1 h-px bg-accent" aria-hidden="true" />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="u-focus inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-ink-muted transition-colors duration-fast ease-smooth hover:bg-sunken hover:text-ink md:hidden"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-line bg-surface shadow-xl md:hidden">
          <nav className="u-container flex flex-col py-3" aria-label="Sections">
            {NAV.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => go(id)}
                className={`u-focus rounded-md px-3 py-3 text-left font-sans text-body transition-colors duration-fast ease-smooth hover:bg-sunken ${
                  active === id ? 'text-ink' : 'text-ink-muted'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
