"use client"

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

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

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback((index: number) => {
    emblaApi?.scrollTo(index)
  }, [emblaApi])

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
    <div className="relative">
      {/* Main Carousel */}
      <div className="relative overflow-hidden rounded-3xl" ref={emblaRef}>
        <div className="flex">
          {images.map((src, index) => (
            <div key={index} className="flex-[0_0_100%] relative aspect-[4/3] md:aspect-[16/9]">
              <Image
                src={src || "/placeholder.svg"}
                alt={`${title} - Image ${index + 1}`}
                fill
                className="object-cover"
                onError={handleImageError}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all hover:scale-110 z-10"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5 text-gray-800" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all hover:scale-110 z-10"
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5 text-gray-800" />
      </button>

      {/* Thumbnail Navigation */}
      <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
        {images.map((src, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all ${
              selectedIndex === index 
                ? 'ring-2 ring-accent ring-offset-2 scale-105' 
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <Image
              src={src || "/placeholder.svg"}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
              onError={handleImageError}
            />
          </button>
        ))}
      </div>

      {/* Image Counter */}
      <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
        {selectedIndex + 1} / {images.length}
      </div>
    </div>
  )
}
