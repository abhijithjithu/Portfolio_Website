import Figure from '../ui/Figure';
import Tag from '../ui/Tag';
import { slugify, stripEmoji } from './slug';

/**
 * Minimal `**bold**` support.
 *
 * Hardened against an unbalanced pair: the previous implementation split on
 * `**` and bolded every odd index, so a single stray `**` silently bolded
 * everything from there to the end of the paragraph.
 */
const RichText = ({ text }) => {
  const parts = String(text).split('**');
  if (parts.length % 2 === 0) return <>{text}</>;

  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-ink">
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </>
  );
};

const NUMERIC = /^[$₹]?\s*-?[\d.,]+\s*[%×x]?$/;

const Table = ({ headers, rows }) => (
  <div className="my-10 max-w-wide overflow-x-auto">
    <table className="w-full border-collapse border-y border-line-strong text-left">
      <thead>
        <tr className="border-b border-line-strong">
          {headers.map((header, i) => (
            <th
              key={i}
              scope="col"
              className={`py-3 pr-6 font-sans text-eyebrow uppercase text-ink-muted last:pr-0 ${
                i > 0 ? 'text-right' : ''
              }`}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-line">
        {rows.map((row, r) => (
          <tr key={r}>
            {row.map((cell, c) => (
              <td
                key={c}
                className={`py-3.5 pr-6 font-sans text-body text-ink-body last:pr-0 ${
                  NUMERIC.test(String(cell).trim())
                    ? 'text-right font-mono tabular-nums'
                    : ''
                }`}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const URL_ONLY = /(https?:\/\/\S+)/;

const Callout = ({ text }) => {
  const match = String(text).match(URL_ONLY);

  return (
    <blockquote className="my-10 max-w-[52ch] border-l-2 border-accent pl-6 font-display text-h3 italic text-ink">
      {match ? (
        <>
          {text.slice(0, match.index)}
          <a
            href={match[1]}
            target="_blank"
            rel="noreferrer"
            className="u-focus not-italic text-accent underline decoration-accent/40 underline-offset-4"
          >
            {match[1]}
          </a>
        </>
      ) : (
        text
      )}
    </blockquote>
  );
};

/**
 * Renders one content block. `figureIndex` is threaded from the caller so
 * captions can be numbered across the whole case study.
 */
const renderBlock = (block, key, figureIndex) => {
  switch (block.type) {
    // Text blocks are held to the reading measure while figures and tables
    // break out wider. That asymmetry is what makes long-form read as typeset
    // rather than as one uniform column.
    case 'section_title':
      return (
        <div key={key} className="max-w-measure">
          <hr className="u-rule mb-8 mt-16" />
          <h2 id={slugify(block.text)} className="font-display text-h2 text-ink">
            {stripEmoji(block.text)}
          </h2>
        </div>
      );

    case 'subtitle':
      return (
        <h3 key={key} className="mb-3 mt-10 max-w-measure font-sans text-h4 text-ink">
          {block.text}
        </h3>
      );

    case 'paragraph':
      return (
        <p key={key} className="mb-6 max-w-measure font-sans text-body text-ink-body">
          <RichText text={block.text} />
        </p>
      );

    case 'list':
      return (
        <ul key={key} role="list" className="mb-6 max-w-measure space-y-2.5">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="pl-6 -indent-6 font-sans text-body text-ink-body before:mr-3 before:text-accent/70 before:content-['–']"
            >
              <RichText text={item} />
            </li>
          ))}
        </ul>
      );

    case 'callout':
      return <Callout key={key} text={block.text} />;

    case 'formula':
      return (
        <div key={key} className="my-10 max-w-wide border-y border-line-strong bg-sunken px-6 py-8">
          <p className="overflow-x-auto text-center font-mono text-[0.9375rem] text-ink">
            {block.equation}
          </p>
          <p className="mt-4 text-right font-sans text-eyebrow uppercase text-ink-faint">Model</p>
        </div>
      );

    case 'table':
      return <Table key={key} headers={block.headers} rows={block.rows} />;

    case 'image':
      return (
        <Figure
          key={key}
          src={block.src}
          alt={block.alt}
          caption={block.caption}
          index={figureIndex}
          className="max-w-wide"
        />
      );

    case 'tags':
      return (
        <div key={key} className="mb-8 max-w-measure">
          <p className="mb-3 font-sans text-eyebrow uppercase text-ink-faint">Tools</p>
          <ul className="flex flex-wrap gap-2">
            {block.items.map((item) => (
              <li key={item}>
                <Tag>{item}</Tag>
              </li>
            ))}
          </ul>
        </div>
      );

    default:
      if (import.meta.env.DEV) {
        console.warn(`[case study] unhandled block type: ${block.type}`);
      }
      return null;
  }
};

const isImage = (block) => block.type === 'image';

/**
 * Figure numbers are derived per block rather than accumulated in a counter,
 * so nothing is mutated while React renders. The repeated count is O(n²) on a
 * list of at most ninety blocks, which is not worth optimising away.
 */
const CaseStudyBody = ({ content }) => (
  <>
    {content.map((block, i) =>
      renderBlock(
        block,
        i,
        isImage(block) ? content.slice(0, i + 1).filter(isImage).length : undefined
      )
    )}
  </>
);

export default CaseStudyBody;
