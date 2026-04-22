"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true, margin: "-50px" }}
            className={cn(
              "group relative rounded-2xl transition-all duration-500",
              isOpen
                ? "bg-linear-to-br from-accent/6 via-accent/3 to-transparent border border-accent/15 shadow-[0_8px_40px_-12px_rgba(200,169,126,0.15)]"
                : "bg-white/60 border border-border/60 hover:border-accent/20 hover:shadow-[0_4px_24px_-8px_rgba(200,169,126,0.1)]"
            )}
          >
            {/* Accent corner decoration when open */}
            {isOpen && (
              <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none overflow-hidden rounded-tr-2xl">
                <div className="absolute top-0 right-0 w-px h-12 bg-linear-to-bb from-accent/30 to-transparent" />
                <div className="absolute top-0 right-0 h-px w-12 bg-linear-to-l from-accent/30 to-transparent" />
              </div>
            )}

            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex items-center gap-5 w-full text-left px-6 py-5 md:px-8 md:py-6 cursor-pointer"
            >
              {/* Number badge */}
              <span
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-xl text-[12px] font-mono tracking-wider shrink-0 transition-all duration-500",
                  isOpen
                    ? "bg-accent text-white shadow-md shadow-accent/25"
                    : "bg-surface text-secondary group-hover:bg-accent/10 group-hover:text-accent"
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Question */}
              <span
                className={cn(
                  "flex-1 font-serif text-base md:text-lg font-normal leading-snug transition-colors duration-300",
                  isOpen
                    ? "text-primary"
                    : "text-primary/80 group-hover:text-primary"
                )}
              >
                {item.q}
              </span>

              {/* Toggle icon */}
              <span
                className={cn(
                  "relative w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-500",
                  isOpen
                    ? "bg-accent/10 rotate-45"
                    : "bg-transparent group-hover:bg-surface"
                )}
              >
                <svg
                  className={cn(
                    "w-4 h-4 transition-colors duration-300",
                    isOpen ? "text-accent" : "text-secondary group-hover:text-accent"
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 md:px-8 md:pb-7">
                    {/* Separator */}
                    <div className="mb-5 flex items-center gap-3">
                      <div className="h-px flex-1 bg-linear-to-r from-accent/20 to-transparent" />
                    </div>

                    <div className="pl-[60px]">
                      <p className="text-[15px] text-secondary leading-[1.8] tracking-wide">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}