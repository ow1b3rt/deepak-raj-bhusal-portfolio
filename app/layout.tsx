import { Geist_Mono, Outfit } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"
import SmoothScroll from "@/components/molecules/SmoothScroll"
import { Navbar } from "@/components/molecules/Navbar"
import { Footer } from "@/components/molecules/Footer"
import GlowCard from "@/components/molecules/GlowCard"
import { ScrollToTop } from "@/components/molecules/ScrollToTop"

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

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
          <main className='pt-8 px-4'>
            <div className="mx-auto container">{children}</div>
          </main>
          <Footer />
          <ScrollToTop />
        </SmoothScroll>
      </body>
    </html>
  )
}
