import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import Footer from './components/Footer';
import CursorSpotlight from './components/CursorSpotlight';
import BackToTop from './components/BackToTop';
import { ToastProvider } from './components/Toast';

// Page transition wrapper
const pageVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: 'easeIn' } },
};

const PageTransition = ({ children }) => (
  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
    {children}
  </motion.div>
);

// ── User config ──────────────────────────────────────────────
const CONTACT_EMAIL = 'jithuabhijith999@gmail.com';
const CONTACT_PHONE = '+91 7306902848';
const LINKEDIN_URL = 'https://linkedin.com/in/abhijithp99';
const GITHUB_URL = 'https://github.com/abhijithjithu';
// ─────────────────────────────────────────────────────────────

// Smooth scroll helper — works regardless of Router basename
const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export { CONTACT_EMAIL, CONTACT_PHONE, LINKEDIN_URL, GITHUB_URL };

// Scroll progress bar — fills across the top of the viewport
const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = scrollHeight - clientHeight;
      setProgress(total > 0 ? (scrollTop / total) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full h-0.5 z-[60] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-[width] duration-75"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

// Section IDs that match the anchor hrefs
const SECTION_IDS = ['pitch', 'experience', 'skills', 'gallery', 'testimonials', 'contact'];

function App() {
  const [isDark, setIsDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  // Restore saved theme on mount — default is dark
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const dark = savedTheme ? savedTheme === 'dark' : true; // default to dark
    setIsDark(dark);
    document.documentElement.classList.toggle('dark', dark);
  }, []);

  // Track scroll depth for nav glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const observers = [];
    const visibleSections = new Map();

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          visibleSections.set(id, entry.intersectionRatio);
          // Pick the section with the highest intersection ratio
          let best = '';
          let bestRatio = 0;
          visibleSections.forEach((ratio, sId) => {
            if (ratio > bestRatio) { bestRatio = ratio; best = sId; }
          });
          if (bestRatio > 0) setActiveSection(best);
        },
        { threshold: [0, 0.1, 0.25, 0.5], rootMargin: '-80px 0px -20% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle('dark', newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  const navLinks = [
    { label: 'About', id: 'pitch' },
    { label: 'Experience', id: 'experience' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'gallery' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <CursorSpotlight />
      <ToastProvider>
        <div className="font-sans antialiased min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
          <ScrollProgressBar />
          {/* Navigation */}
          <header className={`fixed top-0 w-full z-50 border-b transition-all duration-300 ${scrolled
            ? 'glass-dark border-slate-200/60 dark:border-slate-800/60 shadow-sm shadow-slate-200/20 dark:shadow-none'
            : 'bg-transparent border-transparent'
            }`}>
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-[70px] flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-3 group cursor-pointer flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg" aria-label="Home">
                <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg group-hover:bg-blue-500 transition-colors shadow-md shadow-blue-500/25">
                  AP
                </div>
                <span className="text-base font-bold tracking-tight text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-white transition-colors">
                  Abhijith P
                </span>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => scrollToSection(link.id)}
                      className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isActive
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                        }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {link.label}
                      {isActive && (
                        <span className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Right side actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleTheme}
                  className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>

                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="hidden sm:flex items-center px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition-all shadow-md shadow-blue-500/25 hover:-translate-y-0.5 hover:shadow-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Hire Me
                </a>

                {/* Mobile menu toggle */}
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={menuOpen}
                >
                  {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
              <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg">
                <nav className="flex flex-col px-6 py-4 gap-1" aria-label="Mobile navigation">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => { scrollToSection(link.id); setMenuOpen(false); }}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-all text-left focus:outline-none focus:ring-2 focus:ring-blue-500 ${activeSection === link.id
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                        }`}
                    >
                      {link.label}
                    </button>
                  ))}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="mt-2 px-4 py-3 rounded-lg text-center bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Hire Me
                  </a>
                </nav>
              </div>
            )}
          </header>

          <AnimatedRoutes />

          <Footer />
          <BackToTop />
        </div>
      </ToastProvider>
    </Router>
  );
}

// Must live inside Router to use useLocation
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/project/:id" element={<PageTransition><ProjectDetail /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
