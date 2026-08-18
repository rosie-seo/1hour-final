"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Heart } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useWishlist } from "@/hooks/use-wishlist"
import { cn } from "@/lib/utils"
import { myPageNav, myPageUser } from "@/lib/course-data"

type NavItem = { label: string; href: string }

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "rounded-lg px-3 py-2.5 text-sm transition-colors",
        active
          ? "bg-muted font-semibold text-foreground"
          : "text-foreground/80 hover:bg-muted"
      )}
    >
      {item.label}
    </Link>
  )
}

/**
 * 마이페이지 공통 사이드 네비게이션.
 * 구독 관리 / 결제 내역이 같은 "구매" 섹션 안에서 형제로 보이도록 배치한다.
 */
export function MyPageSidebar() {
  const pathname = usePathname()
  const { ids, ready } = useWishlist()
  const isActive = (href: string) => {
    if (href === "#") return false
    // 마이페이지 루트는 하위 경로 전부의 접두사라 정확히 일치할 때만 활성으로 본다
    if (href === "/mypage") return pathname === href
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <aside className="flex flex-col gap-6">
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-3">
          <Avatar size="lg">
            <AvatarFallback className="bg-primary/15 text-base font-bold text-primary">
              {myPageUser.name.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-heading text-base font-bold">
              {myPageUser.name}
            </p>
            <p className="text-xs text-muted-foreground">{myPageUser.level}</p>
          </div>
        </div>

        <button
          type="button"
          className="mt-4 flex w-full items-center justify-between rounded-xl border border-border px-3 py-2.5 text-sm font-semibold"
        >
          포인트
          <span className="flex items-center gap-1 text-muted-foreground">
            {myPageUser.points}
            <ChevronRight className="size-4" />
          </span>
        </button>

        <div className="mt-4 grid grid-cols-2 divide-x divide-border rounded-xl border border-border">
          {myPageUser.stats.map((stat) => (
            <div key={stat.label} className="px-2 py-3 text-center">
              <p className="text-sm font-bold">
                {/* 찜은 로컬에 저장되므로 실제 개수를 그대로 보여준다 */}
                {stat.label === "찜한 강의" && ready
                  ? `${ids.length}개`
                  : stat.value}
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          className="mt-4 w-full"
          render={<Link href="/mypage/profile" />}
          nativeButton={false}
        >
          내 프로필
        </Button>
      </div>

      <nav className="flex flex-col gap-1 rounded-2xl border border-border bg-card p-3">
        <p className="px-3 py-1 text-xs font-semibold text-muted-foreground">
          {myPageNav.classroom.heading}
        </p>
        {myPageNav.classroom.items.map((item) => (
          <NavLink key={item.label} item={item} active={isActive(item.href)} />
        ))}

        <Separator className="my-2" />
        <p className="px-3 py-1 text-xs font-semibold text-muted-foreground">
          {myPageNav.purchase.heading}
        </p>
        {myPageNav.purchase.items.map((item) => (
          <NavLink key={item.label} item={item} active={isActive(item.href)} />
        ))}
      </nav>

      <a
        href="/storybook"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-2xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm font-semibold text-primary hover:bg-primary/10"
      >
        <Heart className="size-4 fill-current" />
        개발 · 디자이너 응원하기
      </a>
    </aside>
  )
}
