"use client"

import { useState } from "react"
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  calendar,
  calendarLegend,
  periods,
  streakHeadline,
  studyStats,
  type DayMark,
} from "@/lib/analytics-data"

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"]

function buildCells(year: number, month: number) {
  const firstWeekday = new Date(year, month, 1).getDay()
  const days = new Date(year, month + 1, 0).getDate()
  return [
    ...Array<null>(firstWeekday).fill(null),
    ...Array.from({ length: days }, (_, i) => i + 1),
  ]
}

const MARK_CLASS: Record<DayMark, string> = {
  done: "bg-primary text-primary-foreground",
  partial: "border border-primary text-primary",
  recommended: "bg-primary/25 text-primary",
}

function MarkDot({ mark }: { mark: DayMark }) {
  return (
    <span className={cn("size-2 rounded-full", MARK_CLASS[mark])} aria-hidden />
  )
}

/**
 * 학습 현황 탭.
 *
 * 위에서 아래로 "꾸준함(캘린더) → 목표 → 기간별 기록" 순으로 좁혀 읽는다.
 */
export function StudyStatus() {
  const [periodKey, setPeriodKey] = useState(periods[0].key)
  const period = periods.find((item) => item.key === periodKey) ?? periods[0]

  const cells = buildCells(calendar.year, calendar.month)

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="font-heading text-2xl font-black tracking-tight">
          {streakHeadline}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          현재 {studyStats.currentStreak}일 · 최장 {studyStats.longestStreak}일
          · 누적 {studyStats.studyDays}일
        </p>
      </div>

      {/* 캘린더 */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="flex size-7 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <span className="sr-only">이전 달</span>
            <ChevronLeft className="size-4" aria-hidden />
          </button>
          <p className="text-sm font-bold">
            {calendar.year}년 {calendar.month + 1}월
          </p>
          <button
            type="button"
            disabled
            className="flex size-7 items-center justify-center rounded-full text-muted-foreground/40"
          >
            <span className="sr-only">다음 달</span>
            <ChevronRight className="size-4" aria-hidden />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-y-1 text-center text-xs">
          {WEEKDAYS.map((label) => (
            <span key={label} className="py-1 text-muted-foreground">
              {label}
            </span>
          ))}
          {cells.map((day, i) => {
            const mark = day ? calendar.marks[day] : undefined
            const today = day === calendar.today
            return (
              <span key={i} className="flex flex-col items-center gap-1 py-1.5">
                <span
                  className={cn(
                    "tabular-nums",
                    day === null && "invisible",
                    today ? "font-black text-foreground" : "text-foreground/70"
                  )}
                >
                  {day}
                </span>
                {mark ? (
                  <MarkDot mark={mark} />
                ) : (
                  <span className="size-2" aria-hidden />
                )}
              </span>
            )
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
          {calendarLegend.map((item) => (
            <span key={item.mark} className="flex items-center gap-1.5">
              <MarkDot mark={item.mark} />
              {item.label}
            </span>
          ))}
        </div>
      </div>

      {/* 기간별 기록 */}
      <div>
        <div className="flex gap-2">
          {periods.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setPeriodKey(item.key)}
              aria-pressed={item.key === periodKey}
              className={cn(
                "h-8 rounded-lg border px-4 text-sm font-medium transition-colors",
                item.key === periodKey
                  ? "border-primary text-primary"
                  : "border-border text-muted-foreground hover:bg-muted"
              )}
            >
              {item.tab}
            </button>
          ))}
        </div>

        <h4 className="mt-5 font-heading text-lg font-bold">
          {period.heading}
        </h4>
        <p className="mt-1 text-sm text-muted-foreground">{period.range}</p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Clock className="size-5 text-primary" aria-hidden />
            </span>
            <span>
              <span className="block text-xs text-muted-foreground">
                총 학습 시간
              </span>
              <span className="mt-0.5 block font-heading text-base font-black tabular-nums">
                {period.totalTime}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="size-5 text-primary" aria-hidden />
            </span>
            <span>
              <span className="block text-xs text-muted-foreground">
                완료한 학습 단계
              </span>
              <span className="mt-0.5 block font-heading text-base font-black tabular-nums">
                {period.completedSteps}개
              </span>
            </span>
          </div>
        </div>

        <p className="mt-6 text-xs font-semibold text-muted-foreground">
          학습 기록
        </p>

        {period.records.length === 0 ? (
          <div className="mt-2 flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border py-14">
            <FileText className="size-6 text-muted-foreground/60" aria-hidden />
            <p className="text-sm text-muted-foreground">
              학습을 시작해 보세요
            </p>
          </div>
        ) : (
          <ul className="mt-2 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {period.records.map((record) => (
              <li
                key={record.id}
                className="flex flex-wrap items-center gap-x-3 gap-y-1 px-5 py-3.5"
              >
                <span className="w-28 shrink-0 text-xs text-muted-foreground tabular-nums">
                  {record.time}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">
                    {record.title}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {record.detail}
                  </span>
                </span>
                {record.score && (
                  <span className="shrink-0 text-sm font-bold text-primary tabular-nums">
                    {record.score}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
