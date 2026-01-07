import { Navbar } from "@/components/navbar"
import { Properties } from "@/components/properties"
import { Footer } from "@/components/footer"

export default function PropertiesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-32 pb-20 container mx-auto px-6">
        <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tighter mb-8">
          The <span className="italic text-accent">Collection</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Explore our handpicked selection of architectural masterpieces and luxury residences across Dubai's most
          prestigious neighborhoods.
        </p>
      </div>
      <Properties />
      <Footer />
    </main>
  )
}
