import { PartnershipSection } from "@/features/Partnership/PartnershipSection"

export const metadata = {
  title: "Partnership",
  description:
    "Have an idea, opportunity, or collaboration in mind? Let's start a conversation with Deepak Raj Bhusal.",
  alternates: { canonical: "/partnership" },
  openGraph: {
    title: "Partnership | Deepak Raj Bhusal",
    description:
      "Have an idea, opportunity, or collaboration in mind? Let's start a conversation with Deepak Raj Bhusal.",
    url: "/partnership",
  },
}

export default function PartnershipPage() {
  return <PartnershipSection />
}
