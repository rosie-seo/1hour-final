import type { Metadata } from "next"

import { LearningAnalytics } from "@/components/mypage/learning-analytics"
import { MyPageShell } from "@/components/mypage/mypage-shell"
import { TodayTask } from "@/components/mypage/today-task"

export const metadata: Metadata = {
  title: "학습 분석",
}

/**
 * 마이페이지 첫 화면 = 학습 분석.
 *
 * 진입하자마자 두 가지에 답한다.
 * ① 오늘 뭘 해야 하나 (최상단 카드, 1클릭 진입)
 * ② 내 실력이 어디쯤이고 얼마나 꾸준했나 (학습 분석)
 * 강의 목록은 사이드바의 '내 강의장'이 맡으므로 여기서 반복하지 않는다.
 */
export default function MyPage() {
  return (
    <MyPageShell
      title="학습 분석"
      description="오늘 할 학습과 지금까지의 기록을 한 곳에서 확인하세요."
    >
      <div className="flex flex-col gap-8">
        <TodayTask />
        <LearningAnalytics />
      </div>
    </MyPageShell>
  )
}
