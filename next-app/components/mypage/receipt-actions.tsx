"use client"

import { Link2, Printer } from "lucide-react"

export function ReceiptActions() {
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
  }

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={copyLink}
        aria-label="링크 복사"
        className="text-muted-foreground hover:text-foreground"
      >
        <Link2 className="size-4" />
      </button>
      <button
        type="button"
        onClick={() => window.print()}
        aria-label="인쇄"
        className="text-muted-foreground hover:text-foreground"
      >
        <Printer className="size-4" />
      </button>
    </div>
  )
}
