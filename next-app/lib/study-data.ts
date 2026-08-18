/**
 * 수강 화면 데이터.
 *
 * 커리큘럼은 주(Week) 4개 × 콘텐츠(Episode) 5개 × 학습 단계(StudyStep) 5개로
 * 이루어진다. 콘텐츠 하나가 하루치 학습(콘텐츠 시청 · 단어 · 문법 · 더빙 · 복습)
 * 이고, 한 주에 콘텐츠 5개이므로 4주 × 5일 = 20일 루틴이 완성된다.
 *
 * 잠금은 20개 콘텐츠를 가로지르는 하나의 순서로 걸린다 — 주가 바뀌어도
 * "바로 앞 콘텐츠를 끝냈는가"만 본다. 목차(오른쪽 사이드바)와 학습 기록
 * (영상 아래 패널)은 같은 단계 목록을 서로 다른 밀도로 보여준다.
 * - 목차: 어디까지 왔고 다음이 무엇인지
 * - 기록: 각 단계를 언제 끝냈고 몇 점이었는지, 다시 할 수 있는지
 */

export type StepKind = "content" | "word" | "sentence" | "speaking" | "review"

export type StepStatus = "done" | "current" | "todo"

export type StudyStep = {
  id: string
  kind: StepKind
  /** 단계 유형 배지 */
  badge: string
  title: string
  duration: string
  status: StepStatus
  /** "100%" 또는 "92 점" */
  score?: string
  /** "26.08.17 17:54:52" */
  completedAt?: string
  /** 완료 후 다시 시도할 수 있는 단계 (말하기) */
  retryable?: boolean
}

/** 콘텐츠 하나 = 하루치 학습(5단계) */
export type Episode = {
  slug: string
  /** 전체 20일 중 며칠째 (1~20) */
  no: number
  weekNo: number
  /** 그 주 안에서 며칠째 (1~5) */
  dayInWeek: number
  label: string
  title: string
  instructor: string
  thumbnail: string
  steps: StudyStep[]
}

export type Week = {
  no: number
  label: string
  /** 주 전체를 묶는 테마 */
  theme: string
  episodes: Episode[]
}

const BADGE: Record<StepKind, string> = {
  content: "콘텐츠",
  word: "단어",
  sentence: "문장",
  speaking: "말하기",
  review: "복습",
}

const STEP_TEMPLATE: {
  kind: StepKind
  title: string
  duration: string
  retryable?: boolean
}[] = [
  { kind: "content", title: "콘텐츠 시청", duration: "15:20" },
  { kind: "word", title: "단어 고르기", duration: "08:12" },
  { kind: "sentence", title: "문법 고르기", duration: "09:45" },
  { kind: "speaking", title: "더빙 (하)", duration: "12:30", retryable: true },
  { kind: "review", title: "복습 퀴즈", duration: "06:18" },
]

/** 완료된 단계에 채워 넣을 점수와 시각 */
const COMPLETED = [
  { score: "100%", completedAt: "26.08.17 17:54:52" },
  { score: "100 점", completedAt: "26.08.17 17:56:11" },
  { score: "100 점", completedAt: "26.08.17 17:58:32" },
  { score: "92 점", completedAt: "26.08.17 18:02:37" },
  { score: "96 점", completedAt: "26.08.17 18:10:04" },
]

function buildSteps(slug: string, doneCount: number): StudyStep[] {
  return STEP_TEMPLATE.map((template, index) => {
    const done = index < doneCount
    const current = index === doneCount
    return {
      id: `${slug}-${index + 1}`,
      kind: template.kind,
      badge: BADGE[template.kind],
      title: template.title,
      duration: template.duration,
      status: done ? "done" : current ? "current" : "todo",
      score: done ? COMPLETED[index].score : undefined,
      completedAt: done ? COMPLETED[index].completedAt : undefined,
      retryable: template.retryable,
    }
  })
}

const WEEK_SOURCE = [
  {
    theme: "모닝 루틴 (Morning Routine)",
    contents: [
      "아침 인사와 안부",
      "아침 루틴 표현",
      "출근 준비 회화",
      "아침 식사 표현",
      "하루 계획 말하기",
    ],
  },
  {
    theme: "장보기 (Grocery Shopping)",
    contents: [
      "마트에서 길 찾기",
      "물건 고르기",
      "가격 흥정하기",
      "계산대에서",
      "포장 요청하기",
    ],
  },
  {
    theme: "카페에서 주문하기 (Ordering Coffee)",
    contents: [
      "메뉴 물어보기",
      "음료 주문하기",
      "사이즈 · 옵션 선택",
      "결제하기",
      "테이크아웃 요청",
    ],
  },
  {
    theme: "여행 중 생기는 일 (Travel Diaries)",
    contents: [
      "공항에서 체크인",
      "호텔 체크인",
      "길 묻기",
      "레스토랑 예약",
      "응급 상황 대처",
    ],
  },
]

