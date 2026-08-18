"use client"

import { AlertCircle, Bookmark, Check, X } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import type { ReviewProblem } from "@/lib/review-data"

function BookmarkToggle({
  active,
  onToggle,
}: {
  active: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      className="flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      <span className="sr-only">북마크</span>
      <Bookmark
        className={cn("size-4", active && "fill-primary text-primary")}
        aria-hidden
      />
    </button>
  )
}

export function ReviewProblemCard({
  problem,
  bookmarked,
  onToggleBookmark,
}: {
  problem: ReviewProblem
  bookmarked: boolean
  onToggleBookmark: () => void
}) {
  return (
    <Dialog>
      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-primary">
            {problem.source}
          </span>
          <span className="text-xs text-muted-foreground tabular-nums">
            {problem.date}
          </span>
        </div>

        <DialogTrigger className="text-left">
          <p className="line-clamp-2 text-sm leading-relaxed">
            {problem.prompt}
          </p>
        </DialogTrigger>

        <div className="flex items-center justify-between">
          {problem.correct ? (
            <span className="flex items-center gap-1 text-xs font-semibold text-primary">
              <Check className="size-3.5" aria-hidden />
              정답
            </span>
          ) : (
            <span className="flex items-center gap-1 text-xs font-semibold text-destructive">
              <X className="size-3.5" aria-hidden />
              오답
            </span>
          )}
          <BookmarkToggle active={bookmarked} onToggle={onToggleBookmark} />
        </div>
      </div>

      <DialogContent className="max-h-[85vh] gap-5 overflow-y-auto p-6 sm:max-w-lg sm:p-8">
        {!problem.correct && (
          <div className="-mx-6 -mt-6 flex items-start gap-2 bg-destructive/10 px-6 py-3 text-sm text-destructive sm:-mx-8 sm:-mt-8 sm:px-8">
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
            <p>
              틀렸지만 괜찮아요. {problem.source.split(" · ").pop()} 유형은
              계속 나올 거예요.
            </p>
          </div>
        )}

        <DialogHeader>
          <DialogTitle>복습하기</DialogTitle>
          <DialogDescription>{problem.translation}</DialogDescription>
        </DialogHeader>

        <p className="text-sm leading-relaxed">
          {problem.prompt.split(problem.blank).map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <span className="font-bold text-primary">
                  {
                    problem.choices.find((c) => c.correct)?.text
                  }
                </span>
              )}
            </span>
          ))}
        </p>

        <ul className="flex flex-col gap-2">
          {problem.choices.map((choice) => {
            const isUserChoice = choice.key === problem.userChoiceKey
            const wrongPick = isUserChoice && !choice.correct
            return (
              <li
                key={choice.key}
                className={cn(
                  "flex items-center gap-3 rounded-xl border px-3 py-2.5",
                  choice.correct
                    ? "border-primary/40 bg-primary/5"
                    : wrongPick
                      ? "border-destructive/40 bg-destructive/5"
                      : "border-border"
                )}
              >
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                    choice.correct
                      ? "bg-primary text-primary-foreground"
                      : wrongPick
                        ? "bg-destructive text-white"
                        : "bg-muted text-muted-foreground"
                  )}
                >
                  {choice.correct ? (
                    <Check className="size-3.5" aria-hidden />
                  ) : wrongPick ? (
                    <X className="size-3.5" aria-hidden />
                  ) : (
                    choice.key
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      "block text-sm font-medium",
                      choice.correct && "text-primary",
                      wrongPick && "text-destructive"
                    )}
                  >
                    {choice.text}
                  </span>
                  <span className="block text-[11px] text-muted-foreground tabular-nums">
                    상위 800점대의 {choice.peerPercent}%가 선택
                  </span>
                </span>
              </li>
            )
          })}
        </ul>

        <div>
          <h3 className="text-sm font-bold">어휘</h3>
          <ul className="mt-2 flex flex-col gap-1">
            {problem.vocab.map((item) => (
              <li key={item.word} className="text-sm">
                <span className="font-semibold">{item.word}</span>
                <span className="text-muted-foreground"> · {item.meaning}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold">해설</h3>
          <ol className="mt-2 flex flex-col gap-1.5">
            {problem.explanation.map((line, i) => (
              <li key={i} className="text-sm leading-relaxed text-foreground/90">
                {i + 1}. {line}
              </li>
            ))}
          </ol>
        </div>

        {problem.wrongAnalysis.length > 0 && (
          <div>
            <h3 className="text-sm font-bold">오답 분석</h3>
            <ul className="mt-2 flex flex-col gap-1.5">
              {problem.wrongAnalysis.map((item) => (
                <li
                  key={item.key}
                  className="text-sm leading-relaxed text-muted-foreground"
                >
                  ({item.key}) {item.text}
                </li>
              ))}
            </ul>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
