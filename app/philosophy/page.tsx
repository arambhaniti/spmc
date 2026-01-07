"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Heart, Eye, Target, Sparkles, Award, UsersIcon } from "lucide-react"
import Image from 'next/image'
import { COMPANY_NAME } from '@/config/constants'


export default function PhilosophyPage() {
  const values = [
    {
      icon: Heart,
      title: "Client-First Mindset",
      description:
        "Every decision I make centers around your best interests. Your goals become my mission, and your satisfaction is my measure of success.",
    },
    {
      icon: Eye,
      title: "Transparent Communication",
      description:
        "No surprises, no hidden agendas. I believe in clear, honest dialogue at every stage, empowering you to make informed decisions with confidence.",
    },
    {
      icon: Target,
      title: "Results-Driven Approach",
      description:
        "I combine market expertise with strategic thinking to deliver measurable outcomes. Whether buying or selling, I'm focused on achieving your objectives.",
    },
    {
      icon: Sparkles,
      title: "Excellence in Execution",
      description:
        "Attention to detail, proactive problem-solving, and a commitment to going above and beyond define how I operate in every transaction.",
    },
    {
      icon: Award,
      title: "Architectural Integrity",
      description:
        "I refuse to represent properties that compromise on design. Every listing must honor its structural narrative and embody timeless quality.",
    },
    {
      icon: UsersIcon,
      title: "Long-Term Relationships",
      description:
        "Real estate is not a one-time transaction—it's the foundation of a lasting partnership. I'm here for your next move, and the one after that.",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block px-6 py-2 bg-accent/20 text-accent text-[10px] font-bold uppercase tracking-[0.3em] rounded-full mb-6">
              My Philosophy
            </span>
            <h1 className="text-6xl md:text-8xl font-serif font-bold mb-8 tracking-tighter leading-[0.9]">
              More Than
              <br />
              <span className="text-accent italic">Transactions.</span>
            </h1>
            <div className="space-y-6 text-xl text-muted-foreground leading-relaxed mb-10">
              <p>
                Real estate isn't just about properties; it's about people, dreams, and life-changing moments. My
                philosophy centers on building lasting relationships grounded in trust, integrity, and shared success.
              </p>
              <p>
                I believe every client deserves a personalized experience that honors their unique story and
                aspirations. Whether you're buying your first home or expanding your investment portfolio, I'm here to
                guide you with expertise and genuine care.
              </p>
              <p>
                The built environment shapes our daily lives in profound ways. My commitment is to help you find not
                just a space, but a place that truly resonates with who you are and who you aspire to become.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl"
          >
            <Image
              src="/professional-real-estate-agent-portrait-modern-off.jpg"
              alt={COMPANY_NAME}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
          <span>Scroll to explore</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            ↓
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-32 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">
              The Foundation
            </span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tighter leading-[0.9]">
              Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The principles that guide every interaction, negotiation, and decision I make on your behalf.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                className="p-10 bg-background rounded-[2rem] shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square rounded-[3rem] overflow-hidden"
            >
              <Image
                src="/new-york-cityscape-luxury-architecture.jpg"
                alt="New York City"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">
                The Journey
              </span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 tracking-tighter leading-[0.95]">
                Why I Do <span className="text-accent italic">What I Do</span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  My journey in real estate began with a simple realization: finding the right space can transform
                  lives. Whether it's a first-time buyer discovering their forever home or an investor unlocking new
                  opportunities, I'm privileged to be part of those pivotal moments.
                </p>
                <p>
                  Over the years, I've developed a deep appreciation for architecture, design, and the unique character
                  of each neighborhood. This passion drives me to match clients not just with properties, but with
                  lifestyles that align with their vision.
                </p>
                <p>
                  What sets me apart is my commitment to treating every transaction as if it were my own. I'm not just
                  your agent—I'm your advocate, advisor, and partner in achieving your real estate dreams.
                </p>
                <p>
                  I've spent countless hours studying the interplay between light and structure, the psychology of
                  space, and the economic forces that shape our cities. This holistic understanding allows me to serve
                  you at the highest level.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <blockquote className="text-4xl md:text-6xl font-serif italic leading-tight mb-8">
              "Success in real estate isn't measured by transactions closed, but by relationships built and dreams
              realized."
            </blockquote>
            <p className="text-xl font-medium">— {COMPANY_NAME}</p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tighter">Let's Connect</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              I'd love to hear about your real estate goals and explore how we can work together to achieve them.
            </p>
            <a
              href="/contact"
              className="inline-block px-10 py-4 bg-primary text-primary-foreground rounded-full font-medium text-lg hover:scale-105 transition-transform"
            >
              Get In Touch
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
