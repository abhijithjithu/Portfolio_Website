import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { pitchData } from '../data';
import { EASE } from '../lib/motion';
import Section from './ui/Section';
import SectionHeader from './ui/SectionHeader';
import Tag from './ui/Tag';

/**
 * Tabs are an underlined text row rather than sliding pills with a shared
 * layoutId. The panel crossfades on opacity only — no travel, so switching
 * tabs reads as a change of content, not a change of place.
 */
const Positioning = () => {
  const [activeId, setActiveId] = useState(pitchData[0].id);
  const active = pitchData.find((p) => p.id === activeId) ?? pitchData[0];
  const Icon = active.icon;

  return (
    <Section id="positioning" tone="ground">
      <SectionHeader
        eyebrow="Positioning"
        title="Three ways to read the same background"
        lede="The same background, framed for the role you are actually hiring for."
      />

      <div
        role="tablist"
        aria-label="Positioning"
        className="flex flex-wrap gap-x-7 gap-y-2 border-b border-line"
      >
        {pitchData.map((pitch) => {
          const isActive = pitch.id === activeId;
          return (
            <button
              key={pitch.id}
              role="tab"
              type="button"
              id={`tab-${pitch.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${pitch.id}`}
              onClick={() => setActiveId(pitch.id)}
              className={`u-focus -mb-px border-b-2 pb-3 pt-1 text-left font-sans text-meta transition-colors duration-fast ease-smooth ${
                isActive
                  ? 'border-accent text-ink'
                  : 'border-transparent text-ink-muted hover:text-ink'
              }`}
            >
              {pitch.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          role="tabpanel"
          id={`panel-${active.id}`}
          aria-labelledby={`tab-${active.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: EASE }}
          className="mt-10 u-card p-7 md:p-10"
        >
          <div className="flex items-start gap-4">
            {Icon && (
              <Icon className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
            )}
            <h3 className="font-display text-h3 text-ink">{active.title}</h3>
          </div>

          <p className="mt-5 max-w-[68ch] font-sans text-body text-ink-body">
            {active.description}
          </p>

          <ul className="mt-7 flex flex-wrap gap-2">
            {active.highlights.map((highlight) => (
              <li key={highlight}>
                <Tag>{highlight}</Tag>
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
};

export default Positioning;
