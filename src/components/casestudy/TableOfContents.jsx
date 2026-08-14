import { useEffect, useState } from 'react';
import { slugify } from './blocks';

/**
 * Built from the case study's own section titles. Replaces the sticky
 * "Project Overview" card, whose metadata now sits in the header rule where
 * it is read once instead of following the reader down the page.
 */
const TableOfContents = ({ content }) => {
  const items = content
    .filter((block) => block.type === 'section_title')
    .map((block) => ({
      id: slugify(block.text),
      label: String(block.text).replace(/^[\p{Emoji}\s]+/u, ''),
    }));

  const [active, setActive] = useState('');

  useEffect(() => {
    if (items.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  if (items.length < 3) return null;

  return (
    <nav
      aria-label="On this page"
      className="sticky top-[calc(var(--header-h)+2rem)] border-l border-line pl-5"
    >
      <p className="mb-4 font-sans text-eyebrow uppercase text-ink-faint">On this page</p>
      <ul className="space-y-2.5">
        {items.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`u-focus block font-sans text-meta leading-snug transition-colors duration-fast ease-smooth ${
                active === id ? 'text-accent' : 'text-ink-muted hover:text-ink'
              }`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
