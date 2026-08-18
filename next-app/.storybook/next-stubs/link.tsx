import * as React from "react"

/**
 * Storybook은 Next.js 런타임 밖에서 돌기 때문에 next/link가 라우터 컨텍스트를
 * 찾지 못한다. 스토리에서는 링크의 겉모습과 접근성만 확인하면 되므로
 * 평범한 <a>로 대체한다.
 */
type LinkProps = React.ComponentProps<"a"> & {
  href: string | { pathname?: string }
  prefetch?: boolean
  replace?: boolean
  scroll?: boolean
  shallow?: boolean
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, prefetch, replace, scroll, shallow, ...props },
  ref
) {
  const resolved = typeof href === "string" ? href : (href?.pathname ?? "#")
  return <a ref={ref} href={resolved} {...props} />
})

export default Link
