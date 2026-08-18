import { Star } from "lucide-react"

import { starReviews, testimonials } from "@/lib/course-data"

function initial(name: string) {
  return name.replace(/[^가-힣a-zA-Z]/g, "").slice(0, 1) || "?"
}

export function Testimonials() {
  return (
    <section id="reviews" className="border-b border-border bg-muted/40">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="text-center">
          <p className="text-sm font-semibold text-primary">REVIEW</p>
          <h2 className="mt-2 font-heading text-2xl font-black tracking-tight text-balance sm:text-3xl">
            단, 한 달만에 일어난 변화입니다
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {initial(t.name)}
                </span>
                <span className="text-sm font-bold">@{t.name}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                {t.quote}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-14 text-center text-sm font-semibold text-primary">
          베타 서비스 분들의 생생한 찐 후기
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {starReviews.map((r) => (
            <div
              key={r.name}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{r.name}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                {r.quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
