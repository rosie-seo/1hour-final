"use client"

import { useState } from "react"

import { OrderSummary } from "@/components/checkout/order-summary"
import { PaymentPanel } from "@/components/checkout/payment-panel"
import { cn } from "@/lib/utils"
import { pricingPlans } from "@/lib/course-data"

/**
 * 결제 화면에서도 이용권을 바꿀 수 있어야 한다 — 상세페이지에서 고른 플랜은
 * 시작점일 뿐, 여기서 마음이 바뀌면 다시 왔다 갔다 하지 않고 바로 바꿀 수
 * 있어야 이탈이 없다. URL은 바꾸지 않는다 — 라우트를 옮기면 카드 입력 중이던
 * 값이 날아간다.
 */
export function CheckoutView({ initialPlanId }: { initialPlanId: string }) {
  const [planId, setPlanId] = useState(initialPlanId)
  const plan = pricingPlans.find((item) => item.id === planId) ?? pricingPlans[0]

  return (
    <>
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-xs font-semibold text-primary">이용권 선택</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {pricingPlans.map((item) => {
              const active = item.id === planId
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPlanId(item.id)}
                  aria-pressed={active}
                  className={cn(
                    "flex flex-col items-start gap-0.5 rounded-xl border p-3 text-left transition-colors",
                    active
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted"
                  )}
                >
                  <span className="flex items-center gap-1.5 text-sm font-bold">
                    {item.name}
                    {item.highlight && (
                      <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">
                        추천
                      </span>
                    )}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.priceLabel} · {item.discountRate}% 할인
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <OrderSummary plan={plan} />
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <PaymentPanel planId={plan.id} />
      </div>
    </>
  )
}
