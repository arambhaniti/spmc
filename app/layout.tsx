import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ScrollToTop } from "@/components/scroll-to-top" // added scroll restorer
import { ThemeToggle } from "@/components/theme-toggle"
import { COMPANY_NAME } from '@/config/constants'
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })

export const metadata: Metadata = {
  title: `${COMPANY_NAME} | Modern Real Estate Agent`,
  description:
    "Your trusted partner in finding the perfect home. Specialized in high-end properties in New York and Los Angeles.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground overflow-x-hidden`}
      >
        <ThemeToggle />
        <ScrollToTop />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
