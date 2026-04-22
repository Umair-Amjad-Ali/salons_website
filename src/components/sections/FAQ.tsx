"use client";

import { salonConfig } from "@/data/salon-config";
import { Accordion } from "../ui";
import { motion } from "framer-motion";

export default function FAQ() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden" id="faq">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-surface via-background to-surface" />

      {/* Decorative accent line - top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-accent/30 to-transparent" />

      {/* Large decorative watermark */}
      <div className="absolute -right-10 top-1/2 -translate-y-1/2 select-none pointer-events-none hidden lg:block">
        <span className="text-[280px] font-serif font-bold leading-none text-accent/4 tracking-tighter">
          FAQ
        </span>
      </div>

      {/* Decorative dots pattern */}
      <div className="absolute top-16 left-8 hidden lg:grid grid-cols-5 gap-2 opacity-20">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full bg-accent" />
        ))}
      </div>

      <div className="container-custom relative z-10 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-24 items-start">

          {/* Left: Sticky Header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:sticky lg:top-28"
          >
            {/* Accent badge */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-8 h-px bg-accent" />
              <span className="text-[11px] tracking-[0.2em] uppercase text-accent font-medium">
                Need to know
              </span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.4rem] font-normal leading-[1.15] mb-6">
              Frequently{" "}
              <br className="hidden md:block" />
              <em className="text-accent font-normal not-italic">
                Asked
              </em>
              <br />
              Questions
            </h2>

            <p className="text-secondary text-sm leading-relaxed max-w-xs mb-10">
              Everything you need before your first visit — or your hundredth.
              We&apos;re here to make your experience seamless.
            </p>

            {/* Quick contact CTA */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-accent/6 border border-accent/10">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <svg
                  className="w-4 h-4 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-secondary">Still have questions?</p>
                <p className="text-sm font-medium text-primary">
                  Contact us anytime
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Accordion items={salonConfig.faqs} />
          </motion.div>

        </div>
      </div>

      {/* Decorative accent line - bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-accent/30 to-transparent" />
    </section>
  );
}