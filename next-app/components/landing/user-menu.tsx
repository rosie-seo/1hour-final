"use client"

import Link from "next/link"
import { ChevronDown, LogOut } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const user = {
  name: "김홍현",
}

export function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1.5 rounded-full py-1 pr-1.5 pl-1 text-sm font-medium text-foreground outline-none hover:bg-muted">
        <Avatar size="sm">
          <AvatarFallback className="bg-primary/15 text-xs font-bold text-primary">
            {user.name.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
        <span>{user.name}님</span>
        <ChevronDown className="size-3.5 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem render={<Link href="/mypage" />}>
          마이페이지
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link href="/mypage/classroom" />}>
          내 강의 보기
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link href="/mypage/subscriptions" />}>
          구독 관리
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOut className="size-4" />
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
