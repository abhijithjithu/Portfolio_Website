import { skillsData } from '../data';
import Section from './ui/Section';
import SectionHeader from './ui/SectionHeader';
import Reveal from './ui/Reveal';

/**
 * Three columns of ruled lists. No cards, no bars, no percentages.
 * On a phone the rows become wrapped chips: one item per line made this
 * section three screens tall for what is, in the end, a list of nouns.
 *
 * The previous version scored every skill out of 100 — always a multiple of
 * five, always 75 to 95, always descending — which claims a precision nobody
 * has about their own ability.
 */
const Capabilities = () => (
  <Section id="capabilities" tone="sunken">
    <SectionHeader
      eyebrow="Capabilities"
      title="What I work with"
      lede="Split by how often I actually reach for something, rather than scored out of a hundred."
    />

    <div className="grid gap-x-12 gap-y-10 md:grid-cols-2 md:gap-y-12 lg:grid-cols-3 lg:divide-x lg:divide-line">
      {skillsData.map((domain, i) => (
        <Reveal key={domain.id} delay={i * 0.05} className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
          <h3 className="font-display text-h3 text-ink">{domain.domain}</h3>

          <div className="mt-5 space-y-6 md:mt-6 md:space-y-7">
            {domain.groups.map((group) => (
              <div key={group.label}>
                <p className="font-sans text-eyebrow uppercase text-ink-faint">{group.label}</p>
                <ul className="mt-3 flex flex-wrap gap-2 md:block">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-sm border border-line bg-surface px-3 py-1.5 font-sans text-small text-ink-body md:rounded-none md:border-0 md:border-t md:bg-transparent md:px-0 md:py-2.5 md:text-body md:first:border-t-0 md:first:pt-0"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  </Section>
);

export default Capabilities;
