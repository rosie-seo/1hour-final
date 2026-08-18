import type { Metadata } from "next"

import { WeekCurriculum } from "@/components/classroom/week-curriculum"
import { ClassroomShell } from "@/components/mypage/classroom-shell"
import { TodayTask } from "@/components/mypage/today-task"
import { episodes, todayStep, weeks } from "@/lib/study-data"

export const metadata: Metadata = {
  title: "내 강의장",
}

/**
 * 내 강의장 첫 화면.
 *
 * 진입하자마자 두 가지에 답한다.
 * ① 오늘 뭘 해야 하나 (최상단 카드, 1클릭 진입)
 * ② 커리큘럼이 어떻게 생겼나 (클릭해서 들어가지 않고 바로 아래에 펼쳐 보여준다)
 * 지금 수강 중인 강의가 뭔지는 사이드바의 강의 드롭다운이 맡으므로 여기서
 * 반복하지 않는다. 실력 분석 · 학습 현황은 마이페이지 첫 화면이 맡는다.
 */
export default function ClassroomPage() {
  const today = todayStep()
  const activeEpisode = today?.episode ?? episodes[episodes.length - 1]

  return (
    <ClassroomShell
      title="내 강의장"
      description="오늘 할 학습과 커리큘럼을 한 곳에서 확인하세요."
    >
      <div className="flex flex-col gap-8">
        <TodayTask />

        <section id="curriculum" className="scroll-mt-20">
          <h2 className="text-sm font-bold">커리큘럼</h2>
          <div className="mt-3">
            <WeekCurriculum
              weeks={weeks}
              activeEpisodeSlug={activeEpisode.slug}
            />
          </div>
        </section>
      </div>
    </ClassroomShell>
  )
}
