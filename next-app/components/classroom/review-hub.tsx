"use client"

import { useState } from "react"
import Link from "next/link"
import { PlayCircle, X } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { ReviewProblemCard } from "@/components/classroom/review-problem-card"
import { ReviewWordCard } from "@/components/classroom/review-word-card"
import { cn } from "@/lib/utils"
import { reviewProblems, reviewWords } from "@/lib/review-data"
import { findEpisode } from "@/lib/study-data"

const TABS = ["복습 퀴즈", "단어장"] as const

export type ReviewFilter = "all" | "wrong" | "correct" | "bookmarked"

const FILTERS: { key: ReviewFilter; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "wrong", label: "오답만" },
  { key: "correct", label: "정답만" },
  { key: "bookmarked", label: "북마크만" },
]

const initialBookmarks = new Set(
  [...reviewProblems, ...reviewWords]
    .filter((item) => item.bookmarked)
    .map((item) => item.id)
)

/** 강의에서 틀렸거나 맞힌 단어 · 문제를 모아 다시 볼 수 있게 한다 */
export function ReviewHub({
  initialFilter = "all",
  episodeSlug,
}: {
  initialFilter?: ReviewFilter
  /** 완주 화면 등에서 특정 콘텐츠의 복습만 보고 싶을 때 */
  episodeSlug?: string
}) {
  const [tab, setTab] = useState<(typeof TABS)[number]>(TABS[0])
  const [filter, setFilter] = useState<ReviewFilter>(initialFilter)
  const [bookmarks, setBookmarks] = useState(initialBookmarks)

  const toggleBookmark = (id: string) =>
    setBookmarks((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const totalCount = reviewProblems.length + reviewWords.length
  const wrongCount =
    reviewProblems.filter((p) => !p.correct).length +
    reviewWords.filter((w) => !w.correct).length

  const episode = episodeSlug ? findEpisode(episodeSlug) : undefined

  const matches = (item: {
    id: string
    episodeSlug: string
    correct: boolean
  }) => {
    if (episodeSlug && item.episodeSlug !== episodeSlug) return false
    if (filter === "wrong") return !item.correct
    if (filter === "correct") return item.correct
    if (filter === "bookmarked") return bookmarks.has(item.id)
    return true
  }

  const filteredProblems = reviewProblems.filter(matches)
  const filteredWords = reviewWords.filter(matches)

  const activeItems = tab === "복습 퀴즈" ? filteredProblems : filteredWords

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
        <p className="text-sm font-semibold text-primary">{totalCount}개 문제</p>
        <h2 className="mt-1 font-heading text-xl font-black tracking-tight">
          복습을 시작해 볼까요?
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          강의에서 틀린 문제 {wrongCount}개를 포함해, 다시 보면 좋은 단어와
          문제를 모아뒀어요.
        </p>
        <a
          href="#review-list"
          className={cn(buttonVariants({ size: "lg" }), "mt-4")}
        >
          <PlayCircle data-icon="inline-start" />
          복습 퀴즈 시작하기
        </a>
      </section>

      <div id="review-list">
        {episode && (
          <div className="mb-4 flex items-center justify-between gap-3 rounded-xl bg-muted/60 px-4 py-2.5 text-sm">
            <span>
              <span className="font-semibold">
                {episode.label} · {episode.title}
              </span>
              에서 나온 항목만 보는 중이에요.
            </span>
            <Link
              href="/mypage/classroom/review"
              className="flex shrink-0 items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              <X className="size-3.5" aria-hidden />
              전체 보기
            </Link>
          </div>
        )}

        <div className="flex gap-5 border-b border-border">
          {TABS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              aria-current={tab === item ? "page" : undefined}
              className={cn(
                "relative pb-2.5 text-sm font-bold transition-colors",
                tab === item
                  ? "text-foreground after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {FILTERS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setFilter(item.key)}
              aria-pressed={filter === item.key}
              className={cn(
                "h-8 rounded-full border px-3 text-xs font-medium transition-colors",
                filter === item.key
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:bg-muted"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {tab === "복습 퀴즈"
            ? filteredProblems.map((problem) => (
                <ReviewProblemCard
                  key={problem.id}
                  problem={problem}
                  bookmarked={bookmarks.has(problem.id)}
                  onToggleBookmark={() => toggleBookmark(problem.id)}
                />
              ))
            : filteredWords.map((word) => (
                <ReviewWordCard
                  key={word.id}
                  item={word}
                  bookmarked={bookmarks.has(word.id)}
                  onToggleBookmark={() => toggleBookmark(word.id)}
                />
              ))}
        </div>

        {activeItems.length === 0 && (
          <p className="mt-8 text-center text-sm text-muted-foreground">
            해당하는 항목이 없어요.
          </p>
        )}
      </div>
    </div>
  )
}
