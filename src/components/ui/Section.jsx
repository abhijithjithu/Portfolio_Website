const TONES = {
  ground: 'bg-ground',
  surface: 'bg-surface',
  sunken: 'bg-sunken',
};

/**
 * Owns section background and vertical rhythm — and is the only thing that does.
 *
 * Previously both the Home wrapper and each child component set their own
 * background, and in two places they disagreed, which is why the old wave
 * dividers never matched the sections they sat between.
 */
const Section = ({
  id,
  tone = 'ground',
  flush = false,
  className = '',
  children,
}) => (
  <section
    id={id}
    className={`${TONES[tone] ?? TONES.ground} ${flush ? '' : 'py-section'} ${className}`}
  >
    <div className="u-container">{children}</div>
  </section>
);

export default Section;
