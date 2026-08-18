"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const METHODS = [
  { key: "kakao", label: "카카오페이" },
  { key: "naver", label: "네이버페이" },
  { key: "card", label: "카드 결제" },
] as const

type MethodKey = (typeof METHODS)[number]["key"]

const inputClass =
  "h-11 w-full rounded-lg border border-border bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"

/**
 * 오른쪽 결제 수단 선택 + 결제 폼.
 * 데모 상품이라 실제 결제 연동 없이, 제출하면 완료 화면으로 이동한다.
 */
export function PaymentPanel({ planId }: { planId: string }) {
  const router = useRouter()
  const [method, setMethod] = useState<MethodKey>("card")
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    router.push(`/checkout/${planId}/complete`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <h2 className="text-sm font-bold">결제 수단</h2>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {METHODS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setMethod(item.key)}
              aria-pressed={method === item.key}
              className={cn(
                "flex h-12 items-center justify-center rounded-xl border text-sm font-semibold transition-colors",
                method === item.key
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border text-muted-foreground hover:bg-muted"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {method === "card" ? (
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            카드 번호
            <input
              inputMode="numeric"
              placeholder="0000 0000 0000 0000"
              className={inputClass}
              required
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            카드에 표기된 이름
            <input
              placeholder="카드 소지자 이름"
              className={inputClass}
              required
            />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              유효기간
              <input placeholder="MM / YY" className={inputClass} required />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              보안 코드
              <input
                inputMode="numeric"
                placeholder="CVC"
                className={inputClass}
                required
              />
            </label>
          </div>
        </div>
      ) : (
        <p className="rounded-xl bg-muted/60 px-4 py-6 text-center text-sm text-muted-foreground">
          {METHODS.find((item) => item.key === method)?.label} 앱으로 이동해
          결제를 완료해요.
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting ? "신청 처리 중..." : "수강 신청 완료하기"}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        결제 정보는 안전하게 암호화되어 처리돼요. 신청 후에도 7일 이내에는
        100% 환불받을 수 있어요.
      </p>
    </form>
  )
}
