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
        // Tailwind v3 JS config (was app/globals.css for TW4 CSS-first config)
        entryPoint: 'tailwind.config.js',
      },
    },

    rules: {
      // prettier-plugin-tailwindcss handles class sorting — disable the ESLint rules to avoid conflicts
      'better-tailwindcss/enforce-consistent-class-order': 'off',
      'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
      // shadcn components use TW4 logical-property classes (mbs-, inline-N, block-N, etc.)
      // that TW3 doesn't know about. Re-enable in #25 once shadcn is replaced by gluestack.
      'better-tailwindcss/no-unknown-classes': 'off',
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
