"use client";

import React from "react";
import { salonConfig } from "@/data/salon-config";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Services() {
  const categories = salonConfig?.services || [];
  const [activeCategory, setActiveCategory] = React.useState(categories[0]?.category || "");

  const activeServices = categories.find(s => s.category === activeCategory)?.items || [];

  if (categories.length === 0) return null;

  return (
    <section id="services" className="py-24 bg-[#FAFAFA]">
      <div className="container-custom">
        
        {/* Beautiful Left-Aligned Header */}
        <div className="mb-16">
          <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
            Our Treatments
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-primary leading-tight">
            Artistic Services
          </h2>
          <p className="text-secondary/70 max-w-2xl mt-6 italic text-lg leading-relaxed">
            Discover a world where elite science meets bespoke artistry. Explore our curated menu of luxury treatments designed to unveil your unique radiance.
          </p>
        </div>

        {/* Compressed Button Selector */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(cat.category)}
              className={cn(
                "px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-300 border shadow-sm",
                activeCategory === cat.category 
                  ? "bg-primary text-white border-primary shadow-md -translate-y-0.5" 
                  : "bg-white text-secondary/60 border-border/60 hover:border-accent hover:text-accent"
              )}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Compressed 3D Card Layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {activeServices.map((service) => (
              <div 
                key={service.id} 
                className="group relative bg-white p-7 rounded-[28px] border border-border/40 shadow-[0_10px_25px_-10px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_50px_-15px_rgba(0,0,0,0.1)]"
              >
                {/* 3D Depth Visual */}
                <div className="absolute inset-0 bg-accent/5 rounded-[28px] translate-y-1.5 translate-x-1 -z-1 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="text-xl font-serif text-primary group-hover:text-accent transition-colors">
                    {service.name}
                  </h4>
                  <span className="text-xl font-serif font-black text-accent">
                    ${Number(service.price)}
                  </span>
                </div>
                
                <p className="text-accent text-[8px] font-black uppercase tracking-[0.2em] mb-4 inline-block bg-accent/5 px-2.5 py-1 rounded-full">
                  {service.duration} Minutes
                </p>

                <p className="text-secondary/60 text-sm leading-relaxed mb-6 italic line-clamp-2">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-border/10">
                    <Link href="/book" className="text-[9px] font-black uppercase tracking-[0.2em] text-primary hover:text-accent transition-all">
                      Reserve Now
                    </Link>
                    <div className="w-6 h-px bg-border/40 group-hover:w-12 group-hover:bg-accent transition-all duration-500" />
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Compressed Section Footer */}
        {/* <div className="mt-12">
          <Button variant="outline" className="rounded-full border border-primary text-primary px-10 py-5 font-black text-[9px] uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all transform hover:scale-105" asChild>
            <Link href="/book">Full Menu</Link>
          </Button>
        </div> */}

      </div>
    </section>
  );
}
