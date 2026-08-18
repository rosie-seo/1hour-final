import Image from "next/image"
import {
  BarChart3,
  ChevronRight,
  Gift,
  Infinity as InfinityIcon,
  MessageCircle,
  Smartphone,
  SquareLibrary,
} from "lucide-react"

import { CourseActions } from "@/components/landing/course-actions"
import { Button } from "@/components/ui/button"
import { course, pricingPlans, referral, scholarship } from "@/lib/course-data"

const statIcons = [SquareLibrary, BarChart3, Smartphone]

const heroFeatures = [
  { icon: InfinityIcon, label: "평생 소장" },
  { icon: MessageCircle, label: "1:1 피드백" },
  { icon: Gift, label: "쿠폰할인" },
]

function formatWon(value: number) {
  return `${value.toLocaleString("ko-KR")}원`
}

const maxDiscountRate = Math.max(
  ...pricingPlans.map((plan) => plan.discountRate)
)
const monthlyRegularPrice = pricingPlans[0].regularPrice
const lowestPlan =
  pricingPlans.find((plan) => plan.highlight) ?? pricingPlans[0]

export function Hero() {
  return (
    <section id="top" className="border-b border-border">
      <div id="hero-banner" className="relative">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/hero-background.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "78% 30%" }}
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <CourseActions
          courseId={course.id}
          title={course.title}
          className="absolute top-4 right-4 z-10 sm:top-6 sm:right-6"
        />

        <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-24">
          <h1 className="font-heading text-3xl leading-tight font-black tracking-tight text-balance text-white sm:text-4xl">
            {course.title}
          </h1>

          <p className="mt-3 max-w-md text-pretty text-white/80 sm:text-lg">
            {course.subtitle}
          </p>

          <p className="mt-4 text-sm font-medium text-white underline decoration-white/40 underline-offset-4">
            {course.instructor}
          </p>

          <div className="mt-8 flex gap-8 sm:gap-12">
            {heroFeatures.map((feature) => (
              <div
                key={feature.label}
                className="flex flex-col items-center gap-2"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur-sm">
                  <feature.icon className="size-5 text-white" />
                </div>
                <span className="text-xs text-white/85">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-sm font-bold text-destructive">
            최대 {maxDiscountRate}% 할인
          </span>
          <span className="text-sm text-muted-foreground line-through">
            {formatWon(monthlyRegularPrice)}
          </span>
          <span className="font-heading text-3xl font-black tracking-tight">
            {lowestPlan.priceLabel}
            <span className="ml-0.5 text-base font-medium text-muted-foreground">
              ~
            </span>
          </span>
        </div>

        <div className="mt-4 divide-y divide-border border-y border-border">
          <div className="flex items-center justify-between py-3 text-sm">
            <span className="text-muted-foreground">{referral.title}</span>
            <span className="inline-flex items-center gap-1 font-semibold text-primary">
              최대 120,000원
              <ChevronRight className="size-4" />
            </span>
          </div>
          <div className="flex items-center justify-between py-3 text-sm">
            <span className="text-muted-foreground">
              {scholarship.title.replace("!", "")}
            </span>
            <span className="inline-flex items-center gap-1 font-semibold text-primary">
              최대 {scholarship.tiers[0].amount}
              <ChevronRight className="size-4" />
            </span>
          </div>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          * 상품별 유의사항을 하단에서 반드시 확인해주세요.
          <br />* 12개월 무이자 할부 지원 · 신한 · 삼성 · 현대 · 국민 · 롯데 ·
          우리 · 하나카드
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button
            size="lg"
            render={<a href="#pricing" />}
            nativeButton={false}
            className="h-12 px-6 text-base"
          >
            지금 결제하고 시작하기
          </Button>
          <Button
            size="lg"
            variant="outline"
            render={<a href="#curriculum" />}
            nativeButton={false}
            className="h-12 px-6 text-base"
          >
            커리큘럼 먼저 보기
          </Button>
        </div>

        <h2 className="mt-10 font-heading text-base font-bold">
          클래스 상세 정보
        </h2>
        <ul className="mt-4 flex flex-col gap-3">
          {course.stats.map((stat, i) => {
            const Icon = statIcons[i % statIcons.length]
            return (
              <li key={stat.label} className="flex items-center gap-2.5">
                <Icon className="size-4 shrink-0 text-muted-foreground" />
                <span className="text-sm text-foreground/90">{stat.value}</span>
              </li>
            )
          })}
        </ul>

        <dl className="mt-4 flex flex-col gap-1.5 border-t border-border pt-4">
          {course.schedule.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-4 text-xs"
            >
              <dt className="text-muted-foreground">{item.label}</dt>
              <dd className="text-foreground/80">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
