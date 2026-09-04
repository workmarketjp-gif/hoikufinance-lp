import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname);
const output = resolve(root, 'dist');

const [htmlSource, cssSource, jsSource] = await Promise.all([
  readFile(resolve(root, 'index.html'), 'utf8'),
  readFile(resolve(root, 'styles.css'), 'utf8'),
  readFile(resolve(root, 'script.js'), 'utf8'),
]);

const cssLink = /\s*<link id="hf-main-styles"[^>]*>\s*/;
const cssFallback = /\s*<script>\s*\(\(\) => \{[\s\S]*?hf-styles-fallback[\s\S]*?<\/script>\s*/;
const jsTag = /\s*<script defer src="\/script\.js\?v=[^"]+"><\/script>\s*/;

if (!cssLink.test(htmlSource) || !jsTag.test(htmlSource)) {
  throw new Error('Expected stylesheet or script marker was not found in index.html');
}

const builtHtml = htmlSource
  .replace(cssLink, `\n  <style id="hf-main-styles">\n${cssSource}\n  </style>\n`)
  .replace(cssFallback, '\n')
  .replace(jsTag, `\n  <script>\n${jsSource}\n  </script>\n`);

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await Promise.all([
  writeFile(resolve(output, 'index.html'), builtHtml, 'utf8'),
  cp(resolve(root, 'styles.css'), resolve(output, 'styles.css')),
  cp(resolve(root, 'script.js'), resolve(output, 'script.js')),
]);

console.log(`Built ${output} with CSS and JavaScript embedded atomically.`);
