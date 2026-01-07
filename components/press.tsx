"use client"

import { motion } from "framer-motion"
import Image from 'next/image'
import { COMPANY_NAME } from '@/config/constants'

const PRESS = [
  {
    outlet: "Architectural Digest",
    title: "The New Wave of Manhattan Luxury",
    date: "Dec 2025",
    logo: "/ad-logo.png?height=40&width=120&query=architectural-digest-logo",
  },
  {
    outlet: "The Wall Street Journal",
    title: `${COMPANY_NAME} Sets SoHo Record`,
    date: "Oct 2025",
    logo: "/wsj-logo.png?height=40&width=120&query=wsj-logo",
  },
  {
    outlet: "Vogue Living",
    title: "Curating the Perfect Minimalist Habitat",
    date: "Aug 2025",
    logo: "/vogue-logo.png?height=40&width=120&query=vogue-logo",
  },
  {
    outlet: "Forbes",
    title: "Top 30 Real Estate Advisors of 2026",
    date: "Jan 2026",
    logo: "/forbes-logo.png?height=40&width=120&query=forbes-logo",
  },
]

export function Press() {
  return (
    <section className="py-24 bg-secondary/5 border-y">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {PRESS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="h-8 relative w-32 mb-4 grayscale group-hover:grayscale-0 transition-all opacity-40 group-hover:opacity-100">
                <Image
                  src={item.logo || "/placeholder.svg"}
                  alt={item.outlet}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{item.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
