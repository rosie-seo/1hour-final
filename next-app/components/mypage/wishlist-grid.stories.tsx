import type { Meta, StoryObj } from "@storybook/react-vite"

import { wishlistCatalog } from "@/lib/course-data"
import { WishlistGrid } from "./wishlist-grid"

const meta = {
  title: "MyPage/찜한 강의",
  component: WishlistGrid,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "찜 목록에는 강의 id만 저장하고 표시 정보는 카탈로그에서 찾는다. 비어 있으면 '강의 둘러보기'로 유도한다. (랜딩에서 하트를 눌러야 항목이 채워진다)",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof WishlistGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { catalog: wishlistCatalog },
}
