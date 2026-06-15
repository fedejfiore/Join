/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  turbopack: {},

  webpack: (config, { isServer, nextRuntime }) => {
    if (isServer && nextRuntime === 'edge') {
      config.node = {
        __dirname: true, // Le provee un contexto seguro de __dirname al bundle del middleware
      };
    }
    return config;
  },
}

module.exports = nextConfig;