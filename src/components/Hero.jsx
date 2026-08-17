import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Github, Linkedin } from 'lucide-react';
import {
  CONTACT_EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  NAME,
  PROFILE_PHOTO,
  RESUME,
  asset,
} from '../config/site';
import { EASE, ruleDraw, wordWipe } from '../lib/motion';
import Button from './ui/Button';

const WORDS = NAME.split(' ');

/** Everything below the masthead shares one quiet fade. */
const settle = {
  hidden: { opacity: 0, y: 8 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE, delay: 0.35 + i * 0.06 },
  }),
};

const Masthead = ({ reduced }) => {
  if (reduced) {
    return <h1 className="font-display text-display text-ink">{NAME}</h1>;
  }

  return (
    <h1 className="font-display text-display text-ink">
      {/* The visible words are decorative; the accessible name is the sr-only copy. */}
      <span className="sr-only">{NAME}</span>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.07 }}
        className="inline-block"
      >
        {WORDS.map((word, i) => (
          <motion.span key={word + i} variants={wordWipe} className="inline-block">
            {word}
            {i < WORDS.length - 1 && ' '}
          </motion.span>
        ))}
      </motion.span>
    </h1>
  );
};

const Portrait = () => (
  <div className="relative mx-auto w-full max-w-[19rem] lg:max-w-none">
    {/* Registration mark — the only decorative accent above the fold. */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 translate-x-[10px] translate-y-[10px] rounded-md border border-accent/35"
    />
    <div className="relative overflow-hidden rounded-md border border-line bg-sunken p-2 shadow-lg">
      <img
        src={asset(PROFILE_PHOTO)}
        alt={`${NAME}, portrait`}
        width="640"
        height="800"
        className="block w-full rounded-sm object-cover transition-transform duration-slow ease-smooth hover:scale-[1.015]"
      />
    </div>
  </div>
);

const Hero = () => {
  const reduced = useReducedMotion();

  const fade = (i) =>
    reduced
      ? {}
      : { variants: settle, custom: i, initial: 'hidden', animate: 'show' };

  return (
    <section id="intro" className="bg-ground pb-16 pt-header md:pb-24">
      <div className="u-container">
        <div className="grid items-center gap-12 pt-16 md:pt-24 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <motion.p
              {...fade(0)}
              className="mb-6 flex items-center gap-2.5 font-sans text-eyebrow uppercase text-ink-faint"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              Open to opportunities
            </motion.p>

            <Masthead reduced={reduced} />

            <motion.p
              {...fade(1)}
              className="mt-5 font-sans text-lede text-ink-muted"
            >
              Assistant Manager at Tata Consulting Engineers. MBA, IIM Udaipur.
            </motion.p>

            <motion.p
              {...fade(2)}
              className="mt-6 max-w-[54ch] font-sans text-body text-ink-body"
            >
              I build the ontology and knowledge graph layer behind industrial digital
              twins, on Cognite Data Fusion and NVIDIA Omniverse. Before that, three years
              across Prodapt and TCS shipping automation, cloud and GenAI systems. I work
              on the join between what a business needs and what an engineering team can
              actually ship.
            </motion.p>

            <motion.div {...fade(3)} className="mt-9 flex flex-wrap items-center gap-3">
              <Button as="a" href="#work" size="lg">
                Selected work
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button as="a" href={asset(RESUME)} target="_blank" rel="noreferrer" variant="quiet" size="lg">
                Résumé
              </Button>
            </motion.div>

            <motion.div {...fade(4)} className="mt-8 flex items-center gap-4">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="u-focus text-ink-muted transition-colors duration-fast ease-smooth hover:text-ink"
              >
                <Linkedin className="h-[1.15rem] w-[1.15rem]" />
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="u-focus text-ink-muted transition-colors duration-fast ease-smooth hover:text-ink"
              >
                <Github className="h-[1.15rem] w-[1.15rem]" />
              </a>
              <span className="h-4 w-px bg-line" aria-hidden="true" />
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="u-focus font-sans text-meta text-ink-muted transition-colors duration-fast ease-smooth hover:text-ink"
              >
                {CONTACT_EMAIL}
              </a>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <Portrait />
          </div>
        </div>

        {/* The rule draws itself across the page, ending in the accent square. */}
        <div className="mt-16 flex items-center gap-0 md:mt-24">
          <motion.span
            aria-hidden="true"
            className="h-px flex-1 origin-left bg-line-strong"
            {...(reduced
              ? {}
              : { variants: ruleDraw, initial: 'hidden', animate: 'show' })}
          />
          <motion.span
            aria-hidden="true"
            className="h-1.5 w-1.5 bg-accent"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.3, ease: EASE }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
