"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone, MessageCircle, Clock } from 'lucide-react'
import { CONTACT } from '@/config/constants'

interface CallModalProps {
  isOpen: boolean
  onClose: () => void
  propertyName: string
}

export function CallModal({ isOpen, onClose, propertyName }: CallModalProps) {
  const handleCall = () => {
    window.open(`tel:${CONTACT.PHONE.replace(/\s/g, '')}`)
  }

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${CONTACT.WHATSAPP}?text=Hi, I'm interested in ${propertyName}`)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100"
        >
          {/* Header */}
          <div className="relative bg-gradient-to-br from-accent to-accent/80 p-6 text-white">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-2">Call Now</h3>
              <p className="text-white/90 text-sm">Get in touch for {propertyName}</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Phone Number Display */}
            <div className="text-center p-4 bg-accent/5 rounded-2xl border border-accent/20">
              <p className="text-sm text-gray-600 mb-1">Call us directly</p>
              <p className="text-2xl font-bold text-accent">{CONTACT.PHONE}</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCall}
                className="w-full px-6 py-4 bg-gradient-to-r from-accent to-accent/80 text-white rounded-2xl font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsApp}
                className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </motion.button>
            </div>

            {/* Availability Info */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 p-3 bg-gray-50 rounded-xl">
              <Clock className="w-4 h-4" />
              <span>Available 24/7 for urgent inquiries</span>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6 text-center">
            <p className="text-xs text-gray-500">
              Our property experts are ready to help you find your dream home
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
