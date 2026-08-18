"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Play } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { course } from "@/lib/course-data"
import { totalWrongCount } from "@/lib/review-data"
import { doneCount, episodes } from "@/lib/study-data"
import { subscriptions } from "@/lib/billing-data"

/** 지금은 상품이 하나뿐이지만, 늘어나도 같은 드롭다운에 항목만 추가되면 된다 */
const enrolledCourses = [
  {
    id: course.id,
    title: course.title,
    thumbnail: course.thumbnail,
    status: "수강 중",
    href: "/mypage/classroom",
  },
]

function CourseSwitcher() {
  const current = enrolledCourses[0]
  const active = subscriptions.find((sub) => sub.status === "active")
  const totalSteps = episodes.reduce((sum, ep) => sum + ep.steps.length, 0)
  const totalDone = episodes.reduce((sum, ep) => sum + doneCount(ep), 0)
  const percent = Math.round((totalDone / totalSteps) * 100)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-full items-stretch gap-3 overflow-hidden rounded-2xl border border-border bg-card text-left outline-none transition-colors hover:bg-muted/40 data-popup-open:bg-muted/40">
        <div className="relative w-20 shrink-0 overflow-hidden">
          <Image
            src={current.thumbnail}
            alt=""
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-3 py-5 pr-5">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold">{current.title}</p>
            <div className="mt-1.5 flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="shrink-0 text-[11px] font-semibold text-muted-foreground tabular-nums">
                {percent}%
              </span>
            </div>
          </div>
          <ChevronDown
            className="size-4 shrink-0 text-muted-foreground"
            aria-hidden
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" sideOffset={8} className="p-2">
        {enrolledCourses.map((item) => (
          <DropdownMenuItem
            key={item.id}
            render={<Link href={item.href} />}
            className="flex-col items-stretch gap-0 rounded-xl p-2 focus:bg-muted/60"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={item.thumbnail}
                alt=""
                fill
                sizes="260px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/15" />
              <span className="absolute top-2 left-2 rounded-md bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">
                {item.status}
              </span>
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex size-9 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/40 backdrop-blur-sm">
                  <Play
                    className="size-3.5 fill-white text-white"
                    aria-hidden
                  />
                </span>
              </span>
            </div>

            <p className="mt-2.5 line-clamp-2 text-sm font-bold text-foreground">
              {item.title}
            </p>

            <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${percent}%` }}
              />
            </div>
            <div className="mt-1.5 flex items-center justify-between text-xs text-muted-foreground">
              <span className="tabular-nums">
                {totalDone}/{totalSteps}단계 ({percent}%)
              </span>
              {active && <span>{active.planName}</span>}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/** 마이페이지 사이드바와 짝을 이루는 내 강의장 전용 네비게이션 */
export function ClassroomSidebar() {
  const pathname = usePathname()
  const wrongCount = totalWrongCount()
  const isActive = (href: string) =>
    href === "/mypage/classroom"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`)

  const classroomNav: { label: string; href: string; badge?: number }[] = [
    { label: "내 강의장", href: "/mypage/classroom" },
    { label: "복습하기", href: "/mypage/classroom/review", badge: wrongCount },
  ]

  return (
    <aside className="flex flex-col gap-6">
      <CourseSwitcher />

      {/* lg 미만: 가로 스크롤 탭 */}
      <nav className="flex gap-1 overflow-x-auto border-b border-border lg:hidden">
        {classroomNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive(item.href) ? "page" : undefined}
            className={cn(
              "flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-3 text-sm font-medium whitespace-nowrap transition-colors",
              isActive(item.href)
                ? "border-primary font-bold text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {item.label}
            {!!item.badge && (
              <span className="flex size-5 items-center justify-center rounded-full bg-destructive text-[11px] font-bold text-white">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* lg 이상: 세로 목록 */}
      <nav className="hidden flex-col gap-1 rounded-2xl border border-border bg-card p-3 lg:flex">
        {classroomNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive(item.href) ? "page" : undefined}
            className={cn(
              "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors",
              isActive(item.href)
                ? "bg-muted font-semibold text-foreground"
                : "text-foreground/80 hover:bg-muted"
            )}
          >
            {item.label}
            {!!item.badge && (
              <span className="flex size-5 items-center justify-center rounded-full bg-destructive text-[11px] font-bold text-white">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
