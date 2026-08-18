import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { curriculum } from "@/lib/course-data"

export function Curriculum() {
  return (
    <section id="curriculum" className="border-b border-border">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-primary">커리큘럼</p>
          <h2 className="mt-2 font-heading text-2xl font-black tracking-tight text-balance sm:text-3xl">
            커리큘럼을 보여드려요
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            매달 {curriculum.length}개 에피소드로 구성되어 있습니다.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-6">
          {curriculum.map((part) => (
            <div
              key={part.section}
              className="overflow-hidden rounded-2xl border border-border"
            >
              <div className="flex items-center gap-3 bg-muted/60 px-4 py-3 sm:px-5">
                <span className="shrink-0 text-sm font-bold text-primary">
                  {part.section}
                </span>
                <span className="h-4 w-px shrink-0 bg-border" />
                <span className="text-sm font-semibold text-foreground">
                  {part.title}
                </span>
              </div>

              <Accordion defaultValue={[0]} className="px-4 sm:px-5">
                {part.lessons.map((lesson, i) => (
                  <AccordionItem key={lesson.tag} value={i}>
                    <AccordionTrigger className="py-4 text-sm font-bold sm:text-base">
                      {String(i + 1).padStart(2, "0")}.{" "}
                      <span className="text-primary">[{lesson.tag}]</span>{" "}
                      {lesson.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                        {lesson.points.map((point) => (
                          <li key={point} className="flex gap-2">
                            <span className="shrink-0 text-muted-foreground/50">
                              –
                            </span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
