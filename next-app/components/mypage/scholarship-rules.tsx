"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { scholarshipRules } from "@/lib/scholarship-data"

export function ScholarshipRules() {
  return (
    <Accordion className="rounded-2xl border border-border bg-card px-5">
      {scholarshipRules.map((rule) => (
        <AccordionItem key={rule.question} value={rule.question}>
          <AccordionTrigger className="py-4 text-sm font-semibold">
            {rule.question}
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground">
            {rule.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
