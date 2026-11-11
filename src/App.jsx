import { lazy, Suspense, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import SiteHeader from './components/SiteHeader';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import ToastProvider from './components/Toast';
import { EASE } from './lib/motion';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// The case-study reader (blocks, tables, table of contents) is only needed
// once someone opens a project, so it stays out of the home page bundle.
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return undefined;
    }

    // A link to a home section from another route: the section does not
    // exist until the outgoing page has faded and Home has mounted.
    let tries = 0;
    let timer;
    const seek = () => {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView();
      else if (tries++ < 20) timer = setTimeout(seek, 60);
    };
    seek();
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
};

const page = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.28, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.18, ease: EASE } },
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.main id="main" variants={page} initial="initial" animate="animate" exit="exit">
              <Home />
            </motion.main>
          }
        />
        <Route
          path="/project/:id"
          element={
            <motion.main id="main" variants={page} initial="initial" animate="animate" exit="exit">
              <Suspense fallback={<div className="min-h-screen bg-ground" />}>
                <ProjectDetail />
              </Suspense>
            </motion.main>
          }
        />
        <Route
          path="*"
          element={
            <motion.main id="main" variants={page} initial="initial" animate="animate" exit="exit">
              <NotFound />
            </motion.main>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  // reducedMotion="user" makes framer drop transform and layout animation
  // app-wide when the OS asks for it, without per-component opt-in.
  <MotionConfig reducedMotion="user">
    <Router basename={import.meta.env.BASE_URL}>
      <ToastProvider>
        <ScrollToTop />
        <a
          href="#main"
          className="u-focus sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-md focus:border focus:border-line focus:bg-surface focus:px-4 focus:py-2 focus:font-sans focus:text-meta focus:text-ink focus:shadow-lg"
        >
          Skip to content
        </a>
        <SiteHeader />
        <AnimatedRoutes />
        <Footer />
        <BackToTop />
      </ToastProvider>
      {/* Both are no-ops until enabled for the project in the Vercel dashboard. */}
      <Analytics />
      <SpeedInsights />
    </Router>
  </MotionConfig>
);

export default App;
