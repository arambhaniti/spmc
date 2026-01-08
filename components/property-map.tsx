"use client"

import { useEffect, useRef } from 'react'
import { MapPin, Navigation, ZoomIn, ZoomOut } from 'lucide-react'
import 'leaflet/dist/leaflet.css'

interface PropertyMapProps {
  location: string
  title: string
  coordinates?: [number, number]
}

export function PropertyMap({ location, title, coordinates }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markerRef = useRef<any>(null)

  // Default Dubai coordinates if not provided
  const defaultCoords: [number, number] = coordinates || [25.2048, 55.2708]
  
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Dynamically import Leaflet only on client side
    import('leaflet').then((leafletModule) => {
      const L = leafletModule.default || leafletModule
      
      // Ensure the map container has proper dimensions
      if (mapRef.current) {
        // Set explicit height to prevent overflow
        mapRef.current.style.height = '400px'
        mapRef.current.style.width = '100%'
        mapRef.current.style.minHeight = '400px'
        mapRef.current.style.overflow = 'hidden'
      }
      
      // Initialize map with a small delay to ensure container is ready
      setTimeout(() => {
        try {
          const map = L.map(mapRef.current!).setView(defaultCoords, 13)
          
          // Add tile layer
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19,
          }).addTo(map)
          
          // Add custom marker
          const customIcon = L.divIcon({
            html: `
              <div class="flex items-center justify-center w-10 h-10 bg-accent text-white rounded-full shadow-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-13-2-13-9 13-9 13 9-13 9z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
            `,
            className: 'custom-div-icon',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40],
          })
          
          const marker = L.marker(defaultCoords, { icon: customIcon }).addTo(map)
          
          // Add popup
          marker.bindPopup(`
            <div style="min-width: 200px; padding: 12px;">
              <h3 style="font-weight: bold; font-size: 18px; margin-bottom: 8px;">${title}</h3>
              <p style="font-size: 14px; color: #666; margin-bottom: 8px;">${location}</p>
              <button 
                onclick="window.open('https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}', '_blank')"
                style="width: 100%; margin-top: 8px; padding: 8px 12px; background: #0ea5e9; color: white; border: none; border-radius: 8px; font-size: 14px; cursor: pointer;"
              >
                Get Directions
              </button>
            </div>
          `)
          
          mapInstanceRef.current = map
          markerRef.current = marker
          
          // Force map to recalculate after a short delay
          setTimeout(() => {
            map.invalidateSize()
          }, 100)
          
        } catch (error) {
          console.error('Error initializing map:', error)
        }
      }, 200)
    })

    return () => {
      // Cleanup
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [defaultCoords, title, location])

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn()
    }
  }

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut()
    }
  }

  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(defaultCoords, 13)
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-accent" />
          <span className="font-medium text-sm">Property Location</span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={handleZoomOut}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetView}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            title="Reset view"
          >
            <Navigation className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div 
        ref={mapRef} 
        className="w-full"
        style={{ 
          height: '400px',
          minHeight: '400px',
          overflow: 'hidden',
          zIndex: 10
        }}
      />
      <div className="p-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">{location}</p>
            <p className="text-xs text-gray-500">Click marker for details</p>
          </div>
          <button
            onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank')}
            className="text-xs px-3 py-1 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors flex items-center gap-1"
          >
            <MapPin className="w-3 h-3" />
            Open in Maps
          </button>
        </div>
      </div>
    </div>
  )
}
