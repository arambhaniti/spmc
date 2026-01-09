"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PropertyCarousel } from "@/components/property-carousel"
import { PropertyMap } from "@/components/property-map"
import { PropertyInquiryForm } from "@/components/property-inquiry-form"
import { CallModal } from "@/components/call-modal"
import { motion } from "framer-motion"
import { MapPin, Bed, Bath, Maximize2, CheckCircle2, ArrowRight, Share2, Heart, Calendar, Phone, Home, Star, Badge } from "lucide-react"

const PROPERTY_DATA: Record<string, any> = {
  "dubai-marina-penthouse": {
    title: "Dubai Marina Penthouse",
    location: "Dubai Marina, Dubai",
    price: "AED 4,500,000",
    beds: 3,
    baths: 3.5,
    sqft: 2850,
    yearBuilt: 2022,
    neighborhood: "Dubai Marina",
    type: "Penthouse",
    description:
      "Experience unparalleled luxury in this stunning Dubai Marina penthouse. Featuring floor-to-ceiling windows with panoramic marina and sea views, this 2,850 sq.ft. residence offers the ultimate Dubai lifestyle. The gourmet kitchen is equipped with Miele appliances, while the master suite provides a sanctuary with a spa-like en-suite bath and private terrace.",
    extendedInfo:
      "The penthouse's architectural design maximizes natural light throughout the day. Premium marble flooring flows throughout the open-plan living space, complemented by custom Italian cabinetry. Every detail has been curated for the discerning buyer who values both luxury and functionality in the heart of Dubai's most prestigious marina community.",
    features: [
      "Smart Home System",
      "Private Terrace",
      "24/7 Concierge",
      "Infinity Pool",
      "Gym & Spa",
      "Covered Parking",
      "Sea View",
      "Marina Access",
    ],
    images: ["/luxury-apartment-living-room.png", "/luxury-interior-1.jpg", "/luxury-interior-2.jpg"],
    specs: [
      { label: "Service Charges", value: "AED 25/sqft/year" },
      { label: "DEWA Fees", value: "AED 1,200/mo" },
      { label: "Listing ID", value: "SPMC-DMP-001" },
      { label: "Status", value: "Active" },
    ],
  },
  "downtown-dubai-villa": {
    title: "Downtown Dubai Villa",
    location: "Downtown Dubai, Dubai",
    price: "AED 8,200,000",
    beds: 5,
    baths: 6,
    sqft: 4500,
    yearBuilt: 2021,
    neighborhood: "Downtown Dubai",
    type: "Villa",
    description:
      "A masterpiece of contemporary architecture in the heart of Downtown Dubai. This 4,500 sq.ft. villa offers breathtaking views of the Burj Khalifa and Dubai Fountain. The residence features expansive living spaces, a private garden, and a rooftop terrace perfect for entertaining while enjoying the iconic Dubai skyline.",
    extendedInfo:
      "The villa's design incorporates traditional Arabic elements with modern luxury. Premium materials and finishes throughout, including marble flooring, custom woodwork, and state-of-the-art home automation. Located in one of Dubai's most prestigious communities with world-class amenities at your doorstep.",
    features: [
      "Burj Khalifa View",
      "Private Garden",
      "Rooftop Terrace",
      "Home Cinema",
      "Wine Cellar",
      "Maid's Room",
      "Double Garage",
      "Smart Security",
    ],
    images: ["/modern-mansion-exterior.jpg", "/luxury-interior-1.jpg", "/luxury-interior-2.jpg"],
    specs: [
      { label: "Land Area", value: "6,500 sq.ft." },
      { label: "Service Charges", value: "AED 15,000/year" },
      { label: "Listing ID", value: "SPMC-DDV-002" },
      { label: "Status", value: "Active" },
    ],
  },
  "palm-jumeirah-apartment": {
    title: "Palm Jumeirah Apartment",
    location: "Palm Jumeirah, Dubai",
    price: "AED 180,000/year",
    beds: 2,
    baths: 2,
    sqft: 1650,
    yearBuilt: 2020,
    neighborhood: "Palm Jumeirah",
    type: "Apartment",
    description:
      "Stunning beachfront apartment on the iconic Palm Jumeirah. This 1,650 sq.ft. residence offers direct beach access and panoramic Arabian Gulf views. The open-plan living space flows seamlessly onto a large terrace, perfect for enjoying Dubai's year-round sunshine and spectacular sunsets.",
    extendedInfo:
      "Located in one of Palm Jumeirah's most prestigious buildings with resort-style amenities. The apartment features premium finishes, floor-to-ceiling windows, and a sophisticated layout designed for modern coastal living. Experience the ultimate beach lifestyle just minutes from Dubai's major attractions.",
    features: [
      "Beach Access",
      "Sea View",
      "Gym & Pool",
      "24/7 Security",
      "Covered Parking",
      "Retail Access",
      "Restaurants",
      "Kids Play Area",
    ],
    images: ["/coastal-modern-home.jpg", "/luxury-interior-1.jpg", "/luxury-interior-2.jpg"],
    specs: [
      { label: "Annual Rent", value: "AED 180,000" },
      { label: "Payment", value: "4 Cheques" },
      { label: "Listing ID", value: "SPMC-PJA-003" },
      { label: "Status", value: "Available" },
    ],
  },
  "business-bay-studio": {
    title: "Business Bay Studio",
    location: "Business Bay, Dubai",
    price: "AED 75,000/year",
    beds: 0,
    baths: 1,
    sqft: 650,
    yearBuilt: 2021,
    neighborhood: "Business Bay",
    type: "Studio",
    description:
      "Modern studio apartment in the heart of Business Bay, Dubai's premier business district. This efficient 650 sq.ft. space offers stunning Dubai Canal views and is perfect for young professionals. The clever layout maximizes space while providing all the comforts of modern urban living.",
    extendedInfo:
      "Located in a high-rise building with world-class amenities including a rooftop pool, gym, and 24-hour concierge. The studio features premium finishes, built-in wardrobes, and a balcony perfect for enjoying the vibrant city views. Walking distance to Dubai Mall and Business Bay Metro Station.",
    features: [
      "Canal View",
      "Rooftop Pool",
      "Gym Access",
      "Metro Nearby",
      "Built-in Wardrobes",
      "Balcony",
      "High-Speed Internet",
      "Central AC",
    ],
    images: ["/modern-glass-house.jpg", "/luxury-interior-1.jpg", "/luxury-interior-2.jpg"],
    specs: [
      { label: "Annual Rent", value: "AED 75,000" },
      { label: "Payment", value: "1 Cheque" },
      { label: "Listing ID", value: "SPMC-BBS-004" },
      { label: "Status", value: "Available" },
    ],
  },
  "dubai-hills-villa": {
    title: "Dubai Hills Villa",
    location: "Dubai Hills Estate, Dubai",
    price: "AED 3,800,000",
    beds: 4,
    baths: 4,
    sqft: 3200,
    yearBuilt: 2022,
    neighborhood: "Dubai Hills Estate",
    type: "Villa",
    description:
      "Contemporary family villa in the prestigious Dubai Hills Estate. This 3,200 sq.ft. home offers the perfect blend of luxury and family living. The open-plan design creates seamless flow between indoor and outdoor spaces, with a private garden and access to Dubai Hills' world-class amenities including the championship golf course.",
    extendedInfo:
      "The villa features modern architecture with clean lines and premium finishes throughout. The master suite includes a walk-in closet and en-suite bath, while the additional bedrooms are generously sized. The community offers parks, schools, and retail outlets, making it ideal for families seeking a premium lifestyle.",
    features: [
      "Golf Course View",
      "Private Garden",
      "Family Layout",
      "Maid's Room",
      "Double Garage",
      "Community Pool",
      "Park Access",
      "Schools Nearby",
    ],
    images: ["/soho-loft-duplex.jpg", "/luxury-interior-1.jpg", "/luxury-interior-2.jpg"],
    specs: [
      { label: "Land Area", value: "4,800 sq.ft." },
      { label: "Service Charges", value: "AED 12,000/year" },
      { label: "Listing ID", value: "SPMC-DHV-005" },
      { label: "Status", value: "Active" },
    ],
  },
  "jbr-apartment": {
    title: "JBR Beach Apartment",
    location: "Jumeirah Beach Residence, Dubai",
    price: "AED 120,000/year",
    beds: 1,
    baths: 1,
    sqft: 850,
    yearBuilt: 2019,
    neighborhood: "Jumeirah Beach Residence",
    type: "Apartment",
    description:
      "Charming beachfront apartment in the vibrant JBR community. This 850 sq.ft. one-bedroom residence offers direct beach access and stunning Arabian Gulf views. The bright and airy living space opens onto a balcony perfect for enjoying the beach atmosphere and spectacular sunsets.",
    extendedInfo:
      "Located in the heart of JBR with The Walk at your doorstep - Dubai's premier beachfront dining and shopping destination. The building features resort-style amenities including pools, gyms, and 24/7 security. Experience the ultimate beach lifestyle with easy access to Dubai Marina and major attractions.",
    features: [
      "Beach Access",
      "Sea View",
      "Balcony",
      "Gym & Pool",
      "The Walk JBR",
      "Restaurants",
      "Retail Access",
      "Metro Nearby",
    ],
    images: ["/modern-echo-park-home.jpg", "/luxury-interior-1.jpg", "/luxury-interior-2.jpg"],
    specs: [
      { label: "Annual Rent", value: "AED 120,000" },
      { label: "Payment", value: "4 Cheques" },
      { label: "Listing ID", value: "SPMC-JBA-006" },
      { label: "Status", value: "Available" },
    ],
  },
  "emirates-hills-mansion": {
    title: "Emirates Hills Mansion",
    location: "Emirates Hills, Dubai",
    price: "AED 15,500,000",
    beds: 6,
    baths: 7,
    sqft: 8200,
    yearBuilt: 2021,
    neighborhood: "Emirates Hills",
    type: "Mansion",
    description:
      "An architectural masterpiece in the prestigious Emirates Hills community. This 8,200 sq.ft. mansion offers unparalleled luxury with panoramic golf course views. The residence features grand entertaining spaces, a private cinema, and resort-style amenities that define elite Dubai living.",
    extendedInfo:
      "The mansion's design incorporates classical elegance with modern technology. Premium marble flooring, custom millwork, and smart home systems throughout. The outdoor space includes a infinity pool, landscaped gardens, and separate guest accommodation.",
    features: [
      "Golf Course View",
      "Private Cinema",
      "Infinity Pool",
      "Guest House",
      "Wine Cellar",
      "Smart Home",
      "6-Car Garage",
      "Private Elevator",
    ],
    images: ["/modern-mansion-exterior.jpg", "/luxury-interior-1.jpg", "/luxury-interior-2.jpg"],
    specs: [
      { label: "Land Area", value: "12,000 sq.ft." },
      { label: "Service Charges", value: "AED 25,000/year" },
      { label: "Listing ID", value: "SPMC-EHM-007" },
      { label: "Status", value: "Active" },
    ],
  },
  "palm-jumeirah-villa": {
    title: "Palm Jumeirah Villa",
    location: "Palm Jumeirah, Dubai",
    price: "AED 12,000,000",
    beds: 5,
    baths: 5,
    sqft: 5500,
    yearBuilt: 2020,
    neighborhood: "Palm Jumeirah",
    type: "Villa",
    description:
      "Luxurious beachfront villa on the iconic Palm Jumeirah. This 5,500 sq.ft. residence offers direct beach access and stunning Arabian Gulf views. The contemporary design features seamless indoor-outdoor living with expansive terraces perfect for Dubai's lifestyle.",
    extendedInfo:
      "The villa boasts premium finishes throughout with marble flooring, high-end appliances, and smart home integration. The outdoor space includes a private pool, landscaped garden, and direct beach access. Located in one of Dubai's most exclusive addresses.",
    features: [
      "Beach Access",
      "Sea View",
      "Private Pool",
      "Smart Home",
      "Maid's Room",
      "Covered Parking",
      "Garden",
      "Terrace",
    ],
    images: ["/coastal-modern-home.jpg", "/luxury-interior-1.jpg", "/luxury-interior-2.jpg"],
    specs: [
      { label: "Land Area", value: "7,200 sq.ft." },
      { label: "Service Charges", value: "AED 20,000/year" },
      { label: "Listing ID", value: "SPMC-PJV-008" },
      { label: "Status", value: "Active" },
    ],
  },
  "dubai-creek-harbour": {
    title: "Dubai Creek Harbour Apartment",
    location: "Dubai Creek Harbour, Dubai",
    price: "AED 2,800,000",
    beds: 2,
    baths: 2,
    sqft: 1450,
    yearBuilt: 2022,
    neighborhood: "Dubai Creek Harbour",
    type: "Apartment",
    description:
      "Modern apartment in the iconic Dubai Creek Harbour development. This 1,450 sq.ft. residence offers stunning views of the Dubai skyline and Creek Tower. The contemporary design features floor-to-ceiling windows and high-end finishes throughout.",
    extendedInfo:
      "Located in one of Dubai's most ambitious developments with world-class amenities. The apartment includes premium appliances, smart home features, and access to retail, dining, and entertainment options. Perfect for urban professionals seeking luxury living.",
    features: [
      "Creek Tower View",
      "Floor-to-Ceiling Windows",
      "Smart Home",
      "Gym & Pool",
      "Retail Access",
      "Metro Nearby",
      "Covered Parking",
      "24/7 Security",
    ],
    images: ["/modern-glass-house.jpg", "/luxury-interior-1.jpg", "/luxury-interior-2.jpg"],
    specs: [
      { label: "Service Charges", value: "AED 18/sqft/year" },
      { label: "DEWA Fees", value: "AED 800/mo" },
      { label: "Listing ID", value: "SPMC-DCH-009" },
      { label: "Status", value: "Active" },
    ],
  },
  "jumeirah-golf-estates": {
    title: "Jumeirah Golf Estates Villa",
    location: "Jumeirah Golf Estates, Dubai",
    price: "AED 6,900,000",
    beds: 4,
    baths: 4,
    sqft: 3800,
    yearBuilt: 2021,
    neighborhood: "Jumeirah Golf Estates",
    type: "Villa",
    description:
      "Stunning golf course villa in the prestigious Jumeirah Golf Estates. This 3,800 sq.ft. residence offers panoramic views of the championship golf course. The modern design features spacious living areas and seamless indoor-outdoor flow.",
    extendedInfo:
      "The villa boasts premium finishes with marble flooring, custom cabinetry, and smart home integration. The outdoor space includes a private pool, landscaped garden, and golf course access. Perfect for families seeking an active lifestyle in a premium community.",
    features: [
      "Golf Course View",
      "Private Pool",
      "Modern Design",
      "Smart Home",
      "Maid's Room",
      "Double Garage",
      "Garden",
      "Club Access",
    ],
    images: ["/modern-echo-park-home.jpg", "/luxury-interior-1.jpg", "/luxury-interior-2.jpg"],
    specs: [
      { label: "Land Area", value: "5,500 sq.ft." },
      { label: "Service Charges", value: "AED 15,000/year" },
      { label: "Listing ID", value: "SPMC-JGE-010" },
      { label: "Status", value: "Active" },
    ],
  },
  "bluewaters-island": {
    title: "Bluewaters Island Apartment",
    location: "Bluewaters Island, Dubai",
    price: "AED 3,200,000",
    beds: 3,
    baths: 3,
    sqft: 2100,
    yearBuilt: 2022,
    neighborhood: "Bluewaters Island",
    type: "Apartment",
    description:
      "Luxury apartment on exclusive Bluewaters Island with stunning Ain Dubai views. This 2,100 sq.ft. residence offers premium island living with world-class amenities and beach access. Perfect for those seeking a resort-style lifestyle.",
    extendedInfo:
      "The apartment features contemporary design with high-end finishes, floor-to-ceiling windows, and smart home integration. Residents enjoy access to private beaches, retail outlets, and entertainment venues. Island living at its finest with Dubai Marina views.",
    features: [
      "Ain Dubai View",
      "Beach Access",
      "Island Living",
      "Smart Home",
      "Gym & Pool",
      "Retail Access",
      "Covered Parking",
      "24/7 Security",
    ],
    images: ["/luxury-apartment-living-room.png", "/luxury-interior-1.jpg", "/luxury-interior-2.jpg"],
    specs: [
      { label: "Service Charges", value: "AED 22/sqft/year" },
      { label: "DEWA Fees", value: "AED 1,000/mo" },
      { label: "Listing ID", value: "SPMC-BIA-011" },
      { label: "Status", value: "Active" },
    ],
  },
  "arabian-ranches": {
    title: "Arabian Ranches Villa",
    location: "Arabian Ranches, Dubai",
    price: "AED 4,100,000",
    beds: 4,
    baths: 3,
    sqft: 3500,
    yearBuilt: 2020,
    neighborhood: "Arabian Ranches",
    type: "Villa",
    description:
      "Family-friendly villa in the established Arabian Ranches community. This 3,500 sq.ft. residence offers spacious living with a private garden and access to excellent schools and community facilities. Perfect for families seeking quality suburban living.",
    extendedInfo:
      "The villa features traditional Arabic architecture with modern amenities. The open-plan design creates perfect family spaces, while the private garden provides safe outdoor living. Community includes parks, schools, and retail centers within walking distance.",
    features: [
      "Family Community",
      "Private Garden",
      "Schools Nearby",
      "Community Pool",
      "Parks",
      "Retail Access",
      "Double Garage",
      "Maid's Room",
    ],
    images: ["/modern-mansion-exterior.jpg", "/luxury-interior-1.jpg", "/luxury-interior-2.jpg"],
    specs: [
      { label: "Land Area", value: "5,200 sq.ft." },
      { label: "Service Charges", value: "AED 12,000/year" },
      { label: "Listing ID", value: "SPMC-ARV-012" },
      { label: "Status", value: "Active" },
    ],
  },
  "dubai-south-townhouse": {
    title: "Dubai South Townhouse",
    location: "Dubai South, Dubai",
    price: "AED 1,850,000",
    beds: 3,
    baths: 3,
    sqft: 2200,
    yearBuilt: 2021,
    neighborhood: "Dubai South",
    type: "Townhouse",
    description:
      "Modern townhouse in the emerging Dubai South district. This 2,200 sq.ft. residence offers affordable luxury with proximity to Expo site and Al Maktoum Airport. Perfect for investors and end-users seeking growth potential.",
    extendedInfo:
      "The townhouse features contemporary design with efficient use of space and modern finishes. The community offers parks, schools, and retail facilities. Excellent connectivity to major highways and future infrastructure developments.",
    features: [
      "Affordable Luxury",
      "Expo Proximity",
      "Modern Design",
      "Community Facilities",
      "Park Access",
      "Schools Nearby",
      "Covered Parking",
      "Growth Area",
    ],
    images: ["/coastal-modern-home.jpg", "/luxury-interior-1.jpg", "/luxury-interior-2.jpg"],
    specs: [
      { label: "Land Area", value: "1,800 sq.ft." },
      { label: "Service Charges", value: "AED 8,000/year" },
      { label: "Listing ID", value: "SPMC-DST-013" },
      { label: "Status", value: "Active" },
    ],
  },
  "dubai-marina-studio": {
    title: "Dubai Marina Studio",
    location: "Dubai Marina, Dubai",
    price: "AED 85,000/year",
    beds: 0,
    baths: 1,
    sqft: 720,
    yearBuilt: 2021,
    neighborhood: "Dubai Marina",
    type: "Studio",
    description:
      "Modern studio apartment in the heart of Dubai Marina. This 720 sq.ft. efficient space offers stunning marina views and access to world-class amenities. Perfect for young professionals seeking vibrant urban living.",
    extendedInfo:
      "The studio features smart layout optimization with premium finishes and built-in storage. Located in a high-rise building with gym, pool, and 24-hour concierge. Walking distance to Marina Walk, JBR, and Dubai Marina Mall.",
    features: [
      "Marina View",
      "Smart Layout",
      "Built-in Storage",
      "Gym & Pool",
      "Marina Walk",
      "Metro Nearby",
      "24/7 Security",
      "Retail Access",
    ],
    images: ["/luxury-apartment-living-room.png", "/luxury-interior-1.jpg", "/luxury-interior-2.jpg"],
    specs: [
      { label: "Annual Rent", value: "AED 85,000" },
      { label: "Payment", value: "1 Cheque" },
      { label: "Listing ID", value: "SPMC-DMS-014" },
      { label: "Status", value: "Available" },
    ],
  },
  "downtown-dubai-1br": {
    title: "Downtown Dubai 1BR",
    location: "Downtown Dubai, Dubai",
    price: "AED 150,000/year",
    beds: 1,
    baths: 1,
    sqft: 950,
    yearBuilt: 2020,
    neighborhood: "Downtown Dubai",
    type: "Apartment",
    description:
      "Sophisticated one-bedroom apartment in prestigious Downtown Dubai. This 950 sq.ft. residence offers breathtaking views of Burj Khalifa and Dubai Fountain. Perfect for professionals seeking luxury in the city's heart.",
    extendedInfo:
      "The apartment features contemporary design with high-end finishes and floor-to-ceiling windows. Located in a premium building with world-class amenities including pool, gym, and concierge service. Walking distance to Dubai Mall and Business Bay.",
    features: [
      "Burj Khalifa View",
      "City View",
      "Premium Building",
      "Gym & Pool",
      "Dubai Mall",
      "Metro Access",
      "Concierge",
      "High-Speed Internet",
    ],
    images: ["/modern-mansion-exterior.jpg", "/luxury-interior-1.jpg", "/luxury-interior-2.jpg"],
    specs: [
      { label: "Annual Rent", value: "AED 150,000" },
      { label: "Payment", value: "4 Cheques" },
      { label: "Listing ID", value: "SPMC-DD1-015" },
      { label: "Status", value: "Available" },
    ],
  },
  "dubai-hills-2br": {
    title: "Dubai Hills 2BR",
    location: "Dubai Hills Estate, Dubai",
    price: "AED 200,000/year",
    beds: 2,
    baths: 2,
    sqft: 1800,
    yearBuilt: 2022,
    neighborhood: "Dubai Hills Estate",
    type: "Apartment",
    description:
      "Spacious two-bedroom apartment in family-friendly Dubai Hills Estate. This 1,800 sq.ft. residence offers modern living with access to championship golf course and community amenities. Perfect for families seeking quality lifestyle.",
    extendedInfo:
      "The apartment features open-plan design with premium finishes and ample storage. The community offers parks, schools, retail outlets, and recreational facilities. Excellent connectivity to major highways and Dubai Marina.",
    features: [
      "Golf Course View",
      "Family Community",
      "Modern Design",
      "Community Pool",
      "Parks",
      "Schools Nearby",
      "Retail Access",
      "Parking",
    ],
    images: ["/soho-loft-duplex.jpg", "/luxury-interior-1.jpg", "/luxury-interior-2.jpg"],
    specs: [
      { label: "Annual Rent", value: "AED 200,000" },
      { label: "Payment", value: "4 Cheques" },
      { label: "Listing ID", value: "SPMC-DH2-016" },
      { label: "Status", value: "Available" },
    ],
  },
  "business-bay-2br": {
    title: "Business Bay 2BR",
    location: "Business Bay, Dubai",
    price: "AED 140,000/year",
    beds: 2,
    baths: 2,
    sqft: 1400,
    yearBuilt: 2021,
    neighborhood: "Business Bay",
    type: "Apartment",
    description:
      "Modern two-bedroom apartment in bustling Business Bay. This 1,400 sq.ft. residence offers stunning Dubai Canal views and proximity to major business hubs. Perfect for professionals seeking convenience and luxury.",
    extendedInfo:
      "The apartment features contemporary design with premium finishes and smart home features. Located in a high-rise building with resort-style amenities including pool, gym, and 24-hour concierge. Walking distance to Dubai Mall and Business Bay Metro.",
    features: [
      "Canal View",
      "Business Location",
      "Smart Home",
      "Gym & Pool",
      "Dubai Mall",
      "Metro Access",
      "Covered Parking",
      "High-Speed Internet",
    ],
    images: ["/modern-glass-house.jpg", "/luxury-interior-1.jpg", "/luxury-interior-2.jpg"],
    specs: [
      { label: "Annual Rent", value: "AED 140,000" },
      { label: "Payment", value: "4 Cheques" },
      { label: "Listing ID", value: "SPMC-BB2-017" },
      { label: "Status", value: "Available" },
    ],
  },
  "jlt-1br": {
    title: "Jumeirah Lake Towers 1BR",
    location: "JLT, Dubai",
    price: "AED 95,000/year",
    beds: 1,
    baths: 1,
    sqft: 880,
    yearBuilt: 2020,
    neighborhood: "Jumeirah Lake Towers",
    type: "Apartment",
    description:
      "Bright one-bedroom apartment in vibrant JLT community. This 880 sq.ft. residence offers beautiful lake views and access to extensive community amenities. Perfect for young professionals seeking value and convenience.",
    extendedInfo:
      "The apartment features efficient layout with modern finishes and ample storage. The JLT community offers parks, restaurants, retail outlets, and sports facilities. Excellent connectivity to Sheikh Zayed Road and Dubai Marina.",
    features: [
      "Lake View",
      "Community Living",
      "Modern Layout",
      "Community Pool",
      "Parks",
      "Restaurants",
      "Metro Nearby",
      "Retail Access",
    ],
    images: ["/modern-echo-park-home.jpg", "/luxury-interior-1.jpg", "/luxury-interior-2.jpg"],
    specs: [
      { label: "Annual Rent", value: "AED 95,000" },
      { label: "Payment", value: "1 Cheque" },
      { label: "Listing ID", value: "SPMC-JLT-018" },
      { label: "Status", value: "Available" },
    ],
  },
  "dubai-marina-2br": {
    title: "Dubai Marina 2BR",
    location: "Dubai Marina, Dubai",
    price: "AED 175,000/year",
    beds: 2,
    baths: 2,
    sqft: 1650,
    yearBuilt: 2021,
    neighborhood: "Dubai Marina",
    type: "Apartment",
    description:
      "Premium two-bedroom apartment in prestigious Dubai Marina. This 1,650 sq.ft. residence offers stunning marina views and luxury amenities. Perfect for those seeking sophisticated waterfront living.",
    extendedInfo:
      "The apartment features high-end finishes with floor-to-ceiling windows and spacious balconies. Located in a premium building with world-class amenities including pool, gym, and concierge service. Walking distance to Marina Walk and JBR Beach.",
    features: [
      "Marina View",
      "Premium Building",
      "Balcony",
      "Gym & Pool",
      "Marina Walk",
      "Beach Access",
      "Concierge",
      "Covered Parking",
    ],
    images: ["/coastal-modern-home.jpg", "/luxury-interior-1.jpg", "/luxury-interior-2.jpg"],
    specs: [
      { label: "Annual Rent", value: "AED 175,000" },
      { label: "Payment", value: "2 Cheques" },
      { label: "Listing ID", value: "SPMC-DM2-019" },
      { label: "Status", value: "Available" },
    ],
  },
  "al-barsha-3br": {
    title: "Al Barsha 3BR",
    location: "Al Barsha, Dubai",
    price: "AED 160,000/year",
    beds: 3,
    baths: 2,
    sqft: 1900,
    yearBuilt: 2019,
    neighborhood: "Al Barsha",
    type: "Apartment",
    description:
      "Spacious three-bedroom apartment in convenient Al Barsha location. This 1,900 sq.ft. residence offers excellent value for families seeking central Dubai living with easy access to major attractions.",
    extendedInfo:
      "The apartment features family-friendly layout with modern finishes and ample storage. Located in a well-established community with schools, parks, and retail facilities. Excellent connectivity to Sheikh Zayed Road and Mall of the Emirates.",
    features: [
      "Family Layout",
      "Central Location",
      "Spacious",
      "Community Pool",
      "Schools Nearby",
      "Mall of Emirates",
      "Metro Access",
      "Parking",
    ],
    images: ["/modern-mansion-exterior.jpg", "/luxury-interior-1.jpg", "/luxury-interior-2.jpg"],
    specs: [
      { label: "Annual Rent", value: "AED 160,000" },
      { label: "Payment", value: "4 Cheques" },
      { label: "Listing ID", value: "SPMC-AB3-020" },
      { label: "Status", value: "Available" },
    ],
  },
}

