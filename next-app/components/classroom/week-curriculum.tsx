"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, ChevronDown, Lock, Play } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  doneCount,
  isComplete,
  isUnlocked,
  isWeekUnlocked,
  previousEpisode,
  weekDoneCount,
  type Episode,
  type Week,
} from "@/lib/study-data"

function EpisodeStatusIcon({
  episode,
  unlocked,
}: {
  episode: Episode
  unlocked: boolean
}) {
  if (!unlocked) return <Lock className="size-3.5 text-muted-foreground/60" aria-hidden />
  if (isComplete(episode))
    return <Check className="size-3.5 text-primary" aria-hidden />
  return <Play className="size-3.5 fill-current" aria-hidden />
}

/** 커리큘럼 전체 개요 — 주(WEEK) 단위 아코디언, 안에 콘텐츠 5개씩 */
export function WeekCurriculum({
  weeks,
  activeEpisodeSlug,
}: {
  weeks: Week[]
  activeEpisodeSlug: string
}) {
  const activeWeekNo =
    weeks.find((week) =>
      week.episodes.some((episode) => episode.slug === activeEpisodeSlug)
    )?.no ?? 1
  const [openWeeks, setOpenWeeks] = useState<number[]>([activeWeekNo])

  const toggle = (no: number) =>
    setOpenWeeks((prev) =>
      prev.includes(no) ? prev.filter((item) => item !== no) : [...prev, no]
    )

  return (
    <div className="flex flex-col gap-3">
      {weeks.map((week) => {
        const unlocked = isWeekUnlocked(week)
        const open = openWeeks.includes(week.no)
        const done = weekDoneCount(week)
        const prevWeek = weeks[week.no - 2]

        return (
          <div
            key={week.no}
            className={cn(
              "overflow-hidden rounded-2xl border border-border bg-card",
              !unlocked && "opacity-60"
            )}
          >
            <button
              type="button"
              onClick={() => unlocked && toggle(week.no)}
              aria-expanded={unlocked ? open : undefined}
              aria-disabled={!unlocked}
              className={cn(
                "flex w-full items-center gap-3 px-5 py-4 text-left transition-colors",
                unlocked ? "hover:bg-muted/60" : "cursor-not-allowed"
              )}
            >
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold tabular-nums",
                  unlocked
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground/60"
                )}
              >
                {unlocked ? week.no : <Lock className="size-3.5" aria-hidden />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold">
                  {week.label} · {week.theme}
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground tabular-nums">
                  {unlocked
                    ? `콘텐츠 ${done} / ${week.episodes.length} 완료`
                    : `${prevWeek?.label} 완주 후 열려요`}
                </span>
              </span>
              {unlocked && (
                <ChevronDown
                  className={cn(
                    "size-4 shrink-0 text-muted-foreground transition-transform",
                    open && "rotate-180"
                  )}
                  aria-hidden
                />
              )}
            </button>

            {unlocked && open && (
              <ul className="border-t border-border">
                {week.episodes.map((episode) => {
                  const episodeUnlocked = isUnlocked(episode)
                  const active = episode.slug === activeEpisodeSlug
                  const prev = previousEpisode(episode)
                  const done = doneCount(episode)

                  return (
                    <li key={episode.slug}>
                      <Link
                        href={
                          episodeUnlocked
                            ? `/mypage/classroom/${episode.slug}`
                            : "#"
                        }
                        aria-disabled={!episodeUnlocked}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-3 px-5 py-3 transition-colors",
                          !episodeUnlocked && "pointer-events-none opacity-60",
                          active ? "bg-primary/10" : "hover:bg-muted/60"
                        )}
                      >
                        <EpisodeStatusIcon
                          episode={episode}
                          unlocked={episodeUnlocked}
                        />
                        <span className="min-w-0 flex-1">
                          <span
                            className={cn(
                              "block text-sm",
                              active && "font-semibold"
                            )}
                          >
                            {episode.label} · {episode.title}
                          </span>
                          {!episodeUnlocked && (
                            <span className="block truncate text-xs text-muted-foreground">
                              {prev?.title} 완주 후 열려요
                            </span>
                          )}
                        </span>
                        {episodeUnlocked && (
                          <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                            {done}/{episode.steps.length}
                          </span>
                        )}
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
