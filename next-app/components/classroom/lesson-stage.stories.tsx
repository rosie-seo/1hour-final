import type { Meta, StoryObj } from "@storybook/react-vite"

import { currentStep, episodes } from "@/lib/study-data"
import { LessonStage } from "./lesson-stage"

const episode = episodes[0]

const meta = {
  title: "Classroom/수강 화면",
  component: LessonStage,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "**넓은화면** 버튼을 누르면 영상 외의 요소가 오른쪽 아이콘 레일로 접힌다. 목차와 학습 기록은 사라지는 게 아니라 아이콘 하나로 줄어들고, 누르면 패널로 다시 나온다 — 영상에 집중하되 한 번에 되돌아올 수 있게 한다.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LessonStage>

export default meta
type Story = StoryObj<typeof meta>

/** 기본 모드 — 영상 + 학습 기록 + 360px 목차 사이드바 */
export const Default: Story = {
  name: "기본화면",
  args: {
    episodes,
    episode,
    active: currentStep(episode),
    next: episodes[1],
  },
  render: (args) => (
    <div className="flex h-[720px] flex-col bg-muted/30">
      <LessonStage {...args} />
    </div>
  ),
}
