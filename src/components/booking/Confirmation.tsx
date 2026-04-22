"use client";

import { useBookingStore } from "@/store/bookingStore";
import { cn } from "@/lib/utils";
import { CheckCircle2, Calendar, Clock, User, ArrowLeft, Sparkles, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Confirmation() {
  const { bookingId, cart, selectedDate, selectedTime, customerInfo, paymentMethod, totalPrice, totalDuration, resetBooking, getEndTime } = useBookingStore();
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  // Ensure scroll is at top on confirmation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const price = totalPrice();
  const duration = totalDuration();

  const formatDuration = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h === 0) return `${m} min`;
    if (m === 0) return `${h}h`;
    return `${h}h ${m}min`;
  };

  const copyBookingId = () => {
    if (bookingId) {
      navigator.clipboard.writeText(bookingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const paymentLabels = {
    card: "Credit Card",
    paypal: "PayPal",
    cash: "Pay at Salon",
  };

  return (
    <div className="max-w-xl mx-auto text-center">
      {/* Success animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.1 }}
        className="relative mx-auto w-24 h-24 mb-6"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          className="absolute inset-0 rounded-full bg-success/20"
        />
        <div className="relative w-full h-full rounded-full bg-linear-to-br from-success to-success/80 flex items-center justify-center shadow-[0_8px_32px_rgba(76,175,80,0.3)]">
          <motion.div
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <CheckCircle2 className="w-12 h-12 text-white" />
          </motion.div>
        </div>

        {/* Sparkles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [0, (i % 2 === 0 ? 1 : -1) * (30 + i * 10)],
              y: [0, -20 - i * 8],
            }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
            className="absolute top-1/2 left-1/2"
          >
            <Sparkles className="w-4 h-4 text-accent" />
          </motion.div>
        ))}
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="font-serif text-3xl font-bold text-primary mb-2">
          Booking Confirmed!
        </h2>
        <p className="text-secondary">
          Your appointment has been successfully booked.
        </p>
      </motion.div>

      {/* Booking ID */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 inline-flex items-center gap-3 bg-surface border border-border rounded-2xl px-6 py-3"
      >
        <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
          Booking ID
        </span>
        <span className="text-lg font-bold text-accent font-mono tracking-wider">
          {bookingId}
        </span>
        <button
          onClick={copyBookingId}
          className="p-1 hover:bg-white rounded-lg transition-colors"
        >
          {copied ? (
            <Check className="w-4 h-4 text-success" />
          ) : (
            <Copy className="w-4 h-4 text-secondary" />
          )}
        </button>
      </motion.div>

      {/* Summary card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 bg-white rounded-2xl border border-border p-6 text-left"
      >
        {/* Date & Time */}
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-accent" />
          </div>
          <div>
            <p className="text-sm font-semibold text-primary">
              {selectedDate?.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <p className="text-sm text-accent font-medium">
              {selectedTime} {getEndTime() && `- ${getEndTime()}`}
            </p>
          </div>
        </div>

        {/* Services */}
        <div className="py-4 border-b border-border">
          <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-3">
            Services
          </p>
          <div className="space-y-2">
            {cart.map((item) => (
              <div
                key={String(item.service.id)}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm text-primary">
                    {item.service.name}
                  </span>
                  {item.quantity > 1 && (
                    <span className="text-xs text-accent font-semibold">
                      ×{item.quantity}
                    </span>
                  )}
                  {item.preferredProfessional && (
                    <span className="text-xs text-secondary bg-surface px-2 py-0.5 rounded-lg">
                      {item.preferredProfessional.name}
                    </span>
                  )}
                </div>
                <span className="text-sm font-semibold text-primary">
                  ${(item.service.price * item.quantity).toFixed(0)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Customer & Payment */}
        <div className="py-4 border-b border-border grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-1">
              Customer
            </p>
            <p className="text-sm text-primary font-medium">
              {customerInfo.name}
            </p>
            <p className="text-xs text-secondary">{customerInfo.email}</p>
            <p className="text-xs text-secondary">{customerInfo.phone}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-1">
              Payment
            </p>
            <p className="text-sm text-primary font-medium">
              {paymentLabels[paymentMethod]}
            </p>
          </div>
        </div>

        {/* Total */}
        <div className="pt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-secondary" />
            <span className="text-sm text-secondary">
              {formatDuration(duration)}
            </span>
          </div>
          <div className="text-right">
            <p className="text-xs text-secondary">Total</p>
            <p className="text-2xl font-bold text-accent">
              ${price.toFixed(0)}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-12 flex flex-col sm:flex-row gap-3 justify-center"
      >
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-accent transition-all active:scale-95 shadow-lg shadow-primary/20"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </motion.div>
    </div>
  );
}
