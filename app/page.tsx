"use client"

import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { HomepageProperties } from "@/components/homepage-properties"
import { About } from "@/components/about"
import { WhyMe } from "@/components/why-me"
import { Process } from "@/components/process"
import { Expertise } from "@/components/expertise"
import { FAQ } from "@/components/faq"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Footer } from "@/components/footer"

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200])

  return (
    <main className="min-h-screen bg-background selection:bg-accent selection:text-white">
      <Navbar />
      <Hero />

      {/* Dynamic Stats Section */}
      <section className="py-20 bg-card overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Listings Sold", value: "450+" },
              { label: "Total Volume", value: "$1.2B" },
              { label: "Active Listings", value: "24" },
              { label: "Years Exp.", value: "15" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl md:text-6xl font-serif font-bold text-primary mb-2 tracking-tighter">
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-[0.2em] font-bold text-accent">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <HomepageProperties />

      <Expertise />
      <Process />

      {/* Floating Image Parallax Section */}
      <section ref={containerRef} className="py-32 overflow-hidden relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-24">
            <h2 className="text-4xl md:text-7xl font-serif font-bold tracking-tighter mb-8">
              Redefining Luxury Through <span className="italic text-accent">Vision</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We don't just find houses; we discover the backdrop for your future memories. Every property in our
              portfolio is selected for its unique soul and architectural integrity.
            </p>
          </div>
        </div>

        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 left-[5%] w-64 h-80 rounded-3xl overflow-hidden opacity-20 md:opacity-100 grayscale hover:grayscale-0 transition-all duration-700"
        >
          <Image src="/luxury-interior-1.jpg" fill alt="Interior" className="object-cover" />
        </motion.div>
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-20 right-[5%] w-72 h-96 rounded-3xl overflow-hidden opacity-20 md:opacity-100 grayscale hover:grayscale-0 transition-all duration-700"
        >
          <Image src="/luxury-interior-2.jpg" fill alt="Interior" className="object-cover" />
        </motion.div>
      </section>

      <About />
      <WhyMe />

      <FAQ />

      {/* Testimonials Marquee-like Section */}
      <section className="py-24 bg-secondary/20 overflow-hidden">
        <div className="flex whitespace-nowrap gap-12 items-center">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center gap-6 p-8 bg-card rounded-3xl border border-border shadow-xl"
            >
              <div className="w-16 h-16 rounded-full bg-accent/10 overflow-hidden">
                <img src={`/client-.jpg?key=1nwrb&height=64&width=64&query=client-${i}`} alt="Client" />
              </div>
              <div>
                <p className="text-lg font-serif font-bold">"Absolute perfection."</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">The Henderson Family</p>
              </div>
            </div>
          ))}
          {/* Duplicate for marquee effect */}
          {[1, 2, 3, 4].map((i) => (
            <div
              key={`dup-${i}`}
              className="flex-shrink-0 flex items-center gap-6 p-8 bg-card rounded-3xl border border-border shadow-xl"
            >
              <div className="w-16 h-16 rounded-full bg-accent/10 overflow-hidden">
                <img src={`/client-.jpg?key=1j3rz&height=64&width=64&query=client-${i}`} alt="Client" />
              </div>
              <div>
                <p className="text-lg font-serif font-bold">"The best in the business."</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Marcus Thorne</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 container mx-auto px-6 text-center relative">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 0.05, scale: 1 }}
          className="text-[15vw] font-serif font-bold tracking-tighter absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        >
          CONNECT
        </motion.h2>
        <div className="relative z-10 py-12">
          <p className="text-2xl md:text-4xl font-serif max-w-2xl mx-auto mb-12">
            Let's find your dream home together. Ready to start the journey?
          </p>
          <Link
            href="/contact"
            className="inline-block px-12 py-6 bg-accent text-white rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-xl shadow-accent/20"
          >
            Get In Touch
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  )
}
