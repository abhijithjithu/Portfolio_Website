import { educationData, experienceData } from '../data';
import Section from './ui/Section';
import SectionHeader from './ui/SectionHeader';
import Reveal from './ui/Reveal';
import Tag from './ui/Tag';

/**
 * Experience and education in one ruled list on a shared date rail.
 *
 * They were two separate sections before, which meant the IIM MBA appeared
 * twice on the page. There is no per-entry colour rotation here: the old
 * version cycled a blue/emerald/violet accent kit by index, which is exactly
 * the decorative variety that makes generated layouts recognisable.
 */

const Entry = ({ period, title, subtitle, description, chips, meta, current, delay }) => (
  <Reveal delay={delay} as="li" className="border-t border-line py-9 first:border-t-0 md:py-11">
    <div className="grid gap-3 md:grid-cols-[9.5rem_1fr] md:gap-10">
      <p className="flex items-center gap-2 font-sans text-meta tabular-nums text-ink-faint md:pt-1">
        {current && (
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
        )}
        {period}
      </p>

      <div>
        <h3 className="font-display text-h3 text-ink">{title}</h3>

        <p className="mt-1.5 font-sans text-meta text-ink-muted">
          {subtitle}
          {meta && <span className="text-ink-faint"> · {meta}</span>}
        </p>

        {description && (
          <p className="mt-4 max-w-[68ch] font-sans text-body text-ink-body">{description}</p>
        )}

        {chips?.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <li key={chip}>
                <Tag>{chip}</Tag>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </Reveal>
);

const Background = () => (
  <Section id="background" tone="surface">
    <SectionHeader
      eyebrow="Background"
      title="Where I have worked and studied"
      lede="Three years in enterprise technology, an MBA to formalise the strategy side of it, and now industrial digital twins."
    />

    <ul>
      {experienceData.map((role, i) => (
        <Entry
          key={role.id}
          delay={i * 0.04}
          period={role.duration}
          title={role.role}
          subtitle={role.company}
          description={role.description}
          chips={role.technologies}
          current={role.current}
        />
      ))}
    </ul>

    <h3 className="mb-2 mt-16 font-sans text-eyebrow uppercase text-ink-faint">Education</h3>

    <ul>
      {educationData.map((entry) => (
        <Entry
          key={entry.id}
          period={entry.duration}
          title={entry.degree}
          subtitle={entry.institution}
          meta={entry.result}
          description={entry.highlights.join('. ') + '.'}
          chips={entry.tags}
        />
      ))}
    </ul>
  </Section>
);

export default Background;
