# infuseth.ink — Frontend Monorepo

pnpm workspace · Turborepo · Next.js 16 (Turbopack) · React 19 · Gluestack UI v3 · React Native Web

## Structure

```
apps/
  web/          Next.js 16 app (Turbopack)
packages/
  shared/       Cross-platform UI components (React Native + Web)
```

## Getting started

```bash
pnpm install
pnpm dev          # all apps
pnpm dev:web      # web only
```

## How Gluestack works here

Gluestack v3 is React Native first. Every component (`Button`, `Text`, `Input`) is built on RN primitives (`Pressable`, `Text`, `View`). On web, `react-native` is aliased to `react-native-web`, which shims those primitives as semantic HTML with full ARIA support.

### The alias chain

```
react-native  →  react-native-web  →  <div>, <span>, <input>, …
```

`withGluestackUI` in `apps/web/next.config.js` sets this alias in Turbopack and Webpack, and adds `.next15.tsx > .web.tsx > .tsx` to `resolveExtensions` so platform overrides are picked up automatically.

### `packages/shared` layout

```
src/components/ui/
  gluestack-ui-provider/
    index.tsx           # native (Expo / RN CLI)
    index.web.tsx       # web / Vite / CRA
    index.next15.tsx    # Next.js 15+ (SSR-aware, injected via resolveExtensions)
    config.ts           # CSS variable tokens via nativewind vars()
    script.ts           # inline script for dark-mode flash prevention
  button/index.tsx      # native impl — resolves to RNW on web via alias
  text/
    index.tsx           # native
    index.web.tsx       # web override (React 19 ref-as-prop)
  input/index.tsx       # native
```

Components are scaffolded by the Gluestack CLI (`npx gluestack-ui init` / `add`) and live in `packages/shared` so they're usable by both mobile and web apps.

### Why `transpilePackages` has manual entries

`withGluestackUI` auto-discovers gluestack and react-native packages via `node_modules` scanning, but the scanner uses `find-yarn-workspace-root` which doesn't recognise pnpm workspaces (`pnpm-workspace.yaml` vs `workspaces` in `package.json`). Two workarounds:

1. **Direct deps in `apps/web`** — `@gluestack-ui/core`, `@gluestack-ui/utils`, `react-native`, `react-native-web`, `react-native-svg`, `react-native-safe-area-context` are all listed in `apps/web/package.json` so pnpm places symlinks in `apps/web/node_modules` where the scanner can see them.
2. **Explicit entry** — `react-native-css-interop` (nativewind's JSX runtime, an indirect dep) is added manually to `transpilePackages` in `next.config.js` because it ships a raw JSX expression (`<react-native-css-interop-jsx-pragma-check/>`) that Turbopack must compile.

### Adding new Gluestack components

Run from the monorepo root (uses expect to answer the path prompt):

```bash
cd packages/shared && npx gluestack-ui add <component> --use-pnpm --template-only
```

Or with the `expect` helper that was used during initial setup:

```bash
/tmp/glue_add.exp   # see session history
```

Then export the new component from `packages/shared/src/index.ts`.

## Version snapshot

| Package            | Version |
| ------------------ | ------- |
| Next.js            | 16.2.4  |
| React              | 19.2.4  |
| @gluestack-ui/core | 3.0.21  |
| nativewind         | 4.2.4   |
| react-native-web   | 0.21.2  |
| Turborepo          | 2.9.16  |
| pnpm               | 10.29.3 |

## Not yet installed (optional Gluestack deps)

- `react-native-reanimated` + `react-native-worklets` — needed for animated components (BottomSheet, Modal transitions, Skeleton). Add to both `packages/shared` and `apps/web` when required.
- `@legendapp/motion` — alternative animation layer used by some Gluestack components.
