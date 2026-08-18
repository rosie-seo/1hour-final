import type { Metadata } from "next"

import { ReviewHub, type ReviewFilter } from "@/components/classroom/review-hub"
import { ClassroomShell } from "@/components/mypage/classroom-shell"

export const metadata: Metadata = {
  title: "복습하기",
}

const VALID_FILTERS: ReviewFilter[] = ["all", "wrong", "correct", "bookmarked"]

export default async function ReviewPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; episode?: string }>
}) {
  const { filter, episode } = await searchParams
  const initialFilter = VALID_FILTERS.includes(filter as ReviewFilter)
    ? (filter as ReviewFilter)
    : "all"

  return (
    <ClassroomShell
      title="복습하기"
      description="강의에서 배운 단어와 문제를 다시 풀어보며 복습하세요."
    >
      <ReviewHub initialFilter={initialFilter} episodeSlug={episode} />
    </ClassroomShell>
  )
}
