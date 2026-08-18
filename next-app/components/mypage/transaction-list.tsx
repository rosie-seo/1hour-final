"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  ChevronDown,
  FileText,
  Receipt,
  RefreshCw,
  Search,
  X,
} from "lucide-react"

import { TransactionBenefits } from "@/components/mypage/benefit"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  benefitAmount,
  benefitUsed,
  subscriptionNetTotal,
  subscriptionTotal,
  type Subscription,
  type Transaction,
} from "@/lib/billing-data"

function formatWon(value: number) {
  const sign = value < 0 ? "-" : ""
  return `${sign}${Math.abs(value).toLocaleString("ko-KR")}원`
}

type FilterKey = "all" | "payment" | "refund" | "scheduled"

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "payment", label: "결제" },
  { key: "refund", label: "환불" },
  { key: "scheduled", label: "결제 예정" },
]

function matches(tx: Transaction, query: string) {
  if (!query) return true
  const q = query.toLowerCase()
  return [tx.orderNo, tx.planName, tx.courseTitle, tx.day, tx.method]
    .join(" ")
    .toLowerCase()
    .includes(q)
}

/**
 * 예외 상태만 배지로 표시한다.
 * 대부분의 행이 "결제완료"라 그 배지는 정보가 되지 못하고 시선만 분산시킨다.
 */
function StatusBadge({ tx }: { tx: Transaction }) {
  if (tx.type === "refund")
    return (
      <Badge variant="destructive" className="shrink-0">
        환불완료
      </Badge>
    )
  if (tx.type === "scheduled")
    return (
      <Badge
        variant="outline"
        className="shrink-0 border-primary/50 text-primary"
      >
        결제예정
      </Badge>
    )
  return null
}

function TransactionRow({
  tx,
  standalone = false,
}: {
  tx: Transaction
  standalone?: boolean
}) {
  const scheduled = tx.type === "scheduled"
  /** 증빙 문서는 실제 결제 건에만 발급된다 (환불·예정 건은 없음) */
  const hasDocuments = tx.type === "payment"

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3.5">
      <span className="w-[6.5rem] shrink-0 text-sm text-muted-foreground tabular-nums">
        {tx.day}
      </span>

      <span className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
        <StatusBadge tx={tx} />
        <span className="truncate text-sm font-medium">
          {standalone || scheduled ? tx.planName : tx.method}
        </span>
        <TransactionBenefits transaction={tx} />
        {!scheduled && (
          <span className="hidden truncate text-xs text-muted-foreground sm:inline">
            {tx.orderNo}
          </span>
        )}
      </span>

      <span className="shrink-0 text-right">
        <span
          className={cn(
            "block text-sm font-bold tabular-nums",
            tx.type === "refund" && "text-destructive",
            scheduled && "text-muted-foreground"
          )}
        >
          {formatWon(tx.finalPrice)}
        </span>
        {benefitAmount(tx) > 0 && (
          <s className="block text-[0.7rem] font-normal text-muted-foreground tabular-nums">
            {formatWon(Math.abs(tx.finalPrice) + benefitAmount(tx))}
          </s>
        )}
      </span>

      {hasDocuments && (
        <span className="flex shrink-0 gap-1.5">
          <Button
            variant="outline"
            size="xs"
            render={<Link href={`/mypage/payments/${tx.id}`} />}
            nativeButton={false}
          >
            <FileText data-icon="inline-start" />
            결제확인서
          </Button>
          <Button
            variant="outline"
            size="xs"
            render={<Link href={`/mypage/payments/${tx.id}/receipt`} />}
            nativeButton={false}
          >
            <Receipt data-icon="inline-start" />
            영수증
          </Button>
        </span>
      )}
    </div>
  )
}

