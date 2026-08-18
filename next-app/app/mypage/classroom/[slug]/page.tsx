import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft, Lock, Sparkles } from "lucide-react"

import { LessonStage } from "@/components/classroom/lesson-stage"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { course } from "@/lib/course-data"
import {
  currentStep,
  episodes,
  findEpisode,
  isComplete,
  isUnlocked,
  nextEpisode,
  previousEpisode,
  weekOf,
} from "@/lib/study-data"

export const metadata: Metadata = {
  title: "수강하기",
}

export function generateStaticParams() {
  return episodes.map((episode) => ({ slug: episode.slug }))
}

export default async function LessonPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ step?: string }>
}) {
  const { slug } = await params
  const { step } = await searchParams

  const episode = findEpisode(slug)
  if (!episode) notFound()

  const week = weekOf(episode)
  const unlocked = isUnlocked(episode)
  const prev = previousEpisode(episode)
  const next = nextEpisode(episode)
  const complete = isComplete(episode)

  const active =
    episode.steps.find((item) => item.id === step) ?? currentStep(episode)

  return (
    <div className="flex min-h-svh flex-col bg-muted/30">
      <header className="flex items-center gap-3 border-b border-border bg-card px-4 py-3">
        <Button
          variant="ghost"
          size="icon-sm"
          render={<Link href="/mypage/classroom" />}
          nativeButton={false}
        >
          <ArrowLeft />
          <span className="sr-only">내 강의장으로</span>
        </Button>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold">{course.title}</p>
          <p className="truncate text-xs text-muted-foreground">
            {week.label} · {episode.label} · {episode.title}
          </p>
        </div>
      </header>

      {complete && unlocked && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-primary/[0.07] px-4 py-3">
          <p className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Sparkles className="size-4" aria-hidden />
            {episode.label} 완주했어요
          </p>
          <Link
            href={`/mypage/classroom/${episode.slug}/complete`}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            완주 기록 보기
          </Link>
        </div>
      )}

      {unlocked ? (
        <LessonStage
          episodes={week.episodes}
          episode={episode}
          active={active}
          prev={prev}
          next={next}
        />
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-24 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-muted">
            <Lock className="size-5 text-muted-foreground" aria-hidden />
          </span>
          <p className="font-heading text-lg font-bold">
            아직 열리지 않은 에피소드예요
          </p>
          <p className="text-sm text-muted-foreground">
            {prev?.title}을(를) 완주하면 {episode.title}이(가) 열려요.
          </p>
          {prev && (
            <Link
              href={`/mypage/classroom/${prev.slug}`}
              className={cn(buttonVariants({ size: "lg" }), "mt-2")}
            >
              {prev.title} 이어서 학습
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
