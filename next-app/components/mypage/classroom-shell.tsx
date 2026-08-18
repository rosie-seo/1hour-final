import type { ReactNode } from "react"

import { SiteHeader } from "@/components/landing/site-header"
import { ClassroomSidebar } from "@/components/mypage/classroom-sidebar"

/**
 * 내 강의장 전용 레이아웃 — 마이페이지와 같은 사이드바 구조를 쓰되,
 * 계정(MyPageSidebar)이 아닌 학습 전용 네비게이션을 놓는다.
 * 설정/결제 정보(마이페이지)와 학습 공간(내 강의장)을 시각적으로도 분리한다.
 * 타이틀은 사이드바가 아니라 본문 위에 놓인다.
 */
export function ClassroomShell({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <div className="flex min-h-svh flex-col bg-muted/30">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <ClassroomSidebar />
          <div className="min-w-0">
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

            <div className="mt-6">{children}</div>
          </div>
        </div>
      </main>
    </div>
  )
}
