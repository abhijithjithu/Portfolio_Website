import { factsData } from '../data';
import Reveal from './ui/Reveal';

/**
 * Static numbers. These used to count up from zero on scroll via
 * requestAnimationFrame writing straight to textContent — motion that drew
 * attention to the figures rather than letting them be read.
 *
 * They are the strongest proof on the page, so they are set large with a
 * short accent rule above each, rather than animated.
 */
const KeyFacts = () => (
  <section className="border-y border-line bg-sunken">
    <div className="u-container">
      <dl className="grid grid-cols-2 gap-x-6 divide-line md:grid-cols-4 md:gap-x-0 md:divide-x">
        {factsData.map((fact, i) => (
          <Reveal
            key={fact.id}
            delay={i * 0.05}
            className="px-0 py-8 md:px-8 md:py-14 md:first:pl-0 md:last:pr-0"
          >
            <span className="mb-5 block h-px w-8 bg-accent" aria-hidden="true" />
            <dt className="whitespace-nowrap font-display text-[clamp(2.125rem,1.3rem+3.2vw,3.5rem)] font-semibold leading-none tracking-[-0.02em] tabular-nums text-ink">
              {fact.value}
            </dt>
            <dd className="mt-3">
              <span className="block font-sans text-small font-semibold text-ink">{fact.label}</span>
              {fact.note && (
                <span className="mt-1 block font-sans text-meta font-normal leading-snug text-ink-muted">
                  {fact.note}
                </span>
              )}
            </dd>
          </Reveal>
        ))}
      </dl>
    </div>
  </section>
);

export default KeyFacts;
