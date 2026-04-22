"use client";

import { useBookingStore } from "@/store/bookingStore";
import { salonConfig } from "@/data/salon-config";
import { Professional } from "@/types";
import { cn } from "@/lib/utils";
import { User, Star, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfessionalSelector() {
  const { cart, professionalMode, setProfessionalMode, setProfessional } = useBookingStore();

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary">
          Choose Your Stylist
        </h2>
        <p className="text-secondary mt-2">
          Select a preferred professional for each service, or leave as &quot;No
          Preference&quot; for the first available.
        </p>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setProfessionalMode("no_preference")}
            className={cn(
              "relative flex flex-col gap-2 p-5 rounded-2xl border transition-all duration-300 text-left",
              professionalMode === "no_preference"
                ? "border-accent bg-accent/3 shadow-soft"
                : "border-border bg-white hover:border-accent/40"
            )}
          >
            <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center mb-2">
              <User className="w-5 h-5 text-secondary" />
            </div>
            <p className="font-bold text-primary text-base">No Preference</p>
            <p className="text-sm text-secondary">
              Book the first available stylist for all your services.
            </p>
            {professionalMode === "no_preference" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-4 right-4 w-6 h-6 rounded-full bg-accent flex items-center justify-center"
              >
                <Check className="w-3.5 h-3.5 text-white" />
              </motion.div>
            )}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setProfessionalMode("per_service")}
            className={cn(
              "relative flex flex-col gap-2 p-5 rounded-2xl border transition-all duration-300 text-left",
              professionalMode === "per_service"
                ? "border-accent bg-accent/3 shadow-soft"
                : "border-border bg-white hover:border-accent/40"
            )}
          >
            <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center mb-2">
              <Star className="w-5 h-5 text-secondary" />
            </div>
            <p className="font-bold text-primary text-base">Select Per Service</p>
            <p className="text-sm text-secondary">
              Handpick the perfect specialist for each of your treatments.
            </p>
            {professionalMode === "per_service" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-4 right-4 w-6 h-6 rounded-full bg-accent flex items-center justify-center"
              >
                <Check className="w-3.5 h-3.5 text-white" />
              </motion.div>
            )}
          </motion.button>
        </div>

        {/* Per-service professional selection */}
        {professionalMode === "per_service" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-8 pt-6 border-t border-border mt-8"
          >
            {cart.map((item) => {
              // Professionals who can handle this specific service
              const availablePros = salonConfig.professionals.filter((pro) =>
                pro.skills.includes(Number(item.service.id))
              );

              return (
                <div key={String(item.service.id)}>
                  <h3 className="text-base font-bold text-primary mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    {item.service.name}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Professional cards */}
                    {availablePros.map((pro) => {
                      const isSelected =
                        item.preferredProfessional?.id === pro.id;

                      return (
                        <motion.button
                          key={pro.id}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setProfessional(item.service.id, pro)}
                          className={cn(
                            "relative flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 text-left",
                            isSelected
                              ? "border-accent bg-accent/3 shadow-soft"
                              : "border-border bg-white hover:border-accent/40"
                          )}
                        >
                          {/* Avatar */}
                          <div className="w-12 h-12 rounded-xl bg-linear-to-br from-accent/20 to-accent/5 flex items-center justify-center shrink-0 overflow-hidden">
                            <span className="text-lg font-bold text-accent">
                              {pro.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-primary text-sm truncate">
                              {pro.name}
                            </p>
                            <p className="text-xs text-secondary mt-0.5 truncate">
                              {pro.role}
                            </p>
                            {pro.bio && (
                              <p className="text-xs text-secondary/60 mt-1 line-clamp-1">
                                {pro.bio}
                              </p>
                            )}
                          </div>

                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-3 right-3 w-6 h-6 rounded-full bg-accent flex items-center justify-center"
                            >
                              <Check className="w-3.5 h-3.5 text-white" />
                            </motion.div>
                          )}
                        </motion.button>
                      );
                    })}

                    {/* If no professionals available for this service */}
                    {availablePros.length === 0 && (
                      <div className="p-4 rounded-2xl border border-dashed border-border bg-surface/50 flex items-center justify-center">
                        <p className="text-sm text-secondary">
                          Any available stylist will be assigned
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
