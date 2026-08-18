import { weakPoints } from "@/lib/analytics-data"

/**
 * 취약한 표현.
 *
 * 막대 하나에 내 정답률을 채우고, 비교군 위치는 눈금(▼)으로 표시한다.
 * "얼마나 뒤처져 있나"가 한 눈에 읽히는 것이 이 카드의 목적이다.
 */
export function WeakPoints() {
  return (
    <div>
      <ul className="flex flex-col gap-5">
        {weakPoints.map((item) => (
          <li key={item.label}>
            <p className="text-sm">{item.label}</p>
            <p className="mt-1 text-sm font-bold tabular-nums">
              <span className="text-primary">{item.mine}%</span>
              <span className="text-muted-foreground"> / {item.peer}%</span>
            </p>

            <div className="relative mt-2 h-1.5 rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${item.mine}%` }}
              />
              <span
                className="absolute -top-1.5 -translate-x-1/2 text-[8px] leading-none text-muted-foreground"
                style={{ left: `${item.peer}%` }}
                aria-hidden
              >
                ▼
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-sm bg-primary" aria-hidden />내 정답률
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden>▼</span>
          상위 10%
        </span>
      </div>
    </div>
  )
}
