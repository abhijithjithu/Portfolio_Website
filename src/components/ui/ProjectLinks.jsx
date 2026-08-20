import { ArrowUpRight, Github, PlayCircle } from 'lucide-react';

const ICONS = {
  repo: Github,
  demo: ArrowUpRight,
  video: PlayCircle,
};

/**
 * Verifiable artefacts for a project — source, live demo, recorded walkthrough.
 *
 * A case study that describes a model but links to nothing is unverifiable,
 * which is the weakest position a technical portfolio can be in. Renders
 * nothing when a project has no links, so it costs nothing until populated.
 */
const ProjectLinks = ({ links, className = '' }) => {
  if (!links?.length) return null;

  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`}>
      {links.map(({ kind, label, href }) => {
        const Icon = ICONS[kind] ?? ArrowUpRight;
        return (
          <li key={href}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="u-focus group inline-flex items-center gap-2 rounded-md border border-line bg-surface px-3.5 py-2 font-sans text-meta font-semibold text-ink shadow-xs transition-colors duration-fast ease-smooth hover:border-line-strong hover:bg-sunken"
            >
              <Icon className="h-3.5 w-3.5 text-ink-muted" aria-hidden="true" />
              {label}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default ProjectLinks;
