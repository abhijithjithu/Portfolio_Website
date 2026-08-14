import SEO from '../components/SEO';
import Hero from '../components/Hero';
import KeyFacts from '../components/KeyFacts';
import Positioning from '../components/Positioning';
import Background from '../components/Background';
import WorkIndex from '../components/WorkIndex';
import Capabilities from '../components/Capabilities';
import Endorsements from '../components/Endorsements';
import Contact from '../components/Contact';

/**
 * Composition only. Each section owns its own background and padding through
 * the shared Section component, so a section's tone can no longer disagree
 * with the wrapper around it — which is what made the old wave dividers
 * meet mismatched colours on either side.
 */
const Home = () => (
  <>
    <SEO
      title="Abhijith P | Product, Data & Digital Strategy"
      description="Portfolio of Abhijith P — MBA (IIM Udaipur), digital transformation strategist and MLOps engineer. Case studies in customer analytics, survival modelling, GenAI systems and product strategy."
    />

    <Hero />
    <KeyFacts />
    <Positioning />
    <Background />
    <WorkIndex />
    <Capabilities />
    <Endorsements />
    <Contact />
  </>
);

export default Home;
