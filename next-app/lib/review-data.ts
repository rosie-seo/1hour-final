/**
 * 복습하기 데이터.
 *
 * 강의(단어 고르기 · 문법 고르기)에서 틀렸거나 맞힌 문제를 그대로 다시
 * 보여준다. 문법 문제는 보기별로 "800점대 사용자가 얼마나 골랐는지"까지
 * 남겨, 내가 왜 틀렸는지를 남들의 선택과 비교해서 이해하게 한다.
 */

export type ReviewChoice = {
  key: "A" | "B" | "C" | "D"
  text: string
  /** 800점대(상위) 사용자 중 이 보기를 고른 비율 */
  peerPercent: number
  correct: boolean
}

export type ReviewProblem = {
  id: string
  episodeSlug: string
  source: string
  date: string
  prompt: string
  blank: string
  translation: string
  choices: ReviewChoice[]
  /** 내가 고른 보기 — 오답이면 correct:false인 보기, 정답이면 정답 보기와 같다 */
  userChoiceKey: string
  vocab: { word: string; meaning: string }[]
  explanation: string[]
  wrongAnalysis: { key: string; text: string }[]
  correct: boolean
  bookmarked: boolean
}

export const reviewProblems: ReviewProblem[] = [
  {
    id: "p1",
    userChoiceKey: "A",
    episodeSlug: "w1-1",
    source: "WEEK 1 · DAY 1 · 문법 고르기",
    date: "2026.08.17",
    prompt: "How ___ you sleep last night? You look a bit groggy.",
    blank: "___",
    translation: "어젯밤에 잘 잤어요? 좀 몽롱해 보이네요.",
    choices: [
      { key: "A", text: "do", peerPercent: 8, correct: false },
      { key: "B", text: "did", peerPercent: 84, correct: true },
      { key: "C", text: "does", peerPercent: 3, correct: false },
      { key: "D", text: "were", peerPercent: 5, correct: false },
    ],
    vocab: [
      { word: "groggy", meaning: "몽롱한, 잠이 덜 깬" },
      { word: "sleep", meaning: "자다" },
    ],
    explanation: [
      "빈칸은 일반동사 'sleep'을 돕는 조동사 자리이다.",
      "'last night'이 과거 시점을 가리키므로 과거형 조동사 'did'가 정답이다.",
    ],
    wrongAnalysis: [
      { key: "A", text: "do는 현재 시제 조동사라 last night과 어울리지 않는다." },
      { key: "C", text: "does는 3인칭 단수 현재형이라 시제가 맞지 않는다." },
      { key: "D", text: "were는 be동사라 일반동사 sleep과 함께 쓸 수 없다." },
    ],
    correct: false,
    bookmarked: false,
  },
  {
    id: "p2",
    userChoiceKey: "B",
    episodeSlug: "w1-1",
    source: "WEEK 1 · DAY 1 · 문법 고르기",
    date: "2026.08.17",
    prompt: "She usually ___ up early to stretch before breakfast.",
    blank: "___",
    translation: "그녀는 보통 아침을 먹기 전에 기지개를 켜려고 일찍 일어난다.",
    choices: [
      { key: "A", text: "wake", peerPercent: 6, correct: false },
      { key: "B", text: "wakes", peerPercent: 89, correct: true },
      { key: "C", text: "waking", peerPercent: 2, correct: false },
      { key: "D", text: "woke", peerPercent: 3, correct: false },
    ],
    vocab: [
      { word: "stretch", meaning: "기지개를 켜다, 스트레칭하다" },
      { word: "usually", meaning: "보통, 대개" },
    ],
    explanation: [
      "주어 'She'는 3인칭 단수이고 'usually'는 현재의 습관을 나타낸다.",
      "따라서 동사에 -s가 붙은 현재형 'wakes'가 정답이다.",
    ],
    wrongAnalysis: [
      { key: "A", text: "wake는 3인칭 단수 주어와 수 일치가 되지 않는다." },
      { key: "C", text: "waking은 동사 자리에 단독으로 올 수 없다." },
      { key: "D", text: "woke는 과거형이라 습관을 나타내는 usually와 맞지 않는다." },
    ],
    correct: true,
    bookmarked: false,
  },
  {
    id: "p3",
    userChoiceKey: "A",
    episodeSlug: "w1-1",
    source: "WEEK 1 · DAY 1 · 문법 고르기",
    date: "2026.08.17",
    prompt: "I haven't seen you ___ a long time! How have you been?",
    blank: "___",
    translation: "오랫동안 못 봤네요! 그동안 어떻게 지냈어요?",
    choices: [
      { key: "A", text: "since", peerPercent: 11, correct: false },
      { key: "B", text: "for", peerPercent: 78, correct: true },
      { key: "C", text: "during", peerPercent: 7, correct: false },
      { key: "D", text: "at", peerPercent: 4, correct: false },
    ],
    vocab: [
      { word: "haven't seen", meaning: "못 봤다 (현재완료 부정)" },
      { word: "a long time", meaning: "오랜 시간" },
    ],
    explanation: [
      "'a long time'처럼 기간을 나타내는 표현 앞에는 for를 쓴다.",
      "since는 뒤에 시작 시점(예: 2020년)이 와야 한다.",
    ],
    wrongAnalysis: [
      { key: "A", text: "since는 기간이 아니라 시작 시점과 함께 쓰인다." },
      { key: "C", text: "during은 뒤에 특정 사건/기간 명사가 와야 한다." },
      { key: "D", text: "at은 짧은 시점 앞에 쓰여 기간 표현과 맞지 않는다." },
    ],
    correct: false,
    bookmarked: true,
  },
  {
    id: "p4",
    userChoiceKey: "A",
    episodeSlug: "w1-1",
    source: "WEEK 1 · DAY 1 · 문법 고르기",
    date: "2026.08.17",
    prompt: "___ you mind opening the window a little? It's stuffy in here.",
    blank: "___",
    translation: "창문을 조금 열어 주시겠어요? 여기 좀 답답하네요.",
    choices: [
      { key: "A", text: "Would", peerPercent: 91, correct: true },
      { key: "B", text: "Do", peerPercent: 5, correct: false },
      { key: "C", text: "Are", peerPercent: 2, correct: false },
      { key: "D", text: "Is", peerPercent: 2, correct: false },
    ],
    vocab: [
      { word: "stuffy", meaning: "답답한, 통풍이 안 되는" },
      { word: "mind", meaning: "꺼리다, 싫어하다" },
    ],
    explanation: [
      "'Would you mind -ing?'는 정중하게 부탁할 때 쓰는 관용 표현이다.",
    ],
    wrongAnalysis: [
      { key: "B", text: "Do you mind는 문법상 가능하지만 이 문맥에서는 Would가 더 정중하다." },
      { key: "C", text: "Are는 mind 앞에 올 수 없는 구조다." },
      { key: "D", text: "Is 역시 mind와 함께 쓰이는 구조가 아니다." },
    ],
    correct: true,
    bookmarked: false,
  },
]

