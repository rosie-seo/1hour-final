/**
 * 구독 / 거래 / 혜택 데이터 모델.
 *
 * 계층: 기수(term) → 구독(Subscription) → 거래(Transaction)
 *
 * 같은 사용자가 1기를 12개월 이용권으로 듣고, 2기를 1개월 이용권으로 다시
 * 시작하는 식으로 구독이 여러 번 생긴다. 그래서 "구독"은 결제의 묶음이 아니라
 * 독립된 1급 객체다. 구독 관리 화면과 결제 내역 화면을 분리하는 근거이기도 하다.
 * - 구독 화면: 지금 무엇을 이용 중이고, 다음에 얼마가 나가고, 어떻게 해지하는가
 * - 결제 내역 화면: 언제 얼마를 냈고, 증빙을 어디서 받는가
 *
 * 할인은 단일 숫자가 아니라 출처가 있는 항목(DiscountLine)들의 합이다.
 * 같은 12만원이라도 "친구 초대로 받은 할인"과 "기존 수강생이라 받은 할인"은
 * 사용자에게 전혀 다른 의미이므로, 금액이 아니라 이유를 화면에 남긴다.
 */

/** 화면 기준일. 목업이므로 고정값을 써서 서버/클라이언트 렌더 결과를 일치시킨다. */
export const TODAY = "2026.08.18"

export type TransactionType = "payment" | "refund" | "scheduled"

/** 결제 한 건에 적용된 할인 한 줄 */
export type DiscountLine = {
  label: string
  amount: number
  /** promotion: 누구나 받는 상시/기간 할인 · benefit: 이 사용자만 받은 혜택 */
  kind: "promotion" | "benefit"
}

/** 구독에 붙는 사용자 혜택 */
export type Benefit = {
  id: string
  label: string
  description: string
  type: "referral" | "loyalty"
  /** 혜택 총액 */
  totalAmount: number
  /** once: 단건 결제에 한 번에 적용 · installment: 정기결제에 회차 분할 적용 */
  apply: "once" | "installment"
  perCycleAmount?: number
  totalCycles?: number
  usedCycles?: number
}

export type Transaction = {
  id: string
  subscriptionId: string
  orderNo: string
  /** 결제 일시 "2026.08.03 09:12" */
  date: string
  /** 날짜만 "2026.08.03" */
  day: string
  /** 그룹 헤더/필터용 "2026.08" */
  month: string
  year: string
  type: TransactionType
  status: "결제완료" | "환불완료" | "결제예정"
  /** 정기결제 회차. 단건 결제는 없음 */
  cycleNo?: number
  planName: string
  courseTitle: string
  /** 기존 결제확인서/영수증 화면 호환용 표시명 */
  title: string
  regularPrice: number
  /** 적용된 할인 내역 */
  discounts: DiscountLine[]
  /** discounts 합계 — 기존 화면 호환용 */
  discount: number
  finalPrice: number
  method: string
  /** 이용 기간 */
  periodStart: string
  periodEnd: string
}

export type PaymentMethod = {
  id: string
  kind: "card" | "easy"
  brand: string
  /** 화면 표기명 — Subscription.method와 같은 값 */
  label: string
  /** 마스킹된 카드번호 또는 계정 */
  account: string
  /** 로고 자리에 들어갈 짧은 표기 */
  logo: string
  /** 로고 칩 색상 */
  logoClassName: string
  /** ok가 아니면 청구가 실패한다 */
  status: "ok" | "unverified" | "declined"
}

export type SubscriptionStatus = "active" | "canceled" | "expired" | "refunded"

export type Subscription = {
  id: string
  /** 기수 — 상품명의 일부 ("1기", "2기") */
  termLabel: string
  planName: string
  courseTitle: string
  /** 자동 갱신되는 이용권인지 (1개월 이용권 = true) */
  recurring: boolean
  status: SubscriptionStatus
  method: string
  methodId: string
  startedAt: string
  /** 현재(또는 마지막) 이용 기간 종료일 */
  endsAt: string
  /** 매월 결제일 (1개월 이용권) */
  billingDay?: number
  nextBillingDate?: string
  nextAmount?: number
  /** 혜택 적용 전 정상 회차 금액 — 취소선 표기에 사용 */
  nextBaseAmount?: number
  /** TODAY 기준 다음 결제까지 남은 일수 */
  daysUntilNextBilling?: number
  /** 종료된 구독의 종료 사유 */
  endedReason?: string
  benefits: Benefit[]
  /** 최신순 */
  transactions: Transaction[]
}

