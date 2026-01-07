"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"
import { COMPANY_NAME, SHORT_NAME } from '@/config/constants'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPropertiesDropdownOpen, setIsPropertiesDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // <CHANGE> Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // <CHANGE> Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsPropertiesDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const navLinks = [
    { label: "Portfolio", href: "/portfolio" },
    { label: "Insights", href: "/insights" },
    { label: "Services", href: "/services" },
    { label: "Philosophy", href: "/philosophy" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ]

  const propertiesOptions = [
    { label: "All Properties", href: "/properties" },
    { label: "For Sale", href: "/properties?sale=true" },
    { label: "For Lease", href: "/properties?lease=true" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-black/80 backdrop-blur-md py-4 border-b border-white/10" : "bg-black/60 backdrop-blur-sm py-6"}`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link href="/" className="text-xl sm:text-2xl font-serif font-bold tracking-tighter text-white">
          {SHORT_NAME}<span className="text-accent ml-1">.</span>
        </Link>

        {/* <CHANGE> Improved responsive navigation with better mobile handling */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-12">
          {/* Properties Dropdown */}
          <div 
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setIsPropertiesDropdownOpen(true)}
            onMouseLeave={() => setIsPropertiesDropdownOpen(false)}
          >
            <button
              onClick={() => setIsPropertiesDropdownOpen(!isPropertiesDropdownOpen)}
              className={`group relative text-sm font-medium uppercase tracking-widest transition-colors flex items-center gap-1 ${
                pathname.startsWith("/properties") ? "text-accent" : "text-white hover:text-accent"
              }`}
            >
              Properties
              <ChevronDown className={`w-4 h-4 transition-transform ${isPropertiesDropdownOpen ? "rotate-180" : ""}`} />
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all ${
                  pathname.startsWith("/properties") ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
            
            <AnimatePresence>
              {isPropertiesDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 bg-black/95 backdrop-blur-md border border-white/10 rounded-lg shadow-xl overflow-hidden z-50"
                >
                  {propertiesOptions.map((option) => (
                    <Link
                      key={option.href}
                      href={option.href}
                      className={`block px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                        pathname === option.href || (option.href === "/properties" && pathname === "/properties")
                          ? "text-accent bg-white/5"
                          : "text-white hover:text-accent hover:bg-white/5"
                      }`}
                      onClick={() => setIsPropertiesDropdownOpen(false)}
                    >
                      {option.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`group relative text-sm font-medium uppercase tracking-widest transition-colors ${
                pathname === link.href ? "text-accent" : "text-white hover:text-accent"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all ${
                  pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </div>

        <button className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/80 backdrop-blur-md border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4 max-h-[70vh] overflow-y-auto">
              {/* Properties Dropdown for Mobile */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setIsPropertiesDropdownOpen(!isPropertiesDropdownOpen)}
                  className={`text-lg font-serif py-2 transition-colors text-left flex items-center justify-between ${
                    pathname.startsWith("/properties") ? "text-accent font-bold" : "text-white hover:text-accent"
                  }`}
                >
                  Properties
                  <ChevronDown className={`w-4 h-4 transition-transform ${isPropertiesDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                
                <AnimatePresence>
                  {isPropertiesDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-col gap-2 pl-4"
                    >
                      {propertiesOptions.map((option) => (
                        <Link
                          key={option.href}
                          href={option.href}
                          className={`text-base font-serif py-2 transition-colors ${
                            pathname === option.href || (option.href === "/properties" && pathname === "/properties")
                              ? "text-accent font-bold"
                              : "text-white hover:text-accent"
                          }`}
                          onClick={() => {
                            setIsPropertiesDropdownOpen(false)
                            setIsMenuOpen(false)
                          }}
                        >
                          {option.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-lg font-serif py-2 transition-colors ${
                    pathname === link.href ? "text-accent font-bold" : "text-white hover:text-accent"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
