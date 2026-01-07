"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from 'next/image'
import { ArrowRight, Search, Filter } from "lucide-react"

const INSIGHTS = [
  {
    date: "March 12, 2026",
    title: "The Resurgence of Brutalist Architecture in Brooklyn",
    category: "Market Trends",
    excerpt:
      "Why modern buyers are looking back to raw materials and bold geometric forms. We explore the structural honesty and cultural impact of the new brutalist wave.",
    image: "/modern-architecture-brutalist.jpg?key=i1&height=600&width=800&query=brutalist-modern-architecture",
  },
  {
    date: "February 28, 2026",
    title: "How Interest Rates are Shaping the 2026 Luxury Market",
    category: "Finance",
    excerpt:
      "Navigating the shifting tides of high-end real estate financing in the current economic climate. A deep dive into strategic lending and asset preservation.",
    image: "/luxury-office-finance.jpg?key=i2&height=600&width=800&query=luxury-office-interior",
  },
  {
    date: "January 15, 2026",
    title: "The 10 Most Anticipated Penthouses Opening This Year",
    category: "Exclusive",
    excerpt:
      "A preview of the architectural giants rising above the Manhattan skyline, redefining vertical living with unprecedented amenities and design.",
    image: "/penthouse-skyline-view.jpg?key=i3&height=600&width=800&query=penthouse-view-nyc",
  },
  {
    date: "December 10, 2025",
    title: "Sustainable Luxury: The Future of High-End Development",
    category: "Sustainability",
    excerpt:
      "How world-class architects are integrating passive design and renewable energy into the world's most expensive residences without compromising on aesthetic.",
    image: "/green-architecture.jpg?key=i4&height=600&width=800&query=sustainable-modern-mansion",
  },
  {
    date: "November 22, 2025",
    title: "The Psychology of Space: Why Minimalism is Winning",
    category: "Design",
    excerpt:
      "Exploring the emotional impact of open-plan living and the intentional use of negative space in contemporary residential architecture.",
    image: "/minimalist-interior.jpg?key=i5&height=600&width=800&query=minimalist-luxury-interior",
  },
  {
    date: "October 05, 2025",
    title: "Investing in Mid-Century Modern Landmarks",
    category: "Investment",
    excerpt:
      "A guide to identifying and preserving mid-century masterpieces, from valuation nuances to the challenges of modernizing historic structural systems.",
    image: "/mid-century-modern.jpg?key=i6&height=600&width=800&query=mid-century-modern-house",
  },
]

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-40 pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">
              The Perspective
            </span>
            <h1 className="text-6xl md:text-9xl font-serif font-bold tracking-tighter mb-8 leading-[0.9]">
              Market <br />
              <span className="italic text-accent">Insights.</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Deep dives into the trends, data, and stories shaping the world of high-end real estate and architectural
              preservation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 border-y mb-20 bg-muted/20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-8 overflow-x-auto pb-4 md:pb-0 no-scrollbar">
            {["All", "Market Trends", "Design", "Finance", "Exclusive", "Investment"].map((cat) => (
              <button
                key={cat}
                className="text-[10px] font-bold uppercase tracking-widest hover:text-accent transition-colors whitespace-nowrap"
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search insights..."
                className="w-full pl-12 pr-4 py-3 rounded-full border bg-white focus:outline-none focus:border-accent"
              />
            </div>
            <button className="p-3 border rounded-full hover:bg-white transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="pb-40">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {INSIGHTS.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: (index % 3) * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] mb-8 overflow-hidden rounded-3xl">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute top-6 left-6 px-4 py-1.5 bg-background/80 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/20">
                    {post.category}
                  </div>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-4">{post.date}</div>
                <h2 className="text-3xl font-serif font-bold mb-4 group-hover:text-accent transition-colors leading-[1.1] tracking-tight">
                  {post.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest border-b border-transparent group-hover:border-accent w-fit pb-1 transition-all">
                  Full Analysis <ArrowRight className="w-3 h-3 group-hover:translate-x-2 transition-transform" />
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-32 p-20 bg-primary text-primary-foreground rounded-[3rem] text-center relative overflow-hidden"
          >
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 tracking-tighter italic">
                Subscribe to the Private Brief.
              </h2>
              <p className="text-primary-foreground/70 mb-10 text-lg">
                Receive exclusive market reports, off-market opportunities, and architectural deep-dives directly in
                your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="flex-1 px-8 py-4 rounded-full bg-white/10 border border-white/20 focus:bg-white/20 focus:outline-none placeholder:text-white/40"
                />
                <button className="px-10 py-4 bg-accent text-white rounded-full font-bold uppercase tracking-widest text-[10px] hover:scale-105 transition-transform">
                  Join Now
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
