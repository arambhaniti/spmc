"use client"

import { motion } from "framer-motion"
import { COMPANY_NAME, HERO_VIDEO, HERO_IMAGE } from '@/config/constants'
import { URLS } from '@/config/urls'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.play().catch(error => {
        console.log('Autoplay was prevented:', error)
      })
    }
  }, [])
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover scale-110"
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {/* <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                  Trusted Real Estate Consultancy
                </span> */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-none mb-8 tracking-tighter text-white">
                  {COMPANY_NAME.split(' ').map((word, index) => (
                    <span key={index}>
                      {word}
                      {index < COMPANY_NAME.split(' ').length - 1 && <br />}
                    </span>
                  ))}
                </h1>
                <p className="text-white text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto md:mx-0 leading-relaxed mb-10 text-justify">
                  Expertly navigating the luxury real estate market to find your next architectural masterpiece.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 sm:gap-6">
                  <Link 
                    href={URLS.PROPERTIES}
                    className="px-8 py-4 bg-accent text-accent-foreground rounded-full font-medium hover:scale-105 transition-transform shadow-lg inline-block"
                  >
                    View Properties
                  </Link>
                  <Link
                    href={URLS.CONTACT}
                    className="text-white text-sm font-bold uppercase tracking-widest border-b-2 border-accent text-foreground pb-1 hover:text-accent transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </motion.div>

       
            </div>

            {/* Right Side - Hero Image */}
            <div className="hidden lg:block">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="relative"
              >
                <img
                  src={HERO_IMAGE}
                  alt="Luxury Property"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
                {/* Optional: Add a subtle overlay or frame effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Text */}
      <div className="absolute top-1/2 -right-20 -translate-y-1/2 rotate-90 text-[15vw] font-serif font-bold opacity-[0.03] select-none pointer-events-none text-foreground">
        ESTATE
      </div>
    </section>
  )
}
