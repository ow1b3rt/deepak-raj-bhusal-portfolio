"use client"

import FeatureSplit from "@/components/molecules/FeatureSplit"

export default function InsightCard({
  title,
  description,
  bullets,
  cta,
  image,
  headingLevel = 3,
  className = "",
}) {
  return (
    <FeatureSplit
      headingLevel={headingLevel}
      title={title}
      description={description}
      bullets={bullets}
      cta={cta}
      image={image}
      align="center"
      mediaPosition="right"
      className={[
        "h-full px-0 py-0", 
        className,
      ].join(" ")}
      contentClassName="max-w-prose"
      mediaClassName="aspect-[4/3] sm:aspect-[16/10]"
    />
  )
}
