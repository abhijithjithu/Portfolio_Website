import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, VIEWPORT, EASE } from '../../lib/motion';

/**
 * The only scroll-reveal primitive in the app.
 *
 * Under reduced motion it renders a plain element with no `initial` at all,
 * rather than an instant animation — a whileInView element whose observer
 * never fires is stranded at opacity 0 forever, and that failure mode is
 * invisible until someone with the setting enabled loads the page.
 */
const Reveal = ({ as = 'div', delay = 0, y = 12, className = '', children, ...rest }) => {
  const reduced = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  if (reduced) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: fadeUp.show.transition.duration, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
