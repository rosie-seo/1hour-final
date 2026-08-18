/**
 * 장학금 선정 모델.
 *
 * "1년간 열심히 한 사람"은 그대로는 측정할 수 없다. 상금이 걸린 이상
 * 기준이 불투명하면 분쟁이 되므로, 제품이 이미 기록하고 있는 값만으로
 * 계산되는 1000점 만점 점수로 환산한다.
 *
 * 축을 네 개로 나눈 이유:
 * - 출석만 보면 매일 눌러만 두고 넘기는 사람이 이긴다 → 완주·깊이로 견제
 * - 절대 실력만 보면 원래 잘하던 사람이 이긴다 → "성장"은 시작 대비 상승폭으로 잰다
 *   (왕초보도 1등을 노릴 수 있어야 이 상품의 약속과 맞는다)
 * - 어느 축도 단독으로 만점을 만들 수 없게 배점을 쪼갠다
 */

import { studyStats } from "@/lib/analytics-data"

/** 점수 계산에 쓰는 나머지 원자료 — 학습 기록은 studyStats에서 가져온다 */
const raw = {
  completedSteps: 171,
  publishedSteps: 250,
  firstMonthAvg: 61,
  recentMonthAvg: 75,
  /** 성장 만점으로 인정하는 상승폭 */
  growthCap: 25,
  recordingCount: 220,
  recordingCap: 300,
  reviewRetryCount: 41,
  reviewRetryCap: 60,
  /** 연속 학습 만점 기준 */
  longestStreakCap: 30,
  streak7PlusCap: 12,
}

/** 비율은 1을 넘지 않게 자른다 — 한 축을 초과 달성해도 다른 축을 대신할 수 없다 */
const share = (value: number, cap: number) => Math.min(1, value / cap)
const points = (ratio: number, max: number) => Math.round(ratio * max)

export type ScoreAxis = {
  key: "consistency" | "streak" | "completion" | "growth" | "depth"
  label: string
  /** 이 축이 답하는 질문 */
  question: string
  max: number
  earned: number
  /** 점수의 근거가 된 실제 기록 */
  evidence: string
  /** 계산식 설명 */
  formula: string
}

export const scoreAxes: ScoreAxis[] = [
  {
    key: "consistency",
    label: "꾸준함",
    question: "얼마나 많은 날 했는가",
    max: 300,
    earned: points(share(studyStats.studyDays, studyStats.totalDays), 300),
    evidence: `학습일 ${studyStats.studyDays}일 / ${studyStats.totalDays}일`,
    formula:
      "학습일 ÷ 365 × 300점. 하루 1단계 이상 완료해야 학습일로 인정합니다.",
  },
  {
    key: "streak",
    label: "연속 학습",
    question: "끊기지 않고 이어갔는가",
    max: 150,
    earned:
      points(share(studyStats.longestStreak, raw.longestStreakCap), 90) +
      points(share(studyStats.streak7PlusCount, raw.streak7PlusCap), 60),
    evidence: `최장 연속 ${studyStats.longestStreak}일 · 7일 이상 연속 ${studyStats.streak7PlusCount}회`,
    formula:
      "최장 연속 학습일을 30일 만점으로 환산해 90점, 7일 이상 연속을 달성한 횟수를 12회 만점으로 환산해 60점. 한 번 길게 하고 그만두는 것보다 여러 번 이어가는 쪽이 유리합니다.",
  },
  {
    key: "completion",
    label: "완주",
    question: "끝까지 갔는가",
    max: 200,
    earned: points(share(raw.completedSteps, raw.publishedSteps), 200),
    evidence: `공개 단계 ${raw.publishedSteps}개 중 ${raw.completedSteps}개 완료 (${Math.round((raw.completedSteps / raw.publishedSteps) * 100)}%)`,
    formula:
      "완료한 학습 단계 ÷ 공개된 전체 단계 × 200점. 콘텐츠는 90% 이상 재생해야 완료로 인정합니다.",
  },
  {
    key: "growth",
    label: "성장",
    question: "실력이 늘었는가",
    max: 250,
    earned: points(
      share(raw.recentMonthAvg - raw.firstMonthAvg, raw.growthCap),
      250
    ),
    evidence: `첫 달 평균 ${raw.firstMonthAvg}점 → 최근 달 ${raw.recentMonthAvg}점 (+${raw.recentMonthAvg - raw.firstMonthAvg}점)`,
    formula:
      "최근 30일 평균 점수 − 첫 30일 평균 점수를 25점 만점으로 환산합니다. 절대 점수가 아니라 상승폭만 봅니다.",
  },
  {
    key: "depth",
    label: "깊이",
    question: "대충 넘기지 않았는가",
    max: 100,
    earned:
      points(share(raw.recordingCount, raw.recordingCap), 50) +
      points(share(raw.reviewRetryCount, raw.reviewRetryCap), 50),
    evidence: `말하기 녹음 ${raw.recordingCount}회 · 복습 재도전 ${raw.reviewRetryCount}회`,
    formula:
      "말하기 녹음 횟수와 복습 재도전 횟수를 각 50점 만점으로 환산합니다. 재생만 하고 넘긴 단계는 제외됩니다.",
  },
]

