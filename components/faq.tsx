"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { COMPANY_NAME } from '@/config/constants'

const FAQS = [
  {
    question: "How do you source off-market properties?",
    answer:
      "We maintain an extensive private network of developers, architects, and long-term owners. This allows us to facilitate transactions for properties that never officially enter the public listing databases.",
  },
  {
    question: "What is your typical negotiation strategy?",
    answer:
      "We utilize a data-driven approach combined with psychological insights. We don't just negotiate on price; we optimize terms, contingencies, and timelines to create a winning scenario for our clients.",
  },
  {
    question: "Do you offer international relocation services?",
    answer:
      "Yes, through our Global Partners network, we provide seamless relocation assistance between major metropolitan hubs including London, Paris, Dubai, and Hong Kong.",
  },
  {
    question: `What defines a '${COMPANY_NAME}' property?`,
    answer:
      "Every property we represent must meet our 'Architectural Integrity' standard—this means a clear design vision, quality craftsmanship, and a unique soul that transcends simple square footage.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">
            Clarifications
          </span>
          <h2 className="text-5xl md:text-6xl font-serif font-bold tracking-tighter">Frequently Asked</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="border-b">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full py-8 flex items-center justify-between text-left group"
              >
                <span className="text-xl md:text-2xl font-serif font-bold group-hover:text-accent transition-colors">
                  {faq.question}
                </span>
                <ChevronDown className={`w-6 h-6 transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
