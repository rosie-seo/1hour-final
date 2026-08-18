import { allTransactions } from "@/lib/billing-data"

export const course = {
  id: "cally-english-challenge",
  thumbnail: "/hero-kelly-english.png",
  href: "/",
  title: "캘리쌤의 영어 챌린지",
  subtitle: "매일 30분으로 끝내는 국내 어학연수!",
  instructor: "캘리쌤 · 10년차 영어 스피킹 코치 / 전 어학원 대표강사",
  stats: [
    { label: "커리큘럼", value: "매달 4개 콘텐츠 · 20일 루틴" },
    { label: "난이도", value: "왕초보 ~ 중급" },
    { label: "수강 방식", value: "스마트폰으로 언제 어디서든" },
  ],
  schedule: [
    { label: "모집 일정", value: "2026. 08. 14 ~ 2026. 08. 23" },
    { label: "챌린지 일정", value: "2026. 08. 24 ~ 2026. 09. 20" },
  ],
}

export type BackofficeImage = {
  src: string
  alt: string
  width: number
  height: number
}

/**
 * Placeholder content for slots the backoffice image uploader will manage.
 * Each key is a content slot; admins upload one or more images per slot.
 */
export const backofficeImages: Record<
  "whatIsIt" | "howItWorks",
  BackofficeImage[]
> = {
  whatIsIt: [
    {
      src: "/backoffice/what-is-it.png",
      alt: "캘리쌤 챌린지는 무엇인가요",
      width: 832,
      height: 1890,
    },
  ],
  howItWorks: [
    {
      src: "/backoffice/grammar.png",
      alt: "어려운 문법 생각에 머리 아프지 않아도 돼요",
      width: 900,
      height: 2529,
    },
    {
      src: "/backoffice/speaking-alone.png",
      alt: "혼자 말하기 두려워하지 않아도 돼요",
      width: 900,
      height: 2711,
    },
    {
      src: "/backoffice/ai-tracking.png",
      alt: "오늘 틀려도 괜찮아요, 내일 다시 볼 수 있어요",
      width: 900,
      height: 3052,
    },
    {
      src: "/backoffice/learning-report.png",
      alt: "학습 리포트 제공",
      width: 900,
      height: 2233,
    },
    {
      src: "/backoffice/notifications.png",
      alt: "의지만으로 어려워요, 캘리쌤이 매일 노크해드릴게요",
      width: 900,
      height: 2719,
    },
    {
      src: "/backoffice/not-recommended.png",
      alt: "이런 분께는 추천하지 않아요",
      width: 900,
      height: 1715,
    },
    {
      src: "/backoffice/community.png",
      alt: "함께 가면 멀리 갈 수 있습니다",
      width: 900,
      height: 1481,
    },
  ],
}

export const instructor = {
  name: "캘리쌤",
  role: "영어 스피킹 코치",
  intro: "매일 숙제였던 영어공부, 이젠 캘리쌤이 매일 찾아갑니다!",
  greeting: [
    "안녕하세요, 캘리쌤입니다. 10년째 원어민 영어를 가르치며 유튜브와 인스타그램에서 진짜 쓰는 영어를 콘텐츠로 만들어왔습니다. 이러한 열정을 바탕으로 유튜브 구독자 47만 명, 인스타그램 13만 명 팔로워와 함께하고 있으며, 외국어 분야 1위 베스트셀러 작가로도 활동하고 있습니다.",
    "이번 챌린지에서는 눈으로만 보던 영어를 여러분이 직접 입으로 말할 수 있도록 매일 곁에서 함께합니다. 국제학교 학생, K-pop 아티스트들에게 영어를 가르치며 쌓아온 노하우를 이제 챌린지로 만나보세요. 저와 함께 매일 조금씩, 진짜 말하는 영어를 시작해봐요.",
  ],
  facts: [
    "유튜브 구독자 47만명, 인스타그램 13만명 팔로워 크리에이터",
    "10년 경력 원어민 강사",
    "외국어 1위 베스트셀러 작가",
    "국제학교 학생, K-pop 아티스트 등 다수 티칭",
  ],
  current: "현) 영어 스피킹 코치 / 전 어학원 대표강사",
  channel: {
    name: "캘리쌤의 원어민 브이로그",
    handle: "@influenglish",
    subscribers: "구독자 44만명",
  },
  closing:
    "누적 1만 명이 넘게 선택한 캘리쌤 브이로그 영어, 이제 챌린지로 매일 함께 공부해봐요.",
}

