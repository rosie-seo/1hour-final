import type { Meta, StoryObj } from "@storybook/react-vite"

import { scheduledTransactions, subscriptions } from "@/lib/billing-data"
import { TransactionList } from "./transaction-list"

const monthly = subscriptions[0]
const refunded = subscriptions[1]

const meta = {
  title: "MyPage/거래 내역",
  component: TransactionList,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "반복 결제를 평평한 목록으로 두면 같은 행이 12줄씩 쌓인다. 구독 단위로 묶고 최근 2건만 펼쳐 두며, 아직 일어나지 않은 **결제 예정** 행을 목록 맨 위에 얹어 정기결제 중임을 목록 문맥에서 알린다.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TransactionList>

export default meta
type Story = StoryObj<typeof meta>

/** 정기결제 구독 — 예정 행 + 회차 접기 + 증빙 버튼 */
export const Recurring: Story = {
  name: "정기결제",
  args: { groups: [monthly], scheduled: scheduledTransactions },
}

/** 환불 건 — 환불완료 배지, 증빙 버튼 없음 */
export const WithRefund: Story = {
  name: "환불 포함",
  args: { groups: [refunded], scheduled: [] },
}

export const AllSubscriptions: Story = {
  name: "전체",
  args: { groups: subscriptions, scheduled: scheduledTransactions },
}
