import Link from "next/link";
import { salonConfig } from "@/data/salon-config";
import { Phone, Mail, MapPin, Instagram, Facebook, MessageCircle } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-3xl font-bold tracking-widest">{salonConfig.name}</h2>
              <p className="text-accent-soft text-sm uppercase tracking-widest mt-1 italic">
                {salonConfig.tagline}
              </p>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {salonConfig.description}
            </p>
            <div className="flex items-center space-x-4">
              <Link href={salonConfig.social.instagram} className="hover:text-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href={salonConfig.social.facebook} className="hover:text-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href={salonConfig.social.whatsapp} className="hover:text-accent transition-colors">
                <MessageCircle className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="font-serif text-xl font-bold">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-400">
                <MapPin className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <span className="text-sm">{salonConfig.contact.address}</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span className="text-sm">{salonConfig.contact.phone}</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span className="text-sm">{salonConfig.contact.email}</span>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div className="space-y-6 lg:pl-12">
            <h3 className="font-serif text-xl font-bold">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/#services" className="text-sm text-gray-400 hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/#team" className="text-sm text-gray-400 hover:text-white transition-colors">Our Team</Link></li>
              <li><Link href="/#gallery" className="text-sm text-gray-400 hover:text-white transition-colors">Gallery</Link></li>
              <li><Link href="/#location" className="text-sm text-gray-400 hover:text-white transition-colors">Location</Link></li>
              <li><Link href="/book" className="text-sm text-accent font-bold hover:text-accent-soft transition-colors tracking-widest uppercase">Book Appointment</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-gray-500">
          <p>© {currentYear} {salonConfig.name}. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
