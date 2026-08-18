import type { Meta, StoryObj } from "@storybook/react-vite"

import { LearningAnalytics } from "./learning-analytics"

const meta = {
  title: "MyPage/학습 분석 전체",
  component: LearningAnalytics,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "'내 실력이 어느 수준인가(실력 분석)'와 '얼마나 꾸준히 했나(학습 현황)'는 답하는 질문이 달라 탭으로 나눈다.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LearningAnalytics>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