const lessonTemplates = [
  {
    tag: "상황이해",
    title: "실제 브이로그로 상황부터 이해하기",
    points: [
      "캘리쌤의 실제 브이로그 영상으로 상황부터 파악",
      "오늘 다룰 장면과 등장인물 관계 이해",
      "핵심 상황 3가지 미리 짚어보기",
    ],
  },
  {
    tag: "단어",
    title: "영상 속 핵심 단어 익히기",
    points: [
      "영상 속 핵심 단어를 정확한 발음으로 학습",
      "헷갈리기 쉬운 표현 비교 정리",
      "실전 예문으로 뉘앙스 확인",
    ],
  },
  {
    tag: "패턴",
    title: "마법의 문장 패턴 익히기",
    points: [
      "원어민이 자주 쓰는 문장 구조 분석",
      "패턴에 단어만 바꿔 넣는 응용 연습",
      "비슷한 상황에 바로 적용해보기",
    ],
  },
  {
    tag: "말하기",
    title: "직접 말하고 피드백 받기",
    points: [
      "쉐도잉으로 문장을 통째로 익히기",
      "녹음하고 내 발음 직접 확인하기",
      "정확성·유창성·억양 점수로 피드백 받기",
    ],
  },
  {
    tag: "복습",
    title: "배운 문장 복습하기",
    points: [
      "이번 에피소드 핵심 문장 다시 말해보기",
      "자주 틀렸던 부분 집중 재훈련",
      "다음 에피소드 미리 살펴보기",
    ],
  },
]

export const curriculum = [
  {
    section: "Section 01",
    title: "모닝 루틴 (Morning Routine)",
    lessons: lessonTemplates,
  },
  {
    section: "Section 02",
    title: "장보기 (Grocery Shopping)",
    lessons: lessonTemplates,
  },
  {
    section: "Section 03",
    title: "카페에서 주문하기 (Ordering Coffee)",
    lessons: lessonTemplates,
  },
  {
    section: "Section 04",
    title: "여행 중 생기는 일 (Travel Diaries)",
    lessons: lessonTemplates,
  },
]

export const testimonials = [
  {
    name: "장*람",
    quote:
      "너무 잼있고 저 왕초본데 두번째 들을때도 이미 첫번째보다 더 들리는게 신기하네요!",
  },
  {
    name: "응원*****",
    quote:
      "직장인인데 오픽 준비를 하는 과정에서 영어 스피킹이 너무 부족한 점을 인지하고 캘리쌤 강좌를 듣게 되었습니다. 처음엔 다소 입문과정이어서 시시하다고 생각했는데 쉐도잉 전체가 가리고 하는 부분은 대박이었습니다.",
  },
  {
    name: "예*",
    quote:
      "수업보기에서 쉐도잉, 문장 선택 후 연속 반복 기능, 자막 한영 설정 등.. 너무 좋아요! 어쩜 이렇게 학습자에게 필요한 기능이 쏙쏙 들어가 있는 거죠?",
  },
  {
    name: "생각*******",
    quote:
      "전자책도 구매했고, 카톡 표현도 구매했고, 강의 영상도 구매했는데 귀찮음 만렙이라 제대로 한 적이 없었거든요. 근데 이번에는 피드백을 바로바로 받을 수 있어서 그런지 빨리 퇴근하고 집에 가서 하고 싶다는 생각이 들어요!",
  },
]

