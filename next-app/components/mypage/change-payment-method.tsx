"use client"

import { useState } from "react"
import Link from "next/link"
import {
  AlertTriangle,
  Check,
  ChevronDown,
  CreditCard,
  Plus,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import {
  PAYMENT_METHOD_STATUS_LABEL,
  type PaymentMethod,
  type Subscription,
} from "@/lib/billing-data"

function formatWon(value: number) {
  return `${value.toLocaleString("ko-KR")}원`
}

function formatKoreanDate(value?: string) {
  if (!value) return "-"
  const [y, m, d] = value.split(".")
  return `${y}년 ${Number(m)}월 ${Number(d)}일`
}

function LogoChip({ method }: { method: PaymentMethod }) {
  return (
    <span
      className={cn(
        "flex h-8 w-12 shrink-0 items-center justify-center rounded-md text-xs font-bold",
        method.logoClassName
      )}
      aria-hidden
    >
      {method.logo}
    </span>
  )
}

/**
 * 구독의 결제 수단 표시 + 변경 팝업.
 *
 * "결제 수단 관리"(계정 전체 목록)와 "이 구독의 결제 수단 변경"은 다른 일이다.
 * 여기서는 등록된 수단 중 하나를 고르는 것만 하고, 추가·삭제는 관리 화면으로 넘긴다.
 * 오른쪽에 대상 구독을 붙여두는 이유는, 수단이 여러 구독에 걸쳐 있을 때
 * "지금 무엇의 결제 수단을 바꾸는 중인지"를 잃지 않게 하기 위해서다.
 */
export function SubscriptionPaymentMethod({
  sub,
  methods,
}: {
  sub: Subscription
  methods: PaymentMethod[]
}) {
  const [currentId, setCurrentId] = useState(sub.methodId)
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [draftId, setDraftId] = useState(sub.methodId)

  const current = methods.find((m) => m.id === currentId) ?? methods[0]
  const draft = methods.find((m) => m.id === draftId) ?? current
  const changed = draftId !== currentId

  function openDialog() {
    setDraftId(currentId)
    setExpanded(false)
    setOpen(true)
  }

  function save() {
    setCurrentId(draftId)
    setOpen(false)
  }

  return (
    <>
      <p className="mt-4 flex items-center gap-2 text-sm">
        <CreditCard className="size-4 text-muted-foreground" aria-hidden />
        {current.label}
      </p>
      <Button
        variant="outline"
        size="sm"
        className="mt-3 rounded-full"
        onClick={openDialog}
      >
        결제 수단 변경
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-6 p-6 sm:max-w-3xl sm:p-8">
          <DialogHeader>
            <DialogTitle className="font-heading text-lg font-black">
              결제 수단 변경
            </DialogTitle>
            <DialogDescription>
              이 구독에 사용할 결제 수단을 선택하세요.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
            {/* 결제 수단 선택 */}
            <div>
              <h3 className="mb-2 text-sm font-bold">결제 방법</h3>

              <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                aria-expanded={expanded}
                aria-haspopup="listbox"
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors",
                  expanded
                    ? "border-border bg-muted"
                    : "border-border hover:bg-muted/60"
                )}
              >
                <LogoChip method={draft} />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">
                    {draft.brand}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {draft.account}
                  </span>
                </span>
                <ChevronDown
                  className={cn(
                    "size-4 shrink-0 text-muted-foreground transition-transform",
                    expanded && "rotate-180"
                  )}
                  aria-hidden
                />
              </button>

              {expanded && (
                <ul
                  role="listbox"
                  aria-label="결제 수단 선택"
                  className="mt-2 divide-y divide-border overflow-hidden rounded-xl border border-border"
                >
                  {methods.map((method) => {
                    const failed = method.status !== "ok"
                    const statusLabel =
                      PAYMENT_METHOD_STATUS_LABEL[method.status]
                    const selected = method.id === draftId

                    return (
                      <li key={method.id}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={selected}
                          aria-disabled={failed}
                          disabled={failed}
                          onClick={() => {
                            setDraftId(method.id)
                            setExpanded(false)
                          }}
                          className={cn(
                            "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors",
                            failed ? "cursor-not-allowed" : "hover:bg-muted/60"
                          )}
                        >
                          <LogoChip method={method} />
                          <span className="min-w-0 flex-1">
                            <span
                              className={cn(
                                "flex items-center gap-1.5 text-sm font-medium",
                                failed && "text-destructive",
                                selected && !failed && "text-primary"
                              )}
                            >
                              {method.brand}
                              {failed && (
                                <AlertTriangle
                                  className="size-3.5"
                                  aria-hidden
                                />
                              )}
                            </span>
                            <span
                              className={cn(
                                "block text-xs",
                                failed
                                  ? "text-destructive"
                                  : "text-muted-foreground"
                              )}
                            >
                              {method.account}
                              {statusLabel && ` · ${statusLabel}`}
                            </span>
                          </span>
                          {selected && !failed && (
                            <Check
                              className="size-4 shrink-0 text-primary"
                              aria-hidden
                            />
                          )}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              )}

              <div className="mt-3 flex items-center gap-3 text-sm">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-primary underline-offset-2 hover:underline"
                >
                  <Plus className="size-3.5" aria-hidden />
                  새로 추가
                </button>
                <span className="text-border">|</span>
                <Link
                  href="/mypage/payment-methods"
                  className="text-primary underline-offset-2 hover:underline"
                >
                  결제 수단 관리
                </Link>
              </div>

              <Button
                className="mt-6"
                disabled={!changed}
                onClick={save}
                aria-describedby="change-payment-hint"
              >
                저장
              </Button>
              <p
                id="change-payment-hint"
                className="mt-2 text-xs text-muted-foreground"
              >
                {changed
                  ? `다음 결제(${formatKoreanDate(sub.nextBillingDate)})부터 새 수단으로 청구됩니다.`
                  : "변경할 결제 수단을 선택하세요."}
              </p>
            </div>

            {/* 무엇의 결제 수단을 바꾸는 중인지 */}
            <div className="sm:border-l sm:border-border sm:pl-8">
              <h3 className="mb-3 text-sm font-bold">내 플랜</h3>

              <p className="font-heading text-base font-bold">
                {sub.courseTitle}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {sub.termLabel} · {sub.planName}
              </p>

              <div className="mt-4 border-t border-border pt-4">
                <p className="text-xs text-muted-foreground">구독</p>
                <p className="mt-0.5 text-sm">
                  {sub.recurring
                    ? `매월 ${sub.billingDay}일 결제`
                    : "단건 결제"}
                </p>
              </div>

              <div className="mt-4 flex items-start justify-between gap-3 border-t border-border pt-4">
                <div>
                  <p className="text-xs text-muted-foreground">
                    다음 결제 기한
                  </p>
                  <p className="mt-0.5 text-sm font-medium">
                    {formatKoreanDate(sub.nextBillingDate)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-heading text-base font-black">
                    {formatWon(sub.nextAmount ?? 0)}
                    <span className="text-sm font-medium">/월</span>
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    (부가세 포함)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
