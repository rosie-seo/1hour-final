import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Clock, Flame, ListChecks, Lock, Sparkles, Star } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { studyStats } from "@/lib/analytics-data"
import {
  episodeSummary,
  episodes,
  findEpisode,
  nextEpisode,
} from "@/lib/study-data"
import { wrongCountForEpisode } from "@/lib/review-data"

export const metadata: Metadata = {
  title: "에피소드 완주",
}

export function generateStaticParams() {
  return episodes.map((episode) => ({ slug: episode.slug }))
}

/**
 * 에피소드 완주 화면.
 *
 * 마지막 단계(복습 퀴즈)는 가장 어렵고 정답률이 가장 낮은데 끝내도 아무 일도
 * 일어나지 않았다 — 4/5에서 멈추는 이유다. 완주에 세 가지를 붙인다.
 * ① 방금 한 일을 숫자로 되돌려주기 ② 얻은 것 ③ 다음 에피소드 해금.
 */
export default async function EpisodeCompletePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const episode = findEpisode(slug)
  if (!episode) notFound()

  const summary = episodeSummary(episode)
  const next = nextEpisode(episode)
  const wrongCount = wrongCountForEpisode(episode.slug)

  const stats = [
    {
      icon: ListChecks,
      label: "완료 단계",
      value: `${summary.totalSteps}단계`,
    },
    { icon: Star, label: "평균 점수", value: `${summary.avgScore}점` },
    { icon: Clock, label: "학습 시간", value: `${summary.minutes}분` },
  ]

  const rewards = [
    {
      icon: Flame,
      title: `연속 학습 ${studyStats.currentStreak + 1}일`,
      detail: "오늘 학습으로 연속 기록이 이어졌어요.",
    },
    {
      icon: Sparkles,
      title: "챌린지 점수 +12점",
      detail: "완주 · 깊이 점수가 함께 올라갔어요.",
    },
    {
      icon: ListChecks,
      title: "복습 세트 생성",
      detail: "이번 에피소드에서 자주 틀린 표현 3개를 모았어요.",
    },
  ]

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="rounded-2xl border border-primary/40 bg-card p-8 text-center">
          <span className="inline-flex size-14 items-center justify-center rounded-full bg-primary/15">
            <Sparkles className="size-7 text-primary" aria-hidden />
          </span>

          <h1 className="mt-5 font-heading text-2xl font-black tracking-tight">
            {episode.label} 완주!
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {episode.title}
          </p>

          <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-border">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card px-3 py-4">
                <dt className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                  <stat.icon className="size-3.5" aria-hidden />
                  {stat.label}
                </dt>
                <dd className="mt-1 font-heading text-base font-black tabular-nums">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <section className="mt-4 rounded-2xl border border-border bg-card p-5">
          <h2 className="text-sm font-bold">얻은 것</h2>
          <ul className="mt-3 flex flex-col gap-3">
            {rewards.map((reward) => (
              <li key={reward.title} className="flex items-start gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <reward.icon className="size-4 text-primary" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium">
                    {reward.title}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {reward.detail}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {wrongCount > 0 && (
          <section className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-5">
            <div className="min-w-0">
              <p className="text-sm font-bold">오답노트 {wrongCount}개</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                틀린 문제와 단어를 지금 복습하면 더 오래 기억해요.
              </p>
            </div>
            <Link
              href={`/mypage/classroom/review?episode=${episode.slug}&filter=wrong`}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "shrink-0"
              )}
            >
              복습하기
            </Link>
          </section>
        )}

        {next ? (
          <section className="mt-4 overflow-hidden rounded-2xl border border-border bg-card">
            <div className="flex items-center gap-2 bg-primary/10 px-5 py-2.5 text-xs font-semibold text-primary">
              <Lock className="size-3.5" aria-hidden />
              잠금 해제됨
            </div>
            <div className="flex items-center gap-4 p-5">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={next.thumbnail}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground">{next.label}</p>
                <p className="mt-0.5 truncate text-sm font-bold">
                  {next.title}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {next.steps.length}단계 · 내일부터 이어서
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 border-t border-border p-5 sm:flex-row">
              <Link
                href={`/mypage/classroom/${next.slug}`}
                className={cn(buttonVariants({ size: "lg" }), "flex-1")}
              >
                {next.label} 시작하기
              </Link>
              <Link
                href="/mypage/classroom"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "flex-1"
                )}
              >
                오늘은 여기까지
              </Link>
            </div>
          </section>
        ) : (
          <div className="mt-4 rounded-2xl border border-border bg-card p-5 text-center">
            <p className="text-sm">
              공개된 에피소드를 모두 완주했어요. 다음 커리큘럼을 기다려 주세요.
            </p>
            <Link
              href="/mypage/classroom"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "mt-4"
              )}
            >
              내 강의장으로
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
