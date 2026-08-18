import { learningPolicy } from "@/lib/course-data"

export function RefundPolicy() {
  return (
    <section className="border-b border-border bg-muted/40">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h2 className="font-heading text-xl font-black tracking-tight sm:text-2xl">
          {learningPolicy.title}
        </h2>

        <div className="mt-6 rounded-2xl border border-border bg-card p-6 text-sm leading-relaxed sm:p-8">
          <h3 className="font-heading text-base font-bold">
            {learningPolicy.studyRules.heading}
          </h3>
          <ul className="mt-3 flex flex-col gap-1.5 text-destructive">
            {learningPolicy.studyRules.warnings.map((warning) => (
              <li key={warning}>* {warning}</li>
            ))}
          </ul>

          <p className="mt-5 font-semibold text-foreground">
            {learningPolicy.studyRules.periodLabel}
          </p>
          <ul className="mt-2 flex flex-col gap-1.5 text-muted-foreground">
            {learningPolicy.studyRules.periodItems.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="shrink-0">·</span>
                {item}
              </li>
            ))}
          </ul>

          <hr className="my-6 border-border" />

          <h3 className="font-heading text-base font-bold">
            {learningPolicy.cautions.heading}
          </h3>
          <ul className="mt-3 flex flex-col gap-1.5 text-muted-foreground">
            {learningPolicy.cautions.items.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="shrink-0">·</span>
                {item}
              </li>
            ))}
          </ul>

          <hr className="my-6 border-border" />

          <h3 className="font-heading text-base font-bold">
            {learningPolicy.refund.heading}
          </h3>
          <ul className="mt-3 flex flex-col gap-1.5 text-muted-foreground">
            {learningPolicy.refund.items.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="shrink-0">·</span>
                {item}
              </li>
            ))}
            <li className="flex gap-2">
              <span className="shrink-0">·</span>
              <span>
                {learningPolicy.refund.tiered.lead}
                <br />
                {learningPolicy.refund.tiered.subLead}
                <br />
                {learningPolicy.refund.tiered.tiers.map((tier) => (
                  <span key={tier} className="block pl-3">
                    : {tier}
                  </span>
                ))}
              </span>
            </li>
          </ul>

          <p className="mt-6 text-xs text-muted-foreground">
            {learningPolicy.footnote}
          </p>
        </div>
      </div>
    </section>
  )
}
