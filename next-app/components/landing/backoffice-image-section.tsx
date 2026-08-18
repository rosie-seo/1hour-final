import Image from "next/image"

import type { BackofficeImage } from "@/lib/course-data"

/**
 * Renders one or more admin-uploaded images edge-to-edge.
 * In production, `images` comes from the backoffice image uploader for this slot.
 */
export function BackofficeImageSection({
  id,
  images,
}: {
  id?: string
  images: BackofficeImage[]
}) {
  return (
    <section id={id} className="border-b border-border">
      {images.map((image) => (
        <div key={image.src} className="flex justify-center">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="h-auto w-full max-w-md"
          />
        </div>
      ))}
    </section>
  )
}