const COURSE = "캘리쌤의 영어 챌린지"

function tx(
  input: Omit<Transaction, "day" | "month" | "year" | "title" | "discount">
): Transaction {
  const day = input.date.slice(0, 10)
  return {
    ...input,
    day,
    month: day.slice(0, 7),
    year: day.slice(0, 4),
    title: `${input.courseTitle} · ${input.planName}`,
    discount: input.discounts.reduce((sum, line) => sum + line.amount, 0),
  }
}

/**
 * 1기 · 12개월 이용권
 * 정가 1,188,000 − 론칭 할인 600,000 − 친구 초대 120,000 = 468,000
 */
const referralBenefit: Benefit = {
  id: "BN-REFERRAL",
  label: "친구 초대 할인",
  description: "친구 초대 링크로 가입해 받은 첫 구매 혜택",
  type: "referral",
  totalAmount: 120000,
  apply: "once",
}

const term1Yearly: Subscription = {
  id: "SUB-01",
  termLabel: "1기",
  planName: "12개월 이용권",
  courseTitle: COURSE,
  recurring: false,
  status: "expired",
  method: "카카오페이",
  methodId: "PM-02",
  startedAt: "2025.01.03",
  endsAt: "2026.01.02",
  endedReason: "이용기간 만료",
  benefits: [referralBenefit],
  transactions: [
    tx({
      id: "PU0031",
      subscriptionId: "SUB-01",
      orderNo: "CK202501030031",
      date: "2025.01.03 09:12",
      type: "payment",
      status: "결제완료",
      planName: "12개월 이용권",
      courseTitle: COURSE,
      regularPrice: 1188000,
      discounts: [
        { label: "론칭 할인", amount: 600000, kind: "promotion" },
        { label: "친구 초대 할인", amount: 120000, kind: "benefit" },
      ],
      finalPrice: 468000,
      method: "카카오페이",
      periodStart: "2025.01.03",
      periodEnd: "2026.01.02",
    }),
  ],
}

/**
 * 2기 첫 시도 · 1개월 이용권
 * 혜택 코드를 넣지 않고 결제했다가 7일 내 환불 → 혜택 미소진
 */
const term2Refunded: Subscription = {
  id: "SUB-02",
  termLabel: "2기",
  planName: "1개월 이용권",
  courseTitle: COURSE,
  recurring: true,
  status: "refunded",
  method: "신한카드 (1234)",
  methodId: "PM-01",
  startedAt: "2026.02.03",
  endsAt: "2026.02.06",
  endedReason: "7일 내 환불",
  benefits: [],
  transactions: [
    tx({
      id: "PU0902",
      subscriptionId: "SUB-02",
      orderNo: "CK202602030074R",
      date: "2026.02.06 14:22",
      type: "refund",
      status: "환불완료",
      planName: "1개월 이용권",
      courseTitle: COURSE,
      regularPrice: 99000,
      discounts: [{ label: "상시 할인", amount: 30000, kind: "promotion" }],
      finalPrice: -69000,
      method: "신한카드 (1234)",
      periodStart: "2026.02.03",
      periodEnd: "2026.02.06",
    }),
    tx({
      id: "PU0901",
      subscriptionId: "SUB-02",
      orderNo: "CK202602030074",
      date: "2026.02.03 10:05",
      type: "payment",
      status: "결제완료",
      cycleNo: 1,
      planName: "1개월 이용권",
      courseTitle: COURSE,
      regularPrice: 99000,
      discounts: [{ label: "상시 할인", amount: 30000, kind: "promotion" }],
      finalPrice: 69000,
      method: "신한카드 (1234)",
      periodStart: "2026.02.03",
      periodEnd: "2026.03.02",
    }),
  ],
}

