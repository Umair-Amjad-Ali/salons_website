export interface Salon {
  name: string;
  tagline: string;
  description: string;
  theme: ThemeConfig;
  hero: HeroConfig;
  contact: ContactConfig;
  social: SocialConfig;
  services: ServiceCategory[];
  professionals: Professional[];
  gallery: { src: string; category: string }[];
  location: LocationConfig;
  workingHours: WorkingHours;
  faqs: FAQ[];
}

export interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  accentSoft: string;
  background: string;
  surface: string;
  border: string;
}

export interface HeroConfig {
  title: string;
  subtitle: string;
  image: string;
  video1?: string | null;
  video2?: string | null;
  images: string[];
  stats?: { value: string; label: string }[];
}

export interface ContactConfig {
  phone: string;
  email: string;
  address: string;
}

export interface SocialConfig {
  instagram: string;
  facebook: string;
  whatsapp: string;
}

export interface ServiceCategory {
  category: string;
  items: Service[];
}

export interface Service {
  id: number | string;
  name: string;
  price: number;
  duration: number; // in minutes
  description?: string;
}

export interface Professional {
  id: number;
  name: string;
  role: string;
  image: string;
  skills: number[];
  bio?: string;
}

export interface LocationConfig {
  address: string;
  city: string;
  lat: number;
  lng: number;
  mapEmbedUrl: string;
}

export interface WorkingHour {
  open: string;
  close: string;
  closed?: boolean;
}

export interface WorkingHours {
  monday: WorkingHour;
  tuesday: WorkingHour;
  wednesday: WorkingHour;
  thursday: WorkingHour;
  friday: WorkingHour;
  saturday: WorkingHour;
  sunday: WorkingHour;
}

export interface FAQ {
  q: string;
  a: string;
}
