import type { Metadata } from "next"
import { Check, ChevronRight } from "lucide-react"

import { SiteHeader } from "@/components/landing/site-header"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { myPageUser, myProfile } from "@/lib/course-data"

export const metadata: Metadata = {
  title: "프로필 설정",
}

export default function ProfileSettingsPage() {
  return (
    <div className="flex min-h-svh flex-col bg-muted/30">
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10 sm:px-6">
        <section>
          <h2 className="font-heading text-xl font-black tracking-tight">
            기본 정보
          </h2>
          <div className="mt-4 divide-y divide-border border-t border-border">
            {myProfile.basic.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-4 py-5"
              >
                <span className="w-28 shrink-0 text-sm text-muted-foreground">
                  {row.label}
                </span>
                <span
                  className={cn(
                    "flex-1 text-sm font-medium",
                    row.muted && "text-muted-foreground"
                  )}
                >
                  {row.value}
                </span>
                {row.action && (
                  <Button variant="outline" size="sm" className="rounded-full">
                    {row.action}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-heading text-xl font-black tracking-tight">
            프로필 정보
          </h2>
          <div className="mt-4 flex items-center justify-between gap-4 border-t border-border py-5">
            <span className="w-28 shrink-0 text-sm text-muted-foreground">
              프로필
              <br />& 학습 레벨
            </span>
            <div className="flex flex-1 items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-primary/15 text-sm font-bold text-primary">
                  {myPageUser.name.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">
                  {myProfile.profile.handle}
                </p>
                <Badge className="mt-1">{myProfile.profile.level}</Badge>
              </div>
            </div>
            <Button variant="outline" size="sm" className="rounded-full">
              관리
            </Button>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-heading text-xl font-black tracking-tight">
            선택 정보
          </h2>
          <div className="mt-4 flex items-start justify-between gap-4 border-t border-border py-5">
            <span className="w-28 shrink-0 text-sm text-muted-foreground">
              광고성 정보
              <br />
              수신 관리
            </span>
            <div className="flex-1">
              <p className="flex items-center gap-2 text-sm font-medium">
                <span className="flex size-4 shrink-0 items-center justify-center rounded bg-primary text-primary-foreground">
                  <Check className="size-3" />
                </span>
                광고성 정보 수신 동의
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {myProfile.marketing.agreedAt} 동의
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {myProfile.marketing.description}
                <br />
                {myProfile.marketing.note}
              </p>
            </div>
          </div>
        </section>

        <a
          href="#"
          className="mt-10 inline-flex items-center gap-0.5 text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground"
        >
          회원탈퇴 <ChevronRight className="size-4" />
        </a>
      </main>
    </div>
  )
}
