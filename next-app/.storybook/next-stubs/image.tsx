import * as React from "react"

/**
 * next/image 대체. 최적화 파이프라인 없이 <img>로 그리되,
 * `fill` 레이아웃만 CSS로 흉내내 스토리의 배치가 앱과 같아지도록 한다.
 */
type ImageProps = Omit<React.ComponentProps<"img">, "src"> & {
  src: string | { src: string }
  fill?: boolean
  priority?: boolean
  quality?: number
  sizes?: string
  width?: number
  height?: number
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(function Image(
  { src, fill, priority, quality, sizes, style, alt = "", ...props },
  ref
) {
  const resolved = typeof src === "string" ? src : src.src
  return (
    <img
      ref={ref}
      src={resolved}
      alt={alt}
      style={
        fill
          ? {
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              ...style,
            }
          : style
      }
      {...props}
    />
  )
})

export default Image
