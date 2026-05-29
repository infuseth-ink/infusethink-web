/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@infusethink/shared', '@gluestack-ui/core', '@gluestack-ui/utils'],
  turbopack: {
    // Prefer .web.tsx/.web.ts so Next.js resolves platform overrides the same
    // way Metro does for React Native — index.web.tsx wins over index.tsx on web.
    resolveExtensions: [
      '.web.tsx',
      '.web.ts',
      '.web.jsx',
      '.web.js',
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
      '.json',
    ],
  },
};

module.exports = nextConfig;
