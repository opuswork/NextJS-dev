/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  redirects() {
    return [
      {
        // 리다이렉트 시킬 주소
        source: "/items/:id",
        // 이동시킬 주소
        destination: "/products/:id",
        permanent: true,
      },
    ];
  },

   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'learn-codeit-kr-static.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/codeitmall/**',
      },
    ],
  },
};

export default nextConfig;