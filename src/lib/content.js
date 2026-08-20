const WORDS_PER_MINUTE = 210;

/** Pulls every human-readable string out of one content block. */
const blockText = (block) => {
  switch (block.type) {
    case 'section_title':
    case 'subtitle':
    case 'paragraph':
    case 'callout':
      return block.text ?? '';
    case 'list':
    case 'tags':
      return (block.items ?? []).join(' ');
    case 'table':
      return [...(block.headers ?? []), ...(block.rows ?? []).flat()].join(' ');
    case 'image':
      return block.caption ?? '';
    case 'formula':
      return block.equation ?? '';
    default:
      return '';
  }
};

export const countWords = (content = []) =>
  content.reduce((total, block) => {
    const words = String(blockText(block)).trim().match(/[\w'’-]+/g);
    return total + (words ? words.length : 0);
  }, 0);

export const countFigures = (content = []) =>
  content.filter((block) => block.type === 'image').length;

/**
 * Figures carry real inspection time in a technical case study, so each one
 * counts for roughly ten seconds on top of the prose.
 */
export const readingMinutes = (content = []) => {
  const minutes = countWords(content) / WORDS_PER_MINUTE + countFigures(content) / 6;
  return Math.max(1, Math.round(minutes));
};
