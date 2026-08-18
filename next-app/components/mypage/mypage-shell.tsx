import type { ReactNode } from "react"

import { SiteHeader } from "@/components/landing/site-header"
import { MyPageSidebar } from "@/components/mypage/mypage-sidebar"

/** 사이드 네비게이션 + 본문 2단 레이아웃 — 타이틀은 사이드바가 아니라 본문 위에 놓인다 */
export function MyPageShell({
  title,
  description,
  action,
  children,
}: {
  title: string
  description?: string
  action?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="flex min-h-svh flex-col bg-muted/30">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <MyPageSidebar />
          <div className="min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="font-heading text-2xl font-black tracking-tight">
                  {title}
                </h1>
                {description && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {description}
                  </p>
                )}
              </div>
              {action}
            </div>

            <div className="mt-6">{children}</div>
          </div>
        </div>
      </main>
    </div>
  )
}
