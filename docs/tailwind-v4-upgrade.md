# Tailwind v4 Re-upgrade Guide

Tailwind was temporarily downgraded from v4 → v3 in `f8c0f07` because
NativeWind v4 (used by Gluestack UI v3) only supports TW3.
NativeWind v5 will support TW4, at which point this migration applies.

Track: https://github.com/gluestack/gluestack-ui/issues (NativeWind v5 / Gluestack v5 milestone)

---

## What changed in the TW3 era (things to undo)

### `apps/web/tailwind.config.js`

The entire file was created for TW3. Delete it on upgrade — TW4 uses CSS config.

Key things it contains that need to be carried forward into TW4's `@theme` block:

- Custom spacing values: `130: 32.5rem`, `140: 35rem`, `150: 37.5rem`
- `translate` fifths: `1/5 … 4/5` (TW4 includes these by default — verify before adding)
- All the `theme.extend` values (colors, borderRadius, boxShadow, fontFamily)
- The `logicalPlugin` — **delete entirely**, TW4 has all of these built-in

### `apps/web/postcss.config.js`

Delete. Replace with `apps/web/postcss.config.mjs` (TW4 style):

```js
// TW4 baseline at: git show 5e8496e:apps/web/postcss.config.mjs
export default { plugins: { '@tailwindcss/postcss': {} } };
```

### `apps/web/app/globals.css`

The TW4 baseline is at:

```
git show 5e8496e:apps/web/app/globals.css
```

Key differences vs the current TW3 version:

- `@import 'tailwindcss'` replaces `@tailwind base/components/utilities`
- `@theme inline { … }` block maps brand vars to TW4 utility tokens
- `@custom-variant dark (&:is(.dark *))` replaces `darkMode: ['selector', '.dark']`
- `outline-ring/50` in `* { … }` (TW4 shorthand) replaces `outline-color: var(--ring)`

---

## Step-by-step

```bash
# 1. Upgrade NativeWind and Gluestack first
pnpm add nativewind@^5 @gluestack-ui/core@^5 --filter @infusethink/shared

# 2. Upgrade Tailwind in the web app
pnpm add tailwindcss@^4 @tailwindcss/postcss --filter infusethink-web
pnpm remove autoprefixer postcss-import --filter infusethink-web

# 3. Restore TW4 PostCSS config
# Copy from: git show 5e8496e:apps/web/postcss.config.mjs
# Rename to: apps/web/postcss.config.mjs (delete postcss.config.js)

# 4. Restore TW4 globals.css
# Copy from: git show 5e8496e:apps/web/app/globals.css
# Re-apply any brand-palette additions made after that commit

# 5. Delete tailwind.config.js
rm apps/web/tailwind.config.js

# 6. Test
pnpm dev:web
```

---

## What does NOT need to change

- Every component file (`HeroSection.tsx`, `Navbar.tsx`, etc.) — the class names
  `pbs-*`, `block-*`, `inset-e-*`, `max-inline-*` etc. are identical in TW4.
  The `logicalPlugin` was a shim; TW4's built-ins take over transparently.
- `apps/web/next.config.js` — `withGluestackUI` is version-agnostic.
- `packages/shared/` — update Gluestack/NativeWind deps and re-run the CLI
  to rescaffold components for v5 (same `gluestack-ui add` workflow).

---

## Reference commits

| Commit    | Description                                                |
| --------- | ---------------------------------------------------------- |
| `5e8496e` | Last TW4 state (postcss.config.mjs + globals.css baseline) |
| `f8c0f07` | TW4 → TW3 downgrade (what this guide undoes)               |
| `fe9ea3f` | Added logicalPlugin (TW4 polyfill, delete on upgrade)      |
| `629c36f` | Added translate fifths (verify if still needed in TW4)     |
| `fdf6846` | Added inset-e/inset-s to plugin (TW4 has these built-in)   |
