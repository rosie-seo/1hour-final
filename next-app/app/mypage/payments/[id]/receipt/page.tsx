import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ReceiptActions } from "@/components/mypage/receipt-actions"
import { paymentHistory } from "@/lib/course-data"

export const metadata: Metadata = {
  title: "결제 영수증",
}

function formatWon(value: number) {
  return `${value.toLocaleString("ko-KR")}원`
}

function cardIssuer(method: string) {
  if (method.includes("카카오페이")) return "카카오페이"
  return "국민카드"
}

function maskedCardNumber(method: string) {
  if (method.includes("카카오페이")) return "-"
  return "49876100****557*"
}

function approvalNumber(id: string) {
  const digits = id.replace(/\D/g, "").padStart(6, "0")
  return `3${digits}`
}

function formatDateTime(date: string) {
  const [d, t] = date.split(" ")
  return `${d.replace(/\./g, "-")} ${t}:00`
}

export function generateStaticParams() {
  return paymentHistory.map((tx) => ({ id: tx.id }))
}

export default async function PaymentReceiptSlipPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const tx = paymentHistory.find((t) => t.id === id)
  if (!tx) notFound()

  const orderRows = [
    {
      label: "주문번호",
      value: `imp_${approvalNumber(tx.id)}${tx.id.replace(/\D/g, "")}`,
    },
    { label: "구매자", value: "김홍현" },
    { label: "구매상품", value: tx.title },
  ]

  const cardRows = [
    { label: "카드종류", value: cardIssuer(tx.method) },
    { label: "카드번호", value: maskedCardNumber(tx.method) },
    { label: "할부", value: "일시불" },
    { label: "결제상태", value: "완료" },
    { label: "승인번호", value: approvalNumber(tx.id) },
    { label: "결제일시", value: formatDateTime(tx.date) },
  ]

  const amountRows = [
    { label: "공급가액", value: formatWon(0) },
    { label: "면세가액", value: formatWon(tx.finalPrice) },
    { label: "부가세", value: formatWon(0) },
    { label: "과세제외액", value: formatWon(0) },
  ]

  return (
    <div className="min-h-svh bg-muted/40 py-10 print:bg-white print:py-0">
      <div className="mx-auto max-w-sm bg-card p-6 sm:p-8 print:p-0">
        <h1 className="font-heading text-xl font-black tracking-tight">
          신용 · 체크카드 매출전표
        </h1>

        <div className="mt-4 flex items-center justify-between print:hidden">
          <ReceiptActions />
          <div className="flex items-center gap-1 rounded-full bg-muted p-1 text-xs font-medium">
            <span className="rounded-full bg-card px-2.5 py-1 shadow-sm">
              KOR
            </span>
            <span className="px-2.5 py-1 text-muted-foreground">ENG</span>
          </div>
        </div>

        <dl className="mt-6 flex flex-col gap-2 text-sm">
          {orderRows.map((row) => (
            <div
              key={row.label}
              className="flex items-start justify-between gap-4"
            >
              <dt className="text-muted-foreground">{row.label}</dt>
              <dd className="text-right font-semibold">{row.value}</dd>
            </div>
          ))}
        </dl>

        <hr className="my-5 border-border" />

        <dl className="flex flex-col gap-2 text-sm">
          {cardRows.map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <dt className="text-muted-foreground">{row.label}</dt>
              <dd className="font-semibold">{row.value}</dd>
            </div>
          ))}
        </dl>

        <hr className="my-5 border-border" />

        <dl className="flex flex-col gap-2 text-sm">
          {amountRows.map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <dt className="text-muted-foreground">{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
          <div className="flex items-center justify-between">
            <dt className="font-semibold text-primary">합계</dt>
            <dd className="text-lg font-black text-primary">
              {formatWon(tx.finalPrice)}
            </dd>
          </div>
        </dl>

        <hr className="my-5 border-border" />

        <div className="text-xs leading-relaxed text-muted-foreground">
          <p className="font-semibold text-foreground">이용상점</p>
          <p className="mt-1">
            주식회사 캘리잉글리시 | 대표자명: 홍길동
            <br />
            사업자등록번호: 000-86-00000 | 전화: 1544-0000
            <br />
            주소: 서울특별시 강남구 테헤란로 000, 0층
          </p>

          <p className="mt-4 font-semibold text-foreground">결제서비스업체</p>
          <p className="mt-1">
            페이브릿지(주) | 대표자명: 박서준
            <br />
            사업자등록번호: 000-86-00000 | 전화: 1544-7772
            <br />
            주소: 서울특별시 강남구 테헤란로 131, 14층
          </p>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-muted-foreground/80">
          부가가치세법 제46조 3항에 따라 신용카드 매출전표도 매입세금계산서로
          사용할 수 있습니다.
          <br />
          과세제외액(컨 보증금 등)은 조세특례제한법 제126조의2에 따른 신용카드
          등 사용금액에 대한 소득공제에서 제외됩니다.
        </p>

        <p className="mt-6 text-sm font-bold tracking-tight">페이브릿지</p>
      </div>
    </div>
  )
}
