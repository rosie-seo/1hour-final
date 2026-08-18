import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"

import { MyPageShell } from "@/components/mypage/mypage-shell"
import { TransactionList } from "@/components/mypage/transaction-list"
import { Button } from "@/components/ui/button"
import { scheduledTransactions, subscriptions } from "@/lib/billing-data"

export const metadata: Metadata = {
  title: "결제 내역",
}

export function generateStaticParams() {
  return subscriptions.map((sub) => ({ id: sub.id }))
}

/**
 * 구독 한 건의 결제 내역.
 *
 * 전체 결제를 한 화면에 모아두면 "어느 기수의 어떤 이용권 결제인지"를
 * 매번 다시 읽어야 한다. 구독 관리에서 대상을 고르고 들어오는 구조라
 * 이 화면은 이미 맥락이 정해져 있고, 목록은 그 안의 회차만 다룬다.
 */
export default async function SubscriptionPaymentsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const sub = subscriptions.find((item) => item.id === id)
  if (!sub) notFound()

  const scheduled = scheduledTransactions.filter(
    (tx) => tx.subscriptionId === sub.id
  )

  return (
    <MyPageShell
      title="결제 내역"
      description={`${sub.termLabel} · ${sub.planName} · ${sub.startedAt} ~ ${sub.endsAt}`}
      action={
        <Button
          variant="outline"
          size="sm"
          render={<Link href="/mypage/subscriptions" />}
          nativeButton={false}
        >
          <ChevronLeft data-icon="inline-start" />
          구독 관리
        </Button>
      }
    >
      <TransactionList groups={[sub]} scheduled={scheduled} />
    </MyPageShell>
  )
}
