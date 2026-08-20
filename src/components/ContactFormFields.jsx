import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import {
  CONTACT_EMAIL,
  CONTACT_FORM_ENDPOINT,
  CONTACT_FORM_KEY,
} from '../config/site';
import Button from './ui/Button';

const FIELD =
  'u-focus w-full rounded-md border border-line bg-sunken px-3.5 py-2.5 font-sans text-body text-ink ' +
  'placeholder:text-ink-faint transition-colors duration-fast ease-smooth hover:border-line-strong ' +
  'focus:border-accent';

const LABEL = 'mb-2 block font-sans text-eyebrow uppercase text-ink-faint';

const EMPTY = { name: '', email: '', subject: '', message: '' };

/**
 * Posts to a real endpoint when one is configured, and reports what actually
 * happened either way.
 *
 * The previous version only ever built a mailto: URL and then claimed success
 * after four seconds. On a machine with no mail client registered — common on
 * corporate Windows and most kiosks — pressing Send did nothing at all, and
 * the sender had no way to know the message was never delivered.
 */
const ContactFormFields = () => {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  const configured = Boolean(CONTACT_FORM_KEY);
  const complete = Object.values(form).every((v) => v.trim());
  const update = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const openMailClient = () => {
    const body = `${form.message}\n\n— ${form.name}\n${form.email}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      form.subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!complete || status === 'sending') return;

    if (!configured) {
      openMailClient();
      return;
    }

    setStatus('sending');
    setError('');

    try {
      const res = await fetch(CONTACT_FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: CONTACT_FORM_KEY,
          from_name: form.name,
          replyto: form.email,
          ...form,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success !== false) {
        setStatus('sent');
        setForm(EMPTY);
      } else {
        setStatus('error');
        setError(data.message || 'The message could not be sent.');
      }
    } catch {
      setStatus('error');
      setError('Network error — check your connection, or email me directly.');
    }
  };

  if (status === 'sent') {
    return (
      <div className="u-card p-8">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-accent-tint text-accent">
          <Check className="h-4 w-4" aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-display text-h3 text-ink">Message sent</h3>
        <p className="mt-2 font-sans text-body text-ink-body">
          Thanks — I’ll reply to you by email shortly.
        </p>
        <Button type="button" variant="quiet" size="sm" className="mt-6" onClick={() => setStatus('idle')}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      {/* Honeypot — bots fill hidden fields, people do not. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor="name">Name</label>
          <input id="name" name="name" autoComplete="name" className={FIELD} value={form.name} onChange={update('name')} required />
        </div>
        <div>
          <label className={LABEL} htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" className={FIELD} value={form.email} onChange={update('email')} required />
        </div>
      </div>

      <div className="mt-5">
        <label className={LABEL} htmlFor="subject">Subject</label>
        <input id="subject" name="subject" className={FIELD} value={form.subject} onChange={update('subject')} required />
      </div>

      <div className="mt-5">
        <label className={LABEL} htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={6} className={`${FIELD} resize-y`} value={form.message} onChange={update('message')} required />
      </div>

      <Button type="submit" disabled={!complete || status === 'sending'} className="mt-6 w-full sm:w-auto">
        {status === 'sending' && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </Button>

      <p role="status" aria-live="polite" className="mt-3 font-sans text-[0.75rem] text-ink-faint">
        {status === 'error' ? (
          <span className="text-accent">
            {error} You can email me at {CONTACT_EMAIL}.
          </span>
        ) : configured ? (
          'Goes straight to my inbox. I reply to everything.'
        ) : (
          'Opens your email client with the message ready to send.'
        )}
      </p>
    </form>
  );
};

export default ContactFormFields;