/**
 * 2기 재시작 · 1개월 이용권 (정기결제 진행 중)
 * 기사용자 혜택 120,000원을 12회에 걸쳐 매 회차 10,000원씩 적용.
 * 정가 99,000 − 상시 할인 30,000 − 기사용자 혜택 10,000 = 59,000
 */
const loyaltyBenefit: Benefit = {
  id: "BN-LOYALTY",
  label: "기사용자 혜택",
  description: "1기 수강생 재등록 혜택 · 매 회차 10,000원 자동 적용",
  type: "loyalty",
  totalAmount: 120000,
  apply: "installment",
  perCycleAmount: 10000,
  totalCycles: 12,
  usedCycles: 6,
}

const monthlyCycles = [
  { no: 6, paidAt: "2026.08.03 09:12", start: "2026.08.03", end: "2026.09.02" },
  { no: 5, paidAt: "2026.07.03 09:11", start: "2026.07.03", end: "2026.08.02" },
  { no: 4, paidAt: "2026.06.03 09:12", start: "2026.06.03", end: "2026.07.02" },
  { no: 3, paidAt: "2026.05.03 09:10", start: "2026.05.03", end: "2026.06.02" },
  { no: 2, paidAt: "2026.04.03 09:12", start: "2026.04.03", end: "2026.05.02" },
  { no: 1, paidAt: "2026.03.03 21:40", start: "2026.03.03", end: "2026.04.02" },
]

const term2Monthly: Subscription = {
  id: "SUB-03",
  termLabel: "2기",
  planName: "1개월 이용권",
  courseTitle: COURSE,
  recurring: true,
  status: "active",
  method: "신한카드 (1234)",
  methodId: "PM-01",
  startedAt: "2026.03.03",
  endsAt: "2026.09.02",
  billingDay: 3,
  nextBillingDate: "2026.09.03",
  nextAmount: 59000,
  nextBaseAmount: 69000,
  daysUntilNextBilling: 16,
  benefits: [loyaltyBenefit],
  transactions: monthlyCycles.map((cycle) =>
    tx({
      id: `PU${String(1000 + cycle.no)}`,
      subscriptionId: "SUB-03",
      orderNo: `CK2026${String(cycle.no).padStart(2, "0")}0300749`,
      date: cycle.paidAt,
      type: "payment",
      status: "결제완료",
      cycleNo: cycle.no,
      planName: "1개월 이용권",
      courseTitle: COURSE,
      regularPrice: 99000,
      discounts: [
        { label: "상시 할인", amount: 30000, kind: "promotion" },
        { label: "기사용자 혜택", amount: 10000, kind: "benefit" },
      ],
      finalPrice: 59000,
      method: "신한카드 (1234)",
      periodStart: cycle.start,
      periodEnd: cycle.end,
    })
  ),
}

/** 최신 구독 순 */
export const subscriptions: Subscription[] = [
  term2Monthly,
  term2Refunded,
  term1Yearly,
]

export const activeSubscriptions = subscriptions.filter(
  (sub) => sub.status === "active"
)

export const pastSubscriptions = subscriptions.filter(
  (sub) => sub.status !== "active"
)

/** 다음 회차 결제 예정 건 — 결제 내역 리스트 최상단에 미리보기 행으로 표시 */
export const scheduledTransactions: Transaction[] = activeSubscriptions
  .filter((sub) => sub.recurring && sub.nextBillingDate)
  .map((sub) =>
    tx({
      id: `${sub.id}-next`,
      subscriptionId: sub.id,
      orderNo: "-",
      date: `${sub.nextBillingDate} 09:00`,
      type: "scheduled",
      status: "결제예정",
      cycleNo: (sub.transactions[0]?.cycleNo ?? 0) + 1,
      planName: sub.planName,
      courseTitle: sub.courseTitle,
      regularPrice: 99000,
      discounts: [
        { label: "상시 할인", amount: 30000, kind: "promotion" },
        { label: "기사용자 혜택", amount: 10000, kind: "benefit" },
      ],
      finalPrice: sub.nextAmount ?? 0,
      method: sub.method,
      periodStart: sub.nextBillingDate!,
      periodEnd: "2026.10.02",
    })
  )

