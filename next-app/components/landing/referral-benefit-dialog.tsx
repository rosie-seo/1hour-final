"use client"

import { ChevronRight, Gift } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { referral } from "@/lib/course-data"

function formatWon(value: number) {
  return `${value.toLocaleString("ko-KR")}원`
}

export function ReferralBenefitDialog() {
  return (
    <Dialog>
      <DialogTrigger className="flex w-full items-center justify-between py-3 text-sm">
        <span className="text-muted-foreground">{referral.title}</span>
        <span className="inline-flex items-center gap-1 font-semibold text-primary">
          최대 {formatWon(referral.friendDiscount)}
          <ChevronRight className="size-4" />
        </span>
      </DialogTrigger>

      <DialogContent className="gap-5 p-6 sm:max-w-md sm:p-8">
        <DialogHeader className="items-center pt-2 pb-1 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
            <Gift className="size-6 text-primary" aria-hidden />
          </div>
          <DialogTitle className="mt-4 font-heading text-xl font-black">
            {referral.title}
          </DialogTitle>
          <DialogDescription>{referral.description}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-border bg-muted/50 px-4 py-3 text-center">
            <p className="text-xs text-muted-foreground">친구 혜택</p>
            <p className="mt-1 font-heading text-lg font-black text-primary">
              {formatWon(referral.friendDiscount)} 할인
            </p>
          </div>
          <div className="rounded-xl border border-border bg-muted/50 px-4 py-3 text-center">
            <p className="text-xs text-muted-foreground">나의 혜택</p>
            <p className="mt-1 font-heading text-lg font-black text-primary">
              {referral.rewardLabel}
            </p>
            <p className="text-[11px] text-muted-foreground">
              {referral.rewardValueLabel} · 최대 {referral.maxRewardCount}회
            </p>
          </div>
        </div>

        <ol className="flex flex-col gap-3">
          {referral.steps.map((step, i) => (
            <li key={step.label} className="flex items-start gap-3">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-bold">{step.label}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  {step.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="rounded-lg bg-muted/50 px-3 py-2.5 text-[11px] leading-relaxed text-muted-foreground">
          * {referral.caution}
        </p>
      </DialogContent>
    </Dialog>
  )
}
