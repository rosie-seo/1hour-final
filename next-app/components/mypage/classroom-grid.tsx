import Image from "next/image"
import Link from "next/link"
import { Lock, PlayCircle } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { findEpisode, isUnlocked, previousEpisode } from "@/lib/study-data"
import { cn } from "@/lib/utils"

type ClassroomItem = {
  id: string
  slug: string
  title: string
  instructor: string
  studiedAt: string
  purchasedAt: string
  completed: number
  total: number
}

export function ClassroomGrid({
  title,
  items,
}: {
  /** 생략하면 제목 없이 카드만 렌더한다 — 제목을 페이지 레이아웃이 맡는 경우 */
  title?: string
  items: ClassroomItem[]
}) {
  /**
   * 정렬 선택지를 두지 않는다. 에피소드는 앞에서부터 순서대로 열리므로
   * 커리큘럼 순서가 곧 사용자가 따라가야 할 순서다.
   */
  const sorted = [...items].sort((a, b) => a.slug.localeCompare(b.slug))

  return (
    <div>
      {title && (
        <h1 className="font-heading text-2xl font-black tracking-tight">
          {title}
        </h1>
      )}

      <div className={cn("grid gap-5 sm:grid-cols-2", title && "mt-4")}>
        {sorted.map((item) => {
          const percent = Math.round((item.completed / item.total) * 100)
          const episode = findEpisode(item.slug)
          const unlocked = episode ? isUnlocked(episode) : true
          const prev = episode ? previousEpisode(episode) : undefined
          return (
            <div
              key={item.id}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <p className="text-xs text-muted-foreground">
                최근 수강일 {item.studiedAt}
              </p>

              <Link
                href={unlocked ? `/mypage/classroom/${item.slug}` : "#"}
                aria-disabled={!unlocked}
                className={cn(
                  "mt-3 flex gap-4",
                  !unlocked && "pointer-events-none opacity-60"
                )}
              >
                <div className="relative size-20 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src="/hero-kelly-english.png"
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold hover:underline">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.instructor}
                  </p>
                </div>
              </Link>

              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <PlayCircle className="size-4" />
                  {item.completed}/{item.total}
                </span>
                <span className="rounded-md bg-muted px-1.5 py-0.5 font-semibold text-muted-foreground">
                  {percent}%
                </span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${percent}%` }}
                />
              </div>

              {/* 버튼 래퍼를 거치지 않는 순수 링크 — 클릭 시 항상 이동한다 */}
              {unlocked ? (
                <Link
                  href={`/mypage/classroom/${item.slug}`}
                  className={cn(buttonVariants(), "mt-4 w-full")}
                >
                  수강하기
                </Link>
              ) : (
                <p className="mt-4 flex items-center justify-center gap-1.5 rounded-lg bg-muted py-2 text-xs text-muted-foreground">
                  <Lock className="size-3.5" aria-hidden />
                  {prev
                    ? `${prev.label} 완주 후 열려요`
                    : "아직 열리지 않았어요"}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
