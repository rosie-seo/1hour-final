"use client"

import { useState } from "react"

import { accuracyByType } from "@/lib/analytics-data"
import { cn } from "@/lib/utils"

const MAX = 100
const HEIGHT = 160

/**
 * 학습 유형별 정답률 그룹 막대.
 *
 * 두 계열이지만 색은 accent(내 실력) + 회색(비교군) 한 쌍 — 비교군은 배경이다.
 * accent가 밝은 편이라 모든 막대에 값 라벨을 직접 붙여 색에 기대지 않는다.
 */
export function AccuracyBars() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <figure>
      <div className="flex items-end gap-3" style={{ height: HEIGHT }}>
        {accuracyByType.map((group) => {
          const active = hovered === group.label
          return (
            <div
              key={group.label}
              className="relative flex h-full flex-1 flex-col justify-end"
              onMouseEnter={() => setHovered(group.label)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(group.label)}
              onBlur={() => setHovered(null)}
              tabIndex={0}
            >
              {active && (
                <div className="absolute -top-2 left-1/2 z-10 w-max -translate-x-1/2 rounded-lg bg-foreground px-2.5 py-1.5 text-xs text-background shadow">
                  <p className="font-semibold">{group.label}</p>
                  <p className="mt-0.5 tabular-nums">
                    내 실력 {group.mine}% · 상위 10% {group.peer}%
                  </p>
                </div>
              )}

              {/* 막대 사이 2px 간격을 유지해 인접 채움이 붙어 보이지 않게 한다 */}
              <div className="flex h-full items-end justify-center gap-0.5">
                <div className="flex h-full w-1/2 flex-col justify-end">
                  <span className="mb-1 text-center text-[11px] font-bold text-primary tabular-nums">
                    {group.mine}
                  </span>
                  <div
                    className={cn(
                      "rounded-t bg-primary transition-opacity",
                      hovered && !active && "opacity-50"
                    )}
                    style={{ height: `${(group.mine / MAX) * 100}%` }}
                  />
                </div>
                <div className="flex h-full w-1/2 flex-col justify-end">
                  <span className="mb-1 text-center text-[11px] text-muted-foreground tabular-nums">
                    {group.peer}
                  </span>
                  <div
                    className={cn(
                      "rounded-t bg-muted-foreground/70 transition-opacity",
                      hovered && !active && "opacity-50"
                    )}
                    style={{ height: `${(group.peer / MAX) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-2 flex gap-3 border-t border-border pt-2">
        {accuracyByType.map((group) => (
          <span
            key={group.label}
            className="flex-1 text-center text-xs text-muted-foreground"
          >
            {group.label}
          </span>
        ))}
      </div>

      <figcaption className="mt-3 flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-sm bg-primary" aria-hidden />내 실력
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="size-2 rounded-sm bg-muted-foreground/70"
            aria-hidden
          />
          상위 10%
        </span>
      </figcaption>

      {/* 색을 못 보거나 스크린리더로 읽는 경우를 위한 표 */}
      <table className="sr-only">
        <caption>학습 유형별 정답률</caption>
        <thead>
          <tr>
            <th>유형</th>
            <th>내 실력</th>
            <th>상위 10%</th>
          </tr>
        </thead>
        <tbody>
          {accuracyByType.map((group) => (
            <tr key={group.label}>
              <th>{group.label}</th>
              <td>{group.mine}%</td>
              <td>{group.peer}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  )
}
