"use client"

import { motion } from "framer-motion"
import Image from 'next/image'
import { ArrowRight, Building } from "lucide-react"
import Link from "next/link"
import { PORTFOLIO_IMAGES, PROPERTY_URLS } from "@/config/constants"

interface Property {
  title: string
  location: string
  price: string
  details: string
  image: string
  id: string
  tag: string
  type: 'sale' | 'lease'
  url?: string
}

// Sample 6 properties for homepage (mix of sale and lease)
const HOMEPAGE_PROPERTIES: Property[] = [
  {
    title: "Dubai Marina Penthouse",
    location: "Dubai Marina, Dubai",
    price: "AED 4,500,000",
    details: "3 Beds, 3.5 Bath, 2,850 Sq.Ft.",
    image: "/luxury-apartment-living-room.png?key=r1",
    id: "dubai-marina-penthouse",
    tag: "Exclusive",
    type: "sale",
    url: PROPERTY_URLS.DUBAI_MARINA_PENTHOUSE
  },
  {
    title: "Downtown Dubai Villa",
    location: "Downtown Dubai, Dubai",
    price: "AED 8,200,000",
    details: "5 Beds, 6 Bath, 4,500 Sq.Ft.",
    image: "/modern-mansion-exterior.jpg?key=r2",
    id: "downtown-dubai-villa",
    tag: "Luxury",
    type: "sale",
    url: PROPERTY_URLS.DOWNTOWN_DUBAI_VILLA
  },
  {
    title: "Palm Jumeirah Apartment",
    location: "Palm Jumeirah, Dubai",
    price: "AED 180,000/year",
    details: "2 Beds, 2 Bath, 1,650 Sq.Ft.",
    image: "/coastal-modern-home.jpg?key=r3",
    id: "palm-jumeirah-apartment",
    tag: "Waterfront",
    type: "lease",
    url: PROPERTY_URLS.PALM_JUMEIRAH_APARTMENT
  },
  {
    title: "Business Bay Studio",
    location: "Business Bay, Dubai",
    price: "AED 75,000/year",
    details: "Studio, 1 Bath, 650 Sq.Ft.",
    image: "/modern-glass-house.jpg?key=r4&height=600&width=800&query=luxury-glass-modern-house",
    id: "business-bay-studio",
    tag: "Modern",
    type: "lease",
    url: PROPERTY_URLS.BUSINESS_BAY_STUDIO
  },
  {
    title: "Dubai Hills Villa",
    location: "Dubai Hills Estate, Dubai",
    price: "AED 3,800,000",
    details: "4 Beds, 4 Bath, 3,200 Sq.Ft.",
    image: "/soho-loft-duplex.jpg?key=r5&height=600&width=800&query=luxury-soho-loft-interior",
    id: "dubai-hills-villa",
    tag: "Family",
    type: "sale",
    url: PROPERTY_URLS.DUBAI_HILLS_VILLA
  },
  {
    title: "JBR Beach Apartment",
    location: "Jumeirah Beach Residence, Dubai",
    price: "AED 120,000/year",
    details: "1 Bed, 1 Bath, 850 Sq.Ft.",
    image: "/modern-echo-park-home.jpg?key=r6&height=600&width=800&query=modern-architectural-home-la",
    id: "jbr-apartment",
    tag: "Beachfront",
    type: "lease",
    url: PROPERTY_URLS.JBR_APARTMENT
  },
]

// Beautiful fallback image component
const PropertyImageFallback = ({ title }: { title: string }) => (
  <div className="absolute inset-0 bg-linear-to-br from-accent/20 via-primary/10 to-accent/20 flex items-center justify-center">
    <div className="text-center p-8">
      <Building className="w-16 h-16 mx-auto mb-4 text-accent/60" />
      <div className="w-24 h-1 bg-accent/30 mx-auto mb-4 rounded-full"></div>
      <p className="text-accent/80 font-medium text-sm uppercase tracking-wider">{title}</p>
      <p className="text-accent/60 text-xs mt-2">Image Coming Soon</p>
    </div>
  </div>
)

export function HomepageProperties() {
  return (
    <section id="properties" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col mb-4 gap-4">
          <div>
            <span className="text-accent font-bold uppercase tracking-widest text-xs mb-4 block">Featured Properties</span>
            <h2 className="text-5xl md:text-6xl font-serif font-bold tracking-tighter">Discover Dubai's Finest</h2>
          </div>
          <p className="text-muted-foreground ">
            Handpicked selection of premium properties representing the pinnacle of Dubai real estate.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {HOMEPAGE_PROPERTIES.map((prop, idx) => (
            <Link href={prop.url || `/properties/${prop.id}`} key={prop.id} target="_blank" rel="noopener noreferrer">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 3) * 0.1 }}
                className="group cursor-pointer bg-white p-4 rounded-3xl border border-transparent hover:border-accent/10 hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-6">
                  <Image
                    src={prop.image || "/placeholder.svg"}
                    alt={prop.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      const parent = target.parentElement
                      if (parent && !parent.querySelector('.fallback-content')) {
                        const fallbackDiv = document.createElement('div')
                        fallbackDiv.className = 'fallback-content absolute inset-0 bg-linear-to-br from-accent/20 via-primary/10 to-accent/20 flex items-center justify-center'
                        fallbackDiv.innerHTML = `
                          <div class="text-center p-8">
                            <svg class="w-16 h-16 mx-auto mb-4 text-accent/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                            </svg>
                            <div class="w-24 h-1 bg-accent/30 mx-auto mb-4 rounded-full"></div>
                            <p class="text-accent/80 font-medium text-sm uppercase tracking-wider">${prop.title}</p>
                            <p class="text-accent/60 text-xs mt-2">Image Coming Soon</p>
                          </div>
                        `
                        parent.appendChild(fallbackDiv)
                      }
                    }}
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">
                      {prop.tag}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full ${
                      prop.type === 'sale' 
                        ? 'bg-green-500/90 text-white' 
                        : 'bg-blue-500/90 text-white'
                    }`}>
                      {prop.type === 'sale' ? 'FOR SALE' : 'FOR LEASE'}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <span className="text-white font-bold text-sm flex items-center gap-2">
                      View Details <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-serif font-bold mb-1 group-hover:text-accent transition-colors">
                  {prop.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">{prop.location}</p>
                <div className="flex items-center justify-between border-t border-muted pt-4">
                  <span className="font-bold text-lg text-primary">{prop.price}</span>
                  <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
                    {prop.details.split(",")[0]}
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link href="/properties" className="group flex items-center gap-3 px-8 py-4 bg-white border border-border rounded-full font-medium hover:bg-primary hover:text-white transition-all">
            See All Properties
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
