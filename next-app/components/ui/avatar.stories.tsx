import type { Meta, StoryObj } from "@storybook/react-vite"
import { Check } from "lucide-react"

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "./avatar"

const meta = {
  title: "UI/Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: { size: "default" },
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback className="bg-primary/15 font-bold text-primary">
        김
      </AvatarFallback>
    </Avatar>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {(["sm", "default", "lg"] as const).map((size) => (
        <Avatar key={size} size={size}>
          <AvatarFallback className="bg-primary/15 font-bold text-primary">
            김
          </AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
}

export const WithBadge: Story = {
  render: () => (
    <Avatar size="lg">
      <AvatarFallback className="bg-primary/15 font-bold text-primary">
        김
      </AvatarFallback>
      <AvatarBadge>
        <Check className="size-2 text-primary-foreground" />
      </AvatarBadge>
    </Avatar>
  ),
}

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar>
        <AvatarFallback className="bg-primary/15 font-bold text-primary">
          김
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-secondary font-bold">이</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-muted font-bold">박</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  ),
}
