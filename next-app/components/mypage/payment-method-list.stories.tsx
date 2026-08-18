import type { Meta, StoryObj } from "@storybook/react-vite"

import { paymentMethods } from "@/lib/billing-data"
import { PaymentMethodList } from "./payment-method-list"

const meta = {
  title: "MyPage/결제 수단 목록",
  component: PaymentMethodList,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "행을 누르면 상세 팝업이 열리고, 삭제는 확인 다이얼로그를 거친다. 실패 상태(확인 실패·승인 거부)는 정기결제가 조용히 실패하는 것을 막는 신호라 목록에서 바로 빨간색으로 노출한다.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PaymentMethodList>

export default meta
type Story = StoryObj<typeof meta>

/** 정기결제가 걸린 수단은 삭제가 막힌다 (신한카드) */
export const Default: Story = {
  args: { methods: paymentMethods, recurringMethodIds: ["PM-01"] },
}

/** 모든 수단 삭제 가능한 경우 */
export const NoRecurring: Story = {
  name: "정기결제 없음",
  args: { methods: paymentMethods, recurringMethodIds: [] },
}
