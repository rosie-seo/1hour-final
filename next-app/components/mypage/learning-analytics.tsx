"use client"

import { useState } from "react"

import { AccuracyBars } from "@/components/mypage/analytics/accuracy-bars"
import { ScoreDonut } from "@/components/mypage/analytics/score-donut"
import { SkillRadar } from "@/components/mypage/analytics/skill-radar"
import { StudyStatus } from "@/components/mypage/analytics/study-status"
import { WeakPoints } from "@/components/mypage/analytics/weak-points"
import { cn } from "@/lib/utils"
import { analyticsUser, skillIntro } from "@/lib/analytics-data"

const TABS = ["실력 분석", "학습 현황"] as const

function AnalysisCard({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <h4 className="font-heading text-base font-bold">{title}</h4>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <div className="mt-6">{children}</div>
    </section>
  )
}

/**
 * 학습 분석.
 *
 * "내 실력이 어느 수준인가(실력 분석)"와 "얼마나 꾸준히 했나(학습 현황)"는
 * 답하는 질문이 달라 탭으로 나눈다.
 */
export function LearningAnalytics() {
  const [tab, setTab] = useState<(typeof TABS)[number]>(TABS[0])

  return (
    <div>
      <div className="flex gap-5 border-b border-border">
        {TABS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            aria-current={tab === item ? "page" : undefined}
            className={cn(
              "relative pb-2.5 text-sm font-bold transition-colors",
              tab === item
                ? "text-foreground after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item}
          </button>
        ))}
      </div>

      {tab === "실력 분석" ? (
        <div className="mt-8 flex flex-col gap-8">
          {/* 히어로 */}
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
            <h3 className="font-heading text-2xl font-black tracking-tight">
              {analyticsUser.name}님의
              <br />
              스피킹 예측 점수
            </h3>
            <ScoreDonut />
          </div>

          <div className="rounded-2xl bg-muted/50 p-5">
            <h4 className="font-heading text-base font-bold">실력 분석 결과</h4>
            <p className="mt-2 text-sm text-muted-foreground">{skillIntro}</p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <AnalysisCard
              title="영역별 실력"
              description="5개 영역으로 실력을 측정합니다. 그래프는 나와 상위 10% 학습자의 정답률 차이입니다."
            >
              <SkillRadar />
            </AnalysisCard>

            <AnalysisCard
              title="학습 유형별 정답률"
              description="나와 상위 10% 학습자의 학습 유형별 정답률 차이입니다."
            >
              <AccuracyBars />
            </AnalysisCard>

            <AnalysisCard
              title="취약한 표현"
              description="나와 상위 10% 학습자의 정답률 차이가 큰 표현입니다."
            >
              <WeakPoints />
            </AnalysisCard>
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <StudyStatus />
        </div>
      )}
    </div>
  )
}
