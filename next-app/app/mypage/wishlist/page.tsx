import type { Metadata } from "next"

import { MyPageShell } from "@/components/mypage/mypage-shell"
import { WishlistGrid } from "@/components/mypage/wishlist-grid"
import { wishlistCatalog } from "@/lib/course-data"

export const metadata: Metadata = {
  title: "찜한 강의",
}

export default function WishlistPage() {
  return (
    <MyPageShell
      title="찜한 강의"
      description="관심 있는 강의를 모아두고 나중에 신청하세요."
    >
      <WishlistGrid catalog={wishlistCatalog} />
    </MyPageShell>
  )
}
