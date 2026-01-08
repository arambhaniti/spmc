"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { motion } from "framer-motion"
import Image from 'next/image'
import { ArrowRight, ChevronLeft, ChevronRight, Building } from "lucide-react"
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

const PROPERTIES: Property[] = [
  // FOR SALE PROPERTIES
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
    title: "Emirates Hills Mansion",
    location: "Emirates Hills, Dubai",
    price: "AED 15,500,000",
    details: "6 Beds, 7 Bath, 8,200 Sq.Ft.",
    image: "/modern-mansion-exterior.jpg?key=r7",
    id: "emirates-hills-mansion",
    tag: "Premium",
    type: "sale",
    url: PROPERTY_URLS.DUBAI_MARINA_PENTHOUSE
  },
  {
    title: "Palm Jumeirah Villa",
    location: "Palm Jumeirah, Dubai",
    price: "AED 12,000,000",
    details: "5 Beds, 5 Bath, 5,500 Sq.Ft.",
    image: "/coastal-modern-home.jpg?key=r8",
    id: "palm-jumeirah-villa",
    tag: "Waterfront",
    type: "sale",
    url: PROPERTY_URLS.PALM_JUMEIRAH_APARTMENT
  },
  {
    title: "Dubai Creek Harbour Apartment",
    location: "Dubai Creek Harbour, Dubai",
    price: "AED 2,800,000",
    details: "2 Beds, 2 Bath, 1,450 Sq.Ft.",
    image: "/modern-glass-house.jpg?key=r9",
    id: "dubai-creek-harbour",
    tag: "Modern",
    type: "sale",
    url: PROPERTY_URLS.BUSINESS_BAY_STUDIO
  },
  {
    title: "Jumeirah Golf Estates Villa",
    location: "Jumeirah Golf Estates, Dubai",
    price: "AED 6,900,000",
    details: "4 Beds, 4 Bath, 3,800 Sq.Ft.",
    image: "/modern-echo-park-home.jpg?key=r10",
    id: "jumeirah-golf-estates",
    tag: "Golf View",
    type: "sale",
    url: PROPERTY_URLS.JBR_APARTMENT
  },
  {
    title: "Bluewaters Island Apartment",
    location: "Bluewaters Island, Dubai",
    price: "AED 3,200,000",
    details: "3 Beds, 3 Bath, 2,100 Sq.Ft.",
    image: "/luxury-apartment-living-room.png?key=r11",
    id: "bluewaters-island",
    tag: "Island Living",
    type: "sale",
    url: PROPERTY_URLS.DUBAI_MARINA_PENTHOUSE
  },
  {
    title: "Arabian Ranches Villa",
    location: "Arabian Ranches, Dubai",
    price: "AED 4,100,000",
    details: "4 Beds, 3 Bath, 3,500 Sq.Ft.",
    image: "/modern-mansion-exterior.jpg?key=r12",
    id: "arabian-ranches",
    tag: "Community",
    type: "sale",
    url: PROPERTY_URLS.DOWNTOWN_DUBAI_VILLA
  },
  {
    title: "Dubai South Townhouse",
    location: "Dubai South, Dubai",
    price: "AED 1,850,000",
    details: "3 Beds, 3 Bath, 2,200 Sq.Ft.",
    image: "/coastal-modern-home.jpg?key=r13",
    id: "dubai-south-townhouse",
    tag: "Affordable",
    type: "sale",
    url: PROPERTY_URLS.PALM_JUMEIRAH_APARTMENT
  },
  // FOR LEASE PROPERTIES
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
  {
    title: "Dubai Marina Studio",
    location: "Dubai Marina, Dubai",
    price: "AED 85,000/year",
    details: "Studio, 1 Bath, 720 Sq.Ft.",
    image: "/luxury-apartment-living-room.png?key=r14",
    id: "dubai-marina-studio",
    tag: "Marina View",
    type: "lease",
    url: PROPERTY_URLS.DUBAI_MARINA_PENTHOUSE
  },
  {
    title: "Downtown Dubai 1BR",
    location: "Downtown Dubai, Dubai",
    price: "AED 150,000/year",
    details: "1 Bed, 1 Bath, 950 Sq.Ft.",
    image: "/modern-mansion-exterior.jpg?key=r15",
    id: "downtown-dubai-1br",
    tag: "City View",
    type: "lease",
    url: PROPERTY_URLS.DOWNTOWN_DUBAI_VILLA
  },
  {
    title: "Dubai Hills 2BR",
    location: "Dubai Hills Estate, Dubai",
    price: "AED 200,000/year",
    details: "2 Beds, 2 Bath, 1,800 Sq.Ft.",
    image: "/soho-loft-duplex.jpg?key=r16",
    id: "dubai-hills-2br",
    tag: "Family Living",
    type: "lease",
    url: PROPERTY_URLS.DUBAI_HILLS_VILLA
  },
  {
    title: "Business Bay 2BR",
    location: "Business Bay, Dubai",
    price: "AED 140,000/year",
    details: "2 Beds, 2 Bath, 1,400 Sq.Ft.",
    image: "/modern-glass-house.jpg?key=r17",
    id: "business-bay-2br",
    tag: "Canal View",
    type: "lease",
    url: PROPERTY_URLS.BUSINESS_BAY_STUDIO
  },
  {
    title: "Jumeirah Lake Towers 1BR",
    location: "JLT, Dubai",
    price: "AED 95,000/year",
    details: "1 Bed, 1 Bath, 880 Sq.Ft.",
    image: "/modern-echo-park-home.jpg?key=r18",
    id: "jlt-1br",
    tag: "Lake View",
    type: "lease",
    url: PROPERTY_URLS.JBR_APARTMENT
  },
  {
    title: "Dubai Marina 2BR",
    location: "Dubai Marina, Dubai",
    price: "AED 175,000/year",
    details: "2 Beds, 2 Bath, 1,650 Sq.Ft.",
    image: "/coastal-modern-home.jpg?key=r19",
    id: "dubai-marina-2br",
    tag: "Premium",
    type: "lease",
    url: PROPERTY_URLS.DUBAI_MARINA_PENTHOUSE
  },
  {
    title: "Al Barsha 3BR",
    location: "Al Barsha, Dubai",
    price: "AED 160,000/year",
    details: "3 Beds, 2 Bath, 1,900 Sq.Ft.",
    image: "/modern-mansion-exterior.jpg?key=r20",
    id: "al-barsha-3br",
    tag: "Spacious",
    type: "lease",
    url: PROPERTY_URLS.DOWNTOWN_DUBAI_VILLA
  },
]

