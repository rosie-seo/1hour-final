"use client"

import * as React from "react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { pricingPlans } from "@/lib/course-data"

const featuredPlan =
  pricingPlans.find((plan) => plan.highlight) ?? pricingPlans[0]

export function StickyPurchaseBar() {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const heroBanner = document.getElementById("hero-banner")
    if (!heroBanner) return

    const HEADER_HEIGHT = 64

    const onScroll = () => {
      const rect = heroBanner.getBoundingClientRect()
      setVisible(rect.bottom <= HEADER_HEIGHT)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur-md transition-transform duration-300",
        visible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Badge
            variant="destructive"
            className="hidden shrink-0 font-bold sm:inline-flex"
          >
            {featuredPlan.discountRate}%
          </Badge>
          <div className="min-w-0">
            <p className="truncate text-[11px] text-muted-foreground sm:text-xs">
              {featuredPlan.name} · {featuredPlan.note}
            </p>
            <p className="truncate text-base font-black sm:text-lg">
              {featuredPlan.priceLabel}
            </p>
          </div>
        </div>
        <Button
          size="lg"
          render={<Link href={`/checkout/${featuredPlan.id}`} />}
          nativeButton={false}
          className="h-11 shrink-0 px-5 text-sm font-bold sm:px-8 sm:text-base"
        >
          지금 수강 신청하기
        </Button>
      </div>
    </div>
  )
}
