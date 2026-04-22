"use client";

import { useBookingStore, PaymentMethod } from "@/store/bookingStore";
import { cn } from "@/lib/utils";
import { CreditCard, Wallet, Banknote, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const paymentMethods: {
  id: PaymentMethod;
  label: string;
  icon: React.ElementType;
  description: string;
}[] = [
  {
    id: "card",
    label: "Credit Card",
    icon: CreditCard,
    description: "Visa, Mastercard, AMEX",
  },
  {
    id: "paypal",
    label: "PayPal",
    icon: Wallet,
    description: "Pay with your PayPal account",
  },
  {
    id: "cash",
    label: "Pay at Salon",
    icon: Banknote,
    description: "Cash or card on arrival",
  },
];

export default function PaymentForm() {
  const {
    customerInfo,
    paymentMethod,
    validationErrors,
    setCustomerInfo,
    setPaymentMethod,
  } = useBookingStore();

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary">
          Your Details & Payment
        </h2>
        <p className="text-secondary mt-2">
          Fill in your contact information and choose a payment method.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Customer Info */}
        <div className="space-y-5">
          <h3 className="font-serif text-base font-bold text-primary">
            Contact Information
          </h3>

          {/* Name */}
          <div>
            <label
              htmlFor="booking-name"
              className="block text-sm font-semibold text-primary mb-1.5"
            >
              Full Name
            </label>
            <input
              id="booking-name"
              type="text"
              placeholder="e.g. Sarah Ahmed"
              value={customerInfo.name}
              onChange={(e) => setCustomerInfo({ name: e.target.value })}
              className={cn(
                "w-full px-4 py-3 rounded-xl border bg-white text-primary text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent",
                validationErrors.name
                  ? "border-error ring-2 ring-error/10"
                  : "border-border"
              )}
            />
            {validationErrors.name && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-1 mt-1.5 text-xs text-error"
              >
                <AlertCircle className="w-3 h-3" />
                {validationErrors.name}
              </motion.p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="booking-email"
              className="block text-sm font-semibold text-primary mb-1.5"
            >
              Email Address
            </label>
            <input
              id="booking-email"
              type="email"
              placeholder="sarah@example.com"
              value={customerInfo.email}
              onChange={(e) => setCustomerInfo({ email: e.target.value })}
              className={cn(
                "w-full px-4 py-3 rounded-xl border bg-white text-primary text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent",
                validationErrors.email
                  ? "border-error ring-2 ring-error/10"
                  : "border-border"
              )}
            />
            {validationErrors.email && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-1 mt-1.5 text-xs text-error"
              >
                <AlertCircle className="w-3 h-3" />
                {validationErrors.email}
              </motion.p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="booking-phone"
              className="block text-sm font-semibold text-primary mb-1.5"
            >
              Phone Number
            </label>
            <input
              id="booking-phone"
              type="tel"
              placeholder="+92 300 1234567"
              value={customerInfo.phone}
              onChange={(e) => setCustomerInfo({ phone: e.target.value })}
              className={cn(
                "w-full px-4 py-3 rounded-xl border bg-white text-primary text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent",
                validationErrors.phone
                  ? "border-error ring-2 ring-error/10"
                  : "border-border"
              )}
            />
            {validationErrors.phone && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-1 mt-1.5 text-xs text-error"
              >
                <AlertCircle className="w-3 h-3" />
                {validationErrors.phone}
              </motion.p>
            )}
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <h3 className="font-serif text-base font-bold text-primary mb-5">
            Payment Method
          </h3>
          <div className="space-y-3">
            {paymentMethods.map((method) => {
              const isActive = paymentMethod === method.id;
              const Icon = method.icon;

              return (
                <motion.button
                  key={method.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPaymentMethod(method.id)}
                  className={cn(
                    "w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 text-left",
                    isActive
                      ? "border-accent bg-accent/3 shadow-soft"
                      : "border-border bg-white hover:border-accent/40"
                  )}
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                      isActive ? "bg-accent/10" : "bg-surface"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-5 h-5",
                        isActive ? "text-accent" : "text-secondary"
                      )}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-primary text-sm">
                      {method.label}
                    </p>
                    <p className="text-xs text-secondary mt-0.5">
                      {method.description}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                        isActive ? "border-accent" : "border-border"
                      )}
                    >
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2.5 h-2.5 rounded-full bg-accent"
                        />
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Dummy card form for visual */}
          {paymentMethod === "card" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-5 p-5 bg-surface rounded-2xl border border-border space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-secondary mb-1.5">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="4242 4242 4242 4242"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-white text-primary text-sm outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-secondary mb-1.5">
                    Expiry
                  </label>
                  <input
                    type="text"
                    placeholder="12/28"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-white text-primary text-sm outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-secondary mb-1.5">
                    CVC
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-white text-primary text-sm outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
