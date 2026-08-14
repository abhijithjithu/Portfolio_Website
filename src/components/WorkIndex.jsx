import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projectData } from '../data';
import { asset } from '../config/site';
import Section from './ui/Section';
import SectionHeader from './ui/SectionHeader';
import Reveal from './ui/Reveal';
import Tag from './ui/Tag';

const ALL = 'All';

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

  const visible = useMemo(
    () =>
      filter === ALL
        ? projectData
        : projectData.filter((p) => p.categories?.includes(filter)),
    [filter]
  );

  const featured = filter === ALL ? visible.find((p) => p.featured) : undefined;
  const rows = featured ? visible.filter((p) => p !== featured) : visible;

  return (
    <Section id="work" tone="ground">
      <SectionHeader
        eyebrow="Selected work"
        title="Case studies and projects"
        aside={`${projectData.length} projects`}
      />

      {categories.length > 2 && (
        <div className="mb-12 flex flex-wrap gap-x-6 gap-y-2 border-b border-line">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className={`u-focus -mb-px border-b-2 pb-3 font-sans text-meta transition-colors duration-fast ease-smooth ${
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
          />
        ))}
      </ul>

      {visible.length === 0 && (
        <p className="py-12 font-sans text-body text-ink-muted">
          Nothing in this category yet.
        </p>
      )}
    </Section>
  );
};

const FeaturedEntry = ({ project }) => (
  <Reveal className="mb-4 grid gap-8 border-t border-line py-10 lg:grid-cols-12 lg:gap-12">
    {project.cover && (
      <div className="lg:col-span-7">
        <div className="overflow-hidden rounded-md border border-line bg-sunken p-2 shadow-sm sm:p-3">
          <img
            src={asset(project.cover)}
            alt=""
            loading="lazy"
            decoding="async"
            className="block w-full rounded-sm object-cover"
          />
        </div>
      </div>
    )}

    <div className={project.cover ? 'lg:col-span-5' : 'lg:col-span-12'}>
      <p className="font-sans text-eyebrow uppercase text-ink-faint">
        {[project.kind, project.year].filter(Boolean).join(' · ')}
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

      <Link
        to={`/project/${project.id}`}
        className="u-focus group mt-7 inline-flex items-center gap-2 font-sans text-meta font-semibold text-accent"
      >
        Read the case study
        <ArrowRight
          className="h-4 w-4 transition-transform duration-fast ease-smooth group-hover:translate-x-1"
          aria-hidden="true"
        />
      </Link>
    </div>
  </Reveal>
);

const ProjectRow = ({ project, index, delay }) => {
  const linked = project.hasCaseStudy;

  const body = (
    <div className="grid gap-x-8 gap-y-3 md:grid-cols-[3rem_1fr_auto]">
      <span className="font-mono text-meta tabular-nums text-ink-faint md:pt-1.5">
        {String(index).padStart(2, '0')}
      </span>

      <div>
        <h3
          className={`font-display text-h3 transition-colors duration-fast ease-smooth ${
            linked ? 'text-ink group-hover:text-accent' : 'text-ink-muted'
          }`}
        >
          {project.title}
        </h3>

        <p className="mt-1.5 font-sans text-meta text-ink-muted">
          {project.company} · {project.role}
        </p>

        <p className="mt-3 max-w-[62ch] font-sans text-body text-ink-body">
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

      <div className="flex items-start gap-3 md:pt-1.5">
        <span className="font-sans text-meta text-ink-faint">
          {[project.kind, project.year].filter(Boolean).join(' · ')}
        </span>
        {linked && (
          <ArrowRight
            className="h-4 w-4 shrink-0 text-ink-faint transition-transform duration-fast ease-smooth group-hover:translate-x-1 group-hover:text-accent"
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );

  return (
    <Reveal as="li" delay={delay} className="border-t border-line">
      {linked ? (
        <Link
          to={`/project/${project.id}`}
          className="u-focus group -mx-4 block rounded-md px-4 py-9 transition-colors duration-fast ease-smooth hover:bg-surface md:py-10"
        >
          {body}
        </Link>
      ) : (
        // No case study written, so this is a listing rather than a link.
        <div className="-mx-4 px-4 py-9 md:py-10">{body}</div>
      )}
    </Reveal>
  );
};

export default WorkIndex;
