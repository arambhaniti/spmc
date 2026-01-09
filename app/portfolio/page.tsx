"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from 'next/image'
import Link from "next/link"
import { PORTFOLIO_IMAGES } from '@/config/constants'

const PORTFOLIO_PROJECTS = [
  {
    title: "Burj Vista Penthouse",
    location: "Downtown Dubai",
    year: "2025",
    description:
      "Record-breaking acquisition of a triplex penthouse with panoramic views of the Dubai skyline and Burj Khalifa.",
    extended:
      "This transaction set new benchmarks for Downtown Dubai luxury market, featuring private elevator access and rooftop infinity pool.",
    image: PORTFOLIO_IMAGES.THEGLASS_HOUSE,
    category: "Penthouse",
  },
  {
    title: "Palm Jumeirah Mansion",
    location: "Palm Jumeirah",
    year: "2024",
    description:
      "Exclusive beachfront estate spanning 15,000 sq ft with private beach access and panoramic Arabian Gulf views.",
    extended:
      "Represented both buyer and seller in this landmark transaction, coordinating with multiple stakeholders for seamless transfer of this architectural masterpiece.",
    image: PORTFOLIO_IMAGES.SKYLINE_PENTHOUSE,
    category: "Waterfront",
  },{
    title: "Emirates Hills Villa",
    location: "Emirates Hills",
    year: "2024",
    description:
      "Mediterranean-inspired villa on championship golf course, featuring state-of-the-art smart home integration.",
    extended:
      "Facilitated complex negotiation involving international trust structures and succession planning for this multi-generational family estate.",
    image: PORTFOLIO_IMAGES.INDUSTRIAL_LOFT,
    category: "Golf Estate",
  },
  {
    title: "Dubai Marina Sky Villa",
    location: "Dubai Marina",
    year: "2023",
    description:
      "Revolutionary sky villa concept spanning three floors with private pool terrace and marina views.",
    extended:
      "This innovative property redefined luxury living in Dubai Marina, attracting international investors seeking unique architectural propositions.",
    image: PORTFOLIO_IMAGES.MIDCENTUARY_MANOR,
    category: "Sky Villa",
  },
  {
    title: "DIFC Loft Residence",
    location: "DIFC",
    year: "2023",
    description:
      "Industrial-chic residence in Dubai's financial district, blending raw architectural elements with luxury finishes.",
    extended:
      "Successfully marketed to high-net-worth professionals seeking proximity to financial hub while maintaining artistic living environment.",
    image: PORTFOLIO_IMAGES.CONCRETE_CUBE,
    category: "Urban Loft",
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
            <p className="text-2xl text-white/90 leading-relaxed max-w-2xl text-justify">
              A selection of our most significant transactions and architectural partnerships across Dubai's 
              premier luxury developments.
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
                    className={`space-y-6 mb-10 text-lg text-muted-foreground leading-relaxed text-justify ${index % 2 === 1 ? "ml-auto" : ""}`}
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
