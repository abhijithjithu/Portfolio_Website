/**
 * Runs after `vite build`. The site is a client-rendered SPA, which leaves
 * three gaps that this fills with plain static files:
 *
 *  1. dist/project/<id>/index.html for every case study, identical to the
 *     app shell but with that project's title, description and URLs in the
 *     <head>. Link-preview crawlers (LinkedIn, WhatsApp, Slack) do not run
 *     JavaScript, so without this every shared case study showed the home
 *     page's card. It also means deep links need no rewrite rule.
 *  2. dist/404.html — the app shell again. Vercel serves it, with a real 404
 *     status, for any path that matches no file; the router then renders the
 *     Not Found page.
 *  3. sitemap.xml and robots.txt.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { siteUrl } from './site-url.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

const { projectData } = await import(pathToFileURL(path.join(root, 'src', 'data.js')).href);
const shell = await readFile(path.join(dist, 'index.html'), 'utf8');

const escapeAttr = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

/** Swaps the `content`/`href` of one tag, and fails loudly if the tag is gone. */
const setAttr = (html, tagPattern, attr, value) => {
  const re = new RegExp(`(<${tagPattern}[^>]*?\\s${attr}=")[^"]*(")`, 's');
  if (!re.test(html)) throw new Error(`postbuild: no match for <${tagPattern}> in index.html`);
  return html.replace(re, (_, open, close) => `${open}${escapeAttr(value)}${close}`);
};

const pageFor = (project) => {
  const title = `${project.title} | Abhijith P`;
  const url = `${siteUrl}project/${project.id}`;
  let html = shell.replace(/<title>.*?<\/title>/s, `<title>${escapeAttr(title)}</title>`);

  html = setAttr(html, 'meta\\s+name="description"', 'content', project.description);
  html = setAttr(html, 'meta\\s+property="og:type"', 'content', 'article');
  html = setAttr(html, 'meta\\s+property="og:url"', 'content', url);
  html = setAttr(html, 'meta\\s+property="og:title"', 'content', title);
  html = setAttr(html, 'meta\\s+property="og:description"', 'content', project.description);
  html = setAttr(html, 'meta\\s+name="twitter:url"', 'content', url);
  html = setAttr(html, 'meta\\s+name="twitter:title"', 'content', title);
  html = setAttr(html, 'meta\\s+name="twitter:description"', 'content', project.description);
  html = setAttr(html, 'link\\s+rel="canonical"', 'href', url);
  return html;
};

const readable = projectData.filter((p) => p.hasCaseStudy);

for (const project of readable) {
  const dir = path.join(dist, 'project', project.id);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), pageFor(project));
}

await writeFile(path.join(dist, '404.html'), shell);

const urls = [siteUrl, ...readable.map((p) => `${siteUrl}project/${p.id}`)];
const today = new Date().toISOString().slice(0, 10);

await writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((loc) => `  <url><loc>${loc}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`
);

await writeFile(
  path.join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}sitemap.xml\n`
);

console.log(`postbuild: ${readable.length} case-study pages, 404.html, sitemap.xml, robots.txt (${siteUrl})`);
