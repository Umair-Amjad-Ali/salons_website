"use client";

import { salonConfig } from "@/data/salon-config";
import Image from "next/image";
import { Instagram, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export default function Team() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pros = salonConfig.professionals;
  
  // Calculate how many items to show based on screen width
  const [visibleItems, setVisibleItems] = useState(3);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleItems(1);
      else if (window.innerWidth < 1024) setVisibleItems(2);
      else setVisibleItems(3);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, pros.length - visibleItems);

  // Auto-scroll logic
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= maxIndex) return 0;
        return prev + 1;
      });
    }, 3000); // Rotate every 3 seconds

    return () => clearInterval(interval);
  }, [isPaused, maxIndex]);

  const nextStep = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevStep = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section id="team" className="pt-10 pb-24 bg-white overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 px-4">
          <div className="text-left">
            <h2 className="text-accent uppercase tracking-widest text-sm font-bold mb-4">Meet the Experts</h2>
            <h3 className="text-4xl md:text-5xl font-serif">Master Artists</h3>
            <p className="text-secondary mt-4 max-w-xl italic">
              Passionate professionals dedicated to perfecting your unique style.
            </p>
          </div>
          
          <div className="flex gap-3 mt-8 md:mt-0">
            <button 
              onClick={prevStep}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextStep}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div 
          className="relative px-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden">
            <div 
              className="flex gap-6 md:gap-8 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(calc(-${currentIndex * (100 / visibleItems)}% - ${currentIndex * (visibleItems > 1 ? (visibleItems === 3 ? 32 : 24) : 0) / visibleItems}px))` }}
            >
              {pros.map((pro) => (
                <div 
                  key={pro.id} 
                  className={cn(
                    "shrink-0 transition-all duration-500",
                    visibleItems === 3 ? "w-[calc((100%-64px)/3)]" : 
                    visibleItems === 2 ? "w-[calc((100%-24px)/2)]" : "w-full"
                  )}
                >
                  <div className="group bg-surface/30 rounded-[2.5rem] p-4 md:p-6 border border-transparent hover:border-accent/10 hover:bg-white hover:shadow-elevated transition-all duration-500">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] mb-6 shadow-soft">
                      <Image
                        src={pro.image}
                        alt={pro.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                        <p className="text-white/90 text-sm italic line-clamp-3 mb-4 leading-relaxed">
                          "{pro.bio}"
                        </p>
                        <div className="flex gap-3">
                          <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-accent transition-colors">
                            <Instagram className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="flex justify-center space-x-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                        ))}
                      </div>
                      <h4 className="text-xl md:text-2xl font-serif font-bold mb-1 group-hover:text-accent transition-colors">
                        {pro.name}
                      </h4>
                      <p className="text-accent text-[10px] uppercase tracking-[0.2em] font-bold">
                        {pro.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-12">
          {[...Array(maxIndex + 1)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                currentIndex === idx ? "w-6 bg-accent" : "w-1.5 bg-accent/20 hover:bg-accent/40"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
