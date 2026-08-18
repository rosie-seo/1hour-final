export function SiteFooter() {
  return (
    <footer className="pb-24 sm:pb-8">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-heading text-base font-black tracking-tight">
              캘리쌤 영어 챌린지
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              (주)캘리잉글리시 · 대표 홍길동
              <br />
              사업자등록번호 000-00-00000 · 통신판매업신고
              제0000-서울강남-00000호
              <br />
              서울특별시 강남구 테헤란로 000, 0층
              <br />
              고객센터 1544-0000 (평일 10:00~18:00) · help@example.com
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground">
              이용약관
            </a>
            <a href="#" className="hover:text-foreground">
              개인정보처리방침
            </a>
            <a href="#faq" className="hover:text-foreground">
              FAQ
            </a>
            <a href="#" className="hover:text-foreground">
              환불 규정
            </a>
          </nav>
        </div>

        <p className="mt-8 text-xs text-muted-foreground/70">
          © {new Date().getFullYear()} 캘리쌤 영어 챌린지. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
