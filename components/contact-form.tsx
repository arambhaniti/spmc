"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, Phone, ArrowRight, Loader2, CheckCircle } from "lucide-react"

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  subject: string
  message: string
}

interface FormStatus {
  isSubmitting: boolean
  isSubmitted: boolean
  error: string | null
  success: string | null
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'Property Acquisition',
    message: ''
  })

  const [formStatus, setFormStatus] = useState<FormStatus>({
    isSubmitting: false,
    isSubmitted: false,
    error: null,
    success: null
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setFormStatus({
      isSubmitting: true,
      isSubmitted: false,
      error: null,
      success: null
    })

    try {
      if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
        throw new Error('Please fill in all required fields')
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address')
      }

      const appScriptUrl = process.env.NEXT_PUBLIC_CONTACT_FORM_SCRIPT
      if (!appScriptUrl) {
        throw new Error('Contact form script URL not configured')
      }

      const submissionData = new URLSearchParams({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject,
        message: formData.message.trim(),
        method: 'POST'
      });

      console.log('Submitting contact form to:', appScriptUrl);
      
      const response = await fetch(appScriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: submissionData
      })

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText || 'Failed to submit form. Please try again.'}`);
      }

      const result = await response.json()

      if (result.success) {
        setFormStatus({
          isSubmitting: false,
          isSubmitted: true,
          error: null,
          success: result.message || 'Your message has been submitted successfully!'
        })
        
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: 'Property Acquisition',
          message: ''
        })
      } else {
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
        className="bg-white border border-accent/5 p-12 rounded-[3rem] shadow-2xl"
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
          <h3 className="text-3xl font-serif font-bold mb-4 text-green-800">Thank You!</h3>
          <p className="text-gray-600 mb-6 text-lg">{formStatus.success}</p>
          <button
            onClick={resetForm}
            className="text-accent hover:text-accent/80 font-medium underline"
          >
            Send another message
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
      className="bg-white border border-accent/5 p-12 rounded-[3rem] shadow-2xl"
    >
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-serif font-bold mb-4">Inquiry Studio</h2>
        <p className="text-muted-foreground text-sm">
          Please provide the details of your architectural vision.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {formStatus.error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-50 border border-red-200 rounded-xl"
          >
            <p className="text-red-700 text-sm">{formStatus.error}</p>
          </motion.div>
        )}

        <div className="grid sm:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Alexander"
              required
              disabled={formStatus.isSubmitting}
              className="w-full bg-muted/30 border-b-2 border-transparent focus:border-accent p-4 rounded-xl outline-none transition-all placeholder:text-muted-foreground/30 disabled:opacity-50"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Thorne"
              required
              disabled={formStatus.isSubmitting}
              className="w-full bg-muted/30 border-b-2 border-transparent focus:border-accent p-4 rounded-xl outline-none transition-all placeholder:text-muted-foreground/30 disabled:opacity-50"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="alex@thorne-group.com"
            required
            disabled={formStatus.isSubmitting}
            className="w-full bg-muted/30 border-b-2 border-transparent focus:border-accent p-4 rounded-xl outline-none transition-all placeholder:text-muted-foreground/30 disabled:opacity-50"
          />
        </div>

        <div className="space-y-3">
          <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+1 (555) 123-4567"
            disabled={formStatus.isSubmitting}
            className="w-full bg-muted/30 border-b-2 border-transparent focus:border-accent p-4 rounded-xl outline-none transition-all placeholder:text-muted-foreground/30 disabled:opacity-50"
          />
        </div>

        <div className="space-y-3">
          <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
            Subject of Interest *
          </label>
          <select 
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            disabled={formStatus.isSubmitting}
            className="w-full bg-muted/30 border-b-2 border-transparent focus:border-accent p-4 rounded-xl outline-none transition-all cursor-pointer disabled:opacity-50"
          >
            <option>Property Acquisition</option>
            <option>Strategic Divestment</option>
            <option>Architectural Scouting</option>
            <option>Investment Portfolio Advisory</option>
            <option>Relocation Concierge</option>
          </select>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
            Message / Vision
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={5}
            placeholder="Tell us about the space you're looking for..."
            disabled={formStatus.isSubmitting}
            className="w-full bg-muted/30 border-b-2 border-transparent focus:border-accent p-4 rounded-xl outline-none transition-all resize-none placeholder:text-muted-foreground/30 disabled:opacity-50"
          ></textarea>
        </div>

        <motion.button
          whileHover={{ scale: formStatus.isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: formStatus.isSubmitting ? 1 : 0.98 }}
          type="submit"
          disabled={formStatus.isSubmitting}
          className="w-full py-6 bg-primary text-white rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-accent transition-all flex items-center justify-center gap-4 group shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {formStatus.isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Inquiry <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  )
}
