"use client";

import React from "react";
import { salonConfig } from "@/data/salon-config";
import { Button } from "../ui/Button";
import Link from "next/link";
import { Instagram, Facebook, MessageCircle, ArrowUpRight, Star } from "lucide-react";

const css = `
  @keyframes up {
    from { opacity: 0; transform: translateY(15px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fade {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .a  { opacity: 0; animation: up   0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
  .ai { opacity: 0; animation: fade 1s ease forwards; }

  .hero-card {
    transition: all 0.7s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .main-card {
    z-index: 10;
    transform: translate(0, 0) scale(1);
    box-shadow: 0 40px 80px -15px rgba(0,0,0,0.15);
  }

  .hover-card {
    z-index: 5;
    transform: translate(30px, 30px) scale(0.95);
    opacity: 0.6;
    box-shadow: 0 15px 40px -8px rgba(0,0,0,0.1);
  }

  .card-group:hover .main-card {
    transform: translate(40px, 40px) scale(0.9);
    z-index: 5;
    opacity: 0.4;
  }

  .card-group:hover .hover-card {
    transform: translate(0, 0) scale(1);
    z-index: 10;
    opacity: 1;
    box-shadow: 0 40px 80px -15px rgba(0,0,0,0.2);
  }
`;

export default function Hero() {
  const { title, subtitle, video1, video2 } = salonConfig.hero;
  const words = title.split(" ");

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <section className="relative w-full min-h-[85vh] bg-white flex items-center overflow-hidden">
        {/* Subtle background abstract */}
        <div className="absolute top-0 right-0 w-[45%] h-full bg-surface/20 -z-1 rounded-l-[180px]" />

        <div className="container-custom w-full pt-32 pb-8 lg:pt-40 lg:pb-12">
          <div className="flex flex-col lg:flex-row items-center gap-12 xl:gap-24">
            
            {/* LEFT SIDE — Config-Driven Elegance */}
            <div className="w-full lg:w-[55%] min-w-0">
              
              {/* Eyebrow */}
              <div className="a flex items-center gap-3 mb-6" style={{ animationDelay: "0.1s" }}>
                <span className="block h-px w-8 bg-accent" />
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-accent">
                  Luxury Studio
                </span>
              </div>

              {/* Headline */}
              <h1
                className="font-serif leading-[1.01] tracking-tight text-primary mb-6"
                style={{ fontSize: "clamp(1rem, 4vw, 3rem)" }}
              >
                {words.map((word, i) => (
                  <span
                    key={i}
                    className={`a inline-block${i === 2 ? " text-accent italic" : ""}`}
                    style={{ animationDelay: `${0.15 + i * 0.07}s` }}
                  >
                    {word}{i < words.length - 1 ? "\u00A0" : ""}
                  </span>
                ))}
              </h1>

              {/* Subtitle */}
              <p
                className="a text-[0.9rem] leading-[1.65] text-secondary opacity-60 italic mb-8 max-w-md"
                style={{ animationDelay: "0.4s" }}
              >
                {subtitle}
              </p>

              {/* Combined CTAs & Socials */}
              <div className="a flex flex-wrap items-center gap-x-10 gap-y-6 mb-8" style={{ animationDelay: "0.5s" }}>
                <div className="flex items-center gap-6">
                  <Button
                    size="md"
                    className="group rounded-full px-7 py-3 text-[0.7rem] font-bold tracking-[0.2em] uppercase flex items-center gap-2 shadow-soft hover:shadow-elevated"
                    asChild
                  >
                    <Link href="/book">
                      Book Now
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </Button>
                  <Link
                    href="#services"
                    className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-secondary/50 hover:text-accent transition-colors border-b border-accent/20 pb-1"
                  >
                    Explore
                  </Link>
                </div>
                
                <div className="flex items-center gap-5 border-l border-border/80 pl-6">
                  {[
                    { href: salonConfig.social.instagram, Icon: Instagram },
                    { href: salonConfig.social.facebook, Icon: Facebook },
                    { href: salonConfig.social.whatsapp, Icon: MessageCircle },
                  ].map(({ href, Icon }) => (
                    <Link key={href} href={href} className="text-secondary/30 hover:text-accent transition-colors">
                      <Icon className="w-4 h-4" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Reviews Section */}
              <div className="a flex items-center gap-6 pt-8 border-t border-border/40 max-w-sm" style={{ animationDelay: "0.6s" }}>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-surface overflow-hidden shadow-sm">
                      <img src={`https://i.pravatar.cc/100?img=${i + 30}`} alt="Reviewer" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-7 h-7 rounded-full border-2 border-white bg-accent flex items-center justify-center text-[7px] font-bold text-white">
                    +5k
                  </div>
                </div>
                <div className="flex flex-col">
                   <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-accent text-accent" />
                    ))}
                    <span className="text-[9px] font-bold text-primary ml-1">4.9/5</span>
                  </div>
                  <span className="text-[8px] uppercase tracking-widest text-secondary font-bold opacity-30 mt-0.5">Verified Artistry Reviews</span>
                </div>
              </div>

            </div>

            {/* RIGHT SIDE — Config-Driven Videos */}
            <div className="ai w-full lg:w-[45%] pr-20 flex justify-center lg:justify-end" style={{ animationDelay: "0.3s" }}>
              <div className="card-group relative w-full max-w-[320px] h-[460px] cursor-pointer">
                
                {/* BOTTOM (Video 2 from Config) */}
                <div className="hero-card hover-card absolute inset-0 rounded-[40px] overflow-hidden bg-surface ring-1 ring-black/5">
                  <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                    <source src={video2 || ""} type="video/mp4" />
                  </video>
                </div>

                {/* TOP (Video 1 from Config) */}
                <div className="hero-card main-card absolute inset-0 rounded-[40px] overflow-hidden bg-black ring-1 ring-black/5">
                  <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                    <source src={video1 || ""} type="video/mp4" />
                  </video>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}