import type { Meta, StoryObj } from "@storybook/react-vite"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"

const meta = {
  title: "UI/Tabs",
  component: Tabs,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="payments" className="w-80">
      <TabsList>
        <TabsTrigger value="payments">결제 내역</TabsTrigger>
        <TabsTrigger value="refunds">환불 내역</TabsTrigger>
      </TabsList>
      <TabsContent value="payments" className="p-2 text-muted-foreground">
        결제 내역이 여기 표시됩니다.
      </TabsContent>
      <TabsContent value="refunds" className="p-2 text-muted-foreground">
        환불 내역이 없습니다.
      </TabsContent>
    </Tabs>
  ),
}

export const Line: Story = {
  render: () => (
    <Tabs defaultValue="payments" className="w-80">
      <TabsList variant="line" className="border-b border-border">
        <TabsTrigger value="payments">결제 내역</TabsTrigger>
        <TabsTrigger value="refunds">환불 내역</TabsTrigger>
      </TabsList>
      <TabsContent value="payments" className="p-2 text-muted-foreground">
        결제 내역이 여기 표시됩니다.
      </TabsContent>
      <TabsContent value="refunds" className="p-2 text-muted-foreground">
        환불 내역이 없습니다.
      </TabsContent>
    </Tabs>
  ),
}
