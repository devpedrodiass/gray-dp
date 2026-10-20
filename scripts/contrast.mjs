// Prints the WCAG contrast ratio of every syntax color against the editor background.
import { black, dark, light } from '../src/palette.mjs';

const luminance = (hex) => {
  const [r, g, b] = hex.match(/\w\w/g).map((c) => {
    const v = parseInt(c, 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

for (const [name, palette] of Object.entries({ dark, black, light })) {
  const bg = palette.gray[800];
  console.log(`\n${name} (${bg})`);
  for (const [role, [color, style]] of Object.entries(palette.syntax)) {
    const ratio = contrast(color, bg);
    const flag = ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA ' : ratio >= 3 ? 'low' : 'FAIL';
    console.log(`  ${role.padEnd(16)} ${color}  ${ratio.toFixed(2).padStart(5)}  ${flag}  ${style}`);
  }
}
