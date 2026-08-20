import { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { asset } from '../../config/site';
import Lightbox from './Lightbox';

/**
 * A matted image — the frame is a recessed board with a hairline, so the
 * screenshot reads as a plate on a page rather than a floating card.
 *
 * Clicking opens the figure full-viewport, since diagrams are the part of a
 * case study people most often need to inspect closely.
 *
 * There is deliberately no onError extension-guessing here. The old renderer
 * walked .png -> .jpg -> .jpeg -> inline SVG, which quietly hid three
 * genuinely wrong paths in data.js for as long as it shipped.
 */
const Figure = ({ src, alt, caption, index, className = '' }) => {
  const [open, setOpen] = useState(false);
  const resolved = asset(src);
  const label = caption ? `${alt || 'Figure'} — ${caption}` : alt;

  return (
    <figure className={`my-10 ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge figure${index ? ` ${index}` : ''}`}
        className="u-focus group relative block w-full cursor-zoom-in rounded-md border border-line bg-sunken p-2 shadow-sm transition-colors duration-fast ease-smooth hover:border-line-strong sm:p-4"
      >
        <img
          src={resolved}
          alt={alt || ''}
          loading="lazy"
          decoding="async"
          className="mx-auto block max-h-[600px] w-full rounded-sm object-contain"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-md border border-line bg-surface text-ink-muted opacity-0 shadow-xs transition-opacity duration-fast ease-smooth group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <Maximize2 className="h-3.5 w-3.5" />
        </span>
      </button>

      {caption && (
        <figcaption className="mt-3 max-w-[60ch] font-sans text-meta leading-relaxed text-ink-muted">
          {typeof index === 'number' && <span className="text-ink-faint">Fig. {index} — </span>}
          {caption}
        </figcaption>
      )}

      <Lightbox
        open={open}
        src={resolved}
        alt={label}
        caption={caption}
        onClose={() => setOpen(false)}
      />
    </figure>
  );
};

export default Figure;
