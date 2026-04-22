"use client";

import { useBookingStore } from "@/store/bookingStore";
import { cn } from "@/lib/utils";
import { ShoppingBag, Clock, X, ChevronUp, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function BookingSummary() {
  const { cart, selectedDate, selectedTime, totalPrice, totalDuration, getEndTime } =
    useBookingStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const price = totalPrice();
  const duration = totalDuration();
  const hasItems = cart.length > 0;

  const formatDuration = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h === 0) return `${m}min`;
    if (m === 0) return `${h}h`;
    return `${h}h ${m}min`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block sticky top-28 w-full group">
        <div className="bg-white rounded-[32px] border border-border p-8 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] min-h-[520px] max-h-[calc(100vh-160px)] flex flex-col relative overflow-hidden transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)]">
          
          {/* Decorative Corner Accent */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors" />

          {/* Header */}
          <div className="flex flex-col gap-1 mb-4 relative">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-accent">Summary</span>
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl font-bold text-primary">
                Your Booking
              </h3>
              {hasItems && (
                <div className="bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  {cart.length}
                </div>
              )}
            </div>
          </div>

          {/* Empty state */}
          {!hasItems && (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-6 h-6 text-border" />
              </div>
              <p className="text-primary font-bold text-sm">No services selected</p>
              <p className="text-secondary/60 text-xs mt-2 max-w-[180px]">
                Please add some treatments to begin your luxury experience.
              </p>
            </div>
          )}

          {/* Services list */}
          {hasItems && (
            <div className="space-y-1.5 mb-4 overflow-y-auto pr-2 custom-scrollbar">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40 mb-1">Selected Services</p>
              <AnimatePresence mode="popLayout" initial={false}>
                {cart.map((item) => (
                  <motion.div
                    key={String(item.service.id)}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-2.5 bg-surface/40 rounded-xl border border-transparent hover:border-accent/10 hover:bg-white transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-1">
                       <h4 className="text-[12px] font-bold text-primary leading-tight">
                         {item.service.name}
                       </h4>
                       <span className="text-[13px] font-serif font-black text-accent">
                         ${(item.service.price * item.quantity).toFixed(0)}
                       </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-md bg-accent/5">
                        <Clock className="w-2.5 h-2.5 text-accent" />
                        <span className="text-[8px] font-bold text-accent uppercase">
                          {item.service.duration}m
                        </span>
                      </div>
                      {item.preferredProfessional && (
                        <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-md bg-primary/5">
                          <User className="w-2.5 h-2.5 text-primary/60" />
                          <span className="text-[8px] font-bold text-primary/60 uppercase">
                            {item.preferredProfessional.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Footer Section */}
          <div className="mt-auto pt-4 space-y-3 relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

            {/* Date & Time */}
            {(selectedDate || selectedTime) && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                   <div className="w-1 h-1 rounded-full bg-accent animate-pulse" />
                   <p className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary/40">Appointment Schedule</p>
                </div>
                <div className="flex items-center justify-between bg-primary/5 p-3 rounded-xl border border-primary/5">
                  <div className="text-sm">
                    {selectedDate && (
                      <span className="text-primary font-bold block text-[13px]">
                        {formatDate(selectedDate)}
                      </span>
                    )}
                    {selectedTime && (
                      <span className="text-accent text-[10px] font-black uppercase tracking-wider block mt-0.5">
                        {selectedTime} {getEndTime() && `— ${getEndTime()}`}
                      </span>
                    )}
                  </div>
                  <Clock className="w-4 h-4 text-primary/20" />
                </div>
              </div>
            )}

            {/* Totals */}
            {hasItems && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-secondary/60">
                  <span>Total Duration</span>
                  <span className="text-primary">{formatDuration(duration)}</span>
                </div>
                <div className="flex items-center justify-between bg-primary p-4 rounded-xl shadow-lg shadow-primary/20">
                  <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Total cost</span>
                  <span className="text-xl font-serif font-black text-white">
                    ${price.toFixed(0)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile bottom sheet trigger */}
      {hasItems && (
        <div className="lg:hidden fixed bottom-1 left-4 right-4 z-40">
          {/* Collapsed bar */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-full bg-white border border-border px-6 py-4 flex items-center justify-between shadow-elevated rounded-2xl"
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-accent" />
              <span className="font-semibold text-primary">
                {cart.length} {cart.length === 1 ? "service" : "services"}
              </span>
              <span className="text-secondary">•</span>
              <span className="font-bold text-accent">${price.toFixed(0)}</span>
            </div>
            <ChevronUp
              className={cn(
                "w-5 h-5 text-secondary transition-transform",
                mobileOpen && "rotate-180"
              )}
            />
          </button>

          {/* Expanded sheet */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                key="mobile-sheet"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div
                  onClick={() => setMobileOpen(false)}
                  className="fixed inset-0 bg-black/30 z-40"
                />
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[70vh] overflow-y-auto p-6"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-10 h-1 bg-border rounded-full" />
                  </div>
                  
                  {/* Reuse inlined content for mobile */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 text-accent" />
                      <h3 className="font-serif text-lg font-bold text-primary">
                        Your Booking
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {cart.map((item) => (
                      <div key={String(item.service.id)} className="flex items-start justify-between gap-3 p-3 bg-surface rounded-xl">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-primary truncate">{item.service.name}</p>
                          <p className="text-xs text-secondary mt-1">{item.service.duration} min</p>
                        </div>
                        <span className="text-sm font-bold text-primary">${(item.service.price * item.quantity).toFixed(0)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Totals Mobile */}
                  <div className="border-t border-border pt-4 mb-4">
                     <div className="flex items-center justify-between text-base">
                        <span className="font-bold text-primary">Total Amount</span>
                        <span className="font-bold text-accent">${price.toFixed(0)}</span>
                     </div>
                  </div>

                  <button
                    onClick={() => setMobileOpen(false)}
                    className="absolute top-4 right-4 p-1"
                  >
                    <X className="w-5 h-5 text-secondary" />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
