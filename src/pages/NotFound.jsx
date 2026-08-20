import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projectData } from '../data';
import SEO from '../components/SEO';

/**
 * Unknown routes used to render the homepage silently, which leaves the
 * address bar showing a URL that does not exist and gives the reader no way
 * to tell what went wrong.
 */
const NotFound = () => {
  const readable = projectData.filter((p) => p.hasCaseStudy).slice(0, 3);

  return (
    <>
      <SEO title="Page not found | Abhijith P" description="That page does not exist." />

      <section className="bg-ground pt-header">
        <div className="u-container flex min-h-[70svh] flex-col justify-center py-section">
          <p className="font-sans text-eyebrow uppercase text-ink-faint">Error 404</p>

          <h1 className="mt-5 max-w-[18ch] font-display text-h1 text-ink">
            That page doesn’t exist.
          </h1>

          <p className="u-measure mt-5 font-sans text-lede text-ink-muted">
            The link may be out of date, or the address mistyped.
          </p>

          <div className="mt-10 flex items-center gap-2">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            <Link
              to="/"
              className="u-focus group inline-flex items-center gap-2 font-sans text-meta font-semibold text-accent"
            >
              Back to the homepage
              <ArrowRight
                className="h-4 w-4 transition-transform duration-fast ease-smooth group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>

          <div className="mt-14">
            <p className="mb-4 font-sans text-eyebrow uppercase text-ink-faint">
              Or read a case study
            </p>
            <ul>
              {readable.map((project) => (
                <li key={project.id} className="border-t border-line last:border-b">
                  <Link
                    to={`/project/${project.id}`}
                    className="u-focus group -mx-4 flex items-baseline justify-between gap-6 px-4 py-4 transition-colors duration-fast ease-smooth hover:bg-surface"
                  >
                    <span className="font-display text-h3 text-ink transition-colors duration-fast ease-smooth group-hover:text-accent">
                      {project.title}
                    </span>
                    <span className="shrink-0 font-sans text-meta text-ink-faint">
                      {project.kind}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
