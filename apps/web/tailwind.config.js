/** @type {import('tailwindcss').Config} */
// TEMPORARY: Tailwind v3 — required by gluestack v3 + NativeWind v4.
// Re-upgrade path: docs/tailwind-v4-upgrade.md
// TW4 baseline: git show 5e8496e:apps/web/postcss.config.mjs (and globals.css)
const plugin = require('tailwindcss/plugin');

// Polyfills TW4's logical-property utilities that TW3 omits.
// Naming convention matches TW4 exactly so no component edits are needed.
const logicalPlugin = plugin(function ({ matchUtilities, theme }) {
  const spacing = theme('spacing');
  const inset = theme('inset');
  const maxWidth = theme('maxWidth');
  const sizes = { ...spacing, full: '100%', screen: '100vh', auto: 'auto' };
  const inlineSizes = { ...spacing, full: '100%', screen: '100vw', auto: 'auto', ...maxWidth };

  matchUtilities({ pbs: (v) => ({ 'padding-block-start': v }) }, { values: spacing });
  matchUtilities({ pbe: (v) => ({ 'padding-block-end': v }) }, { values: spacing });
  matchUtilities(
    { mbs: (v) => ({ 'margin-block-start': v }) },
    { values: spacing, supportsNegativeValues: true },
  );
  matchUtilities(
    { mbe: (v) => ({ 'margin-block-end': v }) },
    { values: spacing, supportsNegativeValues: true },
  );
  matchUtilities(
    { 'inset-bs': (v) => ({ 'inset-block-start': v }) },
    { values: inset, supportsNegativeValues: true },
  );
  matchUtilities(
    { 'inset-be': (v) => ({ 'inset-block-end': v }) },
    { values: inset, supportsNegativeValues: true },
  );
  // TW4 renamed TW3's start-*/end-* to inset-s-*/inset-e-* for inline-axis inset
  matchUtilities(
    { 'inset-s': (v) => ({ 'inset-inline-start': v }) },
    { values: inset, supportsNegativeValues: true },
  );
  matchUtilities(
    { 'inset-e': (v) => ({ 'inset-inline-end': v }) },
    { values: inset, supportsNegativeValues: true },
  );
  // block-{n} = block-size (TW3 has no block-{n} utilities, so no collision)
  matchUtilities({ block: (v) => ({ 'block-size': v }) }, { values: sizes });
  // inline-{n} = inline-size (TW3's display utilities are bare `inline`, no -n suffix)
  matchUtilities({ inline: (v) => ({ 'inline-size': v }) }, { values: inlineSizes });
  matchUtilities({ 'min-block': (v) => ({ 'min-block-size': v }) }, { values: sizes });
  matchUtilities({ 'max-block': (v) => ({ 'max-block-size': v }) }, { values: sizes });
  matchUtilities({ 'min-inline': (v) => ({ 'min-inline-size': v }) }, { values: inlineSizes });
  matchUtilities({ 'max-inline': (v) => ({ 'max-inline-size': v }) }, { values: maxWidth });
});

module.exports = {
  darkMode: ['selector', '.dark'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../../packages/shared/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
        display: ['var(--font-fraunces)'],
      },
      colors: {
        // TW3 wraps CSS-variable colors in rgb() for opacity modifiers, producing
        // `rgb(#e1c154 / 0.6)` — invalid when the variable holds a hex string.
        // Function form emits valid rgba() instead. Remove when upgrading to TW4,
        // which uses color-mix() and accepts any valid CSS color format.
        'brand-green': ({ opacityValue }) =>
          opacityValue !== undefined
            ? `rgba(var(--brand-green-rgb),${opacityValue})`
            : 'var(--brand-green)',
        'brand-green-hover': 'var(--brand-green-hover)',
        'brand-gold': ({ opacityValue }) =>
          opacityValue !== undefined
            ? `rgba(var(--brand-gold-rgb),${opacityValue})`
            : 'var(--brand-gold)',
        'brand-gold-hover': 'var(--brand-gold-hover)',
        'brand-parchment': 'var(--brand-parchment)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        info: 'var(--info)',
        error: 'var(--error)',
        warm: {
          50: 'var(--warm-50)',
          100: 'var(--warm-100)',
          200: 'var(--warm-200)',
          300: 'var(--warm-300)',
          400: 'var(--warm-400)',
          500: 'var(--warm-500)',
          600: 'var(--warm-600)',
          700: 'var(--warm-700)',
          800: 'var(--warm-800)',
          900: 'var(--warm-900)',
          950: 'var(--warm-950)',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: 'var(--destructive)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        chart: {
          1: 'var(--chart-1)',
          2: 'var(--chart-2)',
          3: 'var(--chart-3)',
          4: 'var(--chart-4)',
          5: 'var(--chart-5)',
        },
        sidebar: {
          DEFAULT: 'var(--sidebar)',
          foreground: 'var(--sidebar-foreground)',
          primary: 'var(--sidebar-primary)',
          'primary-foreground': 'var(--sidebar-primary-foreground)',
          accent: 'var(--sidebar-accent)',
          'accent-foreground': 'var(--sidebar-accent-foreground)',
          border: 'var(--sidebar-border)',
          ring: 'var(--sidebar-ring)',
        },
      },
      borderRadius: {
        sm: 'calc(var(--radius) * 0.6)',
        md: 'calc(var(--radius) * 0.8)',
        lg: 'var(--radius)',
        xl: 'calc(var(--radius) * 1.4)',
        '2xl': 'calc(var(--radius) * 1.8)',
        '3xl': 'calc(var(--radius) * 2.2)',
        '4xl': 'calc(var(--radius) * 2.6)',
      },
      boxShadow: {
        'on-light': 'var(--shadow-on-light)',
        'on-dark': 'var(--shadow-on-dark)',
        card: 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
      },
      // TW4 extends the spacing scale beyond TW3's default 96 cap
      spacing: {
        130: '32.5rem',
        140: '35rem',
        150: '37.5rem',
      },
      // TW4 includes fifth-fractions in translate; TW3 only ships halves/quarters
      translate: {
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
      },
    },
  },
  plugins: [logicalPlugin],
};
