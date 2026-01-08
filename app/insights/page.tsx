"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from 'next/image'
import { ArrowRight, Search, Filter } from "lucide-react"
import Link from "next/link"
import { INSIGHTS } from "@/config/insights-data"

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
      {/* <section className="py-12 border-y mb-20 bg-muted/20">
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
      </section> */}

      <section className="pb-40">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {INSIGHTS.map((post, index) => (
              <Link key={post.slug} href={`/insights/${post.slug}`} className="group block">
                <motion.article
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: (index % 3) * 0.1 }}
                  className="cursor-pointer"
                >
                  <div className="relative aspect-[4/5] mb-8 overflow-hidden rounded-3xl">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        const parent = target.parentElement
                        if (parent && !parent.querySelector('.fallback-content')) {
                          const fallbackDiv = document.createElement('div')
                          fallbackDiv.className = 'fallback-content absolute inset-0 bg-linear-to-br from-accent/20 via-primary/10 to-accent/20 flex items-center justify-center'
                          fallbackDiv.innerHTML = `
                            <div class="text-center p-8">
                              <svg class="w-16 h-16 mx-auto mb-4 text-accent/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                              </svg>
                              <div class="w-24 h-1 bg-accent/30 mx-auto mb-4 rounded-full"></div>
                              <p class="text-accent/80 font-medium text-sm uppercase tracking-wider">${post.title}</p>
                              <p class="text-accent/60 text-xs mt-2">Image Coming Soon</p>
                            </div>
                          `
                          parent.appendChild(fallbackDiv)
                        }
                      }}
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
              </Link>
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
