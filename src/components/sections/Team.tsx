"use client";

import { salonConfig } from "@/data/salon-config";
import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram, Star } from "lucide-react";

export default function Team() {
  return (
    <section id="team" className="py-24 bg-white px-4">
      <div className="container-custom">
        <div className="text-left mb-16">
          <h2 className="text-accent uppercase tracking-widest text-sm font-bold mb-4">Meet the Experts</h2>
          <h3 className="text-4xl md:text-5xl font-serif">Master Artists</h3>
          <p className="text-secondary mt-4 max-w-xl italic">
            Passionate professionals dedicated to perfecting your unique style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {salonConfig.professionals.map((pro, index) => (
            <motion.div
              key={pro.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group"
            >
              <div className="relative aspect-3/4 overflow-hidden rounded-2xl mb-6 shadow-soft group-hover:shadow-elevated transition-shadow">
                <Image
                  src={pro.image}
                  alt={pro.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                  <p className="text-white/80 text-sm mb-4 leading-relaxed line-clamp-3 italic">
                    {pro.bio}
                  </p>
                  <div className="flex space-x-4">
                    <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-accent hover:text-white transition-colors">
                      <Instagram className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-left">
                <div className="flex items-center justify-start space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                  ))}
                </div>
                <h4 className="text-2xl font-serif font-bold mb-1">{pro.name}</h4>
                <p className="text-accent text-sm uppercase tracking-[0.2em] font-bold">
                  {pro.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
