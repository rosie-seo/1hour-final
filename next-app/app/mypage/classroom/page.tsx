import type { Metadata } from "next"

import { ClassroomGrid } from "@/components/mypage/classroom-grid"
import { MyPageShell } from "@/components/mypage/mypage-shell"
import { myClassroom } from "@/lib/course-data"

export const metadata: Metadata = {
  title: "나의 강의장",
}

export default function ClassroomPage() {
  return (
    <MyPageShell
      title="나의 강의장"
      description="구매한 강의를 이어서 학습하세요."
    >
      <ClassroomGrid items={myClassroom} />
    </MyPageShell>
  )
}
