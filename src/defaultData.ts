import { LabWebsiteData } from './types';

export const DEFAULT_LAB_DATA: LabWebsiteData = {
  business: {
    name: "M.N Dental Laboratory",
    technicianName: "Mohd. Ahmed Uddin",
    registrationNo: "Regd. No. DM305, SSCDS DCI",
    qualification: "Certified Dental Technician (DCI Registered)",
    tagline: "Design in Esthetic Crowns & Bridges",
    phone: "7981635546",
    whatsapp: "917981635546",
    email: "contact.mndentallab@gmail.com",
    address: "Asif Nagar, Karwan, Tappa Chabutra, Hyderabad, Telangana 500006",
    area: "Asif Nagar, Karwan, Tappa Chabutra",
    city: "Hyderabad, India",
    workingHours: "Monday – Saturday: 9:30 AM – 8:30 PM (Sunday: Prior Appointment)",
    emergencySupport: "Express Clinic Turnaround Available on Request",
    // Embed map centered on Asif Nagar, Karwan, Tappa Chabutra, Hyderabad
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.643329124434!2d78.43729357493466!3d17.380894083503527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb97495b5e6fb1%3A0x67ee1c5d985dbcfb!2sTappa%20Chabutra%2C%20Karwan%2C%20Hyderabad%2C%20Telangana%20500006!5e0!3m2!1sen!2sin!4v1710420000000!5m2!1sen!2sin",
    experienceYears: "15+ Years",
    casesCompleted: "12,000+",
    satisfactionRate: "99.4%"
  },
  hero: {
    badge: "Government DCI Registered Lab • Regd. No. DM305",
    headline: "Precision Dental Craftsmanship & Esthetic Excellence",
    subheadline: "Specialized in High-Translucency Zirconia, Custom Implant Prostheses, DMLS, and Lifelike Anterior Crowns & Bridges for leading dental practitioners across Hyderabad.",
    primaryCtaText: "Call Mohd. Ahmed Uddin",
    secondaryCtaText: "Send Case on WhatsApp",
    // High-resolution dental model & aesthetic crown setup
    bgImageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1920&q=80"
  },
  about: {
    badge: "About Mohd. Ahmed Uddin & M.N Dental Lab",
    title: "Dedicated to Micro-Precision, Biocompatibility & Natural Aesthetics",
    subtitle: "Led by Senior Dental Technician Mohd. Ahmed Uddin (Regd. No. DM305, SSCDS DCI), M.N Dental Laboratory delivers medical-grade prosthetic restorations tailored to exact clinical specifications.",
    paragraphs: [
      "At M.N Dental Laboratory, we combine traditional craftsmanship with advanced prosthetic workflows to fabricate dental restorations that match natural tooth anatomy, optical translucency, and precise marginal integrity.",
      "Serving dental surgeons and clinics throughout Hyderabad from our facility in Asif Nagar / Karwan / Tappa Chabutra, we specialize in high-end Zirconia milling, precision DMLS laser-sintered copings, multi-unit implant restorations, and durable complete dentures.",
      "Every restoration is meticulously inspected under magnification for marginal adaptation, contact tightness, and functional occlusion—ensuring zero chairside adjustment time for the dentist and maximum comfort for the patient."
    ],
    // High-resolution dental technician crafting restorative crown
    imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Strict marginal fit under microscopic inspection",
      "Certified biocompatible medical-grade raw materials",
      "VITA 3D-Master & Classic shade matching precision",
      "Express pickup and delivery for Hyderabad dental clinics",
      "Comprehensive warranty on multilayer zirconia restorations"
    ]
  },
  services: [
    {
      id: "srv-implants",
      title: "Implant Prostheses",
      category: "Implantology",
      description: "Custom titanium and zirconia abutments, screw-retained and cement-retained crowns, full-arch hybrid restorations, and precision multi-unit systems designed for optimal emergence profile and long-term peri-implant tissue health.",
      materials: [
        "Medical Grade V Titanium Abutments",
        "Zirconia Mesostructures with Titanium Bases",
        "Screw-Retained Multi-Unit Frameworks",
        "Passive-Fit Full Arch Hybrids"
      ],
      features: [
        "Exact emergence profile contouring",
        "Zero micro-gap interface guarantee",
        "Compatible with all major implant platforms",
        "Torque-tested titanium screw engagement"
      ],
      // Dental implant model with custom abutment
      imageUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80",
      turnaround: "3 - 5 Working Days"
    },
    {
      id: "srv-zirconia-dmls",
      title: "Zirconia, PFM, DMLS, N.C & Acrylic Work",
      category: "Fixed & Removable Prosthetics",
      description: "Complete spectrum of restorative prosthetic engineering: high-translucency multilayer zirconia, Direct Metal Laser Sintering (DMLS) cobalt-chromium copings, porcelain-fused-to-metal (PFM), non-precious cast metal (N.C), and high-impact acrylic restorations.",
      materials: [
        "Multilayer Gradient Zirconia (1200 MPa / 600 MPa incisal)",
        "DMLS Laser Sintered Co-Cr Alloy (Pore-free)",
        "Premium Dental Ceramic Feldspathic Porcelain",
        "Cross-Linked High Impact Acrylics"
      ],
      features: [
        "Zero porosity with laser DMLS technology",
        "Natural cervical to incisal color graduation",
        "Chip-resistant porcelain layering bond",
        "Superior flexural strength for posterior bridges"
      ],
      // Dental crown zirconia models and copings
      imageUrl: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80",
      turnaround: "2 - 4 Working Days"
    },
    {
      id: "srv-complete-denture",
      title: "Complete Denture & Removable Work",
      category: "Removable Prosthodontics",
      description: "Anatomically balanced complete dentures, cast partial denture frameworks, flexible nylon dentures, and tissue-friendly temporary replacements. Crafted with high-impact polymer resins and wear-resistant prosthetic teeth.",
      materials: [
        "High-Impact Lucitone / Heat Cure Acrylic Resin",
        "Multi-Crosslinked Anatomical Acrylic Teeth",
        "Flexible Polyamide Thermoplastic Bases",
        "Cobalt-Chromium Cast Partial Frameworks"
      ],
      features: [
        "Bilateral balanced occlusion setups",
        "Natural gingival stippling and characterization",
        "High fracture resistance and suction retention",
        "Hypoallergenic biocompatible resin options"
      ],
      // Denture model close-up
      imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
      turnaround: "3 - 4 Working Days"
    },
    {
      id: "srv-esthetic-crowns",
      title: "Esthetic Crowns & Bridges",
      category: "Aesthetic Dentistry",
      description: "Our signature specialty. Lifelike anterior smile design, ultra-thin lithium disilicate (E.max) veneers, multi-unit anterior bridges, and handcrafted monolithic restorations with individualized mamelon characterization and incisal translucency.",
      materials: [
        "Lithium Disilicate Glass Ceramic (E.max)",
        "High Translucency Multi-Shade Zirconia",
        "Micro-Hybrid Composite Inlays / Onlays",
        "Individualized Surface Lustre Glazes"
      ],
      features: [
        "Mimics natural enamel light refraction",
        "Precision contact points and embrasures",
        "Shade mapping against clinical digital photographs",
        "Minimal preparation veneer fabrication"
      ],
      // Beautiful aesthetic dental smile restoration
      imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
      turnaround: "3 - 5 Working Days"
    }
  ],
  gallery: [
    {
      id: "gal-1",
      title: "High-Translucency Anterior Zirconia Crowns",
      category: "Esthetic Crowns & Bridges",
      description: "4-unit anterior restoration fabricated in multilayer high-translucency zirconia with custom incisal halo characterization.",
      imageUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80",
      tag: "Anterior Aesthetic"
    },
    {
      id: "gal-2",
      title: "Custom Titanium Abutment & Screw-Retained Crown",
      category: "Implant Prostheses",
      description: "Milled titanium abutment with ideal emergence profile and screw-retained zirconia crown for molar replacement.",
      imageUrl: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80",
      tag: "Implant Case"
    },
    {
      id: "gal-3",
      title: "Precision DMLS Laser Sintered 6-Unit Bridge",
      category: "Zirconia, PFM, DMLS, N.C",
      description: "Pore-free DMLS cobalt-chromium substructure layered with premium ceramic porcelain for optimal fit and fracture resistance.",
      imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
      tag: "DMLS Framework"
    },
    {
      id: "gal-4",
      title: "Anatomical Complete Denture with Gingival Contouring",
      category: "Complete Denture",
      description: "Full upper and lower complete denture fabricated in high-impact acrylic with balanced occlusion and natural root prominence carving.",
      imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
      tag: "Complete Denture"
    },
    {
      id: "gal-5",
      title: "Lithium Disilicate E.max Aesthetic Veneers",
      category: "Esthetic Crowns & Bridges",
      description: "Ultra-thin 0.3mm minimally invasive veneers delivering optical depth, opalescence, and natural fluorescence.",
      imageUrl: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=800&q=80",
      tag: "Smile Makeover"
    },
    {
      id: "gal-6",
      title: "Full-Arch Hybrid Implant Prosthetic Framework",
      category: "Implant Prostheses",
      description: "Passive-fit multi-unit implant bridge designed for complete edentulous rehabilitation with high mechanical endurance.",
      imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
      tag: "Full Arch Rehab"
    }
  ],
  adminPassword: "admin"
};