export const starReviews = [
  {
    name: "kad*******",
    quote:
      "별 생각없이 버튼만 누르면 입에서 영어가 나와요! 바빠서 학원도 등록하고 못가고 매번 돈 낭비만 했는데, 이번에야 말로 제대로 영어를 공부하는 느낌이에요!",
  },
  {
    name: "jas****",
    quote:
      "일단 재미가 있어요! 피드백 퀄리티가 좋아서 생각보다 발음이나 억양, 톤이 점점 캘리쌤이랑 비슷해져가는 것 같아요.",
  },
  {
    name: "ur****",
    quote:
      "저보다 아이가 더 좋아해요. 점수가 나오고 랭킹도 있으니까 게임처럼 매일 공부해요. 이제는 자막이 없어도 들리기 시작해서 너무 신기해요!",
  },
  {
    name: "with*****",
    quote:
      "안해 본 영어 공부가 없습니다. 전화영어, 회화학원, 앱.. 다 하다가 흐지부지 됐었는데 캘리쌤 챌린지는 바빠서 공부 못한날 저녁에도 리마인드 메시지가 오고 제가 자주 틀리는 부분도 알려줘서 선생님 없이도 꾸준히 할 수 있어요.",
  },
]

export const pricingPlans = [
  {
    name: "1개월 이용권",
    note: "매달 결제",
    discountRate: 30,
    regularPrice: 99000,
    price: 69000,
    priceLabel: "월 69,000원",
  },
  {
    name: "12개월 이용권",
    note: "12개월마다 결제",
    discountRate: 60,
    regularPrice: 1188000,
    price: 468000,
    priceLabel: "월 39,000원",
    subLabel: "1년 정가 1,188,000원 → 468,000원",
    highlight: true,
  },
]

/**
 * 찜하기 대상 강의 카탈로그.
 * 찜 목록에는 id만 저장하고, 표시에 필요한 정보는 여기서 찾는다.
 */
export const wishlistCatalog = [
  {
    id: course.id,
    title: course.title,
    subtitle: course.subtitle,
    instructor: instructor.name + " · " + instructor.role,
    thumbnail: course.thumbnail,
    href: course.href,
    priceLabel: pricingPlans[0].priceLabel,
    discountRate: pricingPlans[0].discountRate,
  },
]

/** 구독 관리 화면의 "내 플랜에 포함" 목록 */
export const planIncludes = {
  items: [
    { icon: "calendar", label: "매달 4개 콘텐츠 · 20일 루틴" },
    { icon: "mic", label: "AI 발음·억양 피드백" },
    { icon: "chart", label: "학습 리포트 제공" },
    { icon: "users", label: "네이버 카페 커뮤니티" },
  ],
}

export const guarantee = {
  title: "7일 내 취소 시 무조건 100% 환불 보장",
  description:
    "수강 시작 후 7일 안에는 어떤 이유도 묻지 않고 100% 환불해 드려요.",
}

export const scholarship = {
  title: "우수자 장학금 최대 100만 원!",
  description:
    "1년간의 학습 기록을 1000점으로 환산해 상위 10명에게 장학금을 드립니다. (12개월 이용권 전용 혜택)",
  /** "열심히"를 무엇으로 재는지 상세페이지에서 미리 밝힌다 */
  criteria: [
    { label: "꾸준함", weight: "300점", detail: "학습한 날짜 수" },
    { label: "연속 학습", weight: "150점", detail: "끊기지 않고 이어간 기록" },
    { label: "완주", weight: "200점", detail: "공개 단계 완료율" },
    { label: "성장", weight: "250점", detail: "시작 대비 점수 상승폭" },
    { label: "깊이", weight: "100점", detail: "녹음·복습 재도전" },
  ],
  criteriaNote:
    "성장은 절대 점수가 아니라 상승폭으로 계산해, 왕초보로 시작한 분도 상위권에 들 수 있습니다.",
  tiers: [
    { rank: "1등", amount: "100만원" },
    { rank: "2등", amount: "50만원" },
    { rank: "3등", amount: "30만원" },
    { rank: "4~10등", amount: "10만원" },
  ],
}

export const referral = {
  title: "챌린지 추천 시 혜택",
  description:
    "친구를 초대하면 친구는 12만원 할인, 나는 30일 연장 혜택(10만원 상당, 최대 10회)을 받아요.",
}

