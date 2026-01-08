"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, Phone, ArrowRight, Loader2, CheckCircle } from "lucide-react"

interface PropertyInquiryFormProps {
  propertyId: string
  propertyTitle: string
  propertyLocation: string
}

interface FormData {
  name: string
  email: string
  phone: string
  message: string
}

interface FormStatus {
  isSubmitting: boolean
  isSubmitted: boolean
  error: string | null
  success: string | null
}

export function PropertyInquiryForm({ propertyId, propertyTitle, propertyLocation }: PropertyInquiryFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const [formStatus, setFormStatus] = useState<FormStatus>({
    isSubmitting: false,
    isSubmitted: false,
    error: null,
    success: null
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Reset status
    setFormStatus({
      isSubmitting: true,
      isSubmitted: false,
      error: null,
      success: null
    })

    try {
      // Validate required fields
      if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
        throw new Error('Please fill in all required fields')
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address')
      }

      // Get App Script URL from environment variables
      const appScriptUrl = process.env.NEXT_PUBLIC_INQUIRY_FORM_APP_SCRIPT
      if (!appScriptUrl) {
        throw new Error('App Script URL not configured')
      }

      // Prepare form data for App Script using URLSearchParams
      const submissionData = new URLSearchParams({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
        propertyId,
        propertyTitle,
        propertyLocation,
        method: 'POST'
      });

      // Submit to App Script
      console.log('Submitting to:', appScriptUrl);
      console.log('Form data:', submissionData.toString());
      
      const response = await fetch(appScriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: submissionData
      })

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText || 'Failed to submit form. Please try again.'}`);
      }

      const result = await response.json()
      console.log('Response data:', result);

      if (result.success) {
        // Success
        setFormStatus({
          isSubmitting: false,
          isSubmitted: true,
          error: null,
          success: result.message || 'Your inquiry has been submitted successfully!'
        })
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        })
      } else {
        // Error from App Script
        throw new Error(result.message || 'Failed to submit form')
      }

    } catch (error) {
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        success: null
      })
    }
  }

  const resetForm = () => {
    setFormStatus({
      isSubmitting: false,
      isSubmitted: false,
      error: null,
      success: null
    })
  }

  if (formStatus.isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border border-gray-200 p-8 rounded-3xl shadow-xl"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-8 h-8 text-green-600" />
          </motion.div>
          <h3 className="text-2xl font-serif font-bold mb-3 text-green-800">Thank You!</h3>
          <p className="text-gray-600 mb-6">{formStatus.success}</p>
          <button
            onClick={resetForm}
            className="text-accent hover:text-accent/80 font-medium underline"
          >
            Submit another inquiry
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white border border-gray-200 p-8 rounded-3xl shadow-xl sticky top-24"
    >
      <form onSubmit={handleSubmit}>
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-accent" />
          </div>
          <h3 className="text-2xl font-serif font-bold mb-2">Inquire About This Property</h3>
          <p className="text-sm text-gray-600">Get in touch for more information or to schedule a viewing</p>
        </div>
        
        {/* Error Message */}
        {formStatus.error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
          >
            <p className="text-red-700 text-sm">{formStatus.error}</p>
          </motion.div>
        )}

        <div className="space-y-4 mb-6">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full Name *"
              required
              disabled={formStatus.isSubmitting}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address *"
              required
              disabled={formStatus.isSubmitting}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          
          <div className="relative">
            <Phone className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number *"
              required
              disabled={formStatus.isSubmitting}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          
          <div className="relative">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell us about your interest..."
              rows={4}
              disabled={formStatus.isSubmitting}
              className="w-full px-4 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>
          
          <motion.button
            whileHover={{ scale: formStatus.isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: formStatus.isSubmitting ? 1 : 0.98 }}
            type="submit"
            disabled={formStatus.isSubmitting}
            className="w-full py-4 bg-linear-to-r from-accent to-accent/90 text-white rounded-xl font-bold uppercase tracking-widest text-sm hover:shadow-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formStatus.isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Send Inquiry
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </form>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
            <Phone className="w-4 h-4" />
            <span>+971 4 XXX XXXX</span>
          </div>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mt-2">
            <Mail className="w-4 h-4" />
            <span>info@spmc.ae</span>
          </div>
        </div>
    </motion.div>
  )
}
