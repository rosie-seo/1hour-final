import type { Meta, StoryObj } from "@storybook/react-vite"

import { subscriptions } from "@/lib/billing-data"
import { SubscriptionStatusCard } from "./subscription-status-card"

const [active, refunded, expired] = subscriptions

const meta = {
  title: "MyPage/구독 카드",
  component: SubscriptionStatusCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "진행 중이든 종료됐든 **같은 3컬럼 구조**를 쓴다. 왼쪽 '내가 뭘 썼나', 가운데 '뭐가 포함됐나', 오른쪽 '언제 얼마가 나갔나'. 기수를 넘나들며 비교하려면 같은 자리에 같은 종류의 값이 있어야 한다.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SubscriptionStatusCard>

export default meta
type Story = StoryObj<typeof meta>

/** 정기결제 진행 중 — 결제 수단 변경, 결제 주기 성과, 혜택 잔여가 함께 보인다 */
export const Active: Story = {
  name: "이용중",
  args: { group: active },
}

/** 7일 내 환불로 종료 — 썸네일 흑백, 환불 금액과 환불일 표기 */
export const Refunded: Story = {
  name: "환불 종료",
  args: { group: refunded },
}

/** 이용기간 만료 — 마지막 결제 금액과 이용 종료일 표기 */
export const Expired: Story = {
  name: "이용 종료",
  args: { group: expired },
}

export const AllStates: Story = {
  name: "전체 상태",
  args: { group: active },
  render: () => (
    <div className="flex flex-col gap-4">
      {subscriptions.map((sub) => (
        <SubscriptionStatusCard key={sub.id} group={sub} />
      ))}
    </div>
  ),
}
