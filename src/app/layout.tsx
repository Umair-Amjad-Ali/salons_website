import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { salonConfig } from "@/data/salon-config";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${salonConfig.name}`,
    default: `${salonConfig.name} | ${salonConfig.tagline}`,
  },
  description: salonConfig.hero.subtitle,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --primary: ${salonConfig.theme.primary};
            --primary-rgb: 26, 26, 26;
            --secondary: ${salonConfig.theme.secondary};
            --accent: ${salonConfig.theme.accent};
            --accent-soft: ${salonConfig.theme.accentSoft};
            --background: ${salonConfig.theme.background};
            --surface: ${salonConfig.theme.surface};
            --border: ${salonConfig.theme.border};
          }
        `}} />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
