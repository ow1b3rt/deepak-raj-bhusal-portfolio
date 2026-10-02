import { Hero } from "@/components/templates/Home/HeroSection"
import { Impact } from "@/components/templates/Home/ImpactSection"
import InsightsSection from "@/components/templates/Home/InsightsSection"
import { Media } from "@/components/templates/Home/MediaSection"
import { ProofPoints } from "@/components/templates/Home/ProofSection"
import { Story } from "@/components/templates/Home/StorySection"
import { FeaturedVentures } from "@/components/templates/Home/VenturesSection"

import { insights } from "@/data/insights"

export default function Page() {
  return (
    <main className="">
      <Hero />
      <Story />
      <ProofPoints />
      <FeaturedVentures />
      <Impact />
      <Media />
      <InsightsSection
        heading="Insights"
        items={insights}
        headingLevel={1}
        navbarOffset={72}
      />
    </main>
  )
}
