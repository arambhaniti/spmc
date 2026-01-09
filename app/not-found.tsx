"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"
import { COMPANY_NAME } from "@/config/constants"
import { URLS } from "@/config/urls"

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center px-6 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          className="absolute top-20 left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: -mousePosition.x * 0.02,
            y: -mousePosition.y * 0.02,
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* 404 Number */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="text-[12rem] md:text-[16rem] font-serif font-bold leading-none text-transparent bg-clip-text bg-gradient-to-br from-accent/20 to-primary/20 select-none">
              404
            </h1>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              The page you're looking for seems to have been moved, removed, or never existed. 
              Let us help you find your way back to our exclusive collection of properties.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <Link 
              href="/"
              className="px-8 py-4 bg-accent text-white rounded-full font-medium hover:scale-105 transition-transform shadow-lg inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Home
            </Link>
            
            <Link
              href={URLS.PROPERTIES}
              className="px-8 py-4 border-2 border-accent text-accent rounded-full font-medium hover:bg-accent hover:text-white transition-all inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Browse Properties
            </Link>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
            className="mt-16 pt-8 border-t border-border"
          >
            <p className="text-sm text-muted-foreground mb-4">Or explore:</p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link href="/about" className="text-sm text-foreground hover:text-accent transition-colors">
                About {COMPANY_NAME}
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link href="/contact" className="text-sm text-foreground hover:text-accent transition-colors">
                Contact Us
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link href="/insights" className="text-sm text-foreground hover:text-accent transition-colors">
                Market Insights
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating decorative elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 right-10 text-6xl opacity-10"
        >
          🏠
        </motion.div>
        
        <motion.div
          animate={{
            y: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-10 left-10 text-6xl opacity-10"
        >
          🏢
        </motion.div>
      </div>
    </div>
  )
}
