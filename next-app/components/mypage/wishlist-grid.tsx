"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useWishlist } from "@/hooks/use-wishlist"

type WishlistItem = {
  id: string
  title: string
  subtitle: string
  instructor: string
  thumbnail: string
  href: string
  priceLabel: string
  discountRate: number
}

export function WishlistGrid({ catalog }: { catalog: WishlistItem[] }) {
  const { ids, ready, toggle } = useWishlist()

  // 저장된 순서(찜한 순서)를 유지한다
  const items = ids
    .map((id) => catalog.find((course) => course.id === id))
    .filter((course): course is WishlistItem => course !== undefined)

  if (!ready) {
    return (
      <div className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
        불러오는 중…
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border py-16 text-center">
        <p className="text-sm text-muted-foreground">찜한 강의가 없습니다.</p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          render={<Link href="/" />}
          nativeButton={false}
        >
          강의 둘러보기
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="overflow-hidden rounded-2xl border border-border bg-card"
        >
          <Link href={item.href} className="relative block aspect-video">
            <Image
              src={item.thumbnail}
              alt=""
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </Link>

          <div className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <Link
                  href={item.href}
                  className="line-clamp-2 text-sm font-bold hover:underline"
                >
                  {item.title}
                </Link>
                <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                  {item.instructor}
                </p>
              </div>

              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-pressed
                className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
              >
                <span className="sr-only">찜 해제하기</span>
                <Heart
                  className="size-4 fill-destructive text-destructive"
                  aria-hidden
                />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-baseline gap-2">
              <span className="text-sm font-bold text-destructive">
                {item.discountRate}%
              </span>
              <span className="font-heading text-base font-black">
                {item.priceLabel}
              </span>
            </div>

            <Button
              className="mt-4 w-full"
              render={<Link href={`${item.href}#pricing`} />}
              nativeButton={false}
            >
              수강 신청
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
