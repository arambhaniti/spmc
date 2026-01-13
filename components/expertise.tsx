"use client"

import { motion } from "framer-motion"
import { Building2, Landmark, Map, Palmtree } from "lucide-react"
import Link from 'next/link'
import { URLS } from '@/config/urls'

const SPECIALTIES = [
  {
    icon: Building2,
    title: "Modern Lofts",
    description:
      "Specializing in the transformation of industrial spaces into contemporary urban sanctuaries across SoHo and Tribeca.",
  },
  {
    icon: Landmark,
    title: "Historic Estates",
    description:
      "Deep expertise in the preservation and valuation of pre-war architectural landmarks and storied townhouses.",
  },
  {
    icon: Palmtree,
    title: "Coastal Retreats",
    description:
      "Exclusive access to waterfront properties that harmonize high-end architecture with the raw beauty of the coast.",
  },
  {
    icon: Map,
    title: "Strategic Scouting",
    description:
      "Identifying high-growth neighborhoods before they hit the mainstream, ensuring maximum ROI for your portfolio.",
  },
]

export function Expertise() {
  return (
    <section className="py-32 border-t">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-20">
          <div className="lg:col-span-5">
            <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">
              Our Specialties
            </span>
            <h2 className="text-5xl md:text-6xl font-serif font-bold tracking-tighter mb-8 italic">
              Focused Expertise.
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              With over 15 years in the luxury market, we have developed deep specializations that allow us to provide
              unmatched insight into specific architectural niches and neighborhoods.
            </p>
            <Link 
              href={URLS.SERVICES}
              className="px-10 py-5 bg-primary text-primary-foreground rounded-full font-bold uppercase tracking-widest text-[10px] hover:scale-105 transition-transform shadow-xl inline-block"
            >
              Explore Services
            </Link>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-8">
            {SPECIALTIES.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 bg-card rounded-[2rem] border border-accent/5 hover:border-accent/20 transition-all hover:shadow-2xl group"
              >
                <item.icon className="w-10 h-10 text-accent mb-8 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-serif font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
