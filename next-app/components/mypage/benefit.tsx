import { Gift, Ticket, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  benefitRemaining,
  benefitUsed,
  type Benefit,
  type Subscription,
  type Transaction,
} from "@/lib/billing-data"

function formatWon(value: number) {
  return `${value.toLocaleString("ko-KR")}원`
}

const BENEFIT_ICON = {
  referral: Users,
  loyalty: Ticket,
} as const

/**
 * 혜택 배지.
 *
 * 할인 금액만 보여주면 "싸게 샀다"로 끝나지만, 출처를 붙이면
 * "친구를 초대해서 받았다 / 1기를 들어서 받았다"는 사실이 남는다.
 * 재구매 시점에 다시 떠올릴 수 있는 정보라 금액보다 라벨이 먼저다.
 */
export function BenefitBadge({
  label,
  amount,
  type = "loyalty",
  className,
}: {
  label: string
  amount: number
  type?: Benefit["type"]
  className?: string
}) {
  const Icon = BENEFIT_ICON[type] ?? Gift
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-md bg-primary/10 px-1.5 py-0.5 text-[0.7rem] font-medium text-primary",
        className
      )}
    >
      <Icon className="size-3" aria-hidden />
      {label}
      <span className="tabular-nums">-{amount.toLocaleString("ko-KR")}</span>
    </span>
  )
}

/** 거래 한 건에 적용된 혜택 배지들 */
export function TransactionBenefits({
  transaction,
  className,
}: {
  transaction: Transaction
  className?: string
}) {
  const lines = transaction.discounts.filter((line) => line.kind === "benefit")
  if (lines.length === 0) return null
  return (
    <>
      {lines.map((line) => (
        <BenefitBadge
          key={line.label}
          label={line.label}
          amount={line.amount}
          type={line.label.includes("초대") ? "referral" : "loyalty"}
          className={className}
        />
      ))}
    </>
  )
}

/**
 * 구독에 붙은 혜택 패널.
 * 분할 적용 혜택은 남은 양이 곧 "지금 해지하면 잃는 것"이라 게이지로 보여준다.
 */
export function BenefitPanel({ sub }: { sub: Subscription }) {
  if (sub.benefits.length === 0) return null

  const used = benefitUsed(sub)
  const remaining = benefitRemaining(sub)

  return (
    <div className="flex flex-col gap-3">
      {sub.benefits.map((benefit) => {
        const Icon = BENEFIT_ICON[benefit.type] ?? Gift
        const installment = benefit.apply === "installment"
        const ratio =
          benefit.totalAmount > 0
            ? Math.min(100, Math.round((used / benefit.totalAmount) * 100))
            : 0
        const remainingCycles =
          benefit.perCycleAmount && benefit.perCycleAmount > 0
            ? Math.round(remaining / benefit.perCycleAmount)
            : 0

        return (
          <div
            key={benefit.id}
            className="rounded-xl border border-primary/30 bg-primary/[0.06] p-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <Icon className="size-4 text-primary" aria-hidden />
                <span className="text-sm font-bold text-primary">
                  {benefit.label}
                </span>
              </div>
              <span className="font-heading text-sm font-black text-primary tabular-nums">
                {formatWon(benefit.totalAmount)} 할인
              </span>
            </div>

            <p className="mt-1 text-xs text-muted-foreground">
              {benefit.description}
            </p>

            {installment && (
              <>
                <div
                  className="mt-3 h-1.5 overflow-hidden rounded-full bg-primary/15"
                  role="progressbar"
                  aria-valuenow={ratio}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${benefit.label} 사용률`}
                >
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${ratio}%` }}
                  />
                </div>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-muted-foreground">
                    {formatWon(used)} 사용 ·{" "}
                    <span className="font-semibold text-foreground">
                      {formatWon(remaining)} 남음
                    </span>
                    {remainingCycles > 0 && ` (${remainingCycles}회분)`}
                  </span>
                  {sub.status === "active" && remaining > 0 && (
                    <span className="text-muted-foreground">
                      해지하면 남은 혜택은 사라져요
                    </span>
                  )}
                </div>
              </>
            )}

            {!installment && (
              <p className="mt-2 text-xs text-muted-foreground">
                {sub.startedAt} 결제에 1회 적용 완료
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}

/** 정가 → 할인 항목들 → 결제 금액 분해 */
export function DiscountBreakdown({
  transaction,
  className,
}: {
  transaction: Transaction
  className?: string
}) {
  return (
    <dl
      className={cn(
        "flex flex-col gap-2 rounded-xl bg-muted/60 p-4 text-sm",
        className
      )}
    >
      <div className="flex justify-between">
        <dt className="text-muted-foreground">정가</dt>
        <dd className="tabular-nums">{formatWon(transaction.regularPrice)}</dd>
      </div>
      {transaction.discounts.map((line) => (
        <div key={line.label} className="flex justify-between">
          <dt
            className={cn(
              "flex items-center gap-1.5",
              line.kind === "benefit" ? "text-primary" : "text-muted-foreground"
            )}
          >
            {line.kind === "benefit" && (
              <Gift className="size-3.5" aria-hidden />
            )}
            {line.label}
          </dt>
          <dd
            className={cn(
              "tabular-nums",
              line.kind === "benefit" ? "text-primary" : "text-muted-foreground"
            )}
          >
            -{formatWon(line.amount)}
          </dd>
        </div>
      ))}
      <div className="mt-1 flex justify-between border-t border-border pt-2">
        <dt className="font-bold">결제 금액</dt>
        <dd className="font-heading font-black tabular-nums">
          {formatWon(Math.abs(transaction.finalPrice))}
        </dd>
      </div>
    </dl>
  )
}
