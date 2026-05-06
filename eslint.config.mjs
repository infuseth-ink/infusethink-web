import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import betterTailwindcss from 'eslint-plugin-better-tailwindcss';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // Tailwind CSS linting & formatting
  {
    extends: [betterTailwindcss.configs['recommended']],

    settings: {
      'better-tailwindcss': {
        // Tailwind v4 CSS-based config entry point
        entryPoint: 'app/globals.css',
      },
    },
  },

  // Root-level CJS config files use require() — allow it there
  {
    files: ['*.js', '.husky/*.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
