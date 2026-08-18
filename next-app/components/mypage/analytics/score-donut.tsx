import { analyticsUser } from "@/lib/analytics-data"

const SIZE = 220
const STROKE = 14
const R = (SIZE - STROKE) / 2
const C = 2 * Math.PI * R

/**
 * 예측 점수 도넛.
 *
 * 두 하위 점수가 합쳐 총점이 되므로 하나의 링을 두 구간으로 나눈다.
 * 링은 값의 크기만 나타내므로 한 색의 명도 두 단계(진함=발음, 연함=표현)를 쓰고,
 * 숫자는 텍스트 토큰으로 적어 색만으로 읽게 만들지 않는다.
 */
export function ScoreDonut() {
  const { predictedScore, goalScore, breakdown } = analyticsUser
  const total = breakdown.reduce((sum, item) => sum + item.max, 0)

  const arcs = breakdown.map((item, index) => {
    // 앞선 구간의 누적 길이만큼 시작점을 뒤로 민다
    const before = breakdown
      .slice(0, index)
      .reduce((sum, prev) => sum + prev.value, 0)
    const length = (item.value / total) * C
    return {
      key: item.key,
      dash: `${length} ${C - length}`,
      offset: -(before / total) * C,
      strong: index === 0,
    }
  })

  const goalAngle = (goalScore / total) * 360

  return (
    <figure className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          role="img"
          aria-label={`예측 점수 ${predictedScore}점, 목표 ${goalScore}점`}
          className="-rotate-90"
        >
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            fill="none"
            stroke="var(--muted)"
            strokeWidth={STROKE}
          />
          {arcs.map((arc) => (
            <circle
              key={arc.key}
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={R}
              fill="none"
              stroke="var(--primary)"
              strokeOpacity={arc.strong ? 1 : 0.55}
              strokeWidth={STROKE}
              strokeDasharray={arc.dash}
              strokeDashoffset={arc.offset}
            />
          ))}
          {/* 목표 지점 눈금 */}
          <line
            x1={SIZE / 2 + (R - STROKE) * Math.cos((goalAngle * Math.PI) / 180)}
            y1={SIZE / 2 + (R - STROKE) * Math.sin((goalAngle * Math.PI) / 180)}
            x2={
              SIZE / 2 +
              (R + STROKE / 2) * Math.cos((goalAngle * Math.PI) / 180)
            }
            y2={
              SIZE / 2 +
              (R + STROKE / 2) * Math.sin((goalAngle * Math.PI) / 180)
            }
            stroke="var(--foreground)"
            strokeWidth={2}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xs text-muted-foreground">예측 점수</p>
          <p className="font-heading text-4xl font-black text-primary tabular-nums">
            {predictedScore}
          </p>
          <div className="mt-2 flex divide-x divide-border">
            {breakdown.map((item) => (
              <div key={item.key} className="px-3 text-center">
                <p className="text-base font-bold tabular-nums">{item.value}</p>
                <p className="text-[0.7rem] text-muted-foreground">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <span className="absolute top-2 left-0 rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background">
          목표 {goalScore}
        </span>
      </div>

      <figcaption className="flex items-center gap-4 text-xs text-muted-foreground">
        {breakdown.map((item, index) => (
          <span key={item.key} className="flex items-center gap-1.5">
            <span
              className="size-2 rounded-full bg-primary"
              style={{ opacity: index === 0 ? 1 : 0.55 }}
              aria-hidden
            />
            {item.label} {item.value}/{item.max}
          </span>
        ))}
      </figcaption>
    </figure>
  )
}
