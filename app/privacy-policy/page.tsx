"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { COMPANY_NAME } from '@/config/constants'

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen selection:bg-accent selection:text-white">
      <Navbar />
      <div className="pt-40 pb-32 container mx-auto px-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">
            Legal Standards
          </span>
          <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tighter mb-16 leading-[0.9]">
            Privacy <br />
            <span className="italic text-accent">Policy.</span>
          </h1>
        </motion.div>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-16 text-muted-foreground leading-relaxed">
          <section className="bg-secondary/10 p-12 rounded-[2rem] border border-accent/5">
            <h2 className="text-xl font-bold text-foreground mb-6 uppercase tracking-widest text-xs flex items-center gap-4">
              <span className="w-8 h-[1px] bg-accent" /> Introduction
            </h2>
            <p className="text-xl italic">
              {COMPANY_NAME} Real Estate ("we," "our," or "us") is committed to protecting your privacy. This Privacy
              Policy explains how we collect, use, and safeguard your personal information when you visit our website.
            </p>
          </section>

          <section className="space-y-8 pl-12">
            <h2 className="text-xl font-bold text-foreground mb-6 uppercase tracking-widest text-xs">
              01. Data Collection & Ethics
            </h2>
            <p>
              In the pursuit of providing personalized architectural advisory, we collect data that you provide directly
              to us through our Inquiry Studio. This includes, but is not limited to, your name, contact information,
              and specific architectural preferences.
            </p>
            <p>
              We also utilize advanced analytical tools to understand how our visitors interact with our digital
              portfolio, ensuring we can continuously refine the user experience to meet the standards of our clientele.
            </p>
          </section>

          <section className="space-y-8 pl-12 border-l border-accent/10">
            <h2 className="text-xl font-bold text-foreground mb-6 uppercase tracking-widest text-xs">
              02. Strategic Use of Information
            </h2>
            <p>
              Your information is utilized solely to facilitate the highest level of service. This includes coordinating
              private viewings, providing market insights tailored to your portfolio, and managing the legal
              complexities of your transactions.
            </p>
            <p>
              We maintain a zero-tolerance policy regarding the sale or unauthorized distribution of client data. Your
              privacy is treated with the same discretion as our most exclusive off-market listings.
            </p>
          </section>

          <section className="space-y-8 pl-12">
            <h2 className="text-xl font-bold text-foreground mb-6 uppercase tracking-widest text-xs">
              03. Global Security Standards
            </h2>
            <p>
              Our digital infrastructure utilizes industry-leading encryption and security protocols to safeguard your
              information against unauthorized access. We continuously monitor our systems to ensure the integrity of
              our client databases.
            </p>
          </section>

          <div className="pt-20 border-t text-[10px] font-bold uppercase tracking-[0.3em]">
            Last Updated: January 02, 2026
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
