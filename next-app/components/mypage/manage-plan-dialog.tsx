"use client"

import { useState } from "react"
import Image from "next/image"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { course } from "@/lib/course-data"
import type { Subscription } from "@/lib/billing-data"

function formatWon(value: number) {
  return `${value.toLocaleString("ko-KR")}원`
}

/** "2026.03.03" → "2026년 3월 3일" */
function formatKoreanDate(value: string) {
  const [y, m, d] = value.split(".")
  return `${y}년 ${Number(m)}월 ${Number(d)}일`
}

export function ManagePlanDialog({ sub }: { sub: Subscription }) {
  const [open, setOpen] = useState(false)
  const [canceled, setCanceled] = useState(false)
  const benefit = sub.benefits[0]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm" className="mt-4 rounded-full" />
        }
      >
        플랜 관리
      </DialogTrigger>

      <DialogContent className="gap-6 p-6 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-lg font-black">
            플랜 관리
          </DialogTitle>
        </DialogHeader>

        <div>
          <h3 className="text-sm font-bold">내 플랜</h3>
          <div className="mt-3 flex gap-3 rounded-xl border border-border p-4">
            <div className="relative size-12 shrink-0 overflow-hidden rounded-lg">
              <Image
                src={course.thumbnail}
                alt=""
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="font-heading text-sm font-bold">
                {sub.courseTitle} · {sub.planName}
              </p>
              <ul className="mt-2 flex flex-col gap-1 text-xs text-muted-foreground">
                <li>
                  {formatWon(sub.nextAmount ?? 0)}/월 · 매월 {sub.billingDay}일
                  결제
                </li>
                <li>{formatKoreanDate(sub.startedAt)}부터 구독 중</li>
                {benefit && <li>{benefit.label} 적용 중</li>}
              </ul>
            </div>
          </div>
        </div>

        {canceled ? (
          <p className="rounded-xl bg-muted/60 px-4 py-3 text-sm text-muted-foreground">
            해지가 접수됐어요. {sub.endsAt}까지는 계속 이용할 수 있어요.
          </p>
        ) : (
          <AlertDialog>
            <AlertDialogTrigger
              render={
                <Button variant="outline" className="w-full text-destructive" />
              }
            >
              플랜 종료
            </AlertDialogTrigger>
            <AlertDialogContent className="gap-5 p-6">
              <AlertDialogHeader>
                <AlertDialogTitle>플랜을 종료하시겠습니까?</AlertDialogTitle>
                <AlertDialogDescription>
                  지금 종료해도 {sub.endsAt}까지는 계속 이용할 수 있어요. 그
                  이후로는 자동 결제되지 않아요.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="-mx-6 -mb-6 p-6">
                <AlertDialogCancel>취소</AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  onClick={() => setCanceled(true)}
                >
                  종료하기
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </DialogContent>
    </Dialog>
  )
}