function PropertiesComponent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [filter, setFilter] = useState<'all' | 'sale' | 'lease'>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const propertiesPerPage = 6
  
  useEffect(() => {
    const saleParam = searchParams.get('sale')
    const leaseParam = searchParams.get('lease')
    
    if (saleParam === 'true') {
      setFilter('sale')
    } else if (leaseParam === 'true') {
      setFilter('lease')
    } else {
      setFilter('all')
    }
    setCurrentPage(1) // Reset to page 1 when filter changes
  }, [searchParams])
  
  const handleFilterChange = (newFilter: 'all' | 'sale' | 'lease') => {
    setFilter(newFilter)
    setCurrentPage(1) // Reset to page 1 when filter changes
    
    // Update URL based on filter
    if (newFilter === 'sale') {
      router.push(`${pathname}?sale=true`)
    } else if (newFilter === 'lease') {
      router.push(`${pathname}?lease=true`)
    } else {
      router.push(pathname)
    }
  }
  
  const filteredProperties: Property[] = PROPERTIES.filter(property => 
    filter === 'all' ? true : property.type === filter
  )
  
  // Pagination calculations
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage)
  const indexOfLastProperty = currentPage * propertiesPerPage
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty)
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  return (
    <section id="properties" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-accent font-bold uppercase tracking-widest text-xs mb-4 block">What I Offer</span>
            <h2 className="text-5xl md:text-6xl font-serif font-bold tracking-tighter">Properties</h2>
          </div>
          <p className="text-muted-foreground max-w-sm">
            Carefully curated listings that represent the pinnacle of modern living and architectural design.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-full border border-border p-1">
            <button
              onClick={() => handleFilterChange('all')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === 'all' 
                  ? 'bg-primary text-white' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              All Properties
            </button>
            <button
              onClick={() => handleFilterChange('sale')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === 'sale' 
                  ? 'bg-primary text-white' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              For Sale
            </button>
            <button
              onClick={() => handleFilterChange('lease')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === 'lease' 
                  ? 'bg-primary text-white' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              For Lease
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProperties.map((prop, idx) => (
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
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-full transition-all ${
                  currentPage === 1
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : 'bg-white border border-border hover:bg-accent hover:text-white'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`w-10 h-10 rounded-full text-sm font-medium transition-all ${
                      currentPage === pageNumber
                        ? 'bg-accent text-white'
                        : 'bg-white border border-border hover:bg-accent hover:text-white'
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-full transition-all ${
                  currentPage === totalPages
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : 'bg-white border border-border hover:bg-accent hover:text-white'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <div className="mt-16 flex justify-center">
          <button className="group flex items-center gap-3 px-8 py-4 bg-white border border-border rounded-full font-medium hover:bg-primary hover:text-white transition-all">
            See All Properties
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}

export function Properties() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PropertiesComponent />
    </Suspense>
  )
}
