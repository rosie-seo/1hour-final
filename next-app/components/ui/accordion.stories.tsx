import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion"

const meta = {
  title: "UI/Accordion",
  component: Accordion,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

const faqs = [
  {
    question: "스마트폰으로만 공부가 가능한가요?",
    answer:
      "PC, 태블릿, 스마트폰 등 인터넷 접속이 가능한 기기에서는 대부분 공부가 가능합니다.",
  },
  {
    question: "커리큘럼은 어떻게 되나요?",
    answer: "1개월 기준, 총 20일 분량의 커리큘럼이 순차적으로 제공됩니다.",
  },
  {
    question: "할부 결제가 가능한가요?",
    answer: "7개 카드사 무이자 할부를 지원합니다.",
  },
]

export const Default: Story = {
  render: () => (
    <Accordion
      defaultValue={[0]}
      className="w-96 rounded-2xl border border-border bg-card px-4"
    >
      {faqs.map((item, index) => (
        <AccordionItem key={item.question} value={index}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
}

export const Multiple: Story = {
  render: () => (
    <Accordion
      multiple
      defaultValue={[0, 1]}
      className="w-96 rounded-2xl border border-border bg-card px-4"
    >
      {faqs.map((item, index) => (
        <AccordionItem key={item.question} value={index}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
}
