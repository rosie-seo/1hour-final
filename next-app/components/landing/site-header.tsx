"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { UserMenu } from "@/components/landing/user-menu"

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-transparent bg-background/80 backdrop-blur-md transition-colors",
        scrolled && "border-border"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/#top" className="flex items-center">
          <Image
            src="/logo.png"
            alt="캘리쌤 영어"
            width={399}
            height={100}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        <div className="flex items-center gap-3">
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
