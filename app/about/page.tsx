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
      {/* <Press /> */}

      {/* Expanded Philosophy Section */}
      <section className="py-4 md:py-32 bg-white">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-5xl font-serif font-bold tracking-tighter leading-none mb-10 italic">
              A Decade of <br /> Exceptionalism.
            </h2>
            <div className="space-y-6 text-xl text-muted-foreground leading-relaxed text-justify">
              <p>
                Our journey began in 2011 with a single vision: to bridge the gap between architectural artistry and
                strategic real estate advisory. {COMPANY_NAME} founded the studio after years of studying urban design
                and market psychology at Harvard Graduate School of Design.
              </p>
              <p>
                Today, we operate at the intersection of these disciplines, representing some of the most significant
                residential landmarks in Dubai and Abu Dhabi. Our success is not measured by volume, but by the
                integrity of the matches we facilitate.
              </p>
            </div>
          </div>
        <div className="flex flex-col justify-between h-full gap-4">
          <div className="border-[0.05px] rounded-lg "/>
            <div className="grid grid-cols-2 gap-8">
            {[
              { label: "Founded", value: "2011" },
              { label: "Transactions", value: "850+" },
              { label: "Global Partners", value: "45" },
              { label: "Awards", value: "12" },
            ].map((stat, i) => (
              <div key={i} className="p-8 border border-accent/20 rounded-lg text-center">
                <p className="text-4xl font-serif font-bold mb-2">{stat.value}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
                    <div className="border rounded-lg "/>

        </div>
        </div>
      </section>

      {/* Our Philosophy Section */}
      <section className="py-4 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">
              Our Philosophy
            </span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold tracking-tighter mb-8 italic">
              Beyond <br /> Transactions.
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed text-justify">
              We believe real estate is the most intimate form of art curation—each property a masterpiece waiting for its perfect collector.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-16 max-w-6xl mx-auto">
            <div className="text-center">
              <h3 className="text-2xl font-serif font-bold mb-6">Architectural Integrity</h3>
              <p className="text-muted-foreground leading-relaxed text-justify">
                Every property in our portfolio represents a dialogue between architect and environment. We preserve and honor this conversation, ensuring each space continues to tell its story.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-serif font-bold mb-6">Human Connection</h3>
              <p className="text-muted-foreground leading-relaxed text-justify">
                Beyond square footage and amenities, we focus on how spaces shape daily life. Our approach prioritizes emotional resonance and lifestyle alignment over mere specifications.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-serif font-bold mb-6">Legacy Building</h3>
              <p className="text-muted-foreground leading-relaxed text-justify">
                We don't just facilitate transactions; we help build legacies. Each property we represent becomes part of our clients' family narrative and investment portfolio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-4 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">
              Leadership
            </span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold tracking-tighter mb-8 italic">
              Minds Behind <br /> the Vision.
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            <div className="text-center md:text-left">
              <div className="w-32 h-32 bg-gradient-to-br from-accent/20 to-accent/5 rounded-full mx-auto md:mx-0 mb-8"></div>
              <h3 className="text-2xl font-serif font-bold mb-2">Aram Bhaniti</h3>
              <p className="text-sm font-bold uppercase tracking-widest text-accent mb-4">Founding Partner</p>
              <p className="text-muted-foreground leading-relaxed mb-4 text-justify">
                With over 15 years in luxury real estate, Aram brings a unique blend of architectural expertise and market intelligence. A graduate of Harvard GSD, he has facilitated over $1.2B in transactions across Dubai's most prestigious developments.
              </p>
              <p className="text-sm text-muted-foreground">
                Specializes in: Architectural valuation, Off-market acquisitions, Portfolio strategy
              </p>
            </div>
            <div className="text-center md:text-left">
              <div className="w-32 h-32 bg-gradient-to-br from-accent/20 to-accent/5 rounded-full mx-auto md:mx-0 mb-8"></div>
              <h3 className="text-2xl font-serif font-bold mb-2">Sarah Al-Mansoori</h3>
              <p className="text-sm font-bold uppercase tracking-widest text-accent mb-4">Partner, Client Relations</p>
              <p className="text-muted-foreground leading-relaxed mb-4 text-justify">
                Sarah brings 12 years of experience in luxury client management, having previously led client services at Christie's International Real Estate. Her deep understanding of Middle Eastern luxury markets ensures exceptional service for our discerning clientele.
              </p>
              <p className="text-sm text-muted-foreground">
                Specializes in: Client experience, Cross-border transactions, Cultural advisory
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Market Expertise Section */}
      <section className="py-4 md:py-32 border-t">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">
              Market Intelligence
            </span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold tracking-tighter mb-8 italic">
              Dubai's <br /> Evolution.
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We've witnessed and shaped Dubai's transformation into a global luxury destination.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            <div>
              <h3 className="text-3xl font-serif font-bold mb-6">Areas of Focus</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold">•</span>
                  <p className="text-muted-foreground text-sm leading-relaxed text-justify">
                    <strong>Downtown Dubai & DIFC:</strong> Iconic towers with panoramic views
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold">•</span>
                  <p className="text-muted-foreground text-sm leading-relaxed text-justify">
                    <strong>Dubai Marina & JBR:</strong> Waterfront living with maritime luxury
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold">•</span>
                  <p className="text-muted-foreground text-sm leading-relaxed text-justify">
                    <strong>Palm Jumeirah:</strong> Exclusive island estates and beachfront properties
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold">•</span>
                  <p className="text-muted-foreground text-sm leading-relaxed text-justify">
                    <strong>Emirates Hills:</strong> Gated communities with championship golf courses
                  </p>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-3xl font-serif font-bold mb-6">Market Insights</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-accent mb-2">Property Types</p>
                  <p className="text-muted-foreground text-sm leading-relaxed text-justify">
                    Penthouses (35%), Villas (25%), Sky Villas (20%), Luxury Apartments (20%)
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-accent mb-2">Average Transaction</p>
                  <p className="text-muted-foreground text-sm leading-relaxed text-justify">
                    AED 8.5M for apartments, AED 22M for villas, AED 45M+ for penthouses
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-accent mb-2">Client Portfolio</p>
                  <p className="text-muted-foreground text-sm leading-relaxed text-justify">
                    60% International investors, 25% UHNW residents, 15% Corporate acquisitions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhyMe />
      <Footer />
    </main>
  )
}
