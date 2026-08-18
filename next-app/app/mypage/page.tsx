import type { Metadata } from "next"

import { LearningAnalytics } from "@/components/mypage/learning-analytics"
import { MyPageShell } from "@/components/mypage/mypage-shell"

export const metadata: Metadata = {
  title: "마이페이지",
}

/**
 * 마이페이지 첫 화면 = 학습 분석(실력 분석 · 학습 현황).
 * 계정 · 구독 · 결제 정보는 왼쪽 사이드바 메뉴로 이동한다.
 */
export default function MyPage() {
  return (
    <MyPageShell
      title="마이페이지"
      description="내 실력과 학습 현황을 확인하세요."
    >
      <LearningAnalytics />
    </MyPageShell>
  )
}
