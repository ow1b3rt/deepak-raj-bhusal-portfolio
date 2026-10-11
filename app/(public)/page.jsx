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

export const metadata = {
  title:
    "Deepak Raj Bhusal | Entrepreneur, Social Activist & Philanthropist",
  description:
    "Discover the journey of Deepak Raj Bhusal, Executive Chairman of Enlighten Group — building opportunities in education, travel, technology, hospitality, and community service across Nepal.",
  alternates: { canonical: "/" },
  openGraph: {
    title:
      "Deepak Raj Bhusal | Entrepreneur, Social Activist & Philanthropist",
    description:
      "Discover the journey of Deepak Raj Bhusal, Executive Chairman of Enlighten Group — building opportunities across education, travel, technology, hospitality, and community service.",
    url: "/",
  },
}

export default function Page() {
  return (
    <main className="">
      <Hero />
      <Story />
      <ProofPoints />
      <FeaturedVentures />
      {/*<Impact />*/}
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
