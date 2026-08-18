"use client"

import { useId } from "react"

import { skillAxes } from "@/lib/analytics-data"

const SIZE = 260
const CX = SIZE / 2
const CY = SIZE / 2 + 6
const R = 84
const RINGS = [20, 40, 60, 80, 100]

function point(index: number, value: number) {
  const angle = (-90 + index * (360 / skillAxes.length)) * (Math.PI / 180)
  const radius = (value / 100) * R
  return {
    x: CX + radius * Math.cos(angle),
    y: CY + radius * Math.sin(angle),
  }
}

function polygon(values: number[]) {
  return values
    .map((value, index) => {
      const p = point(index, value)
      return `${p.x.toFixed(1)},${p.y.toFixed(1)}`
    })
    .join(" ")
}

/**
 * 영역별 실력 레이더.
 *
 * 내 실력이 주인공, 비교군은 배경이므로 accent 면 + 회색 외곽선으로 나눈다.
 * 축 라벨에 두 숫자를 함께 적어 색을 못 봐도 값을 읽을 수 있게 한다.
 */
export function SkillRadar() {
  const titleId = useId()

  const mine = skillAxes.map((axis) => axis.mine)
  const peer = skillAxes.map((axis) => axis.peer)

  return (
    <figure>
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full"
        role="img"
        aria-labelledby={titleId}
      >
        <title id={titleId}>영역별 실력 비교 레이더 차트</title>

        {/* 격자 */}
        {RINGS.map((ring) => (
          <polygon
            key={ring}
            points={polygon(skillAxes.map(() => ring))}
            fill="none"
            stroke="var(--border)"
            strokeWidth={1}
          />
        ))}
        {skillAxes.map((axis, index) => {
          const p = point(index, 100)
          return (
            <line
              key={axis.label}
              x1={CX}
              y1={CY}
              x2={p.x}
              y2={p.y}
              stroke="var(--border)"
              strokeWidth={1}
            />
          )
        })}

        {/* 비교군 */}
        <polygon
          points={polygon(peer)}
          fill="none"
          stroke="var(--muted-foreground)"
          strokeWidth={2}
        />
        {/* 내 실력 */}
        <polygon
          points={polygon(mine)}
          fill="var(--primary)"
          fillOpacity={0.35}
          stroke="var(--primary)"
          strokeWidth={2}
        />
        {mine.map((value, index) => {
          const p = point(index, value)
          return (
            <circle
              key={skillAxes[index].label}
              cx={p.x}
              cy={p.y}
              r={4}
              fill="var(--primary)"
              stroke="var(--card)"
              strokeWidth={2}
            >
              <title>
                {skillAxes[index].label} · 내 실력 {value} / 상위 10%{" "}
                {peer[index]}
              </title>
            </circle>
          )
        })}

        {/* 축 라벨 */}
        {skillAxes.map((axis, index) => {
          const p = point(index, 138)
          return (
            <g key={axis.label}>
              <text
                x={p.x}
                y={p.y - 6}
                textAnchor="middle"
                className="fill-muted-foreground text-[11px]"
              >
                {axis.label}
              </text>
              <text
                x={p.x}
                y={p.y + 8}
                textAnchor="middle"
                className="text-[11px] font-bold"
              >
                <tspan className="fill-primary">{axis.mine}</tspan>
                <tspan className="fill-muted-foreground">/{axis.peer}</tspan>
              </text>
            </g>
          )
        })}
      </svg>

      <figcaption className="mt-2 flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-sm bg-primary" aria-hidden />내 실력
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-sm bg-muted-foreground" aria-hidden />
          상위 10%
        </span>
      </figcaption>
    </figure>
  )
}
