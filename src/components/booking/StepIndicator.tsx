"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface StepIndicatorProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
}

const steps = [
  { number: 1, label: "Services" },
  { number: 2, label: "Stylist" },
  { number: 3, label: "Schedule" },
  { number: 4, label: "Payment" },
  { number: 5, label: "Confirm" },
];

export default function StepIndicator({ currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        {/* Background connector line */}
        <div className="absolute left-0 right-0 top-[18px] h-[2px] bg-border mx-8 sm:mx-10" />

        {/* Active connector line */}
        <motion.div
          className="absolute left-0 top-[18px] h-[2px] bg-accent mx-8 sm:mx-10"
          initial={{ width: "0%" }}
          animate={{
            width: `${((Math.min(currentStep, 5) - 1) / (steps.length - 1)) * 100}%`,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {steps.map((step) => {
          const isActive = step.number === currentStep;
          const isCompleted = step.number < currentStep;
          const isClickable = step.number < currentStep;

          return (
            <div
              key={step.number}
              className="flex flex-col items-center relative z-10"
            >
              <button
                onClick={() => isClickable && onStepClick?.(step.number)}
                disabled={!isClickable}
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 border-2",
                  isCompleted
                    ? "bg-accent border-accent text-white cursor-pointer hover:shadow-elevated"
                    : isActive
                    ? "bg-white border-accent text-accent shadow-[0_0_0_4px_rgba(200,169,126,0.15)]"
                    : "bg-white border-border text-secondary cursor-default"
                )}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15, stiffness: 300 }}
                  >
                    <Check className="w-4 h-4" />
                  </motion.div>
                ) : (
                  step.number
                )}
              </button>
              <span
                className={cn(
                  "mt-2 text-xs font-semibold transition-colors duration-300 hidden sm:block",
                  isActive
                    ? "text-accent"
                    : isCompleted
                    ? "text-primary"
                    : "text-secondary/60"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
