import { Geist_Mono, Outfit } from "next/font/google"
import { cn } from "@/lib/utils"

import "@/app/globals.css"

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function AdminLayout({ children }) {
  return (
    <html
      lang="en"
      className={cn(
        "font-sans antialiased",
        outfit.variable,
        fontMono.variable
      )}
    >
      <head>
        <title>Admin Layout</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
