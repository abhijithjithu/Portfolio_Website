/** Small recessed chip. No icon — a lucide glyph on every tag was pure noise. */
const Tag = ({ children, className = '' }) => (
  <span
    className={`inline-flex items-center rounded-sm border border-line bg-sunken px-2.5 py-1 font-sans text-[0.75rem] font-medium leading-none text-ink-muted ${className}`}
  >
    {children}
  </span>
);

export default Tag;
