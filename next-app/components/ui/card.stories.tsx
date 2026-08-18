import type { Meta, StoryObj } from "@storybook/react-vite"

import { Badge } from "./badge"
import { Button } from "./button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>캘리쌤의 영어 챌린지</CardTitle>
        <CardDescription>매일 30분으로 끝내는 국내 어학연수!</CardDescription>
        <CardAction>
          <Badge variant="destructive">60% 할인</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          캘리쌤의 실제 브이로그로 상황을 익히고, 매일 듣고 말하며 피드백을 받는
          스피킹 전용 챌린지입니다.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">지금 결제하고 시작하기</Button>
      </CardFooter>
    </Card>
  ),
}

export const WithoutFooter: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>연속 수강일</CardTitle>
        <CardDescription>현재 연속 수강일</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-heading text-2xl font-black">0일</p>
      </CardContent>
    </Card>
  ),
}
