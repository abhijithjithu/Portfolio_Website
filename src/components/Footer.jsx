import { Github, Linkedin, Mail } from 'lucide-react';
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL, NAME, NAV } from '../config/site';

/**
 * A quiet closing bar and nothing more. This used to carry a full
 * "Ready to Build the Future?" call-to-action block, which made three
 * separate contact CTAs on one page, plus the same four links rendered
 * twice — once as icons and again as text.
 */
const Footer = () => {
  const socials = [
    { href: LINKEDIN_URL, label: 'LinkedIn', Icon: Linkedin },
    { href: GITHUB_URL, label: 'GitHub', Icon: Github },
    { href: `mailto:${CONTACT_EMAIL}`, label: 'Email', Icon: Mail },
  ];

  return (
    <footer className="bg-ground">
      <div className="u-container">
        <hr className="u-rule" />
        <div className="flex flex-col items-start justify-between gap-6 py-10 sm:flex-row sm:items-center">
          <p className="font-sans text-meta text-ink-muted">
            © {new Date().getFullYear()} {NAME}
          </p>

          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Footer">
            {NAV.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className="u-focus font-sans text-meta text-ink-muted transition-colors duration-fast ease-smooth hover:text-ink"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="u-focus inline-flex h-9 w-9 items-center justify-center rounded-md text-ink-muted transition-colors duration-fast ease-smooth hover:bg-sunken hover:text-ink"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
