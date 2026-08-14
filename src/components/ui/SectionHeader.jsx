import Reveal from './Reveal';

/**
 * Replaces seven verbatim copies of the same eyebrow / heading / subtitle block.
 *
 * The eyebrow carries no sequence number and no trailing hairline. Numbered
 * section labels are a template signature, and this site's numbering was
 * visibly broken anyway — it ran 01, 02, 03, 05, 06, 07.
 */
const SectionHeader = ({ eyebrow, title, lede, aside, className = '' }) => (
  <div className={`mb-12 md:mb-16 ${className}`}>
    <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
      <Reveal className="max-w-[34ch]">
        {eyebrow && (
          <p className="mb-4 font-sans text-eyebrow uppercase text-ink-faint">{eyebrow}</p>
        )}
        <h2 className="font-display text-h2 text-ink">{title}</h2>
      </Reveal>

      {aside && (
        <Reveal delay={0.06} className="font-sans text-meta text-ink-muted">
          {aside}
        </Reveal>
      )}
    </div>

    {lede && (
      <Reveal delay={0.08} as="p" className="mt-5 max-w-[52ch] font-sans text-lede text-ink-muted">
        {lede}
      </Reveal>
    )}
  </div>
);

export default SectionHeader;
