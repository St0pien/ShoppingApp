/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/lists',
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
