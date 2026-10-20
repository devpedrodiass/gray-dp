import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { black, dark, light } from '../src/palette.mjs';
import { buildTheme } from '../src/theme.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const variants = [
  { file: 'gray-dp-color-theme.json', name: 'Gray DP', type: 'dark', palette: dark },
  { file: 'gray-dp-black-color-theme.json', name: 'Gray DP Black', type: 'dark', palette: black },
  { file: 'gray-dp-light-color-theme.json', name: 'Gray DP Light', type: 'light', palette: light },
];

for (const { file, ...options } of variants) {
  const theme = buildTheme(options);
  writeFileSync(join(root, 'themes', file), JSON.stringify(theme, null, 2) + '\n');
  console.log(`built themes/${file}`);
}
