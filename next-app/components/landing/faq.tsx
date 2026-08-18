import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqs } from "@/lib/course-data"

export function Faq() {
  return (
    <section id="faq" className="border-b border-border">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-primary">FAQ</p>
          <h2 className="mt-2 font-heading text-2xl font-black tracking-tight text-balance sm:text-3xl">
            자주 묻는 질문
          </h2>
        </div>

        <Accordion
          defaultValue={[0]}
          className="mt-10 rounded-2xl border border-border bg-card px-4 sm:px-6"
        >
          {faqs.map((item, index) => (
            <AccordionItem key={item.question} value={index}>
              <AccordionTrigger className="py-4 text-sm font-bold sm:text-base">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