function GroupCard({
  group,
  transactions,
  forceOpen,
}: {
  group: Subscription
  transactions: Transaction[]
  forceOpen: boolean
}) {
  const [open, setOpen] = useState(false)
  const expanded = open || forceOpen

  const PREVIEW = 2
  const collapsible = transactions.length > PREVIEW + 1
  const visible =
    collapsible && !expanded ? transactions.slice(0, PREVIEW) : transactions
  const hidden = transactions.length - visible.length

  const paidCount = group.transactions.filter(
    (t) => t.type === "payment"
  ).length
  const net = subscriptionNetTotal(group)
  const total = subscriptionTotal(group)
  const saved = benefitUsed(group)

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2 border-b border-border bg-muted/40 px-4 py-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{group.termLabel}</Badge>
            <span className="text-sm font-bold">{group.planName}</span>
            {group.recurring && (
              <Badge variant="outline" className="gap-1">
                <RefreshCw className="size-3" aria-hidden />
                정기결제
              </Badge>
            )}
            {group.status === "active" && (
              <Badge variant="secondary">이용중</Badge>
            )}
            {group.status === "expired" && (
              <Badge variant="outline">이용 종료</Badge>
            )}
            {group.status === "refunded" && (
              <Badge variant="outline">환불 종료</Badge>
            )}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {group.startedAt} ~ {group.endsAt} · {group.method}
          </p>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-xs text-muted-foreground">
            총 {paidCount}회 결제
            {net !== total && " · 환불 포함"}
          </p>
          <p className="font-heading text-sm font-black tabular-nums">
            {formatWon(net)}
          </p>
          {saved > 0 && (
            <p className="mt-0.5 text-xs text-primary tabular-nums">
              혜택 {formatWon(saved)} 절약
            </p>
          )}
        </div>
      </div>

      <div className="divide-y divide-border">
        {visible.map((tx) => (
          <TransactionRow key={tx.id} tx={tx} />
        ))}
      </div>

      {collapsible && !forceOpen && (
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={expanded}
          className="flex w-full items-center justify-center gap-1 border-t border-border py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
        >
          {expanded ? "접기" : `이전 결제 ${hidden}건 더보기`}
          <ChevronDown
            className={cn(
              "size-3.5 transition-transform",
              expanded && "rotate-180"
            )}
            aria-hidden
          />
        </button>
      )}
    </div>
  )
}

export function TransactionList({
  groups,
  scheduled,
}: {
  groups: Subscription[]
  scheduled: Transaction[]
}) {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<FilterKey>("all")

  const counts = useMemo(() => {
    const flat = groups.flatMap((g) => g.transactions)
    return {
      payment: flat.filter((t) => t.type === "payment").length,
      refund: flat.filter((t) => t.type === "refund").length,
      scheduled: scheduled.length,
      all: flat.length + scheduled.length,
    }
  }, [groups, scheduled])

  const visibleScheduled = useMemo(() => {
    if (filter !== "all" && filter !== "scheduled") return []
    return scheduled.filter((tx) => matches(tx, query))
  }, [scheduled, filter, query])

  const visibleGroups = useMemo(() => {
    if (filter === "scheduled") return []
    return groups
      .map((group) => ({
        group,
        transactions: group.transactions.filter(
          (tx) =>
            matches(tx, query) &&
            (filter === "all" ||
              (filter === "payment" && tx.type === "payment") ||
              (filter === "refund" && tx.type === "refund"))
        ),
      }))
      .filter((entry) => entry.transactions.length > 0)
  }, [groups, filter, query])

  // 검색·필터 중에는 접힌 행 안에 결과가 숨는 것을 막기 위해 항상 펼친다.
  const forceOpen = query.length > 0 || filter !== "all"
  const isEmpty = visibleGroups.length === 0 && visibleScheduled.length === 0

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative w-full sm:max-w-xs">
          <span className="sr-only">주문번호, 이용권 이름으로 검색</span>
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="주문번호, 이용권 이름으로 검색"
            className="h-9 w-full rounded-lg border border-border bg-background pr-8 pl-9 text-sm placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:text-foreground"
            >
              <span className="sr-only">검색어 지우기</span>
              <X className="size-3.5" aria-hidden />
            </button>
          )}
        </label>

        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setFilter(item.key)}
              aria-pressed={filter === item.key}
              className={cn(
                "h-8 rounded-full border px-3 text-xs font-medium transition-colors",
                filter === item.key
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:bg-muted"
              )}
            >
              {item.label}
              <span className="ml-1 tabular-nums opacity-70">
                {counts[item.key]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {visibleScheduled.length > 0 && (
        <div className="mt-5">
          <p className="mb-2 text-xs font-semibold text-muted-foreground">
            결제 예정
          </p>
          <div className="divide-y divide-border rounded-2xl border border-dashed border-primary/50 bg-primary/[0.04]">
            {visibleScheduled.map((tx) => (
              <TransactionRow key={tx.id} tx={tx} standalone />
            ))}
          </div>
        </div>
      )}

      {visibleGroups.length > 0 && (
        <div className="mt-5">
          <p className="mb-2 text-xs font-semibold text-muted-foreground">
            지난 내역
          </p>
          <div className="flex flex-col gap-4">
            {visibleGroups.map(({ group, transactions }) => (
              <GroupCard
                key={group.id}
                group={group}
                transactions={transactions}
                forceOpen={forceOpen}
              />
            ))}
          </div>
        </div>
      )}

      {isEmpty && (
        <div className="mt-5 rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          조건에 맞는 거래 내역이 없습니다.
        </div>
      )}
    </div>
  )
}
