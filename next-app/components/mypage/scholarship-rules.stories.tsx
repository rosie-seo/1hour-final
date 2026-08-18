import type { Meta, StoryObj } from "@storybook/react-vite"

import { ScholarshipRules } from "./scholarship-rules"

const meta = {
  title: "MyPage/장학금 평가 기준",
  component: ScholarshipRules,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "상금이 걸린 경쟁에서 기준이 불투명하면 분쟁이 된다. 배점·계산식·어뷰징 방지 규칙·동점 처리까지 모두 공개한다.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ScholarshipRules>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="mx-auto max-w-2xl">
      <ScholarshipRules />
    </div>
  ),
}
