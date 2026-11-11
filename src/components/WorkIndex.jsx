import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projectData } from '../data';
import { picture } from '../lib/images';
import Section from './ui/Section';
import SectionHeader from './ui/SectionHeader';
import Reveal from './ui/Reveal';
import Tag from './ui/Tag';
import ProjectLinks from './ui/ProjectLinks';
import { readingMinutes } from '../lib/content';

const ALL = 'All';

/** Rows shown on a phone before the "Show all" button. */
const PHONE_ROWS = 3;

/**
 * A ruled list rather than a grid of cards.
 *
 * Filters come from authored `categories` on each project. The old gallery
 * inferred them by substring-matching joined tag strings, which could produce
 * a category the filter bar never listed, and silently hid any project whose
 * tags matched no keyword from every tab except "All".
 */
const WorkIndex = () => {
  const categories = useMemo(
    () => [ALL, ...new Set(projectData.flatMap((p) => p.categories ?? []))],
    []
  );
  const [filter, setFilter] = useState(ALL);
  const [showAll, setShowAll] = useState(false);

  const visible = useMemo(
    () =>
      filter === ALL
        ? projectData
        : projectData.filter((p) => p.categories?.includes(filter)),
    [filter]
  );

  const featured = filter === ALL ? visible.find((p) => p.featured) : undefined;
  const rows = featured ? visible.filter((p) => p !== featured) : visible;

  // Only the unfiltered list is long enough to be worth folding, and only on
  // a phone: from md up every row is always rendered visibly.
  const foldable = filter === ALL && rows.length > PHONE_ROWS;
  const folded = foldable && !showAll;

  return (
    <Section id="work" tone="ground">
      <SectionHeader
        eyebrow="Selected work"
        title="Case studies and projects"
        aside={`${projectData.length} projects`}
      />

      {categories.length > 2 && (
        <div className="mb-8 flex flex-wrap gap-x-6 gap-y-2 border-b border-line md:mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className={`u-focus -mb-px border-b-2 pb-3 pt-2 font-sans text-meta transition-colors duration-fast ease-smooth ${
                filter === cat
                  ? 'border-accent text-ink'
                  : 'border-transparent text-ink-muted hover:text-ink'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {featured && <FeaturedEntry project={featured} />}

      <ul>
        {rows.map((project, i) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={(featured ? 1 : 0) + i + 1}
            delay={i * 0.03}
            className={folded && i >= PHONE_ROWS ? 'hidden md:block' : ''}
          />
        ))}
      </ul>

      {foldable && (
        <div className="border-t border-line pt-6 md:hidden">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            className="u-focus w-full rounded-md border border-line bg-surface px-5 py-3 font-sans text-small font-semibold text-ink shadow-xs transition-colors duration-fast ease-smooth hover:border-line-strong hover:bg-sunken"
          >
            {showAll ? 'Show fewer' : `Show all ${projectData.length} projects`}
          </button>
        </div>
      )}

      {visible.length === 0 && (
        <p className="py-12 font-sans text-body text-ink-muted">
          Nothing in this category yet.
        </p>
      )}
    </Section>
  );
};

/** A project's own cover, or failing that the first figure of its case study. */
const coverOf = (project) =>
  project.cover ?? project.content?.find((block) => block.type === 'image')?.src;

const FeaturedEntry = ({ project }) => {
  const cover = project.cover && picture(project.cover, '(min-width: 1024px) 640px, 100vw');

  return (
  <Reveal className="mb-4 grid gap-8 border-t border-line py-10 lg:grid-cols-12 lg:gap-12">
    {cover && (
      <div className="lg:col-span-7">
        <Link
          to={`/project/${project.id}`}
          tabIndex={-1}
          aria-hidden="true"
          className="block overflow-hidden rounded-md border border-line bg-sunken p-2 shadow-sm transition-colors duration-fast ease-smooth hover:border-line-strong sm:p-3"
        >
          <img
            src={cover.src}
            srcSet={cover.srcSet}
            sizes={cover.sizes}
            width={cover.width}
            height={cover.height}
            alt=""
            loading="lazy"
            decoding="async"
            className="block h-auto w-full rounded-sm object-cover"
          />
        </Link>
      </div>
    )}

    <div className={project.cover ? 'lg:col-span-5' : 'lg:col-span-12'}>
      <p className="font-sans text-eyebrow uppercase text-ink-faint">
        {[project.kind, project.year, `${readingMinutes(project.content)} min read`]
          .filter(Boolean)
          .join(' · ')}
      </p>

      <h3 className="mt-4 font-display text-h2 text-ink">
        <Link
          to={`/project/${project.id}`}
          className="u-focus transition-colors duration-fast ease-smooth hover:text-accent"
        >
          {project.title}
        </Link>
      </h3>

      <p className="mt-2 font-sans text-meta text-ink-muted">
        {project.company} · {project.role}
      </p>

      <p className="mt-5 max-w-[54ch] font-sans text-body text-ink-body">
        {project.description}
      </p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.tags.slice(0, 4).map((tag) => (
          <li key={tag}>
            <Tag>{tag}</Tag>
          </li>
        ))}
      </ul>

      <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
        <Link
          to={`/project/${project.id}`}
          className="u-focus group inline-flex items-center gap-2 font-sans text-meta font-semibold text-accent"
        >
          Read the case study
          <ArrowRight
            className="h-4 w-4 transition-transform duration-fast ease-smooth group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
        <ProjectLinks links={project.links} />
      </div>
    </div>
  </Reveal>
  );
};

