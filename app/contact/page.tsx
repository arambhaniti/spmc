"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, ArrowRight, Clock, Globe, Calendar, MessageSquare } from "lucide-react"
import Image from 'next/image'
import { CONTACT } from '@/config/constants'

const OFFICES = [
  {
    city: "New York City",
    address: "200 Fifth Avenue, Suite 400",
    state: "NY 10010",
    phone: "212.555.0123",
    image: "/nyc-office.jpg?key=c1&height=400&width=600&query=luxury-office-manhattan",
  },
  {
    city: "Dubai",
    address: "Downtown Dubai, Dubai Marina",
    state: "United Arab Emirates",
    phone: "310.555.0199",
    image: "/la-office.jpg?key=c2&height=400&width=600&query=luxury-office-beverly-hills",
  },
  {
    city: "Miami",
    address: "1000 Brickell Ave",
    state: "Miami, FL 33131",
    phone: "305.555.0244",
    image: "/miami-office.jpg?key=c3&height=400&width=600&query=luxury-office-miami",
  },
]

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background selection:bg-accent selection:text-white">
      <Navbar />

      <section className="pt-40 pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">
              The Connection
            </span>
            <h1 className="text-6xl md:text-9xl font-serif font-bold tracking-tighter mb-8 leading-[0.9]">
              Let's <br />
              <span className="italic text-accent">Connect.</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Whether you're looking for your next architectural masterpiece or seeking strategic advisory for your
              portfolio, our studio is ready to guide you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Contact Information & Global Reach */}
            <div className="space-y-20">
              <div className="grid sm:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="p-10 bg-white rounded-[2rem] border border-accent/5 shadow-xl hover:shadow-2xl transition-all group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mb-4">Email</h3>
                  <p className="text-lg font-serif italic mb-1">General Inquiries</p>
                  <p className="font-bold">{CONTACT.EMAIL_GENERAL}</p>
                  <p className="text-lg font-serif italic mt-4 mb-1">Direct Advisor</p>
                  <p className="font-bold">{CONTACT.EMAIL_DIRECT}</p>
                  <p className="text-lg font-serif italic mt-4 mb-1">Human Resources</p>
                  <p className="font-bold">{CONTACT.EMAIL_HR}</p>
                  <p className="text-lg font-serif italic mt-4 mb-1">Accounts</p>
                  <p className="font-bold">{CONTACT.EMAIL_ACCOUNTS}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="p-10 bg-white rounded-[2rem] border border-accent/5 shadow-xl hover:shadow-2xl transition-all group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6" />
                  </div>
                  <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mb-4">Phone</h3>
                  <p className="text-lg font-serif italic mb-1">Main Office</p>
                  <p className="font-bold">{CONTACT.PHONE}</p>
                </motion.div>
              </div>

              {/* Global Reach Section */}
              <div className="bg-primary text-primary-foreground p-12 rounded-[3rem] relative overflow-hidden">
                <div className="relative z-10">
                  <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">
                    Global Network
                  </span>
                  <h3 className="text-4xl font-serif font-bold mb-6 tracking-tighter italic">Beyond Borders.</h3>
                  <p className="text-primary-foreground/70 leading-relaxed mb-10 max-w-sm">
                    Through our private partners, we facilitate seamless transactions in London, Paris, Dubai, and Hong
                    Kong. Our reach ensures your portfolio has no architectural limits.
                  </p>
                  <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                    <div className="flex items-center gap-4">
                      <Globe className="w-5 h-5 text-accent" />
                      <span className="text-xs font-bold uppercase tracking-widest">Global Partners</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Calendar className="w-5 h-5 text-accent" />
                      <span className="text-xs font-bold uppercase tracking-widest">24/7 Concierge</span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-1/2 -right-20 -translate-y-1/2 rotate-90 text-[10vw] font-serif font-bold opacity-5 pointer-events-none select-none whitespace-nowrap">
                  GLOBAL REACH
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Office Locations Grid */}
      {/* <section className="py-32 bg-secondary/10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mb-24">
            <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Our Studios</span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold tracking-tighter leading-[0.9]">
              Strategic <br />
              <span className="italic">Presence.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {OFFICES.map((office, i) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-8">
                  <Image
                    src={office.image || "/placeholder.svg"}
                    alt={office.city}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-10">
                    <p className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-3">
                      View on Map <ArrowRight className="w-4 h-4" />
                    </p>
                  </div>
                </div>
                <h3 className="text-3xl font-serif font-bold mb-4 group-hover:text-accent transition-colors">
                  {office.city}
                </h3>
                <div className="space-y-1 text-muted-foreground text-sm leading-relaxed">
                  <p>{office.address}</p>
                  <p>{office.state}</p>
                  <p className="pt-2 font-bold text-foreground">{office.phone}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Communication Policy Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">
              Our Standards
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tighter mb-8 italic">
              Commitment to Discretion.
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
              <p>
                Every communication within our studio is handled with absolute discretion. We understand the sensitive
                nature of high-end real estate and prioritize your privacy above all else.
              </p>
              <p>
                You can expect a response from our lead advisor or a senior coordinator within 12 business hours of your
                initial inquiry.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Clock, title: "12hr Response", desc: "Rapid advisory for urgent matters." },
              { icon: MessageSquare, title: "Direct Line", desc: "No call centers, only senior advisors." },
              { icon: MapPin, title: "Private Viewings", desc: "Discreet property scouting tours." },
              { icon: Calendar, title: "Global Access", desc: "Meetings across all time zones." },
            ].map((item, i) => (
              <div key={i} className="p-8 bg-muted/30 rounded-3xl border border-accent/5">
                <item.icon className="w-6 h-6 text-accent mb-4" />
                <h4 className="text-sm font-bold uppercase tracking-widest mb-2">{item.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
