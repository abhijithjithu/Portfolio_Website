/** Leading emoji survive in some section titles from an earlier revision of the data. */
export const stripEmoji = (text) => String(text).replace(/^[\p{Emoji}\s]+/u, '');

/** Stable, readable ids for table-of-contents anchors. */
export const slugify = (text) =>
  stripEmoji(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
