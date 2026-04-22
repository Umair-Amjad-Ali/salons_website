import type { Metadata } from "next";
import { salonConfig } from "@/data/salon-config";

export const metadata: Metadata = {
  title: `Book an Appointment | ${salonConfig.name}`,
  description: "Book your premium beauty appointment at " + salonConfig.name + ". Choose services, select your preferred stylist, and reserve your time slot.",
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