export const totalMax = scoreAxes.reduce((sum, axis) => sum + axis.max, 0)
export const totalEarned = scoreAxes.reduce((sum, axis) => sum + axis.earned, 0)

export const myStanding = {
  name: "김홍현",
  rank: 24,
  participants: 1284,
  /** 지난주 대비 순위 변동 (+ 는 상승) */
  weeklyRankDelta: 6,
  /** 남은 기간 */
  daysLeft: 168,
  seasonRange: "2026.03.03 ~ 2027.03.02",
}

export type LeaderboardRow = {
  rank: number
  name: string
  score: number
  prize?: string
  me?: boolean
}

export const leaderboard: LeaderboardRow[] = [
  { rank: 1, name: "김**", score: 934, prize: "100만원" },
  { rank: 2, name: "이**", score: 921, prize: "50만원" },
  { rank: 3, name: "박**", score: 908, prize: "30만원" },
  { rank: 4, name: "최**", score: 877, prize: "10만원" },
  { rank: 5, name: "정**", score: 861, prize: "10만원" },
  { rank: 6, name: "강**", score: 840, prize: "10만원" },
  { rank: 7, name: "조**", score: 822, prize: "10만원" },
  { rank: 8, name: "윤**", score: 809, prize: "10만원" },
  { rank: 9, name: "장**", score: 741, prize: "10만원" },
  { rank: 10, name: "임**", score: 700, prize: "10만원" },
]

/** 10위 진입까지 남은 점수 */
export const gapToPrize =
  (leaderboard[leaderboard.length - 1]?.score ?? 0) - totalEarned

/**
 * 지금 올리기 가장 쉬운 축 = 남은 점수가 가장 많은 축.
 * 순위만 보여주면 무력해지므로, 다음에 할 행동 하나로 번역해 준다.
 */
export const bestOpportunity = scoreAxes.reduce((best, axis) =>
  axis.max - axis.earned > best.max - best.earned ? axis : best
)

export const opportunityAction: Record<
  ScoreAxis["key"],
  { message: string; cta: string; href: string }
> = {
  consistency: {
    message: "오늘 1단계만 끝내도 학습일이 하루 늘어요.",
    cta: "오늘 학습 시작하기",
    href: "/mypage/classroom",
  },
  streak: {
    message: `연속 ${studyStats.currentStreak}일째예요. 오늘 하면 ${studyStats.currentStreak + 1}일로 이어져요.`,
    cta: "연속 이어가기",
    href: "/mypage/classroom",
  },
  completion: {
    message: "남은 학습 단계를 채우면 완주 점수가 바로 올라가요.",
    cta: "이어서 학습하기",
    href: "/mypage/classroom",
  },
  growth: {
    message: "발음 점수를 5점 올리면 성장 점수가 약 40점 올라가요.",
    cta: "말하기 복습하러 가기",
    href: "/mypage/classroom/ep-1",
  },
  depth: {
    message: "틀린 문장을 다시 녹음하면 깊이 점수가 쌓여요.",
    cta: "복습 단계로 가기",
    href: "/mypage/classroom/ep-1",
  },
}

/** 신뢰를 위해 공개하는 운영 규칙 */
export const scholarshipRules = [
  {
    question: "점수는 어떻게 계산되나요?",
    answer:
      "꾸준함 300점, 연속 학습 150점, 완주 200점, 성장 250점, 깊이 100점을 합해 1000점 만점으로 환산합니다. 한 축만 잘해서는 상위권에 들 수 없도록 배점을 나눴습니다.",
  },
  {
    question: "연속이 끊기면 그동안 쌓은 점수가 사라지나요?",
    answer:
      "아닙니다. 연속 학습 점수는 최장 기록과 '7일 이상 연속' 달성 횟수로 계산하므로, 한 번 끊겨도 이미 쌓인 점수는 그대로 남습니다. 다시 이어가면 달성 횟수가 늘어 점수가 올라갑니다.",
  },
  {
    question: "실력이 좋아야 유리한가요?",
    answer:
      "아닙니다. 성장 점수는 절대 점수가 아니라 시작 대비 상승폭으로 계산합니다. 왕초보로 시작해 크게 는 분이 처음부터 잘한 분보다 높은 점수를 받을 수 있습니다.",
  },
  {
    question: "많이 하기만 하면 되나요?",
    answer:
      "하루에 인정되는 학습 시간은 최대 60분이며, 콘텐츠는 90% 이상 재생해야 완료로 인정됩니다. 재생만 하고 넘긴 단계, 녹음 없이 통과한 말하기 단계는 점수에 반영되지 않습니다.",
  },
  {
    question: "점수가 같으면 어떻게 되나요?",
    answer:
      "① 최장 연속 학습일 ② 성장 점수 ③ 해당 점수에 먼저 도달한 순서로 순위를 정합니다.",
  },
  {
    question: "누가 참여할 수 있나요?",
    answer:
      "12개월 이용권 구매자 중 이용 기간을 채운 분이 대상입니다. 중도 해지·환불 시 순위에서 제외되며, 장학금은 제세공과금을 제하고 지급됩니다.",
  },
]
