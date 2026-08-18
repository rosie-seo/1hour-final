import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/storybook",
        destination: "/storybook/index.html",
        permanent: false,
      },
      // 전체 결제 내역 페이지는 구독 단위 결제 내역으로 대체됐다.
      // 기존 링크·북마크가 404로 떨어지지 않도록 구독 관리로 보낸다.
      {
        source: "/mypage/payments",
        destination: "/mypage/subscriptions",
        permanent: false,
      },
    ]
  },
}

export default nextConfig
