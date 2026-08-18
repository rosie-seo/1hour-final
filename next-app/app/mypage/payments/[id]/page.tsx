import Image from "next/image"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { PrintButton } from "@/components/mypage/print-button"
import { paymentHistory } from "@/lib/course-data"

export const metadata: Metadata = {
  title: "결제 확인서",
}

function formatWon(value: number) {
  return `${value.toLocaleString("ko-KR")}원`
}

function formatNumber(value: number) {
  return value.toLocaleString("ko-KR")
}

function paymentOrg(method: string) {
  if (method.includes("카카오페이")) return "카카오페이(주)"
  if (method.includes("카드")) return "신용카드사"
  return method
}

function formatIssueDate(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return {
    display: `${y}. ${m}. ${d}`,
    compact: `${String(y).slice(2)}${m}${d}`,
  }
}

export function generateStaticParams() {
  return paymentHistory.map((tx) => ({ id: tx.id }))
}

export default async function PaymentReceiptPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const tx = paymentHistory.find((t) => t.id === id)
  if (!tx) notFound()

  const issueDate = formatIssueDate(new Date())
  const docNumber = `CK-${issueDate.compact}-${tx.id}`
  const orderNumber = `55${tx.id.replace(/\D/g, "")}`

  const rows: { label: string; value: string; benefit?: boolean }[] = [
    { label: "주문금액", value: formatWon(tx.regularPrice) },
    // 할인을 한 줄로 합치지 않고 출처별로 남긴다 — 어떤 혜택으로 얼마를
    // 아꼈는지가 증빙에서도 확인 가능해야 한다.
    ...tx.discounts.map((line) => ({
      label: line.label,
      value: `-${formatWon(line.amount)}`,
      benefit: line.kind === "benefit",
    })),
    {
      label: "결제수단 / 금액",
      value: `${tx.method.replace(" 결제", "")}  |  ${formatWon(tx.finalPrice)}`,
    },
    { label: "결제기관", value: paymentOrg(tx.method) },
    { label: "할부개월", value: "일시불" },
  ]

  const studentInfo = [
    { label: "이름", value: "김*현" },
    { label: "휴대폰 번호", value: "010****1234" },
    { label: "이메일 주소", value: "ho****@example.com" },
  ]

  const sellerInfo = [
    { label: "사업자 정보", value: "(주)캘리잉글리시" },
    { label: "사이트 주소", value: "callyenglish.co.kr" },
    { label: "연락처", value: "1544-0000" },
  ]

  return (
    <div className="min-h-svh bg-muted/40 py-10 print:bg-white print:py-0">
      <div className="mx-auto max-w-3xl bg-card p-8 sm:p-12 print:p-0">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-6">
          <Image
            src="/logo.png"
            alt="캘리쌤 영어"
            width={160}
            height={40}
            className="h-8 w-auto"
          />
          <div className="flex items-center gap-4 text-xs text-muted-foreground sm:gap-6">
            <span>Speak Every Day</span>
            <span>callyenglish.co.kr</span>
          </div>
        </div>

        <h1 className="mt-10 font-heading text-3xl font-black tracking-tight">
          결제 확인서
        </h1>
        <div className="mt-3 h-1 w-16 bg-primary" />

        <dl className="mt-6 flex flex-col gap-1 text-sm">
          <div className="flex gap-3">
            <dt className="w-20 shrink-0 text-muted-foreground">문서번호</dt>
            <dd>{docNumber}</dd>
          </div>
          <div className="flex gap-3">
            <dt className="w-20 shrink-0 text-muted-foreground">주문번호</dt>
            <dd>{orderNumber}</dd>
          </div>
          <div className="flex gap-3">
            <dt className="w-20 shrink-0 text-muted-foreground">발행일자</dt>
            <dd>{issueDate.display}</dd>
          </div>
        </dl>

        <h2 className="mt-10 text-sm font-bold">주문내역</h2>
        <table className="mt-3 w-full text-sm">
          <thead>
            <tr className="border-y border-border bg-muted/60 text-left text-xs text-muted-foreground">
              <th className="w-12 py-2 pl-3 font-medium">번호</th>
              <th className="py-2 font-medium">상품명</th>
              <th className="py-2 pr-3 text-right font-medium">금액 (원)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="py-3 pl-3 text-muted-foreground">1</td>
              <td className="py-3">{tx.title}</td>
              <td className="py-3 pr-3 text-right">
                {formatNumber(tx.regularPrice)}
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="py-3 pl-3 font-bold">
                합계
              </td>
              <td className="py-3 pr-3 text-right font-bold">
                {formatNumber(tx.regularPrice)}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-4 flex items-center justify-between rounded-lg bg-primary/10 px-4 py-3">
          <span className="text-sm font-medium">상품 결제내역 합계</span>
          <span className="text-lg font-black text-primary">
            {formatWon(tx.finalPrice)}
          </span>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-bold">결제 정보</h2>
          <span className="text-xs text-muted-foreground">
            결제일시 : {tx.date}
          </span>
        </div>
        <dl className="mt-3 divide-y divide-border rounded-lg border border-border text-sm">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between px-4 py-2.5"
            >
              <dt
                className={
                  row.benefit
                    ? "font-medium text-primary"
                    : "text-muted-foreground"
                }
              >
                {row.benefit && "🎁 "}
                {row.label}
              </dt>
              <dd
                className={row.benefit ? "font-medium text-primary" : undefined}
              >
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-bold">수강생 정보</h2>
            <dl className="mt-3 divide-y divide-border rounded-lg border border-border text-sm">
              {studentInfo.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between px-4 py-2.5"
                >
                  <dt className="text-muted-foreground">{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="text-sm font-bold">판매사업자 정보</h2>
            <dl className="mt-3 divide-y divide-border rounded-lg border border-border text-sm">
              {sellerInfo.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between px-4 py-2.5"
                >
                  <dt className="text-muted-foreground">{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          해당 결제확인서는 결제 증빙 용도로만 사용 가능하며, 동의없이 무단 수정
          및 부정 사용을 금지합니다.
        </p>
        <p className="mt-4 text-center text-xs text-muted-foreground/70">
          Copyright ⓒ (주)캘리잉글리시 All right reserved.
        </p>
      </div>

      <div className="mx-auto mt-6 flex max-w-3xl justify-center print:hidden">
        <PrintButton />
      </div>
    </div>
  )
}
