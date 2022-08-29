module.exports = {
  compiler: {
    styledComponents: {
      ssr: true,
      displayName: true,
      pure: true,
      // namespace: 'theme',
    },
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false, dotenv: false, pluralize: false };
    return config;
  },
  /*
  i18n: {
    localeDetection: true,
    locales: ['en', 'it'],
    defaultLocale: 'en',
  },
  */
  /*
  async rewrites() {
    return [
      {
        source: '/about',
        destination: '/',
      },
    ]
  },
  */
}
