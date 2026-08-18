"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Bell,
  FileText,
  List,
  Maximize,
  Minimize,
  Play,
  SkipBack,
  SkipForward,
  Wrench,
  X,
} from "lucide-react"

import { LessonSidebar } from "@/components/classroom/lesson-sidebar"
import { LessonToc } from "@/components/classroom/lesson-toc"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Episode, StudyStep } from "@/lib/study-data"

/** 넓은화면에서 오른쪽 레일에 세로로 놓이는 항목들 */
const RAIL = [
  { key: "toc", label: "강의목차", icon: List },
  { key: "materials", label: "강의자료", icon: FileText },
  { key: "notice", label: "공지사항", icon: Bell },
  { key: "tools", label: "학습도구", icon: Wrench },
] as const

type RailKey = (typeof RAIL)[number]["key"]

/**
 * 수강 화면 본체.
 *
 * 넓은화면 모드에서는 영상 외의 모든 것을 오른쪽 아이콘 레일로 접는다.
 * 목차·학습 기록은 사라지는 게 아니라 아이콘 하나로 줄어들고, 눌러야 패널로
 * 다시 나온다 — 영상에 집중하되 언제든 한 번에 되돌아올 수 있게 한다.
 */
export function LessonStage({
  episodes,
  episode,
  active,
  prev,
  next,
}: {
  episodes: Episode[]
  episode: Episode
  active: StudyStep
  prev?: Episode
  next?: Episode
}) {
  const [wide, setWide] = useState(false)
  const [panel, setPanel] = useState<RailKey | null>(null)

  const togglePanel = (key: RailKey) =>
    setPanel((current) => (current === key ? null : key))

  const video = (
    <div
      className={cn(
        "relative w-full bg-black",
        wide ? "aspect-auto flex-1" : "aspect-video"
      )}
    >
      <Image
        src={episode.thumbnail}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-contain opacity-70"
      />
      <button
        type="button"
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="sr-only">{active.title} 재생</span>
        <span className="flex size-16 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur-sm transition-colors hover:bg-white/25">
          <Play className="size-7 fill-white text-white" aria-hidden />
        </span>
      </button>
      <p className="absolute inset-x-0 bottom-6 text-center text-sm font-medium text-white drop-shadow">
        {active.title}
      </p>
    </div>
  )

  const controls = (
    <div className="flex items-center justify-between gap-3 border-b border-border bg-card px-4 py-2.5">
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          disabled={!prev}
          render={
            prev ? <Link href={`/mypage/classroom/${prev.slug}`} /> : undefined
          }
          nativeButton={!prev}
        >
          <SkipBack data-icon="inline-start" />
          이전 코스
        </Button>
        <Button
          variant="ghost"
          size="sm"
          disabled={!next}
          render={
            next ? <Link href={`/mypage/classroom/${next.slug}`} /> : undefined
          }
          nativeButton={!next}
        >
          <SkipForward data-icon="inline-start" />
          다음 코스
        </Button>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          setWide((prevWide) => !prevWide)
          setPanel(null)
        }}
        aria-pressed={wide}
      >
        {wide ? (
          <Minimize data-icon="inline-start" />
        ) : (
          <Maximize data-icon="inline-start" />
        )}
        {wide ? "기본화면" : "넓은화면"}
      </Button>
    </div>
  )

  if (!wide) {
    return (
      <div className="flex flex-1 flex-col lg:flex-row">
        <main className="flex min-w-0 flex-1 flex-col">
          {video}
          {controls}
        </main>

        <LessonSidebar
          episodes={episodes}
          activeEpisodeSlug={episode.slug}
          activeStepId={active.id}
        />
      </div>
    )
  }

  const openItem = RAIL.find((item) => item.key === panel)

  return (
    <div className="relative flex flex-1">
      <main className="flex min-w-0 flex-1 flex-col">
        {video}
        {controls}
      </main>

      {/* 아이콘 레일 — 접힌 요소들이 여기로 모인다 */}
      <nav
        aria-label="학습 도구"
        className="flex w-14 shrink-0 flex-col items-center gap-1 border-l border-border bg-card py-3"
      >
        {RAIL.map((item) => {
          const open = panel === item.key
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => togglePanel(item.key)}
              aria-pressed={open}
              title={item.label}
              className={cn(
                "flex size-10 items-center justify-center rounded-lg transition-colors",
                open
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span className="sr-only">{item.label}</span>
              <item.icon className="size-5" aria-hidden />
            </button>
          )
        })}
      </nav>

      {/* 레일에서 연 패널 — 영상 위로 덮는다 */}
      {openItem && (
        <div className="absolute inset-y-0 right-14 z-10 flex w-full max-w-[380px] flex-col border-l border-border bg-background shadow-xl">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <p className="text-sm font-bold">{openItem.label}</p>
            <button
              type="button"
              onClick={() => setPanel(null)}
              className="flex size-7 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <span className="sr-only">닫기</span>
              <X className="size-4" aria-hidden />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto">
            {panel === "toc" && (
              <LessonToc
                episodes={episodes}
                activeEpisodeSlug={episode.slug}
                activeStepId={active.id}
              />
            )}
            {panel !== "toc" && (
              <p className="px-4 py-16 text-center text-sm text-muted-foreground">
                아직 등록된 내용이 없습니다.
              </p>
            )}
          </div>

          <div className="border-t border-border p-3">
            <button
              type="button"
              onClick={() => {
                setWide(false)
                setPanel(null)
              }}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "w-full"
              )}
            >
              <Minimize data-icon="inline-start" />
              기본화면으로
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
