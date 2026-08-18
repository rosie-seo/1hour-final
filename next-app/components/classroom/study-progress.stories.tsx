import type { Meta, StoryObj } from "@storybook/react-vite"

import { episodes } from "@/lib/study-data"
import { StudyProgress } from "./study-progress"

const meta = {
  title: "Classroom/학습 기록",
  component: StudyProgress,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "목차가 '다음에 뭘 하지'라면 여기는 '방금 뭘 했고 몇 점이었나'다. 완료 단계는 점수와 시각을 남기고, 다시 할 수 있는 것만 액션을 노출한다. 미완료 단계에는 액션 대신 순서를 지키라는 안내가 들어간다.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StudyProgress>

export default meta
type Story = StoryObj<typeof meta>

/** 4/5 완료 — 마지막 단계만 남아 완주 화면으로 이어진다 */
export const InProgress: Story = {
  name: "진행 중",
  args: { episode: episodes[0] },
}

/** 아직 시작 전 */
export const NotStarted: Story = {
  name: "시작 전",
  args: { episode: episodes[1] },
}
