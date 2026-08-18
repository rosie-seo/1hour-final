import type { Meta, StoryObj } from "@storybook/react-vite"

import { currentStep, episodes } from "@/lib/study-data"
import { LessonSidebar } from "./lesson-sidebar"

const first = episodes[0]

const meta = {
  title: "Classroom/강의 목차",
  component: LessonSidebar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "앞 에피소드를 완주해야 다음이 열린다. 4개를 모두 열어두면 '오늘 뭘 해야 하지'가 사라지고 완주해도 아무 일이 일어나지 않는다. **잠금이 있어야 완주가 보상이 된다.**",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LessonSidebar>

export default meta
type Story = StoryObj<typeof meta>

/** EPISODE 1만 열려 있고 나머지는 잠김 */
export const Default: Story = {
  args: {
    episodes,
    activeEpisodeSlug: first.slug,
    activeStepId: currentStep(first).id,
  },
  render: (args) => (
    <div className="flex h-[600px] justify-end bg-muted/30">
      <LessonSidebar {...args} />
    </div>
  ),
}
