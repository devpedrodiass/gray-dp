// Tokenizes a file with VS Code's bundled grammars and prints the role each token resolves to.
// Usage: node scripts/inspect.mjs <file> [--scopes]
// Covers TextMate rules only; semantic tokens come from language servers at runtime.

import { readdirSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { extname, join } from 'node:path';
import oniguruma from 'vscode-oniguruma';
import vsctm from 'vscode-textmate';
import { dark } from '../src/palette.mjs';
import { buildTheme } from '../src/theme.mjs';

const VSCODE_EXTENSIONS = '/Applications/Visual Studio Code.app/Contents/Resources/app/extensions';
const [file, flag] = process.argv.slice(2);
const showScopes = flag === '--scopes';

// Index every grammar and language contributed by the built-in extensions.
const grammarPaths = new Map(); // scopeName -> path
const scopeByLanguage = new Map(); // languageId -> scopeName
const languageByExtension = new Map(); // .ext -> languageId
for (const dir of readdirSync(VSCODE_EXTENSIONS)) {
  let manifest;
  try {
    manifest = JSON.parse(readFileSync(join(VSCODE_EXTENSIONS, dir, 'package.json'), 'utf8'));
  } catch {
    continue;
  }
  for (const g of manifest.contributes?.grammars ?? []) {
    grammarPaths.set(g.scopeName, join(VSCODE_EXTENSIONS, dir, g.path));
    if (g.language) scopeByLanguage.set(g.language, g.scopeName);
  }
  for (const l of manifest.contributes?.languages ?? []) {
    for (const ext of l.extensions ?? []) languageByExtension.set(ext, l.id);
  }
}

const require = createRequire(import.meta.url);
await oniguruma.loadWASM(readFileSync(require.resolve('vscode-oniguruma/release/onig.wasm')).buffer);

const theme = buildTheme({ name: 'inspect', type: 'dark', palette: dark });
const registry = new vsctm.Registry({
  onigLib: Promise.resolve({
    createOnigScanner: (patterns) => new oniguruma.OnigScanner(patterns),
    createOnigString: (s) => new oniguruma.OnigString(s),
  }),
  loadGrammar: async (scopeName) => {
    const path = grammarPaths.get(scopeName);
    return path ? vsctm.parseRawGrammar(readFileSync(path, 'utf8'), path) : null;
  },
  theme: {
    settings: [
      { settings: { foreground: theme.colors['editor.foreground'], background: theme.colors['editor.background'] } },
      ...theme.tokenColors,
    ],
  },
});

// Reverse lookup: "color|style" -> role names, so output reads as roles instead of hex.
const roles = new Map();
for (const [role, [color, style]] of Object.entries(dark.syntax)) {
  const key = `${color.toUpperCase()}|${style.split(' ').filter(Boolean).sort().join(' ')}`;
  roles.set(key, [...(roles.get(key) ?? []), role]);
}

const FONT_STYLES = [[1, 'italic'], [2, 'bold'], [4, 'underline'], [8, 'strikethrough']];
const describe = (metadata, colorMap) => {
  const fg = colorMap[(metadata >>> 15) & 0x1ff].toUpperCase();
  const bits = (metadata >>> 11) & 0xf;
  const style = FONT_STYLES.filter(([bit]) => bits & bit).map(([, n]) => n).sort().join(' ');
  return roles.get(`${fg}|${style}`)?.join('/') ?? `${fg}${style ? ' ' + style : ''}`;
};

const languageId = languageByExtension.get(extname(file));
const grammar = await registry.loadGrammar(scopeByLanguage.get(languageId));
if (!grammar) throw new Error(`No grammar for ${file} (language: ${languageId})`);

const colorMap = registry.getColorMap();
let stack = vsctm.INITIAL;
readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
  const styled = grammar.tokenizeLine2(line, stack);
  const scoped = showScopes ? grammar.tokenizeLine(line, stack) : null;
  stack = styled.ruleStack;
  const parts = [];
  for (let t = 0; t < styled.tokens.length; t += 2) {
    const start = styled.tokens[t];
    const end = t + 2 < styled.tokens.length ? styled.tokens[t + 2] : line.length;
    const text = line.slice(start, end);
    if (!text.trim()) continue;
    const role = describe(styled.tokens[t + 1], colorMap);
    parts.push(`${text.trim()}‹${role}›`);
  }
  if (parts.length) console.log(`${String(i + 1).padStart(3)}  ${parts.join(' ')}`);
  if (scoped) {
    for (const tok of scoped.tokens) {
      const text = line.slice(tok.startIndex, tok.endIndex);
      if (text.trim()) console.log(`       ${JSON.stringify(text)} ${tok.scopes.slice(1).join(' ')}`);
    }
  }
});
