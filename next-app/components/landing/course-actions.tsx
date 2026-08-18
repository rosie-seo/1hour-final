"use client"

import { useState } from "react"
import { Check, Heart, Share2 } from "lucide-react"

import { useWishlist } from "@/hooks/use-wishlist"
import { cn } from "@/lib/utils"

/**
 * 히어로 배너 위의 공유 · 찜하기 버튼.
 *
 * 찜 상태는 localStorage에 저장돼 마이페이지 "찜한 강의"와 같은 목록을 본다.
 * 하이드레이션 전에는 항상 빈 하트로 그려지므로 `ready` 이후에만 채워진 상태를 보여준다.
 */
export function CourseActions({
  courseId,
  title,
  className,
}: {
  courseId: string
  title: string
  className?: string
}) {
  const { ready, has, toggle } = useWishlist()
  const wished = ready && has(courseId)
  const [copied, setCopied] = useState(false)

  async function share() {
    const url = window.location.href

    if (navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch (error) {
        // 사용자가 공유 시트를 닫은 경우엔 아무것도 하지 않는다
        if ((error as Error)?.name === "AbortError") return
      }
    }

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // 클립보드 권한이 없으면 조용히 넘어간다
    }
  }

  const buttonClass =
    "flex size-10 items-center justify-center rounded-full bg-black/35 text-white ring-1 ring-white/30 backdrop-blur-sm transition-colors hover:bg-black/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {copied && (
        <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          링크를 복사했어요
        </span>
      )}

      <button type="button" onClick={share} className={buttonClass}>
        <span className="sr-only">공유하기</span>
        {copied ? (
          <Check className="size-5" aria-hidden />
        ) : (
          <Share2 className="size-5" aria-hidden />
        )}
      </button>

      <button
        type="button"
        onClick={() => toggle(courseId)}
        aria-pressed={wished}
        className={buttonClass}
      >
        <span className="sr-only">{wished ? "찜 해제하기" : "찜하기"}</span>
        <Heart
          className={cn(
            "size-5",
            wished && "fill-destructive text-destructive"
          )}
          aria-hidden
        />
      </button>
    </div>
  )
}
