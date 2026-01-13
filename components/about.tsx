"use client"

import { motion } from "framer-motion"
import Image from 'next/image'
import Link from 'next/link'
import { COMPANY_NAME } from '@/config/constants'
import { URLS } from '@/config/urls'

export function About() {
  return (
    <section id="about" className="py-4 md:py-32 overflow-hidden bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="aspect-[3/4] relative rounded-[2rem] overflow-hidden mt-20"
              >
                <Image src="/modern-office-interior.png" alt="Work" fill className="object-cover" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="aspect-[3/4] relative rounded-[2rem] overflow-hidden"
              >
                <Image src="/luxury-house-detail.jpg" alt="Detail" fill className="object-cover" />
              </motion.div>
            </div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-accent rounded-full flex flex-col items-center justify-center text-accent-foreground font-serif shadow-2xl border-8 border-card z-10"
            >
              <span className="text-4xl font-bold">S.K</span>
              <span className="text-[8px] uppercase tracking-[0.3em] font-bold mt-1">Est. 2011</span>
            </motion.div>
          </div>

          <div>
            <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">
              The Narrative
            </span>
            <h2 className="text-6xl md:text-8xl font-serif font-bold tracking-tighter mb-10 leading-[0.9]">
              Architectural <br />
              <span className="italic">Soul.</span>
            </h2>
            <div className="space-y-6 text-xl leading-relaxed text-muted-foreground mb-12">
              <p>
                Founded on the belief that real estate is the most intimate form of art, {COMPANY_NAME} has spent over a
                decade curating spaces that do more than just house people—they inspire them.
              </p>
              <p>
                My approach is rooted in architectural appreciation and market psychology. I don't see four walls and a
                roof; I see the light at 4 PM in a Tribeca loft, the structural integrity of a mid-century modern beam,
                and the potential for a legacy estate to hold generations of stories.
              </p>
              <p>
                Having navigated over $1.2B in transactions, I've learned that the most valuable asset is trust. My
                practice is built on discretion, strategic foresight, and a relentless pursuit of the perfect match
                between human and habitat.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-12 mb-12 border-t pt-10">
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-accent mb-4">The Studio</p>
                <p className="text-lg font-serif italic">Dubai • Abu Dhabi</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-accent mb-4">Direct Link</p>
                <p className="text-lg font-serif tracking-tighter">contact@spmc.com</p>
              </div>
            </div>

            <Link 
              href={URLS.ABOUT}
              className="group px-10 py-5 border-2 border-primary rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-4 inline-block"
            >
              Our Full Story <span className="group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