export type ReviewWord = {
  id: string
  episodeSlug: string
  source: string
  date: string
  word: string
  meaning: string
  correct: boolean
  bookmarked: boolean
}

export const reviewWords: ReviewWord[] = [
  {
    id: "w1",
    episodeSlug: "w1-1",
    source: "WEEK 1 · DAY 1 · 단어 고르기",
    date: "2026.08.17",
    word: "greet",
    meaning: "인사하다",
    correct: true,
    bookmarked: false,
  },
  {
    id: "w2",
    episodeSlug: "w1-1",
    source: "WEEK 1 · DAY 1 · 단어 고르기",
    date: "2026.08.17",
    word: "yawn",
    meaning: "하품하다",
    correct: false,
    bookmarked: true,
  },
  {
    id: "w3",
    episodeSlug: "w1-1",
    source: "WEEK 1 · DAY 1 · 단어 고르기",
    date: "2026.08.17",
    word: "stretch",
    meaning: "기지개를 켜다",
    correct: true,
    bookmarked: false,
  },
  {
    id: "w4",
    episodeSlug: "w1-1",
    source: "WEEK 1 · DAY 1 · 단어 고르기",
    date: "2026.08.17",
    word: "doze off",
    meaning: "깜빡 졸다",
    correct: false,
    bookmarked: true,
  },
  {
    id: "w5",
    episodeSlug: "w1-1",
    source: "WEEK 1 · DAY 1 · 단어 고르기",
    date: "2026.08.17",
    word: "sincerely",
    meaning: "진심으로",
    correct: true,
    bookmarked: false,
  },
  {
    id: "w6",
    episodeSlug: "w1-1",
    source: "WEEK 1 · DAY 1 · 단어 고르기",
    date: "2026.08.17",
    word: "commute",
    meaning: "통근하다",
    correct: true,
    bookmarked: false,
  },
  {
    id: "w7",
    episodeSlug: "w1-1",
    source: "WEEK 1 · DAY 1 · 단어 고르기",
    date: "2026.08.17",
    word: "errand",
    meaning: "심부름, 볼일",
    correct: false,
    bookmarked: false,
  },
  {
    id: "w8",
    episodeSlug: "w1-1",
    source: "WEEK 1 · DAY 1 · 단어 고르기",
    date: "2026.08.17",
    word: "groggy",
    meaning: "몽롱한, 잠이 덜 깬",
    correct: true,
    bookmarked: false,
  },
]

export const reviewPartOptions = [
  "전체",
  "단어",
  "문법",
  "말하기",
  "듣기",
  "복습",
] as const

/** 그 콘텐츠(하루치)에서 틀린 문제 · 단어 수 — 커리큘럼과 완주 화면에서 복습으로 이어줄 때 쓴다 */
export function wrongCountForEpisode(episodeSlug: string) {
  return (
    reviewProblems.filter((p) => p.episodeSlug === episodeSlug && !p.correct)
      .length +
    reviewWords.filter((w) => w.episodeSlug === episodeSlug && !w.correct)
      .length
  )
}

export function totalWrongCount() {
  return (
    reviewProblems.filter((p) => !p.correct).length +
    reviewWords.filter((w) => !w.correct).length
  )
}
