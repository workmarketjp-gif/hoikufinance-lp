import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname);
const output = resolve(root, 'dist');

const [htmlSource, cssSource, brandCssSource, jsSource] = await Promise.all([
  readFile(resolve(root, 'index.html'), 'utf8'),
  readFile(resolve(root, 'styles.css'), 'utf8'),
  readFile(resolve(root, 'brand-fixes.css'), 'utf8'),
  readFile(resolve(root, 'script.js'), 'utf8'),
]);

const cssLink = /\s*<link id="hf-main-styles"[^>]*>\s*/;
const cssFallback = /\s*<script>\s*\(\(\) => \{[\s\S]*?hf-styles-fallback[\s\S]*?<\/script>\s*/;
const jsTag = /\s*<script defer src="\/script\.js\?v=[^"]+"><\/script>\s*/;

if (!cssLink.test(htmlSource) || !jsTag.test(htmlSource)) {
  throw new Error('Expected stylesheet or script marker was not found in index.html');
}

let builtHtml = htmlSource
  .replace(cssLink, `\n  <style id="hf-main-styles">\n${cssSource}\n  </style>\n  <style id="hf-brand-fixes">\n${brandCssSource}\n  </style>\n`)
  .replace(cssFallback, '\n')
  .replace(jsTag, `\n  <script>\n${jsSource}\n  </script>\n`);

builtHtml = builtHtml.replace(
  '</head>',
  '  <link rel="icon" type="image/png" href="/logo/logom_hoikufinance.png?v=20260904">\n  <link rel="apple-touch-icon" href="/logo/logom_hoikufinance.png?v=20260904">\n</head>'
);

const adminUrl = 'https://admin.hoikufinance.jp/';
builtHtml = builtHtml.replace(
  '</body>',
  `  <script>\n    (() => {\n      const adminUrl = ${JSON.stringify(adminUrl)};\n      document.querySelectorAll('a').forEach((link) => {\n        const label = (link.textContent || '').trim();\n        if (label === 'ログイン' || label.includes('管理画面')) {\n          link.href = adminUrl;\n          link.target = '_self';\n          link.rel = '';\n        }\n      });\n    })();\n  </script>\n</body>`
);

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await Promise.all([
  writeFile(resolve(output, 'index.html'), builtHtml, 'utf8'),
  cp(resolve(root, 'styles.css'), resolve(output, 'styles.css')),
  cp(resolve(root, 'brand-fixes.css'), resolve(output, 'brand-fixes.css')),
  cp(resolve(root, 'script.js'), resolve(output, 'script.js')),
  cp(resolve(root, 'logo'), resolve(output, 'logo'), { recursive: true }),
]);

console.log(`Built ${output} with CSS, branding assets, admin links and JavaScript embedded atomically.`);
