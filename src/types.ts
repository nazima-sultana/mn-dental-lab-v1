export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  materials: string[];
  features: string[];
  imageUrl: string;
  turnaround?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  tag: string;
}

export interface BusinessInfo {
  name: string;
  technicianName: string;
  registrationNo: string;
  qualification: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  area: string;
  city: string;
  workingHours: string;
  emergencySupport: string;
  mapsEmbedUrl: string;
  experienceYears: string;
  casesCompleted: string;
  satisfactionRate: string;
}

export interface HeroConfig {
  badge: string;
  headline: string;
  subheadline: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  bgImageUrl: string;
}

export interface AboutConfig {
  badge: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  imageUrl: string;
  highlights: string[];
}

export interface LabWebsiteData {
  business: BusinessInfo;
  hero: HeroConfig;
  about: AboutConfig;
  services: ServiceItem[];
  gallery: GalleryItem[];
  adminPassword?: string;
}
