import { Copy, Github, Linkedin, Phone } from 'lucide-react';
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  GITHUB_URL,
  LINKEDIN_URL,
  RESUME,
  asset,
} from '../config/site';
import Section from './ui/Section';
import SectionHeader from './ui/SectionHeader';
import Reveal from './ui/Reveal';
import Button from './ui/Button';
import ContactFormFields from './ContactFormFields';
import { useToast } from '../hooks/useToast';

/**
 * The single contact point on the page. There used to be three: a filled
 * "Hire Me" button in the header, this form, and a second full CTA block in
 * the footer.
 */
const Contact = () => {
  const showToast = useToast();
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      showToast?.('Email address copied');
    } catch {
      showToast?.('Could not copy — select the address instead');
    }
  };

  return (
    <Section id="contact" tone="surface">
      <SectionHeader
        eyebrow="Contact"
        title="Let's work together"
        lede="Open to product, data and strategy roles. The fastest route is email."
      />

      <div className="grid gap-x-16 gap-y-14 lg:grid-cols-2">
        <Reveal>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="u-focus font-display text-h2 text-ink decoration-accent/40 underline-offset-[6px] transition-colors duration-fast ease-smooth hover:text-accent hover:underline"
          >
            {CONTACT_EMAIL}
          </a>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button type="button" onClick={copyEmail} variant="quiet" size="sm">
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              Copy address
            </Button>
            <Button as="a" href={asset(RESUME)} target="_blank" rel="noreferrer" variant="quiet" size="sm">
              Download résumé
            </Button>
          </div>

          <dl className="mt-10">
            <div className="flex items-center gap-3 border-t border-line py-4">
              <Phone className="h-4 w-4 shrink-0 text-ink-faint" aria-hidden="true" />
              <dt className="sr-only">Phone</dt>
              <dd>
                <a
                  href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`}
                  className="u-focus font-sans text-body text-ink-body transition-colors duration-fast ease-smooth hover:text-ink"
                >
                  {CONTACT_PHONE}
                </a>
              </dd>
            </div>

            <div className="flex items-center gap-3 border-t border-line py-4">
              <Linkedin className="h-4 w-4 shrink-0 text-ink-faint" aria-hidden="true" />
              <dt className="sr-only">LinkedIn</dt>
              <dd>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="u-focus font-sans text-body text-ink-body transition-colors duration-fast ease-smooth hover:text-ink"
                >
                  linkedin.com/in/abhijithp99
                </a>
              </dd>
            </div>

            <div className="flex items-center gap-3 border-y border-line py-4">
              <Github className="h-4 w-4 shrink-0 text-ink-faint" aria-hidden="true" />
              <dt className="sr-only">GitHub</dt>
              <dd>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="u-focus font-sans text-body text-ink-body transition-colors duration-fast ease-smooth hover:text-ink"
                >
                  github.com/abhijithjithu
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.06}>
          <ContactFormFields />
        </Reveal>
      </div>
    </Section>
  );
};

export default Contact;
