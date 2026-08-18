import type { Meta, StoryObj } from "@storybook/react-vite"

import { TodayTask } from "./today-task"

const meta = {
  title: "MyPage/오늘의 학습",
  component: TodayTask,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "마이페이지 최상단. 오늘 해야 할 단계 **하나만** 가리키고, 목록을 거치지 않고 그 단계의 재생 화면으로 직행시킨다. 매일 반복해야 하는 동작이라 진입 클릭 수가 곧 이탈률이다.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TodayTask>

export default meta
type Story = StoryObj<typeof meta>

/** 마지막 단계가 남은 상태 — "이 단계만 끝내면 완주" 문구가 붙는다 */
export const Default: Story = {}

export const InCard: Story = {
  name: "마이페이지 배치",
  render: () => (
    <div className="mx-auto max-w-3xl">
      <TodayTask />
    </div>
  ),
}
