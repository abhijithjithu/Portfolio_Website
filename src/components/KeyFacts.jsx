import { factsData } from '../data';
import Reveal from './ui/Reveal';

/**
 * Static numbers. These used to count up from zero on scroll via
 * requestAnimationFrame writing straight to textContent — motion that drew
 * attention to the figures rather than letting them be read.
 */
const KeyFacts = () => (
  <section className="border-y border-line bg-sunken">
    <div className="u-container">
      <dl className="grid grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
        {factsData.map((fact, i) => (
          <Reveal
            key={fact.id}
            delay={i * 0.05}
            className="px-0 py-10 md:px-8 md:py-12 md:first:pl-0 md:last:pr-0"
          >
            <dt className="font-display text-h2 tabular-nums text-ink">{fact.value}</dt>
            <dd className="mt-2">
              <span className="block font-sans text-meta text-ink">{fact.label}</span>
              {fact.note && (
                <span className="mt-1 block font-sans text-[0.75rem] leading-snug text-ink-muted">
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