const getProp = (id: string) => PROPERTY_DATA[id] || PROPERTY_DATA["dubai-marina-penthouse"]

const getListingId = (prop: any, fallbackId: string) => {
  const listingSpec = prop.specs?.find((spec: any) => spec.label === "Listing ID")
  return listingSpec?.value || fallbackId
}

export default function PropertyDetail() {
  const params = useParams()
  const id = params.id as string
  const prop = getProp(id)
  const propertyId = getListingId(prop, id)
  const [isLiked, setIsLiked] = useState(false)
  const [isShared, setIsShared] = useState(false)
  const [isCallModalOpen, setIsCallModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Gallery */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-accent/5 to-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
              <div className="flex-1">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-3 text-accent font-bold uppercase tracking-widest text-xs mb-4"
                >
                  <MapPin className="w-4 h-4" />
                  <span>{prop.location}</span>
                  <Badge className="bg-accent text-white text-xs px-2 py-1">{prop.type}</Badge>
                </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tighter leading-none mb-4"
                >
                  {prop.title}
                </motion.h1>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-6 text-muted-foreground"
                >
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    <span className="text-sm">{prop.neighborhood}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <Star className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm ml-1">(4.8)</span>
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col items-end gap-6"
              >
                <div className="flex gap-3">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsShared(!isShared)
                      navigator.share?.({ title: prop.title, url: window.location.href })
                    }}
                    className={`p-3 rounded-full border-2 transition-all ${
                      isShared ? 'bg-accent text-white border-accent' : 'bg-white border-gray-200 hover:border-accent hover:bg-accent/5'
                    }`}
                  >
                    <Share2 className="w-5 h-5" />
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-3 rounded-full border-2 transition-all ${
                      isLiked ? 'bg-destructive text-white border-destructive' : 'bg-white border-gray-200 hover:border-destructive hover:bg-destructive/5'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  </motion.button>
                </div>
                <div className="text-right bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-2">
                    Asking Price
                  </p>
                  <p className="text-3xl md:text-4xl font-serif font-bold text-accent">{prop.price}</p>
                  <div className="mt-3 flex gap-2 justify-end">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                      {prop.price.includes('/year') ? 'For Lease' : 'For Sale'}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <PropertyCarousel images={prop.images} title={prop.title} />
          </motion.div>
        </div>
      </section>

      {/* Enhanced Stats Bar */}
      <div className=" top-6 z-40 bg-white backdrop-blur-lg border-y border-gray-200 shadow-lg">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-4 p-5 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl hover:from-accent/15 hover:to-accent/10 transition-all duration-300 border border-accent/20 shadow-md hover:shadow-lg"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent/80 text-white flex items-center justify-center shadow-lg">
                <Bed className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-1">Bedrooms</p>
                <p className="text-2xl font-bold text-accent">{prop.beds}</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4 p-5 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl hover:from-accent/15 hover:to-accent/10 transition-all duration-300 border border-accent/20 shadow-md hover:shadow-lg"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent/80 text-white flex items-center justify-center shadow-lg">
                <Bath className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-1">Bathrooms</p>
                <p className="text-2xl font-bold text-accent">{prop.baths}</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4 p-5 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl hover:from-accent/15 hover:to-accent/10 transition-all duration-300 border border-accent/20 shadow-md hover:shadow-lg"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent/80 text-white flex items-center justify-center shadow-lg">
                <Maximize2 className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-1">Square Ft</p>
                <p className="text-2xl font-bold text-accent">{prop.sqft.toLocaleString()}</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-4 p-5 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl hover:from-accent/15 hover:to-accent/10 transition-all duration-300 border border-accent/20 shadow-md hover:shadow-lg"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent/80 text-white flex items-center justify-center shadow-lg">
                <Calendar className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-1">Year Built</p>
                <p className="text-2xl font-bold text-accent">{prop.yearBuilt}</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="hidden lg:block"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCallModalOpen(true)}
                className="w-full px-8 py-5 bg-gradient-to-r from-accent via-accent to-accent/90 text-white rounded-2xl text-sm font-bold uppercase tracking-widest hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 border border-accent/30 shadow-lg"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-16">
            {/* Property Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-accent rounded-full"></div>
                <h2 className="text-3xl font-serif font-bold">Property Description</h2>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <p className="text-lg leading-relaxed text-gray-700">{prop.description}</p>
              </div>
            </motion.div>

            {/* Extended Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-accent rounded-full"></div>
                <h2 className="text-3xl font-serif font-bold">Extended Information</h2>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <p className="text-lg leading-relaxed text-gray-700">{prop.extendedInfo}</p>
              </div>
            </motion.div>

            {/* Key Amenities - Compact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-accent rounded-full"></div>
                <h2 className="text-3xl font-serif font-bold">Key Amenities</h2>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {prop.features.map((feature: string, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-2 p-3 bg-accent/5 rounded-xl hover:bg-accent/10 transition-colors group"
                    >
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-sm font-medium text-gray-800 truncate">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Specifications */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-accent rounded-full"></div>
                <h2 className="text-3xl font-serif font-bold">Specifications</h2>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="grid sm:grid-cols-2 gap-4">
                  {prop.specs.map((spec: any, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-accent/5 transition-colors"
                    >
                      <span className="font-medium text-gray-600">{spec.label}</span>
                      <span className="font-bold text-accent">{spec.value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Property Location Map */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-accent rounded-full"></div>
                <h2 className="text-3xl font-serif font-bold">Property Location</h2>
              </div>
              <PropertyMap 
                location={prop.location} 
                title={prop.title}
                coordinates={prop.coordinates}
              />
            </motion.div>
          </div>

          {/* Enhanced Contact Form Sidebar */}
          <div className="lg:col-span-1">
            <PropertyInquiryForm 
              propertyId={propertyId}
              propertyTitle={prop.title}
              propertyLocation={prop.location}
            />
          </div>
        </div>
      </section>

      <Footer />

      {/* Call Modal */}
      <CallModal 
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        propertyName={prop.title}
      />

    </main>
  )
}
