/**
 * Shared motion vocabulary.
 *
 * Three rules hold everywhere in this app:
 *   1. Nothing loops. There is no `repeat: Infinity` in the codebase.
 *   2. Every scroll reveal fires once and never replays.
 *   3. Reveals travel at most 12px and last at most 450ms — enough to
 *      register as arrival, not enough to make the page feel busy.
 */

export const EASE = [0.2, 0.8, 0.2, 1];

export const DUR = {
  fast: 0.18,
  base: 0.38,
  slow: 0.7,
};

/** Shared by every `whileInView` in the app. */
export const VIEWPORT = { once: true, margin: '-10% 0px -8% 0px' };

export const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: EASE } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.32, ease: EASE } },
};

/** Parent variant — children opt in by using `fadeUp`/`fadeIn` as their own variants. */
export const stagger = (staggerChildren = 0.06, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/**
 * The hero's signature moment: each word rises into view from behind its
 * own baseline, like type being set. Split per word, never per letter —
 * per-letter splitting is both a template tell and hostile to screen readers.
 */
export const wordWipe = {
  hidden: { clipPath: 'inset(0 0 108% 0)', y: '0.16em' },
  show: {
    clipPath: 'inset(0 0 -8% 0)',
    y: '0em',
    transition: { duration: 0.62, ease: EASE },
  },
};

/** Draws the hairline rule under the hero masthead. */
export const ruleDraw = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.9, ease: EASE, delay: 0.25 } },
};
