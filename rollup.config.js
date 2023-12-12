/* eslint-env node */

import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import url from '@rollup/plugin-url';
import replace from '@rollup/plugin-replace';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default [
  {
    input: 'src/main.js',
    output: {
      file: 'public/bundle.js',
      format: 'iife', // suitable for <script> tags
      sourcemap: false
    },
    plugins: [
      resolve(), // find packages in node_modules
      url({
        include: '**/assets/**/*',
        fileName: '[name].[hash][extname]',
        limit: 0
      }),
      replace({
        values: { DEBUG: String(!production) },
        preventAssignment: true
      }),
      production && terser()
    ]
  },
  {
    // You can choose any build here
    input: 'node_modules/phaser-ce/build/phaser.js',
    output: {
      file: 'public/phaser.js',
      format: 'iife',
      name: 'Phaser',
      sourcemap: false
    },
    context: 'window',
    plugins: [
      production && terser({ output: { comments: false } })
    ]
  }
];
