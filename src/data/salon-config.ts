import { Salon } from "@/types";

export const salonConfig: Salon = {
  name: "LUXE GLOW",
  tagline: "Premium Beauty Experience",
  description: "Elite beauty studio specializing in couture hair artistry, advanced skin therapy, and bridal glam. We combine modern luxury with timeless techniques to accentuate your natural radiance.",
  theme: {
    primary: "#111111",
    secondary: "#6B6B6B",
    accent: "#C8A97E",
    accentSoft: "#E7D3B1",
    background: "#FFFFFF",
    surface: "#F9F9F9",
    border: "#E5E5E5",
  },

  hero: {
    title: "Unveil Your Inner Radiance",
    subtitle: "Luxury hair and skin services tailored to your unique beauty. Experience the elite standard of Dallas's finest studio.",
    image: "/images/hero-salon.png",
    video1: "/videos/salon_hero.mp4",
    video2: "/videos/salon_hero_2.mp4",
    stats: [
      { value: '5K+', label: 'Happy Clients' },
      { value: '10+', label: 'Master Artists' },
      { value: '50+', label: 'Premium Services' },
    ],
    images: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620331311520-246422ff83fb?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=600&auto=format&fit=crop',
    ]
  },

  contact: {
    phone: "+92 300 1234567",
    email: "hello@luxeglow.com",
    address: "2400 Victory Park Ln, Dallas, TX 75219",
  },

  social: {
    instagram: "https://instagram.com/luxeglow",
    facebook: "https://facebook.com/luxeglow",
    whatsapp: "https://wa.me/923001234567",
  },

  services: [
    {
      category: "Hair Artistry",
      items: [
        { id: 1, name: "Couture Haircut", price: 85, duration: 60, description: "Precision layering and face-framing tailored to your feature profile." },
        { id: 2, name: "Signature Balayage", price: 250, duration: 180, description: "Hand-painted sun-kissed highlights for a seamless, natural glow." },
        { id: 3, name: "Keratin Infusion", price: 350, duration: 150, description: "Premium protein treatment to eliminate frizz and add liquid-gold shine." },
        { id: 4, name: "Silk Press & Style", price: 120, duration: 90, description: "Transform natural textures into mirror-like smoothness and bounce." },
        { id: 5, name: "Scalp Detox Therapy", price: 95, duration: 45, description: "Deep exfoliation and nourishment to promote hair density and health." },
      ]
    },
    {
      category: "Skin & Spa",
      items: [
        { id: 6, name: "HydraFacial Elite", price: 195, duration: 75, description: "Medical-grade resurfacing clinical treatment for immediate, visible radiance." },
        { id: 7, name: "Diamond Microderm", price: 150, duration: 60, description: "Gentle physical exfoliation to reveal baby-soft, even-toned skin." },
        { id: 8, name: "Gold Leaf Facial", price: 295, duration: 90, description: "Anti-aging ritual using 24K gold leaves for lifting and tightening." },
        { id: 9, name: "Organic Body Polish", price: 175, duration: 60, description: "Full body exfoliation using Himalayan salts and essential oils." },
        { id: 10, name: "Moroccan Hammam", price: 220, duration: 120, description: "Traditional deep-cleansing ritual in our private steam suite." },
      ]
    },
    {
      category: "Bridal & Glam",
      items: [
        { id: 11, name: "Bridal Masterpiece", price: 850, duration: 240, description: "The ultimate couture bridal look with HD finish and luxury dupatta setting." },
        { id: 12, name: "Engagement Radiance", price: 450, duration: 180, description: "Soft, ethereal look focused on dewy skin and romantic details." },
        { id: 13, name: "Red Carpet Glam", price: 195, duration: 120, description: "High-impact editorial makeup for your most important events." },
        { id: 14, name: "Party Glow", price: 120, duration: 90, description: "Versatile, long-lasting glam tailored to any evening occasion." },
        { id: 15, name: "Eye Artistry", price: 75, duration: 45, description: "Focus on brows and eyes with premium lashes and precision liner." },
      ]
    },
    {
      category: "Nails & Finishing",
      items: [
        { id: 16, name: "Luxury Manicure", price: 65, duration: 45, description: "Spa-grade nail shaping, cuticle care, and high-shine polish." },
        { id: 17, name: "Gel Extensions", price: 95, duration: 90, description: "Lightweight, durable extensions with 3+ weeks of flawless wear." },
        { id: 18, name: "Artisan Nail Art", price: 45, duration: 30, description: "Hand-painted custom designs to complement your unique style." },
        { id: 19, name: "Russian Pedicure", price: 85, duration: 75, description: "Advanced hardware technique for medical-grade clean and soft feet." },
      ]
    }
  ],

  professionals: [
    { 
      id: 1, 
      name: "Ayesha Khan", 
      role: "Lead Hair Stylist", 
      image: "/images/prof-ayesha.png", 
      skills: [1, 2, 3],
      bio: "10+ years experience in luxury hair couture."
    },
    { 
      id: 2, 
      name: "Sara Ahmed", 
      role: "Skin Specialist", 
      image: "/images/prof-sara.png", 
      skills: [6, 7],
      bio: "Expert in holistic skin therapy and rejuvenation."
    },
    { 
      id: 3, 
      name: "Zoya Malik", 
      role: "Makeup Artist", 
      image: "/images/prof-ayesha.png", 
      skills: [11],
      bio: "Celebrity makeup artist specializing in bridal glam."
    },
  ],

  gallery: [
    { src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200", category: "Hair Artistry" },
    { src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1200", category: "Skin Care" },
    { src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200", category: "Makeup" },
    { src: "https://images.unsplash.com/photo-1559599101-f09722fb4948?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Luxury Spa" },
    { src: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1200", category: "Relaxation" },
    { src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200", category: "Nail Art" },
    { src: "https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=1200", category: "Styling" },
    { src: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=1200", category: "Luxury" },
    { src: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=1200", category: "Bridal" },
    { src: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=1200", category: "Facial" },
    { src: "https://images.unsplash.com/photo-1634449571017-5fecfd26ad76?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Products" },
    { src: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1200", category: "Nails" },
  ],

  location: {
    address: "2400 Victory Park Ln, Dallas, TX 75219",
    city: "Dallas, TX USA",
    lat: 32.7885,
    lng: -96.8092,
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.298132938382!2d-96.81177502345678!3d32.7885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e99158c5c5c5c%3A0x5c5c5c5c5c5c5c5c!2s2400%20Victory%20Park%20Ln%2C%20Dallas%2C%20TX%2075219!5e0!3m2!1sen!2s!4v1713512345678!5m2!1sen!2s"
  },

  workingHours: {
    monday: { open: "10:00 AM", close: "08:00 PM" },
    tuesday: { open: "10:00 AM", close: "08:00 PM" },
    wednesday: { open: "10:00 AM", close: "08:00 PM" },
    thursday: { open: "10:00 AM", close: "08:00 PM" },
    friday: { open: "02:00 PM", close: "09:00 PM" },
    saturday: { open: "10:00 AM", close: "09:00 PM" },
    sunday: { open: "10:00 AM", close: "06:00 PM" },
  },

  faqs: [
    { q: "Do I need to book in advance?", a: "While we accept walk-ins based on availability, we highly recommend booking in advance to ensure your preferred time and stylist. You can easily book online through our website or call us directly." },
    { q: "Which products do you use?", a: "We exclusively use premium, salon-grade products like L'Oréal Professionnel, Kérastase, and Dermalogica. All our products are carefully selected for their quality and effectiveness." },
    { q: "Is there parking available?", a: "Yes, we provide complimentary dedicated parking space for our clients directly in front of the salon. Valet parking is also available on weekends." },
    { q: "What is your cancellation policy?", a: "We kindly ask for at least 24 hours notice for cancellations. Late cancellations or no-shows may be subject to a fee of 50% of the booked service amount." },
    { q: "Do you offer gift cards?", a: "Absolutely! Our luxury gift cards are available in any denomination and make the perfect present. They can be purchased in-salon or online and never expire." },
    { q: "Can I bring my own reference photos?", a: "We encourage it! Bringing reference photos helps our stylists understand your vision perfectly. During your consultation we'll discuss how to achieve your desired look." },
  ],
};
