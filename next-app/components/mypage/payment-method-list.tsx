"use client"

import { useState } from "react"
import { AlertTriangle, ChevronRight, MapPin, RefreshCw } from "lucide-react"

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import {
  billingAddress,
  PAYMENT_METHOD_ERROR_MESSAGE,
  PAYMENT_METHOD_STATUS_LABEL,
  type PaymentMethod,
} from "@/lib/billing-data"

function LogoChip({
  method,
  size = "sm",
}: {
  method: PaymentMethod
  size?: "sm" | "lg"
}) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-md font-bold",
        method.logoClassName,
        size === "sm" ? "h-8 w-12 text-xs" : "h-16 w-24 rounded-xl text-lg"
      )}
      aria-hidden
    >
      {method.logo}
    </span>
  )
}

/** 상세에서 쓰는 라벨/값 한 줄 */
function DetailRow({
  label,
  value,
  sub,
}: {
  label: string
  value: string
  sub?: string
}) {
  return (
    <div className="flex items-start justify-between gap-4 px-4 py-3">
      <span className="shrink-0 text-sm text-muted-foreground">{label}</span>
      <span className="text-right">
        <span className="block text-sm">{value}</span>
        {sub && (
          <span className="mt-0.5 block text-xs text-muted-foreground">
            {sub}
          </span>
        )}
      </span>
    </div>
  )
}

/**
 * 결제 수단 목록 + 상세 팝업.
 *
 * 상세를 별도 화면으로 빼지 않고 팝업으로 여는 이유는, 여기서 하는 일이
 * 대부분 "확인하고 닫기" 또는 "삭제"라서다. 목록으로 돌아오는 동선이 유지되면
 * 여러 수단을 연달아 점검하기 쉽다.
 */
export function PaymentMethodList({
  methods,
  recurringMethodIds,
}: {
  methods: PaymentMethod[]
  /** 진행 중인 정기결제가 걸려 있는 수단 — 삭제를 막는다 */
  recurringMethodIds: string[]
}) {
  const [openId, setOpenId] = useState<string | null>(null)
  const [confirming, setConfirming] = useState(false)
  const [removedIds, setRemovedIds] = useState<string[]>([])

  const visible = methods.filter((method) => !removedIds.includes(method.id))
  const selected = methods.find((method) => method.id === openId) ?? null

  function handleDelete() {
    if (!selected) return
    setRemovedIds((prev) => [...prev, selected.id])
    setConfirming(false)
    setOpenId(null)
  }

  const locked = selected ? recurringMethodIds.includes(selected.id) : false
  const errorMessage = selected
    ? PAYMENT_METHOD_ERROR_MESSAGE[selected.status]
    : null

  return (
    <>
      <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
        {visible.length === 0 && (
          <p className="px-4 py-10 text-center text-sm text-muted-foreground">
            등록된 결제 수단이 없습니다.
          </p>
        )}
        {visible.map((method) => {
          const statusLabel = PAYMENT_METHOD_STATUS_LABEL[method.status]
          const failed = method.status !== "ok"

          return (
            <button
              key={method.id}
              type="button"
              onClick={() => setOpenId(method.id)}
              className="flex w-full items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-muted/60"
            >
              <LogoChip method={method} />

              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium">{method.brand}</span>
                  {recurringMethodIds.includes(method.id) && (
                    <span className="rounded-md bg-muted px-1.5 py-0.5 text-[0.7rem] font-medium text-muted-foreground">
                      정기결제
                    </span>
                  )}
                </span>
                <span
                  className={cn(
                    "mt-0.5 block truncate text-sm",
                    failed ? "text-destructive" : "text-muted-foreground"
                  )}
                >
                  {method.account}
                  {statusLabel && ` (${statusLabel})`}
                </span>
              </span>

              <ChevronRight
                className="size-4 shrink-0 text-muted-foreground/60"
                aria-hidden
              />
            </button>
          )
        })}
      </div>

      <Dialog
        open={selected !== null}
        onOpenChange={(open) => !open && setOpenId(null)}
      >
        <DialogContent className="gap-5 p-6 sm:max-w-md sm:p-8">
          {selected && (
            <>
              <DialogHeader className="items-center pt-2 pb-1">
                <LogoChip method={selected} size="lg" />
                <DialogTitle className="mt-4 font-heading text-xl font-black">
                  {selected.brand}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  결제 수단 상세 정보
                </DialogDescription>
              </DialogHeader>

              {errorMessage && (
                <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {errorMessage}
                </p>
              )}

              <div className="divide-y divide-border rounded-xl border border-border">
                <DetailRow
                  label={selected.kind === "card" ? "카드 번호" : "계정"}
                  value={selected.account}
                />
                {selected.kind === "easy" && (
                  <button
                    type="button"
                    className="w-full px-4 py-3 text-left text-sm font-medium text-primary hover:underline"
                  >
                    다른 계정으로 로그인
                  </button>
                )}
              </div>

              <div>
                <p className="mb-2 px-1 text-xs font-semibold text-muted-foreground">
                  청구지 주소
                </p>
                <div className="flex items-start gap-3 rounded-xl border border-border px-4 py-3">
                  <MapPin
                    className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{billingAddress.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {billingAddress.line}
                    </p>
                  </div>
                  <ChevronRight
                    className="mt-0.5 size-4 shrink-0 text-muted-foreground/60"
                    aria-hidden
                  />
                </div>
              </div>

              {locked ? (
                <p className="flex items-start gap-1.5 rounded-xl bg-muted px-4 py-3 text-xs text-muted-foreground">
                  <RefreshCw className="mt-px size-3.5 shrink-0" aria-hidden />
                  진행 중인 정기결제가 연결되어 있어 삭제할 수 없어요. 다른
                  수단으로 변경한 뒤 삭제하거나, 구독을 먼저 해지해 주세요.
                </p>
              ) : (
                <AlertDialog open={confirming} onOpenChange={setConfirming}>
                  <AlertDialogTrigger
                    render={
                      <button
                        type="button"
                        className="w-full rounded-xl border border-border py-3 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                      />
                    }
                  >
                    결제 수단 삭제
                  </AlertDialogTrigger>
                  <AlertDialogContent className="gap-5 p-6">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        결제 수단을 삭제하시겠습니까?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        {selected.brand} 결제 수단이 계정에서 삭제됩니다. 지난
                        결제 영수증은 그대로 확인할 수 있어요.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    {/* 푸터 밴드는 콘텐츠 패딩을 상쇄해 모서리까지 채운다 */}
                    <AlertDialogFooter className="-mx-6 -mb-6 p-6">
                      <AlertDialogCancel>취소</AlertDialogCancel>
                      <AlertDialogAction
                        variant="destructive"
                        onClick={handleDelete}
                      >
                        삭제
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}

              <p className="flex items-start gap-1.5 px-1 text-xs text-muted-foreground">
                <AlertTriangle
                  className="mt-px size-3.5 shrink-0"
                  aria-hidden
                />
                결제 수단이 하나도 없으면 정기결제가 중단되고 이용권이
                종료됩니다.
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
