import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import Footer from './components/Footer';

// Scroll to top on route change component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const [isDark, setIsDark] = useState(true); // Default to dark mode to match previous design

  useEffect(() => {
    // Check system preference or local storage on mount
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <div className="font-sans antialiased min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
        {/* Navigation (Simple sticky header) */}
        <header className="fixed top-0 w-full z-50 glass-dark border-b border-slate-200/50 dark:border-slate-800/50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 group cursor-pointer">
              <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold group-hover:bg-blue-500 transition-colors shadow-sm">
                J
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-white transition-colors">
                Portfolio
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-8">
              <a href="/#pitch" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors">Strategy</a>
              <a href="/#simulator" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors">Simulation</a>
              <a href="/#gallery" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors">Gallery</a>
            </nav>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <a href="mailto:hello@example.com" className="px-5 py-2.5 rounded-full bg-blue-600/10 dark:bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-sm font-bold hover:bg-blue-600 hover:text-white transition-all shadow-lg hover:shadow-blue-500/25">
                Hire Me
              </a>
            </div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
