import type { Meta, StoryObj } from "@storybook/react-vite"

import { subscriptions } from "@/lib/billing-data"
import { BenefitBadge, BenefitPanel, DiscountBreakdown } from "./benefit"

const installment = subscriptions[0] // 기사용자 혜택 (회차 분할)
const once = subscriptions[2] // 친구 초대 할인 (1회 적용)

const meta = {
  title: "MyPage/혜택",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "할인은 단일 숫자가 아니라 **출처가 있는 항목**들의 합이다. 같은 12만원이라도 '친구 초대로 받은 할인'과 '기존 수강생이라 받은 할인'은 사용자에게 전혀 다른 의미이므로, 금액이 아니라 이유를 화면에 남긴다.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Badges: Story = {
  name: "배지",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <BenefitBadge label="친구 초대 할인" amount={120000} type="referral" />
      <BenefitBadge label="기사용자 혜택" amount={10000} type="loyalty" />
    </div>
  ),
}

/** 분할 적용 혜택 — 남은 양이 곧 "지금 해지하면 잃는 것"이라 게이지로 보여준다 */
export const PanelInstallment: Story = {
  name: "혜택 패널 · 분할 적용",
  render: () => (
    <div className="max-w-md">
      <BenefitPanel sub={installment} />
    </div>
  ),
}

/** 1회 적용 혜택 — 게이지 없이 적용 시점만 */
export const PanelOnce: Story = {
  name: "혜택 패널 · 1회 적용",
  render: () => (
    <div className="max-w-md">
      <BenefitPanel sub={once} />
    </div>
  ),
}

/** 정가 → 할인 항목 → 결제 금액 분해 */
export const Breakdown: Story = {
  name: "할인 분해",
  render: () => (
    <div className="max-w-md">
      <DiscountBreakdown transaction={once.transactions[0]} />
    </div>
  ),
}
