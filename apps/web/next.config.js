const { withGluestackUI } = require('@gluestack/ui-next-adapter');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: ['@infusethink/shared', 'react-native-css-interop'],
};

module.exports = withGluestackUI(nextConfig);
