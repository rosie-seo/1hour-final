/**
 * 학습 분석 데이터.
 *
 * 두 갈래로 나뉜다.
 * - 실력 분석: 내 실력이 어느 수준이고 어디가 약한가 (비교군 대비)
 * - 학습 현황: 얼마나 꾸준히, 얼마나 오래 했는가
 *
 * 모든 실력 지표는 "내 실력 vs 상위 10%" 두 계열로만 그린다.
 * 내 값이 주인공이고 비교군은 배경이므로, 색은 accent 1개 + 회색으로 충분하다.
 */

export const analyticsUser = {
  name: "김홍현",
  /** 100점 만점 예측 점수 = 발음 + 표현 */
  predictedScore: 82,
  goalScore: 95,
  breakdown: [
    { key: "pronunciation", label: "발음", value: 43, max: 50 },
    { key: "expression", label: "표현", value: 39, max: 50 },
  ],
}

export type SkillAxis = {
  label: string
  mine: number
  peer: number
}

/** 레이더 5축 — 시계 12시부터 시계방향 */
export const skillAxes: SkillAxis[] = [
  { label: "듣기", mine: 62, peer: 88 },
  { label: "어휘", mine: 71, peer: 85 },
  { label: "유창성", mine: 58, peer: 84 },
  { label: "발음", mine: 74, peer: 86 },
  { label: "문법", mine: 68, peer: 90 },
]

export type AccuracyGroup = {
  label: string
  mine: number
  peer: number
}

/** 학습 유형별 정답률 */
export const accuracyByType: AccuracyGroup[] = [
  { label: "단어", mine: 100, peer: 96 },
  { label: "문법", mine: 100, peer: 94 },
  { label: "말하기", mine: 92, peer: 95 },
  { label: "듣기", mine: 88, peer: 93 },
  { label: "복습", mine: 74, peer: 91 },
]

export type WeakPoint = {
  label: string
  mine: number
  peer: number
}

/** 취약한 표현 — 내 정답률이 비교군보다 크게 낮은 순 */
export const weakPoints: WeakPoint[] = [
  { label: "관사 a / an / the 구분", mine: 34.2, peer: 71.5 },
  { label: "과거완료 시제", mine: 38.6, peer: 68.9 },
  { label: "연음 (linking sound)", mine: 41.0, peer: 74.2 },
  { label: "전치사 in / on / at", mine: 45.3, peer: 76.0 },
]

export const skillIntro =
  "학습을 계속할수록 분석이 정확해지며, 실력 변화가 생길 때마다 결과가 업데이트됩니다."

/* ── 학습 현황 ─────────────────────────────────────────── */

/**
 * 학습 기록의 단일 소스.
 *
 * 스트릭·학습일은 마이페이지, 학습 현황, 장학금 세 화면이 모두 쓴다.
 * 화면마다 따로 들고 있으면 서로 다른 숫자를 말하게 되므로 여기서만 정의하고
 * 나머지는 전부 이 값에서 파생시킨다. (아래 calendar.marks와도 일치해야 한다 —
 * 8월의 최장 연속은 10~17일의 8일이고, longestStreak는 그 이상이어야 한다.)
 */
export const studyStats = {
  today: "2026.08.18",
  /** 오늘 아직 학습하지 않음 → 연속이 끊길 위기 */
  studiedToday: false,
  /** 8월 10~17일 8일 연속 진행 중 */
  currentStreak: 8,
  longestStreak: 12,
  studyDays: 186,
  totalDays: 365,
  /** 7일 이상 연속을 달성한 횟수 */
  streak7PlusCount: 9,
}

/** 오늘 학습하지 않으면 연속이 끊긴다 */
export const streakAtRisk =
  studyStats.currentStreak > 0 && !studyStats.studiedToday

export type DayMark = "done" | "partial" | "recommended"

export const calendar = {
  year: 2026,
  /** 0-indexed */
  month: 7,
  today: 18,
  marks: {
    3: "done",
    4: "done",
    5: "partial",
    6: "done",
    7: "done",
    10: "done",
    11: "partial",
    12: "recommended",
    13: "done",
    14: "done",
    15: "recommended",
    16: "partial",
    17: "done",
  } as Record<number, DayMark>,
}

export const calendarLegend: { mark: DayMark; label: string }[] = [
  { mark: "partial", label: "일부 완료" },
  { mark: "done", label: "완료" },
  { mark: "recommended", label: "완료한 추천 학습 세트" },
]

export type PeriodKey = "day" | "week" | "month"

export type StudyRecord = {
  id: string
  time: string
  title: string
  detail: string
  score?: string
}

export type PeriodStat = {
  key: PeriodKey
  tab: string
  /** "오늘 학습 기록" 아래 표기하는 기간 */
  heading: string
  range: string
  totalTime: string
  /** 해당 기간에 완료한 학습 단계 수 */
  completedSteps: number
  records: StudyRecord[]
}

export const periods: PeriodStat[] = [
  {
    key: "day",
    tab: "일",
    heading: "오늘 학습 기록",
    range: "8월 18일",
    totalTime: "0분 0초",
    completedSteps: 0,
    records: [],
  },
  {
    key: "week",
    tab: "주",
    heading: "이번 주 학습 기록",
    range: "8월 17일 ~ 8월 23일",
    totalTime: "42분 18초",
    completedSteps: 4,
    records: [
      {
        id: "w1",
        time: "8월 17일 18:02",
        title: "EPISODE 1 · 더빙 (하)",
        detail: "말하기",
        score: "92 점",
      },
      {
        id: "w2",
        time: "8월 17일 17:58",
        title: "EPISODE 1 · 문법 고르기",
        detail: "문장",
        score: "100 점",
      },
      {
        id: "w3",
        time: "8월 17일 17:56",
        title: "EPISODE 1 · 단어 고르기",
        detail: "단어",
        score: "100 점",
      },
      {
        id: "w4",
        time: "8월 17일 17:54",
        title: "EPISODE 1 · 콘텐츠 시청",
        detail: "콘텐츠",
        score: "100%",
      },
    ],
  },
  {
    key: "month",
    tab: "월",
    heading: "이번 달 학습 기록",
    range: "2026년 8월",
    totalTime: "3시간 12분",
    completedSteps: 12,
    records: [
      {
        id: "m1",
        time: "8월 17일",
        title: "EPISODE 1 · 4단계 완료",
        detail: "모닝 루틴",
        score: "평균 98 점",
      },
      {
        id: "m2",
        time: "8월 14일",
        title: "추천 학습 세트 완료",
        detail: "취약 표현 복습",
        score: "82 점",
      },
      {
        id: "m3",
        time: "8월 10일",
        title: "EPISODE 1 · 콘텐츠 시청",
        detail: "콘텐츠",
        score: "100%",
      },
    ],
  },
]

/** 연속 학습 상태 헤드라인 — 기록만 담백하게 말한다 */
export const streakHeadline =
  studyStats.currentStreak > 0
    ? `연속 학습 ${studyStats.currentStreak}일째`
    : "연속 학습 기록 없음"