const ProjectRow = ({ project, index, delay, className = '' }) => {
  const linked = project.hasCaseStudy;
  const coverSrc = coverOf(project);
  const thumb = coverSrc && picture(coverSrc, '176px');

  const body = (
    <div className="grid gap-x-8 gap-y-3 md:grid-cols-[3rem_1fr_11rem]">
      <span className="font-mono text-meta tabular-nums text-ink-faint md:pt-1.5">
        {String(index).padStart(2, '0')}
      </span>

      <div>
        <h3
          className={`font-display text-h3 text-ink transition-colors duration-fast ease-smooth ${
            linked ? 'group-hover:text-accent' : ''
          }`}
        >
          {project.title}
        </h3>

        <p className="mt-1.5 font-sans text-meta text-ink-muted">
          {project.company} · {project.role}
        </p>

        {/* The full text is one tap away on the case study, so a phone gets
            three lines of it; unlinked rows have nowhere else to say it. */}
        <p
          className={`mt-3 max-w-[62ch] font-sans text-body text-ink-body ${
            linked ? 'line-clamp-3 md:line-clamp-none' : ''
          }`}
        >
          {project.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
      </div>

      <div className="md:pt-1.5">
        <div className="flex items-start gap-3 md:justify-end">
        <span className="font-sans text-meta text-ink-faint">
          {[
            project.kind,
            project.year,
            linked ? `${readingMinutes(project.content)} min` : null,
          ]
            .filter(Boolean)
            .join(' · ')}
        </span>
        {linked && (
          <ArrowRight
            className="h-4 w-4 shrink-0 text-ink-faint transition-transform duration-fast ease-smooth group-hover:translate-x-1 group-hover:text-accent"
            aria-hidden="true"
          />
        )}
        </div>

        {/* Thumbnails only from md up: on a phone they would add a screen of
            height per project to an already long list. */}
        {thumb && (
          <div className="mt-4 hidden overflow-hidden rounded-md border border-line bg-sunken p-1.5 md:block">
            <img
              src={thumb.src}
              srcSet={thumb.srcSet}
              sizes={thumb.sizes}
              width={thumb.width}
              height={thumb.height}
              alt=""
              loading="lazy"
              decoding="async"
              className="block aspect-[16/10] w-full rounded-sm object-cover object-left-top"
            />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Reveal as="li" delay={delay} className={`border-t border-line ${className}`}>
      {linked ? (
        <Link
          to={`/project/${project.id}`}
          className="u-focus group -mx-4 block rounded-md px-4 py-8 transition-colors duration-fast ease-smooth hover:bg-surface md:py-10"
        >
          {body}
        </Link>
      ) : (
        // No case study written, so this is a listing rather than a link.
        <div className="-mx-4 px-4 py-8 md:py-10">{body}</div>
      )}
    </Reveal>
  );
};

export default WorkIndex;
