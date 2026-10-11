import type { Metadata } from "next"
import { Geist_Mono, Outfit } from "next/font/google"

import "@/app/globals.css"
import { cn } from "@/lib/utils"
import SmoothScroll from "@/components/molecules/SmoothScroll"
import { Navbar } from "@/components/molecules/Navbar"
import { Footer } from "@/components/molecules/Footer"
import GlowCard from "@/components/molecules/GlowCard"
import { ScrollToTop } from "@/components/molecules/ScrollToTop"
import { Toaster } from "sonner"

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://deepakrajbhusal.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Deepak Raj Bhusal | Entrepreneur, Social Activist & Philanthropist",
    template: "%s | Deepak Raj Bhusal",
  },
  description:
    "Official website of Deepak Raj Bhusal — entrepreneur, social activist, and philanthropist from Nepal. Explore his journey across education, travel, technology, hospitality, and community service.",
  keywords: [
    "Deepak Raj Bhusal",
    "Enlighten Group",
    "Nepali entrepreneur",
    "social activist Nepal",
    "philanthropist Nepal",
    "business leadership",
    "education Nepal",
  ],
  authors: [{ name: "Deepak Raj Bhusal" }],
  creator: "Deepak Raj Bhusal",
  openGraph: {
    type: "website",
    siteName: "Deepak Raj Bhusal",
    locale: "en_US",
    url: siteUrl,
    title:
      "Deepak Raj Bhusal | Entrepreneur, Social Activist & Philanthropist",
    description:
      "Official website of Deepak Raj Bhusal — entrepreneur, social activist, and philanthropist from Nepal.",
    images: [{ url: "/images/person/hero.jpg", alt: "Deepak Raj Bhusal" }],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Deepak Raj Bhusal | Entrepreneur, Social Activist & Philanthropist",
    description:
      "Official website of Deepak Raj Bhusal — entrepreneur, social activist, and philanthropist from Nepal.",
    images: ["/images/person/hero.jpg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(
        "font-sans antialiased",
        outfit.variable,
        fontMono.variable
      )}
    >
      <body className="relative min-h-dvh">
        <GlowCard />
        <SmoothScroll>
          <Navbar />
          <main className="px-4 pt-8">
            <div className="container mx-auto">{children}</div>
          </main>
          <Footer />
          <ScrollToTop />
        </SmoothScroll>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
