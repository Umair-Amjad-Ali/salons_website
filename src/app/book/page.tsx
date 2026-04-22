"use client";

import React from "react";
import { useBookingStore } from "@/store/bookingStore";
import StepIndicator from "@/components/booking/StepIndicator";
import BookingSummary from "@/components/booking/BookingSummary";
import ServiceSelector from "@/components/booking/ServiceSelector";
import ProfessionalSelector from "@/components/booking/ProfessionalSelector";
import DateTimePicker from "@/components/booking/DateTimePicker";
import PaymentForm from "@/components/booking/PaymentForm";
import Confirmation from "@/components/booking/Confirmation";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BookingPage() {
  const { currentStep, setStep, nextStep, prevStep, canProceed, confirmBooking, resetBooking } =
    useBookingStore();

  // Scroll to top on step change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  // Clean up booking on unmount (e.g. going back home)
  React.useEffect(() => {
    return () => {
      resetBooking();
    };
  }, [resetBooking]);

  const handleNext = () => {
    if (currentStep === 4) {
      // Validate before confirming
      const { validateCustomerInfo } = useBookingStore.getState();
      if (validateCustomerInfo()) {
        confirmBooking();
      }
    } else if (canProceed()) {
      nextStep();
    }
  };

  const getStepComponent = () => {
    switch (currentStep) {
      case 1:
        return <ServiceSelector />;
      case 2:
        return <ProfessionalSelector />;
      case 3:
        return <DateTimePicker />;
      case 4:
        return <PaymentForm />;
      case 5:
        return <Confirmation />;
      default:
        return <ServiceSelector />;
    }
  };

  const getNextLabel = () => {
    switch (currentStep) {
      case 1:
        return "Choose Stylist";
      case 2:
        return "Pick Date & Time";
      case 3:
        return "Payment Details";
      case 4:
        return "Confirm Booking";
      default:
        return "Next";
    }
  };

  const isConfirmation = currentStep === 5;

  return (
    <div className="min-h-screen bg-background pt-24 pb-32 lg:pb-12">
      <div className="container-custom">
        {/* Step indicator */}
        {!isConfirmation && (
          <div className="mb-10 max-w-2xl mx-auto lg:max-w-none">
            <StepIndicator currentStep={currentStep} onStepClick={setStep} />
          </div>
        )}

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className={isConfirmation ? "w-full" : "flex-1 min-w-0"}>
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20, position: "absolute", width: "100%" }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {getStepComponent()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            {!isConfirmation && (
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
                {currentStep > 1 ? (
                  <Button
                    variant="ghost"
                    onClick={prevStep}
                    className="gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>
                ) : (
                  <div />
                )}

                <Button
                  variant={currentStep === 4 ? "accent" : "primary"}
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="gap-2"
                >
                  {currentStep === 4 ? (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      {getNextLabel()}
                    </>
                  ) : (
                    <>
                      {getNextLabel()}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar summary */}
          {!isConfirmation && (
            <div className="w-full lg:w-[340px] shrink-0">
              <BookingSummary />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
