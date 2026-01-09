"use client"

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, Maximize2, X, Play, Pause } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface CarouselProps {
  images: string[]
  title: string
}

export function PropertyCarousel({ images, title }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
    dragFree: false,
  })
  
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isAutoPlay, setIsAutoPlay] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [imageLoadStates, setImageLoadStates] = useState<Record<number, boolean>>({})

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay || !emblaApi) return
    
    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 3000)
    
    return () => clearInterval(interval)
  }, [isAutoPlay, emblaApi])

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback((index: number) => {
    emblaApi?.scrollTo(index)
  }, [emblaApi])

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay)
  }

  const handleImageLoad = (index: number) => {
    setImageLoadStates(prev => ({ ...prev, [index]: true }))
    if (Object.keys(imageLoadStates).length === 0) {
      setIsLoading(false)
    }
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
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
          <p class="text-accent/80 font-medium text-sm uppercase tracking-wider">${title}</p>
          <p class="text-accent/60 text-xs mt-2">Image Coming Soon</p>
        </div>
      `
      parent.appendChild(fallbackDiv)
    }
  }

  return (
    <>
      {/* Main Carousel */}
      <div className={`relative group ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}`}>
        {isFullscreen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 z-50 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all hover:scale-110"
          >
            <X className="w-5 h-5 text-gray-800" />
          </motion.button>
        )}
        
        <div className={`relative overflow-hidden ${isFullscreen ? 'h-screen' : 'rounded-3xl'} shadow-2xl`} ref={emblaRef}>
          <div className="flex">
            {images.map((src, index) => (
              <div key={index} className={`flex-[0_0_100%] relative ${isFullscreen ? 'h-screen' : 'aspect-4/3 md:aspect-video'}`}>
                {/* Loading skeleton */}
                {!imageLoadStates[index] && (
                  <div className="absolute inset-0 bg-linear-to-br from-accent/20 via-primary/10 to-accent/20 animate-pulse">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <div className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full animate-spin"></div>
                    </div>
                  </div>
                )}
                
                <Image
                  src={src || "/placeholder.svg"}
                  alt={`${title} - Image ${index + 1}`}
                  fill
                  className={`object-cover transition-all duration-700 ${imageLoadStates[index] ? 'opacity-100' : 'opacity-0'}`}
                  onError={handleImageError}
                  onLoad={() => handleImageLoad(index)}
                  sizes={isFullscreen ? "100vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"}
                />
                
                {/* Image overlay gradient */}
                {isFullscreen && (
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Navigation Buttons */}
        <AnimatePresence>
          {!isFullscreen && (
            <>
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={scrollPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl hover:bg-white/90 transition-all hover:shadow-2xl z-20 border border-white/20"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </motion.button>
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={scrollNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl hover:bg-white/90 transition-all hover:shadow-2xl z-20 border border-white/20"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </motion.button>
            </>
          )}
        </AnimatePresence>
        
        {/* Fullscreen navigation */}
        {isFullscreen && (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollPrev}
              className="absolute left-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl hover:bg-white/90 transition-all z-20"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8 text-gray-800" />
            </motion.button>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollNext}
              className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl hover:bg-white/90 transition-all z-20"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8 text-gray-800" />
            </motion.button>
          </>
        )}

        {/* Enhanced Thumbnail Navigation */}
        {!isFullscreen && (
          <div className="mt-6 relative">
            <div className="flex gap-3 overflow-x-auto pb-4 px-2 scrollbar-hide">
              {images.map((src, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollTo(index)}
                  className={`relative shrink-0 w-24 h-24 rounded-2xl overflow-hidden transition-all duration-300 ${
                    selectedIndex === index 
                      ? 'ring-3 ring-accent ring-offset-2 scale-105 shadow-xl' 
                      : 'opacity-70 hover:opacity-100 ring-1 ring-transparent hover:ring-accent/50'
                  }`}
                >
                  <div className="relative w-full h-full">
                    {!imageLoadStates[index] && (
                      <div className="absolute inset-0 bg-linear-to-br from-accent/20 via-primary/10 to-accent/20 animate-pulse" />
                    )}
                    <Image
                      src={src || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className={`object-cover transition-all duration-500 ${imageLoadStates[index] ? 'opacity-100' : 'opacity-0'}`}
                      onError={handleImageError}
                      onLoad={() => handleImageLoad(index)}
                      sizes="96px"
                    />
                    {selectedIndex === index && (
                      <motion.div 
                        layoutId="activeIndicator"
                        className="absolute inset-0 bg-accent/20 pointer-events-none" 
                      />
                    )}
                  </div>
                  <div className="absolute bottom-1 right-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded-md font-medium">
                    {index + 1}
                  </div>
                </motion.button>
              ))}
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-linear-to-r from-accent to-accent/80"
                initial={{ width: 0 }}
                animate={{ width: `${((selectedIndex + 1) / images.length) * 100}%` }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </div>
          </div>
        )}
        
        {/* Fullscreen thumbnails */}
        {isFullscreen && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 px-8">
            {images.map((src, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => scrollTo(index)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden transition-all ${
                  selectedIndex === index 
                    ? 'ring-3 ring-white scale-110' 
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src={src || "/placeholder.svg"}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  onError={handleImageError}
                  sizes="80px"
                />
              </motion.button>
            ))}
          </div>
        )}
        
        {/* Enhanced Image Counter */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`absolute top-4 ${isFullscreen ? 'left-1/2 -translate-x-1/2' : 'right-4'} bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium z-10 border border-white/20`}
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
            {selectedIndex + 1} / {images.length}
          </span>
        </motion.div>
        
        {/* Action Buttons */}
        {!isFullscreen && (
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleAutoPlay}
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md transition-all border ${
                isAutoPlay 
                  ? 'bg-accent text-white border-accent' 
                  : 'bg-white/80 text-gray-800 border-white/20 hover:bg-white/90'
              }`}
            >
              {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </motion.button>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleFullscreen}
              className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-white/90 transition-all border border-white/20"
            >
              <Maximize2 className="w-4 h-4 text-gray-800" />
            </motion.button>
          </div>
        )}
      </div>
    </>
  )
}
