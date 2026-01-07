"use client"

import { Navbar } from "@/components/navbar"
import { About } from "@/components/about"
import { WhyMe } from "@/components/why-me"
import { Press } from "@/components/press"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { COMPANY_NAME } from '@/config/constants'

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-40 pb-20 container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
          <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">
            The Philosophy
          </span>
          <h1 className="text-7xl md:text-9xl font-serif font-bold tracking-tighter leading-[0.9] mb-12">
            Beyond the <br />
            <span className="italic">Surface.</span>
          </h1>
          <p className="text-2xl text-muted-foreground leading-relaxed">
            We believe that every home is a structural narrative, a curated environment designed to elevate the human
            experience.
          </p>
        </motion.div>
      </div>

      <About />
      <Press />

      {/* Expanded Philosophy Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-5xl font-serif font-bold tracking-tighter leading-none mb-10 italic">
              A Decade of <br /> Exceptionalism.
            </h2>
            <div className="space-y-6 text-xl text-muted-foreground leading-relaxed">
              <p>
                Our journey began in 2011 with a single vision: to bridge the gap between architectural artistry and
                strategic real estate advisory. {COMPANY_NAME} founded the studio after years of studying urban design
                and market psychology.
              </p>
              <p>
                Today, we operate at the intersection of these disciplines, representing some of the most significant
                residential landmarks in New York and Los Angeles. Our success is not measured by volume, but by the
                integrity of the matches we facilitate.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {[
              { label: "Founded", value: "2011" },
              { label: "Transactions", value: "850+" },
              { label: "Global Partners", value: "45" },
              { label: "Awards", value: "12" },
            ].map((stat, i) => (
              <div key={i} className="p-8 border-l-2 border-accent/20">
                <p className="text-4xl font-serif font-bold mb-2">{stat.value}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyMe />
      <Footer />
    </main>
  )
}
