import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { COMPANY_NAME } from '@/config/constants'

export default function TermsOfService() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-40 pb-20 container mx-auto px-6 max-w-4xl">
        <h1 className="text-5xl font-serif font-bold mb-12">Terms of Service</h1>
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 uppercase tracking-widest text-sm">
              Acceptance of Terms
            </h2>
            <p>
              By accessing or using our website, you agree to be bound by these Terms of Service and all applicable laws
              and regulations.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 uppercase tracking-widest text-sm">
              Intellectual Property
            </h2>
            <p>
              All content on this website, including text, images, and logos, is the property of {COMPANY_NAME} Real
              Estate and is protected by intellectual property laws.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 uppercase tracking-widest text-sm">Disclaimer</h2>
            <p>
              The information provided on this website is for general informational purposes only and does not
              constitute professional advice. We make no warranties about the accuracy or completeness of the
              information.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}
