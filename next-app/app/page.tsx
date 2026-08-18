import { BackofficeImageSection } from "@/components/landing/backoffice-image-section"
import { Curriculum } from "@/components/landing/curriculum"
import { Faq } from "@/components/landing/faq"
import { Hero } from "@/components/landing/hero"
import { Instructor } from "@/components/landing/instructor"
import { Pricing } from "@/components/landing/pricing"
import { RefundPolicy } from "@/components/landing/refund-policy"
import { SiteFooter } from "@/components/landing/site-footer"
import { SiteHeader } from "@/components/landing/site-header"
import { StickyPurchaseBar } from "@/components/landing/sticky-purchase-bar"
import { TabBar } from "@/components/landing/tab-bar"
import { Testimonials } from "@/components/landing/testimonials"
import { backofficeImages } from "@/lib/course-data"

const productIntroImages = [
  ...backofficeImages.whatIsIt,
  ...backofficeImages.howItWorks,
]

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main>
        <Hero />
        <TabBar />
        <BackofficeImageSection
          id="product-intro"
          images={productIntroImages}
        />
        <Instructor />
        <Curriculum />
        <Pricing />
        <Testimonials />
        <Faq />
        <RefundPolicy />
      </main>
      <SiteFooter />
      <StickyPurchaseBar />
    </div>
  )
}
