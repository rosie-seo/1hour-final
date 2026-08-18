"use client"

import * as React from "react"
import Image from "next/image"
import { BadgeCheck, ChevronDown, ChevronUp, PlayCircle } from "lucide-react"

import { instructor } from "@/lib/course-data"

export function Instructor() {
  const [expanded, setExpanded] = React.useState(true)

  return (
    <section id="speaker-intro" className="border-b border-border bg-primary/5">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="text-sm font-semibold text-primary">연사 소개</p>
        <h2 className="mt-2 font-heading text-3xl font-black tracking-tight">
          {instructor.name}
        </h2>
        <p className="mt-1 text-muted-foreground">{instructor.role}</p>

        <div className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-foreground/90">
          {instructor.greeting.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-8 rounded-2xl bg-card p-5 ring-1 ring-border sm:p-6">
          <div className="flex items-center gap-3">
            <div className="relative size-14 shrink-0 overflow-hidden rounded-full ring-1 ring-border">
              <Image
                src="/hero-kelly-english.png"
                alt={instructor.name}
                fill
                sizes="56px"
                className="object-cover"
                style={{ objectPosition: "95% 40%" }}
              />
            </div>
            <div>
              <p className="flex items-center gap-1 font-heading text-base font-bold">
                {instructor.name}
                <BadgeCheck className="size-4 text-primary" />
              </p>
              <p className="text-xs text-muted-foreground">{instructor.role}</p>
            </div>
          </div>

          <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <PlayCircle className="size-4" />
            {instructor.channel.handle}
          </p>

          {expanded && (
            <>
              <h3 className="mt-5 font-heading text-sm font-bold">활동</h3>
              <p className="mt-2 text-sm text-foreground/90">
                {instructor.current}
              </p>

              <p className="mt-4 text-xs font-semibold text-muted-foreground">
                [이력]
              </p>
              <ul className="mt-1.5 flex flex-col gap-1 text-sm text-foreground/90">
                <li>
                  {instructor.channel.name} 운영 ({instructor.channel.handle} ·{" "}
                  {instructor.channel.subscribers})
                </li>
                {instructor.facts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
            </>
          )}

          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-5 flex w-full items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            {expanded ? "닫기" : "더보기"}
            {expanded ? (
              <ChevronUp className="size-3.5" />
            ) : (
              <ChevronDown className="size-3.5" />
            )}
          </button>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          {instructor.closing}
        </p>
      </div>
    </section>
  )
}
