"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "../ui/Button";
import { salonConfig } from "@/data/salon-config";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";

  const navLinks = [
    { name: "Services", href: "/#services" },
    { name: "Team", href: "/#team" },
    { name: "Gallery", href: "/#gallery" },
    { name: "Location", href: "/#location" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-soft py-3"
          : "bg-white/50 backdrop-blur-md py-5 border-b border-border/50"
      )}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col">
          <span className="font-serif text-2xl font-bold tracking-widest leading-none text-primary">
            {salonConfig.name}
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-secondary">
            {salonConfig.tagline}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-semibold uppercase tracking-wider text-primary hover:text-accent transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Button
            asChild
            variant="primary"
          >
            <Link href="/book">Book Now</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="text-primary" />
          ) : (
            <Menu className="text-primary" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-elevated p-6 lg:hidden flex flex-col space-y-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-bold font-serif border-b border-border pb-2"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-4 pt-4">
              <Link
                href={`tel:${salonConfig.contact.phone}`}
                className="flex items-center space-x-2 text-primary font-semibold"
              >
                <Phone className="w-5 h-5 text-accent" />
                <span>{salonConfig.contact.phone}</span>
              </Link>
              <Button onClick={() => setMobileMenuOpen(false)} asChild>
                <Link href="/book">Book Now</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// Add asChild support to Button if needed, or just use Link inside Button
