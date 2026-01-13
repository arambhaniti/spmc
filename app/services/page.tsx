"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CheckCircle, TrendingUp, Globe2, Home, Users, Award, Shield, Briefcase } from "lucide-react"
import { useRef } from "react"
import Image from 'next/image'


export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])

  const services = [
    {
      icon: Home,
      title: "Buyer Representation",
      description:
        "I guide you through every step of purchasing your dream property, from initial search to closing. My deep market knowledge and negotiation expertise ensure you secure the best possible deal.",
      image:
        "https://cdn.jsdelivr.net/gh/arambhaniti/spmc-content@main/images/services/buyerRepresentation.jpg",
      features: [
        "Personalized property searches tailored to your lifestyle",
        "Expert negotiation to maximize your investment",
        "Comprehensive market analysis and property evaluations",
        "Coordination with inspectors, attorneys, and lenders",
      ],
    },
    {
      icon: TrendingUp,
      title: "Seller Services",
      description:
        "Maximize your property's value with strategic marketing, professional staging consultation, and data-driven pricing. I position your home to attract qualified buyers and achieve premium results.",
      image:
        "https://cdn.jsdelivr.net/gh/arambhaniti/spmc-content@main/images/services/sellerServices.jpg",
      features: [
        "Professional photography and videography",
        "Global marketing across premium platforms",
        "Strategic staging and presentation guidance",
        "Transparent communication throughout the process",
      ],
    },
    {
      icon: Globe2,
      title: "Investment Consulting",
      description:
        "Leverage my market insights to build a profitable real estate portfolio. I analyze trends, identify emerging opportunities, and provide strategic guidance for long-term wealth creation.",
      image:
        "https://cdn.jsdelivr.net/gh/arambhaniti/spmc-content@main/images/services/investimentConsulting.jpg",
      features: [
        "Portfolio diversification strategies",
        "Market trend analysis and forecasting",
        "ROI optimization and risk assessment",
        "Access to off-market investment opportunities",
      ],
    },
    {
      icon: Users,
      title: "Relocation Assistance",
      description:
        "Moving to a new city can be overwhelming. I provide comprehensive relocation support, helping you understand neighborhoods, schools, amenities, and local culture to make informed decisions.",
      image:
        "https://cdn.jsdelivr.net/gh/arambhaniti/spmc-content@main/images/services/relocation.jpg",
      features: [
        "Neighborhood tours and lifestyle consultations",
        "School district research and recommendations",
        "Connection to local service providers",
        "Smooth transition planning and coordination",
      ],
    },
    // {
    //   icon: Award,
    //   title: "Luxury Property Specialist",
    //   description:
    //     "With expertise in the luxury market, I understand the unique nuances of high-end transactions. Discretion, attention to detail, and white-glove service define every interaction.",
    //   features: [
    //     "Confidential and discreet transaction management",
    //     "Access to exclusive off-market listings",
    //     "Concierge-level service and support",
    //     "Network of luxury service providers",
    //   ],
    // },
    {
      icon: Shield,
      title: "Legal & Escrow Coordination",
      description:
        "Navigate complex legal frameworks with confidence. I work alongside your legal counsel to ensure compliance, protect your interests, and facilitate seamless escrow management.",
      image:
        "https://cdn.jsdelivr.net/gh/arambhaniti/spmc-content@main/images/services/legal.jpg",
      features: [
        "Title verification and due diligence oversight",
        "Contract review and negotiation support",
        "Escrow coordination and timeline management",
        "Risk mitigation and contingency planning",
      ],
    },
    {
      icon: Briefcase,
      title: "Portfolio Management",
      description:
        "For high-net-worth clients with multiple holdings, I offer comprehensive portfolio management services to optimize returns, manage tenant relations, and oversee property maintenance.",
      image:
        "https://cdn.jsdelivr.net/gh/arambhaniti/spmc-content@main/images/services/portfolioManagement.jpg",
      features: [
        "Multi-property asset tracking and reporting",
        "Tenant acquisition and lease negotiations",
        "Maintenance coordination and vendor management",
        "Strategic acquisition and divestment planning",
      ],
    },
  ]

  return (
    <div ref={containerRef} className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: backgroundY, scale }} className="absolute inset-0">
          <Image
            src="/luxury-real-estate-office-interior-marble-gold.jpg"
            alt="Services"
            fill
            className="object-cover brightness-50"
            priority
          />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-6 py-2 bg-accent/30 backdrop-blur-sm text-background text-[10px] font-bold uppercase tracking-[0.3em] rounded-full mb-6"
          >
            Comprehensive Real Estate Solutions
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-9xl font-serif font-bold text-background mb-6 tracking-tighter leading-[0.9] text-balance"
          >
            Services That
            <br />
            <span className="text-accent italic">Elevate.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-background/90 max-w-2xl mx-auto leading-relaxed text-justify"
          >
            From first-time buyers to seasoned investors, I provide tailored real estate services that transform your
            goals into reality.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">
              The Complete Suite
            </span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tighter leading-[0.9]">
              How I <span className="text-accent italic">Serve You</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-justify">
              Every client deserves a personalized approach. Here's how I ensure your real estate experience exceeds
              expectations at every turn.
            </p>
          </motion.div>

          <div className="space-y-32">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: (index % 2) * 0.1 }}
                className="grid md:grid-cols-2 gap-16 items-center"
              >
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-20 h-20 rounded-3xl bg-accent/20 flex items-center justify-center">
                      <service.icon className="w-10 h-10 text-accent" />
                    </div>
                    <h3 className="text-4xl font-serif font-bold tracking-tight">{service.title}</h3>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-10 text-justify">{service.description}</p>
                  <ul className="space-y-4">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`relative aspect-[4/3] ${index % 2 === 1 ? "md:order-1" : ""}`}>
                  <div className="absolute inset-0 bg-accent/10 rounded-[3rem] rotate-3 transform" />
                  <Image
                    src={
                      service.image ||
                      `/service-${index + 1}.jpg?height=600&width=800&query=luxury-real-estate-${service.title
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`
                    }
                    alt={service.title}
                    fill
                    className="object-cover rounded-[3rem] shadow-2xl"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Advisory Section */}
      <section className="py-32 bg-secondary/5 border-y">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-20">
          <div className="md:col-span-1">
            <h2 className="text-4xl font-serif font-bold tracking-tighter leading-tight mb-6">
              Specialized <br /> <span className="italic text-accent">Advisory.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed text-justify">
              Beyond traditional real estate, we offer consulting services that bridge the gap between architecture,
              finance, and lifestyle design.
            </p>
          </div>
          <div className="md:col-span-2 grid sm:grid-cols-2 gap-12">
            {[
              {
                title: "Design Consultation",
                desc: "Evaluating renovation potential and architectural modifications before purchase.",
              },
              {
                title: "Market Forecasting",
                desc: "Long-term neighborhood trajectory analysis based on urban development data.",
              },
              {
                title: "Art & Architecture",
                desc: "Curating properties that serve as the perfect backdrop for significant art collections.",
              },
              {
                title: "Zoning & Legal",
                desc: "Navigating complex historical preservation and residential zoning requirements.",
              },
            ].map((item, i) => (
              <div key={i} className="border-l-2 border-accent/20 pl-8">
                <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed text-justify">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-serif font-bold mb-6 tracking-tighter">My Process</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-justify">
              A proven methodology refined through years of successful transactions and satisfied clients.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", desc: "Understanding your unique needs, goals, and timeline" },
              { step: "02", title: "Strategy", desc: "Crafting a personalized plan aligned with market realities" },
              { step: "03", title: "Execution", desc: "Leveraging expertise and networks to achieve results" },
              { step: "04", title: "Support", desc: "Providing ongoing guidance beyond the transaction" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="text-center group"
              >
                <div className="text-7xl font-serif font-bold text-accent/20 mb-4 group-hover:text-accent/40 transition-colors">
                  {item.step}
                </div>
                <h4 className="text-2xl font-bold mb-3">{item.title}</h4>
                <p className="text-muted-foreground leading-relaxed text-justify">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tighter">Ready to Get Started?</h2>
            <p className="text-xl text-primary-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-justify">
              Let's discuss how I can help you achieve your real estate goals with personalized service and proven
              expertise.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="/contact"
                className="px-10 py-4 bg-accent text-accent-foreground rounded-full font-medium text-lg hover:scale-105 transition-transform"
              >
                Schedule Consultation
              </a>
              <a
                href="/properties"
                className="px-10 py-4 border-2 border-primary-foreground/30 rounded-full font-medium text-lg hover:bg-primary-foreground/10 transition-colors"
              >
                View Properties
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
