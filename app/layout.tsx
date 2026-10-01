import { Geist_Mono, Outfit } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"
import SmoothScroll from "@/components/molecules/SmoothScroll"
import { Navbar } from "@/components/molecules/Navbar"
import { Footer } from "@/components/molecules/Footer"

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
      <body className="bg-[radial-gradient(ellipse_at_top_right,rgba(246,67,73,0.14)_0%,rgba(246,67,73,0.06)_35%,transparent_70%)]">
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
