import Image from "next/image"
import Link from "next/link"
import {
  BarChart3,
  CalendarDays,
  ChevronRight,
  CreditCard,
  Info,
  Mic,
  Users,
} from "lucide-react"

import { SubscriptionPaymentMethod } from "@/components/mypage/change-payment-method"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { planIncludes } from "@/lib/course-data"
import {
  benefitRemaining,
  benefitUsed,
  paymentMethods,
  type Subscription,
} from "@/lib/billing-data"

function formatWon(value: number) {
  return `${Math.abs(value).toLocaleString("ko-KR")}원`
}

/** "2026.09.03" → "2026년 9월 3일" */
function formatKoreanDate(value?: string) {
  if (!value) return "-"
  const [y, m, d] = value.split(".")
  return `${y}년 ${Number(m)}월 ${Number(d)}일`
}

const FEATURE_ICON = {
  calendar: CalendarDays,
  mic: Mic,
  chart: BarChart3,
  users: Users,
} as const

const STATUS_BADGE: Record<
  Subscription["status"],
  { label: string; variant: "default" | "outline" | "secondary" }
> = {
  active: { label: "이용중", variant: "default" },
  canceled: { label: "해지 예정", variant: "outline" },
  expired: { label: "이용 종료", variant: "secondary" },
  refunded: { label: "환불 종료", variant: "secondary" },
}

/**
 * 구독 카드 — 진행 중/종료 구분 없이 같은 3컬럼 구조를 쓴다.
 *
 * 왼쪽 "내가 뭘 썼나" · 가운데 "뭐가 포함됐나" · 오른쪽 "언제 얼마가 나갔나".
 * 종료된 구독도 같은 자리에서 같은 정보를 찾을 수 있어야 기수를 넘나들며
 * 비교할 수 있다. 달라지는 건 각 칸에 들어가는 값과 액션뿐이다.
 */
