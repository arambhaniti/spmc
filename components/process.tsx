"use client"

import { motion } from "framer-motion"

const STEPS = [
  {
    number: "01",
    title: "Discovery & Vision",
    description:
      "We begin by understanding your unique lifestyle, architectural preferences, and long-term goals. This deep dive ensures every property we explore aligns with your personal narrative.",
  },
  {
    number: "02",
    title: "Curated Scouting",
    description:
      "Leveraging our exclusive network, we identify off-market gems and architectural masterpieces that rarely reach the public eye. Quality over quantity defines our selection process.",
  },
  {
    number: "03",
    title: "Strategic Advisory",
    description:
      "Beyond simple viewing, we provide structural analysis, market forecasting, and negotiation strategy. We act as your primary advocate to ensure value and security.",
  },
  {
    number: "04",
    title: "Seamless Transition",
    description:
      "Our concierge-level service manages every detail from legal coordination to interior consultation, ensuring your move into a new space is as effortless as the architecture itself.",
  },
]

export function Process() {
  return (
    <section className="py-32 bg-secondary/10">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-24">
          <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">
            The Methodology
          </span>
          <h2 className="text-5xl md:text-7xl font-serif font-bold tracking-tighter leading-[0.9]">
            A Proven Path to <br />
            <span className="italic">Architectural Harmony.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="relative"
            >
              <div className="text-8xl font-serif font-bold opacity-5 mb-4 select-none">{step.number}</div>
              <h3 className="text-2xl font-serif font-bold mb-6 tracking-tight">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
