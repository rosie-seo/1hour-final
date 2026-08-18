import type { Meta, StoryObj } from "@storybook/react-vite"
import { Heart } from "lucide-react"

import { Button } from "./button"

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "outline",
        "secondary",
        "ghost",
        "destructive",
        "link",
      ],
    },
    size: {
      control: "select",
      options: [
        "default",
        "xs",
        "sm",
        "lg",
        "icon",
        "icon-xs",
        "icon-sm",
        "icon-lg",
      ],
    },
  },
  args: {
    children: "Button",
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    variant: "default",
    size: "default",
  },
}

export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {(
        [
          "default",
          "outline",
          "secondary",
          "ghost",
          "destructive",
          "link",
        ] as const
      ).map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
}

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {(["xs", "sm", "default", "lg"] as const).map((size) => (
        <Button key={size} {...args} size={size}>
          {size}
        </Button>
      ))}
      <Button {...args} size="icon" aria-label="좋아요">
        <Heart />
      </Button>
    </div>
  ),
}

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Heart />
        응원하기
      </>
    ),
  },
}
