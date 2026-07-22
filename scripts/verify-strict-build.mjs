import { readFileSync } from 'node:fs';

const script = readFileSync(new URL('../dist/script.js', import.meta.url), 'utf8');
const forbidden = ['window.screen', 'navigator.language'];
const found = forbidden.filter(value => script.includes(value));

if (found.length) {
  throw new Error(`Strict build contains forbidden device reads: ${found.join(', ')}`);
}

if (!script.includes('id:void 0')) {
  throw new Error('Strict build does not appear to remove persistent identity.');
}

console.log('Strict DSGVO build verified.');
