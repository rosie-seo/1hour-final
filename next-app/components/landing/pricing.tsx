import Link from "next/link"
import { CheckCircle2, Gift, ShieldCheck, Trophy } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  guarantee,
  pricingPlans,
  referral,
  scholarship,
} from "@/lib/course-data"

function formatWon(value: number) {
  return `${value.toLocaleString("ko-KR")}원`
}

export function Pricing() {
  return (
    <section id="pricing" className="border-b border-border bg-primary/5">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-primary">PRICING</p>
          <h2 className="mt-2 font-heading text-2xl font-black tracking-tight text-balance sm:text-3xl">
            영어공부는 비싸지 않아도 됩니다
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            프로모션 한정, 최대 60% 할인
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={
                plan.highlight
                  ? "overflow-hidden py-0 ring-2 ring-primary"
                  : "overflow-hidden py-0 ring-1 ring-border"
              }
            >
              {plan.highlight && (
                <div className="bg-primary px-6 py-2 text-center text-xs font-bold text-primary-foreground">
                  가장 많이 선택한 플랜
                </div>
              )}
              <CardContent className="px-6 py-8 text-center">
                <div className="flex items-center justify-center gap-2">
                  <p className="font-heading text-base font-bold">
                    {plan.name}
                  </p>
                  <Badge variant="destructive">{plan.discountRate}% 할인</Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {plan.note}
                </p>

                <p className="mt-4 text-sm text-muted-foreground line-through">
                  {formatWon(plan.regularPrice)}
                </p>
                <p className="mt-1 font-heading text-3xl font-black tracking-tight sm:text-4xl">
                  {plan.priceLabel}
                </p>
                {plan.subLabel && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {plan.subLabel}
                  </p>
                )}

                <Button
                  size="lg"
                  className="mt-6 h-12 w-full text-base font-bold"
                  variant={plan.highlight ? "default" : "outline"}
                  render={<Link href={`/checkout/${plan.id}`} />}
                  nativeButton={false}
                >
                  {plan.name} 신청하기
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-bold">{guarantee.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {guarantee.description}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
            <Gift className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-bold">{referral.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {referral.description}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <div className="flex items-center justify-center gap-2">
            <Trophy className="size-5 text-primary" />
            <p className="font-heading text-base font-bold">
              {scholarship.title}
            </p>
          </div>
          <p className="mx-auto mt-2 max-w-md text-center text-xs leading-relaxed text-muted-foreground">
            {scholarship.description}
          </p>
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {scholarship.tiers.map((tier) => (
              <div
                key={tier.rank}
                className="rounded-lg bg-muted px-3 py-2.5 text-center"
              >
                <p className="text-xs text-muted-foreground">{tier.rank}</p>
                <p className="text-sm font-bold text-primary">{tier.amount}</p>
              </div>
            ))}
          </div>

          {/* "열심히"의 기준을 구매 전에 밝힌다 */}
          <div className="mt-6 border-t border-border pt-5">
            <p className="text-center text-xs font-semibold">
              어떻게 뽑나요? 1000점 만점으로 환산합니다
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
              {scholarship.criteria.map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-border px-3 py-2.5 text-center"
                >
                  <p className="text-xs font-bold">{item.label}</p>
                  <p className="mt-0.5 text-sm font-black text-primary tabular-nums">
                    {item.weight}
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-3 max-w-md text-center text-[11px] leading-relaxed text-muted-foreground">
              {scholarship.criteriaNote}
            </p>
          </div>
        </div>

        <p className="mt-8 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
          <CheckCircle2 className="size-3.5" />
          7개 카드사 무이자 할부 지원 · 신한 · 삼성 · 현대 · 국민 · 롯데 · 우리
          · 하나카드
        </p>
      </div>
    </section>
  )
}
