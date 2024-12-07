import { createHighlighter } from 'shiki';

import {
  transformerNotationDiff,
  transformerMetaHighlight,
  transformerNotationHighlight
} from '@shikijs/transformers'; /** @see https://shiki.style/packages/transformers  */

const codeBlockThemes = {
  light: 'github-light',
  dark: 'github-dark'
};

const transformers = [
  transformerNotationDiff(),
  transformerMetaHighlight(),
  transformerNotationHighlight()
];

function parseMeta(meta) {
  const metaArray = meta?.split(' ');
  let name = '';
  let lineNumbers = false;
  let icon = 'dynamic';
  if (metaArray && metaArray.some((item) => item.startsWith('lineNumbers'))) {
    const match = metaArray.find((item) => item.startsWith('lineNumbers'));
    if (match.includes('=')) {
      lineNumbers = match.slice(11).replace(/=/g, '').replace(/"/g, '').replace(/'/g, '') == 'true';
    } else {
      lineNumbers = true;
    }
  }
  const copyCode = metaArray && !metaArray.some((item) => item.startsWith('no-copy'));
  const snippet = metaArray && metaArray.some((item) => item.startsWith('snippet'));
  if (metaArray && metaArray.some((item) => item.startsWith('name='))) {
    name = metaArray
      .find((item) => item.startsWith('name='))
      .slice(5)
      .replace(/"/g, '')
      .replace(/'/g, '');
  }
  if (metaArray && metaArray.some((item) => item.startsWith('icon='))) {
    icon = metaArray
      .find((item) => item.startsWith('icon='))
      .slice(5)
      .replace(/"/g, '')
      .replace(/'/g, '');
  }
  return { name, icon, lineNumbers, copyCode, snippet };
}

async function highlighter(code, lang, meta) {
  const highlighter = await createHighlighter({
    langs: [lang],
    themes: Object.values(codeBlockThemes)
  });

  const { name, icon, lineNumbers, copyCode, snippet } = parseMeta(meta);

  let html;
  if (!meta) {
    html = highlighter.codeToHtml(code, {
      lang,
      themes: codeBlockThemes,
      transformers: transformers
    });
  } else {
    html = highlighter.codeToHtml(code, {
      lang,
      themes: codeBlockThemes,
      transformers: transformers,
      meta: { __raw: meta }
    });
  }
  html = makeUnfocusable(html);
  highlighter.dispose();
  return (
    `<Components.pre name="${name}" icon="${icon}" lineNumbers={${lineNumbers}} copyCode={${copyCode}} snippet={${snippet}}>` +
    escapeHtml(html) +
    `</Components.pre>`
  );
}

function makeUnfocusable(code) {
  return code.replace('tabindex="0"', '');
}

function escapeHtml(code) {
  return code.replace(
    /[{}`]/g,
    (character) => ({ '{': '&lbrace;', '}': '&rbrace;', '`': '&grave;' })[character]
  );
}

export default highlighter;
