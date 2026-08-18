import Image from "next/image"
import { ShieldCheck } from "lucide-react"

import { course, guarantee, type pricingPlans } from "@/lib/course-data"

function formatWon(value: number) {
  return `${value.toLocaleString("ko-KR")}원`
}

/**
 * 왼쪽 주문 요약.
 *
 * "오늘 얼마를 내고 그다음엔 어떻게 되는지"를 결제 수단을 고르기 전에
 * 먼저 답한다 — 결제 폼에 들어가기 전 놀랄 일이 없어야 한다.
 */
export function OrderSummary({ plan }: { plan: (typeof pricingPlans)[number] }) {
  const discountAmount = plan.regularPrice - plan.price

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-semibold text-primary">수강 신청</p>
        <h1 className="mt-1 font-heading text-xl font-black tracking-tight text-balance">
          {course.title} · {plan.name}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {plan.id === "monthly"
            ? "오늘 결제하면 바로 시작하고, 이후 매달 자동 결제돼요."
            : "오늘 1년치를 한 번에 결제하고 바로 시작해요."}
        </p>
      </div>

      <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
        <div className="relative size-16 shrink-0 overflow-hidden rounded-xl">
          <Image
            src={course.thumbnail}
            alt=""
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="font-heading text-sm font-bold">{course.title}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {plan.name} · {plan.note}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-border pt-4 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">정가</span>
          <span className="text-muted-foreground line-through">
            {formatWon(plan.regularPrice)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">{plan.discountRate}% 할인</span>
          <span className="font-medium text-primary">
            -{formatWon(discountAmount)}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border pt-4">
        <span className="text-sm font-bold">오늘 결제 금액</span>
        <span className="font-heading text-2xl font-black text-primary">
          {formatWon(plan.price)}
        </span>
      </div>

      <p className="text-xs text-muted-foreground">
        {plan.id === "monthly"
          ? "이후 매달 같은 금액이 자동 결제돼요. 언제든 해지할 수 있어요."
          : "1년 이용권이며, 이용 기간이 끝나면 자동으로 갱신되지 않아요."}
      </p>

      <div className="flex items-start gap-2 rounded-xl bg-primary/5 px-4 py-3 text-xs text-primary">
        <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden />
        <span>
          {guarantee.title} — {guarantee.description}
        </span>
      </div>
    </div>
  )
}
