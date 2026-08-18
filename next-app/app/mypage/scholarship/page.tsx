import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUp, ChevronRight, Info, Trophy } from "lucide-react"

import { MyPageShell } from "@/components/mypage/mypage-shell"
import { ScholarshipRules } from "@/components/mypage/scholarship-rules"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  bestOpportunity,
  gapToPrize,
  leaderboard,
  myStanding,
  opportunityAction,
  scoreAxes,
  totalEarned,
  totalMax,
} from "@/lib/scholarship-data"

export const metadata: Metadata = {
  title: "장학금 현황",
}

const opportunity = opportunityAction[bestOpportunity.key]

export default function ScholarshipPage() {
  return (
    <MyPageShell
      title="장학금 현황"
      description="1년간의 학습 기록을 1000점으로 환산해 상위 10명에게 장학금을 드려요."
    >
      {/* 내 점수와 순위 */}
      <section className="rounded-2xl border border-primary/40 bg-card p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs text-muted-foreground">현재 순위</p>
            <p className="mt-1 flex items-baseline gap-2">
              <span className="font-heading text-3xl font-black tabular-nums">
                {myStanding.rank}위
              </span>
              <span className="text-sm text-muted-foreground tabular-nums">
                / {myStanding.participants.toLocaleString("ko-KR")}명
              </span>
            </p>
            {myStanding.weeklyRankDelta > 0 && (
              <p className="mt-1 flex items-center gap-1 text-xs font-medium text-primary">
                <ArrowUp className="size-3.5" aria-hidden />
                지난주보다 {myStanding.weeklyRankDelta}계단
              </p>
            )}
          </div>

          <div className="text-right">
            <p className="text-xs text-muted-foreground">챌린지 점수</p>
            <p className="mt-1 font-heading text-3xl font-black text-primary tabular-nums">
              {totalEarned}
              <span className="text-base font-medium text-muted-foreground">
                {" "}
                / {totalMax}
              </span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              남은 기간 {myStanding.daysLeft}일
            </p>
          </div>
        </div>

        <div
          className="mt-4 h-2 overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={totalEarned}
          aria-valuemin={0}
          aria-valuemax={totalMax}
          aria-label="챌린지 점수"
        >
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${(totalEarned / totalMax) * 100}%` }}
          />
        </div>

        <p className="mt-3 text-sm">
          장학금 대상인 <span className="font-bold">10위</span>까지{" "}
          <span className="font-bold text-primary tabular-nums">
            {gapToPrize}점
          </span>{" "}
          남았어요.
        </p>
      </section>

      {/* 지금 올리기 좋은 점수 */}
      <section className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-primary/[0.07] px-5 py-4">
        <div>
          <p className="text-xs font-semibold text-primary">
            지금 올리기 좋은 점수 · {bestOpportunity.label}
          </p>
          <p className="mt-1 text-sm">{opportunity.message}</p>
        </div>
        <Button
          size="sm"
          render={<Link href={opportunity.href} />}
          nativeButton={false}
        >
          {opportunity.cta}
          <ChevronRight data-icon="inline-end" />
        </Button>
      </section>

      {/* 점수 구성 */}
      <section className="mt-8">
        <h2 className="font-heading text-lg font-bold">점수 구성</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          네 가지를 나눠서 봅니다. 한 가지만 잘해서는 상위권에 들 수 없어요.
        </p>

        <ul className="mt-4 flex flex-col gap-4">
          {scoreAxes.map((axis) => {
            const ratio = (axis.earned / axis.max) * 100
            return (
              <li
                key={axis.key}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="font-heading text-base font-bold">
                      {axis.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {axis.question}
                    </span>
                  </div>
                  <span className="font-heading text-sm font-black tabular-nums">
                    {axis.earned}
                    <span className="font-medium text-muted-foreground">
                      {" "}
                      / {axis.max}
                    </span>
                  </span>
                </div>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${ratio}%` }}
                  />
                </div>

                <p className="mt-2 text-xs text-muted-foreground">
                  {axis.evidence}
                </p>
                <p className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground">
                  <Info className="mt-px size-3.5 shrink-0" aria-hidden />
                  {axis.formula}
                </p>
              </li>
            )
          })}
        </ul>
      </section>

      {/* 순위표 */}
      <section className="mt-8">
        <h2 className="font-heading text-lg font-bold">
          장학금 순위{" "}
          <span className="text-sm font-medium text-muted-foreground">
            상위 10명
          </span>
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {myStanding.seasonRange} 기준 · 매주 월요일 갱신
        </p>

        <div className="mt-4 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {leaderboard.map((row) => (
            <div key={row.rank} className="flex items-center gap-3 px-5 py-3.5">
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold tabular-nums",
                  row.rank <= 3
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {row.rank}
              </span>
              <span className="min-w-0 flex-1 text-sm font-medium">
                {row.name}
              </span>
              <span className="shrink-0 text-sm text-muted-foreground tabular-nums">
                {row.score}점
              </span>
              {row.prize && (
                <Badge variant="outline" className="shrink-0 gap-1">
                  <Trophy className="size-3" aria-hidden />
                  {row.prize}
                </Badge>
              )}
            </div>
          ))}

          {/* 내 위치 — 10위 밖이라도 어디쯤인지 항상 보여준다 */}
          <div className="flex items-center gap-3 bg-primary/[0.07] px-5 py-3.5">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground tabular-nums">
              {myStanding.rank}
            </span>
            <span className="min-w-0 flex-1 text-sm font-bold">
              {myStanding.name} (나)
            </span>
            <span className="shrink-0 text-sm font-bold text-primary tabular-nums">
              {totalEarned}점
            </span>
          </div>
        </div>
      </section>

      {/* 평가 기준 */}
      <section className="mt-8">
        <h2 className="font-heading text-lg font-bold">평가 기준</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          상금이 걸린 만큼 계산 방식과 운영 규칙을 모두 공개합니다.
        </p>
        <div className="mt-3">
          <ScholarshipRules />
        </div>
      </section>
    </MyPageShell>
  )
}
