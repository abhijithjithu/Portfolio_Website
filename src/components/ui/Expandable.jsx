import { useId, useState } from 'react';

/**
 * A paragraph that is clamped to a few lines on a phone and shown in full
 * from md up. Long role descriptions made the home page sixteen screens tall
 * on mobile; this keeps the scan short without removing anything.
 */
const Expandable = ({ lines = 3, className = '', children }) => {
  const [open, setOpen] = useState(false);
  const id = useId();
  // Spelled out so Tailwind can see both class names.
  const clamp = lines === 5 ? 'line-clamp-5' : 'line-clamp-3';

  return (
    <div>
      <p id={id} className={`${className} ${open ? '' : `${clamp} md:line-clamp-none`}`}>
        {children}
      </p>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className="u-focus print-hide mt-2 py-1 font-sans text-meta font-semibold text-accent md:hidden"
      >
        {open ? 'Show less' : 'Read more'}
      </button>
    </div>
  );
};

export default Expandable;
