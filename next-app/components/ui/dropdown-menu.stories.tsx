import type { Meta, StoryObj } from "@storybook/react-vite"
import { ChevronDown } from "lucide-react"

import { Avatar, AvatarFallback } from "./avatar"
import { Button } from "./button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu"

const meta = {
  title: "UI/DropdownMenu",
  component: DropdownMenu,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline">
            메뉴 <ChevronDown className="size-4" />
          </Button>
        }
        nativeButton={false}
      />
      <DropdownMenuContent align="start">
        <DropdownMenuItem>마이페이지</DropdownMenuItem>
        <DropdownMenuItem>내 강의 보기</DropdownMenuItem>
        <DropdownMenuItem>구매 내역</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const UserMenu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1.5 rounded-full py-1 pr-1.5 pl-1 text-sm font-medium outline-none hover:bg-muted">
        <Avatar size="sm">
          <AvatarFallback className="bg-primary/15 text-xs font-bold text-primary">
            김
          </AvatarFallback>
        </Avatar>
        <span>김홍현님</span>
        <ChevronDown className="size-3.5 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>내 계정</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>마이페이지</DropdownMenuItem>
        <DropdownMenuItem>내 강의 보기</DropdownMenuItem>
        <DropdownMenuItem>구매 내역</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}
