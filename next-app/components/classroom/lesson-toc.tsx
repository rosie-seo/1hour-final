"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, ChevronDown, Lock, Play } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  doneCount,
  isUnlocked,
  previousEpisode,
  type Episode,
  type StudyStep,
} from "@/lib/study-data"

function StepIcon({ status }: { status: StudyStep["status"] }) {
  if (status === "done")
    return <Check className="size-3.5 text-primary" aria-hidden />
  if (status === "current")
    return <Play className="size-3.5 fill-current" aria-hidden />
  return <Lock className="size-3.5 text-muted-foreground/60" aria-hidden />
}

/**
 * 에피소드 목차.
 *
 * "다음에 뭘 하지"(목차)와 "방금 뭘 했고 몇 점이었나"(학습 기록)를 한 목록에
 * 합친다 — 완료 단계는 점수를, 진행 중/잠긴 단계는 각각 재생 아이콘과
 * 안내 문구를 같은 자리에서 보여준다.
 *
 * 탭 껍데기와 분리해 둔다 — 일반 모드에서는 사이드바 탭 안에,
 * 넓은화면 모드에서는 아이콘 레일이 여는 패널 안에 같은 목차가 들어간다.
 */
export function LessonToc({
  episodes,
  activeEpisodeSlug,
  activeStepId,
}: {
  episodes: Episode[]
  activeEpisodeSlug: string
  activeStepId: string
}) {
  const [openSlugs, setOpenSlugs] = useState<string[]>([activeEpisodeSlug])

  const toggle = (slug: string) =>
    setOpenSlugs((prev) =>
      prev.includes(slug)
        ? prev.filter((item) => item !== slug)
        : [...prev, slug]
    )

  return (
    <div className="flex flex-col gap-2 p-3">
      {episodes.map((episode) => {
        const open = openSlugs.includes(episode.slug)
        const done = doneCount(episode)
        const unlocked = isUnlocked(episode)
        const prev = previousEpisode(episode)

        return (
          <div
            key={episode.slug}
            className={cn(
              "overflow-hidden rounded-xl border border-border bg-card",
              !unlocked && "opacity-60"
            )}
          >
            <button
              type="button"
              onClick={() => unlocked && toggle(episode.slug)}
              aria-expanded={unlocked ? open : undefined}
              aria-disabled={!unlocked}
              className={cn(
                "flex w-full items-start gap-3 px-3 py-3 text-left transition-colors",
                unlocked ? "hover:bg-muted/60" : "cursor-not-allowed"
              )}
            >
              <span
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-md text-xs font-bold tabular-nums",
                  unlocked ? "bg-muted" : "bg-muted text-muted-foreground/60"
                )}
              >
                {unlocked ? (
                  episode.dayInWeek
                ) : (
                  <Lock className="size-3" aria-hidden />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold">
                  {episode.label}
                </span>
                <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                  {episode.title}
                </span>
                <span className="mt-1 block text-xs text-muted-foreground tabular-nums">
                  {unlocked
                    ? `${done} / ${episode.steps.length}`
                    : `${prev?.label} 완주 후 열려요`}
                </span>
              </span>
              {unlocked && (
                <ChevronDown
                  className={cn(
                    "mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform",
                    open && "rotate-180"
                  )}
                  aria-hidden
                />
              )}
            </button>

            {unlocked && open && (
              <ul className="divide-y divide-border border-t border-border">
                {episode.steps.map((step, index) => {
                  const active = step.id === activeStepId
                  const last = index === episode.steps.length - 1
                  const locked = step.status === "todo"
                  const href = locked
                    ? undefined
                    : step.status === "current" && last
                      ? `/mypage/classroom/${episode.slug}/complete`
                      : `/mypage/classroom/${episode.slug}?step=${step.id}`

                  const content = (
                    <>
                      <StepIcon status={step.status} />
                      <span
                        className={cn(
                          "min-w-0 flex-1 truncate text-sm",
                          active && "font-semibold",
                          locked && "text-muted-foreground"
                        )}
                      >
                        {step.title}
                      </span>
                      <span
                        className={cn(
                          "shrink-0 text-xs tabular-nums",
                          step.status === "current"
                            ? "font-semibold text-primary"
                            : "text-muted-foreground"
                        )}
                      >
                        {locked
                          ? "이전 단계 완료 필요"
                          : step.status === "current"
                            ? "진행하기"
                            : step.score}
                      </span>
                    </>
                  )

                  return (
                    <li key={step.id}>
                      {href ? (
                        <Link
                          href={href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex items-center gap-2.5 px-3 py-2.5 transition-colors",
                            active
                              ? "bg-primary/10 text-primary"
                              : "hover:bg-muted/60"
                          )}
                        >
                          {content}
                        </Link>
                      ) : (
                        <div className="flex items-center gap-2.5 px-3 py-2.5 opacity-60">
                          {content}
                        </div>
                      )}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        )
      })}
    </div>
  )
}
