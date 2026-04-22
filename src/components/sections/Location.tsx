import { salonConfig } from "@/data/salon-config";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Location() {
  return (
    <section id="location" className="py-10 bg-white px-4">
      <div className="container-custom">
        <div className="text-left mb-16">
          <h2 className="text-accent uppercase tracking-widest text-sm font-bold mb-4">Visit Us</h2>
          <h3 className="text-4xl md:text-5xl font-serif">Salon Location</h3>
        </div>

        <div className="bg-surface rounded-3xl overflow-hidden shadow-soft border border-border grid grid-cols-1 lg:grid-cols-3">
          {/* Info Side */}
          <div className="p-8 md:p-12 lg:col-span-1 border-b lg:border-b-0 lg:border-r border-border flex flex-col justify-between">
            <div className="space-y-12">
              <div>
                <h4 className="text-xl font-bold mb-6 flex items-center">
                  <MapPin className="w-5 h-5 mr-3 text-accent" />
                  Find Us
                </h4>
                <p className="text-secondary leading-relaxed">
                  {salonConfig.contact.address} <br />
                  {salonConfig.location.city}
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-6 flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-accent" />
                  Get in Touch
                </h4>
                <ul className="space-y-4">
                  <li className="text-secondary">{salonConfig.contact.phone}</li>
                  <li className="text-secondary">{salonConfig.contact.email}</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-6 flex items-center">
                  <Clock className="w-5 h-5 mr-3 text-accent" />
                  Working Hours
                </h4>
                <p className="text-secondary font-medium">
                  {salonConfig.workingHours.monday.open} - {salonConfig.workingHours.monday.close} (Mon-Thu)
                </p>
              </div>
            </div>

            <div className="pt-12">
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(salonConfig.contact.address + ", " + salonConfig.location.city)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-accent font-bold uppercase tracking-widest text-xs hover:text-accent-soft transition-colors"
              >
                Get Directions ↗
              </a>
            </div>
          </div>

          {/* Map Side */}
          <div className="lg:col-span-2 h-[450px] lg:h-auto min-h-[400px]">
            <iframe
              title="Salon Map"
              src={salonConfig.location.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="filter grayscale saturate-50 hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
