"use client";

import { useBookingStore } from "@/store/bookingStore";
import { salonConfig } from "@/data/salon-config";
import { Service } from "@/types";
import { cn } from "@/lib/utils";
import { Plus, Minus, Clock, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function ServiceSelector() {
  const { cart, addService, removeService, updateQuantity } = useBookingStore();
  const [activeCategory, setActiveCategory] = useState(
    salonConfig.services[0]?.category || ""
  );

  const getCartItem = (serviceId: number | string) =>
    cart.find((item) => item.service.id === serviceId);

  const categories = salonConfig.services.map((c) => c.category);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary">
          Select Your Services
        </h2>
        <p className="text-secondary mt-2">
          Choose from our premium treatments and build your perfect session.
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 border",
              activeCategory === cat
                ? "bg-primary text-white border-primary shadow-soft"
                : "bg-white text-secondary border-border hover:border-accent hover:text-accent"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services grid */}
      <div className="space-y-3">
        <AnimatePresence>
          {salonConfig.services
            .find((c) => c.category === activeCategory)
            ?.items.map((service, index) => {
              const cartItem = getCartItem(service.id);
              const isInCart = !!cartItem;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "relative rounded-2xl border p-5 transition-all duration-300",
                    isInCart
                      ? "border-accent bg-accent/3 shadow-soft"
                      : "border-border bg-white hover:border-accent/40 hover:shadow-soft"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-primary text-base">
                          {service.name}
                        </h3>
                        {isInCart && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <Sparkles className="w-4 h-4 text-accent" />
                          </motion.div>
                        )}
                      </div>
                      {service.description && (
                        <p className="text-secondary text-sm mt-1 line-clamp-2">
                          {service.description}
                        </p>
                      )}
                      <div className="flex items-center gap-3 mt-2">
                        <span className="inline-flex items-center gap-1 text-xs text-secondary bg-surface px-2 py-1 rounded-lg">
                          <Clock className="w-3 h-3" />
                          {service.duration} min
                        </span>
                      </div>
                    </div>

                    {/* Price & Action */}
                    <div className="flex flex-col items-end gap-3 shrink-0">
                      <span className="text-lg font-bold text-primary">
                        ${service.price}
                      </span>

                      {isInCart ? (
                        <div className="flex items-center gap-1 bg-surface rounded-xl p-1">
                          <button
                            onClick={() =>
                              updateQuantity(
                                service.id,
                                (cartItem?.quantity || 1) - 1
                              )
                            }
                            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white transition-colors text-primary"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-primary">
                            {cartItem?.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                service.id,
                                (cartItem?.quantity || 1) + 1
                              )
                            }
                            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white transition-colors text-primary"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addService(service)}
                          className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-accent transition-all active:scale-95"
                        >
                          <Plus className="w-4 h-4" />
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </AnimatePresence>
      </div>
    </div>
  );
}
