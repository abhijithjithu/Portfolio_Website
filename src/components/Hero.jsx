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
import { picture } from '../lib/images';
import Button from './ui/Button';
import { trackResumeDownload } from '../lib/track';

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

/**
 * One image, two framings. On a phone it is a small head-and-shoulders plate
 * beside the name, so the first screen shows a face rather than a wall of
 * text; from lg up it is the full portrait in its own column.
 */
const portrait = picture(PROFILE_PHOTO, '(min-width: 1024px) 420px, 200px');

const Portrait = ({ className = '' }) => (
  <div className={`relative ${className}`}>
    {/* Registration mark — the only decorative accent above the fold. */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 translate-x-[5px] translate-y-[5px] rounded-md border border-accent/35 lg:translate-x-[10px] lg:translate-y-[10px]"
    />
    <div className="relative overflow-hidden rounded-md border border-line bg-sunken p-1 shadow-md lg:p-2 lg:shadow-lg">
      <div className="aspect-[4/5] overflow-hidden rounded-sm lg:aspect-[2/3]">
        <img
          src={portrait.src}
          srcSet={portrait.srcSet}
          sizes={portrait.sizes}
          width={portrait.width}
          height={portrait.height}
          alt={`${NAME}, portrait`}
          fetchPriority="high"
          decoding="async"
          className="block h-full w-full origin-[50%_24%] scale-[2.1] object-cover object-top transition-transform duration-slow ease-smooth lg:scale-100 lg:hover:scale-[1.015]"
        />
      </div>
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
    <section id="intro" className="bg-ground pb-14 pt-header md:pb-24">
      <div className="u-container">
        <div className="grid grid-cols-[6rem_1fr] items-center gap-x-5 pt-10 md:pt-24 lg:grid-cols-12 lg:gap-x-16">
          <div className="col-start-2 row-start-1 lg:col-span-7 lg:col-start-1 lg:self-end">
            <motion.p
              {...fade(0)}
              className="mb-3 flex items-center gap-2.5 font-sans text-eyebrow uppercase text-ink-faint lg:mb-6"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              Open to opportunities
            </motion.p>

            <Masthead reduced={reduced} />
          </div>

          <Portrait className="col-start-1 row-start-1 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:self-center" />

          <div className="col-span-2 lg:col-span-7 lg:col-start-1 lg:row-start-2 lg:self-start">
            <motion.p
              {...fade(1)}
              className="mt-6 font-sans text-lede text-ink-muted lg:mt-5"
            >
              Assistant Manager at Tata Consulting Engineers. MBA, IIM Udaipur.
            </motion.p>

            <motion.p
              {...fade(2)}
              className="mt-5 max-w-[54ch] font-sans text-body text-ink-body lg:mt-6"
            >
              I build the ontology and knowledge graph layer behind industrial digital
              twins, on Cognite Data Fusion and NVIDIA Omniverse.{' '}
              {/* The career recap is in the Background section; a phone's first
                  screen is better spent on the line below it. */}
              <span className="hidden sm:inline">
                Before that, three years across Prodapt and TCS shipping automation, cloud
                and GenAI systems.{' '}
              </span>
              I work on the join between what a business needs and what an engineering
              team can actually ship.
            </motion.p>

            <motion.div {...fade(3)} className="mt-8 flex flex-wrap items-center gap-3 lg:mt-9">
              <Button as="a" href="#work" size="lg">
                Selected work
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button
                as="a"
                href={asset(RESUME)}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackResumeDownload('hero')}
                variant="quiet"
                size="lg"
              >
                Résumé
              </Button>
            </motion.div>

            <motion.div {...fade(4)} className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 lg:mt-8">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="u-focus -m-2 p-2 text-ink-muted transition-colors duration-fast ease-smooth hover:text-ink"
              >
                <Linkedin className="h-[1.15rem] w-[1.15rem]" />
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="u-focus -m-2 p-2 text-ink-muted transition-colors duration-fast ease-smooth hover:text-ink"
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
        </div>

        {/* The rule draws itself across the page, ending in the accent square. */}
        <div className="mt-14 flex items-center gap-0 md:mt-24">
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
