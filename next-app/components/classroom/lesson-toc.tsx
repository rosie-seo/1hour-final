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
                  episode.no
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
              <ul className="border-t border-border">
                {episode.steps.map((step) => {
                  const active = step.id === activeStepId
                  return (
                    <li key={step.id}>
                      <Link
                        href={`/mypage/classroom/${episode.slug}?step=${step.id}`}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-2.5 px-3 py-2.5 transition-colors",
                          active
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-muted/60"
                        )}
                      >
                        <StepIcon status={step.status} />
                        <span
                          className={cn(
                            "min-w-0 flex-1 truncate text-sm",
                            active && "font-semibold"
                          )}
                        >
                          {step.title}
                        </span>
                        <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                          {step.duration}
                        </span>
                      </Link>
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
