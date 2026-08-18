"use client"

import { ChevronRight, Trophy } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { scholarship } from "@/lib/course-data"

export function ScholarshipBenefitDialog() {
  return (
    <Dialog>
      <DialogTrigger className="flex w-full items-center justify-between py-3 text-sm">
        <span className="text-muted-foreground">
          {scholarship.title.replace("!", "")}
        </span>
        <span className="inline-flex items-center gap-1 font-semibold text-primary">
          최대 {scholarship.tiers[0].amount}
          <ChevronRight className="size-4" />
        </span>
      </DialogTrigger>

      <DialogContent className="gap-5 p-6 sm:max-w-md sm:p-8">
        <DialogHeader className="items-center pt-2 pb-1 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
            <Trophy className="size-6 text-primary" aria-hidden />
          </div>
          <DialogTitle className="mt-4 font-heading text-xl font-black">
            {scholarship.title}
          </DialogTitle>
          <DialogDescription>{scholarship.description}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
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

        <div className="border-t border-border pt-4">
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
        </div>

        <p className="rounded-lg bg-muted/50 px-3 py-2.5 text-[11px] leading-relaxed text-muted-foreground">
          * {scholarship.criteriaNote}
        </p>
      </DialogContent>
    </Dialog>
  )
}
