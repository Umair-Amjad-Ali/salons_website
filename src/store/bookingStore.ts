"use client";

import { create } from "zustand";
import { Service, Professional } from "@/types";

/* ── Cart item ── */
export interface CartItem {
  service: Service;
  quantity: number;
  preferredProfessional: Professional | null; // null = "No Preference"
}

/* ── Customer info ── */
export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

/* ── Payment method ── */
export type PaymentMethod = "card" | "paypal" | "cash";

/* ── Validation errors ── */
export interface ValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
}

/* ── Store state ── */
interface BookingState {
  // Step tracking
  currentStep: number;

  // Step 1 — Services
  cart: CartItem[];
  addService: (service: Service) => void;
  removeService: (serviceId: number | string) => void;
  updateQuantity: (serviceId: number | string, quantity: number) => void;

  // Step 2 — Professional mode
  professionalMode: "no_preference" | "per_service";
  setProfessionalMode: (mode: "no_preference" | "per_service") => void;

  // Step 2 — Professional
  setProfessional: (serviceId: number | string, professional: Professional | null) => void;
  clearAllProfessionals: () => void;

  // Step 3 — Date & Time
  selectedDate: Date | null;
  selectedTime: string | null;
  setDate: (date: Date) => void;
  setTime: (time: string) => void;

  // Step 4 — Customer Info & Payment
  customerInfo: CustomerInfo;
  paymentMethod: PaymentMethod;
  setCustomerInfo: (info: Partial<CustomerInfo>) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  validationErrors: ValidationErrors;
  validateCustomerInfo: () => boolean;

  // Step 5 — Confirmation
  bookingId: string | null;
  isConfirmed: boolean;
  confirmBooking: () => void;

  // Navigation
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  canProceed: () => boolean;

  // Computed
  totalPrice: () => number;
  totalDuration: () => number;
  getEndTime: () => string | null;

  // Reset
  resetBooking: () => void;
}

const generateBookingId = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "LG-";
  for (let i = 0; i < 8; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
};

export const useBookingStore = create<BookingState>((set, get) => ({
  // Step
  currentStep: 1,

  // Cart
  cart: [],

  addService: (service) =>
    set((state) => {
      const exists = state.cart.find((item) => item.service.id === service.id);
      if (exists) {
        return {
          cart: state.cart.map((item) =>
            item.service.id === service.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        cart: [
          ...state.cart,
          { service, quantity: 1, preferredProfessional: null },
        ],
      };
    }),

  removeService: (serviceId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.service.id !== serviceId),
    })),

  updateQuantity: (serviceId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return {
          cart: state.cart.filter((item) => item.service.id !== serviceId),
        };
      }
      return {
        cart: state.cart.map((item) =>
          item.service.id === serviceId ? { ...item, quantity } : item
        ),
      };
    }),

  // Professional mode
  professionalMode: "no_preference",
  setProfessionalMode: (mode) => {
    set({ professionalMode: mode });
    // If switching to no_preference, clear all professionals
    if (mode === "no_preference") {
      set((state) => ({
        cart: state.cart.map((item) => ({ ...item, preferredProfessional: null })),
      }));
    }
  },

  // Professional
  setProfessional: (serviceId, professional) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.service.id === serviceId
          ? { ...item, preferredProfessional: professional }
          : item
      ),
    })),

  clearAllProfessionals: () =>
    set((state) => ({
      cart: state.cart.map((item) => ({ ...item, preferredProfessional: null })),
    })),

  // Date & Time
  selectedDate: null,
  selectedTime: null,
  setDate: (date) => set({ selectedDate: date, selectedTime: null }),
  setTime: (time) => set({ selectedTime: time }),

  // Customer Info
  customerInfo: { name: "", email: "", phone: "" },
  paymentMethod: "card",
  validationErrors: {},

  setCustomerInfo: (info) =>
    set((state) => ({
      customerInfo: { ...state.customerInfo, ...info },
      validationErrors: {},
    })),

  setPaymentMethod: (method) => set({ paymentMethod: method }),

  validateCustomerInfo: () => {
    const { customerInfo } = get();
    const errors: ValidationErrors = {};

    if (!customerInfo.name.trim()) {
      errors.name = "Name is required";
    } else if (customerInfo.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!customerInfo.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      errors.email = "Invalid email address";
    }

    if (!customerInfo.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[\d\s\-+()]{7,}$/.test(customerInfo.phone)) {
      errors.phone = "Invalid phone number";
    }

    set({ validationErrors: errors });
    return Object.keys(errors).length === 0;
  },

  // Confirmation
  bookingId: null,
  isConfirmed: false,

  confirmBooking: () =>
    set({
      bookingId: generateBookingId(),
      isConfirmed: true,
      currentStep: 5,
    }),

  // Navigation
  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 5) })),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),

  canProceed: () => {
    const state = get();
    switch (state.currentStep) {
      case 1:
        return state.cart.length > 0;
      case 2:
        return state.cart.length > 0; // professionals are optional
      case 3:
        return state.selectedDate !== null && state.selectedTime !== null;
      case 4:
        return true; // Always allow click, validate on handleNext
      default:
        return false;
    }
  },

  // Computed
  totalPrice: () =>
    get().cart.reduce(
      (sum, item) => sum + item.service.price * item.quantity,
      0
    ),

  totalDuration: () =>
    get().cart.reduce(
      (sum, item) => sum + item.service.duration * item.quantity,
      0
    ),

  getEndTime: () => {
    const state = get();
    if (!state.selectedTime) return null;
    const duration = state.cart.reduce(
      (sum, item) => sum + item.service.duration * item.quantity,
      0
    );
    // Parse start time like "6:30 PM"
    const match = state.selectedTime.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) return null;
    let hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    const period = match[3].toUpperCase();
    // Convert to 24h
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    // Add duration
    const totalMinutes = hours * 60 + minutes + duration;
    let endHour = Math.floor(totalMinutes / 60) % 24;
    const endMin = totalMinutes % 60;
    // Convert back to 12h
    const endPeriod = endHour >= 12 ? "PM" : "AM";
    if (endHour > 12) endHour -= 12;
    if (endHour === 0) endHour = 12;
    return `${endHour}:${endMin.toString().padStart(2, "0")} ${endPeriod}`;
  },

  // Reset
  resetBooking: () =>
    set({
      currentStep: 1,
      cart: [],
      professionalMode: "no_preference",
      selectedDate: null,
      selectedTime: null,
      customerInfo: { name: "", email: "", phone: "" },
      paymentMethod: "card",
      validationErrors: {},
      bookingId: null,
      isConfirmed: false,
    }),
}));
