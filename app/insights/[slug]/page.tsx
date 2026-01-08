"use client"

import { use } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { INSIGHTS } from "@/config/insights-data"
import { notFound } from "next/navigation"

type InsightDetailPageProps = {
  params: Promise<{
    slug: string
  }>
}

export default function InsightDetailPage({ params }: InsightDetailPageProps) {
  const { slug } = use(params)
  const post = INSIGHTS.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <Link
            href="/insights"
            className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-8 hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-3 h-3 mr-2" /> Back to insights
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-start"
          >
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-4 flex flex-wrap items-center gap-3">
                <span>{post.category}</span>
                <span className="w-6 h-px bg-accent/40" />
                <span className="text-muted-foreground/80">{post.date}</span>
                <span className="w-6 h-px bg-accent/20" />
                <span className="text-muted-foreground/70">{post.location}</span>
                <span className="w-6 h-px bg-accent/20" />
                <span className="text-muted-foreground/70">Insight • {post.readTimeMinutes} min read</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-6 leading-[1.05]">
                {post.title}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-2xl">
                {post.excerpt}
              </p>
            </div>

            <div className="lg:justify-self-end w-full max-w-sm lg:max-w-xs space-y-4">
              <div className="rounded-3xl border border-border/60 bg-background/80 px-6 py-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-muted overflow-hidden flex items-center justify-center text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  {post.authorImage ? (
                    <Image src={post.authorImage} alt={post.authorName} width={48} height={48} className="object-cover w-full h-full" />
                  ) : (
                    <span>SPMC</span>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold tracking-[0.16em] uppercase text-foreground">{post.authorName}</p>
                  <p className="text-[11px] text-muted-foreground leading-snug">{post.authorTitle}</p>
                </div>
              </div>

              {post.tags?.length ? (
                <div className="rounded-3xl border border-border/60 bg-muted/40 px-6 py-5 text-xs uppercase tracking-[0.18em] font-bold text-muted-foreground">
                  <p className="mb-3 text-[11px]">Topics</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-background text-foreground border border-border/60 normal-case text-[11px] tracking-[0.08em]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {post.keyStats?.length ? (
                <div className="rounded-3xl border border-border/60 bg-background/80 px-6 py-6 space-y-4 text-sm">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Key figures</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {post.keyStats.map((stat) => (
                      <div key={stat.label} className="border-l border-accent/40 pl-3">
                        <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-1">{stat.label}</p>
                        <p className="text-sm text-foreground font-medium leading-snug">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.12 }}
            className="relative aspect-video rounded-[2.5rem] overflow-hidden mt-12 mb-16"
          >
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-start"
          >
            <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:tracking-tight prose-p:text-muted-foreground prose-p:leading-relaxed">
              {post.content.length > 0 && (
                <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed mb-8 border-l-2 border-accent/60 pl-6">
                  {post.content[0]}
                </p>
              )}
              {post.content.slice(1).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-border/70 bg-muted/40 p-6 text-sm text-muted-foreground">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-3">Advisor’s note</p>
                <p>
                  When we evaluate opportunities like this, we look for alignment between architecture, location, and long-term
                  demand – not just today’s pricing. Thoughtful design continues to outperform the broader market over a full cycle.
                </p>
              </div>

              <div className="rounded-3xl border border-border/70 bg-background/80 p-6 text-sm">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-3">Signals to watch</p>
                <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                  <li>How quickly architecturally significant listings are absorbed at the top of the market.</li>
                  <li>Shifts in lender appetite for design-led, low-density projects.</li>
                  <li>Regulatory changes that may impact redevelopment or preservation mandates.</li>
                </ul>
              </div>
            </aside>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className="mt-20 pt-10 border-t border-border/60"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-muted-foreground mb-6">Continue exploring</p>
            <div className="grid md:grid-cols-2 gap-8">
              {INSIGHTS.filter((p) => p.slug !== post.slug)
                .slice(0, 2)
                .map((related) => (
                  <Link
                    key={related.slug}
                    href={`/insights/${related.slug}`}
                    className="group flex flex-col gap-3 border border-border/60 rounded-3xl p-6 hover:border-accent/70 hover:bg-muted/40 transition-colors"
                  >
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                      {related.category} • {related.date}
                    </div>
                    <h3 className="text-lg font-serif font-semibold group-hover:text-accent transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-3">{related.excerpt}</p>
                    <span className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground flex items-center gap-2">
                      Read analysis
                      <span className="w-5 h-px bg-foreground/70 group-hover:w-8 transition-all" />
                    </span>
                  </Link>
                ))}
            </div>
          </motion.div>

          {post.sources?.length ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
              className="mt-16 pt-8 border-t border-border/40"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-muted-foreground mb-4">Sources & references</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                {post.sources.map((source, index) => (
                  <li key={index}>{source}</li>
                ))}
              </ul>
            </motion.div>
          ) : null}
        </div>
      </section>

      <Footer />
    </main>
  )
}
