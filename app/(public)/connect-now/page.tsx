import { ConnectSection } from "@/features/ConnectNow/ConnectSection"

export const metadata = {
  title: "Connect",
  description:
    "Have an idea, opportunity, or collaboration in mind? Let's start a conversation with Deepak Raj Bhusal.",
  alternates: { canonical: "/connect-now" },
  openGraph: {
    title: "Connect | Deepak Raj Bhusal",
    description:
      "Have an idea, opportunity, or collaboration in mind? Let's start a conversation with Deepak Raj Bhusal.",
    url: "/connect-now",
  },
}

export default function ConnectNowPage() {
  return <ConnectSection />
}
