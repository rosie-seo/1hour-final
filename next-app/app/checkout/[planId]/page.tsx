import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { CheckoutView } from "@/components/checkout/checkout-view"
import { pricingPlans } from "@/lib/course-data"

export const metadata: Metadata = {
  title: "수강 신청",
}

export function generateStaticParams() {
  return pricingPlans.map((plan) => ({ planId: plan.id }))
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ planId: string }>
}) {
  const { planId } = await params
  const plan = pricingPlans.find((item) => item.id === planId)
  if (!plan) notFound()

  return (
    <div className="min-h-svh bg-muted/30">
      <header className="border-b border-border bg-background px-4 py-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/#pricing"
            className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden />
            돌아가기
          </Link>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-16">
        <CheckoutView initialPlanId={plan.id} />
      </main>
    </div>
  )
}