export const weeks: Week[] = WEEK_SOURCE.map((source, weekIndex) => {
  const weekNo = weekIndex + 1
  const episodes = source.contents.map((title, dayIndex) => {
    const dayInWeek = dayIndex + 1
    const slug = `w${weekNo}-${dayInWeek}`
    /** 데모 진행 상태: 1주차 1일차만 4/5 진행, 나머지는 시작 전 */
    const doneCount = weekNo === 1 && dayInWeek === 1 ? 4 : 0
    return {
      slug,
      no: weekIndex * source.contents.length + dayInWeek,
      weekNo,
      dayInWeek,
      label: `DAY ${dayInWeek}`,
      title,
      instructor: "캘리쌤 · 영어 스피킹 코치",
      thumbnail: "/hero-kelly-english.png",
      steps: buildSteps(slug, doneCount),
    }
  })
  return { no: weekNo, label: `WEEK ${weekNo}`, theme: source.theme, episodes }
})

export const episodes: Episode[] = weeks.flatMap((week) => week.episodes)

export function findEpisode(slug: string) {
  return episodes.find((episode) => episode.slug === slug)
}

export function weekOf(episode: Episode) {
  return weeks.find((week) => week.no === episode.weekNo)!
}

export function doneCount(episode: Episode) {
  return episode.steps.filter((step) => step.status === "done").length
}

export function isComplete(episode: Episode) {
  return doneCount(episode) === episode.steps.length
}

/**
 * 앞 콘텐츠를 완주해야 다음이 열린다. 20개 전체를 가로지르는 하나의 순서다.
 *
 * 다 열어두면 "오늘 뭘 해야 하지"가 사라지고, 완주해도 아무 일이
 * 일어나지 않는다. 잠금이 있어야 완주가 보상이 된다.
 */
export function isUnlocked(episode: Episode) {
  const index = episodes.findIndex((item) => item.slug === episode.slug)
  if (index <= 0) return true
  return isComplete(episodes[index - 1])
}

export function nextEpisode(episode: Episode) {
  const index = episodes.findIndex((item) => item.slug === episode.slug)
  return episodes[index + 1]
}

export function previousEpisode(episode: Episode) {
  const index = episodes.findIndex((item) => item.slug === episode.slug)
  return index > 0 ? episodes[index - 1] : undefined
}

/** 그 주에서 완주한 콘텐츠 수 */
export function weekDoneCount(week: Week) {
  return week.episodes.filter(isComplete).length
}

export function isWeekComplete(week: Week) {
  return weekDoneCount(week) === week.episodes.length
}

export function isWeekUnlocked(week: Week) {
  return isUnlocked(week.episodes[0])
}

/** 완주 화면에 쓰는 집계 */
export function episodeSummary(episode: Episode) {
  const done = episode.steps.filter((step) => step.status === "done")
  const scored = done
    .map((step) => Number.parseInt(step.score?.replace(/\D/g, "") ?? "", 10))
    .filter((value) => Number.isFinite(value))
  const avgScore = scored.length
    ? Math.round(scored.reduce((sum, value) => sum + value, 0) / scored.length)
    : 0
  const minutes = done.reduce((sum, step) => {
    const [m, s] = step.duration.split(":").map(Number)
    return sum + m + s / 60
  }, 0)
  return {
    steps: done.length,
    totalSteps: episode.steps.length,
    avgScore,
    minutes: Math.round(minutes),
  }
}

/**
 * 오늘 해야 할 단 하나의 단계.
 *
 * 상품은 "매일 30분 · 월 20일"이고 구조는 콘텐츠 20개 × 5단계이므로
 * 화면은 지금 열려 있는 콘텐츠의 진행 중인 단계 하나만 가리켜야 한다.
 */
export function todayStep() {
  for (const episode of episodes) {
    if (!isUnlocked(episode)) continue
    const step = episode.steps.find((item) => item.status === "current")
    if (step) {
      return {
        episode,
        step,
        /** 이 단계를 끝내면 콘텐츠가 완주된다 */
        finishesEpisode:
          episode.steps.indexOf(step) === episode.steps.length - 1,
      }
    }
  }
  return undefined
}

/** 현재 학습할 단계 (없으면 마지막 단계) */
export function currentStep(episode: Episode) {
  return (
    episode.steps.find((step) => step.status === "current") ??
    episode.steps[episode.steps.length - 1]
  )
}

/** 영상 아래 학습 기록 패널 머리말에 표기하는 학습 설정 */
export const studyMode = [
  "채점 후 읽어주기(단어, 문장)",
  "쉐도잉 2회",
  "1회 듣기",
  "발음 평가",
  "자율 시청 모드",
]

export const lessonTabs = [
  "학습 단계",
  "강의자료",
  "공지사항",
  "학습도구",
] as const
