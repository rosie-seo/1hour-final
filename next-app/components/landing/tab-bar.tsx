"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const tabs = [
  { id: "product-intro", label: "상품소개" },
  { id: "speaker-intro", label: "연사소개" },
  { id: "curriculum", label: "커리큘럼" },
  { id: "pricing", label: "가격안내" },
  { id: "reviews", label: "후기" },
  { id: "faq", label: "FAQ" },
]

export function TabBar() {
  const [active, setActive] = React.useState(tabs[0].id)

  React.useEffect(() => {
    const sections = tabs
      .map((tab) => document.getElementById(tab.id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="sticky top-16 z-40 border-b border-border bg-background/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 sm:justify-center sm:px-6">
        {tabs.map((tab) => (
          <a
            key={tab.id}
            href={`#${tab.id}`}
            className={cn(
              "shrink-0 border-b-2 px-3 py-3 text-sm whitespace-nowrap transition-colors",
              active === tab.id
                ? "border-primary font-bold text-primary"
                : "border-transparent font-medium text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </a>
        ))}
      </nav>
    </div>
  )
}
