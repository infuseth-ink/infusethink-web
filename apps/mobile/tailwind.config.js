/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  presets: [require('../../packages/shared/tailwind.config.js')],
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    '../../packages/shared/src/**/*.{ts,tsx}',
  ],
};
