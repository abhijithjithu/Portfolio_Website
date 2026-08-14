import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import SiteHeader from './components/SiteHeader';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import { ToastProvider } from './components/Toast';
import { EASE } from './lib/motion';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
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
            <motion.main variants={page} initial="initial" animate="animate" exit="exit">
              <Home />
            </motion.main>
          }
        />
        <Route
          path="/project/:id"
          element={
            <motion.main variants={page} initial="initial" animate="animate" exit="exit">
              <ProjectDetail />
            </motion.main>
          }
        />
        {/* Unknown paths fall back to Home rather than a blank screen. */}
        <Route
          path="*"
          element={
            <motion.main variants={page} initial="initial" animate="animate" exit="exit">
              <Home />
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
        <SiteHeader />
        <AnimatedRoutes />
        <Footer />
        <BackToTop />
      </ToastProvider>
    </Router>
  </MotionConfig>
);

export default App;
