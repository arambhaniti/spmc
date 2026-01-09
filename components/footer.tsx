import Link from "next/link"
import { SHORT_NAME, CONTACT } from '@/config/constants'

export function Footer() {
  return (
    <footer className="bg-background border-t py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <Link href="/" className="text-3xl font-serif font-bold tracking-tighter mb-6 block">
              {SHORT_NAME.split(' ').map((word, index) => (
                <span key={index}>
                  {word}
                  {index === 0 && <span className="text-accent">.</span>}
                </span>
              ))}
            </Link>
            <p className="text-muted-foreground max-w-sm text-lg">
              Elevating the real estate experience through architectural passion and market mastery.
            </p>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6">Navigation</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link href="/properties" className="hover:text-accent transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-accent transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-accent transition-colors">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6">Contact</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="text-muted-foreground italic">Dubai, UAE</li>
              <li>
                <a href={`tel:${CONTACT.PHONE.replace(/\s/g, '')}`} className="hover:text-accent transition-colors">
                  {CONTACT.PHONE}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.EMAIL_GENERAL}`} className="hover:text-accent transition-colors">
                  {CONTACT.EMAIL_GENERAL}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-[10px] mb-8 text-muted-foreground">The Practice</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link href="/services" className="hover:text-accent transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-accent transition-colors">
                  Market Insights
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-[10px] mb-8 text-muted-foreground">Legal</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link href="/privacy-policy" className="hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-foreground">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          <p>© 2026 {SHORT_NAME} REAL ESTATE. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  )
}
