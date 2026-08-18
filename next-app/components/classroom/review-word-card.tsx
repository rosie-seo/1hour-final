import { Bookmark, Check, X } from "lucide-react"

import { cn } from "@/lib/utils"
import type { ReviewWord } from "@/lib/review-data"

export function ReviewWordCard({
  item,
  bookmarked,
  onToggleBookmark,
}: {
  item: ReviewWord
  bookmarked: boolean
  onToggleBookmark: () => void
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-primary">
          {item.source}
        </span>
        <span className="text-xs text-muted-foreground tabular-nums">
          {item.date}
        </span>
      </div>

      <div>
        <p className="font-heading text-base font-bold">{item.word}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{item.meaning}</p>
      </div>

      <div className="flex items-center justify-between">
        {item.correct ? (
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
        <button
          type="button"
          onClick={onToggleBookmark}
          aria-pressed={bookmarked}
          className="flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <span className="sr-only">북마크</span>
          <Bookmark
            className={cn("size-4", bookmarked && "fill-primary text-primary")}
            aria-hidden
          />
        </button>
      </div>
    </div>
  )
}
