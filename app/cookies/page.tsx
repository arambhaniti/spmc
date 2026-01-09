"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { COMPANY_NAME } from '@/config/constants'

export default function CookiePolicy() {
  return (
    <div className="min-h-screen selection:bg-accent selection:text-white">
      <Navbar />
      <div className="pt-40 pb-32 container mx-auto px-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">
            Legal Standards
          </span>
          <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tighter mb-16 leading-[0.9]">
            Cookie <br />
            <span className="italic text-accent">Policy.</span>
          </h1>
        </motion.div>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-16 text-muted-foreground leading-relaxed">
          <section className="bg-secondary/10 p-12 rounded-[2rem] border border-accent/5">
            <h2 className="text-xl font-bold text-foreground mb-6 uppercase tracking-widest text-xs flex items-center gap-4">
              <span className="w-8 h-[1px] bg-accent" /> Introduction
            </h2>
            <p className="text-xl italic">
              {COMPANY_NAME} Real Estate ("we," "our," or "us") is committed to transparency about how we use cookies 
              and similar technologies on our website. This Cookie Policy explains what cookies are, how we use them, 
              and your choices regarding their use.
            </p>
          </section>

          <section className="space-y-8 pl-12">
            <h2 className="text-xl font-bold text-foreground mb-6 uppercase tracking-widest text-xs">
              01. What Are Cookies
            </h2>
            <p>
              Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit 
              our website. They serve various purposes, such as remembering your preferences, analyzing website traffic, and 
              personalizing your experience. Cookies do not typically contain personally identifiable information.
            </p>
            <p>
              We use both session cookies (temporary) and persistent cookies (stored for longer periods) to enhance your 
              interaction with our digital portfolio and property discovery platform.
            </p>
          </section>

          <section className="space-y-8 pl-12 border-l border-accent/10">
            <h2 className="text-xl font-bold text-foreground mb-6 uppercase tracking-widest text-xs">
              02. How We Use Cookies
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-3">Essential Cookies</h3>
                <p>
                  These cookies are necessary for the website to function properly. They enable basic features like page navigation, 
                  access to secure areas, and inquiry form submissions. Without these cookies, our website cannot operate 
                  effectively.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-3">Performance & Analytics Cookies</h3>
                <p>
                  We use these cookies to understand how visitors interact with our website. This helps us improve our digital 
                  portfolio presentation, optimize property discovery, and enhance user experience. Information collected is aggregated 
                  and anonymous.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-3">Functional Cookies</h3>
                <p>
                  These cookies remember your preferences and choices, such as language settings, property viewing preferences, 
                  and saved searches. They enhance your experience on subsequent visits to our platform.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-8 pl-12">
            <h2 className="text-xl font-bold text-foreground mb-6 uppercase tracking-widest text-xs">
              03. Third-Party Cookies
            </h2>
            <p>
              We may use trusted third-party services that place their own cookies on your device. These include:
            </p>
            <ul className="list-disc list-inside space-y-3 ml-6">
              <li>
                <strong>Analytics Services:</strong> To understand website usage and improve our digital portfolio
              </li>
              <li>
                <strong>Property Visualization:</strong> To enhance image galleries and virtual tours
              </li>
              <li>
                <strong>Social Media Integration:</strong> For sharing properties on social platforms
              </li>
            </ul>
      
        </section>

        <section className="space-y-8 pl-12 border-l border-accent/10">
            <h2 className="text-xl font-bold text-foreground mb-6 uppercase tracking-widest text-xs">
              04. Managing Your Cookie Preferences
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-3">Browser Settings</h3>
                <p>
                  You can control cookies through your web browser settings. Most browsers allow you to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>View and delete existing cookies</li>
                  <li>Block new cookies from being placed</li>
                  <li>Set notifications when cookies are being set</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-3">Opt-Out Options</h3>
                <p>
                  While we strive to provide the best experience, you may choose to decline certain types of cookies. 
                  Note that declining some cookies may affect functionality of our property discovery and inquiry features.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-8 pl-12">
            <h2 className="text-xl font-bold text-foreground mb-6 uppercase tracking-widest text-xs">
              05. Data Security & Retention
            </h2>
            <p>
              We implement appropriate security measures to protect cookie data. Cookies are retained only as long as necessary 
              for their intended purpose and are automatically deleted when no longer needed.
            </p>
            <p>
              Our cookie practices comply with international data protection regulations, including GDPR and CCPA, ensuring 
              your privacy rights are respected regardless of your location.
            </p>
          </section>

          <section className="space-y-8 pl-12 border-l border-accent/10">
            <h2 className="text-xl font-bold text-foreground mb-6 uppercase tracking-widest text-xs">
              06. Updates to This Policy
            </h2>
            <p>
              As our digital platform evolves, we may update this Cookie Policy to reflect changes in our practices or 
              legal requirements. We will notify users of significant changes through our website or direct communication.
            </p>
            <p>
              We encourage you to review this policy periodically to stay informed about how we use cookies to enhance 
              your real estate discovery experience.
            </p>
          </section>

          <div className="pt-20 border-t text-[10px] font-bold uppercase tracking-[0.3em]">
            Last Updated: January 09, 2026
          </div>
        </div>
         </div>
      <Footer />
    </div>
  )
}
