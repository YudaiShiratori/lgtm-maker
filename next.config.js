/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import './src/env.js';

/** @type {import("next").NextConfig} */
const config = {
  serverExternalPackages: ['@resvg/resvg-js', 'sharp'],
  webpack: (webpackConfig, { isServer }) => {
    if (isServer) {
      // Native binary modules should be externalized on server
      webpackConfig.externals.push({
        '@resvg/resvg-js': 'commonjs @resvg/resvg-js',
        sharp: 'commonjs sharp',
      });
    }
    return webpackConfig;
  },
};

export default config;
