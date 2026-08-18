"use client"

import { useState } from "react"

import { LessonToc } from "@/components/classroom/lesson-toc"
import { cn } from "@/lib/utils"
import { lessonTabs, type Episode } from "@/lib/study-data"

/**
 * 강의 목차 사이드바 (일반 모드).
 * 넓은화면 모드에서는 이 자리를 아이콘 레일이 대신한다.
 */
export function LessonSidebar({
  episodes,
  activeEpisodeSlug,
  activeStepId,
}: {
  episodes: Episode[]
  activeEpisodeSlug: string
  activeStepId: string
}) {
  const [tab, setTab] = useState<string>(lessonTabs[0])

  return (
    <aside className="flex w-full shrink-0 flex-col border-border lg:w-[360px] lg:border-l">
      <div className="flex gap-4 border-b border-border px-4">
        {lessonTabs.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            aria-current={tab === item ? "true" : undefined}
            className={cn(
              "relative py-3 text-sm font-medium transition-colors",
              tab === item
                ? "text-primary after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item}
          </button>
        ))}
      </div>

      {tab !== lessonTabs[0] ? (
        <p className="px-4 py-16 text-center text-sm text-muted-foreground">
          아직 등록된 내용이 없습니다.
        </p>
      ) : (
        <LessonToc
          episodes={episodes}
          activeEpisodeSlug={activeEpisodeSlug}
          activeStepId={activeStepId}
        />
      )}
    </aside>
  )
}
