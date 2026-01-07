"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from 'next/image'
import Link from "next/link"
import { PORTFOLIO_IMAGES } from '@/config/constants'

const PORTFOLIO_PROJECTS = [
  {
    title: "The Glass House",
    location: "Hamptons, NY",
    year: "2025",
    description:
      "A record-breaking sale of a modern architectural marvel on the waterfront, featuring seamless integration with the surrounding dunes.",
    extended:
      "Representing both the vision of the architect and the lifestyle of the buyer, this transaction redefined value in the East End luxury market.",
    image: PORTFOLIO_IMAGES.THEGLASS_HOUSE,
    category: "Residential",
  },
  {
    title: "Skyline Penthouse",
    location: "Tribeca, NY",
    year: "2024",
    description:
      "Represented the buyer in securing one of the most exclusive duplexes in Manhattan, overlooking the Hudson.",
    extended:
      "The acquisition required discreet negotiation and structural foresight to ensure the vertical living space met the collector's gallery requirements.",
    image: PORTFOLIO_IMAGES.SKYLINE_PENTHOUSE,
    category: "Penthouse",
  },
  {
    title: "Industrial Loft",
    location: "SoHo, NY",
    year: "2024",
    description:
      "Transformation of a historic printing house into a contemporary artist's sanctuary, preserving raw structural elements.",
    extended:
      "Working alongside premier interior designers, we facilitated a sale that honored the building's industrial heritage while embracing modern comfort.",
    image: PORTFOLIO_IMAGES.INDUSTRIAL_LOFT,
    category: "Restoration",
  },
  {
    title: "Mid-Century Manor",
    location: "Beverly Hills, CA",
    year: "2023",
    description:
      "A rare restoration project of a 1958 classic, successfully matched with a buyer committed to preservation.",
    extended:
      "This transaction involved complex historical zoning coordination and a deep appreciation for the original architectural intent.",
    image: PORTFOLIO_IMAGES.MIDCENTUARY_MANOR,
    category: "Historic",
  },
  {
    title: "The Concrete Cube",
    location: "Silver Lake, LA",
    year: "2023",
    description:
      "A triumph of minimalist concrete construction, this sale set a new benchmark for Silver Lake's architectural market.",
    extended:
      "The marketing strategy centered on the interplay of raw light and brutalist geometry, attracting international design enthusiasts.",
    image: PORTFOLIO_IMAGES.CONCRETE_CUBE,
    category: "Modernist",
  },
]

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-40 pb-20 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={PORTFOLIO_IMAGES.BACKGROUND}
            alt="Portfolio Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">
              Curated Success
            </span>
            <h1 className="text-7xl md:text-9xl font-serif font-bold tracking-tighter leading-[0.9] mb-12 text-white">
              The <br />
              <span className="italic text-accent">Portfolio.</span>
            </h1>
            <p className="text-2xl text-white/90 leading-relaxed max-w-2xl">
              A selection of our most significant transactions and architectural partnerships across the tri-state area
              and California.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects List */}
      <section className="pb-40">
        <div className="container mx-auto px-6 space-y-40 md:space-y-64">
          {PORTFOLIO_PROJECTS.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <div
                className={`grid md:grid-cols-12 gap-12 lg:gap-24 items-center ${index % 2 === 1 ? "md:direction-rtl" : ""}`}
              >
                <div
                  className={`md:col-span-7 relative aspect-16/10 overflow-hidden rounded-4xl ${index % 2 === 1 ? "md:order-2" : ""}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full"
                  >
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                  </motion.div>
                </div>
                <div className={`md:col-span-5 ${index % 2 === 1 ? "md:order-1 text-right" : ""}`}>
                  <div
                    className={`mb-6 flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground ${index % 2 === 1 ? "justify-end" : ""}`}
                  >
                    <span>{project.category}</span>
                    <span className="w-8 h-px bg-border" />
                    <span>{project.year}</span>
                  </div>
                  <h2 className="text-4xl md:text-7xl font-serif font-bold mb-8 tracking-tighter leading-[0.95]">
                    {project.title}
                  </h2>
                  <div
                    className={`space-y-6 mb-10 text-lg text-muted-foreground leading-relaxed ${index % 2 === 1 ? "ml-auto" : ""}`}
                  >
                    <p>{project.description}</p>
                    <p className="text-sm italic">{project.extended}</p>
                  </div>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] border-b-2 border-primary pb-2 hover:text-accent hover:border-accent transition-all"
                  >
                    Read the Case Study
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
