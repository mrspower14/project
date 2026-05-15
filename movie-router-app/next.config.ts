import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,

  //image 외부에서 가져올경우 설정 필요 
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'file.koreafilm.or.kr'
      },
    ],
  }, 
  //fetch 시 cache 사용 테스트 
  logging: {
    fetches: {
      fullUrl: true,
    }
  }

};

export default nextConfig;
