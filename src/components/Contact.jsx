import { useState } from 'react';
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
import { useToast } from '../hooks/useToast';

const FIELD =
  'u-focus w-full rounded-md border border-line bg-sunken px-3.5 py-2.5 font-sans text-body text-ink ' +
  'placeholder:text-ink-faint transition-colors duration-fast ease-smooth hover:border-line-strong ' +
  'focus:border-accent';

const LABEL = 'mb-2 block font-sans text-eyebrow uppercase text-ink-faint';

/**
 * The single contact point on the page. There used to be three: a filled
 * "Hire Me" button in the header, this form, and a second full CTA block in
 * the footer.
 */
const Contact = () => {
  const showToast = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const complete = Object.values(form).every((v) => v.trim());

  const update = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const body = `${form.message}\n\n— ${form.name}\n${form.email}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      form.subject
    )}&body=${encodeURIComponent(body)}`;
  };

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

        <Reveal delay={0.06} as="form" onSubmit={submit}>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={LABEL} htmlFor="name">Name</label>
              <input id="name" className={FIELD} value={form.name} onChange={update('name')} required />
            </div>
            <div>
              <label className={LABEL} htmlFor="email">Email</label>
              <input id="email" type="email" className={FIELD} value={form.email} onChange={update('email')} required />
            </div>
          </div>

          <div className="mt-5">
            <label className={LABEL} htmlFor="subject">Subject</label>
            <input id="subject" className={FIELD} value={form.subject} onChange={update('subject')} required />
          </div>

          <div className="mt-5">
            <label className={LABEL} htmlFor="message">Message</label>
            <textarea id="message" rows={6} className={`${FIELD} resize-y`} value={form.message} onChange={update('message')} required />
          </div>

          <Button type="submit" disabled={!complete} className="mt-6 w-full sm:w-auto">
            Send message
          </Button>

          <p className="mt-3 font-sans text-[0.75rem] text-ink-faint">
            Opens your email client with the message ready to send.
          </p>
        </Reveal>
      </div>
    </Section>
  );
};

export default Contact;
