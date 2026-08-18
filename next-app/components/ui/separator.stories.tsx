import type { Meta, StoryObj } from "@storybook/react-vite"

import { Separator } from "./separator"

const meta = {
  title: "UI/Separator",
  component: Separator,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: () => (
    <div className="w-64 text-sm">
      <p>마이페이지</p>
      <Separator className="my-3" />
      <p>내 강의장</p>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-3 text-sm">
      <span>커리큘럼</span>
      <Separator orientation="vertical" />
      <span>가격안내</span>
      <Separator orientation="vertical" />
      <span>후기</span>
    </div>
  ),
}
