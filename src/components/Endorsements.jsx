import { testimonialsData } from '../data';
import Section from './ui/Section';
import Reveal from './ui/Reveal';

/**
 * Both quotes shown at once as a spread.
 *
 * This was a carousel — with arrows, dot indicators and slide transitions —
 * for a grand total of two entries, which advertised how few there were.
 * No section header either; the quotes carry themselves.
 */
const Endorsements = () => (
  <Section tone="ground">
    <div className="grid gap-x-14 gap-y-12 md:grid-cols-2">
      {testimonialsData.map((item, i) => (
        <Reveal key={item.id} delay={i * 0.06} as="figure">
          <blockquote className="font-display text-h3 italic leading-snug text-ink">
            “{item.content}”
          </blockquote>

          <figcaption className="mt-6">
            <span className="block h-px w-8 bg-accent" aria-hidden="true" />
            <span className="mt-4 block font-sans text-meta font-semibold text-ink">
              {item.author}
            </span>
            <span className="mt-0.5 block font-sans text-meta text-ink-muted">
              {item.title} · {item.org}
            </span>
          </figcaption>
        </Reveal>
      ))}
    </div>
  </Section>
);

export default Endorsements;
