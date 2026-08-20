import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { projectData } from '../data';
import { NAME, SITE_URL } from '../config/site';
import SEO from '../components/SEO';
import CaseStudyBody from '../components/casestudy/blocks';
import TableOfContents from '../components/casestudy/TableOfContents';
import ProjectLinks from '../components/ui/ProjectLinks';
import { readingMinutes } from '../lib/content';

/** The only reading-progress indicator on the site. */
const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = scrollHeight - clientHeight;
      setProgress(total > 0 ? (scrollTop / total) * 100 : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-header z-40 h-px bg-transparent"
      aria-hidden="true"
    >
      <div className="h-full bg-accent transition-[width] duration-75" style={{ width: `${progress}%` }} />
    </div>
  );
};

const MetaItem = ({ label, children }) => (
  <div>
    <dt className="font-sans text-eyebrow uppercase text-ink-faint">{label}</dt>
    <dd className="mt-1.5 font-sans text-meta text-ink-body">{children}</dd>
  </div>
);

const ProjectDetail = () => {
  const { id } = useParams();

  // Only projects with written content have a page. There is no placeholder
  // branch: the previous one filled the gap with invented metrics.
  const readable = useMemo(() => projectData.filter((p) => p.hasCaseStudy), []);
  const project = readable.find((p) => p.id === id);

  if (!project) return <Navigate to="/" replace />;

  const minutes = readingMinutes(project.content);
  const url = `${SITE_URL}project/${project.id}`;

  // Marks each case study as an article rather than letting search engines
  // treat every route as the same portfolio homepage.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    headline: project.title,
    abstract: project.description,
    url,
    author: { '@type': 'Person', name: NAME },
    keywords: project.tags.join(', '),
    ...(project.year ? { datePublished: project.year } : {}),
  };

  const position = readable.indexOf(project);
  const prev = readable[position - 1];
  const next = readable[position + 1];

  return (
    <>
      <SEO
        title={`${project.title} | Abhijith P`}
        description={project.description}
        url={url}
        jsonLd={jsonLd}
      />
      <ReadingProgress />

      <article className="bg-ground pt-header">
        <div className="u-container">
          <div className="pt-12">
            <Link
              to="/"
              className="u-focus group inline-flex items-center gap-2 font-sans text-meta text-ink-muted transition-colors duration-fast ease-smooth hover:text-ink"
            >
              <ArrowLeft
                className="h-4 w-4 transition-transform duration-fast ease-smooth group-hover:-translate-x-1"
                aria-hidden="true"
              />
              All work
            </Link>
          </div>

          <header className="pt-10">
            <p className="font-sans text-eyebrow uppercase text-ink-faint">
              {['Case study', project.kind, project.year, `${minutes} min read`]
                .filter(Boolean)
                .join(' · ')}
            </p>

            <h1 className="mt-5 max-w-[20ch] font-display text-h1 text-ink">{project.title}</h1>

            <p className="u-measure mt-6 font-sans text-lede text-ink-muted">
              {project.description}
            </p>

            <ProjectLinks links={project.links} className="mt-7" />
          </header>

          <hr className="u-rule mt-12" />
          <dl className="grid grid-cols-2 gap-x-8 gap-y-6 py-6 md:grid-cols-4">
            <MetaItem label="Company">{project.company}</MetaItem>
            <MetaItem label="Role">{project.role}</MetaItem>
            {project.year && <MetaItem label="Year">{project.year}</MetaItem>}
            <MetaItem label="Stack">{project.tags.join(' · ')}</MetaItem>
          </dl>
          <hr className="u-rule" />

          <div className="flex flex-col gap-14 pb-8 pt-14 lg:flex-row lg:gap-16">
            {/* Deliberately not clamped: individual blocks set their own width,
                so figures and tables can break past the reading measure. */}
            <div className="min-w-0 max-w-wide flex-1">
              <CaseStudyBody content={project.content} />
            </div>

            <aside className="hidden w-60 shrink-0 lg:block">
              <TableOfContents content={project.content} />
            </aside>
          </div>

          <hr className="u-rule" />
          <nav className="grid gap-8 py-12 sm:grid-cols-2" aria-label="More case studies">
            {prev ? (
              <Link to={`/project/${prev.id}`} className="u-focus group">
                <span className="font-sans text-eyebrow uppercase text-ink-faint">Previous</span>
                <span className="mt-2 flex items-start gap-2 font-display text-h3 text-ink transition-colors duration-fast ease-smooth group-hover:text-accent">
                  <ArrowLeft
                    className="mt-1.5 h-4 w-4 shrink-0 transition-transform duration-fast ease-smooth group-hover:-translate-x-1"
                    aria-hidden="true"
                  />
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}

            {next && (
              <Link to={`/project/${next.id}`} className="u-focus group sm:text-right">
                <span className="font-sans text-eyebrow uppercase text-ink-faint">Next</span>
                <span className="mt-2 flex items-start gap-2 font-display text-h3 text-ink transition-colors duration-fast ease-smooth group-hover:text-accent sm:justify-end">
                  {next.title}
                  <ArrowRight
                    className="mt-1.5 h-4 w-4 shrink-0 transition-transform duration-fast ease-smooth group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            )}
          </nav>
        </div>
      </article>
    </>
  );
};

export default ProjectDetail;