export const faqs = [
  {
    question: "스마트폰으로만 공부가 가능한가요?",
    answer:
      "데스크톱(PC), 태블릿, 스마트폰 등 인터넷 접속이 가능한 기기에서는 대부분 공부가 가능합니다. (브라우저는 크롬 권장)",
  },
  {
    question: "어떤 수준의 학습자에게 권장되는 프로그램인가요?",
    answer:
      "문장을 구성하기 어려운 초급자부터 어느 정도 영어로 의사를 표현할 수 있는 중급자 수준까지 권장드립니다.",
  },
  {
    question: "커리큘럼은 어떻게 되나요?",
    answer:
      "1개월 기준, 주말/휴일 등을 제외하고 총 20일 분량의 커리큘럼이 제공됩니다. 영상 1편당 5일 가량의 학습을 바탕으로, 한 편의 영상을 말할 수 있도록 학습하는 것을 목표로 합니다.",
  },
  {
    question: "챌린지는 언제부터 시작하나요?",
    answer:
      "매월 주말/공휴일을 제외한 첫 번째 평일을 기준으로 매달 20일 분량의 학습 커리큘럼이 제공됩니다.",
  },
  {
    question: "챌린지 인증은 어떻게 하나요?",
    answer:
      "캘리쌤이 운영하는 네이버 카페에서 챌린지에 참여하시는 분들을 대상으로 인증 및 Q&A, 추가 학습자료 등을 제공할 예정입니다.",
  },
  {
    question: "챌린지 장학금은 어떻게 받나요?",
    answer:
      "12개월 이용권 구매자 분들을 대상으로 진행되며, 1년 이후 누적된 학습 리포트를 종합적으로 평가하여 대상자를 선정 후 개별 연락 예정이며, 제세공과금을 제하고 지급됩니다.",
  },
  {
    question: "친구 초대 이벤트는 어떻게 하나요?",
    answer:
      "챌린지 구매 이후 초대 링크를 발급받을 수 있으며, 초대한 사람이 구매할 경우 추천인은 30일 연장, 피추천인은 기존 구매자와 동일한 할인 혜택을 적용받을 수 있습니다.",
  },
  {
    question: "할부 결제가 가능한가요?",
    answer:
      "7개 카드사 무이자 할부를 지원합니다. 결제 시 카드사를 선택해 주세요.",
  },
]

export const learningPolicy = {
  title: "학습 규정 및 환불 규정",
  studyRules: {
    heading: "학습 규정",
    warnings: [
      "본 상품은 동영상 형태의 챌린지 콘텐츠를 수강하는 상품입니다.",
      "상황에 따라 사전 공지 없이 할인이 조기 마감되거나 연장될 수 있습니다.",
      "결제를 완료하시면, 매달 첫 평일부터 새 커리큘럼이 순차 공개됩니다.",
    ],
    periodLabel: "총 학습기간:",
    periodItems: [
      "1개월 이용권은 결제일로부터 30일, 12개월 이용권은 결제일로부터 365일간 이용 가능합니다.",
      "매달 4개 콘텐츠, 총 20일 분량의 커리큘럼이 순차 공개됩니다.",
      "학습 시작일: 매월 주말/공휴일을 제외한 첫 번째 평일을 기준으로 새 커리큘럼이 공개됩니다.",
      "12개월 이용권은 회차별로 자동 갱신되며, 언제든 다음 결제 전 해지할 수 있습니다.",
      "일부 콘텐츠는 아직 모든 회차가 공개되지 않았습니다. 공개 일정은 상세페이지 하단에 안내되어 있습니다.",
    ],
  },
  cautions: {
    heading: "주의 사항",
    items: [
      "상황에 따라 사전 공지 없이 할인이 조기 마감되거나 연장될 수 있습니다.",
      "천재지변, 폐업 등 서비스 중단이 불가피한 상황에는 서비스가 종료될 수 있습니다.",
      "본 상품은 우수자 장학금, 친구 추천 혜택 등 기타 할인 이벤트와 중복 적용이 불가할 수 있습니다.",
      "커리큘럼은 제작 과정에서 일부 추가, 삭제 및 변경될 수 있습니다.",
      "쿠폰 적용이나 프로모션 등으로 인해 5만 원 이하의 금액으로 결제할 경우, 할부가 적용되지 않습니다.",
    ],
  },
  refund: {
    heading: "환불 규정",
    items: [
      "환불금액은 정가가 아닌 실제 결제금액을 기준으로 계산됩니다.",
      "쿠폰을 사용하여 결제하신 후 취소/환불 시 쿠폰은 복구되지 않습니다.",
      "수강시작 후 7일 이내, 100% 환불 가능합니다. (단, 수강하셨다면 수강 분량만큼 차감)",
      "수강시작 후 7일 이내, 1강 이상 수강 시 전체 강의에서 수강한 강의의 비율에 해당하는 수강료를 차감 후 환불 가능합니다.",
    ],
    tiered: {
      lead: "수강시작 후 7일 초과 시 정상 수강기간 대비 잔여일에 대해 아래 환불규정에 따라 환불 가능합니다.",
      subLead: "환불요청일 시 기준",
      tiers: [
        "수강시작 후 1/3 경과 전, 실 결제금액의 2/3에 해당하는 금액 환불",
        "수강시작 후 1/2 경과 전, 실 결제금액의 1/2에 해당하는 금액 환불",
        "수강시작 후 1/2 경과 후, 환불 금액 없음",
      ],
    },
  },
  footnote:
    "* 보다 자세한 환불 규정은 홈페이지 취소/환불 정책에서 확인 가능합니다.",
}