/** 환불 제외 실제 결제 합계 */
export function subscriptionTotal(sub: Subscription) {
  return sub.transactions
    .filter((t) => t.type === "payment")
    .reduce((sum, t) => sum + t.finalPrice, 0)
}

/** 환불 반영 순 결제액 */
export function subscriptionNetTotal(sub: Subscription) {
  return sub.transactions.reduce((sum, t) => sum + t.finalPrice, 0)
}

export function paidCount(sub: Subscription) {
  return sub.transactions.filter((t) => t.type === "payment").length
}

/** 한 거래에서 "이 사용자만 받은" 혜택 금액 */
export function benefitAmount(transaction: Transaction) {
  return transaction.discounts
    .filter((line) => line.kind === "benefit")
    .reduce((sum, line) => sum + line.amount, 0)
}

/** 구독에서 지금까지 실제로 소진한 혜택 금액 (환불 건 제외) */
export function benefitUsed(sub: Subscription) {
  return sub.transactions
    .filter((t) => t.type === "payment")
    .reduce((sum, t) => sum + benefitAmount(t), 0)
}

/** 아직 남은 혜택 금액 */
export function benefitRemaining(sub: Subscription) {
  const total = sub.benefits.reduce((sum, b) => sum + b.totalAmount, 0)
  return Math.max(0, total - benefitUsed(sub))
}

/**
 * 등록된 결제 수단.
 * 배열 순서가 곧 청구 우선순위 — 위에 있는 수단부터 순서대로 시도한다.
 */
export const paymentMethods: PaymentMethod[] = [
  {
    id: "PM-01",
    kind: "card",
    brand: "신한카드",
    label: "신한카드 (1234)",
    account: "•••• 1234",
    logo: "신한",
    logoClassName: "bg-[#0046ff] text-white",
    status: "ok",
  },
  {
    id: "PM-02",
    kind: "easy",
    brand: "카카오페이",
    label: "카카오페이",
    account: "ok****@nate.com",
    logo: "pay",
    logoClassName: "bg-[#ffe812] text-black",
    status: "ok",
  },
  {
    id: "PM-03",
    kind: "easy",
    brand: "네이버페이",
    label: "네이버페이",
    account: "5k****@nav*****",
    logo: "N pay",
    logoClassName: "bg-[#03c75a] text-white",
    status: "unverified",
  },
  {
    id: "PM-04",
    kind: "card",
    brand: "KB국민카드",
    label: "KB국민카드 (5227)",
    account: "•••• 5227",
    logo: "KB",
    logoClassName: "bg-[#f5a800] text-black",
    status: "declined",
  },
]

export const PAYMENT_METHOD_STATUS_LABEL: Record<
  PaymentMethod["status"],
  string | null
> = {
  ok: null,
  unverified: "확인 실패",
  declined: "승인 거부",
}

/** 상세에서 보여줄 실패 사유와 다음 행동 */
export const PAYMENT_METHOD_ERROR_MESSAGE: Record<
  PaymentMethod["status"],
  string | null
> = {
  ok: null,
  unverified:
    "결제 수단을 확인할 수 없습니다. 간편결제 계정에 다시 로그인하거나, 결제 수단을 삭제하고 새로 추가해 주세요.",
  declined:
    "이 결제 수단을 사용할 수 없습니다. 문제가 계속될 경우 발급 기관에 문의하거나, 결제 수단을 삭제하고 새로운 방법을 추가해 주세요.",
}

/** 청구지 주소 — 등록된 결제 수단 전체에 공통 적용 */
export const billingAddress = {
  name: "김홍현",
  line: "삼양로19길 113 강북구 서울 01198 KOR",
}

/**
 * 이 결제 수단에 걸려 있는 진행 중인 정기결제.
 * 수단을 지우거나 순서를 바꾸면 이 구독의 청구가 영향을 받는다.
 */
export function activeSubscriptionsOfMethod(methodId: string) {
  return subscriptions.filter(
    (sub) => sub.methodId === methodId && sub.status === "active"
  )
}

/** 결제확인서/영수증 상세 화면에서 id로 조회 */
export const allTransactions: Transaction[] = subscriptions.flatMap(
  (sub) => sub.transactions
)
