"use client";

import * as React from "react";
import { salonConfig } from "@/data/salon-config";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = React.useState<{ src: string; category: string } | null>(null);

  return (
    <section id="gallery" className="py-10 bg-[#fafafa] overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-4 block"
            >
              Excellence in Detail
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-serif text-primary leading-tight"
            >
              Visual Transformaton
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-secondary max-w-sm italic text-lg leading-relaxed"
          >
            "Beauty is in the balance of art and science. Explore our curated portfolio of artistic excellence."
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
          {salonConfig.gallery.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.05,
                ease: [0.21, 0.47, 0.32, 0.98] 
              }}
              className={cn(
                "relative group cursor-pointer overflow-hidden rounded-3xl bg-surface",
                // Advanced Bento Spans for 11 Items
                index === 0 && "md:col-span-2 md:row-span-2",
                index === 1 && "md:col-span-2",
                index === 5 && "md:col-span-2",
                index === 6 && "md:row-span-2",
                (index === 10 || index === 11) && "md:col-span-2"
              )}
              onClick={() => setSelectedImage(item)}
            >
              {/* Image with subtle parallax/scale on hover */}
              <div className="absolute inset-0 transition-transform duration-1000 ease-out group-hover:scale-110">
                <Image
                  src={item.src}
                  alt={item.category}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority={index < 3}
                />
              </div>

              {/* Sophisticated Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out flex flex-col justify-end p-6 md:p-8">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-start gap-2"
                >
                  <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <h4 className="text-white text-xl md:text-2xl font-serif">View Details</h4>
                    <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white backdrop-blur-sm group-hover:bg-white group-hover:text-primary transition-colors duration-300">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Minimal category chip visible always (optional, let's keep it clean) */}
              <div className="absolute top-4 left-4 py-1 px-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                 <span className="text-[10px] text-white font-bold tracking-widest uppercase">
                    {item.category}
                 </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Footer */}
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.5 }}
           className="mt-16 text-center"
        >
          <a 
            href={salonConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-secondary hover:text-accent transition-colors tracking-widest font-medium group"
          >
            Follow our journey on Instagram
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </motion.div>
      </div>

      {/* Premium Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/95 backdrop-blur-3xl flex items-center justify-center p-6 md:p-20"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button 
              whileHover={{ rotate: 90 }}
              className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors z-110"
            >
              <X className="w-10 h-10" />
            </motion.button>
            
            <motion.div
              layoutId={`image-${selectedImage.src}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-6xl h-full flex flex-col md:flex-row gap-8 items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-1 w-full h-full rounded-2xl overflow-hidden ring-1 ring-white/10">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.category}
                  fill
                  className="object-contain"
                />
              </div>
              
              <div className="w-full md:w-80 flex flex-col items-start gap-4">
                 <span className="text-accent tracking-[0.3em] text-[10px] font-bold uppercase">
                    {selectedImage.category}
                 </span>
                 <h3 className="text-white text-3xl font-serif">Signature {selectedImage.category}</h3>
                 <p className="text-white/60 text-sm leading-relaxed">
                   Handcrafted excellence by our master artists. This look demonstrates our commitment to precision and individual aesthetic.
                 </p>
                 <div className="h-px w-full bg-white/10 my-4" />
                 <button 
                  onClick={() => setSelectedImage(null)}
                  className="w-full py-4 px-6 border border-white/20 text-white text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-primary transition-all duration-500 rounded-lg"
                 >
                   Close Gallery
                 </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

