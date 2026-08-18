"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

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

function NavTab({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "shrink-0 border-b-2 px-3 py-3 text-sm font-medium whitespace-nowrap transition-colors",
        active
          ? "border-primary font-bold text-primary"
          : "border-transparent text-muted-foreground hover:text-foreground"
      )}
    >
      {item.label}
    </Link>
  )
}

const flatNavItems: NavItem[] = [
  ...myPageNav.home.items,
  ...myPageNav.benefits.items,
  ...myPageNav.purchase.items,
]

/**
 * 마이페이지 공통 사이드 네비게이션.
 * 구독 관리 / 결제 내역이 같은 "구매" 섹션 안에서 형제로 보이도록 배치한다.
 * lg 미만에서는 세로 목록 대신 가로 스크롤 탭으로 전환된다.
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

        <div className="mt-4 grid grid-cols-2 divide-x divide-border overflow-hidden rounded-xl border border-border">
          {myPageUser.stats.map((stat) => {
            const value =
              /* 찜은 로컬에 저장되므로 실제 개수를 그대로 보여준다 */
              stat.label === "찜한 강의" && ready
                ? `${ids.length}개`
                : stat.value

            if (stat.href) {
              return (
                <Link
                  key={stat.label}
                  href={stat.href}
                  className="px-2 py-3 text-center transition-colors hover:bg-muted"
                >
                  <p className="text-sm font-bold">{value}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {stat.label}
                  </p>
                </Link>
              )
            }

            return (
              <div key={stat.label} className="px-2 py-3 text-center">
                <p className="text-sm font-bold">{value}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            )
          })}
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

      {/* lg 미만: 가로 스크롤 탭 */}
      <nav className="flex gap-1 overflow-x-auto border-b border-border lg:hidden">
        {flatNavItems.map((item) => (
          <NavTab key={item.label} item={item} active={isActive(item.href)} />
        ))}
      </nav>

      {/* lg 이상: 세로 목록 */}
      <nav className="hidden flex-col gap-1 rounded-2xl border border-border bg-card p-3 lg:flex">
        <p className="px-3 py-1 text-xs font-semibold text-muted-foreground">
          {myPageNav.home.heading}
        </p>
        {myPageNav.home.items.map((item) => (
          <NavLink key={item.label} item={item} active={isActive(item.href)} />
        ))}

        <Separator className="my-2" />
        <p className="px-3 py-1 text-xs font-semibold text-muted-foreground">
          {myPageNav.benefits.heading}
        </p>
        {myPageNav.benefits.items.map((item) => (
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
    </aside>
  )
}
