import type { Metadata } from "next"
import { ChevronRight } from "lucide-react"

import { MyPageShell } from "@/components/mypage/mypage-shell"
import { PaymentMethodList } from "@/components/mypage/payment-method-list"
import { activeSubscriptionsOfMethod, paymentMethods } from "@/lib/billing-data"

export const metadata: Metadata = {
  title: "결제 수단 관리",
}

const recurringMethodIds = paymentMethods
  .filter((method) => activeSubscriptionsOfMethod(method.id).length > 0)
  .map((method) => method.id)

export default function PaymentMethodsPage() {
  return (
    <MyPageShell title="결제 수단 관리">
      <p className="mb-2 px-1 text-xs font-semibold text-muted-foreground">
        결제 수단
      </p>

      <PaymentMethodList
        methods={paymentMethods}
        recurringMethodIds={recurringMethodIds}
      />

      <button
        type="button"
        className="mt-4 flex w-full items-center justify-between rounded-2xl border border-border bg-card px-4 py-4 text-left text-sm font-medium transition-colors hover:bg-muted/60"
      >
        결제 수단 추가
        <ChevronRight
          className="size-4 shrink-0 text-muted-foreground/60"
          aria-hidden
        />
      </button>

      <p className="mt-4 px-1 text-xs text-muted-foreground">
        위에 있는 결제 수단부터 순서대로 청구를 시도합니다.{" "}
        <a href="#" className="text-primary underline-offset-2 hover:underline">
          더 알아보기
        </a>
      </p>
    </MyPageShell>
  )
}
