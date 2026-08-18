import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, Flame, Play } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { studyStats } from "@/lib/analytics-data"
import { doneCount, todayStep } from "@/lib/study-data"

/**
 * 오늘의 학습 1개.
 *
 * 이 상품의 이탈은 대부분 "오늘 뭘 해야 하는지 몰라서"와 "시작까지 클릭이 멀어서"
 * 생긴다. 그래서 마이페이지 최상단에서 단계 하나만 가리키고, 한 번의 클릭으로
 * 그 단계의 재생 화면까지 보낸다. 에피소드 목록으로 보내지 않는 것이 핵심이다.
 */
export function TodayTask() {
  const today = todayStep()

  if (!today) {
    return (
      <section className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5">
        <CheckCircle2 className="size-5 text-primary" aria-hidden />
        <p className="text-sm">
          공개된 학습을 모두 끝냈어요. 다음 커리큘럼을 기다려 주세요.
        </p>
      </section>
    )
  }

  const { episode, step, finishesEpisode } = today
  const done = doneCount(episode)
  const progress = (done / episode.steps.length) * 100

  return (
    <section
      className="overflow-hidden rounded-2xl border border-primary/40 bg-card"
      aria-label="오늘의 학습"
    >
      {/* 스트릭은 경고가 아니라 기록이므로 경고색(destructive) 대신 앰버를 쓴다 */}
      <div className="flex items-center gap-2 bg-amber-500/10 px-5 py-2.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
        <Flame className="size-3.5" aria-hidden />
        연속 {studyStats.currentStreak}일째
      </div>

      <div className="flex items-center gap-5 p-5">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-muted-foreground">
            오늘의 학습 · 1단계 · 약 {Number(step.duration.split(":")[0])}분
          </p>
          <p className="mt-1.5 font-heading text-lg font-black">{step.title}</p>
          <p className="mt-1 truncate text-sm text-muted-foreground">
            {episode.label} · {episode.title}
          </p>

          {finishesEpisode && (
            <p className="mt-2 text-xs font-medium text-primary">
              이 단계만 끝내면 {episode.label} 완주예요.
            </p>
          )}

          <div className="mt-4 flex items-center gap-3">
            <div className="h-1.5 w-28 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground tabular-nums">
              {done} / {episode.steps.length}
            </span>
          </div>

          {/* 목록을 거치지 않고 해당 단계로 바로 보낸다 */}
          <Link
            href={`/mypage/classroom/${episode.slug}?step=${step.id}`}
            className={cn(buttonVariants({ size: "lg" }), "mt-4")}
          >
            <Play className="size-4 fill-current" aria-hidden />
            바로 시작하기
          </Link>
        </div>

        <div className="relative hidden h-28 w-28 shrink-0 overflow-hidden rounded-xl sm:block">
          <Image
            src={episode.thumbnail}
            alt=""
            fill
            priority
            sizes="112px"
            className="object-cover"
            style={{ objectPosition: "95% 30%" }}
          />
        </div>
      </div>
    </section>
  )
}
