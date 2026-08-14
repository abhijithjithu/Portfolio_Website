import { asset } from '../../config/site';

/**
 * A matted image — the frame is a recessed board with a hairline, so the
 * screenshot reads as a plate on a page rather than a floating card.
 *
 * There is deliberately no onError extension-guessing here. The old
 * renderer walked .png → .jpg → .jpeg → inline SVG, which quietly hid three
 * genuinely wrong paths in data.js for as long as it shipped.
 */
const Figure = ({ src, alt, caption, index, className = '' }) => (
  <figure className={`my-10 ${className}`}>
    <div className="rounded-md border border-line bg-sunken p-2 shadow-sm sm:p-4">
      <img
        src={asset(src)}
        alt={alt || ''}
        loading="lazy"
        decoding="async"
        className="mx-auto block max-h-[600px] w-full rounded-sm object-contain"
      />
    </div>

    {caption && (
      <figcaption className="mt-3 max-w-[60ch] font-sans text-meta leading-relaxed text-ink-muted">
        {typeof index === 'number' && (
          <span className="text-ink-faint">Fig. {index} — </span>
        )}
        {caption}
      </figcaption>
    )}
  </figure>
);

export default Figure;
