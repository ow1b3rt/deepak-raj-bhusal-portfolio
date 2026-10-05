import {
  Hero,
  Impact,
  Media,
  ProofPoints,
  Story,
  FeaturedVentures,
  InsightsSection,
  Timeline,
  Blogs,
} from "@/features/home"

import { insights } from "@/data/insights"

export default function Page() {
  return (
    <main className="">
      <Hero />
      <Story />
      <ProofPoints />
      <FeaturedVentures />
      <Impact />
      <Timeline />
      <Blogs />
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
