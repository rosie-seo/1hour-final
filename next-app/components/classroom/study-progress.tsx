"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle2, ChevronUp, FileText } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { studyMode, type Episode, type StepKind } from "@/lib/study-data"

/** 단계 유형별 배지 색 — 목록에서 유형을 색으로 먼저 구분한다 */
const BADGE_CLASS: Record<StepKind, string> = {
  content: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200",
  word: "bg-pink-100 text-pink-900 dark:bg-pink-950 dark:text-pink-200",
  sentence: "bg-sky-100 text-sky-900 dark:bg-sky-950 dark:text-sky-200",
  speaking:
    "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200",
  review:
    "bg-violet-100 text-violet-900 dark:bg-violet-950 dark:text-violet-200",
}

/**
 * 영상 아래 학습 기록 패널.
 *
 * 목차가 "다음에 뭘 하지"라면 여기는 "방금 뭘 했고 몇 점이었나"다.
 * 완료 단계는 점수와 시각을 남기고, 다시 할 수 있는 것만 액션을 노출한다.
 */
export function StudyProgress({ episode }: { episode: Episode }) {
  const [open, setOpen] = useState(true)

  return (
    <section className="rounded-2xl border border-border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
        <p className="min-w-0 text-xs text-muted-foreground">
          {studyMode.join(" · ")}
        </p>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="rounded-full">
            <FileText data-icon="inline-start" />
            리포트 보기
          </Button>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <span className="sr-only">
              학습 기록 {open ? "접기" : "펼치기"}
            </span>
            <ChevronUp
              className={cn(
                "size-4 transition-transform",
                !open && "rotate-180"
              )}
              aria-hidden
            />
          </button>
        </div>
      </div>

      {open && (
        <ul className="divide-y divide-border border-t border-border">
          {episode.steps.map((step, index) => {
            const done = step.status === "done"
            const last = index === episode.steps.length - 1

            return (
              <li
                key={step.id}
                className={cn(
                  "flex flex-wrap items-center gap-x-3 gap-y-3 px-5 py-4",
                  done ? "bg-muted/40" : "bg-card"
                )}
              >
                <span
                  className={cn(
                    "size-2 shrink-0 rounded-full",
                    done ? "bg-primary" : "bg-muted-foreground/30"
                  )}
                  aria-hidden
                />

                <span
                  className={cn(
                    "shrink-0 rounded-md px-2 py-0.5 text-xs font-medium",
                    BADGE_CLASS[step.kind]
                  )}
                >
                  {step.badge}
                </span>

                <span className="text-sm font-medium">{step.title}</span>

                {step.score && (
                  <span className="shrink-0 rounded-md bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground tabular-nums">
                    {step.score}
                  </span>
                )}

                {step.completedAt && (
                  <span className="text-xs text-muted-foreground tabular-nums">
                    · {step.completedAt}
                  </span>
                )}

                <span className="ml-auto flex shrink-0 items-center gap-2">
                  {done ? (
                    <>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <CheckCircle2 className="size-3.5" aria-hidden />
                        과제 완료
                      </span>
                      {step.retryable && (
                        <Button variant="outline" size="sm">
                          다시하기
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-primary"
                      >
                        {step.kind === "content" ? "다시보기" : "복습하기"}
                      </Button>
                    </>
                  ) : step.status === "current" ? (
                    /* 마지막 단계를 끝내면 완주 화면으로 이어진다 */
                    last ? (
                      <Link
                        href={`/mypage/classroom/${episode.slug}/complete`}
                        className={cn(buttonVariants({ size: "sm" }))}
                      >
                        마지막 단계 학습하기
                      </Link>
                    ) : (
                      <Button size="sm">학습하기</Button>
                    )
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      이전 단계를 먼저 완료해 주세요
                    </span>
                  )}
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
