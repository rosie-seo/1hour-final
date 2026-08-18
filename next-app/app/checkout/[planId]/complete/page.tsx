import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Sparkles } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { course, pricingPlans } from "@/lib/course-data"

export const metadata: Metadata = {
  title: "수강 신청 완료",
}

export function generateStaticParams() {
  return pricingPlans.map((plan) => ({ planId: plan.id }))
}

export default async function CheckoutCompletePage({
  params,
}: {
  params: Promise<{ planId: string }>
}) {
  const { planId } = await params
  const plan = pricingPlans.find((item) => item.id === planId)
  if (!plan) notFound()

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-primary/40 bg-card p-8 text-center">
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-primary/15">
          <Sparkles className="size-7 text-primary" aria-hidden />
        </span>

        <h1 className="mt-5 font-heading text-2xl font-black tracking-tight">
          수강 신청 완료!
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {course.title} · {plan.name}
        </p>
        <p className="mt-4 text-sm text-foreground/90">
          오늘부터 바로 시작할 수 있어요. 매일 30분, 캘리쌤과 함께해요.
        </p>

        <Link
          href="/mypage/classroom"
          className={cn(buttonVariants({ size: "lg" }), "mt-6 w-full")}
        >
          바로 학습 시작하기
        </Link>
        <Link
          href="/mypage/subscriptions"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "mt-2 w-full"
          )}
        >
          구독 관리에서 확인
        </Link>
      </div>
    </div>
  )
}