export const myPageUser = {
  name: "김홍현",
  level: "왕초보",
  points: "0P",
  stats: [
    { label: "찜한 강의", value: "1개" },
    { label: "구독", value: "3개" },
  ],
}

export const myPageNav = {
  classroom: {
    heading: "강의장",
    items: [
      { label: "학습 분석", href: "/mypage" },
      { label: "내 강의장", href: "/mypage/classroom" },
      { label: "찜한 강의", href: "/mypage/wishlist" },
      { label: "장학금 현황", href: "/mypage/scholarship" },
    ],
  },
  purchase: {
    heading: "구매",
    items: [
      { label: "구독 관리", href: "/mypage/subscriptions" },
      { label: "결제 수단 관리", href: "/mypage/payment-methods" },
    ],
  },
}

/**
 * 결제확인서/영수증 상세 화면 호환용.
 * 실제 거래 데이터는 `lib/billing-data.ts`의 구독 단위 모델을 정본으로 쓴다.
 */
export const paymentHistory = allTransactions.filter(
  (tx) => tx.type === "payment"
)

export const myClassroom = [
  {
    id: "EPISODE 1",
    slug: "ep-1",
    title: "모닝 루틴 (Morning Routine)",
    instructor: "캘리쌤 · 영어 스피킹 코치",
    studiedAt: "2026.08.15 21:43",
    purchasedAt: "2026.08.03 09:12",
    completed: 4,
    total: 5,
  },
  {
    id: "EPISODE 2",
    slug: "ep-2",
    title: "장보기 (Grocery Shopping)",
    instructor: "캘리쌤 · 영어 스피킹 코치",
    studiedAt: "2026.08.03 09:20",
    purchasedAt: "2026.08.03 09:12",
    completed: 0,
    total: 5,
  },
  {
    id: "EPISODE 3",
    slug: "ep-3",
    title: "카페에서 주문하기 (Ordering Coffee)",
    instructor: "캘리쌤 · 영어 스피킹 코치",
    studiedAt: "2026.02.03 10:10",
    purchasedAt: "2026.02.03 10:05",
    completed: 0,
    total: 5,
  },
  {
    id: "EPISODE 4",
    slug: "ep-4",
    title: "여행 중 생기는 일 (Travel Diaries)",
    instructor: "캘리쌤 · 영어 스피킹 코치",
    studiedAt: "2026.01.03 10:50",
    purchasedAt: "2026.01.03 10:41",
    completed: 0,
    total: 5,
  },
]

export const myProfile = {
  basic: [
    { label: "가입", value: "카카오" },
    { label: "휴대전화 번호", value: "010 - 1204 - 5***", action: "변경" },
    { label: "성인인증", value: "인증 미완료", action: "인증", muted: true },
  ],
  profile: {
    handle: "hh_kim01",
    level: "왕초보",
  },
  marketing: {
    agreedAt: "2026.08.03 09:12",
    description:
      "이벤트 정보, 할인 쿠폰 등 다양한 혜택과 신규 클래스, 영어 공부법에 관한 알림을 받을 수 있습니다.",
    note: "영리 목적이 아닌 정보성 내용은 설정 여부와 관계없이 발송됩니다.",
  },
}
