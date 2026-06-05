const { withGluestackUI } = require('@gluestack/ui-next-adapter');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // withGluestackUI auto-discovers these via find-yarn-workspace-root, but that
  // scanner fails when pnpm node-linker=hoisted empties apps/web/node_modules.
  // Declaring them explicitly makes the build independent of scanner behaviour.
  transpilePackages: [
    '@infusethink/shared',
    '@gluestack-ui/core',
    '@gluestack-ui/utils',
    'nativewind',
    'react-native',
    'react-native-css-interop',
    'react-native-safe-area-context',
    'react-native-svg',
    'react-native-web',
  ],
};

module.exports = withGluestackUI(nextConfig);
