import type { Metadata } from "next"

import { MyPageShell } from "@/components/mypage/mypage-shell"
import { SubscriptionStatusCard } from "@/components/mypage/subscription-status-card"
import { subscriptions } from "@/lib/billing-data"

export const metadata: Metadata = {
  title: "구독 관리",
}

export default function SubscriptionsPage() {
  return (
    <MyPageShell
      title="구독 관리"
      description="이용 중인 이용권과 지난 기수의 구독을 확인하세요. 결제 내역은 각 구독에서 확인할 수 있어요."
    >
      <div className="flex flex-col gap-4">
        {subscriptions.map((sub) => (
          <SubscriptionStatusCard key={sub.id} group={sub} />
        ))}
      </div>
    </MyPageShell>
  )
}
