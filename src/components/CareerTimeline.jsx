import { useState } from 'react';
import { motion } from 'framer-motion';
import { educationData, experienceData } from '../data';
import { EASE, VIEWPORT } from '../lib/motion';

/**
 * Career at a glance: every role and degree as a bar on one year axis.
 *
 * The ruled list below it carries the detail; this exists to answer the two
 * questions a recruiter scans for first — how long, and in what order —
 * without reading anything. Bars are buttons, so the detail line underneath
 * works by tap and keyboard as well as hover.
 */

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

/** "Dec 2022" → 2022.917. "Present" → today. Returns null if unparseable. */
const toYear = (text) => {
  const value = String(text).trim();
  if (/^present$/i.test(value)) {
    const now = new Date();
    return now.getFullYear() + now.getMonth() / 12;
  }
  const match = value.match(/^([a-z]{3})[a-z]*\.?\s+(\d{4})$/i);
  if (!match) return null;
  const month = MONTHS.indexOf(match[1].toLowerCase());
  return month < 0 ? null : Number(match[2]) + month / 12;
};

const parseRange = (duration) => {
  const [from, to] = String(duration).split(/\s+[-–—]\s+/);
  const start = toYear(from);
  const end = toYear(to ?? from);
  return start == null || end == null ? null : { start, end };
};

const formatLength = (years) => {
  const months = Math.max(1, Math.round(years * 12));
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts = [];
  if (y) parts.push(`${y} yr${y > 1 ? 's' : ''}`);
  if (m) parts.push(`${m} mo${m > 1 ? 's' : ''}`);
  return parts.join(' ');
};

const buildEntries = () => {
  const work = experienceData.map((role) => ({
    id: role.id,
    lane: 'work',
    label: role.short ?? role.company,
    title: role.role,
    org: role.company,
    duration: role.duration,
    current: Boolean(role.current),
  }));

  const study = educationData.map((entry) => ({
    id: entry.id,
    lane: 'study',
    label: entry.short ?? entry.institution,
    title: entry.degree,
    org: entry.institution,
    duration: entry.duration,
    current: false,
  }));

  return [...work, ...study]
    .map((entry) => ({ ...entry, range: parseRange(entry.duration) }))
    .filter((entry) => entry.range);
};

// The data is static, so this runs once per page load rather than per render.
const entries = buildEntries();

const LANES = [
  { id: 'work', label: 'Work' },
  { id: 'study', label: 'Study' },
];

const CareerTimeline = () => {
  const defaultId = (entries.find((e) => e.current) ?? entries[0])?.id;
  const [activeId, setActiveId] = useState(defaultId);

  if (!entries.length) return null;

  const first = Math.floor(Math.min(...entries.map((e) => e.range.start)));
  const last = Math.ceil(Math.max(...entries.map((e) => e.range.end)) + 0.001);
  const span = last - first;
  const pct = (year) => ((year - first) / span) * 100;
  const years = Array.from({ length: span + 1 }, (_, i) => first + i);

  const active = entries.find((e) => e.id === activeId) ?? entries[0];

  return (
    <figure className="mb-8 md:mb-10" aria-label="Career timeline">
      <div className="grid grid-cols-[3.25rem_1fr] gap-x-3 md:grid-cols-[9.5rem_1fr] md:gap-x-10">
        {LANES.map((lane) => {
          const laneEntries = entries.filter((e) => e.lane === lane.id);
          if (!laneEntries.length) return null;

          return (
            <div key={lane.id} className="contents">
              <p className="pt-7 font-sans text-eyebrow uppercase text-ink-faint">{lane.label}</p>

              <ul className="relative h-[4.25rem]">
                {/* Year gridlines sit behind the bars. */}
                {years.map((year) => (
                  <li
                    key={year}
                    aria-hidden="true"
                    className="absolute inset-y-0 w-px bg-line"
                    style={{ left: `${pct(year)}%` }}
                  />
                ))}

                {laneEntries.map((entry, i) => {
                  const left = pct(entry.range.start);
                  const width = Math.max(pct(entry.range.end) - left, 1.2);
                  const isActive = entry.id === active.id;
                  // Bars near the right edge label from their end so the text stays inside the chart.
                  const alignEnd = left > 72;

                  return (
                    <li
                      key={entry.id}
                      className="absolute top-0 h-full"
                      style={{ left: `${left}%`, width: `${width}%` }}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveId(entry.id)}
                        onMouseEnter={() => setActiveId(entry.id)}
                        onFocus={() => setActiveId(entry.id)}
                        aria-pressed={isActive}
                        aria-label={`${entry.title}, ${entry.org}, ${entry.duration}`}
                        className="u-focus group relative block h-full w-full rounded-sm"
                      >
                        <span
                          className={`absolute top-2 whitespace-nowrap font-sans text-meta transition-colors duration-fast ease-smooth ${
                            alignEnd ? 'right-0' : 'left-0'
                          } ${isActive ? 'text-ink' : 'text-ink-muted group-hover:text-ink'}`}
                        >
                          {entry.label}
                        </span>

                        <motion.span
                          aria-hidden="true"
                          className={`absolute inset-x-0 top-8 block h-3 origin-left rounded-sm transition-colors duration-fast ease-smooth ${
                            entry.lane === 'work'
                              ? isActive
                                ? 'bg-accent'
                                : 'bg-accent/45 group-hover:bg-accent/70'
                              : isActive
                                ? 'bg-ink-muted'
                                : 'bg-ink-faint/50 group-hover:bg-ink-faint'
                          }`}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={VIEWPORT}
                          transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.08 }}
                        />

                        {entry.current && (
                          <span
                            aria-hidden="true"
                            className="absolute -right-1 top-[1.875rem] h-4 w-1 rounded-sm bg-accent"
                          />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}

        {/* Year axis */}
        <span aria-hidden="true" />
        <div aria-hidden="true" className="relative h-6 border-t border-line-strong">
          {years.map((year, i) => (
            <span
              key={year}
              className={`absolute top-2 font-mono text-[0.6875rem] tabular-nums text-ink-faint ${
                i === 0 ? '' : i === years.length - 1 ? '-translate-x-full' : '-translate-x-1/2'
              }`}
              style={{ left: `${pct(year)}%` }}
            >
              {/* Every other year on narrow screens keeps the labels from colliding. */}
              <span className={i % 2 && i !== years.length - 1 ? 'hidden sm:inline' : ''}>{year}</span>
            </span>
          ))}
        </div>
      </div>

      <figcaption
        aria-live="polite"
        className="mt-6 grid grid-cols-[3.25rem_1fr] gap-x-3 md:grid-cols-[9.5rem_1fr] md:gap-x-10"
      >
        <span aria-hidden="true" />
        <p className="font-sans text-small text-ink-muted">
          <span className="font-semibold text-ink">{active.title}</span>
          {' · '}
          {active.org}
          <span className="text-ink-faint">
            {' · '}
            <span className="tabular-nums">{active.duration}</span>
            {' · '}
            {formatLength(active.range.end - active.range.start)}
          </span>
        </p>
      </figcaption>
    </figure>
  );
};

export default CareerTimeline;
