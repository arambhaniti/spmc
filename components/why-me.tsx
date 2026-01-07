"use client"

import { motion } from "framer-motion"
import { Zap, Users, Shield, Clock } from "lucide-react"

const REASONS = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Quick Problem Solving",
    description: "Expert negotiation and rapid turnaround on all transactions.",
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "15 Years Experience",
    description: "A decade and a half of navigating complex real estate markets.",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Secure Process",
    description: "Vetted listings and transparent handling of all legalities.",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "70+ Satisfied Clients",
    description: "Building long-term relationships through exceptional service.",
  },
]

export function WhyMe() {
  return (
    <section id="why-me" className="py-24 bg-primary text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-accent font-bold uppercase tracking-widest text-xs mb-4 block">Advantages</span>
          <h2 className="text-5xl md:text-7xl font-serif font-bold tracking-tighter">Why Work With Me</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {REASONS.map((reason, idx) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 border border-white/10 rounded-3xl hover:bg-white/5 transition-colors group"
            >
              <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                {reason.icon}
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">{reason.title}</h3>
              <p className="text-primary-foreground/60 text-sm leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