export function SubscriptionStatusCard({ group }: { group: Subscription }) {
  const live = group.status === "active" || group.status === "canceled"
  const canceled = group.status === "canceled"
  const refunded = group.status === "refunded"
  const dday = group.daysUntilNextBilling ?? 0

  const badge = STATUS_BADGE[group.status]
  const benefit = group.benefits[0]
  const remaining = benefitRemaining(group)
  const used = benefitUsed(group)

  /** 종료된 구독은 마지막 결제/환불 건에서 값을 읽는다 */
  const lastPayment = group.transactions.find((t) => t.type === "payment")
  const refund = group.transactions.find((t) => t.type === "refund")

  const discounted =
    live &&
    group.nextBaseAmount !== undefined &&
    group.nextBaseAmount !== group.nextAmount

  return (
    <section
      className={cn(
        "rounded-2xl border bg-card p-5",
        live ? "border-primary/40" : "border-border"
      )}
      aria-label="구독 상태"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={badge.variant}>{badge.label}</Badge>
          <Badge variant="outline">{group.termLabel}</Badge>
        </div>

        {benefit && (
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-bold",
              live
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            {benefit.label}
            <Info className="size-3.5" aria-hidden />
          </span>
        )}
      </div>

      <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.1fr)]">
        {/* 1. 내가 쓰고 있는(썼던) 플랜 */}
        <div className="overflow-hidden rounded-xl border border-border">
          {/* 썸네일은 카드 상단을 꽉 채운다 */}
          <div className="relative aspect-video">
            <Image
              src="/hero-kelly-english.png"
              alt=""
              fill
              sizes="(min-width: 1024px) 280px, 100vw"
              className={cn("object-cover", !live && "opacity-60 grayscale")}
            />
          </div>

          <div className="p-4">
            {/* 두 줄까지 보여주고 넘치면 말줄임 */}
            <p
              className="line-clamp-2 font-heading text-base font-bold"
              title={`${group.courseTitle} ${group.planName}`}
            >
              {group.courseTitle} {group.planName}
            </p>

            {live ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 rounded-full"
                >
                  플랜 관리
                </Button>
                <p className="mt-2 text-xs text-muted-foreground">
                  해지하려면 <span className="font-semibold">플랜 관리</span>로
                  이동
                </p>
              </>
            ) : (
              <p className="mt-3 text-xs text-muted-foreground">
                {group.endedReason} · {group.endsAt} 종료
              </p>
            )}
          </div>
        </div>

        {/* 2. 플랜에 포함된 것 */}
        <div>
          <h3 className="text-sm font-bold">
            {live ? "내 플랜에 포함" : "이 플랜에 포함되었던 것"}
          </h3>
          <ul className="mt-4 flex flex-col gap-3">
            {planIncludes.items.map((item) => {
              const Icon =
                FEATURE_ICON[item.icon as keyof typeof FEATURE_ICON] ??
                CalendarDays
              return (
                <li key={item.label} className="flex items-center gap-2.5">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-muted">
                    <Icon
                      className="size-3.5 text-muted-foreground"
                      aria-hidden
                    />
                  </span>
                  <span
                    className={cn("text-sm", !live && "text-muted-foreground")}
                  >
                    {item.label}
                  </span>
                </li>
              )
            })}
          </ul>
          {live && (
            <Button
              variant="outline"
              size="sm"
              className="mt-6 rounded-full"
              render={<Link href="/mypage/classroom" />}
              nativeButton={false}
            >
              내 강의장 이동
            </Button>
          )}
        </div>

        {/* 3. 언제 얼마가 나갔나 */}
        <div>
          <h3 className="text-sm font-bold">결제 방법 및 청구 내역</h3>

          {live ? (
            <SubscriptionPaymentMethod sub={group} methods={paymentMethods} />
          ) : (
            <p className="mt-4 flex items-center gap-2 text-sm">
              <CreditCard
                className="size-4 text-muted-foreground"
                aria-hidden
              />
              {group.method}
            </p>
          )}

          <div className="mt-5 flex gap-2">
            <CalendarDays
              className="mt-0.5 size-4 shrink-0 text-muted-foreground"
              aria-hidden
            />
            <div>
              {live ? (
                <>
                  <p className="flex flex-wrap items-baseline gap-1.5">
                    {discounted && (
                      <s className="text-sm text-muted-foreground">
                        {formatWon(group.nextBaseAmount ?? 0)}
                      </s>
                    )}
                    <span className="font-heading text-base font-black text-primary">
                      {canceled ? "-" : formatWon(group.nextAmount ?? 0)}
                    </span>
                  </p>
                  <p className="mt-1 text-sm">
                    {canceled ? "이용 종료일" : "다음 결제일"}:{" "}
                    {formatKoreanDate(
                      canceled ? group.endsAt : group.nextBillingDate
                    )}
                    {!canceled && (
                      <span className="text-muted-foreground"> (D-{dday})</span>
                    )}
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {group.planName} · 매월 {group.billingDay}일 결제
                  </p>
                </>
              ) : refunded ? (
                <>
                  <p className="font-heading text-base font-black text-destructive">
                    {formatWon(refund?.finalPrice ?? 0)} 환불 완료
                  </p>
                  <p className="mt-1 text-sm">
                    결제일: {formatKoreanDate(lastPayment?.day)}
                  </p>
                  <p className="mt-0.5 text-sm">
                    환불일: {formatKoreanDate(refund?.day)}
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {group.planName} · {group.endedReason}
                  </p>
                </>
              ) : (
                <>
                  <p className="flex flex-wrap items-baseline gap-1.5">
                    {lastPayment && lastPayment.discount > 0 && (
                      <s className="text-sm text-muted-foreground">
                        {formatWon(lastPayment.regularPrice)}
                      </s>
                    )}
                    <span className="font-heading text-base font-black">
                      {formatWon(lastPayment?.finalPrice ?? 0)}
                    </span>
                  </p>
                  <p className="mt-1 text-sm">
                    마지막 결제일: {formatKoreanDate(lastPayment?.day)}
                  </p>
                  <p className="mt-0.5 text-sm">
                    이용 종료일: {formatKoreanDate(group.endsAt)}
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {group.planName} · 이후 자동 결제 없음
                  </p>
                </>
              )}

              {benefit &&
                (live && remaining > 0 ? (
                  <p className="mt-2 text-xs text-primary">
                    {benefit.label} {formatWon(used)} 사용 ·{" "}
                    {formatWon(remaining)} 남음
                  </p>
                ) : (
                  used > 0 && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      {benefit.label} {formatWon(used)} 적용
                    </p>
                  )
                ))}
            </div>
          </div>

          <div className="mt-5 flex justify-end border-t border-border pt-3">
            <Link
              href={`/mypage/subscriptions/${group.id}`}
              className="inline-flex items-center gap-0.5 text-sm font-medium text-primary underline-offset-2 hover:underline"
            >
              결제 내역 보기
              <ChevronRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
