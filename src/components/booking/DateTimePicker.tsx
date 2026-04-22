"use client";

import { useBookingStore } from "@/store/bookingStore";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Generate time slots from 10:00 to 20:00 in 15-min intervals
const generateTimeSlots = (): string[] => {
  const slots: string[] = [];
  for (let h = 10; h <= 20; h++) {
    for (let m = 0; m < 60; m += 15) {
      if (h === 20 && m > 0) break;
      const hour12 = h > 12 ? h - 12 : h;
      const ampm = h >= 12 ? "PM" : "AM";
      const minute = m.toString().padStart(2, "0");
      slots.push(`${hour12}:${minute} ${ampm}`);
    }
  }
  return slots;
};

// Simulated unavailable slots (random for demo)
const getUnavailableSlots = (date: Date): Set<string> => {
  const seed = date.getDate() + date.getMonth() * 31;
  const slots = generateTimeSlots();
  const unavailable = new Set<string>();
  slots.forEach((slot, i) => {
    if ((seed * (i + 3) * 7) % 5 === 0) {
      unavailable.add(slot);
    }
  });
  return unavailable;
};

export default function DateTimePicker() {
  const { selectedDate, selectedTime, setDate, setTime } = useBookingStore();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const timeSlots = useMemo(() => generateTimeSlots(), []);
  const unavailableSlots = useMemo(
    () => (selectedDate ? getUnavailableSlots(selectedDate) : new Set<string>()),
    [selectedDate]
  );

  // Calendar calculations
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const isToday = (day: number) =>
    day === today.getDate() &&
    viewMonth === today.getMonth() &&
    viewYear === today.getFullYear();

  const isPast = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(0, 0, 0, 0);
    return d < today;
  };

  const isSelected = (day: number) =>
    selectedDate?.getDate() === day &&
    selectedDate?.getMonth() === viewMonth &&
    selectedDate?.getFullYear() === viewYear;

  const canGoPrev =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  // Build calendar grid
  const calendarDays: { day: number; isCurrentMonth: boolean }[] = [];

  // Previous month trailing days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    calendarDays.push({ day: daysInPrevMonth - i, isCurrentMonth: false });
  }
  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push({ day: d, isCurrentMonth: true });
  }
  // Next month leading days
  const remaining = 42 - calendarDays.length;
  for (let d = 1; d <= remaining; d++) {
    calendarDays.push({ day: d, isCurrentMonth: false });
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary">
          Pick a Date & Time
        </h2>
        <p className="text-secondary mt-2">
          Choose your preferred appointment date and time slot.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <div className="bg-white rounded-2xl border border-border p-5">
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={prevMonth}
              disabled={!canGoPrev}
              className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center transition-all",
                canGoPrev
                  ? "hover:bg-surface text-primary"
                  : "text-border cursor-not-allowed"
              )}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="font-serif text-lg font-bold text-primary">
              {MONTHS[viewMonth]} {viewYear}
            </h3>
            <button
              onClick={nextMonth}
              className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-surface text-primary transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-semibold text-secondary/60 uppercase tracking-wider py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((item, idx) => {
              const isCurrentMonth = item.isCurrentMonth;
              const past = isCurrentMonth && isPast(item.day);
              const selected = isCurrentMonth && isSelected(item.day);
              const todayMark = isCurrentMonth && isToday(item.day);
              const disabled = !isCurrentMonth || past;

              return (
                <button
                  key={idx}
                  disabled={disabled}
                  onClick={() => {
                    if (isCurrentMonth && !past) {
                      setDate(new Date(viewYear, viewMonth, item.day));
                    }
                  }}
                  className={cn(
                    "relative w-full aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-200",
                    disabled
                      ? "text-border cursor-default"
                      : "hover:bg-accent/10 text-primary cursor-pointer",
                    selected && "bg-accent! text-white! font-bold shadow-soft",
                    todayMark && !selected && "ring-2 ring-accent/30"
                  )}
                >
                  {item.day}
                  {todayMark && !selected && (
                    <span className="absolute bottom-1.5 w-1 h-1 rounded-full bg-accent" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time slots */}
        <div>
          <h3 className="font-serif text-base font-bold text-primary mb-4">
            {selectedDate
              ? `Available Times — ${selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}`
              : "Select a date to see available times"}
          </h3>

          {selectedDate ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-[400px] overflow-y-auto pr-1">
              {timeSlots.map((slot) => {
                const isUnavailable = unavailableSlots.has(slot);
                const isActive = selectedTime === slot;

                return (
                  <motion.button
                    key={slot}
                    whileTap={{ scale: 0.95 }}
                    disabled={isUnavailable}
                    onClick={() => setTime(slot)}
                    className={cn(
                      "py-2.5 px-2 rounded-xl text-sm font-medium transition-all duration-200 border",
                      isUnavailable
                        ? "border-border/50 text-border bg-surface/50 cursor-not-allowed line-through"
                        : isActive
                        ? "border-accent bg-accent text-white font-bold shadow-soft"
                        : "border-border bg-white text-primary hover:border-accent hover:text-accent"
                    )}
                  >
                    {slot}
                  </motion.button>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 bg-surface rounded-2xl border border-dashed border-border">
              <p className="text-secondary text-sm">
                ← Pick a date from the calendar
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
