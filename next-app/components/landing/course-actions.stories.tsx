import type { Meta, StoryObj } from "@storybook/react-vite"

import { course } from "@/lib/course-data"
import { CourseActions } from "./course-actions"

const meta = {
  title: "Landing/공유·찜하기",
  component: CourseActions,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "히어로 배너 위에 얹는 반투명 버튼. 찜 상태는 localStorage에 저장돼 마이페이지 '찜한 강의'와 같은 목록을 본다. 공유는 OS 공유 시트를 먼저 시도하고, 없으면 클립보드로 대체한다.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CourseActions>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { courseId: course.id, title: course.title },
  render: (args) => (
    <div className="relative flex h-40 w-96 items-center justify-center rounded-xl bg-neutral-800">
      <CourseActions {...args} className="absolute top-4 right-4" />
      <span className="text-sm text-white/60">히어로 배너</span>
    </div>
  ),
}
