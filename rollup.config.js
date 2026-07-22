import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';

const strict = process.env.STRICT_DSGVO === '1' || process.env.STRICT_DSGVO === 'true';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/script.js',
    format: 'iife',
  },
  plugins: [
    replace({
      __COLLECT_API_HOST__: process.env.COLLECT_API_HOST || '',
      __COLLECT_API_ENDPOINT__: process.env.COLLECT_API_ENDPOINT || '/api/send',
      __STRICT_DSGVO__: strict ? 'true' : '',
      delimiters: ['', ''],
      preventAssignment: true,
    }),
    terser({ compress: { evaluate: false } }),
  ],
};
